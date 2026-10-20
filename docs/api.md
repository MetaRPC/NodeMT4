# API Reference

Everything `MT4Client` from `@metarpc/nodemt4` offers. Every call that the server answers with an error rejects with an `MrpcError`
(`err.code` is the API's error code, e.g. `TERMINAL_INSTANCE_NOT_FOUND`); a failed call (network, deadline) rejects with
the gRPC error. Nothing is invented on failure.

### `MT4Client`

| Member | |
|---|---|
| `new MT4Client(host = 'mt4.mrpc.pro', port = 443, apiKey?, id?)` | TLS on port 443, plaintext otherwise. `apiKey` defaults to `MRPC_API_KEY`, then `TRIAL` |
| `connect({ user, password, server })` | `ConnectEx` by broker server name; `connect({ user, password, host, port })` uses `Connect` by address; `timeoutSeconds` (default 60) |
| `connect(login, password, server)` | the same, short form |
| `connect({ ..., id, name, expiration })` | `id`: a stable terminal id of your own (re-runs re-attach to the same terminal; `MT4Client.uuid5()` derives one); `name`: the label shown by `GET /Accounts` |
| `reconnect()` | runs the last `connect()` again with the same id and name (after `TERMINAL_INSTANCE_NOT_FOUND` or a channel failure) |
| `checkConnect(): Promise<boolean>` | `CheckConnect`: whether the terminal answers |
| `getAccountInfo(): Promise<AccountInfo>` | see [Account](account.md) |
| `symbolList()`, `symbolSelect(symbol, select = true)`, `ensureSymbol(symbol, waitMs?)` | `Symbols`, `SymbolSelect`; `ensureSymbol` selects and waits for a two-sided quote |
| `quote(symbol)`, `quoteMany(symbols)` | `Quote`, `QuoteMany`: `{ symbol, bid, ask, high, low, time }` |
| `symbolParams(symbol)`, `symbolParamsAll()`, `tickValueWithSize(symbols)` | `SymbolParamsMany`, `TickValueWithSize`: contract specifications, see [Quotes](quotes.md) |
| `quoteHistory(symbol, timeframe, from, to)`, `lastBars(symbol, timeframe, count, utcServerShiftMinutes?)` | `QuoteHistory`: bars, see [Quotes](quotes.md) |
| `orderSend(request): Promise<OrderResult>` | see [Trading](trading.md) |
| `orderModify({ ticket, stopLoss, takeProfit, price?, expiration? })` | `OrderModify` |
| `orderClose({ ticket, volume?, price?, slippage? })`, `orderCloseBy(ticket, oppositeTicket)` | `OrderCloseDelete` (close, partial close, delete a pending order), `OrderCloseBy` |
| `openedOrders()`, `positions(magic?)`, `pendingOrders(magic?)`, `openedOrdersTickets()` | `OpenedOrders`, `OpenedOrdersTickets`: open market / pending orders, optionally those with a magic number |
| `ordersHistory(from, to, { sort, page, perPage }?)` | `OrdersHistory`: closed orders in a server-time window, `{ totalCount, orders }` |
| `subscribeQuotes(symbols, onTick, onError?)` | `OnSymbolTick` stream; returns `{ unsubscribe() }`, see [Quotes](quotes.md) |
| `subscribeTrades(onEvent, onError?)` | `OnTrade` stream: new / updated / removed / history orders with the account snapshot |
| `subscribeOpenedOrdersProfit(intervalMs, onSnapshot, onError?)` | `OnOpenedOrdersProfit` stream: open orders with live profit and the account's margin values |
| `subscribeOpenedOrdersTickets(intervalMs, onTickets, onError?)` | `OnOpenedOrdersTickets` stream |
| `disconnect(deleteTerminal = false)` | `Disconnect`; `true` also deletes the terminal. Closes the channel |
| `close()` | closes the channel only; the terminal stays on the server under its id |
| `getId(login, password): Promise<string>` | `GetId`: the terminal id for these credentials |
| `call(client, method, request, timeoutMs?)` | one unary call through any generated client with the client's metadata: resolves with the reply's `data`, rejects with `MrpcError` |
| `MT4Client.openDemoAccount(server, apiKey, host = 'mt4.mrpc.pro')` | `GET /DemoAccount/Open`: a new demo account `{ login, password, server }` |
| `MT4Client.uuid5(namespace, name)`, `MT4Client.NAMESPACE_DNS` | RFC 4122 UUID v5 (same result as Python's `uuid.uuid5`) for stable terminal ids |
| `MT4Client.serverDate(utc, shiftMinutes)`, `MT4Client.fromServerSeconds(seconds, shiftMinutes)` | UTC <-> broker server time (`utcServerShiftMinutes` of `getAccountInfo()`) |
| `client.id`, `client.name`, `client.connected` | the terminal id and label after `connect()`; whether `connect()` succeeded |
| `getGrpcMetadata()` | the `apikey` / `id` metadata, for your own calls through the generated clients |

`MrpcError` (alias `MT4Error`): `code`, `message`, `error` (the reply's error message), `mqlIntCode` / `mqlDescription`
(the MT4 error number and text of a refused trade), `isInvalidLogin`, `isTerminalLost`. `TIMEFRAMES` (`M1` ... `MN1`)
and `ORDER_TYPES` (`BUY` = 0 ... `SELL_STOP` = 5) are exported too.

### Everything else

Every other method of the API (charts, trade statistics, admin, ...) is in the generated gRPC clients the package exports
(`ConnectionGrpc`, `AccountHelperGrpc`, `TradingHelperGrpc`, `SubscriptionsGrpc`, `MarketInfoGrpc`, ... with their `*Pb`
messages) and under `@metarpc/nodemt4/package/`. Call them on the same host with `client.call(...)` or
`client.getGrpcMetadata()`; every reply has `data` or `error`. Every method, its request and reply:
[API methods](API_Reference/methods.md); try them at [https://mt4.mrpc.pro/apiui](https://mt4.mrpc.pro/apiui).
