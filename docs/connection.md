
## 🆔 Automatic Account ID & Authentication

MetaRPC endpoints route calls using a terminal session GUID (`id`).
When connecting via `Connect` / `ConnectEx`, the server automatically generates and returns your session GUID (`terminalInstanceGuid`). The SDK captures this ID and attaches both your `id` and `APIKey` headers to all subsequent terminal calls — no manual `GetId` or curl steps required.

# Connection & Authentication

Managing connection sessions with MetaTrader 4 servers.

```typescript
import { MT4Client } from '@metarpc/nodemt4';

const client = new MT4Client('mt4.mrpc.pro', 443);
await client.connect(100234, 'password');

// Disconnect gracefully
client.disconnect();
```


> **Authentication Note**: Connecting to `mt4.mrpc.pro:443` requires a valid MetaRPC API key. Register for free at [https://mrpc.pro/signup](https://mrpc.pro/signup) and generate your token in [https://mrpc.pro/my](https://mrpc.pro/my).

