/*
 * ════════════════════════════════════════════════════════════════════════════
 *  MT4Service — MID-LEVEL layer of @metarpc/nodemt4
 * ════════════════════════════════════════════════════════════════════════════
 *
 *  A friendly facade over `MT4Account`: plain arguments in, typed data-transfer
 *  objects out. It builds the protobuf requests, routes them through the raw
 *  layer, and maps the raw replies to the DTOs declared below — no protobuf in
 *  your code. For terse one-liners (balances, prices, market orders) use the
 *  high layer, `MT4Sugar`, which sits on top of this one.
 *
 *  Groups mirror MT4Account:
 *      1. Account information · 2. Orders & history · 3. Symbols & quotes
 *      4. Trading operations  · 5. Streaming
 *  plus the connection lifecycle and a few conveniences (ensureSymbol, lastBars,
 *  positions / pendingOrders) that the flat client used to expose.
 * ════════════════════════════════════════════════════════════════════════════
 */

import {
  MT4Account, ConnectOptions, Subscription, OrderCommand, OrderAction,
  TIMEFRAMES, Timeframe, ORDER_TYPES, toTimestamp, tsToSeconds, tsToMillis,
  AccountHelperPb, TradingHelperPb, MarketInfoPb, SubscriptionsPb, ConnectionPb, TradeStatsPb, ServerTimezonePb,
} from './MT4Account';
import { MrpcError } from './errors';

// ════════════════════════════════════════════════════════════ data-transfer types

/**
 * What AccountSummary answers. MT4's AccountSummary carries no margin / free margin / margin level: take them from
 * `subscribeOpenedOrdersProfit()` (its `account`) or from `subscribeTrades()`.
 */
export interface AccountInfo {
  login: number;
  currency: string;
  balance: number;
  equity: number;
  credit: number;
  leverage: number;
  name: string;
  /** The broker server name the account connected with (e.g. "TeleTrade-Demo"), or the host for a Connect by address. */
  server: string;
  company: string;
  tradeMode: 'DEMO' | 'CONTEST' | 'REAL' | 'UNKNOWN';
  tradeModeCode: number;
  isInvestor: boolean;
  /** Broker server time (seconds since epoch, encoded as if UTC). */
  serverTime: number;
  /** Add this many minutes to UTC to get broker server time. Every timestamp on MT4 is server time. */
  utcServerShiftMinutes: number;
}

export interface Quote {
  symbol: string;
  bid: number;
  ask: number;
  high: number;
  low: number;
  /** Seconds since epoch, broker server time. */
  time: number;
}

export interface Tick {
  symbol: string;
  bid: number;
  ask: number;
  last: number;
  volume: number;
  /** Milliseconds since epoch, broker server time (encoded as if UTC). */
  time: number;
  /** Milliseconds since epoch, real UTC (the server's time_utc), when the server reports it. */
  timeUtc: number;
}

export interface SymbolParams {
  name: string;
  description: string;
  digits: number;
  point: number;
  spreadFloat: boolean;
  contractSize: number;
  volumeMin: number;
  volumeMax: number;
  volumeStep: number;
  volumeLimit: number;
  stopsLevel: number;
  freezeLevel: number;
  tickValue: number;
  tickSize: number;
  swapLong: number;
  swapShort: number;
  swapMode: number;
  currencyBase: string;
  currencyProfit: string;
  currencyMargin: string;
  tradeMode: number;
  tradeExeMode: number;
  tradeCalcMode: number;
  marginInitial: number;
  marginMaintenance: number;
  isSelected: boolean;
  visible: boolean;
  /** Stale snapshot — use quote()/subscribeQuotes() for prices. */
  bid: number;
  time: number;
  path: string;
}

export interface Bar {
  /** Seconds since epoch, broker server time. */
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  tickVolume: number;
  realVolume: number;
  spread: number;
}

export interface OrderRequest {
  symbol: string;
  /** 'BUY' | 'SELL' | 'BUY_LIMIT' | 'SELL_LIMIT' | 'BUY_STOP' | 'SELL_STOP' (or the ORDER_TYPES number). */
  cmd?: OrderCommand | number;
  /** Alias of `cmd`. */
  action?: OrderCommand | number;
  lots?: number;
  /** Alias of `lots`. */
  volume?: number;
  /** MT4 request price. For market orders it is filled from quote() (ask for buys, bid for sells) when omitted. */
  price?: number;
  /** Points. */
  slippage?: number;
  stopLoss?: number;
  takeProfit?: number;
  comment?: string;
  magicNumber?: number;
  /** Alias of `magicNumber`. */
  magic?: number;
  /** Pending-order expiration (server time). */
  expiration?: Date | number;
}

export interface OrderResult {
  ticket: number;
  /** Always 0: an order the server refuses is an MrpcError. Kept for backward compatibility. */
  errorCode: number;
  price: number;
  lots: number;
  /** Same as `lots`. */
  volume: number;
  comment: string;
  /** Seconds since epoch, server time. */
  openTime: number;
}

