
## 🆔 Generate Account ID (`GetId`)

> ⚠️ **Important**: You must generate your deterministic account ID with `GetId` **firstly** before connecting or streaming.

Before establishing a connection, call `GetId` with your trading account number and password to obtain your deterministic terminal GUID:

```bash
curl -X GET "https://mt4.mrpc.pro/GetId?user=YOUR_LOGIN&password=YOUR_PASSWORD" \
     -H "APIKey: YOUR_API_KEY"
```

The resulting `id` must be provided as the `id` header alongside `APIKey` for all subsequent operations.


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

