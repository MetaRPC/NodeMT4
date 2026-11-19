# 🎫 Opened Orders — Tickets

> **Request:** just the **ticket numbers** of all open and pending orders (`OpenedOrdersTicketsData`) — the lightest "what's open?" call.

**API Information:**

* **Low-level API:** `MT4Account.openedOrdersTickets(request?)` (from `@metarpc/nodemt4`)
* **gRPC service:** `mt4_term_api.AccountHelper`
* **Proto definition:** `OpenedOrdersTickets` (defined in `mt4-term-api-account-helper.proto`)

### RPC

* **Service:** `mt4_term_api.AccountHelper`
* **Method:** `OpenedOrdersTickets(OpenedOrdersTicketsRequest) → OpenedOrdersTicketsReply`
* **Low-level client (generated):** `AccountHelperClient.openedOrdersTickets(request, metadata, opts, cb)`

---

## 💬 Just the essentials

* **What it is.** An array of ticket numbers — no order detail.
* **Why you need it.** Cheap polling for "did anything open/close?", reconciling against your own records, or counting open orders.
* **Sanity check.** An empty array means nothing is open.

---

## 🎯 Purpose

Use it when you only need the tickets (not the full [OpenedOrders](./OpenedOrders.md) payload) — e.g. a tight polling loop. **Read-only.**

> **Prefer plain values?** [`MT4Service.openedOrdersTickets()`](../../MT4Service/MT4Service.Overview.md) returns `number[]`.

---

## 🧱 Signature

```ts
import { MT4Account, AccountHelperPb } from '@metarpc/nodemt4';

class MT4Account {
  // The ticket numbers of all open/pending orders. Returns OpenedOrdersTicketsData; throws MrpcError on failure.
  openedOrdersTickets(req?: any /* OpenedOrdersTicketsRequest */): Promise<any /* OpenedOrdersTicketsData */>;
}
```

**Request message:** `OpenedOrdersTicketsRequest {}` *(empty — the argument is optional)*

**Reply message:** `OpenedOrdersTicketsReply { oneof response { OpenedOrdersTicketsData data = 1; Error error = 2; } }`.

---

## 🔽 Input

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `req` | `OpenedOrdersTicketsRequest` *(optional)* | Empty request; omit it. |

---

## ⬆️ Output — `OpenedOrdersTicketsData`

| JS accessor | Type | Description |
| ----------- | ---- | ----------- |
| `getTicketsList()` | `number[]` | Ticket numbers of all open + pending orders. |

---

## 🧩 Notes & Tips

* **Lighter than `openedOrders`** — use it for frequent polling; fetch full detail only when a ticket set changes.
* **No type split** — the array mixes market and pending tickets; to tell them apart, read [OpenedOrders](./OpenedOrders.md).
* **Errors are exceptions:** rejects with `MrpcError` / the gRPC error.

---

## 🔗 Usage Examples

### 1) Count and list open tickets

```ts
const t = await account.openedOrdersTickets();
console.log(`${t.getTicketsList().length} open:`, t.getTicketsList());
```

### 2) Detect a change between polls

```ts
let prev = new Set<number>();
setInterval(async () => {
  const now = new Set((await account.openedOrdersTickets()).getTicketsList());
  const opened = [...now].filter((x) => !prev.has(x));
  const closed = [...prev].filter((x) => !now.has(x));
  if (opened.length) console.log('opened:', opened);
  if (closed.length) console.log('closed:', closed);
  prev = now;
}, 2000);
```

---

## 📚 See Also

* [OpenedOrders](./OpenedOrders.md) — full detail of each open order.
* [OnOpenedOrdersTickets](../5.%20Streaming_Methods/OnOpenedOrdersTickets.md) — the **streaming** version (push instead of poll).
* **Friendly layer:** [`MT4Service.openedOrdersTickets()`](../../MT4Service/MT4Service.Overview.md) → `number[]`.
