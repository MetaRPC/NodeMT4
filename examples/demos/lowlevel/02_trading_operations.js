/*══════════════════════════════════════════════════════════════════════════════
 FILE: 02_trading_operations.js - LOW-LEVEL (MT4Account) TRADING DEMO

 PURPOSE:
   The raw trading surface of MT4Account: build a protobuf OrderSendRequest, send
   it, then modify and close it — all with getXxx()/setXxx() on protobuf messages.
   Trades are routed through tradeCall(), so a transport failure becomes a
   TradeOutcomeUnknownError (the trade is NEVER re-sent).

 📚 WHAT THIS DEMO COVERS:
   orderSend → orderModify → orderCloseDelete   (one tiny, self-closing order)

 🔄 API LEVELS:  LOW (THIS FILE, raw gRPC) → MID (MT4Service) → HIGH (MT4Sugar)
 🚀 RUN:  node examples/demos/main.js 2     ⚠️ PLACES A REAL (demo) ORDER — tiny volume, self-closing.
══════════════════════════════════════════════════════════════════════════════*/

'use strict';

const { printSub, sdk, C } = require('../helpers/connection');
const { MarketInfoPb, TradingHelperPb, ORDER_TYPES } = sdk;

module.exports = async function demo(sugar, cfg) {
  const acc = sugar.account();
  const sym = cfg.testSymbol;
  const volume = cfg.testVolume;

  // ──────────────────────────────────────────────────────────────────────────────
  //  0)  A market order needs a price — read the current ask (raw quote()).
  // ──────────────────────────────────────────────────────────────────────────────
  const qReq = new MarketInfoPb.QuoteRequest();
  qReq.setSymbol(sym);
  const q = await acc.quote(qReq);
  console.log(`  ${sym}  bid ${q.getBid()}  ask ${q.getAsk()}`);

  // ════════════════════════════════════════════════════════════════════════════
  //  1)  orderSend(req)  — open a market BUY
  //      Build a TradingHelperPb.OrderSendRequest: setSymbol / setOperationType
  //      (OC_OP_BUY) / setVolume / setPrice. Returns raw OrderSendData (getTicket()).
  // ════════════════════════════════════════════════════════════════════════════
  printSub('1. orderSend (market BUY)');
  const sendReq = new TradingHelperPb.OrderSendRequest();
  sendReq.setSymbol(sym);
  sendReq.setOperationType(ORDER_TYPES.BUY);     // 0 = OP_BUY
  sendReq.setVolume(volume);
  sendReq.setPrice(q.getAsk());
  sendReq.setSlippage(30);
  sendReq.setComment('NodeMT4 lowlevel demo');
  const sent = await acc.orderSend(sendReq);
  const ticket = Number(sent.getTicket());
  console.log(`${C.green}  ✓ opened ticket #${ticket} at ${sent.getPrice()}${C.reset}`);

  // ════════════════════════════════════════════════════════════════════════════
  //  2)  orderModify(req)  — attach a stop-loss
  //      TradingHelperPb.OrderModifyRequest: setOrderTicket / setNewStopLoss.
  //      Returns raw OrderModifyData (getOrderWasModified()).
  // ════════════════════════════════════════════════════════════════════════════
  printSub('2. orderModify (set stop-loss)');
  const digits = 5;
  const sl = +(q.getBid() - 0.0050).toFixed(digits);     // ~50 pips below
  const modReq = new TradingHelperPb.OrderModifyRequest();
  modReq.setOrderTicket(ticket);
  modReq.setNewStopLoss(sl);
  const mod = await acc.orderModify(modReq);
  console.log(`  stop-loss ${sl} → modified: ${mod.getOrderWasModified()}`);

  // ════════════════════════════════════════════════════════════════════════════
  //  3)  orderCloseDelete(req)  — close the whole order at the bid
  //      TradingHelperPb.OrderCloseDeleteRequest: setOrderTicket / setLots /
  //      setClosingPrice. Returns raw OrderCloseDeleteData (getMode()).
  // ════════════════════════════════════════════════════════════════════════════
  printSub('3. orderCloseDelete (close)');
  const close = new MarketInfoPb.QuoteRequest();
  close.setSymbol(sym);
  const q2 = await acc.quote(close);               // fresh bid to close a BUY
  const closeReq = new TradingHelperPb.OrderCloseDeleteRequest();
  closeReq.setOrderTicket(ticket);
  closeReq.setLots(volume);
  closeReq.setClosingPrice(q2.getBid());
  closeReq.setSlippage(30);
  const closed = await acc.orderCloseDelete(closeReq);
  console.log(`${C.green}  ✓ closed (mode ${closed.getMode()})${C.reset}`);
};
