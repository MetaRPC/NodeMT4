# Connection

```javascript
const { MT4Client } = require('@metarpc/nodemt4');

const client = new MT4Client('mt4.mrpc.pro', 443, 'your-api-key');
await client.connect({ user: 7689280, password: 'your-password', server: 'TeleTrade-Demo' });
console.log('terminal', client.id);

// ... calls ...

await client.disconnect();        // or disconnect(true): stop the terminal and delete it
```

`connect()` resolves once the terminal is connected and rejects with an `MrpcError` when the server refuses (wrong
password, unknown server, ...). To connect by address instead of broker server name, pass `host` and `port` instead of
`server`.

There is no automatic reconnect in the client: if a call rejects with `TERMINAL_INSTANCE_NOT_FOUND`
(`err.isTerminalLost`) or the channel fails, call `client.reconnect()` (the last `connect()` again, same id and name).
Never retry an `err.isInvalidLogin` error: brokers lock accounts. `client.close()` closes the channel and leaves the
terminal running on the server; the next `connect()` with the same `id` re-attaches to it in well under a second
instead of starting a terminal (about 10-15 s).

## API key and terminal id

- **`APIKey`**: your key from [https://mrpc.pro/my](https://mrpc.pro/my) (sign up free at [https://mrpc.pro/signup](https://mrpc.pro/signup)).
  Pass it to the constructor or set `MRPC_API_KEY`; without one the client sends `TRIAL`.
- **`id`**: the terminal id. `connect()` receives it from the server (`terminalInstanceGuid`), keeps it in `client.id` and
  sends it with every later call and stream. You don't need to call `getId()` first. To keep one terminal per strategy
  across runs, pass your own stable id and a label: `connect({ ..., id: MT4Client.uuid5(MT4Client.NAMESPACE_DNS, 'my-strategy'),
  name: 'my-strategy', timeoutSeconds: 120 })` - the name is what `GET /Accounts` shows, `timeoutSeconds` is how long the
  server waits for the terminal to start.
