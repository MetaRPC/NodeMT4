# MT4Account · Orders & History — Overview

> The account's **open** orders (market + pending), their **ticket numbers**, and the **closed-order history** over a window. On MT4 everything is an **order with a ticket** — there are no positions and no netting.

These methods are **read-only** and live on `mt4_term_api.AccountHelper`. Each resolves with the raw `*Data` (read fields with `getXxx()`), or rejects with `MrpcError`.

## 📁 What lives here

* **[OpenedOrders](./OpenedOrders.md)** — every **open** market order and pending order, with full details (symbol, type, lots, price, SL/TP, profit, swap, …).
* **[OpenedOrdersTickets](./OpenedOrdersTickets.md)** — just the **ticket numbers** of the open/pending orders (lighter than the full list).
* **[OrdersHistory](./OrdersHistory.md)** — **closed** orders in a time window, paginated and sortable.

---

## 🧭 Plain English

* **OpenedOrders** → the full picture of what's live right now.
* **OpenedOrdersTickets** → a cheap "what's open?" when you only need the tickets.
* **OrdersHistory** → what already closed, over a date range.

> MT4 order types (shared with `OrderSendOperationType`): `0` BUY · `1` SELL · `2` BUY_LIMIT · `3` SELL_LIMIT · `4` BUY_STOP · `5` SELL_STOP. The friendly layers call types `0/1` **positions** and `2–5` **pending orders**.

---

## Quick choose

| If you need…                                | Use                    | Returns                |
| ------------------------------------------- | ---------------------- | ---------------------- |
| Full detail of every open/pending order     | `openedOrders`         | `OpenedOrdersData`     |
| Only the open/pending ticket numbers        | `openedOrdersTickets`  | `OpenedOrdersTicketsData` |
| Closed orders over a date range (paginated) | `ordersHistory`        | `OrdersHistoryData`    |

---

## ❌ Cross-refs & gotchas

* **No positions on MT4.** `openedOrders` returns **orders**; the friendly `MT4Service.positions()` simply filters it to types `0/1`.
* **History windows are server time.** `ordersHistory` takes `from`/`to` in **broker server time** — build them with `MT4Account.serverDate(utc, shiftMin)`; the friendly `MT4Service.ordersHistory(from, to)` takes plain dates.
* **Pagination.** `ordersHistory` supports `setPageNumber` / `setItemsPerPage`; `getTotalCount()` is the full match count, `getNextPageToken()` the cursor.
* **Open-order analytics** (run-up / drawdown per order) live in [TradeUnrealizedPL](../1.%20Account_Information/TradeUnrealizedPL.md).

---

## 🟢 Minimal snippets

```ts
// Every open + pending order
const data = await account.openedOrders();
for (const o of data.getOrderInfosList()) {
  console.log(`#${o.getTicket()} ${o.getSymbol()} type ${o.getOrderType()} lots ${o.getLots()} P/L ${o.getProfit().toFixed(2)}`);
}
```

```ts
// Just the ticket numbers
const t = await account.openedOrdersTickets();
console.log('open tickets:', t.getTicketsList());
```

```ts
// Closed orders of the last 7 days, newest first
import { AccountHelperPb, toTimestamp } from '@metarpc/nodemt4';

const req = new AccountHelperPb.OrdersHistoryRequest();
req.setInputSortMode(AccountHelperPb.EnumOrderHistorySortType.HISTORY_SORT_BY_CLOSE_TIME_DESC); // 3
req.setInputFrom(toTimestamp(new Date(Date.now() - 7 * 864e5)));
req.setInputTo(toTimestamp(new Date()));
const hist = await account.ordersHistory(req);
console.log(`${hist.getTotalCount()} closed orders`);
```

---

## 🧱 Enums used in Orders & History

| Enum | Used by | Values |
|------|---------|--------|
| `EnumOpenedOrderSortType` | `openedOrders` (optional `setSortType`) | `SORT_BY_OPEN_TIME_ASC/DESC` (0/1) · `SORT_BY_ORDER_TICKET_ID_ASC/DESC` (2/3) |
| `EnumOrderHistorySortType` | `ordersHistory` (`setInputSortMode`) | `HISTORY_SORT_BY_OPEN_TIME_ASC/DESC` (0/1) · `..._CLOSE_TIME_ASC/DESC` (2/3) · `..._ORDER_TICKET_ID_ASC/DESC` (4/5) |

---

## See also

* **Account snapshot & stats:** [Account Information — Overview](../1.%20Account_Information/Account_Information.Overview.md).
* **Friendly layer:** [`MT4Service.openedOrders()` / `positions()` / `ordersHistory()`](../../MT4Service/MT4Service.Overview.md) → typed `OrderInfo[]`.

---

**Back to:** [MT4Account — Master Overview](../MT4Account.Master.Overview.md)
