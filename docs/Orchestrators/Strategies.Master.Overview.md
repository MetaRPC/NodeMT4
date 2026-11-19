# Orchestrators — Overview

> Small, self-contained **strategy loops** built entirely on [MT4Sugar](../MT4Sugar/MT4Sugar.API_Overview.md). Each is a plain async function `demo(sugar, cfg, opts)` you can read, run on the demo account, and adapt.

These are teaching examples of *coordinating* the SDK over time — not production trading systems. They show how the one-liners compose into a working loop.

---

## 🧩 Orchestrator vs preset

- An **orchestrator** runs **one** strategy end-to-end (open → manage → close, or monitor → act).
- A **preset** picks **which** orchestrator to run from the current market conditions, then delegates to it.

So the three orchestrators are the strategies; the preset is the coordinator on top.

---

## 📁 What's here

| # | File | Idea | Writes trades? |
| - | ---- | ---- | -------------- |
| 11 | **[Trailing Stop](./11_Trailing_stop.md)** | Open a BUY, ratchet its SL up as price advances, close. | ✅ one order |
| 12 | **[Grid Trader](./12_Grid_trader.md)** | Lay a symmetric grid of pending limits, list, delete. | ✅ pending orders |
| 13 | **[Risk Manager](./13_Risk_manager.md)** | Monitor equity / margin / drawdown; kill-switch on breach. | ⛔ read-only unless a limit breaks |
| 14 | **[Adaptive Preset](./14_AdaptivePreset.md)** | Classify the market, dispatch to the matching orchestrator. | ↪ delegates |

> The numbering follows the demo files (`examples/demos/orchestrators/`, `.../presets/`).

### How the preset composes them

```
                 ┌──────────────── 14 Adaptive Preset ───────────────┐
    lastBars  →  │ TRENDING → 11 Trailing   RANGING → 12 Grid        │
                 │                 VOLATILE → 13 Risk Manager        │
                 └───────────────────────────────────────────────────┘
```

---

## 🧱 The shape they share

```ts
module.exports = async function demo(sugar, cfg, opts = {}) {
  // sugar : a connected MT4Sugar
  // cfg   : { testSymbol, testVolume, ... }  (from examples/demos/config)
  // opts  : per-run tuning (cycles, pips, thresholds…)
};
```

* **`sugar`** — a connected [MT4Sugar](../MT4Sugar/MT4Sugar.API_Overview.md); reach down with `sugar.service()` / `sugar.account()`.
* **`cfg`** — `testSymbol` and `testVolume` drive what and how much; shared across demos.
* **`opts`** — each orchestrator documents its own knobs (trail distance, grid levels, risk limits…).

Run any of them from the demo menu:

```bash
node examples/demos/main.js 11      # trailing stop
node examples/demos/main.js 12      # grid trader
node examples/demos/main.js 13      # risk manager
node examples/demos/main.js 14      # adaptive preset
```

---

## 🧠 Shared building blocks

All four lean on the same handful of sugar calls:

| Concern | Sugar methods |
| ------- | ------------- |
| Price & spec | [`getBid` / `getAsk`](../MT4Sugar/3.%20Prices_Quotes.md) · [`getSymbolInfo`](../MT4Sugar/9.%20Symbol_Information.md) · [`service().lastBars`](../MT4Service/3.%20Symbols_Quotes_Methods.md) |
| Enter | [`buyMarket` / `buyLimit` / `sellLimit`](../MT4Sugar/4.%20Simple_Trading.md) |
| Manage | [`modifyPositionSL`](../MT4Sugar/6.%20Position_Management.md) · [`closePosition` / `closeAllPositions`](../MT4Sugar/6.%20Position_Management.md) |
| Watch | [`getAccountInfo`](../MT4Sugar/12.%20Account_Information.md) · [`getMarginLevel`](../MT4Sugar/2.%20Balance_Margin.md) · [`getTotalProfit` / `countOpenPositions` / `getPositionByTicket`](../MT4Sugar/7.%20Position_Information.md) |

The **pip** convention is shared too: `pip = point × (digits is 3 or 5 ? 10 : 1)`.

> **MT4 note:** a "position" is an open **market order** (by ticket). Live **margin** isn't in the account summary — the Risk Manager reads it via `getMarginLevel()` (a live snapshot).

---

## ⚠️ Safety

11, 12 and 14 place **live** orders on the configured **demo** account (tiny `cfg.testVolume`, self-closing). 13 is read-only until a risk limit is breached, at which point it closes everything. Never point these at a real account while learning.

---

## See also

* [MT4Sugar — API Overview](../MT4Sugar/MT4Sugar.API_Overview.md) — the building blocks.
* [Trailing Stop](./11_Trailing_stop.md) · [Grid Trader](./12_Grid_trader.md) · [Risk Manager](./13_Risk_manager.md) · [Adaptive Preset](./14_AdaptivePreset.md).
