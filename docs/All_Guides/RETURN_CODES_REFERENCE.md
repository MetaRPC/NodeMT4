# Return Codes & Error Handling

> How errors surface in NodeMT4, the MT4 error numbers you'll meet, and the one rule that matters for trading: **a trade is sent exactly once and never re-sent.**

In NodeMT4 **errors are exceptions** — there are no error return values. Every call either resolves with its data or **rejects**. `await` inside `try/catch`.

```ts
import { MrpcError, TradeOutcomeUnknownError } from '@metarpc/nodemt4';

try {
  const res = await account.orderSend(req);
} catch (e) {
  if (e instanceof TradeOutcomeUnknownError) {
    // outcome unknown — reconcile, do NOT blindly resend
  } else if (e instanceof MrpcError) {
    console.log(e.code, e.mqlIntCode, e.mqlDescription);
  } else {
    // a raw gRPC transport error
  }
}
```

---

## 🧯 The error object — `MrpcError`

A server-side rejection (the reply carried an `error`) or a failed call surfaces as an `MrpcError`.

| Member | Type | Meaning |
| ------ | ---- | ------- |
| `code` | `string` | MRPC error code (e.g. `API_KEY_INVALID`, `TERMINAL_INSTANCE_NOT_FOUND`, `MQL4_EXECUTION_FAILED`). |
| `message` | `string` | Human-readable message. |
| `mqlIntCode` | `number` | The **MT4 error number** (0 when not an MQL error). |
| `mqlDescription` | `string` | The MT4 error text. |
| `operation` | `string?` | For trade calls: `OrderSend` / `OrderModify` / `OrderCloseDelete` / `OrderCloseBy`. |

### Flags

| Getter | True when… | Do |
| ------ | ---------- | -- |
| `isInvalidLogin` | `INVALID_LOGIN` / `WRONG_PASSWORD` / `INVALID_ACCOUNT` | **Never retry** — brokers lock accounts. Fix credentials. |
| `isTerminalLost` | `TERMINAL_INSTANCE_NOT_FOUND` / `..._REGISTRY_...` | `await account.reconnect()` and retry the **read**. |
| `isApiKeyError` | `API_KEY_INVALID` / `API_KEY_REQUIRED` | Fix the key — retrying won't help. |
| `isTradeOutcomeUnknown` | a trade timed out / unknown transport outcome | Reconcile with `openedOrders()` before any retry. |

---

## ⚠️ `TradeOutcomeUnknownError` — the exactly-once rule

Every trade (`orderSend` / `orderModify` / `orderCloseDelete` / `orderCloseBy`) is **sent once** and **never re-sent by the SDK**. When the transport fails *after* the request may already have reached the terminal — gRPC `UNAVAILABLE`, `DEADLINE_EXCEEDED`, `UNKNOWN`, `INTERNAL` — or MT4 answers **128 (trade timeout)**, the call rejects with a `TradeOutcomeUnknownError`:

| Member | Meaning |
| ------ | ------- |
| `errorCode` | `'TRADE_OUTCOME_UNKNOWN'` (same across every MetaRPC SDK). |
| `isTradeOutcomeUnknown` | `true`. |
| `operation` | The trade call (e.g. `OrderSend`). |
| `code` / `grpcCode` | The original gRPC status number (so `err.code === grpc.status.UNAVAILABLE` still works). |
| `details` / `metadata` / `cause` | The original gRPC error's fields. |

**The trade may or may not have executed.** Check [open orders](../MT4Account/2.%20Orders_History/OpenedOrders.md) (and recent history) before deciding whether to send it again. A refused API key inside a transport failure is **not** wrapped (the trade was refused, not lost).

---

## 📋 Common MT4 error numbers (`mqlIntCode`)

| Code | Name | Meaning |
| ---- | ---- | ------- |
| `0` | ERR_NO_ERROR | Success. |
| `128` | ERR_TRADE_TIMEOUT | **Trade timed out — outcome unknown** (→ `isTradeOutcomeUnknown`). |
| `129` | ERR_INVALID_PRICE | Invalid price. |
| `130` | ERR_INVALID_STOPS | SL/TP too close to price (see `SymbolParams.getTradestopslevel()`). |
| `131` | ERR_INVALID_TRADE_VOLUME | Volume not a valid multiple of the step / out of range. |
| `132` | ERR_MARKET_CLOSED | Market is closed. |
| `133` | ERR_TRADE_DISABLED | Trading disabled for the symbol/account. |
| `134` | ERR_NOT_ENOUGH_MONEY | Insufficient free margin. |
| `135` | ERR_PRICE_CHANGED | Price changed — re-quote and retry. |
| `136` | ERR_OFF_QUOTES | No quotes available. |
| `138` | ERR_REQUOTE | Broker re-quoted — retry at the new price. |
| `139` | ERR_ORDER_LOCKED | Order is locked / being processed. |
| `141` | ERR_TOO_MANY_REQUESTS | Slow down. |
| `145` | ERR_TRADE_MODIFY_DENIED | Modification denied (too close to market). |
| `146` | ERR_TRADE_CONTEXT_BUSY | Trade context busy — retry shortly. |
| `148` | ERR_TRADE_TOO_MANY_ORDERS | Order count limit reached. |

> Codes `130`/`131`/`132`/`134`/`138` are **refusals** (`MrpcError`, not unknown-outcome). Code `128` and transport failures are **unknown-outcome** (`TradeOutcomeUnknownError`).

---

## 🌐 gRPC transport status (raw errors)

A transport failure (not a reply error) rejects with the gRPC error. The ones that make a **trade** outcome unknown:

| gRPC status | Typical cause |
| ----------- | ------------- |
| `UNAVAILABLE` (14) | Connection dropped / gateway unreachable. |
| `DEADLINE_EXCEEDED` (4) | The call outran its deadline. |
| `UNKNOWN` (2) | Unclassified server failure. |
| `INTERNAL` (13) | Internal gateway error. |

For **reads**, the same transport errors are just the gRPC error — safe to retry.

---

## ✅ Handling recipe

```ts
import { MrpcError, TradeOutcomeUnknownError } from '@metarpc/nodemt4';

async function safeBuy(sugar, symbol, lots) {
  try {
    return await sugar.buyMarket(symbol, lots);
  } catch (e) {
    if (e instanceof TradeOutcomeUnknownError) {
      const open = await sugar.service().openedOrders();        // reconcile first
      // decide from `open` whether the order actually landed
      return null;
    }
    if (e instanceof MrpcError) {
      if (e.mqlIntCode === 134) console.log('not enough money');
      else if (e.mqlIntCode === 132) console.log('market closed');
      else console.log('refused:', e.code, e.mqlDescription);
      return null;
    }
    throw e;   // unexpected
  }
}
```

---

## See also

* **Low-level:** [Trading Operations — Overview](../MT4Account/4.%20Trading_Operations/Trading_Operations.Overview.md) — where the exactly-once rule is enforced.
* **Friendly layers:** [`MT4Service`](../MT4Service/MT4Service.Overview.md) · [`MT4Sugar`](../MT4Sugar/MT4Sugar.API_Overview.md).
