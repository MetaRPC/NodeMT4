# Getting Started with NodeMT4

> **Quick Setup & Overview** - Connect to MetaTrader 4 from Node.js in a few minutes.

---

## What is NodeMT4?

**NodeMT4** is a Node.js and TypeScript client for MetaTrader 4 accounts through the MRPC gRPC API (`mt4.mrpc.pro:443`). It has
two parts:

- **`MT4Client`**: connect, account, market orders, tick stream, disconnect (see [API Reference](../api.md)).
- **The generated gRPC clients** of the whole API (`ConnectionGrpc`, `AccountHelperGrpc`, `TradingHelperGrpc`,
  `SubscriptionsGrpc`, `MarketInfoGrpc`, ...), exported by the package, for everything else.

The other pages of these guides describe the API itself (methods, enums, return codes, streams); some of their code
samples are in Python, the calls and messages are the same from Node.

---

## Installation

```bash
npm install github:MetaRPC/NodeMT4 @grpc/grpc-js
```

The package is installed from GitHub; it is not on the npm registry. It is named `@metarpc/nodemt4`, so `require('@metarpc/nodemt4')` works as usual.
---

## API key

1. **Sign up** free at [https://mrpc.pro/signup](https://mrpc.pro/signup).
2. **Create a key** at [https://mrpc.pro/my](https://mrpc.pro/my) under **API Keys**.
3. Pass it to `new MT4Client(host, 443, apiKey)` or set `MRPC_API_KEY`.

---

## API key and terminal id

- **`APIKey`**: your key from [https://mrpc.pro/my](https://mrpc.pro/my) (sign up free at [https://mrpc.pro/signup](https://mrpc.pro/signup)).
  Pass it to the constructor or set `MRPC_API_KEY`; without one the client sends `TRIAL`.
- **`id`**: the terminal id. `connect()` receives it from the server (`terminalInstanceGuid`), keeps it in `client.id` and
  sends it with every later call and stream. You don't need to call `getId()` first.
## Minimal example

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

## Reading order

1. **[Your First Project](Your_First_Project.md)** - a working project in 10 minutes.
2. **[API Reference](../api.md)** - what `MT4Client` does, and how to call the rest of the API.
3. **[gRPC Streaming](GRPC_STREAM_MANAGEMENT.md)** - ticks, trades and other streams.
4. **[Return Codes](RETURN_CODES_REFERENCE.md)** - broker and API return codes.
