# 🔌 On Connect State

> **Stream:** terminal **connection-state** events — connected / alive / API-alive, with the server and account. Pause a strategy while the terminal is offline.

**API Information:**

* **Low-level API:** `MT4Account.onConnectState(request?, onData, onError?)` (from `@metarpc/nodemt4`)
* **gRPC service:** `mt4_term_api.Connection`
* **Proto definition:** `OnConnectState` (defined in `mt4-term-api-connection.proto`)

### RPC

* **Service:** `mt4_term_api.Connection`
* **Method:** `OnConnectState(OnConnectStateRequest) → stream OnConnectStateReply`
* **Low-level client (generated):** `ConnectionClient.onConnectState(request, metadata)` (server stream)

---

## 💬 Just the essentials

* **What it is.** A push stream of the terminal's connection health.
* **Why you need it.** Gate trading on "is the terminal actually connected and alive?"; log disconnects/reconnects.
* **Sanity check.** `getIsConnected() && getIsAlive()` means it's ready.

---

## 🧱 Signature

```ts
import { MT4Account, ConnectionPb, Subscription } from '@metarpc/nodemt4';

class MT4Account {
  // Terminal connection-state stream. Returns a Subscription; unsubscribe() to stop.
  onConnectState(req?: any /* OnConnectStateRequest */, onData?: (data: any) => void, onError?: (e: any) => void): Subscription;
}
```

**Request message:** `OnConnectStateRequest { repeated string terminal_ids = 1; }` *(optional — defaults to the current terminal)*
**Reply (streamed):** `OnConnectStateReply { oneof { ConnectStateData data; Error error; } }`.

---

## ⬆️ Payload — `ConnectStateData`

| JS accessor | Type | Description |
| ----------- | ---- | ----------- |
| `getIsConnected()` | `boolean` | Terminal is connected to the broker. |
| `getIsAlive()` | `boolean` | Terminal process is alive. |
| `getApiIsAlive()` | `boolean` | The MRPC API bridge is alive. |
| `getState()` | `number` / `string` | Connection-state code. |
| `getServer()` | `string` | Broker server name. |
| `getAccount()` | `number` | Account login. |
| `getId()` | `string` | Terminal session id (GUID). |
| `getTimestamp()` | `Timestamp` | Event time. |
| `getErrorMessage()` | `string` | Reason, when not connected. |

---

## 🧩 Notes & Tips

* **Gate your strategy** — only send orders while `getIsConnected() && getIsAlive()`.
* **Reconnect on loss** — on a disconnect you may also want `account.reconnect()` (after a `TERMINAL_INSTANCE_NOT_FOUND`).
* **Re-subscribe on `onError`**; `unsubscribe()` when done.

---

## 🔗 Usage Examples

### 1) Watch connection health

```ts
import { MT4Account, ConnectionPb } from '@metarpc/nodemt4';

const sub = account.onConnectState(new ConnectionPb.OnConnectStateRequest(), (data) => {
  console.log(`connected ${data.getIsConnected()}  alive ${data.getIsAlive()}  server ${data.getServer()}`);
  if (!data.getIsConnected()) console.log('⚠️ offline:', data.getErrorMessage());
}, (e) => console.log('state stream error:', e.message || e));

// later: sub.unsubscribe();
```

### 2) A "ready to trade" gate

```ts
let ready = false;
account.onConnectState(new ConnectionPb.OnConnectStateRequest(), (d) => {
  ready = d.getIsConnected() && d.getIsAlive();
});
// elsewhere: if (ready) await sugar.buyMarket('EURUSD', 0.01);
```

---

## 📚 See Also

* [AccountSummary](../1.%20Account_Information/AccountSummary.md) — a one-shot "is the connection alive?" check.
* **Connection lifecycle:** `connect` / `reconnect` / `checkConnect` on [MT4Account](../MT4Account.Master.Overview.md).
* **Friendly layer:** [`MT4Service.subscribeConnectState(cb)`](../../MT4Service/MT4Service.Overview.md).
