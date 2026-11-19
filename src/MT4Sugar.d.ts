import { MT4Account } from './MT4Account';
import { MT4Service, AccountInfo, OrderInfo, SymbolParams } from './MT4Service';
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
export declare class MT4Sugar {
    private readonly svc;
    constructor(svc: MT4Service);
    /** Construct the whole stack (Sugar → Service → Account) in one call. */
    static create(host?: string, port?: number, apiKey?: string | null, id?: string | null): MT4Sugar;
    /** The friendly facade underneath. */
    service(): MT4Service;
    /** The low-level client underneath. */
    account(): MT4Account;
    /** Connect using login / password / server (or the env vars MT4_LOGIN / MT4_PASSWORD / MT4_SERVER). */
    quickConnect(login?: number, password?: string, server?: string): Promise<boolean>;
    /** `true` after a successful connect. */
    isConnected(): boolean;
    /** Lightweight liveness probe: checks the terminal is connected and alive. */
    ping(): Promise<boolean>;
    private summary;
    /**
     * A live account snapshot incl. margin. MT4's AccountSummary has no margin fields, so this takes the first
     * OnOpenedOrdersProfit event; if none arrives in `timeoutMs` it falls back to AccountSummary (margin 0, free
     * margin = equity) — correct for a flat account.
     */
    private liveAccount;
    /** Account balance (excludes floating P/L). */
    getBalance(): Promise<number>;
    /** Account equity (balance + floating P/L). */
    getEquity(): Promise<number>;
    /** Margin currently in use (from a live snapshot). */
    getMargin(): Promise<number>;
    /** Free margin available for new orders (from a live snapshot). */
    getFreeMargin(): Promise<number>;
    /** Margin level, percent (0 when flat; from a live snapshot). */
    getMarginLevel(): Promise<number>;
    /** Current floating profit (equity − balance). */
    getProfit(): Promise<number>;
    /** Current bid of a symbol. */
    getBid(symbol: string): Promise<number>;
    /** Current ask of a symbol. */
    getAsk(symbol: string): Promise<number>;
    /** Current spread (ask − bid), in price units. */
    getSpread(symbol: string): Promise<number>;
    /** Bid / ask / spread-in-pips / time in one snapshot. */
    getPriceInfo(symbol: string): Promise<PriceInfo>;
    /**
     * Poll until the bid reaches `targetBid` (or just the next tick when `targetBid` is 0), up to
     * `timeoutMs`. Returns the last price seen, or `null` on timeout.
     */
    waitForPrice(symbol: string, targetBid: number, timeoutMs?: number): Promise<PriceInfo | null>;
    /** Send an order and return its ticket; a broker rejection throws an `MrpcError`. */
    private send;
    /** Open a market BUY; returns the ticket. */
    buyMarket(symbol: string, volume: number): Promise<number>;
    /** Open a market SELL; returns the ticket. */
    sellMarket(symbol: string, volume: number): Promise<number>;
    /** Place a BUY LIMIT at `price`. */
    buyLimit(symbol: string, volume: number, price: number): Promise<number>;
    /** Place a SELL LIMIT at `price`. */
    sellLimit(symbol: string, volume: number, price: number): Promise<number>;
    /** Place a BUY STOP at `price`. */
    buyStop(symbol: string, volume: number, price: number): Promise<number>;
    /** Place a SELL STOP at `price`. */
    sellStop(symbol: string, volume: number, price: number): Promise<number>;
    /** Market BUY with absolute SL/TP prices. */
    buyMarketWithSLTP(symbol: string, volume: number, sl: number, tp: number): Promise<number>;
    /** Market SELL with absolute SL/TP prices. */
    sellMarketWithSLTP(symbol: string, volume: number, sl: number, tp: number): Promise<number>;
    /** Pending BUY LIMIT at `price` with absolute SL/TP. */
    buyLimitWithSLTP(symbol: string, volume: number, price: number, sl: number, tp: number): Promise<number>;
    /** Pending SELL LIMIT at `price` with absolute SL/TP. */
    sellLimitWithSLTP(symbol: string, volume: number, price: number, sl: number, tp: number): Promise<number>;
    /** Close a position fully (deletes a pending order). Throws on a rejection. */
    closePosition(ticket: number): Promise<boolean>;
    /** Close part of a position (`volume` lots). */
    closePositionPartial(ticket: number, volume: number): Promise<boolean>;
    /** Close every open position; returns how many were closed. */
    closeAllPositions(): Promise<number>;
    /** Close every open position on one symbol; returns how many were closed. */
    closeAllBySymbol(symbol: string): Promise<number>;
    private closePositions;
    /** Set a position's stop-loss (keeps its take-profit). */
    modifyPositionSL(ticket: number, sl: number): Promise<boolean>;
    /** Set a position's take-profit (keeps its stop-loss). */
    modifyPositionTP(ticket: number, tp: number): Promise<boolean>;
    /** Set both stop-loss and take-profit of a position. */
    modifyPositionSLTP(ticket: number, sl: number, tp: number): Promise<boolean>;
    /** All open positions (open market orders). */
    getOpenPositions(): Promise<OrderInfo[]>;
    /** The open position with this ticket, or `undefined`. */
    getPositionByTicket(ticket: number): Promise<OrderInfo | undefined>;
    /** Open positions on one symbol. */
    getPositionsBySymbol(symbol: string): Promise<OrderInfo[]>;
    /** Whether any position is open on a symbol. */
    hasOpenPosition(symbol: string): Promise<boolean>;
    /** Number of open positions. */
    countOpenPositions(): Promise<number>;
    /** Summed floating profit across all open positions. */
    getTotalProfit(): Promise<number>;
    /** Summed floating profit of the positions on one symbol. */
    getProfitBySymbol(symbol: string): Promise<number>;
    /** Closed orders in a window (server-day boundaries approximated by the local day). */
    private history;
    /** Closed orders from today. */
    getDealsToday(): Promise<OrderInfo[]>;
    /** Closed orders from yesterday. */
    getDealsYesterday(): Promise<OrderInfo[]>;
    /** Closed orders since the start of this week (Monday). */
    getDealsThisWeek(): Promise<OrderInfo[]>;
    /** Closed orders since the start of this month. */
    getDealsThisMonth(): Promise<OrderInfo[]>;
    /** Closed orders in a custom window. */
    getDealsDateRange(from: Date, to: Date): Promise<OrderInfo[]>;
    /** Net profit of orders closed today. */
    getProfitToday(): Promise<number>;
    /** Net profit of orders closed this week. */
    getProfitThisWeek(): Promise<number>;
    /** Net profit of orders closed this month. */
    getProfitThisMonth(): Promise<number>;
    /** Full contract specification of a symbol. */
    getSymbolInfo(symbol: string): Promise<SymbolParams>;
    /** Every symbol name the account can see. */
    getAllSymbols(): Promise<string[]>;
    /** Whether the broker knows this symbol. */
    isSymbolAvailable(symbol: string): Promise<boolean>;
    /** Minimum SL/TP distance from the market, in points. */
    getMinStopLevel(symbol: string): Promise<number>;
    /** Price decimal places of a symbol. */
    getSymbolDigits(symbol: string): Promise<number>;
    /** Lot size so that a `stopLossPips` stop risks `riskPercent`% of the balance. */
    calculatePositionSize(symbol: string, riskPercent: number, stopLossPips: number): Promise<number>;
    /** Largest lot the current free margin (80% of it) can open on this symbol. */
    getMaxLotSize(symbol: string): Promise<number>;
    /** Whether a `volume`-lot order can be opened now; the string explains a `false`. */
    canOpenPosition(symbol: string, volume: number): Promise<{
        ok: boolean;
        reason: string;
    }>;
    /**
     * Margin required to open `volume` lots of `symbol`. Uses the symbol's initial margin when the broker reports
     * it, else estimates it from the contract size, the ask and the account leverage.
     */
    calculateRequiredMargin(symbol: string, volume: number): Promise<number>;
    /**
     * Absolute SL/TP prices for a `direction` ("BUY"/"SELL") given pip distances from `entryPrice`
     * (0 = use the current ask for BUY / bid for SELL).
     */
    calculateSLTP(symbol: string, direction: 'BUY' | 'SELL', entryPrice: number, stopLossPips: number, takeProfitPips: number): Promise<{
        sl: number;
        tp: number;
    }>;
    private clampVolume;
    /** Market BUY with SL/TP given as pip distances from entry. */
    buyMarketWithPips(symbol: string, volume: number, stopLossPips: number, takeProfitPips: number): Promise<number>;
    /** Market SELL with SL/TP given as pip distances from entry. */
    sellMarketWithPips(symbol: string, volume: number, stopLossPips: number, takeProfitPips: number): Promise<number>;
    /** Full account snapshot. */
    getAccountInfo(): Promise<AccountInfo>;
    /** Today's win/loss summary from the orders closed today. */
    getDailyStats(): Promise<DailyStats>;
}
