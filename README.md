# NodeMT4 SDK

> Official MetaTrader 4 Node.js & TypeScript SDK for algorithmic trading and market data streaming.

[![Docs](https://img.shields.io/badge/docs-NodeMT4-blue.svg)](https://metarpc.github.io/NodeMT4/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

📄 **Full Documentation**: [https://metarpc.github.io/NodeMT4/](https://metarpc.github.io/NodeMT4/)

---

## 📦 Installation

```bash
npm install github:MetaRPC/NodeMT4
```

The package is installed from this repository (it is not published to the npm registry); it is named `@metarpc/nodemt4`, so `require('@metarpc/nodemt4')` works as usual. The generated gRPC stubs are under `@metarpc/nodemt4/package/`.

---

## 🏃 How to Run Examples

Clone the repository and run the quickstart example out-of-the-box:

```bash
git clone https://github.com/MetaRPC/NodeMT4.git
cd NodeMT4
npm install
```

`quickstart.js` connects with your terminal **login / password / server**. With **no**
`MT4_LOGIN` / `MT4_PASSWORD` it opens a fresh **demo account** for you automatically
(`MT4_SERVER` defaults to `TeleTrade-Demo`). The MetaRPC **API key** is optional — omit it
and the SDK uses the built-in `TRIAL` key.

```bash
# 1. Minimal run (TRIAL key — opens a demo account for you):
node examples/quickstart.js

# 2. Use your own account (login / password / server):
MT4_LOGIN=500000 MT4_PASSWORD=your_password MT4_SERVER=TeleTrade-Demo node examples/quickstart.js

# 3. Pass your MetaRPC API key as an argument:
node examples/quickstart.js your_api_key_here

# 4. Or supply the API key via the MRPC_API_KEY environment variable:
export MRPC_API_KEY="your_api_key_here"
node examples/quickstart.js
```

> **Windows PowerShell:** set variables first, then run —
> `$env:MT4_LOGIN="500000"; $env:MT4_PASSWORD="your_password"; node examples/quickstart.js`
> (Windows CMD uses `set MT4_LOGIN=500000`).

The committed `src/*.js` are checked in, so no build step is required; run `npm run build`
only after editing the TypeScript sources.

---

## 🔑 API Key & Authentication

Connecting to MetaRPC production endpoints (`mt4.mrpc.pro:443`) requires an API key:

1. **Sign Up**: Create an account for free at [https://mrpc.pro/signup](https://mrpc.pro/signup).
2. **Get your API Key**: Your personal API key appears automatically in the MetaRPC Portal dashboard at [https://mrpc.pro/my](https://mrpc.pro/my) under **API Keys** — just copy it (the key itself is free).
3. **Configure Connection**: Pass your API key / token along with the server address (`mt4.mrpc.pro:443`) in your connection settings.

---

## 🆔 Automatic Account ID & Authentication

MetaRPC endpoints route calls using a terminal session identifier (`id`):
- When connecting via `Connect` / `ConnectEx`, the server automatically generates and returns a session GUID (`terminalInstanceGuid`).
- The SDK automatically captures this session ID and attaches both the `id` and `APIKey` headers on all subsequent calls (`AccountSummary`, `OrderSend`, streaming, etc.) — no manual `GetId` or `curl` calls required.
- Pass your API key directly to the Account/Client constructor or via the `MRPC_API_KEY` environment variable.

## 🌐 Production Endpoints

| Environment | Host | Port | Protocol |
| :--- | :--- | :--- | :--- |
| **Production** | `mt4.mrpc.pro` | `443` | TLS / gRPC |
| **Direct API UI (Swagger)** | `https://mt4.mrpc.pro/apiui` | `443` | HTTPS |
| **Portal Dashboard** | `https://mrpc.pro/my` | `443` | HTTPS |
| **Registration / API Key** | `https://mrpc.pro/signup` | `443` | HTTPS |

---

## 📄 Documentation & Guides

Explore comprehensive documentation at [https://metarpc.github.io/NodeMT4/](https://metarpc.github.io/NodeMT4/):
- 🚀 **Quick Start & First Project**
- 🔑 **Authentication & API Keys**
- 📡 **Live Market Data & gRPC Streaming**
- 💼 **Account Management & Order Execution**
- 📊 **Return Codes & Error Handling Reference**
