// Unit tests of MT4Client against an in-process gRPC server (no network, no MRPC account): the server implements the
// services the client calls with the SDK's own generated definitions, records what the client sent and answers with
// data or with an error reply.
const { test, before, after } = require('node:test');
const assert = require('node:assert');
const grpc = require('@grpc/grpc-js');
const { MT4Client, MrpcError, MT4Error } = require('../src/index.js');
// The service definitions and messages straight from the generated stubs: the server side does not depend on the client.
const ConnectionGrpc = require('../package/mt4-term-api-connection_grpc_pb');
const ConnectionPb = require('../package/mt4-term-api-connection_pb');
const AccountHelperGrpc = require('../package/mt4-term-api-account-helper_grpc_pb');
const AccountHelperPb = require('../package/mt4-term-api-account-helper_pb');
const TradingHelperGrpc = require('../package/mt4-term-api-trading-helper_grpc_pb');
const TradingHelperPb = require('../package/mt4-term-api-trading-helper_pb');
const SubscriptionsGrpc = require('../package/mt4-term-api-subscriptions_grpc_pb');
const SubscriptionsPb = require('../package/mt4-term-api-subscriptions_pb');
const MarketInfoGrpc = require('../package/mt4-term-api-market-info_grpc_pb');
const MarketInfoPb = require('../package/mt4-term-api-market-info_pb');
const ErrorPb = require('../package/mrpc-mt4-error_pb');
const { Timestamp } = require('google-protobuf/google/protobuf/timestamp_pb');

const TERMINAL = 'mt4_live_0123456789abcdef0123456789abcdef';
const seen = [];          // { method, request, apikey, id }
let failNext = null;      // { code, message } -> the next unary call answers with an error reply

function record(method, call) {
  seen.push({ method, request: call.request, apikey: call.metadata.get('apikey')[0], id: call.metadata.get('id')[0] });
}

function errorReply(ReplyType) {
  const reply = new ReplyType();
  const err = new ErrorPb.Error();
  err.setErrorCode(failNext.code);
  err.setErrorMessage(failNext.message);
  if (failNext.mqlIntCode) err.setMqlErrorIntCode(failNext.mqlIntCode);
  if (failNext.mqlDescription) err.setMqlErrorDescription(failNext.mqlDescription);
  reply.setError(err);
  failNext = null;
  return reply;
}

function connectReply(ReplyType, cb) {
  if (failNext) return cb(null, errorReply(ReplyType));
  const data = new ConnectionPb.ConnectData();
  data.setTerminalInstanceGuid(TERMINAL);
  const reply = new ReplyType();
  reply.setData(data);
  cb(null, reply);
}

let server;
let port;

