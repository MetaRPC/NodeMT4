/*══════════════════════════════════════════════════════════════════════════════
 FILE: 13_risk_manager.js - ORCHESTRATOR: RISK MANAGER (monitor / kill-switch)

 PURPOSE:
   Each cycle read account health (equity, margin level, floating P/L, open
   orders); if drawdown exceeds maxDrawdownPct or the margin level drops below
   minMarginLevel, close every position (a protective kill-switch). Read-only
   unless a limit breaks.

 PATTERN:
   loop(cycles): read metrics → evaluate limits → closeAllPositions() on breach.

 NOTE: MT4's AccountSummary has no margin level, so marginLevel comes from a live
       snapshot (sugar.getMarginLevel()).

 🚀 RUN:  node examples/demos/main.js 13
══════════════════════════════════════════════════════════════════════════════*/

'use strict';

const { printSub } = require('../helpers/connection');

module.exports = async function demo(sugar, cfg, opts = {}) {
  const maxDrawdownPct = opts.maxDrawdownPct ?? 5;
  const minMarginLevel = opts.minMarginLevel ?? 150;
  const cycles = opts.cycles ?? 5;
  const intervalMs = opts.intervalMs ?? 800;

  const startBalance = await sugar.getBalance();
  printSub(`monitoring — start balance ${startBalance.toFixed(2)}  (DD ≤ ${maxDrawdownPct}%, margin ≥ ${minMarginLevel}%)`);

  // ──────────────────────────────────────────────────────────────────────────────
  //  per cycle — account-health reads (all read-only):
  //    getAccountInfo()      → AccountInfo (equity, …)
  //    getMarginLevel()      → number (from a live OnOpenedOrdersProfit snapshot)
  //    getTotalProfit()      → number (summed floating P/L)
  //    countOpenPositions()  → number
  // ──────────────────────────────────────────────────────────────────────────────
  for (let c = 1; c <= cycles; c++) {
    const a = await sugar.getAccountInfo();
    const marginLevel = await sugar.getMarginLevel();
    const floating = await sugar.getTotalProfit();
    const open = await sugar.countOpenPositions();
    const ddPct = startBalance > 0 ? ((startBalance - a.equity) / startBalance) * 100 : 0;

    console.log(`  cycle ${c}/${cycles}  equity ${a.equity.toFixed(2)}  float ${floating.toFixed(2)}  marginLvl ${marginLevel.toFixed(0)}%  open ${open}  DD ${ddPct.toFixed(2)}%`);

    // ────────────────────────────────────────────────────────────────────────────
    //  closeAllPositions()  ⚠ kill-switch: flattens EVERY position on a breach
    //  Returns: Promise<number> — how many were closed.
    // ────────────────────────────────────────────────────────────────────────────
    const breach = ddPct > maxDrawdownPct || (open > 0 && marginLevel > 0 && marginLevel < minMarginLevel);
    if (breach) {
      const closed = await sugar.closeAllPositions();
      console.log(`  ⚠ LIMIT BREACHED — closed ${closed} positions (kill-switch)`);
      return;
    }
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  console.log('  done — no breach');
};
