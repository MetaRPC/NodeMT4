# Getting Started with NodeMT4

## Prerequisites
- **Node.js 18.0+**
- MT4 account credentials (Host, Port, Login, Password)

## Quickstart Example

```typescript
import { MT4Client } from '@metarpc/nodemt4';

async function main() {
  const client = new MT4Client('mt4.broker.com', 443);

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
