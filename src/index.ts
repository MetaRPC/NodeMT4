import * as grpc from '@grpc/grpc-js';

// Low-level gRPC and Protobuf bindings
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

export interface AccountInfo {
  login: number;
  currency: string;
  balance: number;
  equity: number;
  leverage: number;
  name: string;
  /** The broker server name the account was connected with (e.g. "TeleTrade-Demo"). */
  server: string;
}

export interface Quote {
  symbol: string;
  bid: number;
  ask: number;
  /** Tick time, milliseconds since the epoch (UTC). */
  time: number;
}

export type OrderCommand = 'BUY' | 'SELL' | 'BUY_LIMIT' | 'SELL_LIMIT' | 'BUY_STOP' | 'SELL_STOP';

export interface OrderRequest {
  symbol: string;
  cmd: OrderCommand;
  lots: number;
  price?: number;
  slippage?: number;
  stopLoss?: number;
  takeProfit?: number;
  comment?: string;
  magicNumber?: number;
}

export interface OrderResult {
  ticket: number;
  /** Always 0: an order the server refuses is an MrpcError. */
  errorCode: number;
  price: number;
  lots: number;
  /** The comment the order was sent with. */
  comment: string;
}

export interface ConnectOptions {
  user: number;
  password: string;
  server?: string;
  host?: string;
  port?: number;
  timeoutSeconds?: number;
}

/**
 * An error the MRPC API answered with (the reply's `error`), or a failed call. `error` is the reply's error message
 * itself (absent for a failed call): `getMqlErrorCode()`, `getMqlErrorTradeIntCode()` and the rest of its fields.
 */
export class MrpcError extends Error {
  constructor(message: string, public readonly code: string = '', public readonly error?: any) {
    super(code ? `${code}: ${message}` : message);
    this.name = 'MrpcError';
  }
}

const ORDER_TYPES: Record<OrderCommand, number> = {
  BUY: TradingHelperPb.OrderSendOperationType.OC_OP_BUY,
  SELL: TradingHelperPb.OrderSendOperationType.OC_OP_SELL,
  BUY_LIMIT: TradingHelperPb.OrderSendOperationType.OC_OP_BUYLIMIT,
  SELL_LIMIT: TradingHelperPb.OrderSendOperationType.OC_OP_SELLLIMIT,
  BUY_STOP: TradingHelperPb.OrderSendOperationType.OC_OP_BUYSTOP,
  SELL_STOP: TradingHelperPb.OrderSendOperationType.OC_OP_SELLSTOP,
};

export class MT4Client {
  public host: string;
  public port: number;
  public apiKey: string | null;
  public id: string | null;
  public connected: boolean = false;

  public channel: grpc.Channel;
  public connectionClient: any;
  public accountClient: any;
  public tradingClient: any;
  public subscriptionClient: any;
  public marketInfoClient: any;

  private lastServer?: string;

  /**
   * Opens a new demo account through the API (GET /DemoAccount/Open) and returns its credentials.
   * @param host the REST host of the platform, e.g. "mt4.mrpc.pro"
   */
  static async openDemoAccount(server: string = 'MetaQuotes-Demo', apiKey: string = 'TRIAL', host: string = 'mt4.mrpc.pro'): Promise<{ login: number; password: string; server: string }> {
    const url = `https://${host}/DemoAccount/Open?server=${encodeURIComponent(server)}`;
    const res = await fetch(url, { headers: { APIKey: apiKey } });
    if (!res.ok) {
      throw new MrpcError(`Failed to open demo account: HTTP ${res.status} ${res.statusText}`);
    }
    const data: any = await res.json();
    const body = data.data || data;
    if (data.error || !body.login) {
      throw new MrpcError(data.error?.errorMessage || `No account opened (result code ${body.resultCode})`, data.error?.errorCode || '');
    }
    return { login: Number(body.login), password: String(body.password), server: String(body.server || server) };
  }

