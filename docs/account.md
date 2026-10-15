# Account

```javascript
const account = await client.getAccountInfo();
console.log(account.login, account.name, account.server);
console.log(`Balance ${account.balance} ${account.currency}, equity ${account.equity}, leverage 1:${account.leverage}`);
```

| Field | Source |
|---|---|
| `login`, `name` | account number and owner name (`AccountSummary`) |
| `balance`, `equity`, `currency`, `leverage` | `AccountSummary` |
| `server` | the broker server you connected with |

MT4's `AccountSummary` has no margin values. They come with the trade streams instead: `OnOpenedOrdersProfit`
(`SubscriptionsGrpc`) sends `account_info` with `margin`, `free_margin` and `margin_level` every `timer_period_milliseconds`.
