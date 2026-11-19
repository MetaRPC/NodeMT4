# 📋 Opened Orders

> **Request:** every **open** market order and pending order on the account (`OpenedOrdersData`), with full detail per order.

**API Information:**

* **Low-level API:** `MT4Account.openedOrders(request?)` (from `@metarpc/nodemt4`)
* **gRPC service:** `mt4_term_api.AccountHelper`
* **Proto definition:** `OpenedOrders` (defined in `mt4-term-api-account-helper.proto`)

### RPC

* **Service:** `mt4_term_api.AccountHelper`
* **Method:** `OpenedOrders(OpenedOrdersRequest) → OpenedOrdersReply`
* **Low-level client (generated):** `AccountHelperClient.openedOrders(request, metadata, opts, cb)`

---

## 💬 Just the essentials

* **What it is.** The live book: all open market orders (types BUY/SELL) and pending orders (LIMIT/STOP).
* **Why you need it.** Show open trades, sum floating P/L, find an order by symbol or magic, decide what to close.
* **Sanity check.** `getOrderInfosList().length` is how many are open; `0` means flat.

---

## 🎯 Purpose

The one call for "what do I have open right now?". **Read-only.**

> **Prefer plain values?** [`MT4Service.openedOrders()`](../../MT4Service/MT4Service.Overview.md) returns typed `OrderInfo[]`; `positions()` / `pendingOrders()` pre-filter by type.

---

## 🧱 Signature

```ts
import { MT4Account, AccountHelperPb } from '@metarpc/nodemt4';

class MT4Account {
  // All open + pending orders. Returns the raw OpenedOrdersData; throws MrpcError on failure.
  openedOrders(req?: any /* OpenedOrdersRequest */): Promise<any /* OpenedOrdersData */>;
}
```

**Request message:**

```protobuf
OpenedOrdersRequest {
  EnumOpenedOrderSortType sort_type = 1;  // optional ordering (default open-time asc)
}
```

**Reply message:** `OpenedOrdersReply { oneof response { OpenedOrdersData data = 1; Error error = 2; } }`.

---

## 🔽 Input

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `req` | `OpenedOrdersRequest` *(optional)* | Omit for the default. Set ordering with `setSortType(EnumOpenedOrderSortType)`. |

---

## ⬆️ Output — `OpenedOrdersData`

`getOrderInfosList()` → `OpenedOrderInfo[]`. Each order:

| JS accessor | Type | Description |
| ----------- | ---- | ----------- |
| `getTicket()` | `number` | Order ticket (unique id). |
| `getSymbol()` | `string` | Symbol. |
| `getOrderType()` | `number` *(enum)* | `OpenedOrderType` — `0` BUY · `1` SELL · `2` BUY_LIMIT · `3` SELL_LIMIT · `4` BUY_STOP · `5` SELL_STOP · `6` BALANCE · `7` CREDIT. See [Enum fields](#enum-fields) below. |
| `getLots()` | `number` | Volume in lots. |
| `getOpenPrice()` | `number` | Entry price. |
| `getOpenTime()` / `getOpenTimeUtc()` | `Timestamp` | Open time (server / UTC). |
| `getStopLoss()` / `getTakeProfit()` | `number` | SL / TP prices (`0` = none). |
| `getProfit()` | `number` | Current floating P/L. |
| `getSwap()` | `number` | Accrued swap. |
| `getCommision()` | `number` | Commission *(sic — proto spelling)*. |
| `getComment()` | `string` | Order comment. |
| `getMagicNumber()` | `number` | EA magic number. |
| `getExpirationTime()` / `getExpirationTimeUtc()` | `Timestamp` | Pending-order expiry (server / UTC). |
| `getAccountLogin()` | `number` | Owning account login. |

---

## 🔢 Enum fields

### Input — `setSortType()` → `EnumOpenedOrderSortType`

```proto
enum EnumOpenedOrderSortType {
  SORT_BY_OPEN_TIME_ASC        = 0;  // oldest open first
  SORT_BY_OPEN_TIME_DESC       = 1;  // newest open first (default)
  SORT_BY_ORDER_TICKET_ID_ASC  = 2;  // lowest ticket first
  SORT_BY_ORDER_TICKET_ID_DESC = 3;  // highest ticket first
}
```

### Result — `getOrderType()` → `OpenedOrderType`

```proto
enum OpenedOrderType {
  OO_OP_BUY       = 0;  // market buy
  OO_OP_SELL      = 1;  // market sell
  OO_OP_BUYLIMIT  = 2;  // pending buy limit
  OO_OP_SELLLIMIT = 3;  // pending sell limit
  OO_OP_BUYSTOP   = 4;  // pending buy stop
  OO_OP_SELLSTOP  = 5;  // pending sell stop
  OO_OP_BALANCE   = 6;  // balance operation (deposit/withdrawal)
  OO_OP_CREDIT    = 7;  // credit operation
}
```

> **💡 Enum usage note:** enums are namespace objects on `AccountHelperPb`. Compare against the full constant, e.g. `o.getOrderType() === AccountHelperPb.OpenedOrderType.OO_OP_BUY`. Types `6`/`7` are non-trade ledger entries — filter them out when you only want real orders.

---

## 🧩 Notes & Tips

* **Orders, not positions.** Types `0/1` are market orders ("positions" in the friendly layers), `2–5` are pending.
* **Filter yourself** by `getOrderType()` / `getSymbol()` / `getMagicNumber()`, or let `MT4Service.positions(magic?)` do it.
* **Errors are exceptions:** rejects with `MrpcError` / the gRPC error.

---

## 🔗 Usage Examples

### 1) List everything open

```ts
import { MT4Account } from '@metarpc/nodemt4';

const account = new MT4Account('mt4.mrpc.pro', 443);
await account.connect({ user: 500000, password: 'password', server: 'TeleTrade-Demo' });

const data = await account.openedOrders();
for (const o of data.getOrderInfosList()) {
  console.log(`#${o.getTicket()} ${o.getSymbol()} type ${o.getOrderType()} lots ${o.getLots()} @ ${o.getOpenPrice()}  P/L ${o.getProfit().toFixed(2)}`);
}
```

### 2) Sum floating P/L of market orders

```ts
const data = await account.openedOrders();
const floating = data.getOrderInfosList()
  .filter((o: any) => o.getOrderType() === 0 || o.getOrderType() === 1)
  .reduce((s: number, o: any) => s + o.getProfit(), 0);
console.log('floating P/L:', floating.toFixed(2));
```

### 3) Newest first by ticket

```ts
import { AccountHelperPb } from '@metarpc/nodemt4';

const req = new AccountHelperPb.OpenedOrdersRequest();
req.setSortType(AccountHelperPb.EnumOpenedOrderSortType.SORT_BY_ORDER_TICKET_ID_DESC); // 3
const data = await account.openedOrders(req);
```

---

## 📚 See Also

* [OpenedOrdersTickets](./OpenedOrdersTickets.md) — just the ticket numbers (lighter).
* [OrdersHistory](./OrdersHistory.md) — closed orders.
* [OrderCloseDelete](../4.%20Trading_Operations/OrderCloseDelete.md) — close a market order / delete a pending one.
* **Friendly layer:** [`MT4Service.openedOrders()`](../../MT4Service/MT4Service.Overview.md) → `OrderInfo[]`.
