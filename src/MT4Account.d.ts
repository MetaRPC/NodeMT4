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
export declare const TradeStatsGrpc: any;
export declare const TradeStatsPb: any;
export declare const ServerTimezoneGrpc: any;
export declare const ServerTimezonePb: any;
export declare const ErrorPb: any;
export declare const TimestampPb: any;
/** QuoteHistory timeframes (ENUM_QUOTE_HISTORY_TIMEFRAME). NOTE: these are enum ordinals, not MT4 minute counts. */
export declare const TIMEFRAMES: Record<string, number>;
export type Timeframe = keyof typeof TIMEFRAMES | number;
export type OrderCommand = 'BUY' | 'SELL' | 'BUY_LIMIT' | 'SELL_LIMIT' | 'BUY_STOP' | 'SELL_STOP';
/** Alias of OrderCommand. */
export type OrderAction = OrderCommand;
/** MT4 order operation types (OrderSendOperationType / OpenedOrderType share the same numbering: 0..5). */
export declare const ORDER_TYPES: Record<OrderCommand, number>;
/** A live server stream; call `unsubscribe()` to cancel it. */
export interface Subscription {
    unsubscribe(): void;
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
export declare const tsToSeconds: (ts: any) => number;
export declare const tsToMillis: (ts: any) => number;
export declare const toTimestamp: (d: Date | number) => any;
export declare class MT4Account {
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
    tradeStatsClient: any;
    serverTimezoneClient: any;
    /** Default deadline for unary calls, ms. */
    callTimeoutMs: number;
    private lastUser?;
    private lastPassword?;
    private lastServer?;
    private lastConnect?;
    /** RFC 4122 UUID v5 (SHA-1) — derive a stable terminal id from a strategy name (same result as Python's uuid.uuid5). */
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
    /** Convert a UTC instant to broker server time using the shift reported by accountSummary(). */
    static serverDate(utc: Date, utcServerShiftMinutes: number): Date;
    /** Convert a server-time epoch (seconds) back to a UTC Date. */
    static fromServerSeconds(serverSeconds: number, utcServerShiftMinutes: number): Date;
    static tradeModeName(code: number): 'DEMO' | 'CONTEST' | 'REAL' | 'UNKNOWN';
    /** The MT4 operation type of an order command ('BUY', 'SELL_LIMIT', ... or a number). */
    static orderType(cmd: OrderCommand | number | undefined): number;
    constructor(host?: string, port?: number, apiKey?: string | null, id?: string | null);
    isConnected(): boolean;
    getHeaders(): Record<string, string>;
    getGrpcMetadata(): grpc.Metadata;
    /**
     * A unary call `client[method](req, metadata, {deadline}, cb)`: resolves with the reply's data, rejects with
     * an MrpcError for the reply's error or with the gRPC error of a failed call. Usable with the generated clients
     * for the methods this class does not wrap.
     */
    call(client: any, method: string, req: any, timeoutMs?: number): Promise<any>;
    /**
     * A trade call through `call()`: sent exactly once, never re-sent (not even after reconnect()). An error reply gets
     * the trade call in its `operation`; a transport failure after which the trade may have been executed becomes a
     * `TradeOutcomeUnknownError` (same gRPC `code`).
     */
    private tradeCall;
    private ensureConnected;
    /** The terminal id the server assigns to these credentials (Connection.GetId). Defaults to the last connect()'s. */
    getId(user?: number | string, password?: string): Promise<string>;
    /**
     * Start (or re-attach to) a terminal on the gateway. With `server` it uses ConnectEx (broker cluster
     * name, e.g. "TeleTrade-Demo"); with `host`/`port` it uses Connect. Pass a stable `id` so re-runs reuse
     * the terminal. Short form: `connect(login, password, server)`.
     */
    connect(loginOrOptions: number | ConnectOptions, password?: string, server?: string): Promise<boolean>;
    /** Re-run the last connect() (same id/name) — call it after a TERMINAL_INSTANCE_NOT_FOUND or transport error. */
    reconnect(): Promise<boolean>;
    /** CheckConnect liveness probe: true when the terminal answers. */
    checkConnect(): Promise<boolean>;
    /** The broker server name this account connected with (or the host for a Connect by address). */
    get serverName(): string;
    /**
     * Stop the terminal on the gateway (`deleteTerminal` also deletes it) and close the channel. Rejects when the
     * server refuses. Strategies that keep their terminal warm between runs should NOT call this — just exit
     * (or close()); the gateway keeps the terminal under the id.
     */
    disconnect(deleteTerminal?: boolean): Promise<void>;
    /** Close the gRPC channel without touching the terminal on the gateway. */
    close(): void;
    /** AccountHelper/AccountSummary — login, balance, equity, currency, leverage, trade mode. */
    accountSummary(req?: any): Promise<any>;
    /**
     * TradeStats/TradeStats — aggregated trade statistics (win rate, profit factor, totals) over a window.
     * Build the request with `new TradeStatsPb.TradeStatsRequest()` and `setFrom()` / `setFromUtc()`.
     * Resolves with a raw `StatsData`.
     */
    tradeStats(req: any): Promise<any>;
    /**
     * TradeStats/TradeStatsEquityHistory — the same stats plus the equity-curve points and the trades behind them
     * (`TradeStatsEquityHistoryRequest` → raw `StatsWithChartsData`). Heavier than `tradeStats` (60 s deadline).
     */
    tradeStatsEquityHistory(req: any): Promise<any>;
    /**
     * TradeStats/EquityHistory — just the equity-curve points (`EquityHistoryRequest` → raw `EquityHistoryData`,
     * `getPointsList()`). `setExcludeSameBars(true)` drops flat points.
     */
    equityHistory(req: any): Promise<any>;
    /**
     * TradeStats/TradeUnrealizedPL — the best/worst unrealized P/L reached per open order
     * (`TradeUnrealizedPLRequest` → raw `TradeUnrealizedPLData`).
     */
    tradeUnrealizedPl(req: any): Promise<any>;
    /** AccountHelper/OpenedOrders — all currently open market and pending orders. */
    openedOrders(req?: any): Promise<any>;
    /** AccountHelper/OpenedOrdersTickets — just the ticket numbers of open/pending orders. */
    openedOrdersTickets(req?: any): Promise<any>;
    /** AccountHelper/OrdersHistory — closed/cancelled orders over a server-time window. */
    ordersHistory(req: any): Promise<any>;
    /** MarketInfo/Symbols — every symbol name the account can see (one cheap call). */
    symbols(req?: any): Promise<any>;
    /** MarketInfo/SymbolSelect — add/remove a symbol in Market Watch. */
    symbolSelect(req: any): Promise<any>;
    /** AccountHelper/SymbolParamsMany — full contract parameter sets (all symbols, or one via the request). */
    symbolParamsMany(req?: any, timeoutMs?: number): Promise<any>;
    /** AccountHelper/TickValueWithSize — tick value / tick size / contract size per symbol. */
    tickValueWithSize(req: any): Promise<any>;
    /** MarketInfo/Quote — the latest tick for one symbol. */
    quote(req: any): Promise<any>;
    /** MarketInfo/QuoteMany — latest ticks for several symbols. */
    quoteMany(req: any): Promise<any>;
    /** MarketInfo/QuoteHistory — OHLC bars for a symbol/timeframe range. */
    quoteHistory(req: any): Promise<any>;
    /**
     * ServerTimezone/ServerTimezone — the broker server's UTC offset (raw `ServerTimezoneData`). Every MT4 timestamp
     * is server time; use this (or `AccountSummary.utcServerTimeShiftMinutes`) to convert to/from real UTC.
     */
    serverTimezone(req?: any): Promise<any>;
    /** TradingHelper/OrderSend — open a market or pending order. Sent exactly once (see tradeCall). */
    orderSend(req: any): Promise<any>;
    /** TradingHelper/OrderModify — change SL/TP (and price/expiration for pending orders). */
    orderModify(req: any): Promise<any>;
    /** TradingHelper/OrderCloseDelete — close a market order (fully or partially) or delete a pending one. */
    orderCloseDelete(req: any): Promise<any>;
    /** TradingHelper/OrderCloseBy — close an order by an opposite one on the same symbol. */
    orderCloseBy(req: any): Promise<any>;
    /**
     * A server stream of one of the generated clients. Each reply's raw protobuf `Data` is passed to `callback`
     * (an error reply, the stream's failure and its unexpected end go to `onError`; a cancel — `unsubscribe()` —
     * is not an error). DTO mapping happens one layer up, in MT4Service.
     */
    private stream;
    /**
     * SubscriptionService/OnSymbolTick — raw tick stream. Each `data` carries `getSymbolTick()` (bid/ask/last/volume
     * + server and UTC time). Build the request with `new SubscriptionsPb.OnSymbolTickRequest()` and
     * `setSymbolNamesList([...])`. `onError` fires on an error reply, a transport failure or an unexpected end.
     */
    onSymbolTick(req: any, callback: (data: any) => void, onError?: (e: any) => void): Subscription;
    /**
     * SubscriptionService/OnTrade — raw trade-event stream (fills, modifications, closes). Each `data` carries
     * `getType()` and `getEventData()` (new/updated/removed/history orders) plus `getAccountInfo()` (incl. margin).
     */
    onTrade(req: any, callback: (data: any) => void, onError?: (e: any) => void): Subscription;
    /**
     * SubscriptionService/OnOpenedOrdersProfit — periodic open-orders snapshot with live profit. Each `data` carries
     * `getOpenedOrdersWithProfitUpdatedList()` and `getAccountInfo()` (balance/equity/margin/marginLevel). Set the
     * period with `setTimerPeriodMilliseconds()`.
     */
    onOpenedOrdersProfit(req: any, callback: (data: any) => void, onError?: (e: any) => void): Subscription;
    /**
     * SubscriptionService/OnOpenedOrdersTickets — periodic list of open ticket numbers. Each `data` carries
     * `getPositionTicketsList()` / `getPendingOrderTicketsList()` + `getServerTime()`. Set the period with
     * `setPullIntervalMilliseconds()`.
     */
    onOpenedOrdersTickets(req: any, callback: (data: any) => void, onError?: (e: any) => void): Subscription;
    /**
     * Connection/OnConnectState — terminal connection-state events (connected / disconnected / reconnecting), so a
     * strategy can pause while the terminal is offline. Raw stream; `onError` fires on failure or an unexpected end.
     */
    onConnectState(req?: any, callback?: (data: any) => void, onError?: (e: any) => void): Subscription;
}
