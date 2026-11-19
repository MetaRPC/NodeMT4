# MT4Sugar — API Overview (High-Level API)

> One-liners with smart defaults over [MT4Service](../MT4Service/MT4Service.Overview.md) / [MT4Account](../MT4Account/MT4Account.Master.Overview.md) — the fastest way to connect, read, trade and size positions by risk.

**🧩 API Layer:** **HIGH-LEVEL** — the top of the three-layer stack.

**Implementation:** `src/MT4Sugar.ts`. **Demos:** `examples/demos/sugar/`.

```ts
import { MT4Sugar } from '@metarpc/nodemt4';

const sugar = MT4Sugar.create('mt4.mrpc.pro', 443);   // builds Service → Account underneath
await sugar.quickConnect(500000, 'password', 'TeleTrade-Demo');

console.log(await sugar.getBalance(), await sugar.getBid('EURUSD'));
const ticket = await sugar.buyMarket('EURUSD', 0.01);
await sugar.closePosition(ticket);
```

* `MT4Sugar.create(host?, port?, apiKey?, id?)` → the whole stack.
* `sugar.service()` → the `MT4Service` underneath · `sugar.account()` → the raw `MT4Account`.

---

## 📁 Group pages — one page each

Each group has its own page with method tables and usage examples:

1. **[Connection](./1.%20Connection.md)**
2. **[Balance & Margin](./2.%20Balance_Margin.md)**
3. **[Prices & Quotes](./3.%20Prices_Quotes.md)**
4. **[Simple Trading](./4.%20Simple_Trading.md)**
5. **[Trading with SL/TP](./5.%20Trading_SLTP.md)**
6. **[Position Management](./6.%20Position_Management.md)**
7. **[Position Information](./7.%20Position_Information.md)**
8. **[History & Statistics](./8.%20History_Statistics.md)**
9. **[Symbol Information](./9.%20Symbol_Information.md)**
10. **[Risk Management](./10.%20Risk_Management.md)**
11. **[Trading Helpers](./11.%20Trading_Helpers.md)**
12. **[Account Information](./12.%20Account_Information.md)**

## 📋 What's inside (12 groups)

| Group | One-liners |
|-------|-----------|
| **Connection** | `quickConnect` · `isConnected` · `ping` |
| **Balance & Margin** | `getBalance` · `getEquity` · `getMargin` · `getFreeMargin` · `getMarginLevel` · `getProfit` |
| **Prices & Quotes** | `getBid` · `getAsk` · `getSpread` · `getPriceInfo` · `waitForPrice` |
| **Simple Trading** | `buyMarket` · `sellMarket` · `buyLimit` · `sellLimit` · `buyStop` · `sellStop` |
| **Trading with SL/TP** | `buyMarketWithSLTP` · `sellMarketWithSLTP` · `buyLimitWithSLTP` · `sellLimitWithSLTP` |
| **Position Management** | `closePosition` · `closePositionPartial` · `closeAllPositions` · `closeAllBySymbol` · `modifyPositionSL` · `modifyPositionTP` · `modifyPositionSLTP` |
| **Position Information** | `getOpenPositions` · `getPositionByTicket` · `getPositionsBySymbol` · `hasOpenPosition` · `countOpenPositions` · `getTotalProfit` · `getProfitBySymbol` |
| **History & Statistics** | `getDealsToday` · `getDealsYesterday` · `getDealsThisWeek` · `getDealsThisMonth` · `getProfitToday/Week/Month` · `getDailyStats` |
| **Symbol Information** | `getSymbolInfo` · `getAllSymbols` · `isSymbolAvailable` · `getMinStopLevel` · `getSymbolDigits` |
| **Risk Management** | `calculatePositionSize` · `getMaxLotSize` · `canOpenPosition` · `calculateRequiredMargin` · `calculateSLTP` |
| **Trading Helpers** | `buyMarketWithPips` · `sellMarketWithPips` |
| **Account Information** | `getAccountInfo` · `getDailyStats` |

> On MT4, a "position" is an open **market order** (one ticket per fill, no netting). `getMargin` / `getFreeMargin` / `getMarginLevel` read a live `OnOpenedOrdersProfit` snapshot, since MT4's `AccountSummary` carries no margin.

---

## 📚 Related

- **Down:** [MT4Service — Overview](../MT4Service/MT4Service.Overview.md) (typed facade) · [MT4Account — Master Overview](../MT4Account/MT4Account.Master.Overview.md) (raw gRPC).
- **Guides:** [Project Map](../All_Guides/PROJECT_MAP.md) · [Your First Project](../All_Guides/Your_First_Project.md) · [Trade Copier](../All_Guides/SDK_Ecosystem.md).
