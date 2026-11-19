# ✅ Getting an Account Summary

> **Request:** full account summary (`AccountSummaryData`) from **MT4**. Fetch all core account metrics in a single call.

**API Information:**

* **Low-level API:** `MT4Account.accountSummary(...)` (from `@metarpc/nodemt4`)
* **gRPC service:** `mt4_term_api.AccountHelper`
* **Proto definition:** `AccountSummary` (defined in `mt4-term-api-account-helper.proto`)

### RPC

* **Service:** `mt4_term_api.AccountHelper`
* **Method:** `AccountSummary(AccountSummaryRequest) → AccountSummaryReply`
* **Low-level client (generated):** `AccountHelperClient.accountSummary(request, metadata, opts, cb)`

---

## 💬 Just the essentials

* **What it is.** A single RPC returning core account state: balance, equity, credit, currency, leverage, trade mode, server time.
* **Why you need it.** Fast dashboard / CLI status; double-check login / currency / leverage; connection heartbeat via `getServerTime()`.
* **Sanity check.** If `getAccountLogin()`, `getAccountCurrency()`, `getAccountLeverage()` and `getAccountEquity()` are set → the connection is alive.

---

## 🎯 Purpose

Use it to display real-time account state and sanity-check connectivity:

* Dashboard / CLI status in one call.
* Verify balance & equity before trading.
* Terminal heartbeat via `getServerTime()` and `getUtcServerTimeShiftMinutes()`.

> **Prefer plain values?** [`MT4Service.getAccountInfo()`](../../MT4Service/MT4Service.Overview.md) returns a friendly `AccountInfo` object (named fields, times as numbers) instead of protobuf.

---

## 🧱 Signature

```ts
import { MT4Account, AccountHelperPb } from '@metarpc/nodemt4';

class MT4Account {
  // Retrieves core account information in a single call.
  // Returns the raw AccountSummaryData (read fields with getXxx()); throws MrpcError on failure.
  accountSummary(req?: any /* AccountSummaryRequest */): Promise<any /* AccountSummaryData */>;
}
```

**Request message:**

`AccountSummaryRequest {}` *(empty message — the argument is optional and defaults to an empty request)*

**Reply message:**

```protobuf
AccountSummaryReply {
  oneof response {
    AccountSummaryData data = 1;
    Error error = 2;
  }
}
```

`MT4Account` unwraps the `oneof`: it resolves with `data` on success and **rejects** with `MrpcError` (carrying the server-side `Error`) otherwise.

---

## 🔽 Input

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `req` | `AccountSummaryRequest` *(optional)* | Empty request message. Omit it to use `new AccountHelperPb.AccountSummaryRequest()`. |

**There is no `ctx`/timeout parameter.** Each call runs on a per-call deadline from the client (`callTimeoutMs`, default `30000` ms — `accountSummary` uses `15000` ms internally). Tune it on the account:

```ts
account.callTimeoutMs = 5000;   // deadline for ordinary read RPCs
```

---

## ⬆️ Output — `AccountSummaryData`

| Field (proto) | JS accessor | Type | Description |
| ------------- | ----------- | ---- | ----------- |
| `AccountLogin` | `getAccountLogin()` | `number` | Trading account login (ID). |
| `AccountBalance` | `getAccountBalance()` | `number` | Balance excluding floating P/L. |
| `AccountEquity` | `getAccountEquity()` | `number` | Equity = balance + floating P/L. |
| `AccountCredit` | `getAccountCredit()` | `number` | Credit amount. |
| `AccountUserName` | `getAccountUserName()` | `string` | Account holder name. |
| `AccountLeverage` | `getAccountLeverage()` | `number` | Leverage (e.g. `100` for 1:100). |
| `AccountCurrency` | `getAccountCurrency()` | `string` | Deposit currency (e.g. `"USD"`). |
| `AccountCompanyName` | `getAccountCompanyName()` | `string` | Broker / company display name. |
| `AccountTradeMode` | `getAccountTradeMode()` | `EnumAccountTradeMode` | Demo / Contest / Real — see enum below. |
| `IsInvestor` | `getIsInvestor()` | `boolean` | Connected with the read-only investor password. |
| `ServerTime` | `getServerTime()` | `Timestamp` | Server time at response (broker time zone). `.getSeconds()` → unix seconds. |
| `UtcServerTimeShiftMinutes` | `getUtcServerTimeShiftMinutes()` | `number` | Add this many minutes to UTC to get broker server time. |

