# MT4Account — Master Overview

> One page to **orient fast**: what lives where, how to choose the right API, and jump links to every **overview** and **method spec** in this docs set.

`MT4Account` (from `@metarpc/nodemt4`) is the **low-level** layer — a thin, 1:1-with-the-wire client. Each method maps to a single gRPC RPC: you pass a generated protobuf `*Request` and get back the reply's `*Data` payload, or it rejects with an `MrpcError`. It owns the gRPC channel, the service clients, the auth metadata (apikey + terminal id) and the connection lifecycle.

```ts
import { MT4Account } from '@metarpc/nodemt4';
```

!!! note "When to use this layer"
    Use `MT4Account` when you need a field the friendly layers do not expose, or full control over the exact request. For everyday work prefer [`MT4Service`](../MT4Service/MT4Service.Overview.md) (plain args + typed objects) or [`MT4Sugar`](../MT4Sugar/MT4Sugar.API_Overview.md) (one-liners).

---

## 🚦 Start here — Section Overviews

* **[Account Information — Overview](./1.%20Account_Information/Account_Information.Overview.md)**
  Balance / equity / credit / leverage, plus trade statistics and the equity curve.

* **[Orders & History — Overview](./2.%20Orders_History/Orders_History.Overview.md)**
  Open market & pending orders, their ticket numbers, and closed-order history.

* **[Symbols & Quotes — Overview](./3.%20Symbols_Quotes/Symbols_Quotes.Overview.md)**
  Symbol list, Market Watch, contract specs, live quotes, OHLC history, server timezone.

* **[Trading Operations — Overview](./4.%20Trading_Operations/Trading_Operations.Overview.md)**
  Send, modify, close/delete and close-by — sent exactly once (never re-sent).

* **[Streaming Methods — Overview](./5.%20Streaming_Methods/Streaming_Methods.Overview.md)**
  Real-time streams: ticks, trade events, live order profit, ticket snapshots, connection state.

---

## 🧭 How to pick an API

| If you need…                        | Go to…               | Typical calls                                              |
| ----------------------------------- | -------------------- | --------------------------------------------------------- |
| Account snapshot                    | Account Information  | `accountSummary`                                          |
| Trade statistics / equity curve     | Account Information  | `tradeStats`, `equityHistory`, `tradeUnrealizedPl`        |
| Open & pending orders               | Orders & History     | `openedOrders`, `openedOrdersTickets`                     |
| Closed-order history                | Orders & History     | `ordersHistory`                                           |
| Live quotes / symbol props          | Symbols & Quotes     | `quote`, `quoteMany`, `symbolParamsMany`, `symbolSelect`  |
| OHLC bars / server timezone         | Symbols & Quotes     | `quoteHistory`, `serverTimezone`                          |
| Place / modify / close an order     | Trading Operations   | `orderSend`, `orderModify`, `orderCloseDelete`            |
| Close one order by an opposite one  | Trading Operations   | `orderCloseBy`                                            |
| Real-time updates                   | Streaming Methods    | `onSymbolTick`, `onTrade`, `onOpenedOrdersProfit`         |

---

## 🔌 Usage pattern (raw gRPC)

Every method is called on an `MT4Account`. It owns the gRPC channel, sends the terminal id and API key as metadata, and unwraps the reply — returning the protobuf `*Data` payload or **rejecting** with an error.

```ts
import { MT4Account } from '@metarpc/nodemt4';

// Create the client (prepares the gRPC channel; apiKey from MRPC_API_KEY, else TRIAL)
const account = new MT4Account('mt4.mrpc.pro', 443);

// Connect the terminal (ConnectEx by broker server name)
await account.connect({ user: 500000, password: 'password', server: 'TeleTrade-Demo' });
// The gateway returns a terminal session GUID; later calls reuse it automatically.

// Call a method: returns the Data payload, or throws MrpcError / a transport error
const s = await account.accountSummary();
console.log('Balance:', s.getAccountBalance(), s.getAccountCurrency());

account.close();
```

Every method follows the same shape:

* **Proto Service/Method:** `Service.Method(Request) → Reply`
* **Client call:** `account.method(req?)` resolves with the `*Data` payload.
* **Reply structure:** the reply carries either a `data` payload or an `error`; `MT4Account` returns the `data` and turns `error` into a thrown **`MrpcError`**.
* **Errors are exceptions** — there are no error return values; `await` inside `try/catch`.

**Timestamps:** proto uses `google.protobuf.Timestamp`; read `.getSeconds()`. Every MT4 time is **broker server time** — the friendly `MT4Service` layer converts these to numbers / UTC for you.

**Streaming methods:** return a `{ unsubscribe() }` handle. The SDK reads the stream and invokes your callback with each reply's raw `*Data`; call `unsubscribe()` to stop.

---

## 📚 Full index · all method specs

