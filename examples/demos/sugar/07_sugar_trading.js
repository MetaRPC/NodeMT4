/*══════════════════════════════════════════════════════════════════════════════
 FILE: 07_sugar_trading.js - HIGH-LEVEL (MT4Sugar) TRADING DEMO  ⚠ live demo order

 PURPOSE:
   Open a tiny market order with one line, inspect it, then close it. Sugar order
   helpers return the resulting ticket and throw MrpcError on a broker rejection.

 📚 WHAT THIS DEMO COVERS (3 steps):
   • buyMarket()           - open a market BUY
   • getPositionByTicket() - read the open order back
   • closePosition()       - close it

 ⚠ SAFETY: opens cfg.testVolume on the DEMO account and closes it before returning.
 🚀 RUN:  node examples/demos/main.js 7
══════════════════════════════════════════════════════════════════════════════*/

'use strict';

const { printSub } = require('../helpers/connection');

module.exports = async function demo(sugar, cfg) {
  const sym = cfg.testSymbol;
  await sugar.service().symbolSelect(sym, true);

  printSub(`open → inspect → close  (${sym} ${cfg.testVolume})`);

  // ──────────────────────────────────────────────────────────────────────────────
  //  1  buyMarket(symbol, volume)   ⚠ opens a REAL market order on the demo acct
  //     Returns: Promise<number> — the order ticket.
  //     Throws:  MrpcError if the broker rejects it (e.g. market closed).
  // ──────────────────────────────────────────────────────────────────────────────
  let ticket;
  try {
    ticket = await sugar.buyMarket(sym, cfg.testVolume);
    console.log(`  ✓ opened order #${ticket}`);
  } catch (e) {
    console.log(`  rejected: ${e.message} (market closed? try a 24/7 symbol)`);
    return;
  }

  // ──────────────────────────────────────────────────────────────────────────────
  //  2  getPositionByTicket(ticket)  — fetch the open order
  //     Returns: Promise<OrderInfo | undefined>.
  // ──────────────────────────────────────────────────────────────────────────────
  const pos = await sugar.getPositionByTicket(ticket);
  if (pos) console.log(`  #${pos.ticket} ${pos.symbol} vol ${pos.lots} @ ${pos.openPrice}  P/L ${pos.profit.toFixed(2)}`);

  // ──────────────────────────────────────────────────────────────────────────────
  //  3  closePosition(ticket)  ⚠ closes the order in full
  //     Returns: Promise<boolean>.  Throws MrpcError on a rejection.
  // ──────────────────────────────────────────────────────────────────────────────
  await sugar.closePosition(ticket);
  console.log('  ✓ closed');
};
