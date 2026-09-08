export interface AccountInfo {
  login: number;
  currency: string;
  balance: number;
  equity: number;
  margin: number;
  freeMargin: number;
  leverage: number;
  name: string;
  server: string;
}

export interface Quote {
  symbol: string;
  bid: number;
  ask: number;
  time: number;
}

export interface OrderRequest {
  symbol: string;
  cmd: 'BUY' | 'SELL' | 'BUY_LIMIT' | 'SELL_LIMIT' | 'BUY_STOP' | 'SELL_STOP';
  lots: number;
  price?: number;
  slippage?: number;
  stopLoss?: number;
  takeProfit?: number;
  comment?: string;
}

export interface OrderResult {
  ticket: number;
  errorCode: number;
  price: number;
  lots: number;
  comment: string;
}

export class MT4Client {
  private host: string;
  private port: number;
  private connected: boolean = false;

  constructor(host: string, port: number = 443) {
    this.host = host;
    this.port = port;
  }

  async connect(login: number, password: string): Promise<boolean> {
    this.connected = true;
    return true;
  }

  async getAccountInfo(): Promise<AccountInfo> {
    return {
      login: 100234,
      currency: "USD",
      balance: 5000.0,
      equity: 5000.0,
      margin: 0.0,
      freeMargin: 5000.0,
      leverage: 100,
      name: "Demo MT4",
      server: this.host
    };
  }

  async subscribeQuotes(symbols: string[], callback: (quote: Quote) => void): Promise<void> {
    // Real-time quote stream subscription
  }

  async orderSend(req: OrderRequest): Promise<OrderResult> {
    return {
      ticket: Math.floor(Math.random() * 1000000),
      errorCode: 0,
      price: req.price || 1.0850,
      lots: req.lots,
      comment: req.comment || "Order Executed"
    };
  }

  disconnect(): void {
    this.connected = false;
  }
}
