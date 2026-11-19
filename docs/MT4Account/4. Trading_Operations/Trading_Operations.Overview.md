# MT4Account · Trading Operations — Overview

> Send, modify, close/delete and close-by — the four trade RPCs. On MT4 a trade is **sent exactly once** and **never re-sent**: a transport failure after the request may have reached the terminal becomes a `TradeOutcomeUnknownError`.

These methods live on `mt4_term_api.TradingHelper`. Each resolves with the raw `*Data`, or rejects — with an `MrpcError` (the broker refused) or a `TradeOutcomeUnknownError` (the outcome is unknown).

## 📁 What lives here

* **[OrderSend](./OrderSend.md)** — open a **market or pending** order.
* **[OrderModify](./OrderModify.md)** — change SL/TP (and price/expiration for pending orders).
* **[OrderCloseDelete](./OrderCloseDelete.md)** — close a market order (fully or partially) or **delete** a pending one.
* **[OrderCloseBy](./OrderCloseBy.md)** — close an order by an **opposite** order on the same symbol.

---

## 🧭 Plain English

* **Open** → `orderSend` with an `OrderSendOperationType` (OP_BUY, OP_SELL, OP_BUYLIMIT, …).
* **Adjust** → `orderModify` (pass the full new SL/TP).
* **Close / delete** → `orderCloseDelete` (a market close or a pending delete; `getMode()` tells which).
* **Net two opposite orders** → `orderCloseBy`.

> **Order types** (`OrderSendOperationType`): `OC_OP_BUY` (0) · `OC_OP_SELL` (1) · `OC_OP_BUYLIMIT` (2) · `OC_OP_SELLLIMIT` (3) · `OC_OP_BUYSTOP` (4) · `OC_OP_SELLSTOP` (5).

---

## ⚠️ Exactly-once & unknown outcomes

Every trade routes through the SDK's `tradeCall`, which **sends it once**:

* The broker **refuses** → `MrpcError` with `mqlIntCode` (130 invalid stops, 131 invalid volume, 132 market closed, 134 no money, 138 requote). `err.operation` names the call.
* The **transport fails** after the request may have reached the terminal (gRPC UNAVAILABLE / DEADLINE_EXCEEDED / UNKNOWN / INTERNAL), **or** MT4 answers 128 (trade timeout) → **[`TradeOutcomeUnknownError`](../../All_Guides/RETURN_CODES_REFERENCE.md)**. The trade may or may not have executed — **check [open orders](../2.%20Orders_History/OpenedOrders.md) before retrying**. The SDK never re-sends.

```ts
import { TradeOutcomeUnknownError } from '@metarpc/nodemt4';

try {
  await account.orderSend(req);
} catch (e) {
  if (e instanceof TradeOutcomeUnknownError) {
    // DO NOT blindly resend — reconcile with openedOrders() first
  } else {
    console.log('refused:', e.message, e.mqlIntCode);
  }
}
```

---

## Quick choose

| If you need…                               | Use                | Returns               |
| ------------------------------------------ | ------------------ | --------------------- |
| Open a market / pending order              | `orderSend`        | `OrderSendData`       |
| Change SL / TP (or pending price/expiry)   | `orderModify`      | `OrderModifyData`     |
| Close a market order / delete a pending    | `orderCloseDelete` | `OrderCloseDeleteData`|
| Close by an opposite order                 | `orderCloseBy`     | `OrderCloseByData`    |

---

## ❌ Gotchas

* **Market orders need a price.** MT4's `orderSend` requires a request price — read [Quote](../3.%20Symbols_Quotes/Quote.md) (ask for buys, bid for sells) first. The friendly layers fill it for you.
* **Slippage is in points.**
* **Closing needs the price too** — bid to close a buy, ask to close a sell. `orderCloseDelete` with a pending ticket just deletes it.
* **Longer deadline.** Trade calls use a 60 s deadline internally.

---

## See also

* **Validate/size first:** [SymbolParamsMany](../3.%20Symbols_Quotes/SymbolParamsMany.md) · [TickValueWithSize](../3.%20Symbols_Quotes/TickValueWithSize.md).
* **Friendly layer:** [`MT4Service.orderSend/orderModify/orderClose/orderCloseBy`](../../MT4Service/MT4Service.Overview.md); one-liners in [`MT4Sugar`](../../MT4Sugar/MT4Sugar.API_Overview.md).

---

**Back to:** [MT4Account — Master Overview](../MT4Account.Master.Overview.md)
