# ✏️ Order Modify

> **Request:** change an order's **stop-loss / take-profit** (and, for pending orders, its **price / expiration**) (`OrderModifyData`).

**API Information:**

* **Low-level API:** `MT4Account.orderModify(request)` (from `@metarpc/nodemt4`)
* **gRPC service:** `mt4_term_api.TradingHelper`
* **Proto definition:** `OrderModify` (defined in `mt4-term-api-trading-helper.proto`)

### RPC

* **Service:** `mt4_term_api.TradingHelper`
* **Method:** `OrderModify(OrderModifyRequest) → OrderModifyReply`
* **Low-level client (generated):** `TradingHelperClient.orderModify(request, metadata, opts, cb)`

---

## 💬 Just the essentials

* **What it is.** Updates SL/TP of any order, plus price/expiration of a pending order.
* **Why you need it.** Attach or trail a stop, set a target, re-price a pending order.
* **Sanity check.** `getOrderWasModified()` is `true` when the change applied.

---

## 🧱 Signature

```ts
import { MT4Account, TradingHelperPb } from '@metarpc/nodemt4';

class MT4Account {
  // Change SL/TP (+ price/expiration for pending). Returns OrderModifyData; rejects with MrpcError / TradeOutcomeUnknownError.
  orderModify(req: any /* OrderModifyRequest */): Promise<any /* OrderModifyData */>;
}
```

**Request message:**

```protobuf
OrderModifyRequest {
  int32  order_ticket   = 1;
  double new_stop_loss  = 2;
  double new_take_profit= 3;
  double new_price      = 4;   // pending orders only
  google.protobuf.Timestamp new_expiration = 5;  // pending orders only
}
```

**Reply:** `OrderModifyReply { oneof { OrderModifyData data; Error error; } }`.

---

## 🔽 Input

| Setter | Type | Description |
| ------ | ---- | ----------- |
| `setOrderTicket(t)` | `number` | The order to modify. |
| `setNewStopLoss(p)` | `number` | New SL price (pass the full value you want). |
| `setNewTakeProfit(p)` | `number` | New TP price. |
| `setNewPrice(p)` | `number` | Pending orders: new trigger price. |
| `setNewExpiration(ts)` | `Timestamp` | Pending orders: new expiry. |

> **Pass the full new values.** MT4 modify replaces SL/TP — include the unchanged one too, or it may be cleared.

---

## ⬆️ Output — `OrderModifyData`

| JS accessor | Type | Description |
| ----------- | ---- | ----------- |
| `getOrderWasModified()` | `boolean` | Whether the modification applied. |

---

## 🧩 Notes & Tips

* **Respect the stops level.** SL/TP must be at least `SymbolParams.getTradestopslevel()` points from price, or the broker refuses (`mqlIntCode` 130).
* **Keep the other side.** To change only SL, read the order first and re-send its current TP (the friendly `MT4Sugar.modifyPositionSL/TP` do this).
* **Unknown outcome →** `TradeOutcomeUnknownError`; `err.operation === 'OrderModify'`.

---

## 🔗 Usage Examples

### 1) Attach a stop-loss

```ts
import { TradingHelperPb } from '@metarpc/nodemt4';

const req = new TradingHelperPb.OrderModifyRequest();
req.setOrderTicket(123456);
req.setNewStopLoss(1.0950);
const res = await account.orderModify(req);
console.log('modified:', res.getOrderWasModified());
```

### 2) Set both SL and TP

```ts
const req = new TradingHelperPb.OrderModifyRequest();
req.setOrderTicket(123456);
req.setNewStopLoss(1.0950);
req.setNewTakeProfit(1.1100);
await account.orderModify(req);
```

### 3) Re-price a pending order

```ts
const req = new TradingHelperPb.OrderModifyRequest();
req.setOrderTicket(123456);
req.setNewPrice(1.0480);
await account.orderModify(req);
```

---

## 📚 See Also

* [OrderSend](./OrderSend.md) — open the order. · [OrderCloseDelete](./OrderCloseDelete.md) — close it.
* [SymbolParamsMany](../3.%20Symbols_Quotes/SymbolParamsMany.md) — the min stops level.
* **Friendly layer:** [`MT4Service.orderModify(ModifyRequest)`](../../MT4Service/MT4Service.Overview.md); `MT4Sugar.modifyPositionSL/TP/SLTP`.
