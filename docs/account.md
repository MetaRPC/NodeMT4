# Account

```javascript
const account = await client.getAccountInfo();
console.log(account.login, account.name, account.server);
console.log(`Balance ${account.balance} ${account.currency}, equity ${account.equity}, leverage 1:${account.leverage}`);
```

| Field | Source |
|---|---|
| `login`, `name`, `company` | account number, owner name and broker company (`AccountSummary`) |
| `balance`, `equity`, `credit`, `currency`, `leverage`, `isInvestor` | `AccountSummary` |
| `tradeMode` (`DEMO`, `CONTEST`, `REAL`), `tradeModeCode` | `AccountSummary` - check it before trading on an account you did not expect to be real |
| `serverTime`, `utcServerShiftMinutes` | the broker server clock (seconds) and its offset from UTC in minutes: every timestamp the API returns is server time |
| `server` | the broker server you connected with |

MT4's `AccountSummary` has no margin values. They come with the trade streams instead:
`client.subscribeOpenedOrdersProfit(intervalMs, ...)` (`OnOpenedOrdersProfit`) delivers `account` with `margin`,
`freeMargin` and `marginLevel` every `intervalMs`.
