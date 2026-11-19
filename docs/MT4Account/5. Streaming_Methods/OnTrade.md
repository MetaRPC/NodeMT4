# 🔔 On Trade

> **Stream:** trade events — fills, modifications and closes. Each reply carries an event type, the affected orders (new / updated / removed / history), and an account snapshot.

**API Information:**

* **Low-level API:** `MT4Account.onTrade(request, onData, onError?)` (from `@metarpc/nodemt4`)
* **gRPC service:** `mt4_term_api.SubscriptionService`
* **Proto definition:** `OnTrade` (defined in `mt4-term-api-subscriptions.proto`)

### RPC

* **Service:** `mt4_term_api.SubscriptionService`
* **Method:** `OnTrade(OnTradeRequest) → stream OnTradeReply`
* **Low-level client (generated):** `SubscriptionServiceClient.onTrade(request, metadata)` (server stream)

---

## 💬 Just the essentials

* **What it is.** A push stream fired whenever the account's orders change.
* **Why you need it.** React to fills and closes immediately, keep a live order book, log activity.
* **Sanity check.** `getType()` is the event type; `getEventData()` holds the changed orders.

---

## 🧱 Signature

```ts
import { MT4Account, SubscriptionsPb, Subscription } from '@metarpc/nodemt4';

class MT4Account {
  // Trade-event stream. Returns a Subscription; call unsubscribe() to stop.
  onTrade(req: any /* OnTradeRequest */, onData: (data: any) => void, onError?: (e: any) => void): Subscription;
}
```

**Request message:** `OnTradeRequest {}` *(empty)*
**Reply (streamed):** `OnTradeReply { oneof { OnTradeData data; Error error; } }`.

---

## ⬆️ Payload — `OnTradeData`

| JS accessor | Type | Description |
| ----------- | ---- | ----------- |
| `getType()` | `number` *(enum)* | Event group — `MT4_SUB_ENUM_EVENT_GROUP_TYPE`, see [Enum fields](#enum-fields-returned-values) below. (What *changed* is in the four `getEventData()` lists, not in this field.) |
| `getEventData()` | message | The changed orders — see below. |
| `getAccountInfo()` | message | Account snapshot (balance / equity / margin / freeMargin / profit / marginLevel). |

`getEventData()` exposes:

| Accessor | Description |
| -------- | ----------- |
| `getNewOrdersList()` | Newly opened orders. |
| `getUpdatedOrdersList()` | Modified orders — each has `getPrevious()` / `getCurrent()`. |
| `getRemovedOrdersList()` | Closed / deleted orders. |
| `getNewHistoryOrdersList()` | Orders that moved to history. |

Each order object (`OnTradeOrderInfo`) exposes the usual fields (`getTicket()`, `getSymbol()`, `getType()`, `getLots()`, `getOpenPrice()`, `getOrderProfit()`, `getStopLoss()`, `getTakeProfit()`, …). Its `getType()` is an **enum result** — `SUB_ORDER_OPERATION_TYPE`, see below.

---

## 🔢 Enum fields (returned values)

Two getters in this stream return `number`s whose meaning is a constant on `SubscriptionsPb`.

### `OnTradeData.getType()` → `MT4_SUB_ENUM_EVENT_GROUP_TYPE`

```proto
enum MT4_SUB_ENUM_EVENT_GROUP_TYPE {
  ORDERPROFIT = 0;  // periodic profit/price refresh of open orders
  ORDERUPDATE = 1;  // an order was opened / modified / closed
}
```

### each order's `getType()` → `SUB_ORDER_OPERATION_TYPE`

```proto
enum SUB_ORDER_OPERATION_TYPE {
  SUB_OP_BUY       = 0;  // market buy
  SUB_OP_SELL      = 1;  // market sell
  SUB_OP_BUYLIMIT  = 2;  // pending buy limit
  SUB_OP_SELLLIMIT = 3;  // pending sell limit
  SUB_OP_BUYSTOP   = 4;  // pending buy stop
  SUB_OP_SELLSTOP  = 5;  // pending sell stop
}
```

> **💡 Enum usage note:** same 0–5 numbering as the trading [`OrderSendOperationType`](../4.%20Trading_Operations/OrderSend.md) and [`OpenedOrderType`](../2.%20Orders_History/OpenedOrders.md) — a buy is `0`, a sell is `1`, pendings are `2`–`5`. Compare against the full constant, e.g. `o.getType() === SubscriptionsPb.SUB_ORDER_OPERATION_TYPE.SUB_OP_BUY`.

---

## 🧩 Notes & Tips

* **One stream covers the account** — no per-symbol subscription needed.
* **`getAccountInfo()` carries margin** here too (useful on MT4).
* **Re-subscribe on `onError`**; `unsubscribe()` is a clean cancel.

---

## 🔗 Usage Examples

### 1) Log fills and closes

```ts
import { MT4Account, SubscriptionsPb } from '@metarpc/nodemt4';

const sub = account.onTrade(new SubscriptionsPb.OnTradeRequest(), (data) => {
  const ev = data.getEventData();
  if (ev) {
    for (const o of ev.getNewOrdersList())     console.log('OPEN  #', o.getTicket(), o.getSymbol());
    for (const o of ev.getRemovedOrdersList()) console.log('CLOSE #', o.getTicket(), 'P/L', o.getOrderProfit());
  }
}, (e) => console.log('trade stream error:', e.message || e));

// later: sub.unsubscribe();
```

### 2) Keep a running equity read

```ts
const sub = account.onTrade(new SubscriptionsPb.OnTradeRequest(), (data) => {
  const a = data.getAccountInfo();
  if (a) console.log(`equity ${a.getEquity().toFixed(2)} margin ${a.getMargin().toFixed(2)}`);
});
```

---

## 📚 See Also

* [OnOpenedOrdersProfit](./OnOpenedOrdersProfit.md) — periodic profit snapshots (timer-based).
* [OpenedOrders](../2.%20Orders_History/OpenedOrders.md) — the current book on demand.
* **Friendly layer:** [`MT4Service.subscribeTrades(cb)`](../../MT4Service/MT4Service.Overview.md).
