# 🕯️ Quote History

> **Request:** OHLC **bars** for a symbol, timeframe and time range (`QuoteHistoryData`) — the data for charts, indicators and backtests.

**API Information:**

* **Low-level API:** `MT4Account.quoteHistory(request)` (from `@metarpc/nodemt4`)
* **gRPC service:** `mt4_term_api.MarketInfo`
* **Proto definition:** `QuoteHistory` (defined in `mt4-term-api-market-info.proto`)

### RPC

* **Service:** `mt4_term_api.MarketInfo`
* **Method:** `QuoteHistory(QuoteHistoryRequest) → QuoteHistoryReply`
* **Low-level client (generated):** `MarketInfoClient.quoteHistory(request, metadata, opts, cb)`

---

## 💬 Just the essentials

* **What it is.** The OHLC bars between two times, at a chosen timeframe.
* **Why you need it.** Charts, moving averages, volatility, backtests.
* **Sanity check.** `getHistoricalQuotesList().length` is the bar count; `0` means the window has no bars (weekend / gap).

---

## 🎯 Purpose

The raw bar feed. There is **no bar-count argument** — the time window decides. For "the newest N bars" use [`MT4Service.lastBars(sym, tf, n)`](../../MT4Service/MT4Service.Overview.md), which widens the window automatically.

---

## 🧱 Signature

```ts
import { MT4Account, MarketInfoPb, TIMEFRAMES, toTimestamp } from '@metarpc/nodemt4';

class MT4Account {
  // OHLC bars for a symbol/timeframe/range. Returns QuoteHistoryData; throws MrpcError on failure.
  quoteHistory(req: any /* QuoteHistoryRequest */): Promise<any /* QuoteHistoryData */>;
}
```

**Request message:**

```protobuf
QuoteHistoryRequest {
  string symbol    = 1;
  int32  timeframe = 2;   // ENUM_QUOTE_HISTORY_TIMEFRAME ordinal (see TIMEFRAMES)
  google.protobuf.Timestamp fromtime = 3;  // range start, broker server time
  google.protobuf.Timestamp totime   = 4;  // range end,   broker server time
}
```

**Reply:** `QuoteHistoryReply { oneof { QuoteHistoryData data; Error error; } }`.

---

## 🔽 Input

| Setter | Type | Description |
| ------ | ---- | ----------- |
| `setSymbol(s)` | `string` | The symbol. |
| `setTimeframe(n)` | `number` | `TIMEFRAMES['H1']` etc. — ordinals: `M1=0 M5=1 M15=2 M30=3 H1=4 H4=5 D1=6 W1=7 MN1=8`. |
| `setFromtime(ts)` / `setTotime(ts)` | `Timestamp` | Range bounds, **broker server time** (`MT4Account.serverDate(utc, shiftMin)`). |

---

## ⬆️ Output — `QuoteHistoryData`

`getHistoricalQuotesList()` → `HistoryQuote[]`:

| JS accessor | Type | Description |
| ----------- | ---- | ----------- |
| `getTime()` | `Timestamp` | Bar open time, broker server time (`.getSeconds()`). |
| `getTimeUtc()` | `Timestamp` | The same in UTC. |
| `getOpen()` / `getHigh()` / `getLow()` / `getClose()` | `number` | OHLC prices. |
| `getTickVolume()` | `number` | Tick volume. |
| `getRealVolume()` | `number` | Real volume (0 on most FX). |
| `getSpread()` | `number` | Bar spread (points). |
| `getSymbol()` | `string` | The symbol. |

---

## 🧩 Notes & Tips

* **Server-time window.** Bounds are broker time — convert from UTC with `MT4Account.serverDate(utc, shiftMin)` where `shiftMin = accountSummary().getUtcServerTimeShiftMinutes()`.
* **Sort** by `getTime()` if you need strict ascending order (the SDK's friendly layer sorts for you).
* **Timeframe is an ordinal,** not minutes — use the `TIMEFRAMES` map.
* **Errors are exceptions:** rejects with `MrpcError` / the gRPC error (this call uses a longer deadline internally).

---

## 🔗 Usage Examples

### 1) H1 bars for a day

```ts
import { MT4Account, MarketInfoPb, TIMEFRAMES, toTimestamp } from '@metarpc/nodemt4';

const req = new MarketInfoPb.QuoteHistoryRequest();
req.setSymbol('EURUSD');
req.setTimeframe(TIMEFRAMES['H1']);                       // 4
req.setFromtime(toTimestamp(new Date(Date.now() - 864e5))); // last 24h (server time ≈ UTC here)
req.setTotime(toTimestamp(new Date()));

const data = await account.quoteHistory(req);
for (const b of data.getHistoricalQuotesList()) {
  const t = new Date(b.getTimeUtc().getSeconds() * 1000).toISOString().slice(0, 16);
  console.log(`${t}  O ${b.getOpen()} H ${b.getHigh()} L ${b.getLow()} C ${b.getClose()}`);
}
```

### 2) Simple moving average of closes

```ts
const closes = data.getHistoricalQuotesList().map((b: any) => b.getClose());
const sma = closes.slice(-20).reduce((s: number, c: number) => s + c, 0) / Math.min(20, closes.length);
console.log('SMA20:', sma.toFixed(5));
```

---

## 📚 See Also

* [Quote](./Quote.md) — the latest single tick.
* **Friendly layer:** [`MT4Service.quoteHistory(sym, tf, from, to)` / `lastBars(sym, tf, n)`](../../MT4Service/MT4Service.Overview.md) → typed `Bar[]`.