export interface OrderModifyRequest {
  ticket: number;
  stopLoss?: number;
  takeProfit?: number;
  /** Pending orders only. */
  price?: number;
  expiration?: Date | number;
}

export interface OrderCloseRequest {
  ticket: number;
  /** Lots to close; omit for the whole order (looked up via openedOrders). */
  volume?: number;
  lots?: number;
  /** Closing price; filled from quote() when omitted (bid for buys, ask for sells). */
  price?: number;
  /** Points. */
  slippage?: number;
  /** Optional: saves one openedOrders() round-trip when price/volume are omitted. */
  symbol?: string;
  /** Optional: 0=BUY 1=SELL; saves the lookup together with `symbol`. */
  type?: number;
}

export interface OrderCloseResult {
  /** 0 = market order closed, 1 = pending order deleted. */
  mode: number;
  historyComment: string;
}

export interface OrderInfo {
  ticket: number;
  symbol: string;
  /** 0 BUY, 1 SELL, 2 BUY_LIMIT, 3 SELL_LIMIT, 4 BUY_STOP, 5 SELL_STOP */
  type: number;
  lots: number;
  openPrice: number;
  openTime: number;
  stopLoss: number;
  takeProfit: number;
  profit: number;
  swap: number;
  commission: number;
  comment: string;
  magic: number;
  expiration: number;
  accountLogin: number;
  /** Closed orders only. */
  closeTime?: number;
  closePrice?: number;
}

export interface OrdersHistory {
  totalCount: number;
  orders: OrderInfo[];
}

/** Aggregated trade statistics (TradeStats/StatsData). */
export interface TradeStats {
  trades: number;
  profitability: number;
  profitFactor: number;
  expectancy: number;
  ghpr: number;
  growthPercent: number;
  sharpeRatio: number;
  zScore: number;
  standardDeviation: number;
  pips: number;
  lots: number;
  deposits: number;
  withdrawals: number;
  commissions: number;
  bestTrade: number;
  worstTrade: number;
  bestTradePips: number;
  worstTradePips: number;
  averageWin: number;
  averageLost: number;
  averageTradeLength: number;
  longsWon: number;
  shortsWon: number;
  maxBalanceDrawdownRaw: number;
  maxBalanceDrawdownRelative: number;
  maxEquityDrawdownRaw: number;
  maxEquityDrawdownRelative: number;
  markets: string[];
}

/** One point of the equity curve (TradeStats/EquityPointData). */
export interface EquityPoint {
  /** Seconds since epoch, broker server time. */
  time: number;
  /** Milliseconds since epoch, real UTC. */
  timeUtc: number;
  balance: number;
  equity: number;
  realizedPl: number;
  unrealizedPl: number;
  cashFlow: number;
  balanceDrawdownRaw: number;
  balanceDrawdownRelative: number;
  equityDrawdownRaw: number;
  equityDrawdownRelative: number;
}

/** The broker server's timezone (ServerTimezone/ServerTimezoneData). */
export interface ServerTimezone {
  server: string;
  source: string;
  utcOffsetSeconds: number;
  utcOffsetMinutes: number;
  validatedUtc: any;
}

// ════════════════════════════════════════════════════════════════════════════

/** TradeStats requests take the window start as an ISO-8601 UTC **string** (not a protobuf Timestamp). */
const toUtcIso = (d: Date | number): string => (d instanceof Date ? d : new Date(d)).toISOString();

export class MT4Service {
  constructor(private readonly acc: MT4Account) { }

  /** Build the whole stack (MT4Service → MT4Account) in one call. */
  static create(host = 'mt4.mrpc.pro', port = 443, apiKey: string | null = null, id: string | null = null): MT4Service {
    return new MT4Service(new MT4Account(host, port, apiKey, id));
  }

  /** The raw `MT4Account` underneath, for the methods this facade does not wrap. */
  account(): MT4Account { return this.acc; }

  //#region Connection lifecycle

  /** Start (or re-attach to) a terminal. Short form `connect(login, password, server)` or a ConnectOptions object. */
  connect(loginOrOptions: number | ConnectOptions, password?: string, server?: string): Promise<boolean> {
    return this.acc.connect(loginOrOptions, password, server);
  }

  /** The terminal id for these credentials (defaults to the last connect()'s). */
  getId(user?: number | string, password?: string): Promise<string> { return this.acc.getId(user, password); }

  /** Re-run the last connect() (same id/name). */
  reconnect(): Promise<boolean> { return this.acc.reconnect(); }

  /** Liveness probe: true when the terminal answers. */
  checkConnect(): Promise<boolean> { return this.acc.checkConnect(); }

  isConnected(): boolean { return this.acc.isConnected(); }

  /** Stop the terminal on the gateway (`deleteTerminal` also deletes it) and close the channel. */
  disconnect(deleteTerminal = false): Promise<void> { return this.acc.disconnect(deleteTerminal); }

  /** Close the gRPC channel without touching the terminal. */
  close(): void { this.acc.close(); }

  //#endregion

  //#region 1. Account information

