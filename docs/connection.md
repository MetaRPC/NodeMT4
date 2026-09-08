# Connection & Authentication

Managing connection sessions with MetaTrader 4 servers.

```typescript
import { MT4Client } from '@metarpc/nodemt4';

const client = new MT4Client('mt4demo.broker.com', 443);
await client.connect(100234, 'password');

// Disconnect gracefully
client.disconnect();
```
