const test = require('node:test');
const assert = require('node:assert');
const { MT4Client } = require('../src/index.js');

test('MT4Client initialization', () => {
  const client = new MT4Client('mt4.mrpc.pro', 443);
  assert.ok(client);
});

test('MT4Client connect and account info', async () => {
  const client = new MT4Client('mt4.mrpc.pro', 443);
  const connected = await client.connect(100234, 'demo_password');
  assert.strictEqual(connected, true);

  const info = await client.getAccountInfo();
  assert.strictEqual(info.login, 100234);
  assert.strictEqual(info.currency, 'USD');
  assert.strictEqual(info.balance, 5000.0);
  assert.strictEqual(info.leverage, 100);
});

test('MT4Client orderSend', async () => {
  const client = new MT4Client('mt4.mrpc.pro', 443);
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