  /** AccountSummary → a typed AccountInfo (see the interface for where margin lives). */
  async getAccountInfo(): Promise<AccountInfo> {
    const data = await this.acc.accountSummary();
    if (!data) throw new MrpcError('AccountSummary returned no data');
    const code = data.getAccountTradeMode ? Number(data.getAccountTradeMode()) : -1;
    return {
      login: Number(data.getAccountLogin()),
      currency: data.getAccountCurrency(),
      balance: data.getAccountBalance(),
      equity: data.getAccountEquity(),
      credit: data.getAccountCredit ? data.getAccountCredit() : 0,
      leverage: Number(data.getAccountLeverage()),
      name: data.getAccountUserName(),
      server: this.acc.serverName,
      company: data.getAccountCompanyName ? data.getAccountCompanyName() : '',
      tradeMode: MT4Account.tradeModeName(code),
      tradeModeCode: code,
      isInvestor: !!(data.getIsInvestor && data.getIsInvestor()),
      serverTime: tsToSeconds(data.getServerTime ? data.getServerTime() : null),
      utcServerShiftMinutes: data.getUtcServerTimeShiftMinutes ? Number(data.getUtcServerTimeShiftMinutes()) : 0,
    };
  }

  /** Aggregated trade statistics since `from` (UTC). Returns a typed TradeStats. */
  async getTradeStats(from: Date | number): Promise<TradeStats> {
    const req = new TradeStatsPb.TradeStatsRequest();
    req.setFromUtc(toUtcIso(from));
    const data = await this.acc.tradeStats(req);
    return MT4Service.mapStats(data);
  }

  /** Stats + equity curve + the trades behind them (since `from`, UTC). */
  async getTradeStatsEquityHistory(from: Date | number, excludeSameBars = false): Promise<{ stats: TradeStats; equity: EquityPoint[] }> {
    const req = new TradeStatsPb.TradeStatsEquityHistoryRequest();
    req.setFromUtc(toUtcIso(from));
    req.setExcludeSameBars(excludeSameBars);
    const data = await this.acc.tradeStatsEquityHistory(req);
    const stats = data.getStats ? MT4Service.mapStats(data.getStats()) : MT4Service.mapStats(data);
    const points = (data.getEquityHistory ? data.getEquityHistory() : data.getPointsList ? data : null);
    const list = points && points.getPointsList ? points.getPointsList() : (data.getPointsList ? data.getPointsList() : []);
    return { stats, equity: list.map(MT4Service.mapEquityPoint) };
  }

  /** The equity-curve points since `from` (UTC). `excludeSameBars` drops flat points. */
  async getEquityHistory(from: Date | number, excludeSameBars = false): Promise<EquityPoint[]> {
    const req = new TradeStatsPb.EquityHistoryRequest();
    req.setFromUtc(toUtcIso(from));
    req.setExcludeSameBars(excludeSameBars);
    const data = await this.acc.equityHistory(req);
    return (data ? data.getPointsList() : []).map(MT4Service.mapEquityPoint);
  }

  /** The best/worst unrealized P/L reached per open order since `from` (UTC). */
  async getTradeUnrealizedPl(from: Date | number): Promise<any[]> {
    const req = new TradeStatsPb.TradeUnrealizedPLRequest();
    req.setFromUtc(toUtcIso(from));
    const data = await this.acc.tradeUnrealizedPl(req);
    return (data ? data.getExtremaList() : []).map((e: any) => e.toObject());
  }

  //#endregion

  //#region 2. Orders & history

  /** Every open market order and pending order (MT4 has no netting: one ticket per fill). */
  async openedOrders(sortType?: number): Promise<OrderInfo[]> {
    const req = new AccountHelperPb.OpenedOrdersRequest();
    if (sortType !== undefined) req.setSortType(sortType);
    const data = await this.acc.openedOrders(req);
    return (data ? data.getOrderInfosList() : []).map(MT4Service.mapOrderInfo);
  }

  /** Open market orders (types BUY/SELL), optionally only those carrying a given magic number. */
  async positions(magic?: number): Promise<OrderInfo[]> {
    const all = await this.openedOrders();
    return all.filter(o => (o.type === 0 || o.type === 1) && (magic === undefined || o.magic === magic));
  }

  /** Pending orders (types 2-5), optionally filtered by magic. */
  async pendingOrders(magic?: number): Promise<OrderInfo[]> {
    const all = await this.openedOrders();
    return all.filter(o => o.type >= 2 && (magic === undefined || o.magic === magic));
  }

  /** Just the ticket numbers of all open/pending orders. */
  async openedOrdersTickets(): Promise<number[]> {
    const data = await this.acc.openedOrdersTickets();
    return (data ? data.getTicketsList() : []).map((t: any) => Number(t));
  }

