import * as grpc from '@grpc/grpc-js';
export declare const ConnectionGrpc: any;
export declare const ConnectionPb: any;
export declare const AccountHelperGrpc: any;
export declare const AccountHelperPb: any;
export declare const TradingHelperGrpc: any;
export declare const TradingHelperPb: any;
export declare const SubscriptionsGrpc: any;
export declare const SubscriptionsPb: any;
export declare const MarketInfoGrpc: any;
export declare const MarketInfoPb: any;
export declare const ErrorPb: any;
export declare const TimestampPb: any;
/** QuoteHistory timeframes (ENUM_QUOTE_HISTORY_TIMEFRAME). NOTE: these are enum ordinals, not MT4 minute counts. */
export declare const TIMEFRAMES: Record<string, number>;
export type OrderCommand = 'BUY' | 'SELL' | 'BUY_LIMIT' | 'SELL_LIMIT' | 'BUY_STOP' | 'SELL_STOP';
/** Alias of OrderCommand. */
export type OrderAction = OrderCommand;
/** MT4 order operation types (OrderSendOperationType / OpenedOrderType share the same numbering: 0..5). */
export declare const ORDER_TYPES: Record<OrderCommand, number>;
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
    /** The broker server name the account was connected with (e.g. "TeleTrade-Demo"), or the host for a Connect by address. */
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
    /** Stale snapshot - use quote()/subscribeQuotes() for prices. */
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
    /** Order command: 'BUY' | 'SELL' | 'BUY_LIMIT' | 'SELL_LIMIT' | 'BUY_STOP' | 'SELL_STOP' (or the ORDER_TYPES number). */
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
    /** The comment the order was sent with. */
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
export interface ConnectOptions {
    user: number;
    password: string;
    /** Broker cluster name (ConnectEx), e.g. "TeleTrade-Demo". */
    server?: string;
    /** Direct host/port connect (Connect) when no cluster name is known. */
    host?: string;
    port?: number;
    /** How long the gateway waits for the terminal to start (cold start ~10-15 s). Default 60. */
    timeoutSeconds?: number;
    /** Stable terminal id (uuid5 of the strategy id). Re-runs re-attach to the same terminal. */
    id?: string;
    /** Label shown in GET /Accounts. */
    name?: string;
    expiration?: Date | number;
}
export interface Subscription {
    unsubscribe(): void;
}
/**
 * An error the MRPC API answered with (the reply's `error`), or a failed call. `error` is the reply's error message
 * itself (absent for a failed call): `getMqlErrorCode()`, `getMqlErrorTradeIntCode()` and the rest of its fields.
 * The MQL fields are also unpacked: `mqlIntCode` is the MT4 error number (130 invalid stops, 131 invalid volume,
 * 132 market closed, 133 trade disabled, 134 not enough money, 138 requote), `mqlDescription` its text.
 */
