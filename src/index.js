"use strict";
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Errors — MrpcError / MT4Error / TradeOutcomeUnknownError / NotConnectedError
__exportStar(require("./errors"), exports);
// Layer 1 — low-level client + generated bindings, TIMEFRAMES, ORDER_TYPES, Subscription, ConnectOptions, toTimestamp
__exportStar(require("./MT4Account"), exports);
// Layer 2 — friendly facade + all data-transfer objects (AccountInfo, Quote, OrderInfo, …)
__exportStar(require("./MT4Service"), exports);
// Layer 3 — one-liner API + PriceInfo / DailyStats
__exportStar(require("./MT4Sugar"), exports);
