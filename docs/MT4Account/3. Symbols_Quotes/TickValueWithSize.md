# 🧮 Tick Value With Size

> **Request:** tick value, tick size and contract size for **several symbols** in one call (`TickValueWithSizeData`) — the inputs for position sizing.

**API Information:**

* **Low-level API:** `MT4Account.tickValueWithSize(request)` (from `@metarpc/nodemt4`)
* **gRPC service:** `mt4_term_api.AccountHelper`
* **Proto definition:** `TickValueWithSize` (defined in `mt4-term-api-account-helper.proto`)

### RPC

* **Service:** `mt4_term_api.AccountHelper`
* **Method:** `TickValueWithSize(TickValueWithSizeRequest) → TickValueWithSizeReply`
* **Low-level client (generated):** `AccountHelperClient.tickValueWithSize(request, metadata, opts, cb)`

---

## 💬 Just the essentials

* **What it is.** For each symbol: the money value of one tick, the tick size, and the contract size.
* **Why you need it.** Convert a stop distance in pips into a money risk → compute a lot size.
* **Sanity check.** `getTradetickvalue() > 0 && getTradeticksize() > 0`.

---

## 🧱 Signature

```ts
import { MT4Account, AccountHelperPb } from '@metarpc/nodemt4';

class MT4Account {
  // Tick value / size / contract size for many symbols. Returns TickValueWithSizeData; throws MrpcError on failure.
  tickValueWithSize(req: any /* TickValueWithSizeRequest */): Promise<any /* TickValueWithSizeData */>;
}
```

**Request message:** `TickValueWithSizeRequest { repeated string symbol_names = 1; }` · **Reply:** `TickValueWithSizeReply { oneof { TickValueWithSizeData data; Error error; } }`.

---

## 🔽 Input

| Setter | Type | Description |
| ------ | ---- | ----------- |
| `setSymbolNamesList(arr)` | `string[]` | The symbols to size. |

---

## ⬆️ Output — `TickValueWithSizeData`

`getInfosList()` → `SymbolTickValueWithSizeInfo[]`:

| JS accessor | Type | Description |
| ----------- | ---- | ----------- |
| `getSymbolname()` | `string` | Symbol. |
| `getTradetickvalue()` | `number` | Money value of one tick (deposit currency). |
| `getTradeticksize()` | `number` | Minimum price change. |
| `getTradecontractsize()` | `number` | Units per lot. |

---

## 🧩 Notes & Tips

* **Value per pip per lot** = `(pipSize / tickSize) * tickValue`, where `pipSize = point * (digits===3||5 ? 10 : 1)`.
* **Lot for a risk** = `riskMoney / (stopPips * valuePerPipPerLot)` — then round to the volume step. The friendly `MT4Sugar.calculatePositionSize()` does this.
* **Errors are exceptions:** rejects with `MrpcError` / the gRPC error.

---

## 🔗 Usage Examples

### 1) Tick value of a basket

```ts
import { MT4Account, AccountHelperPb } from '@metarpc/nodemt4';

const req = new AccountHelperPb.TickValueWithSizeRequest();
req.setSymbolNamesList(['EURUSD', 'XAUUSD']);
for (const i of (await account.tickValueWithSize(req)).getInfosList()) {
  console.log(`${i.getSymbolname()}  tickValue ${i.getTradetickvalue()}  tickSize ${i.getTradeticksize()}  contract ${i.getTradecontractsize()}`);
}
```

### 2) Risk-based lot size

```ts
const [info] = (await account.tickValueWithSize(req)).getInfosList();
const digits = 5, point = 0.00001;
const pip = point * (digits === 3 || digits === 5 ? 10 : 1);
const valuePerPipPerLot = (pip / info.getTradeticksize()) * info.getTradetickvalue();
const riskMoney = 100, stopPips = 20;
const lots = riskMoney / (stopPips * valuePerPipPerLot);
console.log('lots:', lots.toFixed(2));
```

---

## 📚 See Also

* [SymbolParamsMany](./SymbolParamsMany.md) — the full contract spec (includes these fields).
* **Friendly layer:** [`MT4Service.tickValueWithSize(symbols)`](../../MT4Service/MT4Service.Overview.md); `MT4Sugar.calculatePositionSize()`.
