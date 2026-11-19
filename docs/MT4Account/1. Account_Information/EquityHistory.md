# 📉 Equity History

> **Request:** the account's **equity-curve points** (`EquityHistoryData`) over a window — balance, equity, realized/unrealized P/L and drawdowns per point. Perfect for an equity chart.

**API Information:**

* **Low-level API:** `MT4Account.equityHistory(request)` (from `@metarpc/nodemt4`)
* **gRPC service:** `mt4_term_api.TradeStats`
* **Proto definition:** `EquityHistory` (defined in `mt4-term-api-trade-stats.proto`)

### RPC

* **Service:** `mt4_term_api.TradeStats`
* **Method:** `EquityHistory(EquityHistoryRequest) → EquityHistoryReply`
* **Low-level client (generated):** `TradeStatsClient.equityHistory(request, metadata, opts, cb)`

---

## 💬 Just the essentials

* **What it is.** Just the **equity curve** — a list of points, each with balance / equity / drawdown.
* **Why you need it.** Draw an equity chart, or compute your own drawdown / return metrics.
* **Sanity check.** `getPointsList().length` is the number of points; `0` means the window is empty.

---

## 🎯 Purpose

Use it when you only need the curve (not the full stats of [`tradeStatsEquityHistory`](./TradeStatsEquityHistory.md)). **Read-only.**

> **Prefer plain values?** [`MT4Service.getEquityHistory(from, excludeSameBars?)`](../../MT4Service/MT4Service.Overview.md) returns a typed `EquityPoint[]` (times as numbers).

---

## 🧱 Signature

```ts
import { MT4Account, TradeStatsPb, toTimestamp } from '@metarpc/nodemt4';

class MT4Account {
  // The equity-curve points. Returns the raw EquityHistoryData; throws MrpcError on failure.
  equityHistory(req: any /* EquityHistoryRequest */): Promise<any /* EquityHistoryData */>;
}
```

**Request message:**

```protobuf
EquityHistoryRequest {
  string from             = 1;  // window start, server time
  string from_utc         = 2;  // window start, UTC (prefer this)
  bool                      exclude_same_bars = 3;  // drop consecutive equal points
}
```

**Reply message:** `EquityHistoryReply { oneof response { EquityHistoryData data = 1; Error error = 2; } }`.

---

## 🔽 Input

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `req` | `EquityHistoryRequest` | `setFromUtc(isoUtcString)` — window start (UTC). `setExcludeSameBars(true)` drops flat points (smaller payload). |

---

## ⬆️ Output — `EquityHistoryData`

`getPointsList()` → `EquityPointData[]`. Each point:

| JS accessor | Type | Description |
| ----------- | ---- | ----------- |
| `getBalance()` | `number` | Balance at the point. |
| `getEquity()` | `number` | Equity at the point. |
| `getRealizedPl()` | `number` | Realized P/L up to the point. |
| `getUnrealizedPl()` | `number` | Floating P/L at the point. |
| `getCashFlow()` | `number` | Deposits / withdrawals at the point. |
| `getBalanceDrawdownRaw()` / `...Relative()` | `number` | Balance drawdown (currency / percent). |
| `getEquityDrawdownRaw()` / `...Relative()` | `number` | Equity drawdown (currency / percent). |
| `getTime()` | `Timestamp` | Point time, broker server time (`.getSeconds()`). |
| `getTimeUtc()` | `Timestamp` | The same moment in UTC. |

---

## 🧩 Notes & Tips

* **UTC window:** set `from_utc`. Points carry both `getTime()` (server) and `getTimeUtc()` (UTC).
* **Thin the curve** with `setExcludeSameBars(true)` for long windows.
* **Errors are exceptions:** rejects with `MrpcError` / the gRPC error.

---

## 🔗 Usage Examples

### 1) Fetch and print the last points

```ts
import { MT4Account, TradeStatsPb, toTimestamp } from '@metarpc/nodemt4';

const req = new TradeStatsPb.EquityHistoryRequest();
req.setFromUtc(new Date(Date.now() - 7 * 864e5).toISOString());   // last 7 days
req.setExcludeSameBars(true);

const d = await account.equityHistory(req);
for (const p of d.getPointsList().slice(-5)) {
  const t = new Date(p.getTimeUtc().getSeconds() * 1000).toISOString().slice(0, 16);
  console.log(`${t}  equity ${p.getEquity().toFixed(2)}  bal ${p.getBalance().toFixed(2)}`);
}
```

### 2) Max drawdown from the curve

```ts
let peak = -Infinity, maxDD = 0;
for (const p of d.getPointsList()) {
  peak = Math.max(peak, p.getEquity());
  maxDD = Math.max(maxDD, peak - p.getEquity());
}
console.log('max equity drawdown:', maxDD.toFixed(2));
```

### 3) Points ready for a chart

```ts
const series = d.getPointsList().map((p: any) => [p.getTimeUtc().getSeconds() * 1000, p.getEquity()]);
```

---

## 📚 See Also

* [TradeStatsEquityHistory](./TradeStatsEquityHistory.md) — the curve **plus** the aggregated stats and trades.
* [TradeStats](./TradeStats.md) — just the aggregated numbers.
* **Friendly layer:** [`MT4Service.getEquityHistory(from)`](../../MT4Service/MT4Service.Overview.md) → `EquityPoint[]`.
