# 🎫 On Opened Orders Tickets

> **Stream:** a periodic list of open **position** and **pending** ticket numbers — a lightweight "what's open?" push.

**API Information:**

* **Low-level API:** `MT4Account.onOpenedOrdersTickets(request, onData, onError?)` (from `@metarpc/nodemt4`)
* **gRPC service:** `mt4_term_api.SubscriptionService`
* **Proto definition:** `OnOpenedOrdersTickets` (defined in `mt4-term-api-subscriptions.proto`)

### RPC

* **Service:** `mt4_term_api.SubscriptionService`
* **Method:** `OnOpenedOrdersTickets(OnOpenedOrdersTicketsRequest) → stream OnOpenedOrdersTicketsReply`
* **Low-level client (generated):** `SubscriptionServiceClient.onOpenedOrdersTickets(request, metadata)` (server stream)

---

## 💬 Just the essentials

* **What it is.** On a timer, just the ticket numbers — split into market positions and pending orders.
* **Why you need it.** Cheap change-detection without pulling full order detail.
* **Sanity check.** First event arrives after ~`pullIntervalMs`.

---

## 🧱 Signature

```ts
import { MT4Account, SubscriptionsPb, Subscription } from '@metarpc/nodemt4';

class MT4Account {
  // Periodic ticket snapshot. Returns a Subscription; unsubscribe() to stop.
  onOpenedOrdersTickets(req: any /* OnOpenedOrdersTicketsRequest */, onData: (data: any) => void, onError?: (e: any) => void): Subscription;
}
```

**Request message:** `OnOpenedOrdersTicketsRequest { int32 pull_interval_milliseconds = 1; }`
**Reply (streamed):** `OnOpenedOrdersTicketsReply { oneof { OnOpenedOrdersTicketsData data; Error error; } }`.

---

## 🔽 Input

| Setter | Type | Description |
| ------ | ---- | ----------- |
| `setPullIntervalMilliseconds(ms)` | `number` | How often to emit the ticket snapshot. |

---

## ⬆️ Payload — `OnOpenedOrdersTicketsData`

| JS accessor | Type | Description |
| ----------- | ---- | ----------- |
| `getPositionTicketsList()` | `number[]` | Tickets of open market orders (types BUY/SELL). |
| `getPendingOrderTicketsList()` | `number[]` | Tickets of pending orders (LIMIT/STOP). |
| `getServerTime()` | `Timestamp` | Snapshot time, broker server time. |

---

## 🧩 Notes & Tips

* **Diff between snapshots** to detect opens/closes — cheaper than full [OpenedOrders](../2.%20Orders_History/OpenedOrders.md).
* **Fetch detail on change** — when a ticket appears/disappears, pull its full info once.
* **Re-subscribe on `onError`**; `unsubscribe()` when done.

---

## 🔗 Usage Examples

### 1) Print one snapshot

```ts
import { MT4Account, SubscriptionsPb } from '@metarpc/nodemt4';

const req = new SubscriptionsPb.OnOpenedOrdersTicketsRequest();
req.setPullIntervalMilliseconds(1000);

const sub = account.onOpenedOrdersTickets(req, (data) => {
  console.log('positions:', data.getPositionTicketsList(), 'pending:', data.getPendingOrderTicketsList());
  sub.unsubscribe();
}, (e) => console.log('error:', e.message || e));
```

### 2) React to opens / closes

```ts
let prev = new Set<number>();
const sub = account.onOpenedOrdersTickets(req, (data) => {
  const now = new Set<number>([...data.getPositionTicketsList(), ...data.getPendingOrderTicketsList()]);
  for (const t of now) if (!prev.has(t)) console.log('opened #', t);
  for (const t of prev) if (!now.has(t)) console.log('closed #', t);
  prev = now;
});
```

---

## 📚 See Also

* [OpenedOrdersTickets](../2.%20Orders_History/OpenedOrdersTickets.md) — the one-shot version.
* [OnOpenedOrdersProfit](./OnOpenedOrdersProfit.md) — tickets **with** profit and margin.
* **Friendly layer:** [`MT4Service.subscribeOpenedOrdersTickets(ms, cb)`](../../MT4Service/MT4Service.Overview.md).
