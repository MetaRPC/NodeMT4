# 💰 On Opened Orders Profit

> **Stream:** a periodic snapshot of all open orders with **live floating profit**, plus an account snapshot that **includes margin** — the reliable source of margin on MT4.

**API Information:**

* **Low-level API:** `MT4Account.onOpenedOrdersProfit(request, onData, onError?)` (from `@metarpc/nodemt4`)
* **gRPC service:** `mt4_term_api.SubscriptionService`
* **Proto definition:** `OnOpenedOrdersProfit` (defined in `mt4-term-api-subscriptions.proto`)

### RPC

* **Service:** `mt4_term_api.SubscriptionService`
* **Method:** `OnOpenedOrdersProfit(OnOpenedOrdersProfitRequest) → stream OnOpenedOrdersProfitReply`
* **Low-level client (generated):** `SubscriptionServiceClient.onOpenedOrdersProfit(request, metadata)` (server stream)

---

## 💬 Just the essentials

* **What it is.** On a timer, the open orders with their current profit, plus the account's balance / equity / **margin** / free margin / margin level.
* **Why you need it.** A live P/L dashboard — and the only dependable way to read **margin** on MT4 (`AccountSummary` returns `0`).
* **Sanity check.** First event arrives after ~`timerPeriodMs`.

---

## 🧱 Signature

```ts
import { MT4Account, SubscriptionsPb, Subscription } from '@metarpc/nodemt4';

class MT4Account {
  // Periodic open-orders-with-profit + account snapshot. Returns a Subscription; unsubscribe() to stop.
  onOpenedOrdersProfit(req: any /* OnOpenedOrdersProfitRequest */, onData: (data: any) => void, onError?: (e: any) => void): Subscription;
}
```

**Request message:** `OnOpenedOrdersProfitRequest { int32 timer_period_milliseconds = 1; }`
**Reply (streamed):** `OnOpenedOrdersProfitReply { oneof { OnOpenedOrdersProfitData data; Error error; } }`.

---

## 🔽 Input

| Setter | Type | Description |
| ------ | ---- | ----------- |
| `setTimerPeriodMilliseconds(ms)` | `number` | How often to emit a snapshot (e.g. `1000`). |

---

## ⬆️ Payload — `OnOpenedOrdersProfitData`

| JS accessor | Description |
| ----------- | ----------- |
| `getOpenedOrdersWithProfitUpdatedList()` | Open orders, each with `getTicket()`, `getSymbol()`, `getType()`, `getLots()`, `getOpenPrice()`, `getOrderProfit()`, `getStopLoss()`, `getTakeProfit()`, `getSwap()`, `getCommission()`, `getMagicNumber()`. |
| `getAccountInfo()` | `getBalance()`, `getEquity()`, **`getMargin()`**, **`getFreeMargin()`**, `getProfit()`, **`getMarginLevel()`**. |

> Each order's `getType()` is an **enum result** — `SubscriptionsPb.SUB_ORDER_OPERATION_TYPE` (`SUB_OP_BUY` 0 … `SUB_OP_SELLSTOP` 5), the same 0–5 numbering as trading. See the [OnTrade enum table](./OnTrade.md#enum-fields-returned-values).

---

## 🧩 Notes & Tips

* **Margin lives here.** This is where `MT4Sugar.getMargin()` / `getFreeMargin()` / `getMarginLevel()` read one snapshot.
* **Pick a sane period** — 1000 ms is a good default; too small floods your callback.
* **Re-subscribe on `onError`**; `unsubscribe()` when done.

---

## 🔗 Usage Examples

### 1) One live account snapshot (margin)

```ts
import { MT4Account, SubscriptionsPb } from '@metarpc/nodemt4';

const req = new SubscriptionsPb.OnOpenedOrdersProfitRequest();
req.setTimerPeriodMilliseconds(1000);

const sub = account.onOpenedOrdersProfit(req, (data) => {
  const a = data.getAccountInfo();
  if (a) console.log(`equity ${a.getEquity().toFixed(2)}  margin ${a.getMargin().toFixed(2)}  free ${a.getFreeMargin().toFixed(2)}`);
  sub.unsubscribe();   // just one snapshot
}, (e) => console.log('error:', e.message || e));
```

### 2) Live P/L of each open order

```ts
const sub = account.onOpenedOrdersProfit(req, (data) => {
  for (const o of data.getOpenedOrdersWithProfitUpdatedList()) {
    console.log(`#${o.getTicket()} ${o.getSymbol()} P/L ${o.getOrderProfit().toFixed(2)}`);
  }
});
// later: sub.unsubscribe();
```

---

## 📚 See Also

* [AccountSummary](../1.%20Account_Information/AccountSummary.md) — note its margin fields are `0` on MT4.
* [OnTrade](./OnTrade.md) — event-driven (not timer-based) changes.
* **Friendly layer:** [`MT4Service.subscribeOpenedOrdersProfit(ms, cb)`](../../MT4Service/MT4Service.Overview.md); `MT4Sugar.getMargin()`.
