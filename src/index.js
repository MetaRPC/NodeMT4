"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MT4Client = exports.MrpcError = exports.MarketInfoPb = exports.MarketInfoGrpc = exports.SubscriptionsPb = exports.SubscriptionsGrpc = exports.TradingHelperPb = exports.TradingHelperGrpc = exports.AccountHelperPb = exports.AccountHelperGrpc = exports.ConnectionPb = exports.ConnectionGrpc = void 0;
const grpc = __importStar(require("@grpc/grpc-js"));
// Low-level gRPC and Protobuf bindings
exports.ConnectionGrpc = require('../package/mt4-term-api-connection_grpc_pb');
exports.ConnectionPb = require('../package/mt4-term-api-connection_pb');
exports.AccountHelperGrpc = require('../package/mt4-term-api-account-helper_grpc_pb');
exports.AccountHelperPb = require('../package/mt4-term-api-account-helper_pb');
exports.TradingHelperGrpc = require('../package/mt4-term-api-trading-helper_grpc_pb');
exports.TradingHelperPb = require('../package/mt4-term-api-trading-helper_pb');
exports.SubscriptionsGrpc = require('../package/mt4-term-api-subscriptions_grpc_pb');
exports.SubscriptionsPb = require('../package/mt4-term-api-subscriptions_pb');
exports.MarketInfoGrpc = require('../package/mt4-term-api-market-info_grpc_pb');
exports.MarketInfoPb = require('../package/mt4-term-api-market-info_pb');
/**
 * An error the MRPC API answered with (the reply's `error`), or a failed call. `error` is the reply's error message
 * itself (absent for a failed call): `getMqlErrorCode()`, `getMqlErrorTradeIntCode()` and the rest of its fields.
 */
