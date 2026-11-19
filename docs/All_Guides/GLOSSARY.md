# Glossary

> The MT4, trading and SDK terms you'll meet in these docs, grouped by kind.

---

## 🏗️ Architectural terms

**Three-layer architecture** — the SDK is three decoupled layers, each owning the one below (`sugar.service()` → `MT4Service`, `service.account()` → `MT4Account`). See the [Project Map](./PROJECT_MAP.md).

**MT4Account** — the low-level layer. Raw gRPC: you pass protobuf `*Request` messages and read `*Data` replies with `getXxx()` getters. Owns the channel, the gRPC clients, auth metadata, reconnect and streaming. → [overview](../MT4Account/MT4Account.Master.Overview.md)

**MT4Service** — the mid layer. Same calls, but it builds the protobuf from plain arguments and returns typed objects (`AccountInfo`, `Quote`, `OrderInfo`…). → [overview](../MT4Service/MT4Service.Overview.md)

**MT4Sugar** — the high layer. One-line helpers (`buyMarket`, `closeAllPositions`) with smart defaults; throws on failure. → [overview](../MT4Sugar/MT4Sugar.API_Overview.md)

**DTO** — "data transfer object": the plain TypeScript interfaces `MT4Service` returns instead of protobuf (`AccountInfo`, `Quote`, `OrderInfo`, `SymbolParams`, `Bar`, `TradeStats`…).

**MrpcError** — the error thrown when the gateway or terminal reports a problem. Carries `code`, `message`, and for trade rejections the MT4 error number `mqlIntCode` / `mqlDescription`. Flags: `isInvalidLogin` (never retry), `isTerminalLost` (reconnect), `isApiKeyError`, `isTradeOutcomeUnknown`. Alias: `MT4Error`. See [Return Codes → the error object](./RETURN_CODES_REFERENCE.md).

**TradeOutcomeUnknownError** — thrown when a **trade** call's transport fails after the request may have reached the terminal (or MT4 answers 128 timeout). The trade is **never re-sent** — reconcile with `openedOrders()`. See [Return Codes](./RETURN_CODES_REFERENCE.md).

**Subscription** — what a streaming method returns: `{ unsubscribe(): void }`. Call `unsubscribe()` to stop the stream.

---

## 🧩 Node / TypeScript-specific concepts

**Async / await** — every network call returns a `Promise`; `await` it inside `async` functions and wrap in `try/catch`.

```ts
const sugar = MT4Sugar.create('mt4.mrpc.pro', 443, process.env.MRPC_API_KEY);
await sugar.quickConnect(login, 'password', 'TeleTrade-Demo');
const balance = await sugar.getBalance();
```

**`Promise.all` for parallel reads** — independent calls run concurrently instead of one-by-one.

```ts
const [quote, params] = await Promise.all([
  service.quote('EURUSD'),
  service.symbolParams('EURUSD'),
]);
```

**Typed objects vs protobuf stubs** — the low layer returns generated protobuf objects (`reply.getXxx()`); the mid layer unwraps them into typed DTOs. The stubs are typed `any`, so discover real names with the [Protobuf Inspector](./PROTOBUF_INSPECTOR_GUIDE.md).

```ts
const d = await account.openedOrders();        // low: protobuf, d.getOrderInfosList()
const orders = await service.openedOrders();   // mid: typed OrderInfo[]
```

**Streaming — the Subscription/callback model** — a streaming method returns a `Subscription` and invokes your callback per payload; errors go to the optional `onError`. Always `unsubscribe()` when done. See [gRPC Stream Management](./GRPC_STREAM_MANAGEMENT.md).

```ts
const sub = service.subscribeQuotes(['EURUSD'], (t) => console.log(t.bid, t.ask));
// later:
sub.unsubscribe();
```

**Connection & cleanup** — `connect` / `quickConnect` opens the terminal session; `disconnect(true)` closes it and **frees the terminal** (a trial allows one per IP). Use `try/finally`.

```ts
try { /* … */ } finally { await sugar.service().disconnect(true); }
```

---

## 🎓 Trading terms

### Account

**Balance** — closed-trade money; excludes floating P/L. **Equity** — balance + floating P/L; moves with open orders. **Margin** — funds locked to hold orders. **Free margin** — equity − margin; available to open more. **Margin level** — equity / margin × 100 (%); low levels risk a **stop-out**. **Leverage** — the multiplier (1:100) setting margin need. **Trade mode** — `DEMO`, `CONTEST` or `REAL`.

