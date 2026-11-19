# 📐 Symbol Params (Many)

> **Request:** the full **contract specification** of one symbol — or **all** symbols (`SymbolParamsManyData`): digits, point, lot limits, swaps, margin, trade modes and more.

**API Information:**

* **Low-level API:** `MT4Account.symbolParamsMany(request?, timeoutMs?)` (from `@metarpc/nodemt4`)
* **gRPC service:** `mt4_term_api.AccountHelper`
* **Proto definition:** `SymbolParamsMany` (defined in `mt4-term-api-account-helper.proto`)

### RPC

* **Service:** `mt4_term_api.AccountHelper`
* **Method:** `SymbolParamsMany(SymbolParamsManyRequest) → SymbolParamsManyReply`
* **Low-level client (generated):** `AccountHelperClient.symbolParamsMany(request, metadata, opts, cb)`

---

## 💬 Just the essentials

* **What it is.** The trading rules of a symbol: price precision, min/max/step lot, swap, margin, stops level.
* **Why you need it.** Validate and round a volume, respect the minimum stop distance, compute pip size, pre-trade checks.
* **Sanity check.** `getSymbolInfosList().length` ≥ 1; set a name to get just one symbol.

---

## 🧱 Signature

```ts
import { MT4Account, AccountHelperPb } from '@metarpc/nodemt4';

class MT4Account {
  // Contract spec of one (set a name) or all symbols. Returns SymbolParamsManyData; throws MrpcError on failure.
  symbolParamsMany(req?: any /* SymbolParamsManyRequest */, timeoutMs?: number): Promise<any /* SymbolParamsManyData */>;
}
```

**Request message:** `SymbolParamsManyRequest { string symbol_name = 1; }` *(omit the name for every symbol)* · **Reply:** `SymbolParamsManyReply { oneof { SymbolParamsManyData data; Error error; } }`.

---

## 🔽 Input

| Setter | Type | Description |
| ------ | ---- | ----------- |
| `setSymbolName(s)` | `string` *(optional)* | One symbol; omit to return **all** (heavier — pass a larger `timeoutMs`, e.g. `60000`). |

---

## ⬆️ Output — `SymbolParamsManyData`

`getSymbolInfosList()` → `SymbolParamsManyInfo[]`. Key fields:

| JS accessor | Type | Description |
| ----------- | ---- | ----------- |
| `getSymbolname()` | `string` | Symbol. |
| `getSymdescription()` | `string` | Long description. |
| `getDigits()` | `number` | Price decimal places. |
| `getPoint()` | `number` | Point size (pip = point × 10 on 3/5-digit symbols). |
| `getTradecontractsize()` | `number` | Contract size (units per lot). |
| `getVolumemin()` / `getVolumemax()` / `getVolumestep()` | `number` | Lot limits and step. |
| `getVolumelimit()` | `number` | Max total volume per symbol. |
| `getTradestopslevel()` | `number` | Min SL/TP distance from price (points). |
| `getTradefreezelevel()` | `number` | Freeze distance (points). |
| `getTradetickvalue()` / `getTradeticksize()` | `number` | Tick value / tick size (sizing). |
| `getSwaplong()` / `getSwapshort()` / `getSwapmode()` | `number` | Swap rates and mode. |
| `getCurrencybase()` / `getCurrencyprofit()` / `getCurrencymargin()` | `string` | Base / profit / margin currencies. |
| `getTrademode()` / `getTradeexemode()` / `getTradecalcmode()` | `number` *(enum)* | Trade / execution / calc modes — **these three return enum values**, see [Enum fields](#enum-fields-returned-values) below. |
| `getMargininitial()` / `getMarginmaintenance()` | `number` | Initial / maintenance margin. |
| `getIsSelected()` / `getVisible()` | `boolean` | In Market Watch / visible. |
| `getBid()` | `number` | **Stale** snapshot bid — price from [Quote](./Quote.md) instead. |
| `getTime()` | `Timestamp` | Snapshot time. |
| `getPath()` | `string` | Market Watch folder path. |

---

## 🔢 Enum fields (returned values)

Three `SymbolParamsManyInfo` fields are **enum results** — the getter returns a `number` whose meaning is a constant on `AccountHelperPb`. They are read-only descriptors of the symbol (not request selectors). Compare against the full constant, e.g. `info.getTrademode() === AccountHelperPb.SP_ENUM_SYMBOL_TRADE_MODE.SYMBOL_TRADE_MODE_FULL`.

### `getTrademode()` → `SP_ENUM_SYMBOL_TRADE_MODE`

```proto
enum SP_ENUM_SYMBOL_TRADE_MODE {
  SYMBOL_TRADE_MODE_DISABLED  = 0;  // trading disabled for this symbol
  SYMBOL_TRADE_MODE_LONGONLY  = 1;  // only long positions
  SYMBOL_TRADE_MODE_SHORTONLY = 2;  // only short positions
  SYMBOL_TRADE_MODE_CLOSEONLY = 3;  // only position closing
  SYMBOL_TRADE_MODE_FULL      = 4;  // no trading limitations
}
```

### `getTradeexemode()` → `SP_ENUM_SYMBOL_TRADE_EXECUTION`

```proto
enum SP_ENUM_SYMBOL_TRADE_EXECUTION {
  SYMBOL_TRADE_EXECUTION_REQUEST  = 0;  // execution by request
  SYMBOL_TRADE_EXECUTION_INSTANT  = 1;  // instant execution
  SYMBOL_TRADE_EXECUTION_MARKET   = 2;  // market execution
  SYMBOL_TRADE_EXECUTION_EXCHANGE = 3;  // exchange execution
}
```

### `getTradecalcmode()` → `SP_ENUM_TRADE_CALC_MODE`

```proto
enum SP_ENUM_TRADE_CALC_MODE {
  SYMBOL_TRADE_MARGINE_CALC_MODE_FOREX   = 0;  // Forex margin calculation
  SYMBOL_TRADE_MARGINE_CALC_MODE_FUTURES = 1;  // Futures margin calculation
  SYMBOL_TRADE_MARGINE_CALC_MODE_CFD     = 2;  // CFD margin calculation
}
```

> **💡 Enum usage note:** the generated enums are namespace objects on `AccountHelperPb`. `getSwapmode()` is **not** a protobuf enum here — it comes back as a plain `number` swap-mode code.

---

## 🧩 Notes & Tips

* **Round volumes** to `getVolumestep()` and clamp to `[getVolumemin(), getVolumemax()]` before sending an order.
* **Pip size** = `getPoint() * (digits === 3 || digits === 5 ? 10 : 1)`.
* **All-symbols** is a big payload — pass `timeoutMs = 60000` and cache it.
* **Errors are exceptions:** rejects with `MrpcError` / the gRPC error.

---

## 🔗 Usage Examples

### 1) One symbol's spec

```ts
import { MT4Account, AccountHelperPb } from '@metarpc/nodemt4';

const req = new AccountHelperPb.SymbolParamsManyRequest();
req.setSymbolName('EURUSD');
const info = (await account.symbolParamsMany(req)).getSymbolInfosList()[0];
console.log(`digits ${info.getDigits()}  point ${info.getPoint()}  minLot ${info.getVolumemin()}  step ${info.getVolumestep()}`);
```

### 2) Round a volume to the symbol's step

```ts
function roundVolume(info: any, lots: number): number {
  const step = info.getVolumestep() || 0.01;
  const v = Math.round(lots / step) * step;
  return Math.min(Math.max(v, info.getVolumemin()), info.getVolumemax());
}
```

### 3) All symbols (cached)

```ts
const all = await account.symbolParamsMany(new AccountHelperPb.SymbolParamsManyRequest(), 60000);
console.log('symbols with specs:', all.getSymbolInfosList().length);
```

---

## 📚 See Also

* [TickValueWithSize](./TickValueWithSize.md) — just tick value / size / contract size for sizing.
* [Symbols](./Symbols.md) — the plain name list.
* **Friendly layer:** [`MT4Service.symbolParams(sym)` / `symbolParamsAll()`](../../MT4Service/MT4Service.Overview.md) → typed `SymbolParams`.
