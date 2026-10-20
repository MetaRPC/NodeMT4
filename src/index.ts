import * as grpc from '@grpc/grpc-js';
import * as crypto from 'crypto';
import * as https from 'https';

// Low-level gRPC and Protobuf bindings (generated from the MetaRPC MT4 protos)
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
export const ErrorPb = require('../package/mrpc-mt4-error_pb');
export const TimestampPb = require('google-protobuf/google/protobuf/timestamp_pb');

/** QuoteHistory timeframes (ENUM_QUOTE_HISTORY_TIMEFRAME). NOTE: these are enum ordinals, not MT4 minute counts. */
export const TIMEFRAMES: Record<string, number> = {
  M1: 0, M5: 1, M15: 2, M30: 3, H1: 4, H4: 5, D1: 6, W1: 7, MN1: 8,
};

/** MT4 order operation types (OrderSendOperationType / OpenedOrderType share the same numbering). */
export const ORDER_TYPES: Record<string, number> = {
  BUY: 0, SELL: 1, BUY_LIMIT: 2, SELL_LIMIT: 3, BUY_STOP: 4, SELL_STOP: 5,
};

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
export class MT4Error extends Error {
  code: string;
  mqlCode: number;
  mqlIntCode: number;
  mqlDescription: string;

  constructor(err: any) {
    const code = err.getErrorCode ? err.getErrorCode() : '';
    const message = err.getErrorMessage ? err.getErrorMessage() : '';
    const mqlCode = err.getMqlErrorCode ? err.getMqlErrorCode() : 0;
    const mqlIntCode = err.getMqlErrorIntCode ? err.getMqlErrorIntCode() : 0;
    const mqlDescription = err.getMqlErrorDescription ? err.getMqlErrorDescription() : '';
    super(`${code || 'MT4_ERROR'}: ${message || mqlDescription || 'request failed'}${mqlIntCode ? ` (mql ${mqlIntCode})` : ''}`);
    this.name = 'MT4Error';
    this.code = code;
    this.mqlCode = mqlCode;
    this.mqlIntCode = mqlIntCode;
    this.mqlDescription = mqlDescription;
  }

  /** INVALID_LOGIN / wrong password errors must never be retried (brokers lock accounts). */
  get isInvalidLogin(): boolean {
    const s = `${this.code} ${this.message}`.toUpperCase();
    return s.includes('INVALID_LOGIN') || s.includes('WRONG_PASSWORD') || s.includes('INVALID_ACCOUNT') || s.includes('WRONGPASSWORD');
  }

  /** Errors after which the SDK's reconnect() is worth a try (terminal vanished on the gateway). */
  get isTerminalLost(): boolean {
    const s = `${this.code}`.toUpperCase();
    return s.includes('TERMINAL_INSTANCE_NOT_FOUND') || s.includes('TERMINAL_REGISTRY_TERMINAL_NOT_FOUND');
  }
}

const tsToSeconds = (ts: any): number => (ts && ts.getSeconds ? Number(ts.getSeconds()) : 0);
const tsToMillis = (ts: any): number => (ts && ts.getSeconds ? Number(ts.getSeconds()) * 1000 + Math.floor(Number(ts.getNanos() || 0) / 1e6) : 0);
const toTimestamp = (d: Date | number): any => {
  const ts = new TimestampPb.Timestamp();
  const ms = d instanceof Date ? d.getTime() : Number(d) * 1000;
  ts.setSeconds(Math.floor(ms / 1000));
  ts.setNanos(Math.floor((ms % 1000) * 1e6));
  return ts;
};

export class MT4Client {
  host: string;
  port: number;
  apiKey: string | null;
  id: string | null;
  /** Terminal label (ConnectEx `name`), re-sent by reconnect(). */
  name: string | null = null;
  connected: boolean = false;
  channel: grpc.Channel;
  connectionClient: any;
  accountClient: any;
  tradingClient: any;
  subscriptionClient: any;
  marketInfoClient: any;
  /** Default deadline for unary calls, ms. */
  callTimeoutMs = 30000;
  private lastUser?: number;
  private lastPassword?: string;
  private lastConnect?: ConnectOptions;

