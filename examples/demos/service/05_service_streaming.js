/*══════════════════════════════════════════════════════════════════════════════
 FILE: 05_service_streaming.js - MID-LEVEL (MT4Service) STREAMING DEMO

 PURPOSE:
   Friendly streams: subscribeQuotes delivers typed Tick objects (not raw
   protobuf); subscribeTrades delivers trade events; subscribeOpenedOrdersProfit
   gives a live account snapshot WITH margin (which AccountSummary lacks on MT4).
   Each returns a { unsubscribe } handle.

 📚 WHAT THIS DEMO COVERS (3 streams):
   • subscribeQuotes([sym], cb)        → Tick per tick
   • subscribeTrades(cb)               → trade events (background)
   • subscribeOpenedOrdersProfit(ms,cb)→ one live account snapshot (margin)

 🚀 RUN:  node examples/demos/main.js 5     ℹ️ SAFE: read-only.
══════════════════════════════════════════════════════════════════════════════*/

'use strict';

const { printSub, C } = require('../helpers/connection');

module.exports = async function demo(sugar, cfg) {
  const svc = sugar.service();
  const sym = cfg.testSymbol;
  await svc.symbolSelect(sym, true);

  // ──────────────────────────────────────────────────────────────────────────────
  //  1  subscribeQuotes([sym], cb, onError)  — live ticks as typed Quote/Tick
  //     cb receives { symbol, bid, ask, last, time, timeUtc } per tick.
  //     Returns: { unsubscribe } — keep it to cancel later.
  // ──────────────────────────────────────────────────────────────────────────────
  printSub(`subscribeQuotes(['${sym}']) → Tick — streaming ~5s`);
  let n = 0;
  const ticks = svc.subscribeQuotes([sym], (t) => {
    n++; if (n <= 5) console.log(`  ${t.symbol}  bid ${t.bid}  ask ${t.ask}  @ ${new Date(t.time).toISOString().slice(11, 23)}`);
  }, (e) => console.log(`  tick error: ${e.message || e}`));

  // ──────────────────────────────────────────────────────────────────────────────
  //  2  subscribeTrades(cb, onError)  — trade events (fills, modifications, closes)
  //     cb receives { type, newOrders, updatedOrders, removedOrders, account }.
  // ──────────────────────────────────────────────────────────────────────────────
  printSub('subscribeTrades() — trade events (background)');
  const trades = svc.subscribeTrades((ev) => console.log(`  trade event type ${ev.type}  (+${ev.newOrders.length} new, ${ev.removedOrders.length} removed)`),
    (e) => console.log(`  trade error: ${e.message || e}`));

  // ──────────────────────────────────────────────────────────────────────────────
  //  3  subscribeOpenedOrdersProfit(ms, cb, onError)  — live account incl. margin
  //     One snapshot is enough to read margin / free margin / margin level.
  // ──────────────────────────────────────────────────────────────────────────────
  printSub('subscribeOpenedOrdersProfit() — one live account snapshot');
  await new Promise((resolve) => {
    const sub = svc.subscribeOpenedOrdersProfit(1000, (ev) => {
      if (ev.account) console.log(`  ${C.green}equity ${Number(ev.account.equity).toFixed(2)}  margin ${Number(ev.account.margin).toFixed(2)}  free ${Number(ev.account.freeMargin).toFixed(2)}${C.reset}`);
      sub.unsubscribe();
      resolve();
    }, () => resolve());
    setTimeout(() => { sub.unsubscribe(); resolve(); }, 4000);   // safety timeout
  });

  // ── let the tick / trade streams run, then cancel both ──────────────────────
  await new Promise((r) => setTimeout(r, 5000));
  ticks.unsubscribe();
  trades.unsubscribe();
  console.log(`\n  received ${n} ticks in ~5s`);
};