before(async () => {
  server = new grpc.Server();
  server.addService(ConnectionGrpc.ConnectionService, {
    connectEx: (call, cb) => { record('connectEx', call); connectReply(ConnectionPb.ConnectExReply, cb); },
    connect: (call, cb) => { record('connect', call); connectReply(ConnectionPb.ConnectReply, cb); },
    getId: (call, cb) => {
      record('getId', call);
      if (failNext) return cb(null, errorReply(ConnectionPb.GetIdReply));
      const data = new ConnectionPb.GetIdData();
      data.setId(TERMINAL);
      const reply = new ConnectionPb.GetIdReply();
      reply.setData(data);
      cb(null, reply);
    },
    disconnect: (call, cb) => {
      record('disconnect', call);
      cb(null, new ConnectionPb.DisconnectReply());
    },
  });
  server.addService(AccountHelperGrpc.AccountHelperService, {
    accountSummary: (call, cb) => {
      record('accountSummary', call);
      if (failNext) return cb(null, errorReply(AccountHelperPb.AccountSummaryReply));
      const data = new AccountHelperPb.AccountSummaryData();
      data.setAccountLogin(7689280);
      data.setAccountBalance(1000.5);
      data.setAccountEquity(990.25);
      data.setAccountUserName('Jane Trader');
      data.setAccountLeverage(100);
      data.setAccountCurrency('EUR');
      data.setAccountCredit(12.5);
      data.setAccountCompanyName('Broker Ltd');
      data.setAccountTradeMode(AccountHelperPb.EnumAccountTradeMode.ACCOUNT_TRADE_MODE_DEMO);
      data.setIsInvestor(false);
      data.setServerTime(Timestamp.fromDate(new Date(Date.UTC(2026, 9, 15, 14, 0, 0))));
      data.setUtcServerTimeShiftMinutes(120);
      const reply = new AccountHelperPb.AccountSummaryReply();
      reply.setData(data);
      cb(null, reply);
    },
  });
  server.addService(TradingHelperGrpc.TradingHelperService, {
    orderSend: (call, cb) => {
      record('orderSend', call);
      if (failNext) return cb(null, errorReply(TradingHelperPb.OrderSendReply));
      const data = new TradingHelperPb.OrderSendData();
      data.setTicket(88);
      data.setVolume(call.request.getVolume());
      data.setPrice(1.1234);
      const reply = new TradingHelperPb.OrderSendReply();
      reply.setData(data);
      cb(null, reply);
    },
  });
  server.addService(MarketInfoGrpc.MarketInfoService, {
    // orderSend asks for the quote when a market order comes without a price
    quote: (call, cb) => {
      record('quote', call);
      const data = new MarketInfoPb.QuoteData();
      data.setSymbol(call.request.getSymbol());
      data.setBid(1.1);
      data.setAsk(1.1002);
      data.setDateTime(Timestamp.fromDate(new Date(Date.UTC(2026, 9, 15, 14, 0, 0))));
      const reply = new MarketInfoPb.QuoteReply();
      reply.setData(data);
      cb(null, reply);
    },
  });
  server.addService(SubscriptionsGrpc.SubscriptionServiceService, {
    onSymbolTick: (call) => {
      record('onSymbolTick', call);
      let i = 0;
      const timer = setInterval(() => {
        const reply = new SubscriptionsPb.OnSymbolTickReply();
        if (call.request.getSymbolNamesList()[0] === 'NOSUCH') {
          const err = new ErrorPb.Error();
          err.setErrorCode('SYMBOL_NOT_FOUND');
          err.setErrorMessage('Unknown symbol NOSUCH');
          reply.setError(err);
        } else {
          const tick = new SubscriptionsPb.OnSymbolMqlTickInfo();
          tick.setSymbol(call.request.getSymbolNamesList()[i % 2]);
          tick.setBid(1.1 + i / 1000);
          tick.setAsk(1.1002 + i / 1000);
          tick.setTimeUtc(Timestamp.fromDate(new Date(Date.UTC(2026, 9, 15, 12, 0, i))));
          const data = new SubscriptionsPb.OnSymbolTickData();
          data.setSymbolTick(tick);
          reply.setData(data);
        }
        call.write(reply);
        i++;
      }, 10);
      call.on('cancelled', () => clearInterval(timer));
    },
  });
  port = await new Promise((resolve, reject) =>
    server.bindAsync('127.0.0.1:0', grpc.ServerCredentials.createInsecure(), (err, p) => (err ? reject(err) : resolve(p))));
});

after(() => server.forceShutdown());

const client = () => new MT4Client('127.0.0.1', port, 'key-1');

test('connect sends the API key, keeps the terminal id and sends it with every later call', async () => {
  seen.length = 0;
  const c = client();
  assert.strictEqual(await c.connect({ user: 123, password: 'p', server: 'TeleTrade-Demo' }), true);
  assert.strictEqual(c.id, TERMINAL);
  const connect = seen.find(s => s.method === 'connectEx');
  assert.strictEqual(connect.apikey, 'key-1');
  assert.strictEqual(connect.id, undefined);
  assert.strictEqual(connect.request.getMtClusterName(), 'TeleTrade-Demo');
  await c.getAccountInfo();
  assert.ok(seen.filter(s => s.method !== 'connectEx').every(s => s.id === TERMINAL && s.apikey === 'key-1'));
  await c.disconnect(true);
  assert.strictEqual(seen.find(s => s.method === 'disconnect').request.getDelete(), true);
});

test('connect by address uses Connect; without a server or host it refuses before calling', async () => {
  seen.length = 0;
  const c = client();
  await c.connect({ user: 123, password: 'p', host: '10.0.0.1', port: 443 });
  const sent = seen.find(s => s.method === 'connect').request;
  assert.strictEqual(sent.getHost(), '10.0.0.1');
  await assert.rejects(client().connect(123, 'p'), /server/);
  assert.strictEqual(seen.length, 1);
});

test('account info is what the server answered, with the broker server connected to', async () => {
  const c = client();
  await c.connect(123, 'p', 'TeleTrade-Demo');
  assert.deepStrictEqual(await c.getAccountInfo(), {
    login: 7689280, currency: 'EUR', balance: 1000.5, equity: 990.25, credit: 12.5, leverage: 100, name: 'Jane Trader', server: 'TeleTrade-Demo',
    company: 'Broker Ltd', tradeMode: 'DEMO', tradeModeCode: 0, isInvestor: false,
    serverTime: Date.UTC(2026, 9, 15, 14, 0, 0) / 1000, utcServerShiftMinutes: 120,
  });
});

