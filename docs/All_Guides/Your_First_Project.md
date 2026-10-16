# Your First Project in 10 Minutes (Node.js)

> **Hands-on Quick Start** - A working MetaTrader 4 project with NodeMT4 from scratch.

---

## Step 0: API key

1. Register free at [https://mrpc.pro/signup](https://mrpc.pro/signup).
2. Create your API key at [https://mrpc.pro/my](https://mrpc.pro/my).
3. Put it in `MRPC_API_KEY`.

---

## Step 1: Create the project

```bash
mkdir my-mt4-bot
cd my-mt4-bot
npm init -y
npm install github:MetaRPC/NodeMT4 @grpc/grpc-js
```

---

## Step 2: Write the program

Save as `index.js` (it connects, reads the account, buys 0.01 lot of EURUSD and disconnects):

```javascript
const { MT4Client } = require('@metarpc/nodemt4');

async function main() {
  const client = new MT4Client('mt4.mrpc.pro', 443, process.env.MRPC_API_KEY);
  await client.connect({ user: Number(process.env.MT4_LOGIN), password: process.env.MT4_PASSWORD, server: 'TeleTrade-Demo' });
  try {
    const account = await client.getAccountInfo();
    console.log(`Balance: ${account.balance} ${account.currency}, equity ${account.equity}, leverage 1:${account.leverage}`);

    const order = await client.orderSend({ symbol: 'EURUSD', cmd: 'BUY', lots: 0.01, slippage: 30, comment: 'first order' });
    console.log(`Ticket #${order.ticket}: ${order.lots} lots at ${order.price}`);
  } finally {
    await client.disconnect();
  }
}

main().catch((err) => { console.error(err.message); process.exit(1); });
```
---

## Step 3: Run it

```bash
export MRPC_API_KEY=your-api-key MT4_LOGIN=your-login MT4_PASSWORD=your-password
node index.js
```

No account yet? `MT4Client.openDemoAccount('TeleTrade-Demo', apiKey)` opens a demo account and returns its login and password;
[`examples/quickstart.js`](https://github.com/MetaRPC/NodeMT4/blob/main/examples/quickstart.js) does that when no login is set.

---

## Next steps

- **[Quotes](../quotes.md)** - stream ticks with `subscribeQuotes`.
- **[API Reference](../api.md)** - everything `MT4Client` does, and the generated clients for the rest of the API.
- **[Streams](STREAMS.md)** - the other streams.
