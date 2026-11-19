# 13 · Risk Manager

> Each cycle, read account health (equity, margin level, floating P/L, open orders); if drawdown exceeds a limit or the margin level drops too low, **close everything** — a protective kill-switch.

**Run:** `node examples/demos/main.js 13` · **File:** `examples/demos/orchestrators/13_risk_manager.js` · ⛔ read-only **until a limit breaks**, then it flattens the account.

[← Orchestrators Overview](./Strategies.Master.Overview.md)

---

## 🎯 What it does

A risk manager doesn't open trades — it **watches** the account and acts only when a guardrail is crossed. This example polls equity and margin on a timer, computes drawdown from a starting balance, and triggers `closeAllPositions()` on a breach.

---

## 🧠 How it works

```
startBalance = getBalance()
loop(cycles):
  equity   = getAccountInfo().equity
  marginLvl= getMarginLevel()          // live snapshot — not in AccountInfo on MT4
  floating = getTotalProfit()
  open     = countOpenPositions()
  ddPct    = (startBalance − equity) / startBalance · 100
  if ddPct > maxDrawdownPct OR (open>0 and marginLvl < minMarginLevel):
    closeAllPositions()   ← kill-switch
    return
```

> ⚠️ **Margin on MT4.** `AccountInfo` has no margin level, so the Risk Manager reads it with `getMarginLevel()` (one `OnOpenedOrdersProfit` snapshot).

---

## 🎛️ Options

| Option | Default | Meaning |
| ------ | ------- | ------- |
| `maxDrawdownPct` | `5` | Close everything if equity drops this % below the start balance. |
| `minMarginLevel` | `150` | Close everything if the margin level falls below this % (while orders are open). |
| `cycles` | `5` | How many times to check. |
| `intervalMs` | `800` | Delay between checks, ms. |

```ts
await riskManager(sugar, cfg, { maxDrawdownPct: 3, minMarginLevel: 200, cycles: 20 });
```

---

## 🔑 Key code

```ts
const startBalance = await sugar.getBalance();

for (let c = 1; c <= cycles; c++) {
  const a = await sugar.getAccountInfo();
  const marginLevel = await sugar.getMarginLevel();      // live
  const floating = await sugar.getTotalProfit();
  const open = await sugar.countOpenPositions();
  const ddPct = startBalance > 0 ? ((startBalance - a.equity) / startBalance) * 100 : 0;

  const breach = ddPct > maxDrawdownPct || (open > 0 && marginLevel > 0 && marginLevel < minMarginLevel);
  if (breach) {
    const closed = await sugar.closeAllPositions();
    console.log(`⚠ LIMIT BREACHED — closed ${closed} positions`);
    return;
  }
  await new Promise((r) => setTimeout(r, intervalMs));
}
```

---

## 🔗 Sugar methods used

[`getBalance`](../MT4Sugar/2.%20Balance_Margin.md) · [`getAccountInfo`](../MT4Sugar/12.%20Account_Information.md) · [`getMarginLevel`](../MT4Sugar/2.%20Balance_Margin.md) · [`getTotalProfit` / `countOpenPositions`](../MT4Sugar/7.%20Position_Information.md) · [`closeAllPositions`](../MT4Sugar/6.%20Position_Management.md).

---

## 🧩 Notes & adapting it

- **Read-only by design** — it only trades (closes) on a breach.
- **`getMarginLevel()` is a live read** (~1 s). For a tight loop, subscribe once via `service().subscribeOpenedOrdersProfit` and read margin from the callback instead.
- **Add a daily-loss limit:** compare `getProfitToday()` against a floor.
- **Real use:** run it continuously (not a fixed `cycles`), alert on breach (email/Slack) and optionally disable new entries rather than flattening.

---

## See also

* [Trailing Stop](./11_Trailing_stop.md) · [Grid Trader](./12_Grid_trader.md) · [Adaptive Preset](./14_AdaptivePreset.md)
* [MT4Sugar — Balance & Margin](../MT4Sugar/2.%20Balance_Margin.md) — where live margin comes from on MT4.
