# Protobuf Inspector Guide — Node

> The generated `package/*_pb.js` stubs are typed `any`, so TypeScript can't tell you a message's real getters, setters or enum names. This guide shows how to **discover them at runtime** — the fastest way to avoid "`x.setPrice is not a function`" surprises.

> 🛠️ **Ready-made tool.** The repo ships a runnable inspector — no need to write the snippets yourself:
>
> ```bash
> node examples/demos/helpers/15_protobuf_inspector.js                        # interactive REPL
> node examples/demos/helpers/15_protobuf_inspector.js OrderSendRequest       # one-shot: getters/setters
> node examples/demos/helpers/15_protobuf_inspector.js enum OrderSendOperationType  # one-shot: enum values
> node examples/demos/helpers/15_protobuf_inspector.js search Tick            # find message/enum names
> ```
>
> It's **offline** (loads the stubs only — no connection, no key) and discovers **209 message types · 23 enums**. REPL commands: `list` · `<TypeName>` · `search <text>` · `enum <Name>` · `stats` · `help` · `exit`. The techniques below are what it does under the hood.

---

## 🎯 Why you need it

* **Field accessors aren't guessable.** Repeated fields append `List` (`getOrderInfosList`); some getters are oddly cased or misspelled (`getTradetickvalue`, not `getTradeTickValue`; `getCommision`, with one `s`).
* **Request setters vary.** `OrderCloseDeleteRequest` uses `setOrderTicket` / `setLots` / `setClosingPrice`.
* **Method name casing.** The TradeStats client method is `tradeUnrealizedPL` (upper-case `PL`).
* **`any` typing hides all of it.** The only source of truth is the stub — inspect it.

---

## 🔍 List a message's getters / setters

```js
// node -e "...": print every getter of a message type
const Pb = require('@metarpc/nodemt4/package/mt4-term-api-trading-helper_pb');

const getters = Object.getOwnPropertyNames(Pb.OrderSendData.prototype).filter((n) => n.startsWith('get'));
const setters = Object.getOwnPropertyNames(Pb.OrderSendRequest.prototype).filter((n) => n.startsWith('set'));

console.log('getters:', getters.join(' '));
console.log('setters:', setters.join(' '));
```

> Tip: the SDK re-exports these modules too — `require('@metarpc/nodemt4').TradingHelperPb` is the same object.

---

## 🧱 Find a message type by name

```js
const Pb = require('@metarpc/nodemt4').SubscriptionsPb;

// which message types mention "Tick"?
console.log(Object.keys(Pb).filter((k) => /Tick/.test(k)));
// → [ 'OnSymbolTickData', 'OnSymbolTickReply', 'OnSymbolTickRequest', 'OnSymbolMqlTickInfo', ... ]
```

Then inspect the one you want with the getter/setter trick above.

---

## 🎛️ List an enum's values

```js
const { TradingHelperPb } = require('@metarpc/nodemt4');

console.log(Object.entries(TradingHelperPb.OrderSendOperationType));
// → [ ['OC_OP_BUY',0], ['OC_OP_SELL',1], ['OC_OP_BUYLIMIT',2], ... ]

console.log(TradingHelperPb.OrderSendOperationType.OC_OP_BUYSTOP);  // the number (4)
```

To find which enums a namespace holds:

```js
const ah = require('@metarpc/nodemt4').AccountHelperPb;
console.log(Object.keys(ah).filter((k) => /Enum|_ENUM_|Type/.test(k)));
```

---

## 🧪 Inspect a live reply

Log what the server actually returned — handy when a getter comes back empty:

```ts
const data = await account.accountSummary();
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(data)).filter((n) => n.startsWith('get')));
console.log('balance:', data.getAccountBalance());
```

A reply message also serialises: `data.toObject()` (where available) or `data.serializeBinary()` for the raw bytes.

---

## 🗺️ Where each service lives

| Package stub | Holds |
| ------------ | ----- |
| `mt4-term-api-connection_pb` | connect / connectEx / disconnect / getId / `onConnectState` |
| `mt4-term-api-account-helper_pb` | account summary, opened orders, orders history, symbol params, tick value; sort & trade-mode enums |
| `mt4-term-api-market-info_pb` | symbols, quote, quoteMany, quoteHistory; `ENUM_QUOTE_HISTORY_TIMEFRAME` |
| `mt4-term-api-trading-helper_pb` | orderSend / orderModify / orderCloseDelete / orderCloseBy; `OrderSendOperationType` |
| `mt4-term-api-trade-stats_pb` | tradeStats, equityHistory, tradeUnrealizedPL |
| `mt4-term-api-server-timezone_pb` | serverTimezone |
| `mt4-term-api-subscriptions_pb` | the `On*` streams |
| `mrpc-mt4-error_pb` | `MqlErrorCode`, `ErrorType` |

---

## ✅ A quick workflow

1. Suspect a wrong accessor? List the message's getters/setters.
2. Copy the exact name into your code.
3. Re-run — runtime confirms it.

This is exactly how the SDK's own methods were verified against the stubs.

---

## See also

* [Enums Usage Reference](./ENUMS_USAGE_REFERENCE.md) · [Usercode Sandbox](./USERCODE_SANDBOX_GUIDE.md) — a place to run these snippets.
