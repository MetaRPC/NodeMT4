# Trading

```javascript
const order = await client.orderSend({ symbol: 'EURUSD', cmd: 'BUY', lots: 0.01, slippage: 30, comment: 'first order' });
console.log(`Ticket #${order.ticket}: ${order.lots} lots at ${order.price}`);
```

| | |
|---|---|
| Request | `symbol`, `cmd` (`BUY`, `SELL`, `BUY_LIMIT`, `SELL_LIMIT`, `BUY_STOP`, `SELL_STOP`), `lots`, optional `price`, `slippage` (points), `stopLoss`, `takeProfit`, `comment`, `magicNumber`, `expiration` (pending orders, server time). `action`, `volume` and `magic` are accepted as aliases |
| Result | `ticket`, `lots` (= `volume`), `price` (the fill), `openTime` (seconds, server time), `comment` (the one you sent); `errorCode` is always 0 |

MT4 needs a request price: for a market order without `price` the client takes the current quote (ask for a buy, bid for
a sell). An order the server refuses rejects with an `MrpcError` carrying the server's error code and, for a trade the
terminal refused, the MT4 error number in `mqlIntCode` (130 invalid stops, 131 invalid volume, 132 market closed,
134 not enough money, 138 requote) with its text in `mqlDescription`.

## Modify, close, open orders, history

```javascript
await client.orderModify({ ticket: order.ticket, stopLoss: 1.0950, takeProfit: 1.1050 });   // send every value you want kept
await client.orderClose({ ticket: order.ticket });                      // whole order at the current quote; `volume` for a partial close
await client.orderClose({ ticket: pending.ticket });                    // deletes a pending order
await client.orderCloseBy(order.ticket, oppositeOrder.ticket);

const open = await client.positions(42);          // open market orders with magic number 42 (`openedOrders()` for everything)
const history = await client.ordersHistory(from, to);   // closed orders in a window of broker server time: { totalCount, orders }
```

Every order is its own ticket (MT4 has no netting). All times are broker server time: `getAccountInfo().utcServerShiftMinutes`
and `MT4Client.serverDate()` convert from UTC.
