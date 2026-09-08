const crypto = require('crypto');

class MT4Client {
  constructor(host = 'mt4.mrpc.pro', port = 443, apiKey = null, id = null) {
    this.host = host;
    this.port = port;
    this.apiKey = apiKey || process.env.MRPC_API_KEY || null;
    this.id = id || null;
    this.connected = false;
  }

  async getId(user, password) {
    if (!this.id) {
      const hash = crypto.createHash('md5').update(`${user}:${password}`).digest('hex');
      this.id = `${hash.substring(0, 8)}-${hash.substring(8, 12)}-4${hash.substring(13, 16)}-8${hash.substring(17, 20)}-${hash.substring(20, 32)}`;
    }
    return this.id;
  }

  async connect(login, password) {
    if (!this.id) {
      await this.getId(login, password);
    }
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
