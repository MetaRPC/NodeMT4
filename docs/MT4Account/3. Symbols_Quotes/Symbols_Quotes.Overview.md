# MT4Account · Symbols & Quotes — Overview

> The market-data surface: the broker's **symbol list**, **Market Watch** management, **contract specifications**, **live quotes**, **OHLC history** and the **server timezone**. Use this page to pick the right read.

These methods are **read-only**. `symbols`, `symbolSelect`, `quote`, `quoteMany`, `quoteHistory` live on `mt4_term_api.MarketInfo`; `symbolParamsMany`, `tickValueWithSize` on `mt4_term_api.AccountHelper`; `serverTimezone` on `mt4_term_api.ServerTimezone`. Each resolves with the raw `*Data` (read fields with `getXxx()`), or rejects with `MrpcError`.

## 📁 What lives here

* **[Symbols](./Symbols.md)** — every symbol name the broker exposes.
* **[SymbolSelect](./SymbolSelect.md)** — add / remove a symbol in Market Watch (needed before it streams quotes).
* **[SymbolParamsMany](./SymbolParamsMany.md)** — full **contract spec** of one or all symbols (digits, point, lot limits, swaps, margin, …).
* **[TickValueWithSize](./TickValueWithSize.md)** — tick value / tick size / contract size for several symbols (position sizing).
* **[Quote](./Quote.md)** — the latest tick (bid/ask) of one symbol.
* **[QuoteMany](./QuoteMany.md)** — the latest ticks of several symbols in one call.
* **[QuoteHistory](./QuoteHistory.md)** — OHLC bars for a symbol / timeframe / range.
* **[ServerTimezone](./ServerTimezone.md)** — the broker server's UTC offset.

---

## 🧭 Plain English

* **Need a price now?** → `quote` (one symbol) or `quoteMany` (several).
* **Need the contract rules** (digits, min lot, swap)? → `symbolParamsMany`.
* **Sizing a position?** → `tickValueWithSize`.
* **Charting / backtest bars?** → `quoteHistory`.
* **A symbol reports bid=ask=0?** → it isn't in Market Watch yet; call `symbolSelect(sym, true)` and wait a moment.

---

## Quick choose

| If you need…                                | Use                 | Returns                 |
| ------------------------------------------- | ------------------- | ----------------------- |
| All symbol names                            | `symbols`           | `SymbolsData`           |
| Add/remove a symbol in Market Watch         | `symbolSelect`      | `SymbolSelectData`      |
| Contract spec (one or all)                  | `symbolParamsMany`  | `SymbolParamsManyData`  |
| Tick value / size for sizing                | `tickValueWithSize` | `TickValueWithSizeData` |
| Latest bid/ask (one)                        | `quote`             | `QuoteData`             |
| Latest bid/ask (many)                       | `quoteMany`         | `QuoteManyData`         |
| OHLC bars                                   | `quoteHistory`      | `QuoteHistoryData`      |
| Broker UTC offset                           | `serverTimezone`    | `ServerTimezoneData`    |

---

## ❌ Cross-refs & gotchas

* **Select before you stream.** A freshly-referenced symbol can report `bid=ask=0` for a few seconds. `symbolSelect(sym, true)` then poll `quote` — or use `MT4Service.ensureSymbol(sym)`.
* **`SymbolParams.bid` is stale.** The spec's bid is a snapshot; always price from `quote` / the tick stream.
* **History is server time.** `quoteHistory` bounds are **broker server time**; convert from UTC with `MT4Account.serverDate(utc, shiftMin)`. For "the newest N bars" use `MT4Service.lastBars(sym, tf, n)`.
* **Timeframes are enum ordinals,** not minute counts: `M1=0 M5=1 M15=2 M30=3 H1=4 H4=5 D1=6 W1=7 MN1=8` (`TIMEFRAMES`).

---

## 🟢 Minimal snippets

```ts
// Latest price of one symbol
import { MarketInfoPb } from '@metarpc/nodemt4';
const q = new MarketInfoPb.QuoteRequest(); q.setSymbol('EURUSD');
const tick = await account.quote(q);
console.log('bid', tick.getBid(), 'ask', tick.getAsk());
```

```ts
// Contract spec of one symbol
import { AccountHelperPb } from '@metarpc/nodemt4';
const r = new AccountHelperPb.SymbolParamsManyRequest(); r.setSymbolName('EURUSD');
const info = (await account.symbolParamsMany(r)).getSymbolInfosList()[0];
console.log('digits', info.getDigits(), 'point', info.getPoint(), 'minLot', info.getVolumemin());
```

```ts
// Newest 100 H1 bars (friendly layer handles the server-time window)
const bars = await svc.lastBars('EURUSD', 'H1', 100);
```

---

## 🧱 Enums used in Symbols & Quotes

| Enum / map | Used by | Values |
|------------|---------|--------|
| `TIMEFRAMES` (ENUM_QUOTE_HISTORY_TIMEFRAME) | `quoteHistory` `setTimeframe` | `M1`(0) `M5`(1) `M15`(2) `M30`(3) `H1`(4) `H4`(5) `D1`(6) `W1`(7) `MN1`(8) |

---

## See also

* **Trading:** [Trading Operations — Overview](../4.%20Trading_Operations/Trading_Operations.Overview.md) — place orders at these prices.
* **Friendly layer:** [`MT4Service.quote()` / `symbolParams()` / `quoteHistory()`](../../MT4Service/MT4Service.Overview.md) → typed `Quote` / `SymbolParams` / `Bar[]`.

---

**Back to:** [MT4Account — Master Overview](../MT4Account.Master.Overview.md)