export declare class MrpcError extends Error {
    readonly code: string;
    readonly error?: any;
    readonly mqlCode: number;
    readonly mqlIntCode: number;
    readonly mqlDescription: string;
    constructor(message: string, code?: string, error?: any);
    /** Builds the error for a reply's `error` message (mrpc.Error). */
    static fromReply(error: any): MrpcError;
    /** INVALID_LOGIN / wrong password errors must never be retried (brokers lock accounts). */
    get isInvalidLogin(): boolean;
    /** Errors after which reconnect() is worth a try (the terminal vanished on the gateway). */
    get isTerminalLost(): boolean;
}
/** Alias of MrpcError. */
export { MrpcError as MT4Error };
export declare class MT4Client {
    host: string;
    port: number;
    apiKey: string | null;
    id: string | null;
    /** Terminal label (ConnectEx `name`), re-sent by reconnect(). */
    name: string | null;
    connected: boolean;
    channel: grpc.Channel;
    connectionClient: any;
    accountClient: any;
    tradingClient: any;
    subscriptionClient: any;
    marketInfoClient: any;
    /** Default deadline for unary calls, ms. */
    callTimeoutMs: number;
    private lastUser?;
    private lastPassword?;
    private lastServer?;
    private lastConnect?;
    /** RFC 4122 UUID v5 (SHA-1) - derive a stable terminal id from a strategy name (same result as Python's uuid.uuid5). */
    static uuid5(namespace: string, name: string): string;
    /** RFC 4122 DNS namespace (same constant as Python's uuid.NAMESPACE_DNS). */
    static NAMESPACE_DNS: string;
    /**
     * Opens a new demo account through the API (GET /DemoAccount/Open) and returns its credentials.
     * @param host the REST host of the platform, e.g. "mt4.mrpc.pro"
     */
    static openDemoAccount(server?: string, apiKey?: string, host?: string): Promise<{
        login: number;
        password: string;
        server: string;
    }>;
    constructor(host?: string, port?: number, apiKey?: string | null, id?: string | null);
    getHeaders(): Record<string, string>;
    getGrpcMetadata(): grpc.Metadata;
    /**
     * A unary call `client[method](req, metadata, {deadline}, cb)`: resolves with the reply's data, rejects with
     * an MrpcError for the reply's error or with the gRPC error of a failed call. Usable with the generated clients
     * for the methods this class does not wrap.
     */
    call(client: any, method: string, req: any, timeoutMs?: number): Promise<any>;
    /** The terminal id the server assigns to these credentials (Connection.GetId). Defaults to the last connect()'s. */
    getId(user?: number | string, password?: string): Promise<string>;
    /**
     * Start (or re-attach to) a terminal on the gateway. With `server` it uses ConnectEx (broker cluster
     * name, e.g. "TeleTrade-Demo"); with `host`/`port` it uses Connect. Pass a stable `id` so re-runs reuse
     * the terminal. Short form: `connect(login, password, server)`.
     */
    connect(loginOrOptions: number | ConnectOptions, password?: string, server?: string): Promise<boolean>;
    /** Re-run the last connect() (same id/name) - call it after a TERMINAL_INSTANCE_NOT_FOUND or transport error. */
    reconnect(): Promise<boolean>;
    /** CheckConnect liveness probe: true when the terminal answers. */
    checkConnect(): Promise<boolean>;
    static tradeModeName(code: number): 'DEMO' | 'CONTEST' | 'REAL' | 'UNKNOWN';
    /** AccountSummary: what the server answered (see AccountInfo for where margin lives). */
    getAccountInfo(): Promise<AccountInfo>;
    /** Every symbol name the account can see (one cheap call). */
    symbolList(): Promise<{
        name: string;
        index: number;
    }[]>;
    /** Add (select=true) or remove a symbol from Market Watch. Idempotent. */
    symbolSelect(symbol: string, select?: boolean): Promise<boolean>;
    static mapQuote(q: any): Quote;
    /** Current bid/ask of one symbol (the price source to use - SymbolParams.bid is stale). */
    quote(symbol: string): Promise<Quote>;
    quoteMany(symbols: string[]): Promise<Quote[]>;
    static mapSymbolParams(s: any): SymbolParams;
    /** Contract specification of one symbol (SymbolParamsMany with a name). */
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
    /**
     * Select the symbol and wait until it has a two-sided quote (a freshly selected symbol reports
     * bid=ask=0 for a few seconds). Returns the quote.
     */
    ensureSymbol(symbol: string, waitMs?: number): Promise<Quote>;
    /**
     * OHLC history in a SERVER-time window (seconds or Date, encoded as if UTC). Sorted ascending.
     * Timeframe: 'M1'..'MN1' or an ENUM_QUOTE_HISTORY_TIMEFRAME value. There is no bar count
     * argument - the window decides; use lastBars() for "the newest N".
     */
    quoteHistory(symbol: string, timeframe: string | number, from: Date | number, to: Date | number): Promise<Bar[]>;
    /**
     * Newest `count` bars. `utcServerShiftMinutes` comes from getAccountInfo(); the look-back
     * window is widened automatically (weekends) until enough bars come back.
     */
    lastBars(symbol: string, timeframe: string | number, count: number, utcServerShiftMinutes?: number): Promise<Bar[]>;
    /** The MT4 operation type of an order command ('BUY', 'SELL_LIMIT', ... or a number). */
    static orderType(cmd: OrderCommand | number | undefined): number;
    /**
     * Market or pending order. MT4 needs a request price: for market orders it is taken from quote()
     * when omitted. `slippage` is in points. Rejects with an MrpcError when the broker refuses
     * (e.mqlIntCode: 130 invalid stops, 131 invalid volume, 132 market closed, 134 no money, 138 requote).
     */
    orderSend(req: OrderRequest): Promise<OrderResult>;
    /** Change SL/TP of an open order, or SL/TP/price/expiration of a pending order. Pass the full new values (unchanged ones too). */
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
    static mapOrderInfo(o: any): OrderInfo;
    /** Every open market order and pending order (MT4 has no netting: one ticket per fill). */
    openedOrders(sortType?: number): Promise<OrderInfo[]>;
    /** Open market orders (types BUY/SELL), optionally only those carrying a given magic number. */
    positions(magic?: number): Promise<OrderInfo[]>;
    /** Pending orders (types 2-5), optionally filtered by magic. */
    pendingOrders(magic?: number): Promise<OrderInfo[]>;
    openedOrdersTickets(): Promise<number[]>;
    /**
     * Closed orders in a SERVER-time window (use serverDate() to build it from UTC).
     * opts.sort: EnumOrderHistorySortType (default HISTORY_SORT_BY_CLOSE_TIME_DESC = 3).
     */
    ordersHistory(from: Date | number, to: Date | number, opts?: {
        sort?: number;
        page?: number;
        perPage?: number;
    }): Promise<OrdersHistory>;
    /** Convert a UTC instant to broker server time using the shift reported by getAccountInfo(). */
    static serverDate(utc: Date, utcServerShiftMinutes: number): Date;
    /** Convert a server-time epoch (seconds) back to a UTC Date. */
    static fromServerSeconds(serverSeconds: number, utcServerShiftMinutes: number): Date;
    /**
     * A server stream of the SubscriptionService. An error reply and the stream's failure or end go to `onError`
     * (a cancelled stream - `unsubscribe()` - is not an error).
     */
    private stream;
    /**
     * Tick stream (OnSymbolTick). `onError` receives an error reply of the stream, its failure or its end
     * (not an unsubscribe); the caller re-subscribes after a transport error.
     */
    subscribeQuotes(symbols: string[], callback: (tick: Tick) => void, onError?: (e: any) => void): Subscription;
    /** OnTrade event stream: fills, modifications, closes. Lists are OrderInfo-like objects. */
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
    /**
     * Stop the terminal on the gateway (`deleteTerminal` also deletes it) and close the channel. Rejects when the
     * server refuses. Strategies that want their terminal kept warm between runs should NOT call this - just
     * exit (or close()); the gateway keeps the terminal under the id.
     */
    disconnect(deleteTerminal?: boolean): Promise<void>;
    /** Close the gRPC channel without touching the terminal on the gateway. */
    close(): void;
}
