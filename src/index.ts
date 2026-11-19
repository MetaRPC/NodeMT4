/*
 * ════════════════════════════════════════════════════════════════════════════
 *  @metarpc/nodemt4 — MetaTrader 4 Node.js & TypeScript SDK
 * ════════════════════════════════════════════════════════════════════════════
 *
 *  Three composable layers over the MetaRPC MT4 gRPC gateway — enter at any level:
 *
 *      MT4Account   (low)   raw gRPC: protobuf Request/Data, channel & streaming
 *      MT4Service   (mid)   friendly facade: plain args, typed objects, mappers
 *      MT4Sugar     (high)  one-liners: balances, prices, orders, risk sizing
 *
 *  Quick start:
 *      import { MT4Sugar } from '@metarpc/nodemt4';
 *      const sugar = MT4Sugar.create('mt4.mrpc.pro', 443);   // apikey from MRPC_API_KEY, else TRIAL
 *      await sugar.quickConnect(500000, 'password', 'TeleTrade-Demo');
 *      console.log(await sugar.getBalance(), await sugar.getBid('EURUSD'));
 * ════════════════════════════════════════════════════════════════════════════
 */

// Errors — MrpcError / MT4Error / TradeOutcomeUnknownError / NotConnectedError
export * from './errors';

// Layer 1 — low-level client + generated bindings, TIMEFRAMES, ORDER_TYPES, Subscription, ConnectOptions, toTimestamp
export * from './MT4Account';

// Layer 2 — friendly facade + all data-transfer objects (AccountInfo, Quote, OrderInfo, …)
export * from './MT4Service';

// Layer 3 — one-liner API + PriceInfo / DailyStats
export * from './MT4Sugar';
