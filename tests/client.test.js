const test = require('node:test');
const assert = require('node:assert');
const { MT4Client } = require('../src/index.js');

test('MT4Client initialization with auth', () => {
  const client = new MT4Client('mt4.mrpc.pro', 443, 'mrpc_test_key');
  assert.ok(client);
  assert.strictEqual(client.host, 'mt4.mrpc.pro');
  assert.strictEqual(client.port, 443);
  assert.strictEqual(client.apiKey, 'mrpc_test_key');
});

test('MT4Client getId returns deterministic token', async () => {
  const client = new MT4Client('mt4.mrpc.pro', 443, 'mrpc_test_key');
  const token = await client.getId(100234, 'demo_password');
  assert.ok(token);
  assert.strictEqual(typeof token, 'string');
  assert.ok(token.length > 10);
  assert.strictEqual(client.id, token);
});

test('MT4Client connect and account info', async () => {
  const client = new MT4Client('mt4.mrpc.pro', 443, 'mrpc_test_key');
  const connected = await client.connect(100234, 'demo_password');
  assert.strictEqual(connected, true);
  assert.ok(client.id);

  const info = await client.getAccountInfo();
  assert.strictEqual(info.login, 100234);
  assert.strictEqual(info.currency, 'USD');
  assert.strictEqual(info.balance, 5000.0);
  assert.strictEqual(info.leverage, 100);
});

test('MT4Client orderSend', async () => {
  const client = new MT4Client('mt4.mrpc.pro', 443, 'mrpc_test_key');
  const res = await client.orderSend({
    symbol: 'EURUSD',
    cmd: 'BUY',
    lots: 0.1,
    price: 1.0850,
    comment: 'Test MT4 order'
  });
  assert.strictEqual(res.errorCode, 0);
  assert.strictEqual(res.lots, 0.1);
  assert.strictEqual(res.comment, 'Test MT4 order');
});
