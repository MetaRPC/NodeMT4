import { MT4Account, ConnectOptions, Subscription, OrderCommand, Timeframe } from './MT4Account';
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
export declare class MT4Service {
    private readonly acc;
    constructor(acc: MT4Account);
    /** Build the whole stack (MT4Service → MT4Account) in one call. */
    static create(host?: string, port?: number, apiKey?: string | null, id?: string | null): MT4Service;
    /** The raw `MT4Account` underneath, for the methods this facade does not wrap. */
    account(): MT4Account;
    /** Start (or re-attach to) a terminal. Short form `connect(login, password, server)` or a ConnectOptions object. */
    connect(loginOrOptions: number | ConnectOptions, password?: string, server?: string): Promise<boolean>;
    /** The terminal id for these credentials (defaults to the last connect()'s). */
    getId(user?: number | string, password?: string): Promise<string>;
    /** Re-run the last connect() (same id/name). */
    reconnect(): Promise<boolean>;
    /** Liveness probe: true when the terminal answers. */
    checkConnect(): Promise<boolean>;
    isConnected(): boolean;
    /** Stop the terminal on the gateway (`deleteTerminal` also deletes it) and close the channel. */
    disconnect(deleteTerminal?: boolean): Promise<void>;
    /** Close the gRPC channel without touching the terminal. */
    close(): void;
    /** AccountSummary → a typed AccountInfo (see the interface for where margin lives). */
    getAccountInfo(): Promise<AccountInfo>;
    /** Aggregated trade statistics since `from` (UTC). Returns a typed TradeStats. */
    getTradeStats(from: Date | number): Promise<TradeStats>;
    /** Stats + equity curve + the trades behind them (since `from`, UTC). */
    getTradeStatsEquityHistory(from: Date | number, excludeSameBars?: boolean): Promise<{
        stats: TradeStats;
        equity: EquityPoint[];
    }>;
    /** The equity-curve points since `from` (UTC). `excludeSameBars` drops flat points. */
    getEquityHistory(from: Date | number, excludeSameBars?: boolean): Promise<EquityPoint[]>;
    /** The best/worst unrealized P/L reached per open order since `from` (UTC). */
    getTradeUnrealizedPl(from: Date | number): Promise<any[]>;
    /** Every open market order and pending order (MT4 has no netting: one ticket per fill). */
    openedOrders(sortType?: number): Promise<OrderInfo[]>;
    /** Open market orders (types BUY/SELL), optionally only those carrying a given magic number. */
    positions(magic?: number): Promise<OrderInfo[]>;
    /** Pending orders (types 2-5), optionally filtered by magic. */
    pendingOrders(magic?: number): Promise<OrderInfo[]>;
    /** Just the ticket numbers of all open/pending orders. */
    openedOrdersTickets(): Promise<number[]>;
    /**
     * Closed orders in a SERVER-time window (use MT4Account.serverDate() to build it from UTC).
     * opts.sort: EnumOrderHistorySortType (default HISTORY_SORT_BY_CLOSE_TIME_DESC = 3).
     */
    ordersHistory(from: Date | number, to: Date | number, opts?: {
        sort?: number;
        page?: number;
        perPage?: number;
    }): Promise<OrdersHistory>;
    /** Every symbol name the account can see (one cheap call). */
    symbolList(): Promise<{
        name: string;
        index: number;
    }[]>;
    /** Add (select=true) or remove a symbol from Market Watch. Idempotent. */
    symbolSelect(symbol: string, select?: boolean): Promise<boolean>;
    /** Current bid/ask of one symbol (the price source to use — SymbolParams.bid is stale). */
    quote(symbol: string): Promise<Quote>;
    /** Current bid/ask of several symbols in one call. */
    quoteMany(symbols: string[]): Promise<Quote[]>;
    /** Contract specification of one symbol. */
    symbolParams(symbol: string): Promise<SymbolParams>;
    /** Contract specifications of every symbol (one call; bid fields are stale). */
    symbolParamsAll(): Promise<SymbolParams[]>;
    /** Tick value / tick size / contract size for many symbols in one call (sizing). */
    tickValueWithSize(symbols: string[]): Promise<{
        symbol: string;
        tickValue: number;
        tickSize: number;
        contractSize: number;
    }[]>;
    /** The broker server's timezone / UTC offset. */
    getServerTimezone(): Promise<ServerTimezone>;
    /**
     * Select the symbol and wait until it has a two-sided quote (a freshly selected symbol reports
     * bid=ask=0 for a few seconds). Returns the quote.
     */
    ensureSymbol(symbol: string, waitMs?: number): Promise<Quote>;
    /**
     * OHLC history in a SERVER-time window (seconds or Date, encoded as if UTC). Sorted ascending.
     * Timeframe: 'M1'..'MN1' or an ENUM_QUOTE_HISTORY_TIMEFRAME value.
     */
    quoteHistory(symbol: string, timeframe: Timeframe, from: Date | number, to: Date | number): Promise<Bar[]>;
    /**
     * Newest `count` bars. `utcServerShiftMinutes` comes from getAccountInfo(); the look-back
     * window is widened automatically (weekends) until enough bars come back.
     */
    lastBars(symbol: string, timeframe: Timeframe, count: number, utcServerShiftMinutes?: number): Promise<Bar[]>;
    /**
     * Market or pending order. MT4 needs a request price: for market orders it is taken from quote()
     * when omitted. `slippage` is in points. Rejects with an MrpcError when the broker refuses
     * (mqlIntCode: 130 invalid stops, 131 invalid volume, 132 market closed, 134 no money, 138 requote).
     */
    orderSend(req: OrderRequest): Promise<OrderResult>;
    /** Change SL/TP of an open order, or SL/TP/price/expiration of a pending order. Pass the full new values. */
    orderModify(req: OrderModifyRequest): Promise<{
        modified: boolean;
    }>;
    /**
     * Close a market order (fully, or partially with `volume`) or delete a pending order.
     * Price (bid for buys / ask for sells) and volume are looked up when omitted.
     */
    orderClose(req: OrderCloseRequest): Promise<OrderCloseResult>;
    /** Close an order by an opposite one on the same symbol. */
    orderCloseBy(ticket: number, oppositeTicket: number): Promise<{
        closePrice: number;
        profit: number;
        closeTime: number;
    }>;
    /**
     * Tick stream (OnSymbolTick). `onError` receives an error reply of the stream, its failure or its end
     * (not an unsubscribe); the caller re-subscribes after a transport error.
     */
    subscribeQuotes(symbols: string[], callback: (tick: Tick) => void, onError?: (e: any) => void): Subscription;
    /** OnTrade event stream: fills, modifications, closes. */
    subscribeTrades(callback: (ev: {
        type: number;
        newOrders: OrderInfo[];
        updatedOrders: {
            previous: OrderInfo;
            current: OrderInfo;
        }[];
        removedOrders: OrderInfo[];
        newHistoryOrders: OrderInfo[];
        account: any;
    }) => void, onError?: (e: any) => void): Subscription;
    /** Periodic snapshot of open orders with live profit + account info incl. margin (OnOpenedOrdersProfit). */
    subscribeOpenedOrdersProfit(intervalMs: number, callback: (ev: {
        orders: any[];
        account: any;
    }) => void, onError?: (e: any) => void): Subscription;
    /** Periodic list of open ticket numbers (OnOpenedOrdersTickets). */
    subscribeOpenedOrdersTickets(intervalMs: number, callback: (ev: {
        positionTickets: number[];
        pendingTickets: number[];
        serverTime: number;
    }) => void, onError?: (e: any) => void): Subscription;
    /** Terminal connection-state events (OnConnectState): pause a strategy while the terminal is offline. */
    subscribeConnectState(callback: (ev: any) => void, onError?: (e: any) => void): Subscription;
    static mapQuote(q: any): Quote;
    static mapSymbolParams(s: any): SymbolParams;
    static mapOrderInfo(o: any): OrderInfo;
    /** OrderInfo-like object carried by the OnTrade / OnOpenedOrdersProfit streams. */
    static mapTradeOrder(o: any): OrderInfo;
    static mapStreamAccount(a: any): any;
    static mapStats(d: any): TradeStats;
    static mapEquityPoint(p: any): EquityPoint;
}