### 1 · Account Information · [Overview](./1.%20Account_Information/Account_Information.Overview.md)
* [AccountSummary](./1.%20Account_Information/AccountSummary.md) — all account data in one call.
* [TradeStats](./1.%20Account_Information/TradeStats.md) — aggregated trade statistics.
* [TradeStatsEquityHistory](./1.%20Account_Information/TradeStatsEquityHistory.md) — stats + equity curve + trades.
* [EquityHistory](./1.%20Account_Information/EquityHistory.md) — the equity-curve points.
* [TradeUnrealizedPL](./1.%20Account_Information/TradeUnrealizedPL.md) — unrealized-P/L extrema per order.

### 2 · Orders & History · [Overview](./2.%20Orders_History/Orders_History.Overview.md)
* [OpenedOrders](./2.%20Orders_History/OpenedOrders.md) · [OpenedOrdersTickets](./2.%20Orders_History/OpenedOrdersTickets.md) · [OrdersHistory](./2.%20Orders_History/OrdersHistory.md)

### 3 · Symbols & Quotes · [Overview](./3.%20Symbols_Quotes/Symbols_Quotes.Overview.md)
* [Symbols](./3.%20Symbols_Quotes/Symbols.md) · [SymbolSelect](./3.%20Symbols_Quotes/SymbolSelect.md) · [SymbolParamsMany](./3.%20Symbols_Quotes/SymbolParamsMany.md) · [TickValueWithSize](./3.%20Symbols_Quotes/TickValueWithSize.md)
* [Quote](./3.%20Symbols_Quotes/Quote.md) · [QuoteMany](./3.%20Symbols_Quotes/QuoteMany.md) · [QuoteHistory](./3.%20Symbols_Quotes/QuoteHistory.md) · [ServerTimezone](./3.%20Symbols_Quotes/ServerTimezone.md)

### 4 · Trading Operations · [Overview](./4.%20Trading_Operations/Trading_Operations.Overview.md)
* [OrderSend](./4.%20Trading_Operations/OrderSend.md) · [OrderModify](./4.%20Trading_Operations/OrderModify.md) · [OrderCloseDelete](./4.%20Trading_Operations/OrderCloseDelete.md) · [OrderCloseBy](./4.%20Trading_Operations/OrderCloseBy.md)

### 5 · Streaming Methods · [Overview](./5.%20Streaming_Methods/Streaming_Methods.Overview.md)
* [OnSymbolTick](./5.%20Streaming_Methods/OnSymbolTick.md) · [OnTrade](./5.%20Streaming_Methods/OnTrade.md) · [OnOpenedOrdersProfit](./5.%20Streaming_Methods/OnOpenedOrdersProfit.md)
* [OnOpenedOrdersTickets](./5.%20Streaming_Methods/OnOpenedOrdersTickets.md) · [OnConnectState](./5.%20Streaming_Methods/OnConnectState.md)

---

## 🏗️ API Architecture

### Layer 1: MT4Account (Low-Level) — You are here!

**What:** direct protobuf/gRPC communication with the MT4 terminal. Works with protobuf `*Request` / `*Data` objects; raw gRPC calls; complete access to every MT4 function; highest complexity. **Location:** `src/MT4Account.ts`

### Layer 2: MT4Service

**What:** a friendly facade over `MT4Account` — plain arguments and typed objects (`AccountInfo`, `Quote`, `OrderInfo`, `Bar`…). No protobuf. **Location:** `src/MT4Service.ts` → [overview](../MT4Service/MT4Service.Overview.md).

### Layer 3: MT4Sugar

**What:** high-level convenience API — one-liners, risk-based position sizing, smart defaults. **Location:** `src/MT4Sugar.ts` → [overview](../MT4Sugar/MT4Sugar.API_Overview.md).

Each layer **owns** the one below it: `MT4Sugar` owns an `MT4Service`, which owns an `MT4Account`. From Sugar you can always reach down with `sugar.service()` and `sugar.account()`.

---

## 💡 Key concepts

* **Errors are exceptions.** A server-side rejection throws `MrpcError` (carrying `mqlIntCode` / `mqlDescription`); a transport failure throws the gRPC error. There are no error return values.
* **Session id is automatic.** `connect()` (ConnectEx) obtains a terminal session GUID; the SDK attaches it (+ your apikey) to every later call and stream. You never call `GetId` manually.
* **MT4 is order-centric.** Unlike MT5, MT4 has **no positions and no netting** — every fill is an **order with a ticket**, identified by an [`OrderSendOperationType`](./4.%20Trading_Operations/OrderSend.md) (OP_BUY, OP_SELL, OP_BUYLIMIT, …). "Positions" in the friendly layers simply means the open market orders (types BUY/SELL).
* **Trade outcome.** MT4 reports the broker's verdict as an MQL error number (`mqlIntCode`: 130 invalid stops, 131 invalid volume, 132 market closed, 134 not enough money, 138 requote, 128 trade timeout). A trade whose transport fails after the request may have reached the terminal becomes a [`TradeOutcomeUnknownError`](../All_Guides/RETURN_CODES_REFERENCE.md) and is **never re-sent**.
* **Everything is server time.** MT4 has no per-message UTC; use `serverTimezone()` or `accountSummary().getUtcServerTimeShiftMinutes()` to convert.

---

"Trade safe, code clean, and may your gRPC streams always flow smoothly."
