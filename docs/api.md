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
| `getAccountInfo(): Promise<AccountInfo>` | see [Account](account.md) |
| `orderSend(request): Promise<OrderResult>` | see [Trading](trading.md) |
| `subscribeQuotes(symbols, onQuote, onError?)` | `OnSymbolTick` stream; returns `{ unsubscribe() }`, see [Quotes](quotes.md) |
| `disconnect(deleteTerminal = false)` | `Disconnect`; `true` also deletes the terminal. Closes the channel |
| `getId(login, password): Promise<string>` | `GetId`: the terminal id for these credentials |
| `MT4Client.openDemoAccount(server, apiKey, host = 'mt4.mrpc.pro')` | `GET /DemoAccount/Open`: a new demo account `{ login, password, server }` |
| `client.id`, `client.connected` | the terminal id after `connect()`; whether `connect()` succeeded |
| `getGrpcMetadata()` | the `apikey` / `id` metadata, for your own calls through the generated clients |

### Everything else

The client covers connecting, the account, market orders and ticks. Every other method of the API (positions, history,
symbol information, order modify/close, other streams) is in the generated gRPC clients the package exports
(`ConnectionGrpc`, `AccountHelperGrpc`, `TradingHelperGrpc`, `SubscriptionsGrpc`, `MarketInfoGrpc`, ... with their `*Pb`
messages) and under `@metarpc/nodemt4/package/`. Call them on the same host with `client.getGrpcMetadata()`; every reply has
`data` or `error`. The full API: [https://mt4.mrpc.pro/apiui](https://mt4.mrpc.pro/apiui).
