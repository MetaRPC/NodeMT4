# MT4Account · Streaming Methods — Overview

> Real-time server streams: live **ticks**, **trade events**, periodic **order-profit** snapshots (with margin!), **ticket** snapshots, and terminal **connection state**. Each returns a `{ unsubscribe() }` handle.

These methods live on `mt4_term_api.SubscriptionService` (and `Connection` for `onConnectState`). Each takes a protobuf `*Request` and a callback that receives every reply's **raw `*Data`**; errors (and an unexpected end) go to `onError`. Mapping to typed objects happens one layer up, in [`MT4Service`](../../MT4Service/MT4Service.Overview.md).

## 📁 What lives here

* **[OnSymbolTick](./OnSymbolTick.md)** — live **ticks** for one or more symbols.
* **[OnTrade](./OnTrade.md)** — **trade events**: fills, modifications, closes (new / updated / removed / history orders).
* **[OnOpenedOrdersProfit](./OnOpenedOrdersProfit.md)** — periodic snapshot of open orders with **live profit** + account info (**including margin** — which `AccountSummary` lacks on MT4).
* **[OnOpenedOrdersTickets](./OnOpenedOrdersTickets.md)** — periodic list of open / pending **ticket numbers**.
* **[OnConnectState](./OnConnectState.md)** — terminal **connection-state** events (connected / alive).

---

## 🔌 The stream shape

```ts
const sub = account.onSymbolTick(req, (data) => {
  // data is the raw *Data of each reply — read it with getXxx()
}, (err) => {
  // error reply, transport failure, or an unexpected end
});

// later:
sub.unsubscribe();   // stops the stream (a cancel is NOT reported as an error)
```

* The callback fires once per reply with the raw payload.
* `onError` fires on an error reply, a transport failure, or if the stream ends unexpectedly. **Re-subscribe** after a transport error.
* `unsubscribe()` cancels cleanly — it is **not** surfaced to `onError`.

---

## Quick choose

| If you need…                               | Use                      | Payload (raw `*Data`)                        |
| ------------------------------------------ | ------------------------ | ------------------------------------------- |
| Live prices                                | `onSymbolTick`           | `getSymbolTick()` (bid/ask/last/volume/time) |
| Fills / modifications / closes             | `onTrade`                | `getType()`, `getEventData()`, `getAccountInfo()` |
| Live profit + margin, on a timer           | `onOpenedOrdersProfit`   | `getOpenedOrdersWithProfitUpdatedList()`, `getAccountInfo()` |
| Open/pending tickets, on a timer           | `onOpenedOrdersTickets`  | `getPositionTicketsList()`, `getPendingOrderTicketsList()` |
| Terminal connection health                 | `onConnectState`         | `getIsConnected()`, `getIsAlive()`, `getState()` |

---

## ❌ Gotchas

* **Select symbols first.** `onSymbolTick` only streams symbols that are in Market Watch — [SymbolSelect](../3.%20Symbols_Quotes/SymbolSelect.md) them.
* **Live margin lives here.** MT4's `AccountSummary` margin fields are often `0`; read `OnOpenedOrdersProfit`'s `getAccountInfo()` (or `MT4Sugar.getMargin()`).
* **Handle reconnects.** On a transport error, `onError` fires — re-subscribe (and `reconnect()` the account if the terminal was lost).
* **Always unsubscribe** when done to free the stream.

---

## See also

* **Friendly streams:** [`MT4Service.subscribeQuotes/subscribeTrades/subscribeOpenedOrdersProfit/subscribeOpenedOrdersTickets/subscribeConnectState`](../../MT4Service/MT4Service.Overview.md) — the same streams, mapped to typed objects.

---

**Back to:** [MT4Account — Master Overview](../MT4Account.Master.Overview.md)
