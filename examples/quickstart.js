/**
 * MetaRPC NodeMT4 Quickstart Example
 * Demonstrates:
 * 1. Initializing client with API key from https://mrpc.pro/signup
 * 2. Retrieving deterministic Account ID via getId(user, password)
 * 3. Connecting to production cluster mt4.mrpc.pro:443
 * 4. Fetching account balance and placing a trade
 */

const { MT4Client } = require('../src/index.js');

async function main() {
  const apiKey = process.env.MRPC_API_KEY || 'YOUR_API_KEY_HERE';
  const client = new MT4Client('mt4.mrpc.pro', 443, apiKey);

  const user = 100234;
  const password = 'demo_password';

  console.log('--- Step 1: Connect to MetaTrader 4 Terminal ---');
  // Account ID (GetId) is automatically generated and managed by the client
  const connected = await client.connect(user, password);
  if (connected) {
    console.log('Successfully connected to mt4.mrpc.pro:443');

    console.log('\n--- Step 3: Query Account Summary ---');
    const accountInfo = await client.getAccountInfo();
    console.log(`Account: ${accountInfo.login} (${accountInfo.name})`);
    console.log(`Balance: ${accountInfo.balance} ${accountInfo.currency}`);
    console.log(`Leverage: 1:${accountInfo.leverage}`);

    console.log('\n--- Step 4: Execute Market Order ---');
    const order = await client.orderSend({
      symbol: 'EURUSD',
      cmd: 'BUY',
      lots: 0.1,
      price: 1.0850,
      comment: 'MetaRPC Node MT4 quickstart'
    });
    console.log(`Order Placed: Ticket #${order.ticket}, Error Code: ${order.errorCode}`);
  }

  client.disconnect();
  console.log('\nDone.');
}

main().catch(console.error);