test('an error reply is an error - also for the key and login that used to get invented answers', async () => {
  const c = new MT4Client('127.0.0.1', port, 'mrpc_test_key');
  failNext = { code: 'CONNECT_INVALID_LOGIN_ERROR', message: 'Invalid account' };
  await assert.rejects(c.connect(100234, 'demo_password', 'TeleTrade-Demo'), (e) => e instanceof MrpcError && e.code === 'CONNECT_INVALID_LOGIN_ERROR');
  assert.strictEqual(c.connected, false);
  assert.strictEqual(c.id, null);

  await c.connect({ user: 100234, password: 'p', server: 'TeleTrade-Demo' });
  failNext = { code: 'TERMINAL_INSTANCE_NOT_FOUND', message: 'no terminal' };
  await assert.rejects(c.getAccountInfo(), (e) => e.code === 'TERMINAL_INSTANCE_NOT_FOUND');
  failNext = { code: 'ERR_NOT_ENOUGH_MONEY', message: 'Not enough money' };
  await assert.rejects(c.orderSend({ symbol: 'EURUSD', cmd: 'BUY', lots: 0.1 }), (e) => e.code === 'ERR_NOT_ENOUGH_MONEY' && e.error.getErrorMessage() === 'Not enough money');
});

test('getId asks the server and fails when the server refuses', async () => {
  seen.length = 0;
  assert.strictEqual(await client().getId(123, 'p'), TERMINAL);
  assert.strictEqual(seen[0].request.getUser(), '123');
  failNext = { code: 'INVALID_ACCOUNT', message: 'Invalid account' };
  await assert.rejects(client().getId(123, 'wrong'), (e) => e.code === 'INVALID_ACCOUNT');
});

test('orderSend sends every order command as its MT4 operation and returns the server result', async () => {
  const c = client();
  await c.connect(123, 'p', 'TeleTrade-Demo');
  const ops = TradingHelperPb.OrderSendOperationType;
  for (const [cmd, op] of [['BUY', ops.OC_OP_BUY], ['SELL', ops.OC_OP_SELL], ['BUY_LIMIT', ops.OC_OP_BUYLIMIT],
                           ['SELL_LIMIT', ops.OC_OP_SELLLIMIT], ['BUY_STOP', ops.OC_OP_BUYSTOP], ['SELL_STOP', ops.OC_OP_SELLSTOP]]) {
    seen.length = 0;
    const res = await c.orderSend({ symbol: 'EURUSD', cmd, lots: 0.2, price: 1.2, stopLoss: 1.1, takeProfit: 1.3, comment: 'c', magicNumber: 7 });
    const sent = seen.find(s => s.method === 'orderSend').request;
    assert.strictEqual(sent.getOperationType(), op, cmd);
    assert.strictEqual(sent.getStoploss(), 1.1);
    assert.strictEqual(sent.getMagicNumber(), 7);
    assert.deepStrictEqual(res, { ticket: 88, errorCode: 0, lots: 0.2, volume: 0.2, price: 1.1234, comment: 'c', openTime: 0 });
  }
  await assert.rejects(c.orderSend({ symbol: 'EURUSD', cmd: 'CLOSE', lots: 0.1 }), /Unknown order command/);
  await assert.rejects(c.orderSend({ symbol: 'EURUSD', lots: 0.1 }), /Unknown order command/);
});

test('a market order without a price is sent at the current quote (ask for a buy, bid for a sell); action/volume/magic aliases', async () => {
  const c = client();
  await c.connect(123, 'p', 'TeleTrade-Demo');
  seen.length = 0;
  await c.orderSend({ symbol: 'EURUSD', action: 'BUY', volume: 0.3, magic: 42 });
  assert.deepStrictEqual(seen.map(s => s.method), ['quote', 'orderSend']);
  assert.strictEqual(seen[0].request.getSymbol(), 'EURUSD');
  const sent = seen[1].request;
  assert.strictEqual(sent.getPrice(), 1.1002);
  assert.strictEqual(sent.getVolume(), 0.3);
  assert.strictEqual(sent.getMagicNumber(), 42);
  seen.length = 0;
  await c.orderSend({ symbol: 'EURUSD', cmd: 'SELL', lots: 0.1 });
  assert.strictEqual(seen[1].request.getPrice(), 1.1);
  seen.length = 0;
  await c.orderSend({ symbol: 'EURUSD', cmd: 'BUY_LIMIT', lots: 0.1, price: 1.05 });
  assert.deepStrictEqual(seen.map(s => s.method), ['orderSend']);   // a pending order needs its own price
});