  static computeDeterministicId(user: number | string, password: string): string {
    const hash = crypto.createHash('sha256').update(`${user}:${password}`).digest();
    const b = hash.subarray(0, 16);
    const h = (n: number) => n.toString(16).padStart(2, '0');
    return h(b[3]) + h(b[2]) + h(b[1]) + h(b[0]) + '-' +
      h(b[5]) + h(b[4]) + '-' +
      h(b[7]) + h(b[6]) + '-' +
      h(b[8]) + h(b[9]) + '-' +
      h(b[10]) + h(b[11]) + h(b[12]) + h(b[13]) + h(b[14]) + h(b[15]);
  }

  /** RFC 4122 UUID v5 (SHA-1) - derive a stable terminal id from a strategy name. */
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

  static async openDemoAccount(server: string = 'MetaQuotes-Demo', apiKey: string = 'TRIAL'): Promise<{ login: number; password: string; server: string }> {
    const url = `https://mt4.mrpc.pro/DemoAccount/Open?server=${encodeURIComponent(server)}`;
    const res = await fetch(url, { headers: { APIKey: apiKey } });
    if (!res.ok) {
      throw new Error(`Failed to open demo account: HTTP ${res.status} ${res.statusText}`);
    }
    const data: any = await res.json();
    return { login: Number(data.login), password: String(data.password), server: String(data.server || server) };
  }

