import * as grpc from '@grpc/grpc-js';
export declare const ConnectionGrpc: any;
export declare const ConnectionPb: any;
export declare const AccountHelperGrpc: any;
export declare const AccountHelperPb: any;
export declare const TradingHelperGrpc: any;
export declare const TradingHelperPb: any;
export interface AccountInfo {
    login: number;
    currency: string;
    balance: number;
    equity: number;
    margin: number;
    freeMargin: number;
    leverage: number;
    name: string;
    server: string;
}
export interface Quote {
    symbol: string;
    bid: number;
    ask: number;
    time: number;
}
export interface OrderRequest {
    symbol: string;
    cmd: 'BUY' | 'SELL' | 'BUY_LIMIT' | 'SELL_LIMIT' | 'BUY_STOP' | 'SELL_STOP';
    lots: number;
    price?: number;
    slippage?: number;
    stopLoss?: number;
    takeProfit?: number;
    comment?: string;
}
export interface OrderResult {
    ticket: number;
    errorCode: number;
    price: number;
    lots: number;
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
export declare class MT4Client {
    host: string;
    port: number;
    apiKey: string | null;
    id: string | null;
    connected: boolean;
    channel: grpc.Channel;
    connectionClient: any;
    accountClient: any;
    tradingClient: any;
    private lastUser?;
    private lastPassword?;
    static computeDeterministicId(user: number | string, password: string): string;
    constructor(host?: string, port?: number, apiKey?: string | null, id?: string | null);
    getHeaders(): Record<string, string>;
    getGrpcMetadata(): grpc.Metadata;
    getId(user?: number | string, password?: string): Promise<string>;
    connect(loginOrOptions: number | ConnectOptions, password?: string): Promise<boolean>;
    getAccountInfo(): Promise<AccountInfo>;
    orderSend(req: OrderRequest): Promise<OrderResult>;
    disconnect(): void;
}
