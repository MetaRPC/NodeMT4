# gRPC Stream Management — Node

> Every live feed in NodeMT4 is a gRPC **server stream**. The SDK wraps each one in the same simple contract: a callback per payload, an optional error callback, and a `Subscription` you must cancel. This page covers the contract, the lifecycle, and how to run streams safely.

---

## 🧰 The `Subscription` contract

```ts
interface Subscription { unsubscribe(): void; }
```

Every streaming method has the shape:

```ts
method(request, callback: (data) => void, onError?: (e: Error) => void): Subscription
```

```ts
import { SubscriptionsPb } from '@metarpc/nodemt4';

const req = new SubscriptionsPb.OnSymbolTickRequest();
req.setSymbolNamesList(['EURUSD']);

const sub = account.onSymbolTick(req, (data) => {
  const t = data.getSymbolTick();
  console.log(t.getSymbol(), t.getBid(), t.getAsk());
}, (err) => console.error('stream error:', err.message));

// stop it later — ALWAYS do this
sub.unsubscribe();
```

> The friendly [`MT4Service`](../MT4Service/5.%20Streaming_Methods.md) variants take plain arguments and map the payload for you — e.g. `service.subscribeQuotes(['EURUSD'], (tick) => …)`.

---

## 🔁 What happens under the hood

The low-level `stream` helper opens the gRPC server stream and forwards frames:

* **data frame** → if the reply carries an `error`, your `onError` gets an [`MrpcError`](./RETURN_CODES_REFERENCE.md); otherwise your `callback` gets the reply's raw `data` (read it with `getXxx()`).
* **transport error** → `onError` (unless you already unsubscribed and it's a CANCELLED).
* **stream end** → if you didn't cancel it, `onError` receives `MrpcError('… stream ended')`.
* **`unsubscribe()`** → cancels the gRPC call; the resulting CANCELLED is swallowed, not surfaced.

So a clean shutdown is silent, and an *unexpected* end is reported.

---

## 📡 The streams available

| Method (MT4Account) | Mapped variant (MT4Service) | Payload |
| ------------------- | --------------------------- | ------- |
| `onSymbolTick(req, cb)` | `subscribeQuotes(symbols, cb)` → `Tick` | ticks |
| `onTrade(req, cb)` | `subscribeTrades(cb)` | trade events |
| `onOpenedOrdersProfit(req, cb)` | `subscribeOpenedOrdersProfit(ms, cb)` | open orders + profit + account (margin), on a timer |
| `onOpenedOrdersTickets(req, cb)` | `subscribeOpenedOrdersTickets(ms, cb)` | ticket snapshots, on a timer |
| `onConnectState(req, cb)` | `subscribeConnectState(cb)` | terminal connection state |

`subscribeQuotes` maps each tick to a friendly `Tick`; the others forward typed event objects (see [MT4Service · Streaming](../MT4Service/5.%20Streaming_Methods.md)).

---

## ⏲️ Timer-driven streams

`onOpenedOrdersProfit` and `onOpenedOrdersTickets` push on a timer you set in the request:

```ts
import { SubscriptionsPb } from '@metarpc/nodemt4';

const req = new SubscriptionsPb.OnOpenedOrdersProfitRequest();
req.setTimerPeriodMilliseconds(1000);   // every second

const sub = account.onOpenedOrdersProfit(req, (data) => {
  for (const o of data.getOpenedOrdersWithProfitUpdatedList()) {
    console.log(`#${o.getTicket()} ${o.getSymbol()}  ${o.getOrderProfit()}`);
  }
  const a = data.getAccountInfo();
  if (a) console.log('margin', a.getMargin());   // live margin lives here on MT4
});
```

> This stream is also the reliable source of **live margin** on MT4 — `MT4Sugar.getMargin()` reads one snapshot of it.

---

## 🧹 Lifecycle & cleanup

* **Keep the handle.** Losing the `Subscription` means you can't stop the stream.
* **Unsubscribe on shutdown.** Tie it to your app's teardown:

```ts
const subs = [];
subs.push(service.subscribeQuotes(['EURUSD'], onTick));
subs.push(service.subscribeTrades(onTrade));

process.on('SIGINT', () => {
  subs.forEach((s) => s.unsubscribe());
  process.exit(0);
});
```

* **Disconnect last.** After unsubscribing, `await sugar.service().disconnect()` to release the terminal.

---

## ⚠️ Backpressure & long work

Stream callbacks run on the single event loop ([Concurrency Model](./CONCURRENCY_MODEL.md)). If a callback does heavy synchronous work, it stalls every other callback and timer. Keep callbacks light — push data into a queue and process it elsewhere if needed. Don't `await` a slow unary call inside a high-frequency tick callback without guarding against overlap.

---

## 🔌 Reconnection

If the terminal drops, a stream ends and `onError` fires. To resume: reconnect the account (`sugar.quickConnect(...)` / `account.reconnect()`) and re-subscribe. The SDK does not silently auto-resubscribe a stream — you decide the policy (immediate retry, backoff, alert). The [`onConnectState`](../MT4Account/5.%20Streaming_Methods/OnConnectState.md) stream is handy for gating on `isConnected`.

---

## See also

* [MT4Account · Streaming Methods](../MT4Account/5.%20Streaming_Methods/Streaming_Methods.Overview.md) — exact payload getters.
* [Concurrency Model](./CONCURRENCY_MODEL.md) · [Return Codes & errors](./RETURN_CODES_REFERENCE.md).
