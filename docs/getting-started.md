# Getting Started with NodeMT4

Requires Node.js 18 or newer, an MRPC API key and an MT4 account (any broker; or open a demo account with
`MT4Client.openDemoAccount('TeleTrade-Demo', apiKey)`).

```bash
npm install github:MetaRPC/NodeMT4 @grpc/grpc-js
```

The package is installed from GitHub; it is not on the npm registry. It is named `@metarpc/nodemt4`, so `require('@metarpc/nodemt4')` works as usual.

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
The same program with a demo account and error handling is
[`examples/quickstart.js`](https://github.com/MetaRPC/NodeMT4/blob/main/examples/quickstart.js).

## API key and terminal id

- **`APIKey`**: your key from [https://mrpc.pro/my](https://mrpc.pro/my) (sign up free at [https://mrpc.pro/signup](https://mrpc.pro/signup)).
  Pass it to the constructor or set `MRPC_API_KEY`; without one the client sends `TRIAL`.
- **`id`**: the terminal id. `connect()` receives it from the server (`terminalInstanceGuid`), keeps it in `client.id` and
  sends it with every later call and stream. You don't need to call `getId()` first.
