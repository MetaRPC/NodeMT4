/*══════════════════════════════════════════════════════════════════════════════
 FILE: 01_general_operations.js - LOW-LEVEL (MT4Account) INFORMATION DEMO

 PURPOSE:
   Read-only tour of the low-level layer: account, symbols & market data straight
   off MT4Account, where methods take a protobuf Request and return raw protobuf
   *Data (you read fields with getXxx() accessors). No trading here (see 02).

 📚 WHAT THIS DEMO COVERS (3 regions):
   REGION 1: ACCOUNT  - accountSummary / serverTimezone
   REGION 2: SYMBOLS  - symbols / symbolSelect / quote / symbolParamsMany
   REGION 3: STATE    - openedOrders / openedOrdersTickets

 🔄 API LEVELS:  LOW (THIS FILE, raw gRPC) → MID (MT4Service) → HIGH (MT4Sugar)
 🚀 RUN:  node examples/demos/main.js 1     ℹ️ SAFE: read-only.
══════════════════════════════════════════════════════════════════════════════*/

'use strict';

const { printSub, sdk } = require('../helpers/connection');
const { MarketInfoPb, AccountHelperPb } = sdk;

module.exports = async function demo(sugar, cfg) {
  const acc = sugar.account();                 // the low-level MT4Account
  const sym = cfg.testSymbol;

  // ════════════════════════════════════════════════════════════════════════════
  //  REGION 1: ACCOUNT INFORMATION
  // ════════════════════════════════════════════════════════════════════════════
  printSub('1. account');

  // ──────────────────────────────────────────────────────────────────────────────
  //  1.1  accountSummary()  — all account data in one call
  //       Returns: raw AccountSummaryData. Read fields with getAccountLogin(),
  //       getAccountBalance(), getAccountEquity(), getAccountLeverage(), …
  //       NOTE: MT4's summary has no margin fields — those come from the streams.
  // ──────────────────────────────────────────────────────────────────────────────
  const s = await acc.accountSummary();
  console.log(`  login ${s.getAccountLogin()}  ${s.getAccountCurrency()}  balance ${s.getAccountBalance().toFixed(2)}  equity ${s.getAccountEquity().toFixed(2)}  leverage 1:${s.getAccountLeverage()}`);

  // ──────────────────────────────────────────────────────────────────────────────
  //  1.2  serverTimezone()  — the broker server's UTC offset
  //       Returns: raw ServerTimezoneData (getUtcOffsetSeconds() / getServer()).
  //       Every MT4 timestamp is server time; this is how you convert to UTC.
  // ──────────────────────────────────────────────────────────────────────────────
  const tz = await acc.serverTimezone();
  console.log(`  server ${tz.getServer()}  UTC offset ${(Number(tz.getUtcOffsetSeconds()) / 3600).toFixed(1)} h`);

  // ════════════════════════════════════════════════════════════════════════════
  //  REGION 2: SYMBOL INFORMATION & OPERATIONS
  // ════════════════════════════════════════════════════════════════════════════
  printSub('2. symbols');

  // ──────────────────────────────────────────────────────────────────────────────
  //  2.1  symbols()  — the broker's symbol list
  //       Returns: raw SymbolsData; iterate getSymbolnameinfosList().
  // ──────────────────────────────────────────────────────────────────────────────
  const syms = await acc.symbols();
  console.log(`  broker exposes ${syms.getSymbolnameinfosList().length} symbols`);

  // ──────────────────────────────────────────────────────────────────────────────
  //  2.2  symbolSelect(req)  — add/remove a symbol in Market Watch
  //       Build a MarketInfoPb.SymbolSelectRequest (setSymbol / setSelect).
  //       Returns: raw SymbolSelectData (getSuccess()).
  // ──────────────────────────────────────────────────────────────────────────────
  const selReq = new MarketInfoPb.SymbolSelectRequest();
  selReq.setSymbol(sym);
  selReq.setSelect(true);
  await acc.symbolSelect(selReq);

  // ──────────────────────────────────────────────────────────────────────────────
  //  2.3  quote(req)  — the latest tick for one symbol
  //       Build a MarketInfoPb.QuoteRequest (setSymbol).
  //       Returns: raw QuoteData (getBid() / getAsk() / getDateTime()).
  // ──────────────────────────────────────────────────────────────────────────────
  const qReq = new MarketInfoPb.QuoteRequest();
  qReq.setSymbol(sym);
  const q = await acc.quote(qReq);
  console.log(`  ${sym}  bid ${q.getBid()}  ask ${q.getAsk()}`);

  // ──────────────────────────────────────────────────────────────────────────────
  //  2.4  symbolParamsMany(req)  — contract spec of one/all symbols
  //       An empty request returns every symbol; set a name for just one.
  //       Returns: raw data; iterate getSymbolInfosList() → getDigits()/getPoint()/…
  // ──────────────────────────────────────────────────────────────────────────────
  const pReq = new AccountHelperPb.SymbolParamsManyRequest();
  pReq.setSymbolName(sym);
  const params = await acc.symbolParamsMany(pReq);
  const info = params.getSymbolInfosList().find((x) => x.getSymbolname() === sym) || params.getSymbolInfosList()[0];
  if (info) {
    console.log(`  digits ${info.getDigits()}  point ${info.getPoint()}  contract ${info.getTradecontractsize()}  volMin ${info.getVolumemin()}  volStep ${info.getVolumestep()}`);
  }

  // ════════════════════════════════════════════════════════════════════════════
  //  REGION 3: OPEN STATE (orders)
  // ════════════════════════════════════════════════════════════════════════════
  printSub('3. open state');

  // ──────────────────────────────────────────────────────────────────────────────
  //  3.1  openedOrders()        — all open market + pending orders
  //       Returns: raw OpenedOrdersData (getOrderInfosList()).
  //  3.2  openedOrdersTickets() — just the ticket numbers
  //       Returns: raw OpenedOrdersTicketsData (getTicketsList()).
  // ──────────────────────────────────────────────────────────────────────────────
  const opened = await acc.openedOrders();
  console.log(`  open + pending orders: ${opened.getOrderInfosList().length}`);
  const tickets = await acc.openedOrdersTickets();
  console.log(`  ticket numbers: ${tickets.getTicketsList().length}`);
};
