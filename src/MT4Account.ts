/*
 * ════════════════════════════════════════════════════════════════════════════
 *  MT4Account — LOW-LEVEL layer of @metarpc/nodemt4
 * ════════════════════════════════════════════════════════════════════════════
 *
 *  Thin, 1:1 wrapper over the MetaRPC MT4 gRPC gateway. Every method takes a
 *  generated protobuf Request and resolves with the reply's raw protobuf `Data`
 *  object (or rejects with an `MrpcError`). No DTO mapping, no conveniences —
 *  those live one layer up, in `MT4Service`.
 *
 *  Method groups (same split as the docs and the Rust/Go/C++ SDKs):
 *      1. Account information   accountSummary · tradeStats · tradeStatsEquityHistory
 *                               · equityHistory · tradeUnrealizedPl
 *      2. Orders & history      openedOrders · openedOrdersTickets · ordersHistory
 *      3. Symbols & quotes      symbols · symbolSelect · symbolParamsMany
 *                               · tickValueWithSize · quote · quoteMany · quoteHistory
 *                               · serverTimezone
 *      4. Trading operations    orderSend · orderModify · orderCloseDelete · orderCloseBy
 *      5. Streaming             onSymbolTick · onTrade · onOpenedOrdersProfit
 *                               · onOpenedOrdersTickets · onConnectState
 *
 *  Plus the connection lifecycle: connect / reconnect / checkConnect / disconnect.
 * ════════════════════════════════════════════════════════════════════════════
 */

import * as grpc from '@grpc/grpc-js';
import * as crypto from 'crypto';
import { MrpcError, TradeOutcomeUnknownError, NotConnectedError, isApiKeyText } from './errors';

// ── Low-level gRPC and Protobuf bindings (generated from the MetaRPC MT4 protos) ──
export const ConnectionGrpc = require('../package/mt4-term-api-connection_grpc_pb');
export const ConnectionPb = require('../package/mt4-term-api-connection_pb');
export const AccountHelperGrpc = require('../package/mt4-term-api-account-helper_grpc_pb');
export const AccountHelperPb = require('../package/mt4-term-api-account-helper_pb');
export const TradingHelperGrpc = require('../package/mt4-term-api-trading-helper_grpc_pb');
export const TradingHelperPb = require('../package/mt4-term-api-trading-helper_pb');
export const SubscriptionsGrpc = require('../package/mt4-term-api-subscriptions_grpc_pb');
export const SubscriptionsPb = require('../package/mt4-term-api-subscriptions_pb');
export const MarketInfoGrpc = require('../package/mt4-term-api-market-info_grpc_pb');
export const MarketInfoPb = require('../package/mt4-term-api-market-info_pb');
export const TradeStatsGrpc = require('../package/mt4-term-api-trade-stats_grpc_pb');
export const TradeStatsPb = require('../package/mt4-term-api-trade-stats_pb');
export const ServerTimezoneGrpc = require('../package/mt4-term-api-server-timezone_grpc_pb');
export const ServerTimezonePb = require('../package/mt4-term-api-server-timezone_pb');
export const ErrorPb = require('../package/mrpc-mt4-error_pb');
export const TimestampPb = require('google-protobuf/google/protobuf/timestamp_pb');

/** QuoteHistory timeframes (ENUM_QUOTE_HISTORY_TIMEFRAME). NOTE: these are enum ordinals, not MT4 minute counts. */
export const TIMEFRAMES: Record<string, number> = {
  M1: 0, M5: 1, M15: 2, M30: 3, H1: 4, H4: 5, D1: 6, W1: 7, MN1: 8,
};
export type Timeframe = keyof typeof TIMEFRAMES | number;

export type OrderCommand = 'BUY' | 'SELL' | 'BUY_LIMIT' | 'SELL_LIMIT' | 'BUY_STOP' | 'SELL_STOP';
/** Alias of OrderCommand. */
export type OrderAction = OrderCommand;

