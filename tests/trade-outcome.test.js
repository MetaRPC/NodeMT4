// A trade is sent exactly once: a transport failure of a trade call is a TradeOutcomeUnknownError (the trade may have
// been executed), never a re-send. Also the API-key and trade-outcome flags of MrpcError. In-process gRPC server.
const { test, before, after } = require('node:test');
const assert = require('node:assert');
const grpc = require('@grpc/grpc-js');
const { MT4Client, MrpcError, TradeOutcomeUnknownError } = require('../src/index.js');
const ConnectionGrpc = require('../package/mt4-term-api-connection_grpc_pb');
const ConnectionPb = require('../package/mt4-term-api-connection_pb');
const TradingHelperGrpc = require('../package/mt4-term-api-trading-helper_grpc_pb');
const TradingHelperPb = require('../package/mt4-term-api-trading-helper_pb');
const MarketInfoGrpc = require('../package/mt4-term-api-market-info_grpc_pb');
const MarketInfoPb = require('../package/mt4-term-api-market-info_pb');
const ErrorPb = require('../package/mrpc-mt4-error_pb');

const calls = {};               // method -> number of calls the server got
let transportFail = null;       // { code, details } -> the next call fails at the transport level
let replyError = null;          // { code, message, type, mqlIntCode } -> the next call answers with an error reply

const handler = (method, ReplyType, makeData) => (call, cb) => {
  calls[method] = (calls[method] || 0) + 1;
  if (transportFail) { const f = transportFail; transportFail = null; return cb(f); }
  const reply = new ReplyType();
  if (replyError) {
    const err = new ErrorPb.Error();
    err.setErrorCode(replyError.code);
    err.setErrorMessage(replyError.message || '');
    if (replyError.type) err.setType(replyError.type);
    if (replyError.mqlIntCode) err.setMqlErrorIntCode(replyError.mqlIntCode);
    replyError = null;
    reply.setError(err);
  } else {
    reply.setData(makeData(call));
  }
  cb(null, reply);
};

let server;
let port;

before(async () => {
  server = new grpc.Server();
  server.addService(ConnectionGrpc.ConnectionService, {
    connectEx: handler('connectEx', ConnectionPb.ConnectExReply, () => { const d = new ConnectionPb.ConnectData(); d.setTerminalInstanceGuid('t-1'); return d; }),
  });
  server.addService(TradingHelperGrpc.TradingHelperService, {
    orderSend: handler('orderSend', TradingHelperPb.OrderSendReply, () => { const d = new TradingHelperPb.OrderSendData(); d.setTicket(88); return d; }),
    orderModify: handler('orderModify', TradingHelperPb.OrderModifyReply, () => { const d = new TradingHelperPb.OrderModifyData(); d.setOrderWasModified(true); return d; }),
    orderCloseDelete: handler('orderCloseDelete', TradingHelperPb.OrderCloseDeleteReply, () => new TradingHelperPb.OrderCloseDeleteData()),
    orderCloseBy: handler('orderCloseBy', TradingHelperPb.OrderCloseByReply, () => new TradingHelperPb.OrderCloseByData()),
  });
  server.addService(MarketInfoGrpc.MarketInfoService, {
    quoteHistory: handler('quoteHistory', MarketInfoPb.QuoteHistoryReply, () => new MarketInfoPb.QuoteHistoryData()),
  });
  port = await new Promise((resolve, reject) =>
    server.bindAsync('127.0.0.1:0', grpc.ServerCredentials.createInsecure(), (err, p) => (err ? reject(err) : resolve(p))));
});

after(() => server.forceShutdown());

const connected = async () => {
  const c = new MT4Client('127.0.0.1', port, 'key-1');
  await c.connect({ user: 1, password: 'p', server: 'TeleTrade-Demo' });
  for (const k of Object.keys(calls)) delete calls[k];
  return c;
};

const TRADES = [
  // price/volume/symbol/type given, so no lookup call precedes the trade
  ['OrderSend', 'orderSend', (c) => c.orderSend({ symbol: 'EURUSD', cmd: 'BUY', lots: 0.1, price: 1.1 })],
  ['OrderModify', 'orderModify', (c) => c.orderModify({ ticket: 88, stopLoss: 1.0 })],
  ['OrderCloseDelete', 'orderCloseDelete', (c) => c.orderClose({ ticket: 88, volume: 0.05, price: 1.1 })],
  ['OrderCloseBy', 'orderCloseBy', (c) => c.orderCloseBy(88, 89)],
];