  /**
   * Closed orders in a SERVER-time window (use MT4Account.serverDate() to build it from UTC).
   * opts.sort: EnumOrderHistorySortType (default HISTORY_SORT_BY_CLOSE_TIME_DESC = 3).
   */
  async ordersHistory(from: Date | number, to: Date | number, opts: { sort?: number; page?: number; perPage?: number } = {}): Promise<OrdersHistory> {
    const req = new AccountHelperPb.OrdersHistoryRequest();
    req.setInputSortMode(opts.sort !== undefined ? opts.sort : 3);
    req.setInputFrom(toTimestamp(from));
    req.setInputTo(toTimestamp(to));
    if (opts.page !== undefined) req.setPageNumber(opts.page);
    if (opts.perPage !== undefined) req.setItemsPerPage(opts.perPage);
    const data = await this.acc.ordersHistory(req);
    return {
      totalCount: data ? Number(data.getTotalCount()) : 0,
      orders: (data ? data.getOrdersInfoList() : []).map(MT4Service.mapOrderInfo),
    };
  }

  //#endregion

  //#region 3. Symbols & quotes

  /** Every symbol name the account can see (one cheap call). */
  async symbolList(): Promise<{ name: string; index: number }[]> {
    const data = await this.acc.symbols();
    return (data ? data.getSymbolnameinfosList() : []).map((s: any) => ({ name: s.getSymbolName(), index: Number(s.getSymbolIndex()) }));
  }

  /** Add (select=true) or remove a symbol from Market Watch. Idempotent. */
  async symbolSelect(symbol: string, select = true): Promise<boolean> {
    const req = new MarketInfoPb.SymbolSelectRequest();
    req.setSymbol(symbol);
    req.setSelect(select);
    const data = await this.acc.symbolSelect(req);
    return !!(data && data.getSuccess());
  }

  /** Current bid/ask of one symbol (the price source to use — SymbolParams.bid is stale). */
  async quote(symbol: string): Promise<Quote> {
    const req = new MarketInfoPb.QuoteRequest();
    req.setSymbol(symbol);
    const data = await this.acc.quote(req);
    if (!data) throw new MrpcError(`Quote returned no data for ${symbol}`);
    return MT4Service.mapQuote(data);
  }

  /** Current bid/ask of several symbols in one call. */
  async quoteMany(symbols: string[]): Promise<Quote[]> {
    const req = new MarketInfoPb.QuoteManyRequest();
    req.setSymbolsList(symbols);
    const data = await this.acc.quoteMany(req);
    return (data ? data.getQuotesList() : []).map(MT4Service.mapQuote);
  }

  /** Contract specification of one symbol. */
  async symbolParams(symbol: string): Promise<SymbolParams> {
    const req = new AccountHelperPb.SymbolParamsManyRequest();
    req.setSymbolName(symbol);
    const data = await this.acc.symbolParamsMany(req);
    const list = data ? data.getSymbolInfosList() : [];
    const hit = list.find((s: any) => s.getSymbolname() === symbol) || list[0];
    if (!hit) throw new MrpcError(`SymbolParamsMany returned nothing for ${symbol}`);
    return MT4Service.mapSymbolParams(hit);
  }

  /** Contract specifications of every symbol (one call; bid fields are stale). */
  async symbolParamsAll(): Promise<SymbolParams[]> {
    const data = await this.acc.symbolParamsMany(new AccountHelperPb.SymbolParamsManyRequest(), 60000);
    return (data ? data.getSymbolInfosList() : []).map(MT4Service.mapSymbolParams);
  }

  /** Tick value / tick size / contract size for many symbols in one call (sizing). */
  async tickValueWithSize(symbols: string[]): Promise<{ symbol: string; tickValue: number; tickSize: number; contractSize: number }[]> {
    const req = new AccountHelperPb.TickValueWithSizeRequest();
    req.setSymbolNamesList(symbols);
    const data = await this.acc.tickValueWithSize(req);
    return (data ? data.getInfosList() : []).map((i: any) => ({
      symbol: i.getSymbolname(), tickValue: i.getTradetickvalue(), tickSize: i.getTradeticksize(), contractSize: i.getTradecontractsize(),
    }));
  }

  /** The broker server's timezone / UTC offset. */
  async getServerTimezone(): Promise<ServerTimezone> {
    const data = await this.acc.serverTimezone();
    const secs = data && data.getUtcOffsetSeconds ? Number(data.getUtcOffsetSeconds()) : 0;
    return {
      server: data && data.getServer ? data.getServer() : '',
      source: data && data.getSource ? data.getSource() : '',
      utcOffsetSeconds: secs,
      utcOffsetMinutes: Math.round(secs / 60),
      validatedUtc: data && data.getValidatedUtc ? data.getValidatedUtc() : null,
    };
  }

  /**
   * Select the symbol and wait until it has a two-sided quote (a freshly selected symbol reports
   * bid=ask=0 for a few seconds). Returns the quote.
   */
  async ensureSymbol(symbol: string, waitMs = 10000): Promise<Quote> {
    await this.symbolSelect(symbol, true);
    const until = Date.now() + waitMs;
    let last: Quote | null = null;
    while (Date.now() < until) {
      try {
        last = await this.quote(symbol);
        if (last.bid > 0 && last.ask > 0) return last;
      } catch { /* not synchronized yet */ }
      await new Promise(r => setTimeout(r, 500));
    }
    if (last) return last;
    throw new MrpcError(`No quote for ${symbol} within ${waitMs} ms`);
  }

