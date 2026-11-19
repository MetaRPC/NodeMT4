/*══════════════════════════════════════════════════════════════════════════════
 FILE: 03_streaming_methods.js - LOW-LEVEL (MT4Account) STREAMING DEMO

 PURPOSE:
   The raw server streams of MT4Account. Each subscribe method takes a protobuf
   Request and delivers the raw *Data of every reply to your callback; it returns
   a Subscription with unsubscribe(). Errors (and an unexpected end) go to onError.

 📚 WHAT THIS DEMO COVERS:
   onSymbolTick   - live ticks for a few seconds
   onOpenedOrdersTickets - a periodic snapshot of open ticket numbers

 🔄 API LEVELS:  LOW (THIS FILE, raw gRPC) → MID (MT4Service) → HIGH (MT4Sugar)
 🚀 RUN:  node examples/demos/main.js 3     ℹ️ SAFE: read-only, ~6 s.
══════════════════════════════════════════════════════════════════════════════*/

'use strict';

const { printSub, sdk, C } = require('../helpers/connection');
const { SubscriptionsPb } = sdk;

module.exports = async function demo(sugar, cfg) {
  const acc = sugar.account();
  const sym = cfg.testSymbol;

  // ════════════════════════════════════════════════════════════════════════════
  //  1)  onSymbolTick(req, onData, onError)  — raw tick stream
  //      Build a SubscriptionsPb.OnSymbolTickRequest (setSymbolNamesList).
  //      Each `data` carries getSymbolTick() → getBid()/getAsk()/getSymbol().
  //      Returns a Subscription; call unsubscribe() to stop.
  // ════════════════════════════════════════════════════════════════════════════
  printSub(`1. onSymbolTick — ${sym} for ~4 s`);
  await new Promise((resolve) => {
    const req = new SubscriptionsPb.OnSymbolTickRequest();
    req.setSymbolNamesList([sym]);
    let n = 0;
    const sub = acc.onSymbolTick(req, (data) => {
      const t = data.getSymbolTick && data.getSymbolTick();
      if (!t) return;
      if (n++ < 5) console.log(`  tick ${t.getSymbol()}  bid ${t.getBid()}  ask ${t.getAsk()}`);
    }, (e) => console.log(`${C.yellow}  stream error: ${e.message || e}${C.reset}`));
    setTimeout(() => { sub.unsubscribe(); console.log(`  ${C.green}✓ received ${n} ticks${C.reset}`); resolve(); }, 4000);
  });

  // ════════════════════════════════════════════════════════════════════════════
  //  2)  onOpenedOrdersTickets(req, onData, onError)  — periodic ticket snapshot
  //      SubscriptionsPb.OnOpenedOrdersTicketsRequest (setPullIntervalMilliseconds).
  //      Each `data`: getPositionTicketsList() / getPendingOrderTicketsList().
  // ════════════════════════════════════════════════════════════════════════════
  printSub('2. onOpenedOrdersTickets — one snapshot');
  await new Promise((resolve) => {
    const req = new SubscriptionsPb.OnOpenedOrdersTicketsRequest();
    req.setPullIntervalMilliseconds(1000);
    const sub = acc.onOpenedOrdersTickets(req, (data) => {
      console.log(`  open: ${data.getPositionTicketsList().length}  pending: ${data.getPendingOrderTicketsList().length}`);
      sub.unsubscribe();
      resolve();
    }, (e) => { console.log(`${C.yellow}  stream error: ${e.message || e}${C.reset}`); resolve(); });
    setTimeout(() => { sub.unsubscribe(); resolve(); }, 4000);   // safety timeout
  });
};