> **🧮 Floating profit:** the summary has no dedicated profit field — compute `getAccountEquity() - getAccountBalance()`.

### ⚠️ Margin fields on MT4

`AccountSummaryData` also declares `getAccountMargin()`, `getAccountMarginFree()`, `getAccountMarginLevel()`, `getAccountMarginMode()`, `getAccountTradeAllowed()` and `getAccountTradeExpert()` (the proto is shared with MT5). **On MT4 the gateway typically returns `0` / defaults for the margin fields** — do not rely on them here. For live margin, read one [`OnOpenedOrdersProfit`](../5.%20Streaming_Methods/OnOpenedOrdersProfit.md) snapshot, or use `MT4Sugar.getMargin()` / `getFreeMargin()` / `getMarginLevel()`, which do exactly that.

---

## 🧱 Related enums (from proto)

> **💡 Enum usage note:** the generated enums are namespace objects on the `*Pb` modules. Compare against the full constant, e.g. `s.getAccountTradeMode() === AccountHelperPb.EnumAccountTradeMode.ACCOUNT_TRADE_MODE_DEMO`.

### `EnumAccountTradeMode`

```protobuf
enum EnumAccountTradeMode {
  ACCOUNT_TRADE_MODE_DEMO    = 0;  // demo / practice
  ACCOUNT_TRADE_MODE_CONTEST = 1;  // contest
  ACCOUNT_TRADE_MODE_REAL    = 2;  // real trading
}
```

```ts
import { AccountHelperPb } from '@metarpc/nodemt4';
const M = AccountHelperPb.EnumAccountTradeMode;

function tradeModeToString(mode: number): string {
  switch (mode) {
    case M.ACCOUNT_TRADE_MODE_DEMO:    return 'DEMO';
    case M.ACCOUNT_TRADE_MODE_CONTEST: return 'CONTEST';
    case M.ACCOUNT_TRADE_MODE_REAL:    return 'REAL';
    default:                           return `UNKNOWN(${mode})`;
  }
}
```

### `EnumAccountMarginMode`

`getAccountMarginMode()` is enum-typed on the shared proto, but **inert on MT4** — the gateway returns `0` (`RETAIL_NETTING`). It's an MT5 margin concept; MT4 is order-centric (no netting/hedging margin modes). Listed for completeness:

```protobuf
enum EnumAccountMarginMode {
  ACCOUNT_MARGIN_MODE_RETAIL_NETTING = 0;  // MT4 default (reported value)
  ACCOUNT_MARGIN_MODE_EXCHANGE       = 1;  // exchange margin (MT5)
  ACCOUNT_MARGIN_MODE_RETAIL_HEDGING = 2;  // hedging margin  (MT5)
}
```

---

## 🧩 Notes & Tips

* **Errors are exceptions:** a server-side rejection rejects with `MrpcError`; a transport failure rejects with the gRPC error. `await` inside `try/catch`.
* **Default timeout:** read RPCs use `callTimeoutMs` (default `30000` ms); `accountSummary` uses `15000` ms.
* **Timestamps:** `getServerTime()` is a `google.protobuf.Timestamp`; read `.getSeconds()` for unix seconds, or use the friendly `MT4Service.getAccountInfo()` which returns numbers.
* **Session is automatic:** `connect()` obtains the terminal id and the SDK attaches it to this call — you never pass it yourself.

---

## 🔗 Usage Examples

### 1) Basic usage

```ts
import { MT4Account } from '@metarpc/nodemt4';

async function main() {
  const account = new MT4Account('mt4.mrpc.pro', 443);     // apiKey from MRPC_API_KEY, else TRIAL
  await account.connect({ user: 500000, password: 'password', server: 'TeleTrade-Demo' });

  const s = await account.accountSummary();
  console.log('Account Login:', s.getAccountLogin());
  console.log(`Balance: ${s.getAccountBalance().toFixed(2)} ${s.getAccountCurrency()}`);
  console.log('Equity:', s.getAccountEquity().toFixed(2));
  console.log('Leverage: 1:' + s.getAccountLeverage());

  account.close();
}
main().catch(console.error);
```