  /**
   * OHLC history in a SERVER-time window (seconds or Date, encoded as if UTC). Sorted ascending.
   * Timeframe: 'M1'..'MN1' or an ENUM_QUOTE_HISTORY_TIMEFRAME value.
   */
  async quoteHistory(symbol: string, timeframe: Timeframe, from: Date | number, to: Date | number): Promise<Bar[]> {
    const tf = typeof timeframe === 'number' ? timeframe : TIMEFRAMES[timeframe];
    if (tf === undefined) throw new MrpcError(`Unknown timeframe ${timeframe}`);
    const req = new MarketInfoPb.QuoteHistoryRequest();
    req.setSymbol(symbol);
    req.setTimeframe(tf);
    req.setFromtime(toTimestamp(from));
    req.setTotime(toTimestamp(to));
    const data = await this.acc.quoteHistory(req);
    const bars = (data ? data.getHistoricalQuotesList() : []).map((b: any): Bar => ({
      time: tsToSeconds(b.getTime()),
      open: b.getOpen(), high: b.getHigh(), low: b.getLow(), close: b.getClose(),
      tickVolume: Number(b.getTickVolume()), realVolume: Number(b.getRealVolume()), spread: Number(b.getSpread()),
    }));
    bars.sort((a: Bar, b: Bar) => a.time - b.time);
    return bars;
  }

  /**
   * Newest `count` bars. `utcServerShiftMinutes` comes from getAccountInfo(); the look-back
   * window is widened automatically (weekends) until enough bars come back.
   */
  async lastBars(symbol: string, timeframe: Timeframe, count: number, utcServerShiftMinutes = 0): Promise<Bar[]> {
    const tf = typeof timeframe === 'number' ? timeframe : TIMEFRAMES[timeframe];
    const minutesPerBar = [1, 5, 15, 30, 60, 240, 1440, 10080, 43200][tf] || 1;
    const serverNow = MT4Account.serverDate(new Date(), utcServerShiftMinutes);
    let lookbackMin = Math.max(count * minutesPerBar * 3, 3 * 1440);
    let bars: Bar[] = [];
    for (let attempt = 0; attempt < 4; attempt++) {
      const from = new Date(serverNow.getTime() - lookbackMin * 60000);
      const to = new Date(serverNow.getTime() + 3600000);
      bars = await this.quoteHistory(symbol, tf, from, to);
      if (bars.length >= count) break;
      lookbackMin *= 4;
    }
    return bars.slice(-count);
  }

  //#endregion

  //#region 4. Trading operations

  /**
   * Market or pending order. MT4 needs a request price: for market orders it is taken from quote()
   * when omitted. `slippage` is in points. Rejects with an MrpcError when the broker refuses
   * (mqlIntCode: 130 invalid stops, 131 invalid volume, 132 market closed, 134 no money, 138 requote).
   */
  async orderSend(req: OrderRequest): Promise<OrderResult> {
    const type = MT4Account.orderType(req.cmd !== undefined ? req.cmd : req.action);
    const volume = req.lots !== undefined ? req.lots : req.volume;
    if (volume === undefined) throw new MrpcError('orderSend needs lots');
    const magic = req.magicNumber !== undefined ? req.magicNumber : req.magic;
    let price = req.price;
    if (price === undefined && (type === ORDER_TYPES.BUY || type === ORDER_TYPES.SELL)) {
      const q = await this.quote(req.symbol);
      price = type === ORDER_TYPES.BUY ? q.ask : q.bid;
    }
    const grpcReq = new TradingHelperPb.OrderSendRequest();
    grpcReq.setSymbol(req.symbol);
    grpcReq.setOperationType(type);
    grpcReq.setVolume(volume);
    if (price !== undefined) grpcReq.setPrice(price);
    if (req.stopLoss !== undefined) grpcReq.setStoploss(req.stopLoss);
    if (req.takeProfit !== undefined) grpcReq.setTakeprofit(req.takeProfit);
    if (req.comment !== undefined) grpcReq.setComment(req.comment);
    if (req.slippage !== undefined) grpcReq.setSlippage(req.slippage);
    if (magic !== undefined) grpcReq.setMagicNumber(magic);
    if (req.expiration) grpcReq.setExpiration(toTimestamp(req.expiration));

    const data = await this.acc.orderSend(grpcReq);
    if (!data) throw new MrpcError('Order execution returned no data');
    const vol = data.getVolume();
    return {
      ticket: Number(data.getTicket()),
      errorCode: 0,
      lots: vol,
      volume: vol,
      price: data.getPrice(),
      comment: req.comment || '',
      openTime: tsToSeconds(data.getOpenTime ? data.getOpenTime() : null),
    };
  }

