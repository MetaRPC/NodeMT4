# MT4Service — Overview (Mid-Level API)

> A friendly facade over [MT4Account](../MT4Account/MT4Account.Master.Overview.md): **plain arguments in, typed objects out**. No protobuf, no `getXxx()` — `MT4Service` builds the requests and maps the replies to named data-transfer objects.

**🧩 API Layer:** **MID-LEVEL** — between the raw [MT4Account](../MT4Account/MT4Account.Master.Overview.md) and the one-liner [MT4Sugar](../MT4Sugar/MT4Sugar.API_Overview.md).

**Implementation:** `src/MT4Service.ts`. **Demos:** `examples/demos/service/`.

```ts
import { MT4Service } from '@metarpc/nodemt4';

const svc = MT4Service.create('mt4.mrpc.pro', 443);   // builds the MT4Account underneath
await svc.connect(500000, 'password', 'TeleTrade-Demo');

const info = await svc.getAccountInfo();               // → AccountInfo (typed)
const q = await svc.quote('EURUSD');                   // → Quote { bid, ask, time }
console.log(info.balance, q.bid);

svc.account();   // ↓ drop to the raw MT4Account when you need it
```

* `MT4Service.create(host?, port?, apiKey?, id?)` → the service with an `MT4Account` underneath (defaults `mt4.mrpc.pro:443`).
* `svc.account()` → the raw `MT4Account`.

---

## 📁 Method groups — one page each

Each group has its own page with usage examples and explanations:

1. **[Account Methods](./1.%20Account_Methods.md)** — connection lifecycle + account info & trade statistics.
2. **[Orders & History Methods](./2.%20Orders_History_Methods.md)** — open / pending orders, tickets, closed history.
3. **[Symbols & Quotes Methods](./3.%20Symbols_Quotes_Methods.md)** — prices, contract specs, OHLC bars, server timezone.
4. **[Trading Methods](./4.%20Trading_Methods.md)** — send / modify / close orders (exactly-once).
5. **[Streaming Methods](./5.%20Streaming_Methods.md)** — ticks, trade events, live profit & margin.

| Group | Methods | Returns |
|-------|---------|---------|
| **Connection** | `connect` · `getId` · `reconnect` · `checkConnect` · `isConnected` · `disconnect` | — |
| **Account Information** | `getAccountInfo` · `getTradeStats` · `getTradeStatsEquityHistory` · `getEquityHistory` · `getTradeUnrealizedPl` | `AccountInfo`, `TradeStats`, `EquityPoint[]` |
| **Orders & History** | `openedOrders` · `positions` · `pendingOrders` · `openedOrdersTickets` · `ordersHistory` | `OrderInfo[]`, `OrdersHistory` |
| **Symbols & Quotes** | `symbolList` · `symbolSelect` · `quote` · `quoteMany` · `symbolParams` · `symbolParamsAll` · `tickValueWithSize` · `getServerTimezone` · `ensureSymbol` · `quoteHistory` · `lastBars` | `Quote`, `SymbolParams`, `Bar[]`, `ServerTimezone` |
| **Trading** | `orderSend` · `orderModify` · `orderClose` · `orderCloseBy` | `OrderResult`, `OrderCloseResult` |
| **Streaming** | `subscribeQuotes` · `subscribeTrades` · `subscribeOpenedOrdersProfit` · `subscribeOpenedOrdersTickets` · `subscribeConnectState` | `Tick`, trade events |

---

## 🧱 Typed data-transfer objects

`AccountInfo` · `Quote` · `Tick` · `SymbolParams` · `Bar` · `OrderRequest` · `OrderResult` · `OrderInfo` · `OrdersHistory` · `TradeStats` · `EquityPoint` · `ServerTimezone`.

Every method returns one of these (or an array of them); times are plain numbers (seconds/ms), order types are MT4 numbers (0 BUY, 1 SELL, 2-5 pending).

---

## 📚 Related

- **Down:** [MT4Account — Master Overview](../MT4Account/MT4Account.Master.Overview.md) (raw gRPC).
- **Up:** [MT4Sugar — Overview](../MT4Sugar/MT4Sugar.API_Overview.md) (one-liners).
- **Guides:** [Project Map](../All_Guides/PROJECT_MAP.md) · [Getting Started](../All_Guides/GETTING_STARTED.md).
