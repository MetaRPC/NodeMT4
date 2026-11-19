/*
 * ════════════════════════════════════════════════════════════════════════════
 *  MT4Sugar — HIGH-LEVEL layer of @metarpc/nodemt4
 * ════════════════════════════════════════════════════════════════════════════
 *
 *  One-liners with smart defaults over `MT4Service`: connect, read balance and
 *  prices, send and manage orders, size positions by risk. Every method here is
 *  a thin convenience — drop to `service()` (typed facade) or `account()` (raw
 *  gRPC) whenever you need the full surface.
 *
 *  MT4 is order-centric: there is one ticket per fill and no netting, so a
 *  "position" below means an open market order (types BUY/SELL). AccountSummary
 *  carries no margin, so getMargin / getFreeMargin / getMarginLevel read a live
 *  OnOpenedOrdersProfit snapshot.
 * ════════════════════════════════════════════════════════════════════════════
 */

import { MT4Account, Subscription, OrderAction } from './MT4Account';
import { MT4Service, AccountInfo, OrderInfo, SymbolParams } from './MT4Service';
import { MrpcError } from './errors';

export interface PriceInfo {
  symbol: string;
  bid: number;
  ask: number;
  /** ask − bid, expressed in pips. */
  spreadPips: number;
  /** Tick time, seconds since epoch (broker server time). */
  time: number;
}

/** A day's trading summary, from {@link MT4Sugar.getDailyStats}. */
export interface DailyStats {
  totalDeals: number;
  winningDeals: number;
  losingDeals: number;
  /** winning / total, in percent. */
  winRate: number;
  totalProfit: number;
  bestDeal: number;
  worstDeal: number;
}

/** A pip is `point × 10` on 3/5-digit symbols, else `point`. */
function pipSize(info: SymbolParams): number {
  return info.point * (info.digits === 3 || info.digits === 5 ? 10 : 1);
}

const startOfDay = (d = new Date()): Date => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const startOfWeek = (d = new Date()): Date => {
  const s = startOfDay(d);
  s.setDate(s.getDate() - ((s.getDay() + 6) % 7)); // Monday as the first day
  return s;
};
const startOfMonth = (d = new Date()): Date => new Date(d.getFullYear(), d.getMonth(), 1);

export class MT4Sugar {
  constructor(private readonly svc: MT4Service) { }

  /** Construct the whole stack (Sugar → Service → Account) in one call. */
  static create(host = 'mt4.mrpc.pro', port = 443, apiKey: string | null = null, id: string | null = null): MT4Sugar {
    return new MT4Sugar(MT4Service.create(host, port, apiKey, id));
  }

  /** The friendly facade underneath. */
  service(): MT4Service { return this.svc; }

  /** The low-level client underneath. */
  account(): MT4Account { return this.svc.account(); }

  //#region 1. Connection

  /** Connect using login / password / server (or the env vars MT4_LOGIN / MT4_PASSWORD / MT4_SERVER). */
  async quickConnect(login?: number, password?: string, server?: string): Promise<boolean> {
    const user = login ?? Number(process.env.MT4_LOGIN);
    const pass = password ?? process.env.MT4_PASSWORD;
    const srv = server ?? process.env.MT4_SERVER;
    if (!user || !pass || !srv) {
      throw new MrpcError('quickConnect: provide login/password/server or set MT4_LOGIN / MT4_PASSWORD / MT4_SERVER');
    }
    return this.svc.connect(user, pass, srv);
  }

  /** `true` after a successful connect. */
  isConnected(): boolean { return this.account().isConnected(); }

  /** Lightweight liveness probe: checks the terminal is connected and alive. */
  async ping(): Promise<boolean> {
    try { return await this.account().checkConnect(); } catch { return false; }
  }

  //#endregion

  //#region 2. Balance & margin

  private summary(): Promise<AccountInfo> { return this.svc.getAccountInfo(); }

