/*══════════════════════════════════════════════════════════════════════════════
 FILE: 11_trailing_stop.js - ORCHESTRATOR: TRAILING STOP  ⚠ opens a demo order

 PURPOSE:
   Open one market BUY, then ratchet its stop-loss up as price advances (never
   down), and close it at the end. The classic "let winners run, cap the downside".

 PATTERN:
   buyMarket → loop(cycles): read bid → wantSL = bid - trailPips·pip →
   if wantSL > bestSL: modifyPositionSL → close.

 ⚠ SAFETY: runs a live cfg.testVolume trade on the demo account and closes it.
 🚀 RUN:  node examples/demos/main.js 11
══════════════════════════════════════════════════════════════════════════════*/

'use strict';

const { printSub } = require('../helpers/connection');

module.exports = async function demo(sugar, cfg, opts = {}) {
  const sym = cfg.testSymbol;
  const trailPips = opts.trailPips ?? 20;
  const cycles = opts.cycles ?? 8;
  const intervalMs = opts.intervalMs ?? 700;

  await sugar.service().symbolSelect(sym, true);
  const info = await sugar.getSymbolInfo(sym);
  const pip = info.point * (info.digits === 3 || info.digits === 5 ? 10 : 1);

  printSub('open & trail');

  // ──────────────────────────────────────────────────────────────────────────────
  //  1  buyMarket(symbol, volume)   ⚠ opens a REAL demo order to trail
  //     Returns: Promise<number> — the order ticket. Throws on a rejection.
  // ──────────────────────────────────────────────────────────────────────────────
  let ticket;
  try { ticket = await sugar.buyMarket(sym, cfg.testVolume); }
  catch (e) { console.log(`  rejected (market closed?): ${e.message}`); return; }
  console.log(`  opened #${ticket}`);

  // ──────────────────────────────────────────────────────────────────────────────
  //  2  each cycle: getPositionByTicket (still open?) · getBid (price) ·
  //     modifyPositionSL(ticket, sl) — raise the stop only when it moves up.
  //     modifyPositionSL returns: Promise<boolean>.
  // ──────────────────────────────────────────────────────────────────────────────
  let bestSL = 0;
  for (let c = 1; c <= cycles; c++) {
    await new Promise((r) => setTimeout(r, intervalMs));
    const pos = await sugar.getPositionByTicket(ticket);
    if (!pos) { console.log('  order gone (closed elsewhere)'); return; }
    const bid = await sugar.getBid(sym);
    const wantSL = bid - trailPips * pip;
    if (wantSL > bestSL) {
      bestSL = wantSL;
      const ok = await sugar.modifyPositionSL(ticket, bestSL);
      console.log(`  cycle ${c}  bid ${bid.toFixed(info.digits)}  raise SL → ${bestSL.toFixed(info.digits)} ${ok ? '✓' : '(failed)'}`);
    } else {
      console.log(`  cycle ${c}  bid ${bid.toFixed(info.digits)}  SL held at ${bestSL.toFixed(info.digits)}`);
    }
  }

  // ──────────────────────────────────────────────────────────────────────────────
  //  3  closePosition(ticket)  ⚠ closes the trailed order at the end
  //     Returns: Promise<boolean>. Throws MrpcError on a rejection.
  // ──────────────────────────────────────────────────────────────────────────────
  printSub('close');
  await sugar.closePosition(ticket);
  console.log(`  closed #${ticket}`);
};
