# 14 · Adaptive Preset

> A **preset** coordinates orchestrators behind one decision. It reads recent bars, classifies the market, and dispatches to the matching orchestrator.

**Run:** `node examples/demos/main.js 14` · **File:** `examples/demos/presets/14_adaptive_preset.js` · ↪ delegates to the orchestrator it picks (which may place live demo orders).

[← Orchestrators Overview](./Strategies.Master.Overview.md)

---

## 🎯 What it does

Rather than hard-code one strategy, the preset looks at the last 20 H1 bars, derives two ratios, and chooses:

| Market mode | Orchestrator | Why |
| ----------- | ------------ | --- |
| **TRENDING** | [Trailing Stop](./11_Trailing_stop.md) | ride the move |
| **RANGING** | [Grid Trader](./12_Grid_trader.md) | fade the range |
| **VOLATILE** | [Risk Manager](./13_Risk_manager.md) | stay defensive |

This shows how one-liners compose not just into a loop, but into a **decision** that selects a loop.

---

## 🧠 How it works

```
bars = service().lastBars(sym, 'H1', 20)
avgRange = mean(high − low)
trend = |last.close − first.close| / avgRange     (net directional move, in "ranges")
spike = max(high − low) / avgRange                (biggest bar vs typical)

mode = spike > 2.5 ? VOLATILE
     : trend > 2.0 ? TRENDING
     :               RANGING
→ dispatch to the matching orchestrator
```

1. **Read bars.** `service().lastBars(sym, 'H1', 20)` — the newest 20 H1 candles (no server-time math needed).
2. **Measure.** Average bar range, the net move across the window (in units of average range), and the biggest single-bar spike.
3. **Classify & dispatch.** A big spike → **VOLATILE** (risk manager); a strong net move → **TRENDING** (trailing stop); otherwise **RANGING** (grid). With too few bars it defaults to the grid.

---

## 🔑 Key code

```ts
const bars = await sugar.service().lastBars(sym, 'H1', 20);
if (bars.length < 5) return gridTrader(sugar, cfg);

let sumRange = 0, maxRange = 0;
for (const b of bars) { const r = b.high - b.low; sumRange += r; maxRange = Math.max(maxRange, r); }
const avgRange = sumRange / bars.length;
const move = Math.abs(bars[bars.length - 1].close - bars[0].close);
const trend = avgRange > 0 ? move / avgRange : 0;
const spike = avgRange > 0 ? maxRange / avgRange : 1;

const mode = spike > 2.5 ? 'VOLATILE' : trend > 2.0 ? 'TRENDING' : 'RANGING';
if (mode === 'VOLATILE') return riskManager(sugar, cfg);
if (mode === 'TRENDING') return trailingStop(sugar, cfg);
return gridTrader(sugar, cfg);
```

---

## 🔗 Used

[`service().lastBars`](../MT4Service/3.%20Symbols_Quotes_Methods.md) to read bars, then one of [`11 Trailing`](./11_Trailing_stop.md) / [`12 Grid`](./12_Grid_trader.md) / [`13 Risk`](./13_Risk_manager.md).

---

## 🧩 Notes & adapting it

- **The thresholds are illustrative** (`spike > 2.5`, `trend > 2.0`) — tune them to your instrument and timeframe.
- **Add indicators:** swap the simple range ratios for ATR, ADX, or a moving-average slope for a sharper regime read.
- **Different timeframe:** pass another timeframe to `lastBars` (`'M15'`, `'H4'`) to react faster or slower.
- **More modes:** add a "quiet" mode that does nothing, or a "breakout" mode that only arms pending stops.

---

## See also

* [Orchestrators Overview](./Strategies.Master.Overview.md) · [Trailing Stop](./11_Trailing_stop.md) · [Grid Trader](./12_Grid_trader.md) · [Risk Manager](./13_Risk_manager.md)
* [MT4Service — Symbols & Quotes](../MT4Service/3.%20Symbols_Quotes_Methods.md) — `lastBars` and the bar DTO.
