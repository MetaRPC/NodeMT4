/*══════════════════════════════════════════════════════════════════════════════
 FILE: 14_adaptive_preset.js - PRESET: ADAPTIVE MARKET MODE

 PURPOSE:
   A "preset" coordinates orchestrators behind one decision. It reads recent bars,
   classifies the market, and dispatches to the matching orchestrator:

       TRENDING  → Trailing Stop   (ride the move)
       RANGING   → Grid Trader     (fade the range)
       VOLATILE  → Risk Manager    (defensive / kill-switch)

 PATTERN:
   lastBars(20 H1 bars) → trend = netMove/avgRange, spike = maxRange/avgRange
   → pick a mode → run the chosen orchestrator.

 🚀 RUN:  node examples/demos/main.js 14
══════════════════════════════════════════════════════════════════════════════*/

'use strict';

const { printSub } = require('../helpers/connection');
const trailingStop = require('../orchestrators/11_trailing_stop');
const gridTrader = require('../orchestrators/12_grid_trader');
const riskManager = require('../orchestrators/13_risk_manager');

module.exports = async function demo(sugar, cfg) {
  const sym = cfg.testSymbol;
  await sugar.service().symbolSelect(sym, true);

  printSub(`analyse ${sym} (last 20 H1 bars)`);

  // ──────────────────────────────────────────────────────────────────────────────
  //  1  service().lastBars(sym, 'H1', 20)  — recent OHLC bars
  //     Returns: Bar[]. We derive two ratios: trend = netMove/avgRange,
  //     spike = maxRange/avgRange — then classify the market from them.
  // ──────────────────────────────────────────────────────────────────────────────
  const bars = await sugar.service().lastBars(sym, 'H1', 20);
  if (bars.length < 5) { console.log('  not enough bars — defaulting to RANGING'); return gridTrader(sugar, cfg); }

  let sumRange = 0, maxRange = 0;
  for (const b of bars) { const r = b.high - b.low; sumRange += r; maxRange = Math.max(maxRange, r); }
  const avgRange = sumRange / bars.length;
  const move = Math.abs(bars[bars.length - 1].close - bars[0].close);
  const trend = avgRange > 0 ? move / avgRange : 0;
  const spike = avgRange > 0 ? maxRange / avgRange : 1;
  console.log(`  avgRange ${avgRange.toFixed(5)}  netMove ${move.toFixed(5)} (${trend.toFixed(2)} ranges)  maxSpike ${spike.toFixed(2)}x`);

  // ──────────────────────────────────────────────────────────────────────────────
  //  2  dispatch to the matching orchestrator (each runs its own API calls):
  //     VOLATILE → risk manager · TRENDING → trailing stop · RANGING → grid trader
  // ──────────────────────────────────────────────────────────────────────────────
  const mode = spike > 2.5 ? 'VOLATILE' : trend > 2.0 ? 'TRENDING' : 'RANGING';
  console.log(`  → market mode: ${mode} → dispatching orchestrator\n`);

  if (mode === 'VOLATILE') return riskManager(sugar, cfg);
  if (mode === 'TRENDING') return trailingStop(sugar, cfg);
  return gridTrader(sugar, cfg);
};