  /**
   * A live account snapshot incl. margin. MT4's AccountSummary has no margin fields, so this takes the first
   * OnOpenedOrdersProfit event; if none arrives in `timeoutMs` it falls back to AccountSummary (margin 0, free
   * margin = equity) — correct for a flat account.
   */
  private async liveAccount(timeoutMs = 4000): Promise<{ balance: number; equity: number; margin: number; freeMargin: number; marginLevel: number; profit: number }> {
    const viaStream = await new Promise<any>((resolve) => {
      let done = false;
      let sub: Subscription | undefined;
      const finish = (v: any) => { if (done) return; done = true; clearTimeout(timer); try { sub?.unsubscribe(); } catch { } resolve(v); };
      const timer = setTimeout(() => finish(null), timeoutMs);
      try {
        sub = this.svc.subscribeOpenedOrdersProfit(1000, (ev) => finish(ev.account || null), () => finish(null));
      } catch { finish(null); }
    });
    if (viaStream && viaStream.margin !== undefined) return viaStream;
    const a = await this.summary();
    return { balance: a.balance, equity: a.equity, margin: 0, freeMargin: a.equity, marginLevel: 0, profit: a.equity - a.balance };
  }

  /** Account balance (excludes floating P/L). */
  async getBalance(): Promise<number> { return (await this.summary()).balance; }
  /** Account equity (balance + floating P/L). */
  async getEquity(): Promise<number> { return (await this.summary()).equity; }
  /** Margin currently in use (from a live snapshot). */
  async getMargin(): Promise<number> { return (await this.liveAccount()).margin; }
  /** Free margin available for new orders (from a live snapshot). */
  async getFreeMargin(): Promise<number> { return (await this.liveAccount()).freeMargin; }
  /** Margin level, percent (0 when flat; from a live snapshot). */
  async getMarginLevel(): Promise<number> { return (await this.liveAccount()).marginLevel; }
  /** Current floating profit (equity − balance). */
  async getProfit(): Promise<number> { const a = await this.summary(); return a.equity - a.balance; }

  //#endregion

  //#region 3. Prices & quotes

  /** Current bid of a symbol. */
  async getBid(symbol: string): Promise<number> { return (await this.svc.quote(symbol)).bid; }
  /** Current ask of a symbol. */
  async getAsk(symbol: string): Promise<number> { return (await this.svc.quote(symbol)).ask; }
  /** Current spread (ask − bid), in price units. */
  async getSpread(symbol: string): Promise<number> {
    const q = await this.svc.quote(symbol); return q.ask - q.bid;
  }

  /** Bid / ask / spread-in-pips / time in one snapshot. */
  async getPriceInfo(symbol: string): Promise<PriceInfo> {
    const [q, info] = await Promise.all([this.svc.quote(symbol), this.svc.symbolParams(symbol)]);
    const pip = pipSize(info) || info.point || 1;
    return { symbol, bid: q.bid, ask: q.ask, spreadPips: (q.ask - q.bid) / pip, time: q.time };
  }

  /**
   * Poll until the bid reaches `targetBid` (or just the next tick when `targetBid` is 0), up to
   * `timeoutMs`. Returns the last price seen, or `null` on timeout.
   */
  async waitForPrice(symbol: string, targetBid: number, timeoutMs = 10000): Promise<PriceInfo | null> {
    const until = Date.now() + timeoutMs;
    let last: PriceInfo | null = null;
    while (Date.now() < until) {
      last = await this.getPriceInfo(symbol);
      if (targetBid === 0 || last.bid >= targetBid) return last;
      await new Promise(r => setTimeout(r, 500));
    }
    return last && (targetBid === 0 || last.bid >= targetBid) ? last : null;
  }

  //#endregion

  //#region 4. Simple trading

  /** Send an order and return its ticket; a broker rejection throws an `MrpcError`. */
  private async send(action: OrderAction, symbol: string, volume: number, extra: Record<string, any> = {}): Promise<number> {
    const r = await this.svc.orderSend({ symbol, action, volume, ...extra });
    return r.ticket;
  }

  /** Open a market BUY; returns the ticket. */
  buyMarket(symbol: string, volume: number): Promise<number> { return this.send('BUY', symbol, volume); }
  /** Open a market SELL; returns the ticket. */
  sellMarket(symbol: string, volume: number): Promise<number> { return this.send('SELL', symbol, volume); }
  /** Place a BUY LIMIT at `price`. */
  buyLimit(symbol: string, volume: number, price: number): Promise<number> { return this.send('BUY_LIMIT', symbol, volume, { price }); }
  /** Place a SELL LIMIT at `price`. */
  sellLimit(symbol: string, volume: number, price: number): Promise<number> { return this.send('SELL_LIMIT', symbol, volume, { price }); }
  /** Place a BUY STOP at `price`. */
  buyStop(symbol: string, volume: number, price: number): Promise<number> { return this.send('BUY_STOP', symbol, volume, { price }); }
  /** Place a SELL STOP at `price`. */
  sellStop(symbol: string, volume: number, price: number): Promise<number> { return this.send('SELL_STOP', symbol, volume, { price }); }