test('a reply with an MQL error carries the MT4 error number and description', async () => {
  const c = client();
  await c.connect(123, 'p', 'TeleTrade-Demo');
  failNext = { code: 'MQL4_EXECUTION_FAILED', message: 'Command failed on mql4 script side', mqlIntCode: 131, mqlDescription: 'invalid trade volume' };
  const err = await c.orderSend({ symbol: 'EURUSD', cmd: 'BUY', lots: 0, price: 1.2 }).then(() => null, (e) => e);
  assert.ok(err instanceof MrpcError);
  assert.ok(err instanceof MT4Error);
  assert.strictEqual(err.code, 'MQL4_EXECUTION_FAILED');
  assert.strictEqual(err.mqlIntCode, 131);
  assert.strictEqual(err.mqlDescription, 'invalid trade volume');
  assert.strictEqual(err.message, 'MQL4_EXECUTION_FAILED: Command failed on mql4 script side (mql 131)');
  assert.strictEqual(err.isInvalidLogin, false);
  assert.strictEqual(new MrpcError('Invalid account', 'CONNECT_INVALID_LOGIN_ERROR').isInvalidLogin, true);
  assert.strictEqual(new MrpcError('no terminal', 'TERMINAL_INSTANCE_NOT_FOUND').isTerminalLost, true);
});

test('connect keeps a caller-supplied stable id and name and sends the name; uuid5 matches RFC 4122', async () => {
  const id = MT4Client.uuid5(MT4Client.NAMESPACE_DNS, 'fleet-audit-NodeMT4');
  assert.strictEqual(id, 'd2e20916-d72e-569e-93dd-bea79c535a22');       // == python uuid.uuid5(uuid.NAMESPACE_DNS, ...)
  assert.strictEqual(MT4Client.uuid5(MT4Client.NAMESPACE_DNS, 'python.org'), '886313e1-3b8a-5372-9b90-0c9aee199e5d');
  seen.length = 0;
  const c = client();
  await c.connect({ user: 123, password: 'p', server: 'TeleTrade-Demo', id, name: 'S042', timeoutSeconds: 90 });
  const sent = seen.find(s => s.method === 'connectEx');
  assert.strictEqual(sent.id, id);                       // the stable id goes with the connect call itself
  assert.strictEqual(sent.request.getName(), 'S042');
  assert.strictEqual(sent.request.getTimeoutSeconds(), 90);
  assert.strictEqual(c.id, TERMINAL);                    // the gateway's id wins once it answers with one
  assert.strictEqual(c.name, 'S042');
  seen.length = 0;
  await c.reconnect();
  assert.strictEqual(seen[0].request.getName(), 'S042');
  assert.strictEqual(seen[0].id, TERMINAL);
});

test('subscribeQuotes delivers the ticks of the stream until unsubscribed', async () => {
  const c = client();
  await c.connect(123, 'p', 'TeleTrade-Demo');
  const quotes = [];
  const errors = [];
  await new Promise((resolve) => {
    const sub = c.subscribeQuotes(['EURUSD', 'GBPUSD'], (q) => {
      quotes.push(q);
      if (quotes.length === 4) { sub.unsubscribe(); resolve(); }
    }, (e) => errors.push(e));
  });
  await new Promise((r) => setTimeout(r, 50));
  assert.deepStrictEqual(quotes.map(q => q.symbol), ['EURUSD', 'GBPUSD', 'EURUSD', 'GBPUSD']);
  assert.strictEqual(quotes[1].bid, 1.101);
  assert.strictEqual(quotes[2].time, Date.UTC(2026, 9, 15, 12, 0, 2));
  assert.deepStrictEqual(errors, []);
});

test('subscribeQuotes reports an error reply of the stream instead of a quote', async () => {
  const c = client();
  await c.connect(123, 'p', 'TeleTrade-Demo');
  const quotes = [];
  const error = await new Promise((resolve) => {
    const sub = c.subscribeQuotes(['NOSUCH'], (q) => quotes.push(q), (e) => { sub.unsubscribe(); resolve(e); });
  });
  assert.ok(error instanceof MrpcError);
  assert.strictEqual(error.code, 'SYMBOL_NOT_FOUND');
  assert.deepStrictEqual(quotes, []);
});
