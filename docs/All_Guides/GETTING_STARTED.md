# Getting Started with NodeMT4

> **Quick setup** — connect to MetaTrader 4 from Node.js in a few minutes.

---

## What is NodeMT4?

**NodeMT4** is a Node.js / TypeScript client for MetaTrader 4 accounts over the MetaRPC gRPC API (`mt4.mrpc.pro:443`). It's organised in **three layers** you can mix freely:

* **[MT4Account](../MT4Account/MT4Account.Master.Overview.md)** — raw gRPC, protobuf in/out, full control.
* **[MT4Service](../MT4Service/MT4Service.Overview.md)** — typed objects, plain arguments.
* **[MT4Sugar](../MT4Sugar/MT4Sugar.API_Overview.md)** — one-line helpers.

See the [Project Map](./PROJECT_MAP.md) for how they fit together.

---

## Install & downloads

Two ways to use NodeMT4 — take **our ready-made project**, or take **only the protocol** and build your own client.

### 1 · Take our project (recommended)

The complete thing we built: the three layers (`MT4Sugar` / `MT4Service` / `MT4Account`), the TypeScript types, and the generated stubs — all wired together.

* **Just the library**, for your own app:

  ```bash
  npm install github:MetaRPC/NodeMT4
  ```

  Installs as `@metarpc/nodemt4` with the SDK, the types, **and** the protobuf stubs under `@metarpc/nodemt4/package/`.

* **The full repo** (adds the runnable `examples/demos/` and the tests):

  ```bash
  git clone https://github.com/MetaRPC/NodeMT4.git
  cd NodeMT4
  npm install
  node examples/demos/main.js 6     # run a demo (6 = sugar basics)
  ```

  The compiled `src/*.js` are checked in, so no build step is required (run `npm run build` only after editing the TypeScript).

> 🎓 **New here? Start with the full repo (the `git clone` above).** You get all **three layers** side by side (`MT4Account` → `MT4Service` → `MT4Sugar`) and ready-made **examples written on each of them** that you can run and read. Learn the SDK this way first — only once you're comfortable should you consider building your own from the raw protos (option 2 below).

### 2 · Take only the protos and build it yourself (raw gRPC)

**For advanced use — after you know the SDK.** Skip our layers and talk to the gateway from the generated stubs directly. The stubs ship in the **`package/`** folder (`mt4-term-api-*_pb.js`, `*_grpc_pb.js`, and the `google/` subfolder).

**Download just the `package/` folder** (not the whole repo) — any of these:

```bash
# A) quickest — grab only the subfolder (no git history)
npx degit MetaRPC/NodeMT4/package package

# B) pure git — sparse-checkout only package/
git clone --depth 1 --filter=blob:none --no-checkout https://github.com/MetaRPC/NodeMT4.git
cd NodeMT4 && git sparse-checkout set --no-cone 'package/**' && git checkout

# C) via npm — then copy the folder out of node_modules
npm install github:MetaRPC/NodeMT4
cp -r node_modules/@metarpc/nodemt4/package ./package
```

Then install the gRPC + protobuf runtime next to it:

```bash
npm install google-protobuf @grpc/grpc-js
```

The raw **`.proto`** sources (to regenerate stubs for another language or version) are on the **[MT4 Client API Explorer](https://mrpc.pro/explorer/mt4-client)** → *Download MT4 Protos*.

> ⚠️ **The stubs are not standalone — take the whole `package/` folder, not single files.** Each `*_pb.js` cross-requires its siblings (e.g. `./mrpc-mt4-error_pb.js`), the `./google/` subfolder and `google-protobuf`. This path gives you **raw gRPC with no 3-layer SDK** — see the [Protobuf Inspector](./PROTOBUF_INSPECTOR_GUIDE.md).

---

## 🔑 API Key & Authentication

Connecting to the MetaRPC production endpoint (`mt4.mrpc.pro:443`) uses a personal **API key** — you get one just by registering on our site:

1. **Sign up** — create a free account at **[https://mrpc.pro/signup](https://mrpc.pro/signup)**.
2. **Copy your key** — it's **provisioned automatically**; open the **[MT4 Client API Explorer](https://mrpc.pro/explorer/mt4-client)** and your key is shown at the top (*Active* · **Copy key**). Nothing to generate — the key itself is free.
3. **Use it** — pass the key to `MT4Sugar.create(host, port, apiKey)` (or set the `MRPC_API_KEY` environment variable instead of hard-coding it).

You'll also need an MT4 **demo** account (login / password / server, e.g. `TeleTrade-Demo`) — see [MT4 for Beginners](./MT4_For_Beginners.md) to create one (one click for $1, or free via the MT4 terminal).

> 💡 **`TRIAL` / keyless.** No key yet? Pass the literal value `TRIAL` as the key to connect for a first look. Your own key — free from sign-up — is for normal use.

### 🆔 Session ID is automatic

You never call `GetId` or supply an `id` header. On `connect` / `connectEx` the server generates a terminal session GUID (`terminalInstanceGuid`) and the SDK attaches it — alongside your API key — to every later request and stream automatically.

---

## Connect & read the account

```ts
import { MT4Sugar } from '@metarpc/nodemt4';

const sugar = MT4Sugar.create('mt4.mrpc.pro', 443, 'YOUR_API_KEY');
await sugar.quickConnect(500000, 'password', 'TeleTrade-Demo');

const info = await sugar.getAccountInfo();
console.log(`${info.name} #${info.login} — ${info.balance} ${info.currency} on ${info.server}`);
```

Prefer environment variables? Set `MT4_LOGIN` / `MT4_PASSWORD` / `MT4_SERVER` and call `sugar.quickConnect()` with no arguments.

---

## A first trade (demo)

```ts
const ticket = await sugar.buyMarket('EURUSD', 0.01);   // tiny demo order
console.log('opened #', ticket);
await sugar.closePosition(ticket);
```

Trading helpers **throw** `MrpcError` on a broker rejection (and `TradeOutcomeUnknownError` when an outcome is unknown) — wrap them in `try/catch`. See [Return Codes & the error model](./RETURN_CODES_REFERENCE.md).

> On MT4 a "position" is an open **market order** (one ticket per fill, no netting).

---

## Dropping down a layer

Need something the sugar layer doesn't expose? Go down:

```ts
const service = sugar.service();   // MT4Service — typed objects
const account = sugar.account();   // MT4Account — raw protobuf

const quote = await service.quote('EURUSD');   // Quote { bid, ask, time }
// const raw = await account.quote(req);        // raw QuoteData (build the request yourself)
```

---

## Next

* [Your First Project](./Your_First_Project.md) — build a small script end to end.
* [MT4 for Beginners](./MT4_For_Beginners.md) — the trading concepts.
* [MT4Sugar API](../MT4Sugar/MT4Sugar.API_Overview.md) — every helper.
* [SDK Ecosystem](./SDK_Ecosystem.md) — how NodeMT4 pairs with the **Trade Copier** to mirror trades across accounts.