  //#endregion

  //#region 5. Trading with SL/TP

  /** Market BUY with absolute SL/TP prices. */
  buyMarketWithSLTP(symbol: string, volume: number, sl: number, tp: number): Promise<number> {
    return this.send('BUY', symbol, volume, { stopLoss: sl, takeProfit: tp });
  }
  /** Market SELL with absolute SL/TP prices. */
  sellMarketWithSLTP(symbol: string, volume: number, sl: number, tp: number): Promise<number> {
    return this.send('SELL', symbol, volume, { stopLoss: sl, takeProfit: tp });
  }
  /** Pending BUY LIMIT at `price` with absolute SL/TP. */
  buyLimitWithSLTP(symbol: string, volume: number, price: number, sl: number, tp: number): Promise<number> {
    return this.send('BUY_LIMIT', symbol, volume, { price, stopLoss: sl, takeProfit: tp });
  }
  /** Pending SELL LIMIT at `price` with absolute SL/TP. */
  sellLimitWithSLTP(symbol: string, volume: number, price: number, sl: number, tp: number): Promise<number> {
    return this.send('SELL_LIMIT', symbol, volume, { price, stopLoss: sl, takeProfit: tp });
  }

  //#endregion

  //#region 6. Position management

  /** Close a position fully (deletes a pending order). Throws on a rejection. */
  async closePosition(ticket: number): Promise<boolean> {
    await this.svc.orderClose({ ticket });
    return true;
  }

  /** Close part of a position (`volume` lots). */
  async closePositionPartial(ticket: number, volume: number): Promise<boolean> {
    await this.svc.orderClose({ ticket, volume });
    return true;
  }

  /** Close every open position; returns how many were closed. */
  async closeAllPositions(): Promise<number> { return this.closePositions(await this.getOpenPositions()); }

  /** Close every open position on one symbol; returns how many were closed. */
  async closeAllBySymbol(symbol: string): Promise<number> {
    return this.closePositions((await this.getOpenPositions()).filter(p => p.symbol === symbol));
  }

  private async closePositions(positions: OrderInfo[]): Promise<number> {
    let n = 0;
    for (const p of positions) { try { if (await this.closePosition(p.ticket)) n++; } catch { /* skip */ } }
    return n;
  }

  /** Set a position's stop-loss (keeps its take-profit). */
  async modifyPositionSL(ticket: number, sl: number): Promise<boolean> {
    const p = await this.getPositionByTicket(ticket);
    const r = await this.svc.orderModify({ ticket, stopLoss: sl, takeProfit: p?.takeProfit });
    return r.modified;
  }
  /** Set a position's take-profit (keeps its stop-loss). */
  async modifyPositionTP(ticket: number, tp: number): Promise<boolean> {
    const p = await this.getPositionByTicket(ticket);
    const r = await this.svc.orderModify({ ticket, stopLoss: p?.stopLoss, takeProfit: tp });
    return r.modified;
  }
  /** Set both stop-loss and take-profit of a position. */
  async modifyPositionSLTP(ticket: number, sl: number, tp: number): Promise<boolean> {
    const r = await this.svc.orderModify({ ticket, stopLoss: sl, takeProfit: tp });
    return r.modified;
  }

  //#endregion

  //#region 7. Position information

  /** All open positions (open market orders). */
  getOpenPositions(): Promise<OrderInfo[]> { return this.svc.positions(); }

  /** The open position with this ticket, or `undefined`. */
  async getPositionByTicket(ticket: number): Promise<OrderInfo | undefined> {
    return (await this.getOpenPositions()).find(p => p.ticket === ticket);
  }

  /** Open positions on one symbol. */
  async getPositionsBySymbol(symbol: string): Promise<OrderInfo[]> {
    return (await this.getOpenPositions()).filter(p => p.symbol === symbol);
  }

  /** Whether any position is open on a symbol. */
  async hasOpenPosition(symbol: string): Promise<boolean> {
    return (await this.getOpenPositions()).some(p => p.symbol === symbol);
  }

  /** Number of open positions. */
  async countOpenPositions(): Promise<number> { return (await this.getOpenPositions()).length; }

  /** Summed floating profit across all open positions. */
  async getTotalProfit(): Promise<number> {
    return (await this.getOpenPositions()).reduce((s, p) => s + p.profit, 0);
  }