### 2) Compact status line for a CLI

```ts
async function printAccountStatus(account: MT4Account) {
  try {
    const s = await account.accountSummary();
    console.log(
      `Acc ${s.getAccountLogin()} | ${s.getAccountCurrency()} | ` +
      `Bal ${s.getAccountBalance().toFixed(2)} | Eq ${s.getAccountEquity().toFixed(2)} | ` +
      `Lev 1:${s.getAccountLeverage()} | Mode ${tradeModeToString(s.getAccountTradeMode())}`
    );
  } catch (e) {
    console.log('❌ Error:', e.message);
  }
}
// Output: Acc 500000 | USD | Bal 10000.00 | Eq 10050.25 | Lev 1:100 | Mode DEMO
```

### 3) Floating profit (no dedicated field)

```ts
async function printFloating(account: MT4Account) {
  const s = await account.accountSummary();
  const floating = s.getAccountEquity() - s.getAccountBalance();   // no dedicated profit field
  console.log('Floating P/L:', floating.toFixed(2));
}
```

### 4) Server time with timezone shift

```ts
async function printServerTime(account: MT4Account) {
  const s = await account.accountSummary();
  const broker = new Date(s.getServerTime().getSeconds() * 1000);
  const shift = s.getUtcServerTimeShiftMinutes();                 // minutes to add to UTC
  const utc = new Date(broker.getTime() - shift * 60000);
  console.log('Server time (broker):', broker.toISOString());
  console.log('Server time (UTC):   ', utc.toISOString());
  console.log('Broker offset from UTC:', shift, 'minutes');
}
```

### 5) Structured data model

```ts
interface AccountSummaryView {
  login: number; currency: string; balance: number; equity: number;
  floating: number; leverage: number; tradeMode: string; company: string;
}

function fromProto(s: any): AccountSummaryView {
  return {
    login: s.getAccountLogin(), currency: s.getAccountCurrency(),
    balance: s.getAccountBalance(), equity: s.getAccountEquity(),
    floating: s.getAccountEquity() - s.getAccountBalance(),
    leverage: s.getAccountLeverage(), tradeMode: tradeModeToString(s.getAccountTradeMode()),
    company: s.getAccountCompanyName(),
  };
}

const view = fromProto(await account.accountSummary());
console.log(view);
```

### 6) Error handling

```ts
async function tryGetSummary(account: MT4Account) {
  try {
    return await account.accountSummary();
  } catch (e) {
    console.log('Failed to get account summary:', e.message);
    return null;
  }
}
```

---

## 🔧 Common Patterns

### Health check

```ts
async function isAccountHealthy(account: MT4Account): Promise<boolean> {
  try {
    const s = await account.accountSummary();
    return s.getAccountLogin() > 0 && s.getAccountCurrency() !== '' && s.getAccountLeverage() > 0;
  } catch {
    return false;
  }
}
```

### Monitor account changes

```ts
function monitorAccount(account: MT4Account, intervalMs: number) {
  setInterval(async () => {
    try {
      const s = await account.accountSummary();
      console.log(`[${new Date().toISOString().slice(11, 19)}] Balance: ${s.getAccountBalance().toFixed(2)} | Equity: ${s.getAccountEquity().toFixed(2)}`);
    } catch (e) {
      console.log('❌ Error:', e.message);
    }
  }, intervalMs);
}
// Usage: monitorAccount(account, 5000);
```

---

## 📚 See Also

* [TradeStats](./TradeStats.md) — aggregated trade statistics over a window.
* [EquityHistory](./EquityHistory.md) — the equity-curve points for a chart.
* [OnOpenedOrdersProfit](../5.%20Streaming_Methods/OnOpenedOrdersProfit.md) — the reliable source of **live margin** on MT4.
* **Friendly layer:** [`MT4Service.getAccountInfo()`](../../MT4Service/MT4Service.Overview.md) → a named `AccountInfo` object.
