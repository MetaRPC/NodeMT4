# 🗂️ Orders History

> **Request:** **closed** orders in a time window (`OrdersHistoryData`) — sortable and paginated. The record of what already traded.

**API Information:**

* **Low-level API:** `MT4Account.ordersHistory(request)` (from `@metarpc/nodemt4`)
* **gRPC service:** `mt4_term_api.AccountHelper`
* **Proto definition:** `OrdersHistory` (defined in `mt4-term-api-account-helper.proto`)

### RPC

* **Service:** `mt4_term_api.AccountHelper`
* **Method:** `OrdersHistory(OrdersHistoryRequest) → OrdersHistoryReply`
* **Low-level client (generated):** `AccountHelperClient.ordersHistory(request, metadata, opts, cb)`

---

## 💬 Just the essentials

* **What it is.** Closed orders between two times, with sort order and paging.
* **Why you need it.** P/L reports, trade journals, reconciling fills. Closed orders carry a **close time** and **close price** that open orders don't.
* **Sanity check.** `getTotalCount()` is the full match count; `getOrdersInfoList()` is the current page.

---

## 🎯 Purpose

The call for "what closed in this period?". **Read-only.**

> **Prefer plain values?** [`MT4Service.ordersHistory(from, to, opts?)`](../../MT4Service/MT4Service.Overview.md) takes plain dates and returns `{ totalCount, orders: OrderInfo[] }`.

---

## 🧱 Signature

```ts
import { MT4Account, AccountHelperPb, toTimestamp } from '@metarpc/nodemt4';

class MT4Account {
  // Closed orders over a window. Returns the raw OrdersHistoryData; throws MrpcError on failure.
  ordersHistory(req: any /* OrdersHistoryRequest */): Promise<any /* OrdersHistoryData */>;
}
```

**Request message:**

```protobuf
OrdersHistoryRequest {
  EnumOrderHistorySortType input_sort_mode = 1;  // ordering (default close-time desc)
  google.protobuf.Timestamp input_from     = 2;  // window start, broker server time
  google.protobuf.Timestamp input_to       = 3;  // window end,   broker server time
  int32 page_number    = 4;                       // optional paging
  int32 items_per_page = 5;
}
```

**Reply message:** `OrdersHistoryReply { oneof response { OrdersHistoryData data = 1; Error error = 2; } }`.

---

## 🔽 Input

| Setter | Type | Description |
| ------ | ---- | ----------- |
| `setInputSortMode(e)` | `EnumOrderHistorySortType` | Ordering (default `HISTORY_SORT_BY_CLOSE_TIME_DESC` = 3). |
| `setInputFrom(ts)` / `setInputTo(ts)` | `Timestamp` | Window bounds, **broker server time** — build with `MT4Account.serverDate(utc, shiftMin)`. |
| `setPageNumber(n)` / `setItemsPerPage(n)` | `number` | Optional pagination. |

---

## ⬆️ Output — `OrdersHistoryData`

| JS accessor | Type | Description |
| ----------- | ---- | ----------- |
| `getTotalCount()` | `number` | Total matching orders (across all pages). |
| `getOrdersInfoList()` | `HistoryOrderInfo[]` | The current page of closed orders. |
| `getNextPageToken()` | `string` | Cursor for the next page (when paginating). |

Each `HistoryOrderInfo` has the same fields as [`OpenedOrderInfo`](./OpenedOrders.md) **plus**:

| JS accessor | Type | Description |
| ----------- | ---- | ----------- |
| `getCloseTime()` / `getCloseTimeUtc()` | `Timestamp` | When the order closed (server / UTC). |
| `getClosePrice()` | `number` | Closing price. |

> Each row's `getOrderType()` is `AccountHelperPb.OpenedOrderType` (`0` BUY … `5` SELL_STOP, `6` BALANCE, `7` CREDIT) — the [full table is on OpenedOrders](./OpenedOrders.md#enum-fields).

---

## 🔢 Enum field — `setInputSortMode()` → `EnumOrderHistorySortType`

```proto
enum EnumOrderHistorySortType {
  HISTORY_SORT_BY_OPEN_TIME_ASC        = 0;  // oldest open first
  HISTORY_SORT_BY_OPEN_TIME_DESC       = 1;  // newest open first
  HISTORY_SORT_BY_CLOSE_TIME_ASC       = 2;  // oldest close first
  HISTORY_SORT_BY_CLOSE_TIME_DESC      = 3;  // newest close first (default)
  HISTORY_SORT_BY_ORDER_TICKET_ID_ASC  = 4;  // lowest ticket first
  HISTORY_SORT_BY_ORDER_TICKET_ID_DESC = 5;  // highest ticket first
}
```

> Compare/assign against the full constant, e.g. `req.setInputSortMode(AccountHelperPb.EnumOrderHistorySortType.HISTORY_SORT_BY_CLOSE_TIME_DESC)`.

---

## 🧩 Notes & Tips

* **Server-time window.** `from`/`to` are broker time. From UTC: `const srv = MT4Account.serverDate(utcDate, shiftMin)` where `shiftMin = accountSummary().getUtcServerTimeShiftMinutes()`. The friendly `MT4Service.ordersHistory(from, to)` takes plain dates.
* **Default sort** is newest-closed first (`3`).
* **Paginate** large windows with `setItemsPerPage` + `setPageNumber`; `getTotalCount()` sizes the result.
* **Errors are exceptions:** rejects with `MrpcError` / the gRPC error (this call uses a longer deadline internally).

---

## 🔗 Usage Examples

### 1) Last 7 days, newest first

```ts
import { MT4Account, AccountHelperPb, toTimestamp } from '@metarpc/nodemt4';

const req = new AccountHelperPb.OrdersHistoryRequest();
req.setInputSortMode(AccountHelperPb.EnumOrderHistorySortType.HISTORY_SORT_BY_CLOSE_TIME_DESC);
req.setInputFrom(toTimestamp(new Date(Date.now() - 7 * 864e5)));
req.setInputTo(toTimestamp(new Date()));

const h = await account.ordersHistory(req);
console.log(`${h.getTotalCount()} closed orders`);
for (const o of h.getOrdersInfoList()) {
  console.log(`#${o.getTicket()} ${o.getSymbol()} P/L ${o.getProfit().toFixed(2)} closed @ ${o.getClosePrice()}`);
}
```

### 2) Net profit of the window

```ts
const net = h.getOrdersInfoList().reduce((s: number, o: any) => s + o.getProfit() + o.getSwap() + o.getCommision(), 0);
console.log('net P/L:', net.toFixed(2));
```

### 3) Page through a large history

```ts
const req = new AccountHelperPb.OrdersHistoryRequest();
req.setInputFrom(toTimestamp(new Date(Date.now() - 365 * 864e5)));
req.setInputTo(toTimestamp(new Date()));
req.setItemsPerPage(100);
req.setPageNumber(0);
const first = await account.ordersHistory(req);
console.log(`page 0 of ~${Math.ceil(first.getTotalCount() / 100)}  (${first.getOrdersInfoList().length} rows)`);
```

---

## 📚 See Also

* [OpenedOrders](./OpenedOrders.md) — currently open orders.
* [TradeStats](../1.%20Account_Information/TradeStats.md) — aggregated statistics over the same kind of window.
* **Friendly layer:** [`MT4Service.ordersHistory(from, to)`](../../MT4Service/MT4Service.Overview.md) → `{ totalCount, orders }`.
