/** True when the text names an API-key refusal (API_KEY_INVALID / API_KEY_REQUIRED). */
export declare const isApiKeyText: (s: string) => boolean;
/**
 * An error the MRPC API answered with (the reply's `error`), or a failed call. `error` is the reply's error message
 * itself (absent for a failed call): `getMqlErrorCode()`, `getMqlErrorIntCode()` and the rest of its fields.
 * The MQL fields are unpacked: `mqlIntCode` is the MT4 error number, `mqlDescription` its text.
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
    /** The API key was refused (API_KEY_INVALID / API_KEY_REQUIRED): retrying or reconnecting does not help. */
    get isApiKeyError(): boolean;
    /** The trade call this error came from (`OrderSend`, `OrderModify`, `OrderCloseDelete`, `OrderCloseBy`); unset for other calls. */
    operation?: string;
    /**
     * The outcome of the trade call is unknown: it timed out on the gateway or in the terminal (MRPC_TIMEOUT,
     * COMMAND_TIMEOUT_EXCEEDED, TERMINAL_API_CALL_TIMEOUT, ...) or MT4 answered 128 (ERR_TRADE_TIMEOUT). The trade may
     * or may not have been executed: check the open orders before sending it again.
     */
    get isTradeOutcomeUnknown(): boolean;
}
/** The name the fleet audit used for `MrpcError`. */
export { MrpcError as MT4Error };
/**
 * A trade call (`orderSend`, `orderModify`, `orderCloseDelete`, `orderCloseBy`) failed at the transport level — gRPC
 * UNAVAILABLE, DEADLINE_EXCEEDED, UNKNOWN or INTERNAL — after the request may already have reached the terminal: the
 * trade may or may not have executed. The SDK never re-sends a trade; check the open orders (and the history) first.
 * It keeps the gRPC error's shape: `code` is still the gRPC status number (also `grpcCode`), `details`/`metadata`
 * are the original ones and `cause` is the original error, so `err.code === grpc.status.UNAVAILABLE` keeps working.
 */
export declare class TradeOutcomeUnknownError extends Error {
    /** The error code of this condition, the same in every MetaRPC SDK. */
    static readonly CODE = "TRADE_OUTCOME_UNKNOWN";
    readonly errorCode: string;
    readonly isTradeOutcomeUnknown: boolean;
    readonly code: number;
    readonly grpcCode: number;
    readonly details: string;
    readonly metadata: any;
    readonly operation: string;
    constructor(operation: string, transportError: any);
    /** True for the gRPC status codes after which a trade's outcome is unknown. */
    static isUnknownOutcome(code: number): boolean;
}
/** Thrown when a method is called before `connect()` has succeeded. */
export declare class NotConnectedError extends MrpcError {
    constructor();
}