> On MT4, margin / free margin / margin level aren't in the account summary — read them from a live `OnOpenedOrdersProfit` snapshot (`MT4Sugar.getMargin()` / `getFreeMargin()` / `getMarginLevel()`).

### Instruments & prices

**Symbol** — a tradable instrument (`EURUSD`, `XAUUSD`). **Bid / Ask** — sell / buy price; **spread** = ask − bid. **Digits** — decimal places (5 for EURUSD, 3 for JPY). **Tick** — one price update (`quote` / `onSymbolTick`). **Server time** — every MT4 timestamp is broker time; convert with `serverTimezone()` or `AccountInfo.utcServerShiftMinutes`.

### Orders & history (MT4 model)

**Order** — an instruction to trade. **Market** fills now; **pending** (LIMIT/STOP) waits for a price. **Ticket** — the numeric id that addresses every order. **Order type** (`OrderSendOperationType`): `OC_OP_BUY=0, OC_OP_SELL=1, OC_OP_BUYLIMIT=2, OC_OP_SELLLIMIT=3, OC_OP_BUYSTOP=4, OC_OP_SELLSTOP=5`. **No positions, no netting** — MT4 keeps each fill as its own order; the friendly layers call open market orders (types 0/1) "**positions**" for convenience. **History order** — a closed order (with a close time and close price). **SL / TP** — stop-loss / take-profit auto-close levels. **Magic number** — a client id tagging a strategy's orders. **mqlIntCode** — the MT4 error number a refusal carries (130 invalid stops, 131 invalid volume, 132 market closed, 134 no money, 138 requote, 128 trade timeout). See [Return Codes](./RETURN_CODES_REFERENCE.md).

---

## 📦 Technical concepts

**Point** — the smallest price increment (`0.00001` on 5-digit EURUSD). **Pip** — the conventional move unit; in this SDK `pip = point × (digits is 3 or 5 ? 10 : 1)`, so one pip on EURUSD = `0.0001`. **Tick value / tick size** — the money value of one tick, and the price change one tick represents — inputs for P&L and sizing.

**Lot / volume** — trade size in lots (`0.01` = micro). Must obey **volume limits** (`volumeMin` / `volumeMax` / `volumeStep`). **Contract size** — units of the base instrument per 1.0 lot.

**Risk-based sizing** — picking the lot so a stop of N pips loses a fixed % of balance: [`calculatePositionSize(symbol, riskPercent, stopLossPips)`](../MT4Sugar/10.%20Risk_Management.md). **Risk amount** = `balance × riskPercent / 100`. **Required margin** — margin a prospective order needs. **Drawdown** — the drop from a peak to current equity, %.

**Stops level** (`SymbolParams.stopsLevel`) — minimum distance, in points, SL/TP may sit from the market; closer → `mqlIntCode` 130.

**Trailing stop** — a stop that ratchets in your favour, never back ([orchestrator](../Orchestrators/11_Trailing_stop.md)). **Breakeven** — moving the stop to entry once in profit. **Hedging** — on MT4 you can always hold BUY and SELL on one symbol at once (no netting). **Grid trading** — bracketing price with pending orders ([orchestrator](../Orchestrators/12_Grid_trader.md)). **Scalping** — many small short-lived trades. **News trading** — trading around releases; expect wide spreads / rejections. **Kill-switch** — close everything on a drawdown/margin breach ([risk manager](../Orchestrators/13_Risk_manager.md)).

---

## 🔌 gRPC & protocol terms

**gRPC** — the RPC protocol the SDK speaks to `mt4.mrpc.pro:443` (HTTP/2 + protobuf over TLS).

**Protobuf** — the binary message format. On the low layer you build `*Request` messages and read `*Data` replies with `getXxx()` getters; `MT4Service` hides this behind typed objects.

**Streaming pattern** — a server stream delivered via callback: a streaming method returns a `Subscription` and calls your callback per payload. See [gRPC Stream Management](./GRPC_STREAM_MANAGEMENT.md).

**Gateway** — the MetaRPC service (`mt4.mrpc.pro`) bridging the SDK to MT4 terminals and managing sessions. **Terminal** — the MT4 instance your account runs on behind the gateway. **Session / terminal instance guid** — the id obtained on `connect` (ConnectEx), attached with your API key to every later call automatically. **API key** — your MetaRPC key; pass it to `MT4Sugar.create(...)`, or use `TRIAL`.

---

## See also

* [Project Map](./PROJECT_MAP.md) · [MT4 for Beginners](./MT4_For_Beginners.md) · [Getting Started](./GETTING_STARTED.md) · [Return Codes](./RETURN_CODES_REFERENCE.md)
