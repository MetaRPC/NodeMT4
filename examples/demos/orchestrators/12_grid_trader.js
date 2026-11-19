/*══════════════════════════════════════════════════════════════════════════════
 FILE: 12_grid_trader.js - ORCHESTRATOR: GRID TRADER  ⚠ places demo pending orders

 PURPOSE:
   Lay a symmetric grid of pending orders around price — buy-limits below and
   sell-limits above, `levels` each side, `stepPips` apart — list them, then
   delete the whole grid.

 PATTERN:
   read bid/ask → place buyLimit/sellLimit per level → list pendings →
   closePosition(ticket) deletes each pending.

 ⚠ SAFETY: places small live pending orders on the demo account and deletes them.
 🚀 RUN:  node examples/demos/main.js 12
══════════════════════════════════════════════════════════════════════════════*/

'use strict';

const { printSub } = require('../helpers/connection');

module.exports = async function demo(sugar, cfg, opts = {}) {
  const sym = cfg.testSymbol;
  const levels = opts.levels ?? 2;
  const stepPips = opts.stepPips ?? 20;
  const volume = cfg.testVolume;

  await sugar.service().symbolSelect(sym, true);
  const info = await sugar.getSymbolInfo(sym);
  const pip = info.point * (info.digits === 3 || info.digits === 5 ? 10 : 1);
  const bid = await sugar.getBid(sym), ask = await sugar.getAsk(sym);

  printSub(`place grid around ${bid.toFixed(info.digits)} (${levels} levels/side, ${stepPips} pips)`);

  // ──────────────────────────────────────────────────────────────────────────────
  //  1  buyLimit(sym, vol, price) / sellLimit(sym, vol, price)  ⚠ REAL pending orders
  //     A buy-limit `i` steps below and a sell-limit `i` steps above, per level.
  //     Each returns: Promise<number> — the pending-order ticket.
  // ──────────────────────────────────────────────────────────────────────────────
  const tickets = [];
  for (let i = 1; i <= levels; i++) {
    const below = bid - i * stepPips * pip;
    const above = ask + i * stepPips * pip;
    try { tickets.push(await sugar.buyLimit(sym, volume, below)); console.log(`  buyLimit  @ ${below.toFixed(info.digits)}`); } catch (e) { console.log(`  buyLimit rejected: ${e.message}`); }
    try { tickets.push(await sugar.sellLimit(sym, volume, above)); console.log(`  sellLimit @ ${above.toFixed(info.digits)}`); } catch (e) { console.log(`  sellLimit rejected: ${e.message}`); }
  }
  if (!tickets.length) { console.log('  nothing placed (market closed / too close to price?)'); return; }

  // ──────────────────────────────────────────────────────────────────────────────
  //  2  service().pendingOrders()  — count the live pending orders
  //     Returns: OrderInfo[] (the pending orders, types 2-5).
  // ──────────────────────────────────────────────────────────────────────────────
  await new Promise((r) => setTimeout(r, 600));
  const orders = await sugar.service().pendingOrders();
  console.log(`  pending orders now live: ${orders.length}`);

  // ──────────────────────────────────────────────────────────────────────────────
  //  3  closePosition(ticket)  ⚠ deletes each pending order we placed
  //     (the same call closes a market order or deletes a pending, by ticket).
  // ──────────────────────────────────────────────────────────────────────────────
  printSub('clean up');
  let removed = 0;
  for (const t of tickets) { try { await sugar.closePosition(t); removed++; } catch { /* already gone */ } }
  console.log(`  removed ${removed}/${tickets.length} grid orders`);
};
