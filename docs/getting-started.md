# Getting Started with NodeMT4

## Prerequisites
- **Node.js 18.0+**
- MT4 account credentials (Host, Port, Login, Password)

## Quickstart Example

```typescript
import { MT4Client } from '@metarpc/nodemt4';

async function main() {
  const client = new MT4Client('mt4.mrpc.pro', 443);

  console.log('Connecting to MT4...');
  await client.connect(100234, 'my_password');
  console.log('Connected!');

  const acc = await client.getAccountInfo();
  console.log(`Balance: ${acc.balance} ${acc.currency}, Leverage: 1:${acc.leverage}`);

  // Subscribe quotes
  await client.subscribeQuotes(['EURUSD'], (quote) => {
    console.log(`[EURUSD] Bid: ${quote.bid} Ask: ${quote.ask}`);
  });

  // Open market order
  const order = await client.orderSend({
    symbol: 'EURUSD',
    cmd: 'BUY',
    lots: 0.1,
    comment: 'NodeMT4 Trade'
  });

  console.log(`Order executed! Ticket #${order.ticket}`);
}

main().catch(console.error);
```


> **Authentication Note**: Connecting to `mt4.mrpc.pro:443` requires a valid MetaRPC API key. Register for free at [https://mrpc.pro/signup](https://mrpc.pro/signup) and generate your token in [https://mrpc.pro/my](https://mrpc.pro/my).



---

## 🆔 Automatic Account ID & Authentication

MetaRPC endpoints require authentication and session management:
1. **`APIKey`**: Your personal authentication token from [https://mrpc.pro/my](https://mrpc.pro/my) (obtained by registering at [https://mrpc.pro/signup](https://mrpc.pro/signup)). Sent in the `APIKey` header.
2. **`id`**: A terminal session GUID returned by `Connect` / `ConnectEx` (`terminalInstanceGuid`).

> 💡 **Seamless Automation**: You do not need to call `GetId` or provide an `id` header when connecting. The server automatically generates a session GUID upon connection and returns it to the caller. The SDK automatically captures this session ID and attaches it alongside your `APIKey` to all subsequent requests and streaming subscriptions.

