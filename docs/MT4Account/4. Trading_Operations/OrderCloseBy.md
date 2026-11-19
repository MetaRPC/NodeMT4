# 🔁 Order Close By

> **Request:** close an order by an **opposite** order on the **same symbol** (`OrderCloseByData`) — net a buy against a sell in one operation.

**API Information:**

* **Low-level API:** `MT4Account.orderCloseBy(request)` (from `@metarpc/nodemt4`)
* **gRPC service:** `mt4_term_api.TradingHelper`
* **Proto definition:** `OrderCloseBy` (defined in `mt4-term-api-trading-helper.proto`)

### RPC

* **Service:** `mt4_term_api.TradingHelper`
* **Method:** `OrderCloseBy(OrderCloseByRequest) → OrderCloseByReply`
* **Low-level client (generated):** `TradingHelperClient.orderCloseBy(request, metadata, opts, cb)`

---

## 💬 Just the essentials

* **What it is.** Closes one order using an opposite one on the same symbol (a buy closed by a sell, or vice-versa).
* **Why you need it.** Net hedged positions with no extra spread cost, instead of closing both separately.
* **Sanity check.** Returns the resulting `getClosePrice()` and `getProfit()`.

---

## 🧱 Signature

```ts
import { MT4Account, TradingHelperPb } from '@metarpc/nodemt4';

class MT4Account {
  // Close an order by an opposite one on the same symbol. Returns OrderCloseByData; rejects with MrpcError / TradeOutcomeUnknownError.
  orderCloseBy(req: any /* OrderCloseByRequest */): Promise<any /* OrderCloseByData */>;
}
```

**Request message:**

```protobuf
OrderCloseByRequest {
  int32 ticket_to_close           = 1;  // the order being closed
  int32 opposite_ticket_closing_by = 2;  // the opposite order used to close it
}
```

**Reply:** `OrderCloseByReply { oneof { OrderCloseByData data; Error error; } }`.

---

## 🔽 Input

| Setter | Type | Description |
| ------ | ---- | ----------- |
| `setTicketToClose(t)` | `number` | The order to close. |
| `setOppositeTicketClosingBy(t)` | `number` | An **opposite-direction** order on the **same symbol** used to close it. |

---

## ⬆️ Output — `OrderCloseByData`

| JS accessor | Type | Description |
| ----------- | ---- | ----------- |
| `getClosePrice()` | `number` | Price at which the close-by settled. |
| `getProfit()` | `number` | Realized profit of the operation. |
| `getCloseTime()` / `getCloseTimeUtc()` | `Timestamp` | When it settled (server / UTC). |

---

## 🧩 Notes & Tips

* **Same symbol, opposite direction** — both tickets must be on one symbol, one buy and one sell.
* **Volumes may differ** — the smaller is fully closed; the larger leaves a remainder with a new ticket.
* **Unknown outcome →** `TradeOutcomeUnknownError`; `err.operation === 'OrderCloseBy'`.

---

## 🔗 Usage Examples

### 1) Net a buy against a sell

```ts
import { TradingHelperPb } from '@metarpc/nodemt4';

const req = new TradingHelperPb.OrderCloseByRequest();
req.setTicketToClose(123456);            // the buy
req.setOppositeTicketClosingBy(123457);  // the sell on the same symbol
const res = await account.orderCloseBy(req);
console.log(`closed by @ ${res.getClosePrice()}  profit ${res.getProfit().toFixed(2)}`);
```

### 2) Guard with a symbol check first

```ts
const orders = (await account.openedOrders()).getOrderInfosList();
const a = orders.find((o: any) => o.getTicket() === 123456);
const b = orders.find((o: any) => o.getTicket() === 123457);
if (a && b && a.getSymbol() === b.getSymbol() && a.getOrderType() !== b.getOrderType()) {
  const req = new TradingHelperPb.OrderCloseByRequest();
  req.setTicketToClose(a.getTicket());
  req.setOppositeTicketClosingBy(b.getTicket());
  await account.orderCloseBy(req);
}
```

---

## 📚 See Also

* [OrderCloseDelete](./OrderCloseDelete.md) — close/delete a single order.
* [OpenedOrders](../2.%20Orders_History/OpenedOrders.md) — find the two tickets.
* **Friendly layer:** [`MT4Service.orderCloseBy(ticket, opposite)`](../../MT4Service/MT4Service.Overview.md).
