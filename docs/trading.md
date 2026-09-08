# Trading & Orders

Opening, modifying, and closing orders.

```typescript
// Open Buy
const order = await client.orderSend({
  symbol: 'EURUSD',
  cmd: 'BUY',
  lots: 0.05,
  stopLoss: 1.0800,
  takeProfit: 1.0950
});

// Close order
await client.orderClose({
  ticket: order.ticket,
  lots: 0.05
});
```
