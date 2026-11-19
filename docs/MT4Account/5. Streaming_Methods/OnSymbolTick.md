# 📡 On Symbol Tick

> **Stream:** live ticks for one or more symbols. The callback fires with each reply's raw `*Data`; read the tick via `getSymbolTick()`.

**API Information:**

* **Low-level API:** `MT4Account.onSymbolTick(request, onData, onError?)` (from `@metarpc/nodemt4`)
* **gRPC service:** `mt4_term_api.SubscriptionService`
* **Proto definition:** `OnSymbolTick` (defined in `mt4-term-api-subscriptions.proto`)

### RPC

* **Service:** `mt4_term_api.SubscriptionService`
* **Method:** `OnSymbolTick(OnSymbolTickRequest) → stream OnSymbolTickReply`
* **Low-level client (generated):** `SubscriptionServiceClient.onSymbolTick(request, metadata)` (server stream)

---

## 💬 Just the essentials

* **What it is.** A push stream of ticks for the symbols you subscribe.
* **Why you need it.** Live prices without polling [Quote](../3.%20Symbols_Quotes/Quote.md).
* **Sanity check.** Select symbols first (Market Watch) or no ticks arrive.

---

## 🧱 Signature

```ts
import { MT4Account, SubscriptionsPb, Subscription } from '@metarpc/nodemt4';

class MT4Account {
  // Live tick stream. Returns a Subscription; call unsubscribe() to stop.
  onSymbolTick(req: any /* OnSymbolTickRequest */, onData: (data: any) => void, onError?: (e: any) => void): Subscription;
}
```

**Request message:** `OnSymbolTickRequest { repeated string symbol_names = 1; }`
**Reply (streamed):** `OnSymbolTickReply { oneof { OnSymbolTickData data; Error error; } }`.

---

## 🔽 Input

| Setter | Type | Description |
| ------ | ---- | ----------- |
| `setSymbolNamesList(arr)` | `string[]` | Symbols to stream (must be in Market Watch). |

---

## ⬆️ Payload — `OnSymbolTickData`

`getSymbolTick()` → `OnSymbolMqlTickInfo`:

| JS accessor | Type | Description |
| ----------- | ---- | ----------- |
| `getSymbol()` | `string` | The symbol. |
| `getBid()` / `getAsk()` | `number` | Bid / ask. |
| `getLast()` | `number` | Last price. |
| `getVolume()` | `number` | Tick volume. |
| `getTime()` | `Timestamp` | Tick time, broker server time. |
| `getTimeMsc()` | `number` | Tick time, milliseconds (server). |
| `getTimeUtc()` / `getTimeMscUtc()` | `Timestamp` / `number` | The same in UTC. |

---

## 🧩 Notes & Tips

* **Select first** — [SymbolSelect](../3.%20Symbols_Quotes/SymbolSelect.md) each symbol, or no ticks come.
* **Re-subscribe on `onError`** (transport error / unexpected end); a cancel via `unsubscribe()` is not an error.
* **Keep callbacks fast** — offload heavy work; ticks can be frequent.

---

## 🔗 Usage Examples

### 1) Stream two symbols for 5 seconds

```ts
import { MT4Account, SubscriptionsPb } from '@metarpc/nodemt4';

const req = new SubscriptionsPb.OnSymbolTickRequest();
req.setSymbolNamesList(['EURUSD', 'GBPUSD']);

const sub = account.onSymbolTick(req, (data) => {
  const t = data.getSymbolTick();
  if (t) console.log(`${t.getSymbol()} bid ${t.getBid()} ask ${t.getAsk()}`);
}, (e) => console.log('stream error:', e.message || e));

setTimeout(() => sub.unsubscribe(), 5000);
```

### 2) Track the latest bid per symbol

```ts
const latest: Record<string, number> = {};
const sub = account.onSymbolTick(req, (data) => {
  const t = data.getSymbolTick();
  if (t) latest[t.getSymbol()] = t.getBid();
});
```

---

## 📚 See Also

* [Quote](../3.%20Symbols_Quotes/Quote.md) / [QuoteMany](../3.%20Symbols_Quotes/QuoteMany.md) — one-shot prices.
* **Friendly layer:** [`MT4Service.subscribeQuotes(symbols, cb)`](../../MT4Service/MT4Service.Overview.md) → typed `Tick`; `MT4Sugar.waitForPrice`.
