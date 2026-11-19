# 🚀 Order Send

> **Request:** open a **market or pending** order (`OrderSendData`). Sent exactly once; a broker refusal throws `MrpcError`, an unknown transport outcome throws `TradeOutcomeUnknownError`.

**API Information:**

* **Low-level API:** `MT4Account.orderSend(request)` (from `@metarpc/nodemt4`)
* **gRPC service:** `mt4_term_api.TradingHelper`
* **Proto definition:** `OrderSend` (defined in `mt4-term-api-trading-helper.proto`)

### RPC

* **Service:** `mt4_term_api.TradingHelper`
* **Method:** `OrderSend(OrderSendRequest) → OrderSendReply`
* **Low-level client (generated):** `TradingHelperClient.orderSend(request, metadata, opts, cb)`

---

## 💬 Just the essentials

* **What it is.** Opens a market order (OP_BUY/OP_SELL) or places a pending order (LIMIT/STOP).
* **Why you need it.** It's how trades enter the market.
* **Sanity check.** Success returns a non-zero `getTicket()`.

---

## 🧱 Signature

```ts
import { MT4Account, TradingHelperPb, MarketInfoPb } from '@metarpc/nodemt4';

class MT4Account {
  // Open a market/pending order. Returns OrderSendData; rejects with MrpcError / TradeOutcomeUnknownError.
  orderSend(req: any /* OrderSendRequest */): Promise<any /* OrderSendData */>;
}
```

**Request message:**

```protobuf
OrderSendRequest {
  string symbol         = 1;
  OrderSendOperationType operation_type = 2;  // 0 BUY · 1 SELL · 2 BUYLIMIT · 3 SELLLIMIT · 4 BUYSTOP · 5 SELLSTOP
  double volume         = 3;   // lots
  double price          = 4;   // required — ask for buys, bid for sells (market)
  double stoploss       = 5;
  double takeprofit     = 6;
  int32  slippage       = 7;   // points
  string comment        = 8;
  int32  magic_number   = 9;
  google.protobuf.Timestamp expiration = 10;  // pending orders
}
```

**Reply:** `OrderSendReply { oneof { OrderSendData data; Error error; } }`.

---

## 🔽 Input

| Setter | Type | Description |
| ------ | ---- | ----------- |
| `setSymbol(s)` | `string` | Symbol. |
| `setOperationType(t)` | `OrderSendOperationType` | Order type (0–5) — see [Enum field](#enum-field-setoperationtype-ordersendoperationtype) below. |
| `setVolume(v)` | `number` | Lots. |
| `setPrice(p)` | `number` | **Required.** Market: ask for buys, bid for sells. Pending: the trigger price. |
| `setStoploss(p)` / `setTakeprofit(p)` | `number` | SL / TP prices (optional). |
| `setSlippage(n)` | `number` | Max slippage in **points** (optional). |
| `setComment(s)` / `setMagicNumber(n)` | `string` / `number` | Tag the order (optional). |
| `setExpiration(ts)` | `Timestamp` | Pending-order expiry (optional). |

---

## 🔢 Enum field — `setOperationType()` → `OrderSendOperationType`

```proto
enum OrderSendOperationType {
  OC_OP_BUY       = 0;  // market buy
  OC_OP_SELL      = 1;  // market sell
  OC_OP_BUYLIMIT  = 2;  // pending buy limit  (price below market)
  OC_OP_SELLLIMIT = 3;  // pending sell limit (price above market)
  OC_OP_BUYSTOP   = 4;  // pending buy stop   (price above market)
  OC_OP_SELLSTOP  = 5;  // pending sell stop  (price below market)
}
```

> **💡 Enum usage note:** on `TradingHelperPb`. Pass the full constant, e.g. `req.setOperationType(TradingHelperPb.OrderSendOperationType.OC_OP_BUY)`. Same 0–5 numbering as [`OpenedOrderType`](../2.%20Orders_History/OpenedOrders.md#enum-fields) in results. The friendly layers accept the string action (`'BUY'`, `'SELL_LIMIT'`, …) instead.

---

## ⬆️ Output — `OrderSendData`

| JS accessor | Type | Description |
| ----------- | ---- | ----------- |
| `getTicket()` | `number` | The new order's ticket. |
| `getVolume()` | `number` | Filled volume (lots). |
| `getPrice()` | `number` | Execution / placement price. |
| `getOpenTime()` / `getOpenTimeUtc()` | `Timestamp` | Open time (server / UTC). |

---

## 🧩 Notes & Tips

* **Price is mandatory.** Read [Quote](../3.%20Symbols_Quotes/Quote.md) first; the friendly layers fill it for market orders when omitted.
* **Refusals carry `mqlIntCode`** (130/131/132/134/138…). `err.operation === 'OrderSend'`.
* **Unknown outcome →** `TradeOutcomeUnknownError`: reconcile with [openedOrders](../2.%20Orders_History/OpenedOrders.md) before any retry. Never blindly resend.
* **60 s deadline** internally.

---

## 🔗 Usage Examples

### 1) Market BUY at the current ask

```ts
import { MT4Account, TradingHelperPb, MarketInfoPb } from '@metarpc/nodemt4';

const q = new MarketInfoPb.QuoteRequest(); q.setSymbol('EURUSD');
const ask = (await account.quote(q)).getAsk();

const req = new TradingHelperPb.OrderSendRequest();
req.setSymbol('EURUSD');
req.setOperationType(TradingHelperPb.OrderSendOperationType.OC_OP_BUY);
req.setVolume(0.01);
req.setPrice(ask);
req.setSlippage(30);
req.setComment('NodeMT4');
const res = await account.orderSend(req);
console.log('ticket', res.getTicket(), 'at', res.getPrice());
```

### 2) Pending BUY LIMIT with SL/TP

```ts
const req = new TradingHelperPb.OrderSendRequest();
req.setSymbol('EURUSD');
req.setOperationType(TradingHelperPb.OrderSendOperationType.OC_OP_BUYLIMIT);
req.setVolume(0.01);
req.setPrice(1.0500);       // trigger below market
req.setStoploss(1.0450);
req.setTakeprofit(1.0600);
const res = await account.orderSend(req);
```

### 3) Safe error handling

```ts
import { TradeOutcomeUnknownError } from '@metarpc/nodemt4';
try {
  const res = await account.orderSend(req);
  console.log('opened', res.getTicket());
} catch (e) {
  if (e instanceof TradeOutcomeUnknownError) console.log('⚠️ outcome unknown — check openedOrders before retrying');
  else console.log('refused:', e.message, 'mql', e.mqlIntCode);
}
```

---

## 📚 See Also

* [OrderModify](./OrderModify.md) · [OrderCloseDelete](./OrderCloseDelete.md) · [OrderCloseBy](./OrderCloseBy.md).
* **Friendly layer:** [`MT4Service.orderSend(OrderRequest)`](../../MT4Service/MT4Service.Overview.md); `MT4Sugar.buyMarket/sellMarket/buyLimit…`.
