/*══════════════════════════════════════════════════════════════════════════════
 FILE: 08_sugar_positions.js - HIGH-LEVEL (MT4Sugar) POSITION INFO DEMO (read-only)

 PURPOSE:
   Inspect open positions (open market orders) through Sugar one-liners — count,
   total floating P/L, per-symbol filters, lookup by ticket. Opens nothing.

 📚 WHAT THIS DEMO COVERS (3 regions):
   REGION 1: ALL POSITIONS  - getOpenPositions / countOpenPositions / getTotalProfit
   REGION 2: BY SYMBOL      - hasOpenPosition / getProfitBySymbol / getPositionsBySymbol
   REGION 3: BY TICKET      - getPositionByTicket

 🚀 RUN:  node examples/demos/main.js 8     ℹ️ SAFE: read-only.
══════════════════════════════════════════════════════════════════════════════*/

'use strict';

const { printSub } = require('../helpers/connection');

module.exports = async function demo(sugar, cfg) {
  // ════════════════════════════════════════════════════════════════════════════
  //  REGION 1: ALL POSITIONS
  // ════════════════════════════════════════════════════════════════════════════
  printSub('1. all open positions');

  // ──────────────────────────────────────────────────────────────────────────────
  //  1.1  getOpenPositions()    — every open market order         → OrderInfo[]
  //  1.2  countOpenPositions()  — how many are open               → number
  //  1.3  getTotalProfit()      — summed floating P/L             → number
  // ──────────────────────────────────────────────────────────────────────────────
  const positions = await sugar.getOpenPositions();
  console.log(`  ${await sugar.countOpenPositions()} open   floating P/L ${(await sugar.getTotalProfit()).toFixed(2)}`);
  for (const p of positions.slice(0, 10)) {
    console.log(`    #${p.ticket} ${p.symbol} ${p.type === 0 ? 'BUY ' : 'SELL'} vol ${p.lots} @ ${p.openPrice}  P/L ${p.profit.toFixed(2)}`);
  }

  // ════════════════════════════════════════════════════════════════════════════
  //  REGION 2: BY SYMBOL
  // ════════════════════════════════════════════════════════════════════════════
  printSub(`2. by symbol: ${cfg.testSymbol}`);

  // ──────────────────────────────────────────────────────────────────────────────
  //  2.1  hasOpenPosition(symbol)    — any position on it?        → boolean
  //  2.2  getProfitBySymbol(symbol)  — summed P/L on it           → number
  //  2.3  getPositionsBySymbol(sym)  — only its positions         → OrderInfo[]
  // ──────────────────────────────────────────────────────────────────────────────
  console.log(`  hasOpenPosition ${await sugar.hasOpenPosition(cfg.testSymbol)}   profit ${(await sugar.getProfitBySymbol(cfg.testSymbol)).toFixed(2)}`);
  const bySym = await sugar.getPositionsBySymbol(cfg.testSymbol);
  console.log(`  ${bySym.length} position(s) on ${cfg.testSymbol}`);

  // ════════════════════════════════════════════════════════════════════════════
  //  REGION 3: BY TICKET
  // ════════════════════════════════════════════════════════════════════════════
  if (positions.length) {
    printSub('3. lookup by ticket');

    // ────────────────────────────────────────────────────────────────────────────
    //  3.1  getPositionByTicket(ticket) — one order by its ticket
    //       Returns: Promise<OrderInfo | undefined>.
    // ────────────────────────────────────────────────────────────────────────────
    const one = await sugar.getPositionByTicket(positions[0].ticket);
    console.log(one ? `  #${one.ticket} ${one.symbol} vol ${one.lots}` : '  not found');
  }
};