  /** Summed floating profit of the positions on one symbol. */
  async getProfitBySymbol(symbol: string): Promise<number> {
    return (await this.getOpenPositions()).filter(p => p.symbol === symbol).reduce((s, p) => s + p.profit, 0);
  }

  //#endregion

  //#region 8. History & profit analysis

  /** Closed orders in a window (server-day boundaries approximated by the local day). */
  private async history(from: Date, to: Date): Promise<OrderInfo[]> {
    return (await this.svc.ordersHistory(from, to)).orders;
  }

  /** Closed orders from today. */
  getDealsToday(): Promise<OrderInfo[]> { return this.history(startOfDay(), new Date()); }
  /** Closed orders from yesterday. */
  getDealsYesterday(): Promise<OrderInfo[]> {
    const end = startOfDay(); const start = new Date(end); start.setDate(start.getDate() - 1);
    return this.history(start, end);
  }
  /** Closed orders since the start of this week (Monday). */
  getDealsThisWeek(): Promise<OrderInfo[]> { return this.history(startOfWeek(), new Date()); }
  /** Closed orders since the start of this month. */
  getDealsThisMonth(): Promise<OrderInfo[]> { return this.history(startOfMonth(), new Date()); }
  /** Closed orders in a custom window. */
  getDealsDateRange(from: Date, to: Date): Promise<OrderInfo[]> { return this.history(from, to); }

  /** Net profit of orders closed today. */
  async getProfitToday(): Promise<number> { return (await this.getDealsToday()).reduce((s, d) => s + d.profit, 0); }
  /** Net profit of orders closed this week. */
  async getProfitThisWeek(): Promise<number> { return (await this.getDealsThisWeek()).reduce((s, d) => s + d.profit, 0); }
  /** Net profit of orders closed this month. */
  async getProfitThisMonth(): Promise<number> { return (await this.getDealsThisMonth()).reduce((s, d) => s + d.profit, 0); }

  //#endregion

  //#region 9. Symbol information

  /** Full contract specification of a symbol. */
  getSymbolInfo(symbol: string): Promise<SymbolParams> { return this.svc.symbolParams(symbol); }

  /** Every symbol name the account can see. */
  async getAllSymbols(): Promise<string[]> { return (await this.svc.symbolList()).map(s => s.name); }

  /** Whether the broker knows this symbol. */
  async isSymbolAvailable(symbol: string): Promise<boolean> {
    return (await this.svc.symbolList()).some(s => s.name === symbol);
  }

  /** Minimum SL/TP distance from the market, in points. */
  async getMinStopLevel(symbol: string): Promise<number> {
    return (await this.svc.symbolParams(symbol)).stopsLevel;
  }

  /** Price decimal places of a symbol. */
  async getSymbolDigits(symbol: string): Promise<number> {
    return (await this.svc.symbolParams(symbol)).digits;
  }

  //#endregion

  //#region 10. Risk management

  /** Lot size so that a `stopLossPips` stop risks `riskPercent`% of the balance. */
  async calculatePositionSize(symbol: string, riskPercent: number, stopLossPips: number): Promise<number> {
    if (stopLossPips <= 0) throw new MrpcError('calculatePositionSize: stopLossPips must be > 0');
    const [balance, info] = await Promise.all([this.getBalance(), this.getSymbolInfo(symbol)]);
    if (info.tickValue <= 0 || info.tickSize <= 0) throw new MrpcError(`calculatePositionSize: bad tick value/size for ${symbol}`);
    const riskAmount = balance * riskPercent / 100;
    const valuePerPipPerLot = (pipSize(info) / info.tickSize) * info.tickValue;
    const lots = riskAmount / (stopLossPips * valuePerPipPerLot);
    return this.clampVolume(info, lots);
  }

  /** Largest lot the current free margin (80% of it) can open on this symbol. */
  async getMaxLotSize(symbol: string): Promise<number> {
    const [freeMargin, info, marginPerLot] = await Promise.all([
      this.getFreeMargin(), this.getSymbolInfo(symbol), this.calculateRequiredMargin(symbol, 1),
    ]);
    if (marginPerLot <= 0) return info.volumeMin;
    return this.clampVolume(info, (freeMargin * 0.8) / marginPerLot);
  }

