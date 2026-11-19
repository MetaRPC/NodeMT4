# Enums Usage Reference — Node

> The generated protobuf enums are plain JavaScript **namespace objects**: `Namespace.CONSTANT → number`. This page shows which namespace holds which enum, and how to use them at each layer.

---

## 🧭 How protobuf enums look in Node

```ts
import { TradingHelperPb } from '@metarpc/nodemt4';

TradingHelperPb.OrderSendOperationType.OC_OP_BUY   // === 0 (a number)
```

Each `*Pb` module is re-exported from the package. An enum is an object mapping names to numbers; you pass the value into a setter or compare it against a getter.

> **MT4 is simpler than MT5 here.** MT4 has **no per-property symbol enums** (`SymbolInfoDouble/Integer/String`) — a symbol's fields come back as a flat `SymbolParams` struct, so you rarely need an enum at all. The ones that matter are the **order type**, the **timeframe**, the **sort modes** and the **account trade mode**.

---

## 📇 The enums you'll use most

| Enum | Namespace | Example value |
| ---- | --------- | ------------- |
| Order type (send) | `TradingHelperPb.OrderSendOperationType` | `OC_OP_BUY` (0) |
| Open order type | `AccountHelperPb.OpenedOrderType` | `0` BUY … `5` SELL_STOP |
| Account trade mode | `AccountHelperPb.EnumAccountTradeMode` | `ACCOUNT_TRADE_MODE_DEMO` (0) |
| Opened-orders sort | `AccountHelperPb.EnumOpenedOrderSortType` | `SORT_BY_OPEN_TIME_DESC` (1) |
| History sort | `AccountHelperPb.EnumOrderHistorySortType` | `HISTORY_SORT_BY_CLOSE_TIME_DESC` (3) |
| Quote-history timeframe | `MarketInfoPb.ENUM_QUOTE_HISTORY_TIMEFRAME` | `M1` … `MN1` — or use the `TIMEFRAMES` map |
| MT4 error number | `ErrorPb.MqlErrorCode` | `130` invalid stops, `134` no money |
| gRPC error type | `ErrorPb.ErrorType` | `MRPC_TIMEOUT`, `TERMINAL_API_TIMEOUT` |

> Namespaces follow the proto service the message belongs to. When unsure, open the stub (`package/*_pb.js`) or use the [Protobuf Inspector](./PROTOBUF_INSPECTOR_GUIDE.md).

---

## 🔽 Low level (MT4Account) — pass the enum directly

```ts
import { MT4Account, TradingHelperPb } from '@metarpc/nodemt4';

const req = new TradingHelperPb.OrderSendRequest();
req.setSymbol('EURUSD');
req.setOperationType(TradingHelperPb.OrderSendOperationType.OC_OP_BUY);  // the enum value
req.setVolume(0.01);
req.setPrice(ask);
await account.orderSend(req);
```

## 🟦 Mid level (MT4Service) — string action instead of the enum

```ts
// 'BUY' / 'SELL' / 'BUY_LIMIT' / 'SELL_LIMIT' / 'BUY_STOP' / 'SELL_STOP' → mapped to OrderSendOperationType
await service.orderSend({ symbol: 'EURUSD', cmd: 'BUY', lots: 0.01 });
```

## 🟩 High level (MT4Sugar) — enums hidden

The sugar layer wraps the common operations so you never touch an enum:

```ts
await sugar.buyMarket('EURUSD', 0.01);      // OC_OP_BUY inside
const digits = await sugar.getSymbolDigits('EURUSD');   // reads SymbolParams.digits — no enum
```

---

## 🛒 Order-type enum (trading)

```
OC_OP_BUY = 0   OC_OP_SELL = 1   OC_OP_BUYLIMIT = 2
OC_OP_SELLLIMIT = 3   OC_OP_BUYSTOP = 4   OC_OP_SELLSTOP = 5
```

The friendly layers accept the string action instead — `'BUY'`, `'SELL_LIMIT'`, … — and map it to this enum for you (`MT4Service.orderSend`, `MT4Sugar.buyMarket` / `buyLimit` / …). Open orders report the **same 0–5 numbering** in `OrderInfo.type` (`AccountHelperPb.OpenedOrderType`).

---

## ⏱️ Timeframe enum (quote history)

`quoteHistory` takes a timeframe **ordinal**, not minutes. Use the exported `TIMEFRAMES` map:

