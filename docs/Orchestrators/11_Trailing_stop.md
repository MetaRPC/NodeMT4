# 11 · Trailing Stop

> Open one market BUY, then ratchet its stop-loss **up** as price advances (never down), and close it at the end — "let winners run, cap the downside".

**Run:** `node examples/demos/main.js 11` · **File:** `examples/demos/orchestrators/11_trailing_stop.js` · ⚠ opens one live demo order (tiny `cfg.testVolume`, self-closing).

[← Orchestrators Overview](./Strategies.Master.Overview.md)

---

## 🎯 What it does

A trailing stop keeps a floating stop-loss a fixed distance **behind** the market. As price rises the stop follows it up; when price falls the stop stays put. This locks in gains while leaving room for the order to keep running — and guarantees an exit if the move reverses.

This orchestrator is the smallest end-to-end example of *managing an order over time*: open → watch → adjust → close.

---

## 🧠 How it works

```
buyMarket → loop(cycles):
  read bid → wantSL = bid − trailPips·pip
  if wantSL > bestSL: modifyPositionSL(ticket, wantSL)   // raise only
→ closePosition(ticket)
```

1. **Select & measure.** `service().symbolSelect(sym, true)` then `getSymbolInfo` for `digits`/`point` → compute the **pip** (`point × 10` on 3/5-digit symbols, else `point`).
2. **Open.** `buyMarket(sym, cfg.testVolume)` returns the ticket (throws on a rejection — e.g. market closed — which the demo catches and reports).
3. **Trail.** Each cycle: confirm the order is still open (`getPositionByTicket`), read the `bid`, compute `wantSL = bid − trailPips·pip`, and **only raise** the stop (`if wantSL > bestSL`). Raising calls `modifyPositionSL(ticket, wantSL)`.
4. **Close.** After the cycles, `closePosition(ticket)`.

> **Ratchet rule.** The stop moves up only (`wantSL > bestSL`). That's what makes it a *trailing* stop rather than a stop that drifts with every tick.

---

## 🎛️ Options

| Option | Default | Meaning |
| ------ | ------- | ------- |
| `trailPips` | `20` | Distance of the trailing stop behind the bid, in pips. |
| `cycles` | `8` | How many times to re-evaluate. |
| `intervalMs` | `700` | Delay between cycles, ms. |

```ts
// override defaults when calling the function directly
await trailingStop(sugar, cfg, { trailPips: 30, cycles: 20, intervalMs: 1000 });
```

---

## 🔑 Key code

```ts
let ticket;
try { ticket = await sugar.buyMarket(sym, cfg.testVolume); }
catch (e) { console.log(`rejected (market closed?): ${e.message}`); return; }

let bestSL = 0;
for (let c = 1; c <= cycles; c++) {
  await new Promise((r) => setTimeout(r, intervalMs));
  const pos = await sugar.getPositionByTicket(ticket);
  if (!pos) return;                       // closed elsewhere
  const bid = await sugar.getBid(sym);
  const wantSL = bid - trailPips * pip;
  if (wantSL > bestSL) {                   // raise only
    bestSL = wantSL;
    await sugar.modifyPositionSL(ticket, bestSL);
  }
}
await sugar.closePosition(ticket);
```

---

## 🔗 Sugar methods used

[`buyMarket`](../MT4Sugar/4.%20Simple_Trading.md) · [`getBid`](../MT4Sugar/3.%20Prices_Quotes.md) · [`getSymbolInfo`](../MT4Sugar/9.%20Symbol_Information.md) · [`getPositionByTicket`](../MT4Sugar/7.%20Position_Information.md) · [`modifyPositionSL`](../MT4Sugar/6.%20Position_Management.md) · [`closePosition`](../MT4Sugar/6.%20Position_Management.md).

---

## 🧩 Notes & adapting it

- **Raise-only is the whole point** — drop the `wantSL > bestSL` guard and it's no longer a trailing stop.
- **Market must be open** — `buyMarket` rejects (`mqlIntCode` 132) out of session; the demo returns gracefully.
- **SELL variant:** mirror the geometry — `wantSL = ask + trailPips·pip` and lower the stop only.
- **Activation threshold:** start trailing only once the order is in profit by N pips (compare `bid` to `pos.openPrice`).
- **Real use:** replace the fixed `cycles` loop with a tick stream ([`subscribeQuotes`](../MT4Service/5.%20Streaming_Methods.md)) and no auto-close.

---

## See also

* [Grid Trader](./12_Grid_trader.md) · [Risk Manager](./13_Risk_manager.md) · [Adaptive Preset](./14_AdaptivePreset.md)
* [MT4Sugar — Position Management](../MT4Sugar/6.%20Position_Management.md) — the close/modify helpers it builds on.
