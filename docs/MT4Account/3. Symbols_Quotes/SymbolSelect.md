# ➕ Symbol Select

> **Request:** add or remove a symbol in **Market Watch** (`SymbolSelectData`). A symbol must be selected before it streams quotes.

**API Information:**

* **Low-level API:** `MT4Account.symbolSelect(request)` (from `@metarpc/nodemt4`)
* **gRPC service:** `mt4_term_api.MarketInfo`
* **Proto definition:** `SymbolSelect` (defined in `mt4-term-api-market-info.proto`)

### RPC

* **Service:** `mt4_term_api.MarketInfo`
* **Method:** `SymbolSelect(SymbolSelectRequest) → SymbolSelectReply`
* **Low-level client (generated):** `MarketInfoClient.symbolSelect(request, metadata, opts, cb)`

---

## 💬 Just the essentials

* **What it is.** Toggles a symbol's presence in Market Watch.
* **Why you need it.** A symbol that isn't selected reports `bid=ask=0` and won't appear in tick streams. Select it first.
* **Sanity check.** `getSuccess()` is `true` when the toggle took effect.

---

## 🧱 Signature

```ts
import { MT4Account, MarketInfoPb } from '@metarpc/nodemt4';

class MT4Account {
  // Add (select=true) or remove a symbol from Market Watch. Returns SymbolSelectData; throws MrpcError on failure.
  symbolSelect(req: any /* SymbolSelectRequest */): Promise<any /* SymbolSelectData */>;
}
```

**Request message:**

```protobuf
SymbolSelectRequest {
  string symbol = 1;   // the symbol
  bool   select = 2;   // true = add, false = remove
}
```

**Reply:** `SymbolSelectReply { oneof { SymbolSelectData data; Error error; } }`.

---

## 🔽 Input

| Setter | Type | Description |
| ------ | ---- | ----------- |
| `setSymbol(s)` | `string` | The symbol to toggle. |
| `setSelect(b)` | `boolean` | `true` add, `false` remove. |

---

## ⬆️ Output — `SymbolSelectData`

| JS accessor | Type | Description |
| ----------- | ---- | ----------- |
| `getSuccess()` | `boolean` | Whether the operation succeeded. |

---

## 🧩 Notes & Tips

* **Idempotent** — selecting an already-selected symbol is fine.
* **Then wait for a quote.** Right after selecting, poll [Quote](./Quote.md) until `bid>0 && ask>0`, or use `MT4Service.ensureSymbol(sym)` which does exactly that.
* **Errors are exceptions:** rejects with `MrpcError` / the gRPC error.

---

## 🔗 Usage Examples

### 1) Select a symbol

```ts
import { MarketInfoPb } from '@metarpc/nodemt4';

const req = new MarketInfoPb.SymbolSelectRequest();
req.setSymbol('EURUSD');
req.setSelect(true);
const ok = await account.symbolSelect(req);
console.log('selected:', ok.getSuccess());
```

### 2) Select, then wait for a live quote

```ts
const sel = new MarketInfoPb.SymbolSelectRequest();
sel.setSymbol('GBPUSD'); sel.setSelect(true);
await account.symbolSelect(sel);

const q = new MarketInfoPb.QuoteRequest(); q.setSymbol('GBPUSD');
let tick;
for (let i = 0; i < 20; i++) {
  tick = await account.quote(q);
  if (tick.getBid() > 0 && tick.getAsk() > 0) break;
  await new Promise((r) => setTimeout(r, 500));
}
console.log('GBPUSD bid', tick.getBid());
```

---

## 📚 See Also

* [Quote](./Quote.md) — read the price once selected.
* [OnSymbolTick](../5.%20Streaming_Methods/OnSymbolTick.md) — stream ticks of selected symbols.
* **Friendly layer:** [`MT4Service.symbolSelect(sym, select)`](../../MT4Service/MT4Service.Overview.md) → `boolean`; `ensureSymbol(sym)`.