```ts
import { TIMEFRAMES } from '@metarpc/nodemt4';
// M1=0 M5=1 M15=2 M30=3 H1=4 H4=5 D1=6 W1=7 MN1=8
req.setTimeframe(TIMEFRAMES['H1']);   // 4
```

The friendly layers accept the string directly: `service.quoteHistory('EURUSD', 'H1', from, to)` / `service.lastBars('EURUSD', 'H1', 100)`.

---

## 📒 Complete enum catalog

The SDK reaches enums through the `*Pb` namespaces it re-exports — `ConnectionPb`, `AccountHelperPb`, `TradingHelperPb`, `SubscriptionsPb`, `MarketInfoPb`, `TradeStatsPb`, `ServerTimezonePb`, `ErrorPb`. **19 enums** are reachable this way. Import each from its **home namespace** below — many are also available from the namespaces that transitively require it, but the home namespace always works.

### Trading — `TradingHelperPb`
| Enum | Values | Use |
|------|--------|-----|
| `OrderSendOperationType` | 6 | Order type for `orderSend` (0–5). |
| `OrderCloseDeleteMode` | 2 | Result mode of `orderCloseDelete` (0 close · 1 delete). |

### Account & symbols — `AccountHelperPb`
| Enum | Values | Use |
|------|--------|-----|
| `OpenedOrderType` | 8 | Type of an open/pending order (0–5 trade; 6–7 balance/credit). |
| `EnumAccountTradeMode` | 3 | DEMO (0) / CONTEST (1) / REAL (2). |
| `EnumAccountMarginMode` | 3 | Margin mode. |
| `EnumOpenedOrderSortType` | 4 | `openedOrders` ordering. |
| `EnumOrderHistorySortType` | 6 | `ordersHistory` ordering. |
| `SP_ENUM_SYMBOL_TRADE_MODE` | 5 | Symbol trade mode. |
| `SP_ENUM_SYMBOL_TRADE_EXECUTION` | 4 | Symbol execution mode. |
| `SP_ENUM_TRADE_CALC_MODE` | 3 | Symbol margin-calc mode. |

### Market & quotes — `MarketInfoPb`
| Enum | Values | Use |
|------|--------|-----|
| `ENUM_QUOTE_HISTORY_TIMEFRAME` | 9 | Timeframe for `quoteHistory` (see `TIMEFRAMES`). |

### Streaming — `SubscriptionsPb`
| Enum | Values | Use |
|------|--------|-----|
| `SUB_ORDER_OPERATION_TYPE` | 6 | Order type in trade-event payloads. |
| `MT4_SUB_ENUM_EVENT_GROUP_TYPE` | 2 | Event group in `onTrade`. |

### Connection — `ConnectionPb`
| Enum | Values | Use |
|------|--------|-----|
| `ProxyTypes` | 4 | Proxy type for a connect. |
| `TerminalType` | 2 | Terminal type. |

### Server timezone — `ServerTimezonePb`
| Enum | Values | Use |
|------|--------|-----|
| `SERVER_TIMEZONE_SOURCE` | 3 | Source of the server-timezone offset. |

### Errors — `ErrorPb`
| Enum | Values | Use |
|------|--------|-----|
| `MqlErrorCode` | 112 | The MT4 error numbers (`mqlIntCode`). See [Return Codes](./RETURN_CODES_REFERENCE.md). |
| `ErrorType` | 10 | gRPC/gateway error type (`MRPC_TIMEOUT`, `TERMINAL_API_TIMEOUT`, …). |
| `LogType` | 3 | Log severity. |

> **Not re-exported by the SDK.** The raw `package/*_pb.js` stubs also define GUI / chart / legacy enums (`GuiFormFieldType`, `GuiTwoFactorType`, `ChartTemplateMode`, `QUOTE_HISTORY_TIMEFRAME`) whose stub modules this SDK does **not** export — they aren't needed for trading. If you need them, `require` the raw stub directly or use the [Protobuf Inspector](./PROTOBUF_INSPECTOR_GUIDE.md).

> **Discover values at runtime** with the [Protobuf Inspector](./PROTOBUF_INSPECTOR_GUIDE.md): `node examples/demos/helpers/15_protobuf_inspector.js enum OrderSendOperationType`.

---

## See also

* [Protobuf Inspector](./PROTOBUF_INSPECTOR_GUIDE.md) · [Return Codes](./RETURN_CODES_REFERENCE.md) · [Glossary](./GLOSSARY.md).
