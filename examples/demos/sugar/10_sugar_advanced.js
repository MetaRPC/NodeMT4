/*══════════════════════════════════════════════════════════════════════════════
 FILE: 10_sugar_advanced.js - HIGH-LEVEL (MT4Sugar) RISK & SIZING DEMO (read-only)

 PURPOSE:
   The risk-management one-liners: size a position by risk %, cap by free margin,
   estimate margin, derive SL/TP from pip distances, and pre-flight a trade.
   Opens nothing — every call is a calculation or a read.

 📚 WHAT THIS DEMO COVERS (3 regions):
   REGION 1: SYMBOL FACTS       - getSymbolInfo / getMinStopLevel / getSymbolDigits
   REGION 2: RISK SIZING        - calculatePositionSize / getMaxLotSize / calculateRequiredMargin
   REGION 3: SL/TP + PRE-FLIGHT - calculateSLTP / canOpenPosition

 🚀 RUN:  node examples/demos/main.js 10    ℹ️ SAFE: read-only.
══════════════════════════════════════════════════════════════════════════════*/

'use strict';

const { printSub } = require('../helpers/connection');

module.exports = async function demo(sugar, cfg) {
  const sym = cfg.testSymbol;
  await sugar.service().symbolSelect(sym, true);

  // ════════════════════════════════════════════════════════════════════════════
  //  REGION 1: SYMBOL FACTS
  // ════════════════════════════════════════════════════════════════════════════
  printSub('1. symbol facts');

  // ──────────────────────────────────────────────────────────────────────────────
  //  1.1  getSymbolInfo(symbol)   — full contract spec            → SymbolParams
  //  1.2  getMinStopLevel(symbol) — min SL/TP distance, in points → number
  //  1.3  getSymbolDigits(symbol) — price decimal places          → number
  // ──────────────────────────────────────────────────────────────────────────────
  const info = await sugar.getSymbolInfo(sym);
  console.log(`  ${sym}  digits ${info.digits}  point ${info.point}  volMin ${info.volumeMin}  volStep ${info.volumeStep}`);
  console.log(`  minStopLevel ${await sugar.getMinStopLevel(sym)} pts   digits ${await sugar.getSymbolDigits(sym)}`);

  // ════════════════════════════════════════════════════════════════════════════
  //  REGION 2: RISK-BASED SIZING
  // ════════════════════════════════════════════════════════════════════════════
  printSub('2. risk-based sizing');

  // ──────────────────────────────────────────────────────────────────────────────
  //  2.1  calculatePositionSize(symbol, riskPercent, stopLossPips)
  //       Lot size so a `stopLossPips` stop risks `riskPercent`% of balance. → number
  //  2.2  getMaxLotSize(symbol)                — largest lot free margin allows → number
  //  2.3  calculateRequiredMargin(symbol, vol) — margin to open `vol` lots       → number
  // ──────────────────────────────────────────────────────────────────────────────
  const lots = await sugar.calculatePositionSize(sym, /*risk%*/ 1.0, /*SL pips*/ 20);
  console.log(`  risk 1% over a 20-pip stop → ${lots} lots`);
  console.log(`  max lot (free margin)      → ${await sugar.getMaxLotSize(sym)}`);
  console.log(`  margin for 0.10 lots       → ${(await sugar.calculateRequiredMargin(sym, 0.10)).toFixed(2)}`);

  // ════════════════════════════════════════════════════════════════════════════
  //  REGION 3: SL/TP FROM PIPS + PRE-FLIGHT
  // ════════════════════════════════════════════════════════════════════════════
  printSub('3. SL/TP from pips & pre-flight');

  // ──────────────────────────────────────────────────────────────────────────────
  //  3.1  calculateSLTP(symbol, dir, entry, slPips, tpPips)
  //       Absolute SL/TP prices from pip distances (entry 0 = current ask/bid).
  //       Returns: { sl, tp }.
  //  3.2  canOpenPosition(symbol, volume)  — pre-flight check → { ok, reason }.
  // ──────────────────────────────────────────────────────────────────────────────
  const { sl, tp } = await sugar.calculateSLTP(sym, 'BUY', 0, 20, 40);
  console.log(`  BUY 20/40 pips → SL ${sl.toFixed(info.digits)}  TP ${tp.toFixed(info.digits)}`);
  const can = await sugar.canOpenPosition(sym, cfg.testVolume);
  console.log(`  canOpenPosition(${cfg.testVolume}) → ${can.ok}${can.ok ? '' : '  (' + can.reason + ')'}`);
};
