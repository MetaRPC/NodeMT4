/*══════════════════════════════════════════════════════════════════════════════
 FILE: 16_usercode.js - YOUR SANDBOX (write your own code here)

 PURPOSE:
   A ready-to-edit scratchpad. `sugar` arrives already connected and exposes all
   three layers: sugar / sugar.service() / sugar.account(). Add your logic in the
   marked block. Nothing trades until you uncomment a trading call.

 🚀 RUN:  node examples/demos/main.js 16
══════════════════════════════════════════════════════════════════════════════*/

'use strict';

const { printSub } = require('../helpers/connection');

module.exports = async function demo(sugar, cfg) {
  printSub('Sandbox — write your own code');

  // ────────────────────────────────────────────────────────────────────────────
  //  YOUR CODE HERE — sugar is already connected.
  console.log(`  balance ${(await sugar.getBalance()).toFixed(2)}   equity ${(await sugar.getEquity()).toFixed(2)}`);
  console.log(`  ${cfg.testSymbol}  bid ${await sugar.getBid(cfg.testSymbol)}  ask ${await sugar.getAsk(cfg.testSymbol)}`);

  for (const p of await sugar.getOpenPositions()) {
    console.log(`  #${p.ticket} ${p.symbol} vol ${p.lots} P/L ${p.profit.toFixed(2)}`);
  }

  //  Mid level: const a = await sugar.service().getAccountInfo();
  //  Low level: const s = await sugar.account().accountSummary();

  //  ⚠ Trading (uncomment to place a tiny demo order, then close it):
  //  const t = await sugar.buyMarket(cfg.testSymbol, cfg.testVolume);
  //  await sugar.closePosition(t);
  // ────────────────────────────────────────────────────────────────────────────
};