for (const [name, method, run] of TRADES) {
  for (const code of [grpc.status.UNAVAILABLE, grpc.status.DEADLINE_EXCEEDED, grpc.status.UNKNOWN, grpc.status.INTERNAL]) {
    test(`${name} failing with gRPC ${grpc.status[code]} is sent once and is TRADE_OUTCOME_UNKNOWN`, async () => {
      const c = await connected();
      transportFail = { code, details: 'connection reset' };
      const err = await run(c).then(() => null, (e) => e);
      assert.deepStrictEqual(calls, { [method]: 1 });   // no reconnect, no second send
      assert.ok(err instanceof TradeOutcomeUnknownError && err instanceof Error);
      assert.ok(!(err instanceof MrpcError));
      assert.strictEqual(err.errorCode, 'TRADE_OUTCOME_UNKNOWN');
      assert.strictEqual(err.isTradeOutcomeUnknown, true);
      assert.strictEqual(err.operation, name);
      assert.strictEqual(err.code, code);          // the gRPC status, as before
      assert.strictEqual(err.grpcCode, code);
      assert.strictEqual(err.details, 'connection reset');
      assert.strictEqual(err.cause.code, code);
      assert.match(err.message, new RegExp(`^TRADE_OUTCOME_UNKNOWN: ${name} failed with gRPC ${grpc.status[code]} .*NOT re-sent`));
    });
  }
  test(`${name} answered with an in-band timeout is an MrpcError flagged as an unknown outcome`, async () => {
    const c = await connected();
    replyError = { code: 'COMMAND_TIMEOUT_EXCEEDED', message: 'terminal did not answer' };
    const err = await run(c).then(() => null, (e) => e);
    assert.deepStrictEqual(calls, { [method]: 1 });
    assert.ok(err instanceof MrpcError);
    assert.strictEqual(err.code, 'COMMAND_TIMEOUT_EXCEEDED');
    assert.strictEqual(err.operation, name);
    assert.strictEqual(err.isTradeOutcomeUnknown, true);
  });
}

test('in-band trade outcomes: MRPC_TIMEOUT type, TERMINAL_API_CALL_TIMEOUT and MT4 128 are unknown; a refusal is not', async () => {
  const c = await connected();
  const send = () => c.orderSend({ symbol: 'EURUSD', cmd: 'BUY', lots: 0.1, price: 1.1 });
  replyError = { code: 'SOMETHING', message: 'x', type: ErrorPb.ErrorType.MRPC_TIMEOUT };
  await assert.rejects(send(), (e) => e.isTradeOutcomeUnknown);
  replyError = { code: 'TERMINAL_API_CALL_TIMEOUT', message: 'x' };
  await assert.rejects(send(), (e) => e.isTradeOutcomeUnknown);
  replyError = { code: 'MQL4_EXECUTION_FAILED', message: 'x', mqlIntCode: 128 };
  await assert.rejects(send(), (e) => e.isTradeOutcomeUnknown && e.mqlIntCode === 128);
  replyError = { code: 'MQL4_EXECUTION_FAILED', message: 'x', mqlIntCode: 134 };
  await assert.rejects(send(), (e) => e instanceof MrpcError && !e.isTradeOutcomeUnknown);
  replyError = { code: 'TERMINAL_INSTANCE_NOT_FOUND', message: 'no terminal' };
  await assert.rejects(send(), (e) => e.isTerminalLost && !e.isTradeOutcomeUnknown);
  assert.strictEqual(calls.orderSend, 5);
  assert.strictEqual(calls.connectEx, undefined);
  // the same timeout on a read is not a trade outcome
  replyError = { code: 'COMMAND_TIMEOUT_EXCEEDED', message: 'x' };
  await assert.rejects(c.quoteHistory('EURUSD', 'H1', new Date(0), new Date()), (e) => e instanceof MrpcError && !e.isTradeOutcomeUnknown);
});

test('a refused API key is one call, keeps its code and is flagged', async () => {
  const c = await connected();
  replyError = { code: 'API_KEY_INVALID', message: 'Unknown API key' };
  const err = await c.orderSend({ symbol: 'EURUSD', cmd: 'BUY', lots: 0.1, price: 1.1 }).then(() => null, (e) => e);
  assert.deepStrictEqual(calls, { orderSend: 1 });
  assert.ok(err instanceof MrpcError);
  assert.strictEqual(err.code, 'API_KEY_INVALID');
  assert.strictEqual(err.isApiKeyError, true);
  assert.strictEqual(err.isTradeOutcomeUnknown, false);
  assert.strictEqual(new MrpcError('no key', 'API_KEY_REQUIRED').isApiKeyError, true);
  assert.strictEqual(new MrpcError('no terminal', 'TERMINAL_INSTANCE_NOT_FOUND').isApiKeyError, false);
});

test('a transport failure whose status names a refused API key is not wrapped (the trade was refused)', async () => {
  const c = await connected();
  transportFail = { code: grpc.status.UNKNOWN, details: 'API_KEY_INVALID' };
  const err = await c.orderSend({ symbol: 'EURUSD', cmd: 'BUY', lots: 0.1, price: 1.1 }).then(() => null, (e) => e);
  assert.deepStrictEqual(calls, { orderSend: 1 });
  assert.ok(!(err instanceof TradeOutcomeUnknownError));
  assert.strictEqual(err.code, grpc.status.UNKNOWN);
});

test('lastBars widens its window on short answers but does not retry a failed read', async () => {
  const c = await connected();
  assert.deepStrictEqual(await c.lastBars('EURUSD', 'H1', 10), []);
  assert.strictEqual(calls.quoteHistory, 4);              // 4 widening windows, every answer empty
  delete calls.quoteHistory;
  transportFail = { code: grpc.status.UNAVAILABLE, details: 'down' };
  const err = await c.lastBars('EURUSD', 'H1', 10).then(() => null, (e) => e);
  assert.strictEqual(calls.quoteHistory, 1);
  assert.strictEqual(err.code, grpc.status.UNAVAILABLE);
  assert.ok(!(err instanceof TradeOutcomeUnknownError));  // a read: the gRPC error itself, as before
});