  /** Change SL/TP of an open order, or SL/TP/price/expiration of a pending order. Pass the full new values. */
  async orderModify(req: OrderModifyRequest): Promise<{ modified: boolean }> {
    const grpcReq = new TradingHelperPb.OrderModifyRequest();
    grpcReq.setOrderTicket(req.ticket);
    if (req.stopLoss !== undefined) grpcReq.setNewStopLoss(req.stopLoss);
    if (req.takeProfit !== undefined) grpcReq.setNewTakeProfit(req.takeProfit);
    if (req.price !== undefined) grpcReq.setNewPrice(req.price);
    if (req.expiration) grpcReq.setNewExpiration(toTimestamp(req.expiration));
    const data = await this.acc.orderModify(grpcReq);
    if (!data) throw new MrpcError('OrderModify returned no data');
    return { modified: !!data.getOrderWasModified() };
  }

  /**
   * Close a market order (fully, or partially with `volume`) or delete a pending order.
   * Price (bid for buys / ask for sells) and volume are looked up when omitted.
   */
  async orderClose(req: OrderCloseRequest): Promise<OrderCloseResult> {
    let volume = req.volume !== undefined ? req.volume : req.lots;
    let price = req.price;
    let symbol = req.symbol;
    let type = req.type;
    if (volume === undefined || (price === undefined && (symbol === undefined || type === undefined))) {
      const o = (await this.openedOrders()).find(x => x.ticket === req.ticket);
      if (!o) throw new MrpcError(`Ticket ${req.ticket} is not open`);
      if (volume === undefined) volume = o.lots;
      symbol = o.symbol;
      type = o.type;
    }
    if (price === undefined) {
      if (type === ORDER_TYPES.BUY || type === ORDER_TYPES.SELL) {
        const q = await this.quote(symbol!);
        price = type === ORDER_TYPES.BUY ? q.bid : q.ask;
      } else {
        price = 0; // pending order delete
      }
    }
    const grpcReq = new TradingHelperPb.OrderCloseDeleteRequest();
    grpcReq.setOrderTicket(req.ticket);
    grpcReq.setLots(volume);
    grpcReq.setClosingPrice(price);
    if (req.slippage !== undefined) grpcReq.setSlippage(req.slippage);
    const data = await this.acc.orderCloseDelete(grpcReq);
    if (!data) throw new MrpcError('OrderCloseDelete returned no data');
    return { mode: Number(data.getMode()), historyComment: data.getHistoryOrderComment ? data.getHistoryOrderComment() : '' };
  }

  /** Close an order by an opposite one on the same symbol. */
  async orderCloseBy(ticket: number, oppositeTicket: number): Promise<{ closePrice: number; profit: number; closeTime: number }> {
    const grpcReq = new TradingHelperPb.OrderCloseByRequest();
    grpcReq.setTicketToClose(ticket);
    grpcReq.setOppositeTicketClosingBy(oppositeTicket);
    const data = await this.acc.orderCloseBy(grpcReq);
    if (!data) throw new MrpcError('OrderCloseBy returned no data');
    return { closePrice: data.getClosePrice(), profit: data.getProfit(), closeTime: tsToSeconds(data.getCloseTime()) };
  }

  //#endregion

  //#region 5. Streaming

  /**
   * Tick stream (OnSymbolTick). `onError` receives an error reply of the stream, its failure or its end
   * (not an unsubscribe); the caller re-subscribes after a transport error.
   */
  subscribeQuotes(symbols: string[], callback: (tick: Tick) => void, onError?: (e: any) => void): Subscription {
    const req = new SubscriptionsPb.OnSymbolTickRequest();
    if (symbols && symbols.length > 0) req.setSymbolNamesList(symbols);
    return this.acc.onSymbolTick(req, (data: any) => {
      const t = data.getSymbolTick ? data.getSymbolTick() : null;
      if (!t) return;
      const timeUtc = tsToMillis(t.getTimeUtc ? t.getTimeUtc() : null) || Number(t.getTimeMscUtc ? t.getTimeMscUtc() : 0);
      const time = Number(t.getTimeMsc()) || tsToMillis(t.getTime()) || timeUtc;
      callback({
        symbol: t.getSymbol(), bid: t.getBid(), ask: t.getAsk(), last: t.getLast(),
        volume: Number(t.getVolume()), time, timeUtc: timeUtc || time,
      });
    }, onError);
  }

  /** OnTrade event stream: fills, modifications, closes. */
  subscribeTrades(callback: (ev: { type: number; newOrders: OrderInfo[]; updatedOrders: { previous: OrderInfo; current: OrderInfo }[]; removedOrders: OrderInfo[]; newHistoryOrders: OrderInfo[]; account: any }) => void, onError?: (e: any) => void): Subscription {
    const req = new SubscriptionsPb.OnTradeRequest();
    return this.acc.onTrade(req, (data: any) => {
      const ev = data.getEventData ? data.getEventData() : null;
      callback({
        type: Number(data.getType()),
        newOrders: ev ? ev.getNewOrdersList().map(MT4Service.mapTradeOrder) : [],
        updatedOrders: ev ? ev.getUpdatedOrdersList().map((u: any) => ({ previous: MT4Service.mapTradeOrder(u.getPrevious()), current: MT4Service.mapTradeOrder(u.getCurrent()) })) : [],
        removedOrders: ev ? ev.getRemovedOrdersList().map(MT4Service.mapTradeOrder) : [],
        newHistoryOrders: ev ? ev.getNewHistoryOrdersList().map(MT4Service.mapTradeOrder) : [],
        account: MT4Service.mapStreamAccount(data.getAccountInfo ? data.getAccountInfo() : null),
      });
    }, onError);
  }

