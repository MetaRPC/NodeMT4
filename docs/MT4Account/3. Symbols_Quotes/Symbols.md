# 🔤 Symbols

> **Request:** every symbol name the broker exposes (`SymbolsData`) — the master list to pick from.

**API Information:**

* **Low-level API:** `MT4Account.symbols(request?)` (from `@metarpc/nodemt4`)
* **gRPC service:** `mt4_term_api.MarketInfo`
* **Proto definition:** `Symbols` (defined in `mt4-term-api-market-info.proto`)

### RPC

* **Service:** `mt4_term_api.MarketInfo`
* **Method:** `Symbols(SymbolsRequest) → SymbolsReply`
* **Low-level client (generated):** `MarketInfoClient.symbols(request, metadata, opts, cb)`

---

## 💬 Just the essentials

* **What it is.** The broker's full symbol list, each with a name and an index.
* **Why you need it.** Discover tradable symbols, validate a symbol exists, build a picker.
* **Sanity check.** `getSymbolnameinfosList().length` is the symbol count.

---

## 🧱 Signature

```ts
import { MT4Account, MarketInfoPb } from '@metarpc/nodemt4';

class MT4Account {
  // All symbol names. Returns the raw SymbolsData; throws MrpcError on failure.
  symbols(req?: any /* SymbolsRequest */): Promise<any /* SymbolsData */>;
}
```

**Request message:** `SymbolsRequest {}` *(empty — optional)* · **Reply:** `SymbolsReply { oneof { SymbolsData data; Error error; } }`.

---

## ⬆️ Output — `SymbolsData`

`getSymbolnameinfosList()` → `SymbolNameInfo[]`:

| JS accessor | Type | Description |
| ----------- | ---- | ----------- |
| `getSymbolName()` | `string` | The symbol (e.g. `"EURUSD"`). |
| `getSymbolIndex()` | `number` | Its index in the broker's list. |

---

## 🧩 Notes & Tips

* **Just names** — for contract details call [SymbolParamsMany](./SymbolParamsMany.md); for a price call [Quote](./Quote.md).
* **Availability check:** `MT4Service` exposes `symbolList()` (→ `{name,index}[]`) and `MT4Sugar.isSymbolAvailable(sym)`.
* **Errors are exceptions:** rejects with `MrpcError` / the gRPC error.

---

## 🔗 Usage Examples

### 1) List and count

```ts
const data = await account.symbols();
const names = data.getSymbolnameinfosList().map((s: any) => s.getSymbolName());
console.log(`${names.length} symbols, e.g.`, names.slice(0, 10));
```

### 2) Does the broker have this symbol?

```ts
const has = (await account.symbols()).getSymbolnameinfosList().some((s: any) => s.getSymbolName() === 'BTCUSD');
console.log('BTCUSD available:', has);
```

---

## 📚 See Also

* [SymbolSelect](./SymbolSelect.md) — add a symbol to Market Watch so it streams.
* [SymbolParamsMany](./SymbolParamsMany.md) — the contract spec of each symbol.
* **Friendly layer:** [`MT4Service.symbolList()`](../../MT4Service/MT4Service.Overview.md).
