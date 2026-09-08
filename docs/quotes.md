# Quotes & Market Data

Stream live quotes and fetch candlestick charts.

```typescript
// Real-time tick subscription
await client.subscribeQuotes(['EURUSD', 'GBPUSD'], (quote) => {
  console.log(`${quote.symbol}: ${quote.bid} / ${quote.ask}`);
});
```