  /** Periodic snapshot of open orders with live profit + account info incl. margin (OnOpenedOrdersProfit). */
  subscribeOpenedOrdersProfit(intervalMs: number, callback: (ev: { orders: any[]; account: any }) => void, onError?: (e: any) => void): Subscription {
    const req = new SubscriptionsPb.OnOpenedOrdersProfitRequest();
    req.setTimerPeriodMilliseconds(intervalMs);
    return this.acc.onOpenedOrdersProfit(req, (data: any) => callback({
      orders: data.getOpenedOrdersWithProfitUpdatedList().map((o: any) => ({
        ticket: Number(o.getTicket()), symbol: o.getSymbol(), type: Number(o.getType()), lots: o.getLots(), openPrice: o.getOpenPrice(),
        openTime: tsToSeconds(o.getOpenTime()), stopLoss: o.getStopLoss(), takeProfit: o.getTakeProfit(), profit: o.getOrderProfit(),
        swap: o.getSwap(), commission: o.getCommission(), comment: o.getComment(), magic: Number(o.getMagicNumber()),
      })),
      account: MT4Service.mapStreamAccount(data.getAccountInfo ? data.getAccountInfo() : null),
    }), onError);
  }

  /** Periodic list of open ticket numbers (OnOpenedOrdersTickets). */
  subscribeOpenedOrdersTickets(intervalMs: number, callback: (ev: { positionTickets: number[]; pendingTickets: number[]; serverTime: number }) => void, onError?: (e: any) => void): Subscription {
    const req = new SubscriptionsPb.OnOpenedOrdersTicketsRequest();
    req.setPullIntervalMilliseconds(intervalMs);
    return this.acc.onOpenedOrdersTickets(req, (data: any) => callback({
      positionTickets: data.getPositionTicketsList().map(Number),
      pendingTickets: data.getPendingOrderTicketsList().map(Number),
      serverTime: tsToSeconds(data.getServerTime()),
    }), onError);
  }

  /** Terminal connection-state events (OnConnectState): pause a strategy while the terminal is offline. */
  subscribeConnectState(callback: (ev: any) => void, onError?: (e: any) => void): Subscription {
    const Req = ConnectionPb.OnConnectStateRequest || ConnectionPb.ConnectStateRequest;
    return this.acc.onConnectState(new Req(), (data: any) => callback(data.toObject ? data.toObject() : data), onError);
  }

  //#endregion

  //#region mappers

  static mapQuote(q: any): Quote {
    return {
      symbol: q.getSymbol(), bid: q.getBid(), ask: q.getAsk(), high: q.getHigh(), low: q.getLow(),
      time: tsToSeconds(q.getDateTime()),
    };
  }

  static mapSymbolParams(s: any): SymbolParams {
    return {
      name: s.getSymbolname(),
      description: s.getSymdescription(),
      digits: Number(s.getDigits()),
      point: s.getPoint(),
      spreadFloat: !!s.getSpreadfloat(),
      contractSize: s.getTradecontractsize(),
      volumeMin: s.getVolumemin(),
      volumeMax: s.getVolumemax(),
      volumeStep: s.getVolumestep(),
      volumeLimit: s.getVolumelimit(),
      stopsLevel: Number(s.getTradestopslevel()),
      freezeLevel: Number(s.getTradefreezelevel()),
      tickValue: s.getTradetickvalue(),
      tickSize: s.getTradeticksize(),
      swapLong: s.getSwaplong(),
      swapShort: s.getSwapshort(),
      swapMode: Number(s.getSwapmode()),
      currencyBase: s.getCurrencybase(),
      currencyProfit: s.getCurrencyprofit(),
      currencyMargin: s.getCurrencymargin(),
      tradeMode: Number(s.getTrademode()),
      tradeExeMode: Number(s.getTradeexemode()),
      tradeCalcMode: Number(s.getTradecalcmode()),
      marginInitial: s.getMargininitial(),
      marginMaintenance: s.getMarginmaintenance(),
      isSelected: !!s.getIsSelected(),
      visible: !!s.getVisible(),
      bid: s.getBid(),
      time: tsToSeconds(s.getTime()),
      path: s.getPath(),
    };
  }

  static mapOrderInfo(o: any): OrderInfo {
    const r: OrderInfo = {
      ticket: Number(o.getTicket()),
      symbol: o.getSymbol(),
      type: Number(o.getOrderType()),
      lots: o.getLots(),
      openPrice: o.getOpenPrice(),
      openTime: tsToSeconds(o.getOpenTime()),
      stopLoss: o.getStopLoss(),
      takeProfit: o.getTakeProfit(),
      profit: o.getProfit(),
      swap: o.getSwap(),
      commission: o.getCommision ? o.getCommision() : 0, // (sic) proto field name
      comment: o.getComment(),
      magic: Number(o.getMagicNumber()),
      expiration: tsToSeconds(o.getExpirationTime ? o.getExpirationTime() : null),
      accountLogin: Number(o.getAccountLogin ? o.getAccountLogin() : 0),
    };
    if (o.getCloseTime) {
      r.closeTime = tsToSeconds(o.getCloseTime());
      r.closePrice = o.getClosePrice();
    }
    return r;
  }

