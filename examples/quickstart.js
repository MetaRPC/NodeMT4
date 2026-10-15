/**
 * MetaRPC NodeMT4 Quickstart Example
 * Demonstrates:
 * 1. Initializing the client with an API key
 * 2. Using your MT4 credentials (MT4_LOGIN / MT4_PASSWORD / MT4_SERVER) or opening a new demo account
 * 3. Connecting to mt4.mrpc.pro:443 (MRPC_GRPC_HOST overrides the host)
 * 4. Reading the account and placing a 0.01 lot buy
 * 5. Disconnecting
 */

const { MT4Client } = require('../src/index.js');

async function main() {
  const apiKey = process.argv[2] || process.env.MRPC_API_KEY || 'TRIAL';
  const host = (process.env.MRPC_GRPC_HOST || 'mt4.mrpc.pro').replace(/:443$/, '');
  const client = new MT4Client(host, 443, apiKey);

  const login = process.env.MT4_LOGIN || process.env.MT4_USER;
  let user = login ? parseInt(login, 10) : null;
  let password = process.env.MT4_PASSWORD || null;
  let server = process.env.MT4_SERVER || 'TeleTrade-Demo';

  if (!user || !password) {
    console.log('--- Step 0: Opening a demo account ---');
    const demo = await MT4Client.openDemoAccount(server, apiKey, host);
    user = demo.login;
    password = demo.password;
    server = demo.server;
    console.log(`Demo account opened: #${user} (server ${server})`);
  }

  console.log('\n--- Step 1: Connect ---');
  await client.connect({ user, password, server });
  console.log(`Connected to ${host}:443 (terminal ${client.id})`);
  try {
    console.log('\n--- Step 2: Account ---');
    const account = await client.getAccountInfo();
    console.log(`Account:  ${account.login} (${account.name}) on ${account.server}`);
    console.log(`Balance:  ${account.balance} ${account.currency}, equity ${account.equity}`);
    console.log(`Leverage: 1:${account.leverage}`);

    console.log('\n--- Step 3: Market order ---');
    const order = await client.orderSend({ symbol: 'EURUSD', cmd: 'BUY', lots: 0.01, slippage: 30, comment: 'MetaRPC Node MT4 quickstart' });
    console.log(`Order placed: ticket #${order.ticket}, ${order.lots} lots at ${order.price}`);
  } finally {
    console.log('\n--- Step 4: Disconnect ---');
    await client.disconnect();
    console.log('Disconnected.');
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
