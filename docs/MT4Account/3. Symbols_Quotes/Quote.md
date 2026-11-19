# 💱 Quote

> **Request:** the latest tick (`QuoteData`) of one symbol — bid, ask, high, low and time. The price source to trade from.

**API Information:**

* **Low-level API:** `MT4Account.quote(request)` (from `@metarpc/nodemt4`)
* **gRPC service:** `mt4_term_api.MarketInfo`
* **Proto definition:** `Quote` (defined in `mt4-term-api-market-info.proto`)

### RPC

* **Service:** `mt4_term_api.MarketInfo`
* **Method:** `Quote(QuoteRequest) → QuoteReply`
* **Low-level client (generated):** `MarketInfoClient.quote(request, metadata, opts, cb)`

---

## 💬 Just the essentials

* **What it is.** A one-shot latest tick for a symbol.
* **Why you need it.** Price a market order, compute spread, show a live rate.
* **Sanity check.** `getBid() > 0 && getAsk() > 0` means the symbol is selected and synchronized.

---

## 🧱 Signature

```ts
import { MT4Account, MarketInfoPb } from '@metarpc/nodemt4';

class MT4Account {
  // Latest tick for one symbol. Returns the raw QuoteData; throws MrpcError on failure.
  quote(req: any /* QuoteRequest */): Promise<any /* QuoteData */>;
}
```

**Request message:** `QuoteRequest { string symbol = 1; }` · **Reply:** `QuoteReply { oneof { QuoteData data; Error error; } }`.

---

## 🔽 Input

| Setter | Type | Description |
| ------ | ---- | ----------- |
| `setSymbol(s)` | `string` | The symbol to price. |

---

## ⬆️ Output — `QuoteData`

| JS accessor | Type | Description |
| ----------- | ---- | ----------- |
| `getSymbol()` | `string` | The symbol. |
| `getBid()` | `number` | Best bid. |
| `getAsk()` | `number` | Best ask. |
| `getHigh()` | `number` | Session high. |
| `getLow()` | `number` | Session low. |
| `getDateTime()` | `Timestamp` | Tick time, broker server time (`.getSeconds()`). |
| `getDateTimeUtc()` | `Timestamp` | The same moment in UTC. |

---

## 🧩 Notes & Tips

* **Spread** = `getAsk() - getBid()` (price units); divide by the pip size for pips.
* **bid=ask=0?** The symbol isn't selected/synchronized — [SymbolSelect](./SymbolSelect.md) then retry, or `MT4Service.ensureSymbol(sym)`.
* **For a stream** of ticks use [OnSymbolTick](../5.%20Streaming_Methods/OnSymbolTick.md) instead of polling.
* **Errors are exceptions:** rejects with `MrpcError` / the gRPC error.

---

## 🔗 Usage Examples

### 1) Price and spread

```ts
import { MarketInfoPb } from '@metarpc/nodemt4';

const req = new MarketInfoPb.QuoteRequest();
req.setSymbol('EURUSD');
const q = await account.quote(req);
console.log(`bid ${q.getBid()} ask ${q.getAsk()} spread ${(q.getAsk() - q.getBid()).toFixed(5)}`);
```

### 2) Pick the right side for an order

```ts
const q = await account.quote(req);
const buyPrice = q.getAsk();   // buy at ask
const sellPrice = q.getBid();  // sell at bid
```

---

## 📚 See Also

* [QuoteMany](./QuoteMany.md) — several symbols in one call.
* [OnSymbolTick](../5.%20Streaming_Methods/OnSymbolTick.md) — the streaming version.
* **Friendly layer:** [`MT4Service.quote(sym)`](../../MT4Service/MT4Service.Overview.md) → typed `Quote`; `MT4Sugar.getBid/getAsk/getSpread`.
