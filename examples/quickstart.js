/**
 * MetaRPC NodeMT4 Quickstart — the smallest end-to-end program.
 *
 * Connect → read balance & price → open a tiny demo order → close it.
 *
 * RUN:
 *   npm install
 *   MT4_LOGIN=... MT4_PASSWORD=... MT4_SERVER=TeleTrade-Demo node examples/quickstart.js
 *   # or pass an API key:  node examples/quickstart.js <API_KEY>
 *   # with no MT4_LOGIN/PASSWORD it opens a fresh demo account for you.
 */

'use strict';

const { MT4Sugar, MT4Account } = require('../src/index.js');

async function main() {
  const apiKey = process.argv[2] || process.env.MRPC_API_KEY || null; // null → TRIAL
  const host = (process.env.MRPC_GRPC_HOST || 'mt4.mrpc.pro').replace(/:443$/, '');

  let user = Number(process.env.MT4_LOGIN || process.env.MT4_USER) || null;
  let password = process.env.MT4_PASSWORD || null;
  let server = process.env.MT4_SERVER || 'TeleTrade-Demo';

  if (!user || !password) {
    console.log('--- Step 0: opening a demo account ---');
    const demo = await MT4Account.openDemoAccount(server, apiKey || 'TRIAL', host);
    user = demo.login; password = demo.password; server = demo.server;
    console.log(`Demo account opened: #${user} (server ${server})`);
  }

  const sugar = MT4Sugar.create(host, 443, apiKey);
  await sugar.quickConnect(user, password, server);
  console.log('✓ connected to', server);

  console.log(`balance ${(await sugar.getBalance()).toFixed(2)}   equity ${(await sugar.getEquity()).toFixed(2)}`);
  console.log(`EURUSD  bid ${await sugar.getBid('EURUSD')}  ask ${await sugar.getAsk('EURUSD')}`);

  try {
    const ticket = await sugar.buyMarket('EURUSD', 0.01);   // ⚠ tiny demo order
    console.log(`opened #${ticket}`);
    await sugar.closePosition(ticket);
    console.log('closed');
  } catch (e) {
    console.log(`order rejected: ${e.message} (market closed? try a 24/7 symbol)`);
  }

  await sugar.service().disconnect();
  console.log('disconnected');
}

main().catch((e) => { console.error('error:', e.message || e); process.exit(1); });
