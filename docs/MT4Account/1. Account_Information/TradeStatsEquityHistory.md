# 📈 Trade Stats + Equity History

> **Request:** the aggregated statistics **and** the equity curve **and** the trades behind them (`StatsWithChartsData`) in one call — everything you need to render a performance page.

**API Information:**

* **Low-level API:** `MT4Account.tradeStatsEquityHistory(request)` (from `@metarpc/nodemt4`)
* **gRPC service:** `mt4_term_api.TradeStats`
* **Proto definition:** `TradeStatsEquityHistory` (defined in `mt4-term-api-trade-stats.proto`)

### RPC

* **Service:** `mt4_term_api.TradeStats`
* **Method:** `TradeStatsEquityHistory(TradeStatsEquityHistoryRequest) → TradeStatsEquityHistoryReply`
* **Low-level client (generated):** `TradeStatsClient.tradeStatsEquityHistory(request, metadata, opts, cb)`

---

## 💬 Just the essentials

* **What it is.** A superset of [`tradeStats`](./TradeStats.md): the `StatsData` **plus** the equity-curve points and the trade lists.
* **Why you need it.** One round-trip to draw a full report page — headline stats + an equity chart + a trade table.
* **Sanity check.** `getStats().getTrades()` mirrors [`tradeStats`](./TradeStats.md); `getChartsList()` holds the curve.

---

## 🎯 Purpose

Use it when you want the numbers and the chart data together. It is **read-only**.

> **Prefer plain values?** [`MT4Service.getTradeStatsEquityHistory(from, excludeSameBars?)`](../../MT4Service/MT4Service.Overview.md) returns `{ stats, equity }` with a typed `TradeStats` and `EquityPoint[]`.

---

## 🧱 Signature

```ts
import { MT4Account, TradeStatsPb, toTimestamp } from '@metarpc/nodemt4';

class MT4Account {
  // Stats + equity curve + trades. Returns the raw StatsWithChartsData; throws MrpcError on failure.
  tradeStatsEquityHistory(req: any /* TradeStatsEquityHistoryRequest */): Promise<any /* StatsWithChartsData */>;
}
```

**Request message:**

```protobuf
TradeStatsEquityHistoryRequest {
  string from             = 1;  // window start, server time
  string from_utc         = 2;  // window start, UTC (prefer this)
  bool                      exclude_same_bars = 3;  // drop consecutive equal points
}
```

**Reply message:** `TradeStatsEquityHistoryReply { oneof response { StatsWithChartsData data = 1; Error error = 2; } }`.

---

## 🔽 Input

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `req` | `TradeStatsEquityHistoryRequest` | `setFromUtc(isoUtcString)` — window start (UTC). `setExcludeSameBars(true)` thins out flat stretches of the curve. |

---

## ⬆️ Output — `StatsWithChartsData`

| JS accessor | Type | Description |
| ----------- | ---- | ----------- |
| `getStats()` | `StatsData` | The same report as [`tradeStats`](./TradeStats.md) (profit factor, drawdowns, …). |
| `getChartsList()` | `EquityPointData[]` | The equity-curve points — see [EquityHistory](./EquityHistory.md) for the per-point fields. |
| `getTradesList()` | `[]` | The closed trades behind the stats. |
| `getOpenTradesList()` | `[]` | Trades still open at the window end. |

---

## 🧩 Notes & Tips

* **Heavier call** — it returns both the report and the full curve; keep the window reasonable or set `excludeSameBars`.
* **Errors are exceptions:** rejects with `MrpcError` / the gRPC error.
* **UTC window:** set `from_utc`.

---

## 🔗 Usage Examples

### 1) Stats headline + curve length

```ts
import { MT4Account, TradeStatsPb, toTimestamp } from '@metarpc/nodemt4';

const req = new TradeStatsPb.TradeStatsEquityHistoryRequest();
req.setFromUtc(new Date(Date.now() - 90 * 864e5).toISOString());   // last 90 days
req.setExcludeSameBars(true);

const d = await account.tradeStatsEquityHistory(req);
const s = d.getStats();
console.log(`PF ${s.getProfitFactor().toFixed(2)}  trades ${s.getTrades()}  curve points ${d.getChartsList().length}`);
```

### 2) Extract the equity curve for a chart

```ts
const points = d.getChartsList().map((p: any) => ({
  t: p.getTimeUtc().getSeconds() * 1000,
  equity: p.getEquity(),
  balance: p.getBalance(),
}));
// feed `points` to your charting library
```

---

## 📚 See Also

* [TradeStats](./TradeStats.md) — just the aggregated numbers (lighter).
* [EquityHistory](./EquityHistory.md) — just the curve points.
* **Friendly layer:** [`MT4Service.getTradeStatsEquityHistory(from)`](../../MT4Service/MT4Service.Overview.md) → `{ stats, equity }`.
