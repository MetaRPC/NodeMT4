/*══════════════════════════════════════════════════════════════════════════════
 FILE: 04_service_demo.js - MID-LEVEL (MT4Service) FRIENDLY DEMO

 PURPOSE:
   The same reads as the low-level demo, but through MT4Service: plain arguments
   in, typed objects out (AccountInfo, Quote, SymbolParams, Bar, OrderInfo…) — no
   protobuf, no getXxx() accessors.

 📚 WHAT THIS DEMO COVERS (4 regions):
   REGION 1: ACCOUNT  - getAccountInfo → AccountInfo
   REGION 2: MARKET   - quote → Quote · symbolParams → SymbolParams · lastBars → Bar[] · getServerTimezone
   REGION 3: STATE    - openedOrders / positions / pendingOrders → OrderInfo[]
   REGION 4: STATS    - getTradeStats → TradeStats · getEquityHistory → EquityPoint[]

 🚀 RUN:  node examples/demos/main.js 4     ℹ️ SAFE: read-only.
══════════════════════════════════════════════════════════════════════════════*/

'use strict';

const { printSub } = require('../helpers/connection');

module.exports = async function demo(sugar, cfg) {
  const svc = sugar.service();                   // the friendly MT4Service
  const sym = cfg.testSymbol;

  // ════════════════════════════════════════════════════════════════════════════
  //  REGION 1: ACCOUNT
  // ════════════════════════════════════════════════════════════════════════════
  printSub('1. account');

  // ──────────────────────────────────────────────────────────────────────────────
  //  1.1  getAccountInfo()  — all account data as one friendly object
  //       Returns: AccountInfo { login, currency, balance, equity, credit,
  //                              leverage, tradeMode, serverTime, utcServerShiftMinutes }.
  //       (MT4 has no margin in the summary — see the streaming demo for that.)
  // ──────────────────────────────────────────────────────────────────────────────
  const a = await svc.getAccountInfo();
  console.log(`  ${a.login}  ${a.currency}  balance ${a.balance.toFixed(2)}  equity ${a.equity.toFixed(2)}  leverage 1:${a.leverage}  ${a.tradeMode}`);

  // ════════════════════════════════════════════════════════════════════════════
  //  REGION 2: MARKET DATA
  // ════════════════════════════════════════════════════════════════════════════
  printSub('2. price, spec & bars');

  // ──────────────────────────────────────────────────────────────────────────────
  //  2.1  symbolSelect(sym, true) — ensure it is in Market Watch   → boolean
  //  2.2  quote(sym)              — latest tick     → Quote { bid, ask, high, low, time }
  //  2.3  symbolParams(sym)       — contract spec   → SymbolParams { digits, point, … }
  // ──────────────────────────────────────────────────────────────────────────────
  await svc.symbolSelect(sym, true);
  const q = await svc.quote(sym);
  const sp = await svc.symbolParams(sym);
  console.log(`  ${sym}  bid ${q.bid}  ask ${q.ask}  digits ${sp.digits}  contract ${sp.contractSize}  volMin ${sp.volumeMin}`);

  // ──────────────────────────────────────────────────────────────────────────────
  //  2.4  lastBars(sym, timeframe, count, shiftMin) — the newest N OHLC bars
  //       Returns: Bar[] { time, open, high, low, close, tickVolume, … }.
  //  2.5  getServerTimezone() — broker UTC offset → ServerTimezone { utcOffsetMinutes, … }
  // ──────────────────────────────────────────────────────────────────────────────
  const bars = await svc.lastBars(sym, 'H1', 5, a.utcServerShiftMinutes);
  for (const b of bars) console.log(`  ${new Date(b.time * 1000).toISOString().slice(0, 16)}  O ${b.open}  H ${b.high}  L ${b.low}  C ${b.close}`);
  const tz = await svc.getServerTimezone();
  console.log(`  server ${tz.server}  UTC offset ${(tz.utcOffsetMinutes / 60).toFixed(1)} h`);

  // ════════════════════════════════════════════════════════════════════════════
  //  REGION 3: OPEN STATE
  // ════════════════════════════════════════════════════════════════════════════
  printSub('3. open state');

  // ──────────────────────────────────────────────────────────────────────────────
  //  3.1  openedOrders()  — all open + pending orders → OrderInfo[]
  //  3.2  positions()     — open market orders (types BUY/SELL) → OrderInfo[]
  //  3.3  pendingOrders() — pending orders (types 2-5)          → OrderInfo[]
  // ──────────────────────────────────────────────────────────────────────────────
  const [open, pos, pend] = await Promise.all([svc.openedOrders(), svc.positions(), svc.pendingOrders()]);
  console.log(`  open+pending ${open.length}   market ${pos.length}   pending ${pend.length}`);
  for (const p of pos.slice(0, 5)) console.log(`    #${p.ticket} ${p.symbol} vol ${p.lots} P/L ${p.profit.toFixed(2)}`);

  // ════════════════════════════════════════════════════════════════════════════
  //  REGION 4: TRADE STATISTICS (the TradeStats service)
  // ════════════════════════════════════════════════════════════════════════════
  printSub('4. statistics (last 30 days)');

  // ──────────────────────────────────────────────────────────────────────────────
  //  4.1  getTradeStats(from)    — aggregated stats → TradeStats
  //  4.2  getEquityHistory(from) — the equity curve → EquityPoint[]
  // ──────────────────────────────────────────────────────────────────────────────
  const from = new Date(Date.now() - 30 * 24 * 3600 * 1000);
  const stats = await svc.getTradeStats(from);
  console.log(`  trades ${stats.trades}  profit factor ${stats.profitFactor.toFixed(2)}  growth ${stats.growthPercent.toFixed(2)}%  best ${stats.bestTrade.toFixed(2)}  worst ${stats.worstTrade.toFixed(2)}`);
  const eq = await svc.getEquityHistory(from);
  console.log(`  equity-curve points: ${eq.length}`);
};
