# Quotes

```javascript
const sub = client.subscribeQuotes(['EURUSD', 'GBPUSD'],
  (quote) => console.log(`${quote.symbol}: ${quote.bid} / ${quote.ask} at ${new Date(quote.time).toISOString()}`),
  (err) => console.error('stream error:', err.message));

// later
sub.unsubscribe();
```

`quote.time` is the tick time in milliseconds since the epoch (UTC). `onError` receives an error the stream answers with
(for example `NO_CHARTS_OPENED_FOR_SYMBOLS` for a symbol the terminal doesn't have) or the stream's failure; an
`unsubscribe()` is not an error. Bars and other market data are in the generated `MarketInfoGrpc` client.