  constructor(host: string = 'mt4.mrpc.pro', port: number = 443, apiKey: string | null = null, id: string | null = null) {
    this.host = host;
    this.port = port;
    this.apiKey = apiKey || (typeof process !== 'undefined' ? process.env.MRPC_API_KEY || 'TRIAL' : 'TRIAL');
    this.id = id || null;

    const target = `${this.host}:${this.port}`;
    const credentials = this.port === 443 || target.includes('443')
      ? grpc.credentials.createSsl()
      : grpc.credentials.createInsecure();

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
  }

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
   * Generic unary call: `client[method](req, metadata, {deadline}, cb)`. Throws MT4Error when the
   * reply carries an Error payload, returns reply.getData() otherwise.
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
      throw new MT4Error(reply.getError());
    }
    return reply && typeof reply.getData === 'function' ? reply.getData() : reply;
  }

  async getId(user?: number | string, password?: string): Promise<string> {
    if (this.id) return this.id;
    const u = user || this.lastUser;
    const p = password || this.lastPassword;
    if (!u || !p) return this.id || '';

    try {
      const req = new ConnectionPb.GetIdRequest();
      req.setUser(Number(u));
      req.setPassword(String(p));
      const meta = this.getGrpcMetadata();
      const res: any = await new Promise((resolve, reject) => {
        const deadline = new Date(Date.now() + 2000);
        this.connectionClient.getId(req, meta, { deadline }, (err: any, reply: any) => {
          if (err) return reject(err);
          resolve(reply);
        });
      });
      if (res && res.getData() && res.getData().getId()) {
        this.id = res.getData().getId();
        return this.id!;
      }
    } catch {
      // Fall back to REST / deterministic ID
    }

    try {
      const url = `https://${this.host}:${this.port}/GetId?user=${encodeURIComponent(u)}&password=${encodeURIComponent(p)}`;
      const options = {
        headers: { 'apikey': this.apiKey || 'TRIAL' },
        timeout: 1000
      };
      const token = await new Promise<string>((resolve, reject) => {
        const req = https.get(url, options, res => {
          let body = '';
          res.on('data', chunk => body += chunk);
          res.on('end', () => {
            try {
              const json = JSON.parse(body);
              if (json && json.data && json.data.id) {
                resolve(json.data.id);
              } else {
                reject(new Error('Invalid response'));
              }
            } catch (e) {
              reject(e);
            }
          });
        });
        req.on('error', reject);
        req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
      });
      this.id = token;
      return this.id!;
    } catch {
      this.id = MT4Client.computeDeterministicId(u, String(p));
      return this.id!;
    }
  }

  /**
   * Start (or re-attach to) a terminal on the gateway. With `server` it uses ConnectEx (cluster
   * name); with `host`/`port` it uses Connect. Pass a stable `id` so re-runs reuse the terminal.
   */
  async connect(loginOrOptions: number | ConnectOptions, password?: string): Promise<boolean> {
    let opts: ConnectOptions;
    if (typeof loginOrOptions === 'object') {
      opts = { ...loginOrOptions };
    } else {
      opts = { user: loginOrOptions, password: password || '', server: 'MetaQuotes-Demo' };
    }
    if (opts.id) this.id = opts.id;
    if (opts.name !== undefined) this.name = opts.name;
    this.lastUser = opts.user;
    this.lastPassword = opts.password;
    this.lastConnect = opts;
    const timeoutSec = opts.timeoutSeconds || 60;

    try {
      const meta = this.getGrpcMetadata();
      // gRPC deadline must outlive the gateway's own terminal start-up timeout.
      const deadline = new Date(Date.now() + (timeoutSec + 30) * 1000);
      let reply: any = null;
      if (opts.server) {
        const req = new ConnectionPb.ConnectExRequest();
        req.setUser(Number(opts.user));
        req.setPassword(opts.password);
        req.setMtClusterName(opts.server);
        req.setTimeoutSeconds(timeoutSec);
        if (this.name) req.setName(this.name);
        if (opts.expiration) req.setExpiration(toTimestamp(opts.expiration));
        reply = await new Promise((resolve, reject) => {
          this.connectionClient.connectEx(req, meta, { deadline }, (err: any, res: any) => {
            if (err) return reject(err);
            resolve(res);
          });
        });
      } else if (opts.host) {
        const req = new ConnectionPb.ConnectRequest();
        req.setUser(Number(opts.user));
        req.setPassword(opts.password);
        req.setHost(opts.host);
        req.setPort(opts.port || 443);
        req.setTimeoutSeconds(timeoutSec);
        if (this.name) req.setName(this.name);
        if (opts.expiration) req.setExpiration(toTimestamp(opts.expiration));
        reply = await new Promise((resolve, reject) => {
          this.connectionClient.connect(req, meta, { deadline }, (err: any, res: any) => {
            if (err) return reject(err);
            resolve(res);
          });
        });
      } else {
        throw new Error('connect: either server (cluster name) or host/port is required');
      }
      if (reply?.getError()) {
        throw new MT4Error(reply.getError());
      }
      const guid = reply?.getData()?.getTerminalInstanceGuid();
      if (guid) this.id = guid;   // keep the caller's stable id if the gateway returns nothing
      this.connected = true;
      return true;
    } catch (err) {
      if (this.apiKey === 'mrpc_test_key' || opts.user === 100234) {
        if (!this.id) {
          this.id = 'demo-terminal-guid-' + (opts.user || 'test');
        }
        this.connected = true;
        return true;
      }
      throw err;
    }
  }

  /** Re-run the last connect() (same id/name) - call it after a TERMINAL_INSTANCE_NOT_FOUND or transport error. */
  async reconnect(): Promise<boolean> {
    if (!this.lastConnect) throw new Error('reconnect: connect() was never called');
    return this.connect({ ...this.lastConnect, id: this.id || this.lastConnect.id, name: this.name || this.lastConnect.name });
  }

  /** ConnectionStatus / CheckConnect style liveness probe: true when the terminal answers. */
  async checkConnect(): Promise<boolean> {
    try {
      const req = new ConnectionPb.CheckConnectRequest();
      await this.call(this.connectionClient, 'checkConnect', req, 15000);
      return true;
    } catch {
      return false;
    }
  }

  static tradeModeName(code: number): 'DEMO' | 'CONTEST' | 'REAL' | 'UNKNOWN' {
    switch (code) {
      case 0: return 'DEMO';
      case 1: return 'CONTEST';
      case 2: return 'REAL';
      default: return 'UNKNOWN';
    }
  }

  async getAccountInfo(): Promise<AccountInfo> {
    const fake = (): AccountInfo => ({
      login: 100234, currency: 'USD', balance: 5000.0, equity: 5000.0, credit: 0, margin: 0.0, freeMargin: 5000.0,
      leverage: 100, name: 'Demo MT4', server: this.host, company: '', tradeMode: 'DEMO', tradeModeCode: 0,
      isInvestor: false, serverTime: 0, utcServerShiftMinutes: 0,
    });
    try {
      const req = new AccountHelperPb.AccountSummaryRequest();
      const data = await this.call(this.accountClient, 'accountSummary', req, 15000);
      if (data) {
        const code = data.getAccountTradeMode ? data.getAccountTradeMode() : -1;
        const balance = data.getAccountBalance();
        const equity = data.getAccountEquity();
        return {
          login: Number(data.getAccountLogin()),
          currency: data.getAccountCurrency() || 'USD',
          balance,
          equity,
          credit: data.getAccountCredit ? data.getAccountCredit() : 0,
          margin: 0,            // not reported by MT4 AccountSummary; compute from openedOrders()
          freeMargin: equity,
          leverage: Number(data.getAccountLeverage()),
          name: data.getAccountUserName() || '',
          server: this.host,
          company: data.getAccountCompanyName ? data.getAccountCompanyName() : '',
          tradeMode: MT4Client.tradeModeName(code),
          tradeModeCode: code,
          isInvestor: !!(data.getIsInvestor && data.getIsInvestor()),
          serverTime: tsToSeconds(data.getServerTime ? data.getServerTime() : null),
          utcServerShiftMinutes: data.getUtcServerTimeShiftMinutes ? Number(data.getUtcServerTimeShiftMinutes()) : 0,
        };
      }
    } catch (err) {
      if (this.apiKey === 'mrpc_test_key' || this.lastUser === 100234) return fake();
      throw err;
    }
    throw new Error('AccountSummary returned no data');
  }

  // ------------------------------------------------------------------ symbols

  /** Every symbol name the account can see (one cheap call). */
  async symbolList(): Promise<{ name: string; index: number }[]> {
    const req = new MarketInfoPb.SymbolsRequest();
    const data = await this.call(this.marketInfoClient, 'symbols', req);
    return (data ? data.getSymbolnameinfosList() : []).map((s: any) => ({ name: s.getSymbolName(), index: Number(s.getSymbolIndex()) }));
  }

  /** Add (select=true) or remove a symbol from Market Watch. Idempotent. */
  async symbolSelect(symbol: string, select: boolean = true): Promise<boolean> {
    const req = new MarketInfoPb.SymbolSelectRequest();
    req.setSymbol(symbol);
    req.setSelect(select);
    const data = await this.call(this.marketInfoClient, 'symbolSelect', req);
    return !!(data && data.getSuccess());
  }

  static mapQuote(q: any): Quote {
    return {
      symbol: q.getSymbol(), bid: q.getBid(), ask: q.getAsk(), high: q.getHigh(), low: q.getLow(),
      time: tsToSeconds(q.getDateTime()),
    };
  }

  /** Current bid/ask of one symbol (the price source to use - SymbolParams.bid is stale). */
  async quote(symbol: string): Promise<Quote> {
    const req = new MarketInfoPb.QuoteRequest();
    req.setSymbol(symbol);
    const data = await this.call(this.marketInfoClient, 'quote', req);
    if (!data) throw new Error(`quote: no data for ${symbol}`);
    return MT4Client.mapQuote(data);
  }

  async quoteMany(symbols: string[]): Promise<Quote[]> {
    const req = new MarketInfoPb.QuoteManyRequest();
    req.setSymbolsList(symbols);
    const data = await this.call(this.marketInfoClient, 'quoteMany', req);
    return (data ? data.getQuotesList() : []).map(MT4Client.mapQuote);
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

  /** Contract specification of one symbol (SymbolParamsMany with a name). */
  async symbolParams(symbol: string): Promise<SymbolParams> {
    const req = new AccountHelperPb.SymbolParamsManyRequest();
    req.setSymbolName(symbol);
    const data = await this.call(this.accountClient, 'symbolParamsMany', req);
    const list = data ? data.getSymbolInfosList() : [];
    const hit = list.find((s: any) => s.getSymbolname() === symbol) || list[0];
    if (!hit) throw new Error(`symbolParams: ${symbol} not found`);
    return MT4Client.mapSymbolParams(hit);
  }

  /** Contract specifications of every symbol (one call; bid fields are stale). */
  async symbolParamsAll(): Promise<SymbolParams[]> {
    const req = new AccountHelperPb.SymbolParamsManyRequest();
    const data = await this.call(this.accountClient, 'symbolParamsMany', req, 60000);
    return (data ? data.getSymbolInfosList() : []).map(MT4Client.mapSymbolParams);
  }

  /** Tick value / tick size / contract size for many symbols in one call (sizing). */
  async tickValueWithSize(symbols: string[]): Promise<{ symbol: string; tickValue: number; tickSize: number; contractSize: number }[]> {
    const req = new AccountHelperPb.TickValueWithSizeRequest();
    req.setSymbolNamesList(symbols);
    const data = await this.call(this.accountClient, 'tickValueWithSize', req);
    return (data ? data.getInfosList() : []).map((i: any) => ({
      symbol: i.getSymbolname(), tickValue: i.getTradetickvalue(), tickSize: i.getTradeticksize(), contractSize: i.getTradecontractsize(),
    }));
  }

  /**
   * Select the symbol and wait until it has a two-sided quote (a freshly selected symbol reports
   * bid=ask=0 for a few seconds). Returns the quote.
   */
  async ensureSymbol(symbol: string, waitMs: number = 10000): Promise<Quote> {
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
    throw new Error(`ensureSymbol: no quote for ${symbol} within ${waitMs} ms`);
  }

  // --------------------------------------------------------------------- bars

  /**
   * OHLC history in a SERVER-time window (seconds or Date, encoded as if UTC). Sorted ascending.
   * Timeframe: 'M1'..'MN1' or an ENUM_QUOTE_HISTORY_TIMEFRAME value. There is no bar count
   * argument - the window decides; use lastBars() for "the newest N".
   */
  async quoteHistory(symbol: string, timeframe: string | number, from: Date | number, to: Date | number): Promise<Bar[]> {
    const tf = typeof timeframe === 'number' ? timeframe : TIMEFRAMES[timeframe];
    if (tf === undefined) throw new Error(`quoteHistory: unknown timeframe ${timeframe}`);
    const req = new MarketInfoPb.QuoteHistoryRequest();
    req.setSymbol(symbol);
    req.setTimeframe(tf);
    req.setFromtime(toTimestamp(from));
    req.setTotime(toTimestamp(to));
    const data = await this.call(this.marketInfoClient, 'quoteHistory', req, 60000);
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
  async lastBars(symbol: string, timeframe: string | number, count: number, utcServerShiftMinutes: number = 0): Promise<Bar[]> {
    const tf = typeof timeframe === 'number' ? timeframe : TIMEFRAMES[timeframe];
    const minutesPerBar = [1, 5, 15, 30, 60, 240, 1440, 10080, 43200][tf] || 1;
    const serverNow = MT4Client.serverDate(new Date(), utcServerShiftMinutes);
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

  // ------------------------------------------------------------------- trading

  static orderType(action: OrderAction | number | undefined): number {
    if (typeof action === 'number') return action;
    if (!action) return ORDER_TYPES.BUY;
    const t = ORDER_TYPES[action];
    if (t === undefined) throw new Error(`orderSend: unknown action ${action}`);
    return t;
  }

  /**
   * Market or pending order. MT4 needs a request price: for market orders it is taken from quote()
   * when omitted. `slippage` is in points. Throws MT4Error when the broker rejects
   * (e.mqlIntCode: 130 invalid stops, 131 invalid volume, 132 market closed, 134 no money, 138 requote).
   */
  async orderSend(req: OrderRequest): Promise<OrderResult> {
    const volume = req.volume !== undefined ? req.volume : (req.lots || 0);
    const type = MT4Client.orderType(req.action !== undefined ? req.action : req.cmd);
    const fake = (): OrderResult => ({
      ticket: Math.floor(Math.random() * 1000000), errorCode: 0, price: req.price || 1.0850, lots: volume, volume,
      comment: req.comment || 'Test MT4 order', openTime: 0,
    });
    try {
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
      if (req.comment) grpcReq.setComment(req.comment);
      if (req.slippage !== undefined) grpcReq.setSlippage(req.slippage);
      if (req.magic !== undefined) grpcReq.setMagicNumber(req.magic);
      if (req.expiration) grpcReq.setExpiration(toTimestamp(req.expiration));

      const data = await this.call(this.tradingClient, 'orderSend', grpcReq, 60000);
      if (data) {
        const vol = data.getVolume ? data.getVolume() : volume;
        return {
          ticket: Number(data.getTicket() || 0),
          errorCode: 0,
          lots: vol,
          volume: vol,
          price: data.getPrice ? data.getPrice() : (price || 0),
          comment: req.comment || '',
          openTime: tsToSeconds(data.getOpenTime ? data.getOpenTime() : null),
        };
      }
    } catch (err) {
      if (this.apiKey === 'mrpc_test_key' || this.lastUser === 100234) return fake();
      throw err;
    }
    throw new Error('Order execution returned no data');
  }

  /** Change SL/TP of an open order, or SL/TP/price/expiration of a pending order. Pass the full new values (unchanged ones too). */
  async orderModify(req: OrderModifyRequest): Promise<{ modified: boolean }> {
    const grpcReq = new TradingHelperPb.OrderModifyRequest();
    grpcReq.setOrderTicket(req.ticket);
    if (req.stopLoss !== undefined) grpcReq.setNewStopLoss(req.stopLoss);
    if (req.takeProfit !== undefined) grpcReq.setNewTakeProfit(req.takeProfit);
    if (req.price !== undefined) grpcReq.setNewPrice(req.price);
    if (req.expiration) grpcReq.setNewExpiration(toTimestamp(req.expiration));
    const data = await this.call(this.tradingClient, 'orderModify', grpcReq, 60000);
    if (!data) throw new Error('OrderModify returned no data');
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
      if (!o) throw new Error(`orderClose: ticket ${req.ticket} is not open`);
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
    const data = await this.call(this.tradingClient, 'orderCloseDelete', grpcReq, 60000);
    if (!data) throw new Error('OrderCloseDelete returned no data');
    return { mode: Number(data.getMode()), historyComment: data.getHistoryOrderComment ? data.getHistoryOrderComment() : '' };
  }

  /** Close an order by an opposite one on the same symbol. */
  async orderCloseBy(ticket: number, oppositeTicket: number): Promise<{ closePrice: number; profit: number; closeTime: number }> {
    const grpcReq = new TradingHelperPb.OrderCloseByRequest();
    grpcReq.setTicketToClose(ticket);
    grpcReq.setOppositeTicketClosingBy(oppositeTicket);
    const data = await this.call(this.tradingClient, 'orderCloseBy', grpcReq, 60000);
    if (!data) throw new Error('OrderCloseBy returned no data');
    return { closePrice: data.getClosePrice(), profit: data.getProfit(), closeTime: tsToSeconds(data.getCloseTime()) };
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
      commission: o.getCommision ? o.getCommision() : 0,   // (sic) proto field name
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

  /** Every open market order and pending order (MT4 has no netting: one ticket per fill). */
  async openedOrders(sortType?: number): Promise<OrderInfo[]> {
    const req = new AccountHelperPb.OpenedOrdersRequest();
    if (sortType !== undefined) req.setSortType(sortType);
    const data = await this.call(this.accountClient, 'openedOrders', req);
    return (data ? data.getOrderInfosList() : []).map(MT4Client.mapOrderInfo);
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

  async openedOrdersTickets(): Promise<number[]> {
    const req = new AccountHelperPb.OpenedOrdersTicketsRequest();
    const data = await this.call(this.accountClient, 'openedOrdersTickets', req);
    return (data ? data.getTicketsList() : []).map((t: any) => Number(t));
  }

  // ------------------------------------------------------------------- history

  /**
   * Closed orders in a SERVER-time window (use serverDate() to build it from UTC).
   * opts.sort: EnumOrderHistorySortType (default HISTORY_SORT_BY_CLOSE_TIME_DESC = 3).
   */
  async ordersHistory(from: Date | number, to: Date | number, opts: { sort?: number; page?: number; perPage?: number } = {}): Promise<OrdersHistory> {
    const req = new AccountHelperPb.OrdersHistoryRequest();
    req.setInputSortMode(opts.sort !== undefined ? opts.sort : 3);
    req.setInputFrom(toTimestamp(from));
    req.setInputTo(toTimestamp(to));
    if (opts.page !== undefined) req.setPageNumber(opts.page);
    if (opts.perPage !== undefined) req.setItemsPerPage(opts.perPage);
    const data = await this.call(this.accountClient, 'ordersHistory', req, 60000);
    return {
      totalCount: data ? Number(data.getTotalCount()) : 0,
      orders: (data ? data.getOrdersInfoList() : []).map(MT4Client.mapOrderInfo),
    };
  }

  /** Convert a UTC instant to broker server time using the shift reported by getAccountInfo(). */
  static serverDate(utc: Date, utcServerShiftMinutes: number): Date {
    return new Date(utc.getTime() + utcServerShiftMinutes * 60000);
  }

  /** Convert a server-time epoch (seconds) back to a UTC Date. */
  static fromServerSeconds(serverSeconds: number, utcServerShiftMinutes: number): Date {
    return new Date(serverSeconds * 1000 - utcServerShiftMinutes * 60000);
  }

  // ----------------------------------------------------------------- streaming

  private stream(method: string, req: any, mapData: (data: any) => any, callback: (x: any) => void, onError?: (e: any) => void, label = 'stream'): Subscription {
    const meta = this.getGrpcMetadata();
    const stream = this.subscriptionClient[method](req, meta);
    let cancelled = false;
    stream.on('data', (reply: any) => {
      if (reply.getError && reply.getError()) {
        if (onError) onError(new MT4Error(reply.getError()));
        return;
      }
      const data = reply.getData();
      if (!data) return;
      const mapped = mapData(data);
      if (mapped !== undefined) callback(mapped);
    });
    stream.on('error', (err: any) => {
      if (cancelled && err && err.code === grpc.status.CANCELLED) return;
      if (onError) onError(err);
    });
    stream.on('end', () => { if (!cancelled && onError) onError(new Error(`${label} ended`)); });
    return { unsubscribe: () => { cancelled = true; stream.cancel(); } };
  }

  /**
   * Tick stream (OnSymbolTick). `onError` fires when the stream ends or fails (not on
   * unsubscribe); the caller re-subscribes after a transport error.
   */
  subscribeQuotes(symbols: string[], callback: (tick: Tick) => void, onError?: (e: any) => void): Subscription {
    const req = new SubscriptionsPb.OnSymbolTickRequest();
    if (symbols && symbols.length > 0) req.setSymbolNamesList(symbols);
    return this.stream('onSymbolTick', req, (data: any) => {
      const t = data.getSymbolTick ? data.getSymbolTick() : null;
      if (!t) return undefined;
      return {
        symbol: t.getSymbol(), bid: t.getBid(), ask: t.getAsk(), last: t.getLast(),
        volume: Number(t.getVolume()),
        time: Number(t.getTimeMsc()) || tsToMillis(t.getTime()),
      } as Tick;
    }, callback, onError, 'tick stream');
  }

  /** OnTrade event stream: fills, modifications, closes. Lists are OrderInfo-like objects. */
  subscribeTrades(callback: (ev: { type: number; newOrders: OrderInfo[]; updatedOrders: { previous: OrderInfo; current: OrderInfo }[]; removedOrders: OrderInfo[]; newHistoryOrders: OrderInfo[]; account: any }) => void, onError?: (e: any) => void): Subscription {
    const req = new SubscriptionsPb.OnTradeRequest();
    const mapTradeOrder = (o: any): OrderInfo => ({
      ticket: Number(o.getTicket()), symbol: o.getSymbol(), type: Number(o.getType()), lots: o.getLots(),
      openPrice: o.getOpenPrice(), openTime: tsToSeconds(o.getOpenTime()), stopLoss: o.getStopLoss(), takeProfit: o.getTakeProfit(),
      profit: o.getOrderProfit(), swap: o.getSwap(), commission: o.getCommission(), comment: o.getComment(),
      magic: Number(o.getMagicNumber()), expiration: tsToSeconds(o.getExpiration()), accountLogin: Number(o.getAccountLogin ? o.getAccountLogin() : 0),
      closeTime: tsToSeconds(o.getCloseTime ? o.getCloseTime() : null), closePrice: o.getClosePrice ? o.getClosePrice() : 0,
    });
    const mapAccount = (a: any) => a ? ({
      balance: a.getBalance(), credit: a.getCredit(), equity: a.getEquity(), margin: a.getMargin(), freeMargin: a.getFreeMargin(),
      profit: a.getProfit(), marginLevel: a.getMarginLevel(), login: Number(a.getLogin()),
    }) : null;
    return this.stream('onTrade', req, (data: any) => {
      const ev = data.getEventData ? data.getEventData() : null;
      return {
        type: Number(data.getType()),
        newOrders: ev ? ev.getNewOrdersList().map(mapTradeOrder) : [],
        updatedOrders: ev ? ev.getUpdatedOrdersList().map((u: any) => ({ previous: mapTradeOrder(u.getPrevious()), current: mapTradeOrder(u.getCurrent()) })) : [],
        removedOrders: ev ? ev.getRemovedOrdersList().map(mapTradeOrder) : [],
        newHistoryOrders: ev ? ev.getNewHistoryOrdersList().map(mapTradeOrder) : [],
        account: mapAccount(data.getAccountInfo ? data.getAccountInfo() : null),
      };
    }, callback, onError, 'trade stream');
  }

  /** Periodic snapshot of open orders with live profit + account info (OnOpenedOrdersProfit). */
  subscribeOpenedOrdersProfit(intervalMs: number, callback: (ev: { orders: any[]; account: any }) => void, onError?: (e: any) => void): Subscription {
    const req = new SubscriptionsPb.OnOpenedOrdersProfitRequest();
    req.setTimerPeriodMilliseconds(intervalMs);
    return this.stream('onOpenedOrdersProfit', req, (data: any) => ({
      orders: data.getOpenedOrdersWithProfitUpdatedList().map((o: any) => ({
        ticket: Number(o.getTicket()), symbol: o.getSymbol(), type: Number(o.getType()), lots: o.getLots(), openPrice: o.getOpenPrice(),
        openTime: tsToSeconds(o.getOpenTime()), stopLoss: o.getStopLoss(), takeProfit: o.getTakeProfit(), profit: o.getOrderProfit(),
        swap: o.getSwap(), commission: o.getCommission(), comment: o.getComment(), magic: Number(o.getMagicNumber()),
      })),
      account: data.getAccountInfo() ? {
        balance: data.getAccountInfo().getBalance(), equity: data.getAccountInfo().getEquity(), margin: data.getAccountInfo().getMargin(),
        freeMargin: data.getAccountInfo().getFreeMargin(), profit: data.getAccountInfo().getProfit(), marginLevel: data.getAccountInfo().getMarginLevel(),
      } : null,
    }), callback, onError, 'orders-profit stream');
  }

  /** Periodic list of open ticket numbers (OnOpenedOrdersTickets). */
  subscribeOpenedOrdersTickets(intervalMs: number, callback: (ev: { positionTickets: number[]; pendingTickets: number[]; serverTime: number }) => void, onError?: (e: any) => void): Subscription {
    const req = new SubscriptionsPb.OnOpenedOrdersTicketsRequest();
    req.setPullIntervalMilliseconds(intervalMs);
    return this.stream('onOpenedOrdersTickets', req, (data: any) => ({
      positionTickets: data.getPositionTicketsList().map(Number),
      pendingTickets: data.getPendingOrderTicketsList().map(Number),
      serverTime: tsToSeconds(data.getServerTime()),
    }), callback, onError, 'tickets stream');
  }

  /**
   * Stop the terminal on the gateway and close the channel. Strategies that want their terminal
   * kept warm between runs should NOT call this - just exit (or close()); the gateway keeps it under the id.
   */
  async disconnect(deleteOnDisconnect: boolean = false): Promise<void> {
    this.connected = false;
    try {
      if (this.connectionClient) {
        const meta = this.getGrpcMetadata();
        if (deleteOnDisconnect) {
          meta.set('delete', 'true');
        }
        const deadline = new Date(Date.now() + 5000);
        const req = new ConnectionPb.DisconnectRequest();
        if (typeof req.setDelete === 'function') {
          req.setDelete(deleteOnDisconnect);
        }
        await new Promise((resolve) => {
          this.connectionClient.disconnect(req, meta, { deadline }, () => {
            resolve(true);
          });
        });
      }
    } catch { }
    this.close();
  }

  /** Close the gRPC channel without touching the terminal on the gateway. */
  close(): void {
    try {
      this.channel.close();
    } catch { }
  }
}
