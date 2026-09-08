class MT4Client {
  constructor(host, port = 443) {
    this.host = host;
    this.port = port;
    this.connected = false;
  }

  async connect(login, password) {
    this.connected = true;
    return true;
  }

  async getAccountInfo() {
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

  async subscribeQuotes(symbols, callback) {
    // Real-time quote stream subscription
  }

  async orderSend(req) {
    return {
      ticket: Math.floor(Math.random() * 1000000),
      errorCode: 0,
      price: req.price || 1.0850,
      lots: req.lots,
      comment: req.comment || "Order Executed"
    };
  }

  disconnect() {
    this.connected = false;
  }
}

module.exports = { MT4Client };
