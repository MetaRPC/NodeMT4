# Quotes

```javascript
const sub = client.subscribeQuotes(['EURUSD', 'GBPUSD'],
  (quote) => console.log(`${quote.symbol}: ${quote.bid} / ${quote.ask} at ${new Date(quote.time).toISOString()}`),
  (err) => console.error('stream error:', err.message));

// later
sub.unsubscribe();
```

`quote.time` is the tick time in milliseconds since the epoch, broker server time as the API reports it (`quote.timeUtc`
is the UTC time when the server sends one). `onError` receives an error the stream answers with (for example
`NO_CHARTS_OPENED_FOR_SYMBOLS` for a symbol the terminal doesn't have), the stream's failure or its end; an
`unsubscribe()` is not an error. There is no automatic re-subscription: subscribe again after an error.

## Symbols, specifications, bars

```javascript
const names = (await client.symbolList()).map(s => s.name);
const q = await client.ensureSymbol('XAUUSD');            // selects the symbol in Market Watch and waits for a two-sided quote
const spec = await client.symbolParams('EURUSD');          // digits, point, volumeMin/Max/Step, stopsLevel, tickValue, tickSize, tradeMode, ...
const bars = await client.lastBars('EURUSD', 'M1', 50, account.utcServerShiftMinutes);   // newest 50 bars, ascending
const window = await client.quoteHistory('EURUSD', 'H1', from, to);                      // from/to in broker server time
```

A symbol that is not in Market Watch (most are not, by default) answers `bid == ask == 0` for a few seconds after it is
selected: `ensureSymbol()` waits for it. `TIMEFRAMES` holds the timeframe names (`M1` ... `MN1`); `quoteHistory` has no bar
count, the window decides. `spec.bid` is a stale snapshot: prices come from `quote()` and `subscribeQuotes()`.
