# Your First Project

> Build a small, complete NodeMT4 script: connect, quote, trade with risk sizing, and report.

---

## 1 · Set up

```bash
mkdir mt4-bot && cd mt4-bot
npm init -y
npm install github:MetaRPC/NodeMT4
```

Create `index.mjs`.

---

## 2 · Connect

```ts
import { MT4Sugar } from '@metarpc/nodemt4';

const sugar = MT4Sugar.create('mt4.mrpc.pro', 443, process.env.MRPC_API_KEY);
await sugar.quickConnect(
  Number(process.env.MT4_LOGIN),
  process.env.MT4_PASSWORD,
  process.env.MT4_SERVER,         // e.g. TeleTrade-Demo
);
console.log('connected?', sugar.isConnected());
```

> Need the `MRPC_API_KEY`? Register at [https://mrpc.pro/signup](https://mrpc.pro/signup) — your key is then provisioned automatically and shown in the [MT4 Client API Explorer](https://mrpc.pro/explorer/mt4-client) (*Copy key*). See [Getting Started → API Key](./GETTING_STARTED.md). (Or omit it for keyless `TRIAL` access while testing.)

---

## 3 · Look at the market

```ts
const symbol = 'EURUSD';
const price = await sugar.getPriceInfo(symbol);
console.log(`${symbol}  bid ${price.bid}  ask ${price.ask}  ${price.spreadPips.toFixed(1)} pips`);
```

---

## 4 · Trade with risk sizing

```ts
// risk 1% of balance over a 20-pip stop, 40-pip target
const lots = await sugar.calculatePositionSize(symbol, 1, 20);

const { ok, reason } = await sugar.canOpenPosition(symbol, lots);
if (!ok) throw new Error('cannot trade: ' + reason);

const ticket = await sugar.buyMarketWithPips(symbol, lots, 20, 40);
console.log('opened #', ticket, 'with', lots, 'lots');
```

> On MT4 the opened trade is a **market order** identified by its `ticket` — there is no separate "position id".

---

## 5 · Manage & report

```ts
console.log('open positions:', await sugar.countOpenPositions());
console.log('floating P/L:', await sugar.getTotalProfit());

// tidy up for the demo
await sugar.closeAllPositions();

const stats = await sugar.getDailyStats();
console.log(`today: ${stats.totalDeals} deals, net ${stats.totalProfit.toFixed(2)}`);
```

---

## 6 · Run it

```bash
MT4_LOGIN=500000 MT4_PASSWORD=secret MT4_SERVER=TeleTrade-Demo \
MRPC_API_KEY=YOUR_KEY node index.mjs
```

---

## Where to go next

* Stream live prices → [gRPC Stream Management](./GRPC_STREAM_MANAGEMENT.md).
* Strategy loops → [Orchestrators](../Orchestrators/Strategies.Master.Overview.md).
* Full helper list → [MT4Sugar API](../MT4Sugar/MT4Sugar.API_Overview.md).
