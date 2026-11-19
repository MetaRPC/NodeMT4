# 💹 Trade Unrealized P/L

> **Request:** the **best and worst unrealized P/L** each open order has reached since a start time (`TradeUnrealizedPLData`) — how far every live position ran into profit and into loss.

**API Information:**

* **Low-level API:** `MT4Account.tradeUnrealizedPl(request)` (from `@metarpc/nodemt4`)
* **gRPC service:** `mt4_term_api.TradeStats`
* **Proto definition:** `TradeUnrealizedPL` (defined in `mt4-term-api-trade-stats.proto`)

### RPC

* **Service:** `mt4_term_api.TradeStats`
* **Method:** `TradeUnrealizedPL(TradeUnrealizedPLRequest) → TradeUnrealizedPLReply`
* **Low-level client (generated):** `TradeStatsClient.tradeUnrealizedPL(request, metadata, opts, cb)` *(note the upper-case `PL`)*

---

## 💬 Just the essentials

* **What it is.** For each currently-open order, the **maximum** and **minimum** floating P/L it reached since `from` — the run-up and the drawdown of the live trade.
* **Why you need it.** Trade-management analytics: how much profit was given back, how deep each position dipped (MAE/MFE).
* **Sanity check.** The list has one entry per open order; it is empty when nothing is open.

---

## 🎯 Purpose

Use it to study maximum adverse / favorable excursion of open orders. **Read-only.**

> **Prefer plain values?** [`MT4Service.getTradeUnrealizedPl(from)`](../../MT4Service/MT4Service.Overview.md) returns a plain array (each entry already a JS object).

---

## 🧱 Signature

```ts
import { MT4Account, TradeStatsPb, toTimestamp } from '@metarpc/nodemt4';

class MT4Account {
  // Best/worst unrealized P/L per open order. Returns the raw TradeUnrealizedPLData; throws MrpcError on failure.
  tradeUnrealizedPl(req: any /* TradeUnrealizedPLRequest */): Promise<any /* TradeUnrealizedPLData */>;
}
```

**Request message:**

```protobuf
TradeUnrealizedPLRequest {
  string from     = 1;  // since when to track extrema, server time
  string from_utc = 2;  // since when, UTC (prefer this)
}
```

**Reply message:** `TradeUnrealizedPLReply { oneof response { TradeUnrealizedPLData data = 1; Error error = 2; } }`.

---

## 🔽 Input

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `req` | `TradeUnrealizedPLRequest` | `setFromUtc(isoUtcString)` — the instant from which extrema are measured (UTC). |

---

## ⬆️ Output — `TradeUnrealizedPLData`

`getExtremaList()` → `TradeUnrealizedExtremaData[]`. Each entry:

| JS accessor | Type | Description |
| ----------- | ---- | ----------- |
| `getTicket()` | `number` | The open order's ticket. |
| `getSymbol()` | `string` | The order's symbol. |
| `getMaxUnrealizedPl()` | `number` | Highest floating P/L reached (run-up / MFE). |
| `getMinUnrealizedPl()` | `number` | Lowest floating P/L reached (drawdown / MAE). |
| `getMaxUnrealizedTime()` / `...TimeUtc()` | `Timestamp` | When the max was reached (server / UTC). |
| `getMinUnrealizedTime()` / `...TimeUtc()` | `Timestamp` | When the min was reached (server / UTC). |

---

## 🧩 Notes & Tips

* **Open orders only** — closed orders are in [`ordersHistory`](../2.%20Orders_History/OrdersHistory.md); their stats are in [`tradeStats`](./TradeStats.md).
* **Method name casing:** the generated client method is `tradeUnrealizedPL` (upper-case `PL`); the SDK wrapper is `tradeUnrealizedPl`.
* **Errors are exceptions:** rejects with `MrpcError` / the gRPC error.

---

## 🔗 Usage Examples

### 1) Run-up and drawdown per open order

```ts
import { MT4Account, TradeStatsPb, toTimestamp } from '@metarpc/nodemt4';

const req = new TradeStatsPb.TradeUnrealizedPLRequest();
req.setFromUtc(new Date(Date.now() - 24 * 3600 * 1000).toISOString());   // last 24h
const d = await account.tradeUnrealizedPl(req);

for (const e of d.getExtremaList()) {
  console.log(`#${e.getTicket()} ${e.getSymbol()}  best +${e.getMaxUnrealizedPl().toFixed(2)}  worst ${e.getMinUnrealizedPl().toFixed(2)}`);
}
```

### 2) Flag positions that gave back a lot of profit

```ts
for (const e of d.getExtremaList()) {
  const givenBack = e.getMaxUnrealizedPl();
  if (givenBack > 50) console.log(`⚠️ #${e.getTicket()} ran +${givenBack.toFixed(2)} — consider a trailing stop`);
}
```

---

## 📚 See Also

* [TradeStats](./TradeStats.md) — aggregated stats of **closed** trades.
* [OpenedOrders](../2.%20Orders_History/OpenedOrders.md) — the current open orders themselves.
* **Friendly layer:** [`MT4Service.getTradeUnrealizedPl(from)`](../../MT4Service/MT4Service.Overview.md).
