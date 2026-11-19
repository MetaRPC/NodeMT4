# 🕐 Server Timezone

> **Request:** the broker server's **UTC offset** (`ServerTimezoneData`). Every MT4 timestamp is server time — this is how you convert it to real UTC.

**API Information:**

* **Low-level API:** `MT4Account.serverTimezone(request?)` (from `@metarpc/nodemt4`)
* **gRPC service:** `mt4_term_api.ServerTimezone`
* **Proto definition:** `ServerTimezone` (defined in `mt4-term-api-server-timezone.proto`)

### RPC

* **Service:** `mt4_term_api.ServerTimezone`
* **Method:** `ServerTimezone(ServerTimezoneRequest) → ServerTimezoneReply`
* **Low-level client (generated):** `ServerTimezoneClient.serverTimezone(request, metadata, opts, cb)`

---

## 💬 Just the essentials

* **What it is.** The broker server's offset from UTC, in seconds.
* **Why you need it.** MT4 reports every time in **server time**; use this offset to convert bars, orders and account times to/from UTC.
* **Sanity check.** `getUtcOffsetSeconds()` is typically a multiple of 1800 (± a few hours).

---

## 🧱 Signature

```ts
import { MT4Account, ServerTimezonePb } from '@metarpc/nodemt4';

class MT4Account {
  // The broker server's UTC offset. Returns the raw ServerTimezoneData; throws MrpcError on failure.
  serverTimezone(req?: any /* ServerTimezoneRequest */): Promise<any /* ServerTimezoneData */>;
}
```

**Request message:** `ServerTimezoneRequest {}` *(empty — optional)* · **Reply:** `ServerTimezoneReply { oneof { ServerTimezoneData data; Error error; } }`.

---

## ⬆️ Output — `ServerTimezoneData`

| JS accessor | Type | Description |
| ----------- | ---- | ----------- |
| `getUtcOffsetSeconds()` | `number` | Broker offset from UTC in seconds (positive = ahead of UTC). |
| `getServer()` | `string` | Broker server name. |
| `getSource()` | `number` *(enum)* | Where the offset was determined from — **enum result**, see below. |
| `getValidatedUtc()` | — | Validation marker for the computed UTC. |

---

## 🔢 Enum field (returned value)

`getSource()` returns a `number` whose meaning is a `SERVER_TIMEZONE_SOURCE` constant on `ServerTimezonePb`. Compare against the full constant, e.g. `tz.getSource() === ServerTimezonePb.SERVER_TIMEZONE_SOURCE.SERVER_TIMEZONE_SOURCE_LIVE`.

### `getSource()` → `SERVER_TIMEZONE_SOURCE`

```proto
enum SERVER_TIMEZONE_SOURCE {
  SERVER_TIMEZONE_SOURCE_UNKNOWN        = 0;  // not determined
  SERVER_TIMEZONE_SOURCE_LIVE           = 1;  // measured from the live server clock
  SERVER_TIMEZONE_SOURCE_LAST_VALIDATED = 2;  // last validated/cached value
}
```

---

## 🧩 Notes & Tips

* **Two sources of the same truth.** `accountSummary().getUtcServerTimeShiftMinutes()` gives the offset in minutes; `serverTimezone()` gives it in seconds with the server name.
* **Convert a server time to UTC:** `utcMs = serverMs - getUtcOffsetSeconds() * 1000`.
* **Convert a UTC time to server:** `MT4Account.serverDate(utcDate, getUtcOffsetSeconds() / 60)`.
* **Errors are exceptions:** rejects with `MrpcError` / the gRPC error.

---

## 🔗 Usage Examples

### 1) Read the offset

```ts
const tz = await account.serverTimezone();
console.log(`${tz.getServer()}  UTC offset ${(tz.getUtcOffsetSeconds() / 3600).toFixed(1)} h`);
```

### 2) Build a server-time window for QuoteHistory / OrdersHistory

```ts
import { MT4Account } from '@metarpc/nodemt4';

const offsetMin = (await account.serverTimezone()).getUtcOffsetSeconds() / 60;
const fromServer = MT4Account.serverDate(new Date(Date.now() - 7 * 864e5), offsetMin);
const toServer   = MT4Account.serverDate(new Date(), offsetMin);
// pass fromServer / toServer to quoteHistory or ordersHistory
```

---

## 📚 See Also

* [AccountSummary](../1.%20Account_Information/AccountSummary.md) — also carries `getUtcServerTimeShiftMinutes()`.
* [QuoteHistory](./QuoteHistory.md) · [OrdersHistory](../2.%20Orders_History/OrdersHistory.md) — the server-time windows this converts for.
* **Friendly layer:** [`MT4Service.getServerTimezone()`](../../MT4Service/MT4Service.Overview.md) → typed `ServerTimezone` (offset in minutes too).