/** MT4 order operation types (OrderSendOperationType / OpenedOrderType share the same numbering: 0..5). */
export const ORDER_TYPES: Record<OrderCommand, number> = {
  BUY: TradingHelperPb.OrderSendOperationType.OC_OP_BUY,
  SELL: TradingHelperPb.OrderSendOperationType.OC_OP_SELL,
  BUY_LIMIT: TradingHelperPb.OrderSendOperationType.OC_OP_BUYLIMIT,
  SELL_LIMIT: TradingHelperPb.OrderSendOperationType.OC_OP_SELLLIMIT,
  BUY_STOP: TradingHelperPb.OrderSendOperationType.OC_OP_BUYSTOP,
  SELL_STOP: TradingHelperPb.OrderSendOperationType.OC_OP_SELLSTOP,
};

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

// ── Timestamp helpers (shared with MT4Service) ──
export const tsToSeconds = (ts: any): number => (ts && ts.getSeconds ? Number(ts.getSeconds()) : 0);
export const tsToMillis = (ts: any): number =>
  (ts && ts.getSeconds ? Number(ts.getSeconds()) * 1000 + Math.floor(Number(ts.getNanos() || 0) / 1e6) : 0);
export const toTimestamp = (d: Date | number): any => {
  const ts = new TimestampPb.Timestamp();
  const ms = d instanceof Date ? d.getTime() : Number(d) * 1000;
  ts.setSeconds(Math.floor(ms / 1000));
  ts.setNanos(Math.floor((ms % 1000) * 1e6));
  return ts;
};

export class MT4Account {
  host: string;
  port: number;
  apiKey: string | null;
  id: string | null;
  /** Terminal label (ConnectEx `name`), re-sent by reconnect(). */
  name: string | null = null;
  connected: boolean = false;
  channel: grpc.Channel;
  connectionClient: any;
  accountClient: any;        // AccountHelper
  tradingClient: any;        // TradingHelper
  subscriptionClient: any;   // SubscriptionService
  marketInfoClient: any;     // MarketInfo
  tradeStatsClient: any;     // TradeStats
  serverTimezoneClient: any; // ServerTimezone
  /** Default deadline for unary calls, ms. */
  callTimeoutMs = 30000;
  private lastUser?: number;
  private lastPassword?: string;
  private lastServer?: string;
  private lastConnect?: ConnectOptions;

  /** RFC 4122 UUID v5 (SHA-1) — derive a stable terminal id from a strategy name (same result as Python's uuid.uuid5). */
  static uuid5(namespace: string, name: string): string {
    const nsHex = namespace.replace(/-/g, '');
    if (nsHex.length !== 32) throw new Error('uuid5: namespace must be a UUID');
    const nsBytes = Buffer.from(nsHex, 'hex');
    const hash = crypto.createHash('sha1').update(Buffer.concat([nsBytes, Buffer.from(name, 'utf8')])).digest();
    const b = Buffer.from(hash.subarray(0, 16));
    b[6] = (b[6] & 0x0f) | 0x50;
    b[8] = (b[8] & 0x3f) | 0x80;
    const hex = b.toString('hex');
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  }

  /** RFC 4122 DNS namespace (same constant as Python's uuid.NAMESPACE_DNS). */
  static NAMESPACE_DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';

  /**
   * Opens a new demo account through the API (GET /DemoAccount/Open) and returns its credentials.
   * @param host the REST host of the platform, e.g. "mt4.mrpc.pro"
   */
  static async openDemoAccount(server = 'MetaQuotes-Demo', apiKey = 'TRIAL', host = 'mt4.mrpc.pro'): Promise<{ login: number; password: string; server: string }> {
    const url = `https://${host}/DemoAccount/Open?server=${encodeURIComponent(server)}`;
    const res = await fetch(url, { headers: { APIKey: apiKey } });
    if (!res.ok) throw new MrpcError(`Failed to open demo account: HTTP ${res.status} ${res.statusText}`);
    const data: any = await res.json();
    const body = data.data || data;
    if (data.error || !body.login) {
      throw new MrpcError(data.error?.errorMessage || `No account opened (result code ${body.resultCode})`, data.error?.errorCode || '');
    }
    return { login: Number(body.login), password: String(body.password), server: String(body.server || server) };
  }

  /** Convert a UTC instant to broker server time using the shift reported by accountSummary(). */
  static serverDate(utc: Date, utcServerShiftMinutes: number): Date {
    return new Date(utc.getTime() + utcServerShiftMinutes * 60000);
  }

