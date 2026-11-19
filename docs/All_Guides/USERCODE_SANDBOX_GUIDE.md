# Usercode Sandbox Guide — Node

> `examples/demos/usercode/16_usercode.js` is a ready-to-edit scratchpad. It hands you an **already-connected** `MT4Sugar` exposing all three layers, so you can try the SDK without writing any connection or menu plumbing.

---

## 🚀 Run it

```bash
node examples/demos/main.js 16
```

Credentials come from `examples/demos/config/config.json` or the env vars `MT4_LOGIN` / `MT4_PASSWORD` / `MT4_SERVER` / `MRPC_API_KEY` (leave the key empty for trial access).

---

## 🧱 What you get

```ts
module.exports = async function demo(sugar, cfg) {
  // sugar : a connected MT4Sugar
  //   sugar.service()  → MT4Service (typed objects)
  //   sugar.account()  → MT4Account (raw protobuf)
  // cfg   : { testSymbol, testVolume, user, server, ... }

  //  YOUR CODE HERE — sugar is already connected.
};
```

All three layers are one call away — reach for whichever altitude fits:

```ts
// high level — one-liners
console.log('balance', await sugar.getBalance());
console.log('bid', await sugar.getBid(cfg.testSymbol));

// mid level — typed objects
const acc = await sugar.service().getAccountInfo();
console.log(acc.equity, acc.currency);

// low level — raw protobuf
const data = await sugar.account().accountSummary();
console.log(data.getAccountBalance());
```

---

## 🧪 Good first experiments

**Inspect your account & market (read-only):**

```ts
console.log(`balance ${(await sugar.getBalance()).toFixed(2)}  equity ${(await sugar.getEquity()).toFixed(2)}`);
const p = await sugar.getPriceInfo(cfg.testSymbol);
console.log(`${cfg.testSymbol}  ${p.bid}/${p.ask}  ${p.spreadPips.toFixed(1)} pips`);

for (const pos of await sugar.getOpenPositions()) {
  console.log(`#${pos.ticket} ${pos.symbol} ${pos.lots} P/L ${pos.profit.toFixed(2)}`);
}
```

**Size a trade by risk (still no order sent):**

```ts
const lots = await sugar.calculatePositionSize(cfg.testSymbol, 1, 20);   // 1% over 20 pips
const { ok, reason } = await sugar.canOpenPosition(cfg.testSymbol, lots);
console.log('would open', lots, 'lots →', ok ? 'OK' : reason);
```

**Stream a few ticks:**

```ts
await new Promise((resolve) => {
  let n = 0;
  const sub = sugar.service().subscribeQuotes([cfg.testSymbol], (t) => {
    console.log(t.bid, t.ask);
    if (++n >= 5) { sub.unsubscribe(); resolve(); }
  });
});
```

---

## ⚠️ Trading from the sandbox

Nothing trades until you call a trading method. When you do, keep it small and on the **demo** account:

```ts
const ticket = await sugar.buyMarket(cfg.testSymbol, cfg.testVolume);   // tiny demo order
await sugar.closePosition(ticket);
```

Trading one-liners **throw** on a broker rejection (e.g. `mqlIntCode` 132 market closed) — wrap them in `try/catch`. A trade with an unknown transport outcome throws `TradeOutcomeUnknownError` — reconcile before retrying. See [Return Codes](./RETURN_CODES_REFERENCE.md).

---

## 💡 Tips

* Use the [Protobuf Inspector](./PROTOBUF_INSPECTOR_GUIDE.md) snippets here to discover accessors live.
* The sandbox disconnects for you when the demo returns — no cleanup needed.
* Copy a working snippet into your own project once it does what you want.

---

## See also

* [Your First Project](./Your_First_Project.md) · [MT4Sugar API](../MT4Sugar/MT4Sugar.API_Overview.md) · [Protobuf Inspector](./PROTOBUF_INSPECTOR_GUIDE.md).
