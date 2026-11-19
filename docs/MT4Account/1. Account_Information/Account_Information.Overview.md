# MT4Account · Account Information — Overview

> Balance, equity, credit, leverage and trade mode in one call — plus aggregated **trade statistics**, the **equity curve** and **unrealized-P/L extrema**. Use this page to choose the right API for reading account state and performance.

These methods are **read-only**. `accountSummary` lives on `mt4_term_api.AccountHelper`; the statistics methods on `mt4_term_api.TradeStats`. Each resolves with the raw `*Data` (read fields with `getXxx()`), or rejects with `MrpcError`.

## 📁 What lives here

* **[AccountSummary](./AccountSummary.md)** — **all account info** at once (login, balance, equity, credit, leverage, currency, trade mode, server time). Returns the `EnumAccountTradeMode` enum.
* **[TradeStats](./TradeStats.md)** — **aggregated statistics** over a window: trades, profit factor, expectancy, best/worst, drawdowns, Sharpe, Z-score, …
* **[TradeStatsEquityHistory](./TradeStatsEquityHistory.md)** — the **same stats plus the equity curve** and the trades behind it.
* **[EquityHistory](./EquityHistory.md)** — just the **equity-curve points** (balance / equity / drawdown per point).
* **[TradeUnrealizedPL](./TradeUnrealizedPL.md)** — the **best/worst unrealized P/L** reached per open order.

---

## 🧭 Plain English

* **AccountSummary** → the **one-stop shop** for a complete snapshot. One RPC, everything you need for a dashboard, a pre-trade affordability check, or a connection heartbeat.
* **TradeStats / EquityHistory / TradeUnrealizedPL** → **performance analytics** over a time window — win rate, profit factor, the equity curve for a chart, and how far each open order ran into profit or loss.

> Rule of thumb: need the **current snapshot** → `accountSummary`; need **performance over time** → the `TradeStats` family.

---

## Quick choose

| If you need…                                   | Use                        | Returns                 |
| ---------------------------------------------- | -------------------------- | ----------------------- |
| Complete account snapshot (all values)         | `accountSummary`           | `AccountSummaryData`     |
| Aggregated stats over a window                 | `tradeStats`               | `StatsData`              |
| Stats **and** the equity curve + trades        | `tradeStatsEquityHistory`  | `StatsWithChartsData`    |
| Just the equity-curve points                   | `equityHistory`            | `EquityHistoryData`      |
| Unrealized-P/L extrema per open order          | `tradeUnrealizedPl`        | `TradeUnrealizedPLData`  |

---

## ❌ Cross-refs & gotchas

* **Margin on MT4.** `AccountSummaryData` exposes `getAccountMargin()` / `getAccountMarginFree()` / `getAccountMarginLevel()`, **but the MT4 gateway often returns `0` for them** — the reliable source of live margin is the [`OnOpenedOrdersProfit`](../5.%20Streaming_Methods/OnOpenedOrdersProfit.md) stream (or the friendly `MT4Sugar.getMargin()`, which reads one snapshot of it).
* **Floating profit** — the summary carries no dedicated profit field; compute `getAccountEquity() − getAccountBalance()`.
* **Time windows are UTC.** The `TradeStats` requests take a `setFromUtc(Timestamp)` — pass a real UTC instant; the SDK converts for you in `MT4Service.getTradeStats(from)`.
* **Everything else is server time.** `getServerTime()` is broker time; use `getUtcServerTimeShiftMinutes()` (or [`serverTimezone`](../3.%20Symbols_Quotes/ServerTimezone.md)) to convert.
* **Timeouts** — read RPCs use `callTimeoutMs` (default `30000` ms); the stats methods use a longer deadline internally.

---

## 🟢 Minimal snippets

```ts
// Complete account snapshot
const s = await account.accountSummary();
console.log(
  `Balance: ${s.getAccountBalance().toFixed(2)} ${s.getAccountCurrency()}, ` +
  `Equity: ${s.getAccountEquity().toFixed(2)}, Leverage: 1:${s.getAccountLeverage()}`,
);
```

```ts
// Aggregated statistics for the last 30 days
import { TradeStatsPb } from '@metarpc/nodemt4';

const req = new TradeStatsPb.TradeStatsRequest();
req.setFromUtc(new Date(Date.now() - 30 * 864e5).toISOString());   // 30 days ago, UTC
const stats = await account.tradeStats(req);
console.log(`trades ${stats.getTrades()}  profit factor ${stats.getProfitFactor().toFixed(2)}`);
```

```ts
// The equity curve as points
const eq = new TradeStatsPb.EquityHistoryRequest();
eq.setFromUtc(new Date(Date.now() - 30 * 864e5).toISOString());
const curve = await account.equityHistory(eq);
console.log(`equity-curve points: ${curve.getPointsList().length}`);
```

> **Prefer plain values?** The friendly layer does the request-building and mapping for you: [`MT4Service.getAccountInfo()`](../../MT4Service/MT4Service.Overview.md), `getTradeStats(from)`, `getEquityHistory(from)`.

---

## 🧱 Enums used in Account Information

Only `accountSummary` returns an enum — the account's trade mode. Enums are plain namespace objects on the `*Pb` modules; use the full constant, e.g. `AccountHelperPb.EnumAccountTradeMode.ACCOUNT_TRADE_MODE_DEMO`.

### `EnumAccountTradeMode` (output of `accountSummary`)

| Constant | Value | Meaning |
|----------|-------|---------|
| `ACCOUNT_TRADE_MODE_DEMO` | `0` | demo / practice |
| `ACCOUNT_TRADE_MODE_CONTEST` | `1` | contest |
| `ACCOUNT_TRADE_MODE_REAL` | `2` | real trading |

```ts
import { AccountHelperPb } from '@metarpc/nodemt4';
const T = AccountHelperPb.EnumAccountTradeMode;
const s = await account.accountSummary();
if (s.getAccountTradeMode() === T.ACCOUNT_TRADE_MODE_REAL) console.log('⚠️ REAL account');
```

The `TradeStats` methods take no input enum — only a `from` timestamp — and their `*Data` fields are plain numbers.

---

## See also

* **Orders & History:** [Overview](../2.%20Orders_History/Orders_History.Overview.md) — open orders and closed-order history.
* **Friendly layer:** [`MT4Service.getAccountInfo()`](../../MT4Service/MT4Service.Overview.md) returns a named `AccountInfo` object (plain fields).

---

**Back to:** [MT4Account — Master Overview](../MT4Account.Master.Overview.md)
