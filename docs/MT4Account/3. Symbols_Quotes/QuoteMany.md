# 💱 Quote Many

> **Request:** the latest ticks of **several symbols** in one call (`QuoteManyData`) — one round-trip for a whole watchlist.

**API Information:**

* **Low-level API:** `MT4Account.quoteMany(request)` (from `@metarpc/nodemt4`)
* **gRPC service:** `mt4_term_api.MarketInfo`
* **Proto definition:** `QuoteMany` (defined in `mt4-term-api-market-info.proto`)

### RPC

* **Service:** `mt4_term_api.MarketInfo`
* **Method:** `QuoteMany(QuoteManyRequest) → QuoteManyReply`
* **Low-level client (generated):** `MarketInfoClient.quoteMany(request, metadata, opts, cb)`

---

## 💬 Just the essentials

* **What it is.** A batch of [Quote](./Quote.md)s — the latest tick for each requested symbol.
* **Why you need it.** Price a basket, refresh a watchlist, compute spreads across symbols without N round-trips.
* **Sanity check.** `getQuotesList().length` should match the symbols you asked for (selected ones).

---

## 🧱 Signature

```ts
import { MT4Account, MarketInfoPb } from '@metarpc/nodemt4';

class MT4Account {
  // Latest ticks for several symbols. Returns the raw QuoteManyData; throws MrpcError on failure.
  quoteMany(req: any /* QuoteManyRequest */): Promise<any /* QuoteManyData */>;
}
```

**Request message:** `QuoteManyRequest { repeated string symbols = 1; }` · **Reply:** `QuoteManyReply { oneof { QuoteManyData data; Error error; } }`.

---

## 🔽 Input

| Setter | Type | Description |
| ------ | ---- | ----------- |
| `setSymbolsList(arr)` | `string[]` | The symbols to price. |

---

## ⬆️ Output — `QuoteManyData`

`getQuotesList()` → `QuoteData[]` — each entry is a full [QuoteData](./Quote.md) (`getSymbol()`, `getBid()`, `getAsk()`, `getHigh()`, `getLow()`, `getDateTime()` / `getDateTimeUtc()`).

---

## 🧩 Notes & Tips

* **Select first.** Symbols not in Market Watch may be missing or report `0` — [SymbolSelect](./SymbolSelect.md) them first.
* **Order isn't guaranteed** — match results by `getSymbol()`, not by position.
* **Errors are exceptions:** rejects with `MrpcError` / the gRPC error.

---

## 🔗 Usage Examples

### 1) Price a basket

```ts
import { MarketInfoPb } from '@metarpc/nodemt4';

const req = new MarketInfoPb.QuoteManyRequest();
req.setSymbolsList(['EURUSD', 'GBPUSD', 'USDJPY']);
const data = await account.quoteMany(req);
for (const q of data.getQuotesList()) {
  console.log(`${q.getSymbol()}  bid ${q.getBid()}  ask ${q.getAsk()}`);
}
```

### 2) Into a map by symbol

```ts
const bySymbol = Object.fromEntries(
  data.getQuotesList().map((q: any) => [q.getSymbol(), { bid: q.getBid(), ask: q.getAsk() }])
);
console.log(bySymbol['USDJPY']);
```

---

## 📚 See Also

* [Quote](./Quote.md) — a single symbol.
* [OnSymbolTick](../5.%20Streaming_Methods/OnSymbolTick.md) — stream many symbols live.
* **Friendly layer:** [`MT4Service.quoteMany(symbols)`](../../MT4Service/MT4Service.Overview.md) → `Quote[]`.