  /** OrderInfo-like object carried by the OnTrade / OnOpenedOrdersProfit streams. */
  static mapTradeOrder(o: any): OrderInfo {
    return {
      ticket: Number(o.getTicket()), symbol: o.getSymbol(), type: Number(o.getType()), lots: o.getLots(),
      openPrice: o.getOpenPrice(), openTime: tsToSeconds(o.getOpenTime()), stopLoss: o.getStopLoss(), takeProfit: o.getTakeProfit(),
      profit: o.getOrderProfit(), swap: o.getSwap(), commission: o.getCommission(), comment: o.getComment(),
      magic: Number(o.getMagicNumber()), expiration: tsToSeconds(o.getExpiration()), accountLogin: Number(o.getAccountLogin ? o.getAccountLogin() : 0),
      closeTime: tsToSeconds(o.getCloseTime ? o.getCloseTime() : null), closePrice: o.getClosePrice ? o.getClosePrice() : 0,
    };
  }

  static mapStreamAccount(a: any): any {
    return a ? {
      balance: a.getBalance(), credit: a.getCredit ? a.getCredit() : 0, equity: a.getEquity(), margin: a.getMargin(),
      freeMargin: a.getFreeMargin(), profit: a.getProfit(), marginLevel: a.getMarginLevel(), login: Number(a.getLogin ? a.getLogin() : 0),
    } : null;
  }

  static mapStats(d: any): TradeStats {
    // scalar getter (NaN-safe: a non-number, e.g. an unset field, becomes 0)
    const n = (g: string) => {
      const v = d && typeof d[g] === 'function' ? d[g]() : undefined;
      return typeof v === 'number' && Number.isFinite(v) ? v : 0;
    };
    // best/worst trade are nested messages { tiket, date, profit } — take the profit
    const prof = (g: string) => {
      const m = d && typeof d[g] === 'function' ? d[g]() : undefined;
      return m && typeof m.getProfit === 'function' ? Number(m.getProfit()) || 0 : 0;
    };
    // averageWin/averageLost are { averagePips, averageUsd } — take the USD value
    const usd = (g: string) => {
      const m = d && typeof d[g] === 'function' ? d[g]() : undefined;
      return m && typeof m.getAverageUsd === 'function' ? Number(m.getAverageUsd()) || 0 : 0;
    };
    return {
      trades: n('getTrades'), profitability: n('getProfitability'), profitFactor: n('getProfitFactor'),
      expectancy: n('getExpectancy'), ghpr: n('getGhpr'), growthPercent: n('getGrowthPercent'),
      sharpeRatio: n('getSharpeRatio'), zScore: n('getZScore'), standardDeviation: n('getStandardDeviation'),
      pips: n('getPips'), lots: n('getLots'), deposits: n('getDeposits'), withdrawals: n('getWithdrawals'),
      commissions: n('getComissions'), bestTrade: prof('getBestTrade'), worstTrade: prof('getWorstTrade'),
      bestTradePips: prof('getBestTradePips'), worstTradePips: prof('getWorstTradePips'),
      averageWin: usd('getAverageWin'), averageLost: usd('getAverageLost'), averageTradeLength: n('getAverageTradeLength'),
      longsWon: n('getLongsWon'), shortsWon: n('getShortsWon'),
      maxBalanceDrawdownRaw: n('getMaxBalanceDrawdownRaw'), maxBalanceDrawdownRelative: n('getMaxBalanceDrawdownRelative'),
      maxEquityDrawdownRaw: n('getMaxEquityDrawdownRaw'), maxEquityDrawdownRelative: n('getMaxEquityDrawdownRelative'),
      markets: d && d.getMarketsList ? d.getMarketsList() : [],
    };
  }

  static mapEquityPoint(p: any): EquityPoint {
    return {
      time: tsToSeconds(p.getTime ? p.getTime() : null),
      timeUtc: tsToMillis(p.getTimeUtc ? p.getTimeUtc() : null),
      balance: p.getBalance(), equity: p.getEquity(),
      realizedPl: p.getRealizedPl ? p.getRealizedPl() : 0,
      unrealizedPl: p.getUnrealizedPl ? p.getUnrealizedPl() : 0,
      cashFlow: p.getCashFlow ? p.getCashFlow() : 0,
      balanceDrawdownRaw: p.getBalanceDrawdownRaw ? p.getBalanceDrawdownRaw() : 0,
      balanceDrawdownRelative: p.getBalanceDrawdownRelative ? p.getBalanceDrawdownRelative() : 0,
      equityDrawdownRaw: p.getEquityDrawdownRaw ? p.getEquityDrawdownRaw() : 0,
      equityDrawdownRelative: p.getEquityDrawdownRelative ? p.getEquityDrawdownRelative() : 0,
    };
  }

  //#endregion
}