class MrpcError extends Error {
    code;
    error;
    constructor(message, code = '', error) {
        super(code ? `${code}: ${message}` : message);
        this.code = code;
        this.error = error;
        this.name = 'MrpcError';
    }
}
exports.MrpcError = MrpcError;
const ORDER_TYPES = {
    BUY: exports.TradingHelperPb.OrderSendOperationType.OC_OP_BUY,
    SELL: exports.TradingHelperPb.OrderSendOperationType.OC_OP_SELL,
    BUY_LIMIT: exports.TradingHelperPb.OrderSendOperationType.OC_OP_BUYLIMIT,
    SELL_LIMIT: exports.TradingHelperPb.OrderSendOperationType.OC_OP_SELLLIMIT,
    BUY_STOP: exports.TradingHelperPb.OrderSendOperationType.OC_OP_BUYSTOP,
    SELL_STOP: exports.TradingHelperPb.OrderSendOperationType.OC_OP_SELLSTOP,
};
class MT4Client {
    host;
    port;
    apiKey;
    id;
    connected = false;
    channel;
    connectionClient;
    accountClient;
    tradingClient;
    subscriptionClient;
    marketInfoClient;
    lastServer;
    /**
     * Opens a new demo account through the API (GET /DemoAccount/Open) and returns its credentials.
     * @param host the REST host of the platform, e.g. "mt4.mrpc.pro"
     */
    static async openDemoAccount(server = 'MetaQuotes-Demo', apiKey = 'TRIAL', host = 'mt4.mrpc.pro') {
        const url = `https://${host}/DemoAccount/Open?server=${encodeURIComponent(server)}`;
        const res = await fetch(url, { headers: { APIKey: apiKey } });
        if (!res.ok) {
            throw new MrpcError(`Failed to open demo account: HTTP ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        const body = data.data || data;
        if (data.error || !body.login) {
            throw new MrpcError(data.error?.errorMessage || `No account opened (result code ${body.resultCode})`, data.error?.errorCode || '');
        }
        return { login: Number(body.login), password: String(body.password), server: String(body.server || server) };
    }
    constructor(host = 'mt4.mrpc.pro', port = 443, apiKey = null, id = null) {
        this.host = host;
        this.port = port;
        this.apiKey = apiKey || (typeof process !== 'undefined' ? process.env.MRPC_API_KEY || 'TRIAL' : 'TRIAL');
        this.id = id || null;
        const target = `${this.host}:${this.port}`;
        const credentials = this.port === 443
            ? grpc.credentials.createSsl()
            : grpc.credentials.createInsecure();
        this.channel = new grpc.Channel(target, credentials, {});
        this.connectionClient = new exports.ConnectionGrpc.ConnectionClient(target, credentials);
        this.accountClient = new exports.AccountHelperGrpc.AccountHelperClient(target, credentials);
        this.tradingClient = new exports.TradingHelperGrpc.TradingHelperClient(target, credentials);
        this.subscriptionClient = new exports.SubscriptionsGrpc.SubscriptionServiceClient(target, credentials);
        this.marketInfoClient = new exports.MarketInfoGrpc.MarketInfoClient(target, credentials);
    }
    getHeaders() {
        const headers = {};
        if (this.id)
            headers['id'] = this.id;
        headers['apikey'] = this.apiKey || 'TRIAL';
        return headers;
    }
    getGrpcMetadata() {
        const meta = new grpc.Metadata();
        if (this.id)
            meta.set('id', this.id);
        meta.set('apikey', this.apiKey || 'TRIAL');
        return meta;
    }
    /** A unary call: resolves with the reply's data, rejects with the reply's error or the call's failure. */
    call(client, method, request, timeoutMs) {
        return new Promise((resolve, reject) => {
            const deadline = new Date(Date.now() + timeoutMs);
            client[method](request, this.getGrpcMetadata(), { deadline }, (err, reply) => {
                if (err)
                    return reject(err);
                const error = reply?.getError?.();
                if (error)
                    return reject(new MrpcError(error.getErrorMessage() || 'request failed', error.getErrorCode() || '', error));
                resolve(reply?.getData?.());
            });
        });
    }
    /** The terminal id the server assigns to these credentials (Connection.GetId). */
    async getId(user, password) {
        if (this.id)
            return this.id;
        const req = new exports.ConnectionPb.GetIdRequest();
        req.setUser(String(user));
        req.setPassword(String(password));
        const data = await this.call(this.connectionClient, 'getId', req, 30000);
        if (!data?.getId())
            throw new MrpcError('GetId returned no id');
        this.id = data.getId();
        return this.id;
    }
    /** Connects by broker server name (ConnectEx: `server`, e.g. "TeleTrade-Demo") or by address (Connect: `host`/`port`). */
    async connect(loginOrOptions, password, server) {
        const options = typeof loginOrOptions === 'object'
            ? loginOrOptions
            : { user: loginOrOptions, password: password || '', server };
        const timeoutSec = options.timeoutSeconds || 60;
        const timeoutMs = (timeoutSec + 10) * 1000;
        let data;
        if (options.server) {
            const req = new exports.ConnectionPb.ConnectExRequest();
            req.setUser(options.user);
            req.setPassword(options.password);
            req.setMtClusterName(options.server);
            req.setTimeoutSeconds(timeoutSec);
            data = await this.call(this.connectionClient, 'connectEx', req, timeoutMs);
        }
        else if (options.host) {
            const req = new exports.ConnectionPb.ConnectRequest();
            req.setUser(options.user);
            req.setPassword(options.password);
            req.setHost(options.host);
            req.setPort(options.port || 443);
            req.setTimeoutSeconds(timeoutSec);
            data = await this.call(this.connectionClient, 'connect', req, timeoutMs);
        }
        else {
            throw new MrpcError('connect needs a broker server name (server) or host');
        }
        if (!data?.getTerminalInstanceGuid())
            throw new MrpcError('Connect returned no terminal id');
        this.id = data.getTerminalInstanceGuid();
        this.lastServer = options.server || options.host;
        this.connected = true;
        return true;
    }
    async getAccountInfo() {
        const summary = await this.call(this.accountClient, 'accountSummary', new exports.AccountHelperPb.AccountSummaryRequest(), 15000);
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
    async orderSend(req) {
        if (!(req.cmd in ORDER_TYPES))
            throw new MrpcError(`Unknown order command ${req.cmd}`);
        const grpcReq = new exports.TradingHelperPb.OrderSendRequest();
        grpcReq.setSymbol(req.symbol);
        grpcReq.setOperationType(ORDER_TYPES[req.cmd]);
        grpcReq.setVolume(req.lots);
        if (req.price !== undefined)
            grpcReq.setPrice(req.price);
        if (req.stopLoss !== undefined)
            grpcReq.setStoploss(req.stopLoss);
        if (req.takeProfit !== undefined)
            grpcReq.setTakeprofit(req.takeProfit);
        if (req.comment !== undefined)
            grpcReq.setComment(req.comment);
        if (req.slippage !== undefined)
            grpcReq.setSlippage(req.slippage);
        if (req.magicNumber !== undefined)
            grpcReq.setMagicNumber(req.magicNumber);
        const data = await this.call(this.tradingClient, 'orderSend', grpcReq, 20000);
        if (!data)
            throw new MrpcError('Order execution returned no data');
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
    subscribeQuotes(symbols, callback, onError) {
        const req = new exports.SubscriptionsPb.OnSymbolTickRequest();
        req.setSymbolNamesList(symbols || []);
        const stream = this.subscriptionClient.onSymbolTick(req, this.getGrpcMetadata());
        stream.on('data', (reply) => {
            const error = reply.getError();
            if (error) {
                onError?.(new MrpcError(error.getErrorMessage() || 'stream error', error.getErrorCode() || '', error));
                return;
            }
            const tick = reply.getData()?.getSymbolTick();
            if (!tick)
                return; // a heartbeat
            callback({
                symbol: tick.getSymbol(),
                bid: tick.getBid(),
                ask: tick.getAsk(),
                time: tick.getTimeUtc() ? tick.getTimeUtc().toDate().getTime() : Date.now(),
            });
        });
        stream.on('error', (err) => {
            if (err?.code !== grpc.status.CANCELLED)
                onError?.(err);
        });
        return {
            unsubscribe: () => stream.cancel()
        };
    }
    async disconnect(deleteOnDisconnect = false) {
        this.connected = false;
        try {
            if (this.id) {
                const req = new exports.ConnectionPb.DisconnectRequest();
                req.setDelete(deleteOnDisconnect);
                await this.call(this.connectionClient, 'disconnect', req, 10000);
            }
        }
        finally {
            this.channel.close();
        }
    }
}
exports.MT4Client = MT4Client;
