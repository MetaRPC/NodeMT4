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
/** MT4 order operation types (OrderSendOperationType / OpenedOrderType share the same numbering). */
export declare const ORDER_TYPES: Record<string, number>;
export interface AccountInfo {
    login: number;
    currency: string;
    balance: number;
    equity: number;
    credit: number;
    margin: number;
    freeMargin: number;
    leverage: number;
    name: string;
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
    /** Milliseconds since epoch, broker server time. */
    time: number;
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
export type OrderAction = 'BUY' | 'SELL' | 'BUY_LIMIT' | 'SELL_LIMIT' | 'BUY_STOP' | 'SELL_STOP';
export interface OrderRequest {
    symbol: string;
    /** Preferred name. */
    action?: OrderAction | number;
    /** Legacy alias of `action`. */
    cmd?: OrderAction | number;
    /** Preferred name. */
    volume?: number;
    /** Legacy alias of `volume`. */
    lots?: number;
    /** MT4 request price. For market orders it is filled from quote() (ask for buys, bid for sells) when omitted. */
    price?: number;
    /** Points. */
    slippage?: number;
    stopLoss?: number;
    takeProfit?: number;
    comment?: string;
    magic?: number;
    /** Pending-order expiration (server time). */
    expiration?: Date | number;
}
export interface OrderResult {
    ticket: number;
    /** 0 on success (an error throws MT4Error). Kept for backward compatibility. */
    errorCode: number;
    price: number;
    lots: number;
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
export interface ConnectOptions {
    user: number;
    password: string;
    /** Broker cluster name (ConnectEx), e.g. "TeleTrade-Demo". */
    server?: string;
    /** Direct host/port connect (Connect) when no cluster name is known. */
    host?: string;
    port?: number;
    /** How long the gateway waits for the terminal to start (cold start ~10-15 s). */
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
/** Error raised when the gateway answers with an Error payload instead of data. */
export declare class MT4Error extends Error {
    code: string;
    mqlCode: number;
    mqlIntCode: number;
    mqlDescription: string;
    constructor(err: any);
    /** INVALID_LOGIN / wrong password errors must never be retried (brokers lock accounts). */
    get isInvalidLogin(): boolean;
    /** Errors after which the SDK's reconnect() is worth a try (terminal vanished on the gateway). */
    get isTerminalLost(): boolean;
}
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
    private lastConnect?;
    static computeDeterministicId(user: number | string, password: string): string;
    /** RFC 4122 UUID v5 (SHA-1) - derive a stable terminal id from a strategy name. */
    static uuid5(namespace: string, name: string): string;
    /** RFC 4122 DNS namespace (same constant as Python's uuid.NAMESPACE_DNS). */
    static NAMESPACE_DNS: string;
    static openDemoAccount(server?: string, apiKey?: string): Promise<{
        login: number;
        password: string;
        server: string;
    }>;
    constructor(host?: string, port?: number, apiKey?: string | null, id?: string | null);
    getHeaders(): Record<string, string>;
    getGrpcMetadata(): grpc.Metadata;
    /**
     * Generic unary call: `client[method](req, metadata, {deadline}, cb)`. Throws MT4Error when the
     * reply carries an Error payload, returns reply.getData() otherwise.
     */
    call(client: any, method: string, req: any, timeoutMs?: number): Promise<any>;
    getId(user?: number | string, password?: string): Promise<string>;
    /**
     * Start (or re-attach to) a terminal on the gateway. With `server` it uses ConnectEx (cluster
     * name); with `host`/`port` it uses Connect. Pass a stable `id` so re-runs reuse the terminal.
     */
    connect(loginOrOptions: number | ConnectOptions, password?: string): Promise<boolean>;
    /** Re-run the last connect() (same id/name) - call it after a TERMINAL_INSTANCE_NOT_FOUND or transport error. */
    reconnect(): Promise<boolean>;
    /** ConnectionStatus / CheckConnect style liveness probe: true when the terminal answers. */
    checkConnect(): Promise<boolean>;
    static tradeModeName(code: number): 'DEMO' | 'CONTEST' | 'REAL' | 'UNKNOWN';
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
    static orderType(action: OrderAction | number | undefined): number;
    /**
     * Market or pending order. MT4 needs a request price: for market orders it is taken from quote()
     * when omitted. `slippage` is in points. Throws MT4Error when the broker rejects
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
    private stream;
    /**
     * Tick stream (OnSymbolTick). `onError` fires when the stream ends or fails (not on
     * unsubscribe); the caller re-subscribes after a transport error.
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
    /** Periodic snapshot of open orders with live profit + account info (OnOpenedOrdersProfit). */
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
     * Stop the terminal on the gateway and close the channel. Strategies that want their terminal
     * kept warm between runs should NOT call this - just exit (or close()); the gateway keeps it under the id.
     */
    disconnect(deleteOnDisconnect?: boolean): Promise<void>;
    /** Close the gRPC channel without touching the terminal on the gateway. */
    close(): void;
}
