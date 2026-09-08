# API Reference

Complete API specifications for `@metarpc/nodemt4`.

### `MT4Client` Class
- `connect(login: number, password: string): Promise<boolean>`
- `disconnect(): void`
- `getAccountInfo(): Promise<AccountInfo>`
- `subscribeQuotes(symbols: string[], callback: (quote: Quote) => void): Promise<void>`
- `orderSend(req: OrderRequest): Promise<OrderResult>`
- `orderModify(ticket: number, sl: number, tp: number): Promise<boolean>`
- `orderClose(ticket: number, lots: number): Promise<boolean>`
