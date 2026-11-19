# 📊 Trade Statistics

> **Request:** aggregated trading statistics (`StatsData`) over a time window — win rate, profit factor, expectancy, drawdowns, best/worst, Sharpe, Z-score and more.

**API Information:**

* **Low-level API:** `MT4Account.tradeStats(request)` (from `@metarpc/nodemt4`)
* **gRPC service:** `mt4_term_api.TradeStats`
* **Proto definition:** `TradeStats` (defined in `mt4-term-api-trade-stats.proto`)

### RPC

* **Service:** `mt4_term_api.TradeStats`
* **Method:** `TradeStats(TradeStatsRequest) → TradeStatsReply`
* **Low-level client (generated):** `TradeStatsClient.tradeStats(request, metadata, opts, cb)`

---

## 💬 Just the essentials

* **What it is.** One RPC that scans the account's closed trades since a start time and returns a full performance report.
* **Why you need it.** Dashboards, strategy scorecards, risk reviews — profit factor, expectancy, drawdowns and win counts without computing them yourself.
* **Sanity check.** If `getTrades()` is `0`, the window has no closed trades — widen `from`.

---

## 🎯 Purpose

Use it to score performance over any window: today, this week, since inception. It is **read-only** and does not touch open orders.

> **Prefer plain values?** [`MT4Service.getTradeStats(from)`](../../MT4Service/MT4Service.Overview.md) builds the request and returns a typed `TradeStats` object.

---

## 🧱 Signature

```ts
import { MT4Account, TradeStatsPb, toTimestamp } from '@metarpc/nodemt4';

class MT4Account {
  // Aggregated statistics over a window. Returns the raw StatsData; throws MrpcError on failure.
  tradeStats(req: any /* TradeStatsRequest */): Promise<any /* StatsData */>;
}
```

**Request message:**

```protobuf
TradeStatsRequest {
  string from     = 1;  // window start, broker server time
  string from_utc = 2;  // window start, UTC  (prefer this)
}
```

**Reply message:** `TradeStatsReply { oneof response { StatsData data = 1; Error error = 2; } }` — `MT4Account` resolves with `data` or **rejects** with `MrpcError`.

---

## 🔽 Input

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `req` | `TradeStatsRequest` | Set the window start with `setFromUtc(isoUtcString)` (UTC) — or `setFrom(isoUtcString)` for broker server time. |

```ts
const req = new TradeStatsPb.TradeStatsRequest();
req.setFromUtc(new Date(Date.now() - 30 * 864e5).toISOString());   // last 30 days (UTC)
```

---

## ⬆️ Output — `StatsData`

| JS accessor | Type | Description |
| ----------- | ---- | ----------- |
| `getTrades()` | `number` | Number of closed trades in the window. |
| `getProfitability()` | `number` | Net profit (deposit currency). |
| `getProfitFactor()` | `number` | Gross profit ÷ gross loss (>1 is profitable). |
| `getExpectancy()` | `number` | Average result per trade. |
| `getGrowthPercent()` | `number` | Account growth over the window, percent. |
| `getGhpr()` | `number` | Geometric holding-period return. |
| `getSharpeRatio()` | `number` | Risk-adjusted return. |
| `getZScore()` | `number` | Streak (win/loss clustering) measure. |
| `getStandardDeviation()` | `number` | Dispersion of trade results. |
| `getPips()` | `number` | Net pips. |
| `getLots()` | `number` | Total volume traded (lots). |
| `getDeposits()` / `getWithdrawals()` | `number` | Cash movements in the window. |
| `getComissions()` | `number` | Total commissions *(sic — proto spelling)*. |
| `getBestTrade()` / `getWorstTrade()` | `number` | Largest win / loss (currency). |
| `getBestTradePips()` / `getWorstTradePips()` | `number` | Largest win / loss (pips). |
| `getAverageWin()` / `getAverageLost()` | `number` | Mean win / mean loss. |
| `getAverageTradeLength()` | `number` | Mean holding time. |
| `getLongsWon()` / `getShortsWon()` | `number` | Winning long / short trades. |
| `getMaxBalanceDrawdownRaw()` / `...Relative()` | `number` | Max balance drawdown (currency / percent). |
| `getMaxEquityDrawdownRaw()` / `...Relative()` | `number` | Max equity drawdown (currency / percent). |
| `getMarketsList()` | `string[]` | Symbols traded in the window. |

> **Timestamps are UTC:** always set `from_utc`; leaving both unset returns stats over the whole history the gateway keeps.

---

## 🧩 Notes & Tips

* **Errors are exceptions:** rejects with `MrpcError` on a server error, or the gRPC error on transport failure.
* **Heavier than a read:** this call scans history — the SDK uses the default `callTimeoutMs`.
* **Empty window:** no closed trades → `getTrades() === 0` and the ratios are `0`.

---

## 🔗 Usage Examples

### 1) Last 30 days

```ts
import { MT4Account, TradeStatsPb, toTimestamp } from '@metarpc/nodemt4';

const account = new MT4Account('mt4.mrpc.pro', 443);
await account.connect({ user: 500000, password: 'password', server: 'TeleTrade-Demo' });

const req = new TradeStatsPb.TradeStatsRequest();
req.setFromUtc(new Date(Date.now() - 30 * 864e5).toISOString());
const s = await account.tradeStats(req);

console.log(`trades ${s.getTrades()}  profit ${s.getProfitability().toFixed(2)}`);
console.log(`profit factor ${s.getProfitFactor().toFixed(2)}  expectancy ${s.getExpectancy().toFixed(2)}`);
console.log(`best ${s.getBestTrade().toFixed(2)}  worst ${s.getWorstTrade().toFixed(2)}`);
```

### 2) A compact scorecard

```ts
function scorecard(s: any): string {
  return `PF ${s.getProfitFactor().toFixed(2)} | ` +
    `win ${s.getLongsWon() + s.getShortsWon()}/${s.getTrades()} | ` +
    `DD ${s.getMaxEquityDrawdownRelative().toFixed(1)}% | ` +
    `growth ${s.getGrowthPercent().toFixed(1)}%`;
}
```

### 3) Since the start of the year

```ts
const jan1 = new Date(Date.UTC(new Date().getUTCFullYear(), 0, 1));
const req = new TradeStatsPb.TradeStatsRequest();
req.setFromUtc(jan1.toISOString());
const s = await account.tradeStats(req);
console.log('YTD profit:', s.getProfitability().toFixed(2), 'over', s.getTrades(), 'trades');
```

---

## 📚 See Also

* [TradeStatsEquityHistory](./TradeStatsEquityHistory.md) — the same stats **plus** the equity curve and the trades.
* [EquityHistory](./EquityHistory.md) — just the equity-curve points.
* [TradeUnrealizedPL](./TradeUnrealizedPL.md) — best/worst unrealized P/L per open order.
* **Friendly layer:** [`MT4Service.getTradeStats(from)`](../../MT4Service/MT4Service.Overview.md) → a typed `TradeStats`.
