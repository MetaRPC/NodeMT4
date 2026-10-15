# Trading

```javascript
const order = await client.orderSend({ symbol: 'EURUSD', cmd: 'BUY', lots: 0.01, slippage: 30, comment: 'first order' });
console.log(`Ticket #${order.ticket}: ${order.lots} lots at ${order.price}`);
```

| | |
|---|---|
| Request | `symbol`, `cmd` (`BUY`, `SELL`, `BUY_LIMIT`, `SELL_LIMIT`, `BUY_STOP`, `SELL_STOP`), `lots`, optional `price`, `slippage`, `stopLoss`, `takeProfit`, `comment`, `magicNumber` |
| Result | `ticket`, `lots`, `price`, `comment` (the one you sent); `errorCode` is always 0 |
An order the server refuses rejects with an `MrpcError` carrying the server's error code. Modifying and closing orders is
done with the generated `TradingHelperGrpc` client (see [API Reference](api.md#everything-else)).
