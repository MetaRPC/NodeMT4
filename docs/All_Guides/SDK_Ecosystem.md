# The MetaRPC SDK family

> Where NodeMT4 sits — and how it pairs with the **Trade Copier** to mirror a strategy across accounts.

MetaRPC ships two families of SDKs. They share the **same authentication** (`ApiKey` + owner `user_key`), the **same gRPC-over-TLS transport** to `*.mrpc.pro`, the same [mrpc.pro](https://mrpc.pro/explorer/mt4-client) portal and the same $1 demo onboarding — but they do different jobs.

| Family | Job | Endpoint | SDKs |
| ------ | --- | -------- | ---- |
| **Terminal SDKs** | operate **one** trading account — connect, read, trade, stream | `mt4.mrpc.pro:443` (MT4) | **NodeMT4**, GoMT4, CSharpMT4, CppMT4, RustMT4, PyMT4 (+ MT5 variants) |
| **Copier SDKs** | mirror trades **between** accounts (master → followers) | `copy.mrpc.pro:443` | [NodeCopier](https://github.com/MetaRPC/NodeCopier), GoCopier, CSharpCopier, PyCopier, … |

**NodeMT4 is a Terminal SDK.** When you want to *replicate* what happens on one account to others, reach for the **Copier** SDK — in Node that's **[NodeCopier](https://github.com/MetaRPC/NodeCopier)** (`@metarpc/nodecopier`).

---

## How NodeMT4 and NodeCopier relate

|  | **NodeMT4** (this SDK) | **NodeCopier** |
| --- | --- | --- |
| Scope | one account | a master → follower **pair** |
| Does | `connect`, quotes, `orderSend`, streams | `start` · `list` · `pause` · `remove` a copier |
| Endpoint | `mt4.mrpc.pro:443` | `copy.mrpc.pro:443` |
| Thinks in | ticks, orders by ticket | risk sizing, pause/resume, copy logs |

**One sentence:** NodeMT4 is where trades are *produced and observed* on an account; NodeCopier is how they're *distributed* to followers.

### The bridge — a shared terminal session

A copier's account carries an optional **`id`** — a terminal session GUID. That's exactly the value NodeMT4 obtains on connect: after `connect` / `connectEx`, the session GUID (`terminalInstanceGuid`) lives on **`account().id`**. So an account you're already running with NodeMT4 can be enrolled into a copier without reconnecting.

NodeCopier understands account type **`MT4`** (plus `MT5`, cTrader `CT`, TradeLocker `TL`) — the same MRPC-hosted terminals NodeMT4 drives.

---

## End-to-end: run a strategy on the master, replicate to a follower

```ts
import { MT4Sugar } from '@metarpc/nodemt4';
import { CopierSugar } from '@metarpc/nodecopier';

const KEY = process.env.MRPC_API_KEY;   // owner key — note: TRIAL is NOT an owner key for the copier

// 1 · Operate the MASTER account with NodeMT4
const master = MT4Sugar.create('mt4.mrpc.pro', 443, KEY);
await master.quickConnect(Number(process.env.MASTER_LOGIN), process.env.MASTER_PASSWORD!, 'TeleTrade-Demo');
const masterSessionId = master.account().id;   // the ConnectEx terminal GUID → copier Account.id

// 2 · Start a copier: MASTER → FOLLOWER (NodeCopier, on copy.mrpc.pro)
await CopierSugar.create()
  .withCredentials(KEY!)
  .fromMaster({ type: 'MT4', user: Number(process.env.MASTER_LOGIN), password: process.env.MASTER_PASSWORD!, server: 'TeleTrade-Demo', id: masterSessionId! })
  .toSlave({ type: 'MT4', user: Number(process.env.SLAVE_LOGIN), password: process.env.SLAVE_PASSWORD!, server: 'TeleTrade-Demo' })
  .withLotMultiplier(1.0)   // or .withFixedLot(0.1)
  .withCopySl(true).withCopyTp(true)
  .start();

// 3 · Trades you now place on the master via NodeMT4 replicate to the follower
const ticket = await master.buyMarket('EURUSD', 0.01);
// … the copier mirrors the open (and the later close) onto the follower account
```

> **Install:** `npm install github:MetaRPC/NodeCopier` alongside NodeMT4 (`npm install github:MetaRPC/NodeMT4`). Both install under their `@metarpc/*` package names, so the imports above work as-is.

**Risk sizing** (the copier's `riskType`): `FixedLot` · `LotMultiplier` · `BalanceMultiplier` · `FixedBalanceMultiplier` · `EquityMultiplier`. Plus `copySl` / `copyTp` / `copyPendingOrders` / `reverseCopy`.

---

## 🧩 Notes & gotchas

- **Two services, two endpoints.** NodeMT4 talks to `mt4.mrpc.pro`; NodeCopier to `copy.mrpc.pro`. The copier is a *companion* service, not a replacement.
- **Owner key required for the copier.** `TRIAL` works for a first look on a terminal, but the copier needs a real owner `user_key`.
- **Transport success ≠ broker execution.** A successful `start` means the copier was created — confirm the follower actually opened the trade (NodeCopier's trade logs, or read the follower with NodeMT4's `openedOrders`).
- **MT4 is order-centric.** Copied trades land as MT4 orders (one ticket per fill, no netting) — the same model NodeMT4 exposes.
- **Demo-first.** Use disposable demo accounts for copier tests. Hosted terminals and running copiers are billed separately (see [pricing](https://mrpc.pro/#pricing)).

---

## See also

- **Copier SDK:** [NodeCopier on GitHub](https://github.com/MetaRPC/NodeCopier) · [NodeCopier docs](https://metarpc.github.io/NodeCopier/) · [Quickstart](https://metarpc.github.io/NodeCopier/quickstart/).
- **This SDK:** [Getting Started](./GETTING_STARTED.md) · [Project Map](./PROJECT_MAP.md) · [MT4Sugar](../MT4Sugar/MT4Sugar.API_Overview.md).
