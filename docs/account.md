# Account Information

Querying account balance, equity, and order history.

```typescript
const account = await client.getAccountInfo();
console.log('Balance:', account.balance);
console.log('Equity:', account.equity);
console.log('Free Margin:', account.freeMargin);
```
