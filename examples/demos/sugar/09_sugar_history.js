/*══════════════════════════════════════════════════════════════════════════════
 FILE: 09_sugar_history.js - HIGH-LEVEL (MT4Sugar) HISTORY & STATS DEMO (read-only)

 PURPOSE:
   Closed-order history and profit over ready-made windows, plus today's win/loss
   summary. Opens nothing.

 📚 WHAT THIS DEMO COVERS (3 regions):
   REGION 1: CLOSED BY WINDOW - getDealsToday / getDealsThisWeek / getDealsThisMonth
   REGION 2: PROFIT BY WINDOW - getProfitToday / getProfitThisWeek / getProfitThisMonth
   REGION 3: DAILY SUMMARY    - getDailyStats

 🚀 RUN:  node examples/demos/main.js 9     ℹ️ SAFE: read-only.
══════════════════════════════════════════════════════════════════════════════*/

'use strict';

const { printSub } = require('../helpers/connection');

module.exports = async function demo(sugar) {
  // ════════════════════════════════════════════════════════════════════════════
  //  REGION 1: CLOSED ORDERS BY WINDOW
  // ════════════════════════════════════════════════════════════════════════════
  printSub('1. closed orders by window');

  // ──────────────────────────────────────────────────────────────────────────────
  //  1.1  getDealsToday() / getDealsThisWeek() / getDealsThisMonth()
  //       Closed orders in the window (local-day boundaries). → Promise<OrderInfo[]>
  // ──────────────────────────────────────────────────────────────────────────────
  const [today, week, month] = await Promise.all([
    sugar.getDealsToday(), sugar.getDealsThisWeek(), sugar.getDealsThisMonth(),
  ]);
  console.log(`  today ${today.length}   this week ${week.length}   this month ${month.length}`);

  // ════════════════════════════════════════════════════════════════════════════
  //  REGION 2: PROFIT BY WINDOW
  // ════════════════════════════════════════════════════════════════════════════
  printSub('2. profit by window');

  // ──────────────────────────────────────────────────────────────────────────────
  //  2.1  getProfitToday() / getProfitThisWeek() / getProfitThisMonth()
  //       Net profit of the orders closed in the window.  → number
  // ──────────────────────────────────────────────────────────────────────────────
  console.log(`  today ${(await sugar.getProfitToday()).toFixed(2)}   week ${(await sugar.getProfitThisWeek()).toFixed(2)}   month ${(await sugar.getProfitThisMonth()).toFixed(2)}`);

  // ════════════════════════════════════════════════════════════════════════════
  //  REGION 3: DAILY SUMMARY
  // ════════════════════════════════════════════════════════════════════════════
  printSub('3. getDailyStats()');

  // ──────────────────────────────────────────────────────────────────────────────
  //  3.1  getDailyStats()  — today's win/loss summary
  //       Returns: DailyStats { totalDeals, winningDeals, losingDeals, winRate,
  //                             totalProfit, bestDeal, worstDeal }.
  // ──────────────────────────────────────────────────────────────────────────────
  const s = await sugar.getDailyStats();
  console.log(`  deals ${s.totalDeals}  win ${s.winningDeals}/${s.totalDeals} (${s.winRate.toFixed(1)}%)  net ${s.totalProfit.toFixed(2)}  best ${s.bestDeal.toFixed(2)}  worst ${s.worstDeal.toFixed(2)}`);
};
