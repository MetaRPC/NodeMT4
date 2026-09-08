# Synchronous vs Asynchronous Methods - When to Use What (Node.js)

> Understanding execution models in NodeMT4: non-blocking streaming vs synchronous execution.

---

## 🎯 Quick Comparison

Built on modern Promises and `AsyncIterable` streams for seamless integration with Node.js, Express, NestJS, and TypeScript backends.

| Aspect | Asynchronous Pattern | Synchronous Call |
|--------|----------------------|------------------|
| **Thread Blocking** | ❌ Non-blocking (high concurrency) | ✅ Blocks current thread |
| **Throughput** | ✅ Handles thousands of events/sec | ❌ Limited by thread pool |
| **Real-Time Data** | ✅ Perfect for tick & trade streams | ⚠️ Inefficient for streams |
| **Simplicity** | Requires async runtime awareness | Simple, linear execution |
| **Recommended for** | Automated bots, microservices, GUIs | CLI scripts, notebooks, one-offs |

---

## 🚀 When to Use Asynchronous Methods (Recommended)

### 1. Market Data Streaming
Market ticks arrive at microsecond intervals during peak sessions. Asynchronous handlers ensure zero tick drops without freezing your execution thread:

```
const account = new MT4Account({ user, password, server: grpcServer });
await account.connectByServerName(serverName, 'EURUSD', 30);
const summary = await account.accountSummary();
console.log(`Balance: ${summary.accountBalance}, Equity: ${summary.accountEquity}`);
```

### 2. High-Frequency Order Execution
When operating across multiple currency pairs simultaneously, asynchronous dispatch allows your bot to send orders concurrently rather than sequentially.

---

## 💡 Summary

Always prefer asynchronous paradigms for production bots, multi-symbol trading, and background services. Use synchronous wrappers for quick setup scripts, testing, or exploratory analysis.