  constructor(host: string = 'mt4.mrpc.pro', port: number = 443, apiKey: string | null = null, id: string | null = null) {
    this.host = host;
    this.port = port;
    this.apiKey = apiKey || (typeof process !== 'undefined' ? process.env.MRPC_API_KEY || 'TRIAL' : 'TRIAL');
    this.id = id || null;

    const target = `${this.host}:${this.port}`;
    const credentials = this.port === 443
      ? grpc.credentials.createSsl()
      : grpc.credentials.createInsecure();

    this.channel = new grpc.Channel(target, credentials, {});
    this.connectionClient = new ConnectionGrpc.ConnectionClient(target, credentials);
    this.accountClient = new AccountHelperGrpc.AccountHelperClient(target, credentials);
    this.tradingClient = new TradingHelperGrpc.TradingHelperClient(target, credentials);
    this.subscriptionClient = new SubscriptionsGrpc.SubscriptionServiceClient(target, credentials);
    this.marketInfoClient = new MarketInfoGrpc.MarketInfoClient(target, credentials);
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

  /** A unary call: resolves with the reply's data, rejects with the reply's error or the call's failure. */
  private call(client: any, method: string, request: any, timeoutMs: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const deadline = new Date(Date.now() + timeoutMs);
      client[method](request, this.getGrpcMetadata(), { deadline }, (err: any, reply: any) => {
        if (err) return reject(err);
        const error = reply?.getError?.();
        if (error) return reject(new MrpcError(error.getErrorMessage() || 'request failed', error.getErrorCode() || '', error));
        resolve(reply?.getData?.());
      });
    });
  }

  /** The terminal id the server assigns to these credentials (Connection.GetId). */
  async getId(user: number | string, password: string): Promise<string> {
    if (this.id) return this.id;
    const req = new ConnectionPb.GetIdRequest();
    req.setUser(String(user));
    req.setPassword(String(password));
    const data = await this.call(this.connectionClient, 'getId', req, 30000);
    if (!data?.getId()) throw new MrpcError('GetId returned no id');
    this.id = data.getId();
    return this.id!;
  }

  /** Connects by broker server name (ConnectEx: `server`, e.g. "TeleTrade-Demo") or by address (Connect: `host`/`port`). */
  async connect(loginOrOptions: number | ConnectOptions, password?: string, server?: string): Promise<boolean> {
    const options: ConnectOptions = typeof loginOrOptions === 'object'
      ? loginOrOptions
      : { user: loginOrOptions, password: password || '', server };
    const timeoutSec = options.timeoutSeconds || 60;
    const timeoutMs = (timeoutSec + 10) * 1000;

    let data: any;
    if (options.server) {
      const req = new ConnectionPb.ConnectExRequest();
      req.setUser(options.user);
      req.setPassword(options.password);
      req.setMtClusterName(options.server);
      req.setTimeoutSeconds(timeoutSec);
      data = await this.call(this.connectionClient, 'connectEx', req, timeoutMs);
    } else if (options.host) {
      const req = new ConnectionPb.ConnectRequest();
      req.setUser(options.user);
      req.setPassword(options.password);
      req.setHost(options.host);
      req.setPort(options.port || 443);
      req.setTimeoutSeconds(timeoutSec);
      data = await this.call(this.connectionClient, 'connect', req, timeoutMs);
    } else {
      throw new MrpcError('connect needs a broker server name (server) or host');
    }
    if (!data?.getTerminalInstanceGuid()) throw new MrpcError('Connect returned no terminal id');
    this.id = data.getTerminalInstanceGuid();
    this.lastServer = options.server || options.host;
    this.connected = true;
    return true;
  }

  async getAccountInfo(): Promise<AccountInfo> {
    const summary = await this.call(this.accountClient, 'accountSummary', new AccountHelperPb.AccountSummaryRequest(), 15000);
    return {
      login: summary.getAccountLogin(),
      currency: summary.getAccountCurrency(),
      balance: summary.getAccountBalance(),
      equity: summary.getAccountEquity(),
      leverage: summary.getAccountLeverage(),
      name: summary.getAccountUserName(),
      server: this.lastServer || '',
    };
  }

  async orderSend(req: OrderRequest): Promise<OrderResult> {
    if (!(req.cmd in ORDER_TYPES)) throw new MrpcError(`Unknown order command ${req.cmd}`);
    const grpcReq = new TradingHelperPb.OrderSendRequest();
    grpcReq.setSymbol(req.symbol);
    grpcReq.setOperationType(ORDER_TYPES[req.cmd]);
    grpcReq.setVolume(req.lots);
    if (req.price !== undefined) grpcReq.setPrice(req.price);
    if (req.stopLoss !== undefined) grpcReq.setStoploss(req.stopLoss);
    if (req.takeProfit !== undefined) grpcReq.setTakeprofit(req.takeProfit);
    if (req.comment !== undefined) grpcReq.setComment(req.comment);
    if (req.slippage !== undefined) grpcReq.setSlippage(req.slippage);
    if (req.magicNumber !== undefined) grpcReq.setMagicNumber(req.magicNumber);

    const data = await this.call(this.tradingClient, 'orderSend', grpcReq, 20000);
    if (!data) throw new MrpcError('Order execution returned no data');
    return {
      ticket: data.getTicket(),
      errorCode: 0,
      lots: data.getVolume(),
      price: data.getPrice(),
      comment: req.comment || '',
    };
  }

  /**
   * Streams the ticks of the symbols. `onError` receives an error reply of the stream or the stream's failure
   * (a cancelled stream - `unsubscribe()` - is not an error).
   */
  subscribeQuotes(symbols: string[], callback: (quote: Quote) => void, onError?: (error: Error) => void): { unsubscribe: () => void } {
    const req = new SubscriptionsPb.OnSymbolTickRequest();
    req.setSymbolNamesList(symbols || []);
    const stream = this.subscriptionClient.onSymbolTick(req, this.getGrpcMetadata());
    stream.on('data', (reply: any) => {
      const error = reply.getError();
      if (error) {
        onError?.(new MrpcError(error.getErrorMessage() || 'stream error', error.getErrorCode() || '', error));
        return;
      }
      const tick = reply.getData()?.getSymbolTick();
      if (!tick) return; // a heartbeat
      callback({
        symbol: tick.getSymbol(),
        bid: tick.getBid(),
        ask: tick.getAsk(),
        time: tick.getTimeUtc() ? tick.getTimeUtc().toDate().getTime() : Date.now(),
      });
    });
    stream.on('error', (err: any) => {
      if (err?.code !== grpc.status.CANCELLED) onError?.(err);
    });
    return {
      unsubscribe: () => stream.cancel()
    };
  }

  async disconnect(deleteOnDisconnect: boolean = false): Promise<void> {
    this.connected = false;
    try {
      if (this.id) {
        const req = new ConnectionPb.DisconnectRequest();
        req.setDelete(deleteOnDisconnect);
        await this.call(this.connectionClient, 'disconnect', req, 10000);
      }
    } finally {
      this.channel.close();
    }
  }
}
