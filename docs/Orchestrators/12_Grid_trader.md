# 12 · Grid Trader

> Lay a symmetric grid of pending orders around price — buy-limits below and sell-limits above, `levels` each side, `stepPips` apart — list them, then delete the whole grid.

**Run:** `node examples/demos/main.js 12` · **File:** `examples/demos/orchestrators/12_grid_trader.js` · ⚠ places small live pending orders on the demo account and deletes them.

[← Orchestrators Overview](./Strategies.Master.Overview.md)

---

## 🎯 What it does

A grid brackets the current price with pending orders at fixed intervals, so a move in either direction triggers entries. This example builds the grid, confirms it's live, and then tears it down — a compact tour of **placing and cancelling pending orders**.

---

## 🧠 How it works

```
read bid/ask → for each level i:
  buyLimit  @ bid − i·step·pip
  sellLimit @ ask + i·step·pip
→ service().pendingOrders()  (confirm)
→ closePosition(ticket) for each  (deletes the pending)
```

1. **Select & measure.** `service().symbolSelect(sym, true)`, `getSymbolInfo` for the **pip**, then `getBid` / `getAsk`.
2. **Place.** For each level `i` (1..`levels`): a `buyLimit` `i` steps **below** the bid and a `sellLimit` `i` steps **above** the ask. Each returns a pending ticket (rejections are caught per order).
3. **Confirm.** `service().pendingOrders()` lists the live pending orders.
4. **Clean up.** `closePosition(ticket)` on each placed ticket — the same call that closes a market order **deletes a pending** one.

---

## 🎛️ Options

| Option | Default | Meaning |
| ------ | ------- | ------- |
| `levels` | `2` | Number of grid levels per side. |
| `stepPips` | `20` | Distance between levels, in pips. |

`cfg.testVolume` sets each order's lot size.

```ts
await gridTrader(sugar, cfg, { levels: 3, stepPips: 25 });
```

---

## 🔑 Key code

```ts
const info = await sugar.getSymbolInfo(sym);
const pip = info.point * (info.digits === 3 || info.digits === 5 ? 10 : 1);
const bid = await sugar.getBid(sym), ask = await sugar.getAsk(sym);

const tickets = [];
for (let i = 1; i <= levels; i++) {
  const below = bid - i * stepPips * pip;
  const above = ask + i * stepPips * pip;
  try { tickets.push(await sugar.buyLimit(sym, cfg.testVolume, below)); } catch (e) { console.log('buyLimit rejected:', e.message); }
  try { tickets.push(await sugar.sellLimit(sym, cfg.testVolume, above)); } catch (e) { console.log('sellLimit rejected:', e.message); }
}

const orders = await sugar.service().pendingOrders();
console.log('pending now live:', orders.length);

for (const t of tickets) { try { await sugar.closePosition(t); } catch { /* already gone */ } }
```

---

## 🔗 Sugar methods used

[`getSymbolInfo`](../MT4Sugar/9.%20Symbol_Information.md) · [`getBid` / `getAsk`](../MT4Sugar/3.%20Prices_Quotes.md) · [`buyLimit` / `sellLimit`](../MT4Sugar/4.%20Simple_Trading.md) · [`closePosition`](../MT4Sugar/6.%20Position_Management.md) · [`service().pendingOrders`](../MT4Service/2.%20Orders_History_Methods.md).

---

## 🧩 Notes & adapting it

- **Too close to price?** A pending limit inside the stops level is refused (`mqlIntCode` 130); widen `stepPips`.
- **Market closed?** Nothing places — the demo reports and returns.
- **One-sided grid:** place only `buyLimit`s (accumulation) or only `sellLimit`s.
- **Real use:** keep the grid live, attach SL/TP to each leg, and re-fill filled levels instead of deleting.

---

## See also

* [Trailing Stop](./11_Trailing_stop.md) · [Risk Manager](./13_Risk_manager.md) · [Adaptive Preset](./14_AdaptivePreset.md)
* [MT4Sugar — Simple Trading](../MT4Sugar/4.%20Simple_Trading.md) — the pending-order helpers.
