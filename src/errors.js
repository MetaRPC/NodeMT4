"use strict";
// errors.ts — the error types every layer throws.
//
// A failed MetaRPC call surfaces as an `MrpcError`: either the reply carried an `error` message
// (built with `MrpcError.fromReply`), or the gRPC call itself failed. MT4's error numbers are exposed as
// `mqlCode` / `mqlIntCode` / `mqlDescription` (130 invalid stops, 131 invalid volume, 132 market closed,
// 134 not enough money, 138 requote, 128 trade timeout).
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
exports.NotConnectedError = exports.TradeOutcomeUnknownError = exports.MT4Error = exports.MrpcError = exports.isApiKeyText = void 0;
const grpc = __importStar(require("@grpc/grpc-js"));
const TRADE_OUTCOME_UNKNOWN = 'TRADE_OUTCOME_UNKNOWN';
const IN_BAND_TIMEOUT_CODES = ['MRPC_TIMEOUT', 'TERMINAL_API_TIMEOUT', 'COMMAND_TIMEOUT_EXCEEDED', 'TERMINAL_API_CALL_TIMEOUT'];
/** True when the text names an API-key refusal (API_KEY_INVALID / API_KEY_REQUIRED). */
const isApiKeyText = (s) => /API_KEY_(INVALID|REQUIRED)/i.test(s);
exports.isApiKeyText = isApiKeyText;
/**
 * An error the MRPC API answered with (the reply's `error`), or a failed call. `error` is the reply's error message
 * itself (absent for a failed call): `getMqlErrorCode()`, `getMqlErrorIntCode()` and the rest of its fields.
 * The MQL fields are unpacked: `mqlIntCode` is the MT4 error number, `mqlDescription` its text.
 */
class MrpcError extends Error {
    code;
    error;
    mqlCode;
    mqlIntCode;
    mqlDescription;
    constructor(message, code = '', error) {
        super(code ? `${code}: ${message}` : message);
        this.name = 'MrpcError';
        this.code = code;
        this.error = error;
        this.mqlCode = error && error.getMqlErrorCode ? Number(error.getMqlErrorCode()) : 0;
        this.mqlIntCode = error && error.getMqlErrorIntCode ? Number(error.getMqlErrorIntCode()) : 0;
        this.mqlDescription = error && error.getMqlErrorDescription ? error.getMqlErrorDescription() : '';
    }
    /** Builds the error for a reply's `error` message (mrpc.Error). */
    static fromReply(error) {
        const code = error.getErrorCode ? error.getErrorCode() : '';
        const message = error.getErrorMessage ? error.getErrorMessage() : '';
        const mqlIntCode = error.getMqlErrorIntCode ? Number(error.getMqlErrorIntCode()) : 0;
        const mqlDescription = error.getMqlErrorDescription ? error.getMqlErrorDescription() : '';
        return new MrpcError(`${message || mqlDescription || 'request failed'}${mqlIntCode ? ` (mql ${mqlIntCode})` : ''}`, code || '', error);
    }
    /** INVALID_LOGIN / wrong password errors must never be retried (brokers lock accounts). */
    get isInvalidLogin() {
        const s = `${this.code} ${this.message}`.toUpperCase();
        return s.includes('INVALID_LOGIN') || s.includes('WRONG_PASSWORD') || s.includes('INVALID_ACCOUNT') || s.includes('WRONGPASSWORD');
    }
    /** Errors after which reconnect() is worth a try (the terminal vanished on the gateway). */
    get isTerminalLost() {
        const s = `${this.code}`.toUpperCase();
        return s.includes('TERMINAL_INSTANCE_NOT_FOUND') || s.includes('TERMINAL_REGISTRY_TERMINAL_NOT_FOUND');
    }
    /** The API key was refused (API_KEY_INVALID / API_KEY_REQUIRED): retrying or reconnecting does not help. */
    get isApiKeyError() {
        return (0, exports.isApiKeyText)(`${this.code} ${this.message}`);
    }
    /** The trade call this error came from (`OrderSend`, `OrderModify`, `OrderCloseDelete`, `OrderCloseBy`); unset for other calls. */
    operation;
    /**
     * The outcome of the trade call is unknown: it timed out on the gateway or in the terminal (MRPC_TIMEOUT,
     * COMMAND_TIMEOUT_EXCEEDED, TERMINAL_API_CALL_TIMEOUT, ...) or MT4 answered 128 (ERR_TRADE_TIMEOUT). The trade may
     * or may not have been executed: check the open orders before sending it again.
     */
    get isTradeOutcomeUnknown() {
        if (this.code === TRADE_OUTCOME_UNKNOWN)
            return true;
        if (!this.operation)
            return false;
        if (IN_BAND_TIMEOUT_CODES.includes(this.code))
            return true;
        const type = Number(this.error && this.error.getType ? this.error.getType() : 0);
        if (type === 3 || type === 4)
            return true; // ErrorType MRPC_TIMEOUT / TERMINAL_API_TIMEOUT
        return this.mqlIntCode === 128;
    }
}
exports.MrpcError = MrpcError;
exports.MT4Error = MrpcError;
/**
 * A trade call (`orderSend`, `orderModify`, `orderCloseDelete`, `orderCloseBy`) failed at the transport level — gRPC
 * UNAVAILABLE, DEADLINE_EXCEEDED, UNKNOWN or INTERNAL — after the request may already have reached the terminal: the
 * trade may or may not have executed. The SDK never re-sends a trade; check the open orders (and the history) first.
 * It keeps the gRPC error's shape: `code` is still the gRPC status number (also `grpcCode`), `details`/`metadata`
 * are the original ones and `cause` is the original error, so `err.code === grpc.status.UNAVAILABLE` keeps working.
 */
class TradeOutcomeUnknownError extends Error {
    /** The error code of this condition, the same in every MetaRPC SDK. */
    static CODE = TRADE_OUTCOME_UNKNOWN;
    errorCode = TRADE_OUTCOME_UNKNOWN;
    isTradeOutcomeUnknown = true;
    code;
    grpcCode;
    details;
    metadata;
    operation;
    constructor(operation, transportError) {
        const grpcCode = Number(transportError?.code);
        super(`${TRADE_OUTCOME_UNKNOWN}: ${operation} failed with gRPC ${grpc.status[grpcCode] ?? grpcCode} after the request may have reached the terminal; ` +
            'the trade may or may not have been executed. It was NOT re-sent automatically: check the open orders before retrying. ' +
            `(${transportError?.details ?? transportError?.message ?? ''})`, { cause: transportError });
        this.name = 'TradeOutcomeUnknownError';
        this.code = grpcCode;
        this.grpcCode = grpcCode;
        this.details = transportError?.details ?? '';
        this.metadata = transportError?.metadata;
        this.operation = operation;
    }
    /** True for the gRPC status codes after which a trade's outcome is unknown. */
    static isUnknownOutcome(code) {
        return code === grpc.status.UNAVAILABLE || code === grpc.status.DEADLINE_EXCEEDED
            || code === grpc.status.UNKNOWN || code === grpc.status.INTERNAL;
    }
}
exports.TradeOutcomeUnknownError = TradeOutcomeUnknownError;
/** Thrown when a method is called before `connect()` has succeeded. */
class NotConnectedError extends MrpcError {
    constructor() {
        super('not connected — call connect() first', 'NOT_CONNECTED');
        this.name = 'NotConnectedError';
    }
}
exports.NotConnectedError = NotConnectedError;