  /** Convert a server-time epoch (seconds) back to a UTC Date. */
  static fromServerSeconds(serverSeconds: number, utcServerShiftMinutes: number): Date {
    return new Date(serverSeconds * 1000 - utcServerShiftMinutes * 60000);
  }

  static tradeModeName(code: number): 'DEMO' | 'CONTEST' | 'REAL' | 'UNKNOWN' {
    switch (code) {
      case 0: return 'DEMO';
      case 1: return 'CONTEST';
      case 2: return 'REAL';
      default: return 'UNKNOWN';
    }
  }

  /** The MT4 operation type of an order command ('BUY', 'SELL_LIMIT', ... or a number). */
  static orderType(cmd: OrderCommand | number | undefined): number {
    if (typeof cmd === 'number') return cmd;
    if (cmd === undefined || !(cmd in ORDER_TYPES)) throw new MrpcError(`Unknown order command ${cmd}`);
    return ORDER_TYPES[cmd];
  }

  constructor(host = 'mt4.mrpc.pro', port = 443, apiKey: string | null = null, id: string | null = null) {
    this.host = host;
    this.port = port;
    this.apiKey = apiKey || (typeof process !== 'undefined' ? process.env.MRPC_API_KEY || 'TRIAL' : 'TRIAL');
    this.id = id || null;

    const target = `${this.host}:${this.port}`;
    const credentials = this.port === 443 ? grpc.credentials.createSsl() : grpc.credentials.createInsecure();

    // One shared channel for every service client (keep-alive so idle tick streams survive NAT timeouts).
    this.channel = new grpc.Channel(target, credentials, {
      'grpc.keepalive_time_ms': 30000,
      'grpc.keepalive_timeout_ms': 10000,
      'grpc.keepalive_permit_without_calls': 1,
      'grpc.max_receive_message_length': 64 * 1024 * 1024,
    });
    const opts = { channelOverride: this.channel };
    this.connectionClient = new ConnectionGrpc.ConnectionClient(target, credentials, opts);
    this.accountClient = new AccountHelperGrpc.AccountHelperClient(target, credentials, opts);
    this.tradingClient = new TradingHelperGrpc.TradingHelperClient(target, credentials, opts);
    this.subscriptionClient = new SubscriptionsGrpc.SubscriptionServiceClient(target, credentials, opts);
    this.marketInfoClient = new MarketInfoGrpc.MarketInfoClient(target, credentials, opts);
    this.tradeStatsClient = new TradeStatsGrpc.TradeStatsClient(target, credentials, opts);
    this.serverTimezoneClient = new ServerTimezoneGrpc.ServerTimezoneClient(target, credentials, opts);
  }

  isConnected(): boolean { return this.connected; }

  getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {};
    if (this.id) headers['id'] = this.id;
    headers['apikey'] = this.apiKey || 'TRIAL';
    return headers;
  }

  getGrpcMetadata(): grpc.Metadata {
    const meta = new grpc.Metadata();
    if (this.id) meta.set('id', this.id);
    meta.set('apikey', this.apiKey || 'TRIAL');
    return meta;
  }

  /**
   * A unary call `client[method](req, metadata, {deadline}, cb)`: resolves with the reply's data, rejects with
   * an MrpcError for the reply's error or with the gRPC error of a failed call. Usable with the generated clients
   * for the methods this class does not wrap.
   */
  async call(client: any, method: string, req: any, timeoutMs: number = this.callTimeoutMs): Promise<any> {
    const meta = this.getGrpcMetadata();
    const deadline = new Date(Date.now() + timeoutMs);
    const reply: any = await new Promise((resolve, reject) => {
      client[method](req, meta, { deadline }, (err: any, res: any) => {
        if (err) return reject(err);
        resolve(res);
      });
    });
    if (reply && typeof reply.getError === 'function' && reply.getError()) {
      throw MrpcError.fromReply(reply.getError());
    }
    return reply && typeof reply.getData === 'function' ? reply.getData() : reply;
  }

  /**
   * A trade call through `call()`: sent exactly once, never re-sent (not even after reconnect()). An error reply gets
   * the trade call in its `operation`; a transport failure after which the trade may have been executed becomes a
   * `TradeOutcomeUnknownError` (same gRPC `code`).
   */
  private async tradeCall(operation: string, method: string, req: any, timeoutMs: number): Promise<any> {
    try {
      return await this.call(this.tradingClient, method, req, timeoutMs);
    } catch (err: any) {
      if (err instanceof MrpcError) {
        err.operation = operation;
      } else if (err && TradeOutcomeUnknownError.isUnknownOutcome(err.code) && !isApiKeyText(`${err.details ?? ''} ${err.message ?? ''}`)) {
        throw new TradeOutcomeUnknownError(operation, err);
      }
      throw err;
    }
  }

  private ensureConnected(): void {
    if (!this.id) throw new NotConnectedError();
  }

  //#region Connection lifecycle
  // ═══════════════════════════════════════════════════════ connection lifecycle

  /** The terminal id the server assigns to these credentials (Connection.GetId). Defaults to the last connect()'s. */
  async getId(user?: number | string, password?: string): Promise<string> {
    if (this.id) return this.id;
    const u = user !== undefined ? user : this.lastUser;
    const p = password !== undefined ? password : this.lastPassword;
    if (u === undefined || p === undefined) throw new MrpcError('getId needs the login and the password');
    const req = new ConnectionPb.GetIdRequest();
    req.setUser(String(u));
    req.setPassword(String(p));
    const data = await this.call(this.connectionClient, 'getId', req, 30000);
    if (!data?.getId()) throw new MrpcError('GetId returned no id');
    this.id = data.getId();
    return this.id!;
  }

  /**
   * Start (or re-attach to) a terminal on the gateway. With `server` it uses ConnectEx (broker cluster
   * name, e.g. "TeleTrade-Demo"); with `host`/`port` it uses Connect. Pass a stable `id` so re-runs reuse
   * the terminal. Short form: `connect(login, password, server)`.
   */
  async connect(loginOrOptions: number | ConnectOptions, password?: string, server?: string): Promise<boolean> {
    const opts: ConnectOptions = typeof loginOrOptions === 'object'
      ? { ...loginOrOptions }
      : { user: loginOrOptions, password: password || '', server };
    if (!opts.server && !opts.host) throw new MrpcError('connect needs a broker server name (server) or host');
    if (opts.id) this.id = opts.id;
    if (opts.name !== undefined) this.name = opts.name;
    this.lastUser = opts.user;
    this.lastPassword = opts.password;
    this.lastConnect = opts;
    const timeoutSec = opts.timeoutSeconds || 60;
    // The gRPC deadline must outlive the gateway's own terminal start-up timeout.
    const timeoutMs = (timeoutSec + 30) * 1000;

    let data: any;
    if (opts.server) {
      const req = new ConnectionPb.ConnectExRequest();
      req.setUser(Number(opts.user));
      req.setPassword(opts.password);
      req.setMtClusterName(opts.server);
      req.setTimeoutSeconds(timeoutSec);
      if (this.name) req.setName(this.name);
      if (opts.expiration) req.setExpiration(toTimestamp(opts.expiration));
      data = await this.call(this.connectionClient, 'connectEx', req, timeoutMs);
    } else {
      const req = new ConnectionPb.ConnectRequest();
      req.setUser(Number(opts.user));
      req.setPassword(opts.password);
      req.setHost(opts.host);
      req.setPort(opts.port || 443);
      req.setTimeoutSeconds(timeoutSec);
      if (this.name) req.setName(this.name);
      if (opts.expiration) req.setExpiration(toTimestamp(opts.expiration));
      data = await this.call(this.connectionClient, 'connect', req, timeoutMs);
    }
    const guid = data?.getTerminalInstanceGuid();
    if (guid) this.id = guid; // keep the caller's stable id if the gateway returns nothing
    if (!this.id) throw new MrpcError('Connect returned no terminal id');
    this.lastServer = opts.server || opts.host;
    this.connected = true;
    return true;
  }

  /** Re-run the last connect() (same id/name) — call it after a TERMINAL_INSTANCE_NOT_FOUND or transport error. */
  async reconnect(): Promise<boolean> {
    if (!this.lastConnect) throw new MrpcError('reconnect: connect() was never called');
    return this.connect({ ...this.lastConnect, id: this.id || this.lastConnect.id, name: this.name || this.lastConnect.name });
  }

  /** CheckConnect liveness probe: true when the terminal answers. */
  async checkConnect(): Promise<boolean> {
    try {
      const req = new ConnectionPb.CheckConnectRequest();
      await this.call(this.connectionClient, 'checkConnect', req, 15000);
      return true;
    } catch {
      return false;
    }
  }

  /** The broker server name this account connected with (or the host for a Connect by address). */
  get serverName(): string { return this.lastServer || ''; }

  /**
   * Stop the terminal on the gateway (`deleteTerminal` also deletes it) and close the channel. Rejects when the
   * server refuses. Strategies that keep their terminal warm between runs should NOT call this — just exit
   * (or close()); the gateway keeps the terminal under the id.
   */
  async disconnect(deleteTerminal = false): Promise<void> {
    this.connected = false;
    try {
      if (this.id) {
        const req = new ConnectionPb.DisconnectRequest();
        req.setDelete(deleteTerminal);
        await this.call(this.connectionClient, 'disconnect', req, 10000);
      }
    } finally {
      this.close();
    }
  }

  /** Close the gRPC channel without touching the terminal on the gateway. */
  close(): void {
    try { this.channel.close(); } catch { }
  }

  //#endregion

  //#region 1. Account information
  // ═══════════════════════════════════════════════════ 1. account information

  /** AccountHelper/AccountSummary — login, balance, equity, currency, leverage, trade mode. */
  async accountSummary(req: any = new AccountHelperPb.AccountSummaryRequest()): Promise<any> {
    this.ensureConnected();
    return this.call(this.accountClient, 'accountSummary', req, 15000);
  }

  /**
   * TradeStats/TradeStats — aggregated trade statistics (win rate, profit factor, totals) over a window.
   * Build the request with `new TradeStatsPb.TradeStatsRequest()` and `setFrom()` / `setFromUtc()`.
   * Resolves with a raw `StatsData`.
   */
  async tradeStats(req: any): Promise<any> {
    this.ensureConnected();
    return this.call(this.tradeStatsClient, 'tradeStats', req);
  }

  /**
   * TradeStats/TradeStatsEquityHistory — the same stats plus the equity-curve points and the trades behind them
   * (`TradeStatsEquityHistoryRequest` → raw `StatsWithChartsData`). Heavier than `tradeStats` (60 s deadline).
   */
  async tradeStatsEquityHistory(req: any): Promise<any> {
    this.ensureConnected();
    return this.call(this.tradeStatsClient, 'tradeStatsEquityHistory', req, 60000);
  }

  /**
   * TradeStats/EquityHistory — just the equity-curve points (`EquityHistoryRequest` → raw `EquityHistoryData`,
   * `getPointsList()`). `setExcludeSameBars(true)` drops flat points.
   */
  async equityHistory(req: any): Promise<any> {
    this.ensureConnected();
    return this.call(this.tradeStatsClient, 'equityHistory', req, 60000);
  }

  /**
   * TradeStats/TradeUnrealizedPL — the best/worst unrealized P/L reached per open order
   * (`TradeUnrealizedPLRequest` → raw `TradeUnrealizedPLData`).
   */
  async tradeUnrealizedPl(req: any): Promise<any> {
    this.ensureConnected();
    return this.call(this.tradeStatsClient, 'tradeUnrealizedPL', req);
  }

  //#endregion

  //#region 2. Orders & history
  // ═══════════════════════════════════════════════════════ 2. orders & history

  /** AccountHelper/OpenedOrders — all currently open market and pending orders. */
  async openedOrders(req: any = new AccountHelperPb.OpenedOrdersRequest()): Promise<any> {
    this.ensureConnected();
    return this.call(this.accountClient, 'openedOrders', req);
  }

  /** AccountHelper/OpenedOrdersTickets — just the ticket numbers of open/pending orders. */
  async openedOrdersTickets(req: any = new AccountHelperPb.OpenedOrdersTicketsRequest()): Promise<any> {
    this.ensureConnected();
    return this.call(this.accountClient, 'openedOrdersTickets', req);
  }

  /** AccountHelper/OrdersHistory — closed/cancelled orders over a server-time window. */
  async ordersHistory(req: any): Promise<any> {
    this.ensureConnected();
    return this.call(this.accountClient, 'ordersHistory', req, 60000);
  }

  //#endregion

  //#region 3. Symbols & quotes
  // ════════════════════════════════════════════════════════ 3. symbols & quotes

  /** MarketInfo/Symbols — every symbol name the account can see (one cheap call). */
  async symbols(req: any = new MarketInfoPb.SymbolsRequest()): Promise<any> {
    this.ensureConnected();
    return this.call(this.marketInfoClient, 'symbols', req);
  }

  /** MarketInfo/SymbolSelect — add/remove a symbol in Market Watch. */
  async symbolSelect(req: any): Promise<any> {
    this.ensureConnected();
    return this.call(this.marketInfoClient, 'symbolSelect', req);
  }

  /** AccountHelper/SymbolParamsMany — full contract parameter sets (all symbols, or one via the request). */
  async symbolParamsMany(req: any = new AccountHelperPb.SymbolParamsManyRequest(), timeoutMs = 120000): Promise<any> {
    this.ensureConnected();
    return this.call(this.accountClient, 'symbolParamsMany', req, timeoutMs);
  }

  /** AccountHelper/TickValueWithSize — tick value / tick size / contract size per symbol. */
  async tickValueWithSize(req: any): Promise<any> {
    this.ensureConnected();
    return this.call(this.accountClient, 'tickValueWithSize', req);
  }

  /** MarketInfo/Quote — the latest tick for one symbol. */
  async quote(req: any): Promise<any> {
    this.ensureConnected();
    return this.call(this.marketInfoClient, 'quote', req);
  }

  /** MarketInfo/QuoteMany — latest ticks for several symbols. */
  async quoteMany(req: any): Promise<any> {
    this.ensureConnected();
    return this.call(this.marketInfoClient, 'quoteMany', req);
  }

  /** MarketInfo/QuoteHistory — OHLC bars for a symbol/timeframe range. */
  async quoteHistory(req: any): Promise<any> {
    this.ensureConnected();
    return this.call(this.marketInfoClient, 'quoteHistory', req, 60000);
  }

  /**
   * ServerTimezone/ServerTimezone — the broker server's UTC offset (raw `ServerTimezoneData`). Every MT4 timestamp
   * is server time; use this (or `AccountSummary.utcServerTimeShiftMinutes`) to convert to/from real UTC.
   */
  async serverTimezone(req: any = new ServerTimezonePb.ServerTimezoneRequest()): Promise<any> {
    this.ensureConnected();
    return this.call(this.serverTimezoneClient, 'serverTimezone', req, 15000);
  }

  //#endregion

  //#region 4. Trading operations
  // ═══════════════════════════════════════════════════════ 4. trading operations

  /** TradingHelper/OrderSend — open a market or pending order. Sent exactly once (see tradeCall). */
  async orderSend(req: any): Promise<any> {
    this.ensureConnected();
    return this.tradeCall('OrderSend', 'orderSend', req, 60000);
  }

  /** TradingHelper/OrderModify — change SL/TP (and price/expiration for pending orders). */
  async orderModify(req: any): Promise<any> {
    this.ensureConnected();
    return this.tradeCall('OrderModify', 'orderModify', req, 60000);
  }

  /** TradingHelper/OrderCloseDelete — close a market order (fully or partially) or delete a pending one. */
  async orderCloseDelete(req: any): Promise<any> {
    this.ensureConnected();
    return this.tradeCall('OrderCloseDelete', 'orderCloseDelete', req, 60000);
  }

  /** TradingHelper/OrderCloseBy — close an order by an opposite one on the same symbol. */
  async orderCloseBy(req: any): Promise<any> {
    this.ensureConnected();
    return this.tradeCall('OrderCloseBy', 'orderCloseBy', req, 60000);
  }

  //#endregion

  //#region 5. Streaming
  // ════════════════════════════════════════════════════════════════ 5. streaming

  /**
   * A server stream of one of the generated clients. Each reply's raw protobuf `Data` is passed to `callback`
   * (an error reply, the stream's failure and its unexpected end go to `onError`; a cancel — `unsubscribe()` —
   * is not an error). DTO mapping happens one layer up, in MT4Service.
   */
  private stream(client: any, method: string, req: any, callback: (data: any) => void, onError?: (e: any) => void, label = 'stream'): Subscription {
    const meta = this.getGrpcMetadata();
    const streamCall = client[method](req, meta);
    let cancelled = false;
    streamCall.on('data', (reply: any) => {
      if (reply.getError && reply.getError()) {
        if (onError) onError(MrpcError.fromReply(reply.getError()));
        return;
      }
      const data = reply.getData ? reply.getData() : reply;
      if (!data) return; // a heartbeat
      callback(data);
    });
    streamCall.on('error', (err: any) => {
      if (cancelled && err && err.code === grpc.status.CANCELLED) return;
      if (onError) onError(err);
    });
    streamCall.on('end', () => { if (!cancelled && onError) onError(new MrpcError(`${label} ended`)); });
    return { unsubscribe: () => { cancelled = true; streamCall.cancel(); } };
  }

  /**
   * SubscriptionService/OnSymbolTick — raw tick stream. Each `data` carries `getSymbolTick()` (bid/ask/last/volume
   * + server and UTC time). Build the request with `new SubscriptionsPb.OnSymbolTickRequest()` and
   * `setSymbolNamesList([...])`. `onError` fires on an error reply, a transport failure or an unexpected end.
   */
  onSymbolTick(req: any, callback: (data: any) => void, onError?: (e: any) => void): Subscription {
    this.ensureConnected();
    return this.stream(this.subscriptionClient, 'onSymbolTick', req, callback, onError, 'tick stream');
  }

  /**
   * SubscriptionService/OnTrade — raw trade-event stream (fills, modifications, closes). Each `data` carries
   * `getType()` and `getEventData()` (new/updated/removed/history orders) plus `getAccountInfo()` (incl. margin).
   */
  onTrade(req: any, callback: (data: any) => void, onError?: (e: any) => void): Subscription {
    this.ensureConnected();
    return this.stream(this.subscriptionClient, 'onTrade', req, callback, onError, 'trade stream');
  }

  /**
   * SubscriptionService/OnOpenedOrdersProfit — periodic open-orders snapshot with live profit. Each `data` carries
   * `getOpenedOrdersWithProfitUpdatedList()` and `getAccountInfo()` (balance/equity/margin/marginLevel). Set the
   * period with `setTimerPeriodMilliseconds()`.
   */
  onOpenedOrdersProfit(req: any, callback: (data: any) => void, onError?: (e: any) => void): Subscription {
    this.ensureConnected();
    return this.stream(this.subscriptionClient, 'onOpenedOrdersProfit', req, callback, onError, 'orders-profit stream');
  }

  /**
   * SubscriptionService/OnOpenedOrdersTickets — periodic list of open ticket numbers. Each `data` carries
   * `getPositionTicketsList()` / `getPendingOrderTicketsList()` + `getServerTime()`. Set the period with
   * `setPullIntervalMilliseconds()`.
   */
  onOpenedOrdersTickets(req: any, callback: (data: any) => void, onError?: (e: any) => void): Subscription {
    this.ensureConnected();
    return this.stream(this.subscriptionClient, 'onOpenedOrdersTickets', req, callback, onError, 'tickets stream');
  }

  /**
   * Connection/OnConnectState — terminal connection-state events (connected / disconnected / reconnecting), so a
   * strategy can pause while the terminal is offline. Raw stream; `onError` fires on failure or an unexpected end.
   */
  onConnectState(req: any = new (ConnectionPb.OnConnectStateRequest || ConnectionPb.ConnectStateRequest)(), callback?: (data: any) => void, onError?: (e: any) => void): Subscription {
    this.ensureConnected();
    return this.stream(this.connectionClient, 'onConnectState', req, callback || (() => { }), onError, 'connect-state stream');
  }

  //#endregion
}
