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

MetaRPC endpoints require two credentials for all terminal operations:
1. **`APIKey`**: Your personal authentication token from [https://mrpc.pro/my](https://mrpc.pro/my) (obtained by registering at [https://mrpc.pro/signup](https://mrpc.pro/signup)). Sent in the `APIKey` header.
2. **`id`**: A deterministic account GUID derived from your MetaTrader `user` (login number) and `password`.

> 💡 **Seamless Automation**: You do not need to call `GetId` manually. The SDK automatically derives your deterministic account ID from your credentials upon initialization and attaches both the `id` and `APIKey` headers to all requests and streaming subscriptions.