  /** Whether a `volume`-lot order can be opened now; the string explains a `false`. */
  async canOpenPosition(symbol: string, volume: number): Promise<{ ok: boolean; reason: string }> {
    if (!(await this.isSymbolAvailable(symbol))) return { ok: false, reason: `symbol ${symbol} is not available` };
    const info = await this.getSymbolInfo(symbol);
    if (volume < info.volumeMin) return { ok: false, reason: `volume ${volume} below minimum ${info.volumeMin}` };
    if (info.volumeMax && volume > info.volumeMax) return { ok: false, reason: `volume ${volume} above maximum ${info.volumeMax}` };
    const [required, free] = await Promise.all([this.calculateRequiredMargin(symbol, volume), this.getFreeMargin()]);
    if (required > free) return { ok: false, reason: `need ${required.toFixed(2)} margin, only ${free.toFixed(2)} free` };
    return { ok: true, reason: '' };
  }

  /**
   * Margin required to open `volume` lots of `symbol`. Uses the symbol's initial margin when the broker reports
   * it, else estimates it from the contract size, the ask and the account leverage.
   */
  async calculateRequiredMargin(symbol: string, volume: number): Promise<number> {
    const info = await this.getSymbolInfo(symbol);
    if (info.marginInitial > 0) return info.marginInitial * volume;
    const [ask, acc] = await Promise.all([this.getAsk(symbol), this.summary()]);
    const leverage = acc.leverage || 100;
    return (info.contractSize * ask / leverage) * volume;
  }

  /**
   * Absolute SL/TP prices for a `direction` ("BUY"/"SELL") given pip distances from `entryPrice`
   * (0 = use the current ask for BUY / bid for SELL).
   */
  async calculateSLTP(symbol: string, direction: 'BUY' | 'SELL', entryPrice: number,
    stopLossPips: number, takeProfitPips: number): Promise<{ sl: number; tp: number }> {
    const info = await this.getSymbolInfo(symbol);
    const pip = pipSize(info);
    let entry = entryPrice;
    if (!entry) entry = direction === 'BUY' ? await this.getAsk(symbol) : await this.getBid(symbol);
    const sl = direction === 'BUY' ? entry - stopLossPips * pip : entry + stopLossPips * pip;
    const tp = direction === 'BUY' ? entry + takeProfitPips * pip : entry - takeProfitPips * pip;
    return { sl, tp };
  }

  private clampVolume(info: SymbolParams, lots: number): number {
    if (lots < info.volumeMin) lots = info.volumeMin;
    if (info.volumeMax && lots > info.volumeMax) lots = info.volumeMax;
    const step = info.volumeStep || 0.01;
    return Math.round(lots / step) * step;
  }

  //#endregion

  //#region 11. Trading helpers

  /** Market BUY with SL/TP given as pip distances from entry. */
  async buyMarketWithPips(symbol: string, volume: number, stopLossPips: number, takeProfitPips: number): Promise<number> {
    const { sl, tp } = await this.calculateSLTP(symbol, 'BUY', 0, stopLossPips, takeProfitPips);
    return this.buyMarketWithSLTP(symbol, volume, sl, tp);
  }

  /** Market SELL with SL/TP given as pip distances from entry. */
  async sellMarketWithPips(symbol: string, volume: number, stopLossPips: number, takeProfitPips: number): Promise<number> {
    const { sl, tp } = await this.calculateSLTP(symbol, 'SELL', 0, stopLossPips, takeProfitPips);
    return this.sellMarketWithSLTP(symbol, volume, sl, tp);
  }

  //#endregion

  //#region 12. Account information

  /** Full account snapshot. */
  getAccountInfo(): Promise<AccountInfo> { return this.svc.getAccountInfo(); }

  /** Today's win/loss summary from the orders closed today. */
  async getDailyStats(): Promise<DailyStats> {
    const deals = await this.getDealsToday();
    const stats: DailyStats = {
      totalDeals: deals.length, winningDeals: 0, losingDeals: 0, winRate: 0,
      totalProfit: 0, bestDeal: 0, worstDeal: 0,
    };
    for (const d of deals) {
      const net = d.profit + d.swap + d.commission;
      stats.totalProfit += net;
      if (net >= 0) stats.winningDeals++; else stats.losingDeals++;
      stats.bestDeal = Math.max(stats.bestDeal, net);
      stats.worstDeal = Math.min(stats.worstDeal, net);
    }
    stats.winRate = stats.totalDeals ? (stats.winningDeals / stats.totalDeals) * 100 : 0;
    return stats;
  }

  //#endregion
}
