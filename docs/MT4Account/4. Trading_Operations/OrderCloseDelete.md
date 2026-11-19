# ❌ Order Close / Delete

> **Request:** close a **market** order (fully or partially) or **delete** a **pending** order (`OrderCloseDeleteData`) — one call for both, `getMode()` tells which happened.

**API Information:**

* **Low-level API:** `MT4Account.orderCloseDelete(request)` (from `@metarpc/nodemt4`)
* **gRPC service:** `mt4_term_api.TradingHelper`
* **Proto definition:** `OrderCloseDelete` (defined in `mt4-term-api-trading-helper.proto`)

### RPC

* **Service:** `mt4_term_api.TradingHelper`
* **Method:** `OrderCloseDelete(OrderCloseDeleteRequest) → OrderCloseDeleteReply`
* **Low-level client (generated):** `TradingHelperClient.orderCloseDelete(request, metadata, opts, cb)`

---

## 💬 Just the essentials

* **What it is.** Closes an open market order (pass a smaller `lots` for a partial close) or deletes a pending order.
* **Why you need it.** Exit a trade, scale out, cancel a pending.
* **Sanity check.** `getMode()` → `0` market order closed · `1` pending order deleted.

---

## 🧱 Signature

```ts
import { MT4Account, TradingHelperPb, MarketInfoPb } from '@metarpc/nodemt4';

class MT4Account {
  // Close a market order / delete a pending one. Returns OrderCloseDeleteData; rejects with MrpcError / TradeOutcomeUnknownError.
  orderCloseDelete(req: any /* OrderCloseDeleteRequest */): Promise<any /* OrderCloseDeleteData */>;
}
```

**Request message:**

```protobuf
OrderCloseDeleteRequest {
  int32  order_ticket  = 1;
  double lots          = 2;   // volume to close (full or partial); ignored for a pending delete
  double closing_price = 3;   // bid to close a buy, ask to close a sell; 0 for a pending delete
  int32  slippage      = 4;   // points
}
```

**Reply:** `OrderCloseDeleteReply { oneof { OrderCloseDeleteData data; Error error; } }`.

---

## 🔽 Input

| Setter | Type | Description |
| ------ | ---- | ----------- |
| `setOrderTicket(t)` | `number` | The order to close / delete. |
| `setLots(v)` | `number` | Volume to close (use the order's full lots to close all; a smaller value = partial). |
| `setClosingPrice(p)` | `number` | Market close: **bid** to close a buy, **ask** to close a sell. Pending delete: `0`. |
| `setSlippage(n)` | `number` | Max slippage in points (optional). |

---

## ⬆️ Output — `OrderCloseDeleteData`

| JS accessor | Type | Description |
| ----------- | ---- | ----------- |
| `getMode()` | `number` *(enum)* | `OrderCloseDeleteMode` — `OCD_MARKET_ORDER` (`0`) market order closed · `OCD_PENDING_ORDER` (`1`) pending order deleted. |
| `getHistoryOrderComment()` | `string` | The resulting history order's comment. |

> `getMode()` is an **enum result** on `TradingHelperPb.OrderCloseDeleteMode`:
>
> ```proto
> enum OrderCloseDeleteMode {
>   OCD_MARKET_ORDER  = 0;  // a market order was closed
>   OCD_PENDING_ORDER = 1;  // a pending order was deleted
> }
> ```

---

## 🧩 Notes & Tips

* **Look up price & volume** from [OpenedOrders](../2.%20Orders_History/OpenedOrders.md) (and [Quote](../3.%20Symbols_Quotes/Quote.md)) when you don't have them — the friendly `MT4Service.orderClose({ ticket })` does this for you.
* **Partial close** leaves a remaining order with a new ticket.
* **Unknown outcome →** `TradeOutcomeUnknownError`; `err.operation === 'OrderCloseDelete'` — reconcile before retrying.

---

## 🔗 Usage Examples

### 1) Close a whole buy at the bid

```ts
import { MT4Account, TradingHelperPb, MarketInfoPb } from '@metarpc/nodemt4';

// find the order
const o = (await account.openedOrders()).getOrderInfosList().find((x: any) => x.getTicket() === 123456);
const q = new MarketInfoPb.QuoteRequest(); q.setSymbol(o.getSymbol());
const bid = (await account.quote(q)).getBid();

const req = new TradingHelperPb.OrderCloseDeleteRequest();
req.setOrderTicket(123456);
req.setLots(o.getLots());
req.setClosingPrice(bid);     // bid closes a buy
req.setSlippage(30);
const res = await account.orderCloseDelete(req);
console.log(res.getMode() === 0 ? 'closed' : 'deleted');
```

### 2) Partial close (half)

```ts
const req = new TradingHelperPb.OrderCloseDeleteRequest();
req.setOrderTicket(123456);
req.setLots(o.getLots() / 2);
req.setClosingPrice(bid);
await account.orderCloseDelete(req);
```

### 3) Delete a pending order

```ts
const req = new TradingHelperPb.OrderCloseDeleteRequest();
req.setOrderTicket(123456);
req.setLots(0);
req.setClosingPrice(0);       // pending delete
await account.orderCloseDelete(req);
```

---

## 📚 See Also

* [OrderCloseBy](./OrderCloseBy.md) — close by an opposite order.
* [OpenedOrders](../2.%20Orders_History/OpenedOrders.md) — find the ticket, lots and symbol.
* **Friendly layer:** [`MT4Service.orderClose(CloseRequest)`](../../MT4Service/MT4Service.Overview.md); `MT4Sugar.closePosition/closePositionPartial`.
