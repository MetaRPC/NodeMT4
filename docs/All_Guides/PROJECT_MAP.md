# 🗺️ Project Map

> The whole project as one annotated tree, with links. **Links point to section *overviews*, never individual method pages** — open an overview to drill down into its methods. The API layers live here and on the [home page](../index.md) cards (they're intentionally kept out of the left sidebar).

---

## 🧱 The three layers

NodeMT4 is built in three decoupled layers. Your code can enter at any level, and each layer **owns** the one beneath it (`sugar.service()` → the `MT4Service`, `service.account()` → the `MT4Account`).

| Layer | Source | What it does | Overview |
| ----- | ------ | ------------ | -------- |
| **3 · MT4Sugar** | `src/MT4Sugar.ts` | One-line helpers: `buyMarket`, `closeAllPositions`, risk-based sizing, pip SL/TP, daily stats. 12 groups. | [MT4Sugar overview](../MT4Sugar/MT4Sugar.API_Overview.md) |
| **2 · MT4Service** | `src/MT4Service.ts` | Typed facade: plain args in, typed objects out (`AccountInfo`, `Quote`, `OrderInfo`…). No protobuf. 5 groups. | [MT4Service overview](../MT4Service/MT4Service.Overview.md) |
| **1 · MT4Account** | `src/MT4Account.ts` | Low-level gRPC: protobuf request/reply, connect/session, reconnect, streaming. Everything builds on it. 5 groups. | [MT4Account overview](../MT4Account/MT4Account.Master.Overview.md) |

```
Your code  →  MT4Sugar  →  MT4Service  →  MT4Account  →  gRPC  →  mt4.mrpc.pro:443  →  MT4 terminal
```

---

## 🌳 Repository tree

- **`NodeMT4/`** — repo root (SDK layers + runnable demos + docs)
  - `src/MT4Account.ts` — **Layer 1** source → [MT4Account overview](../MT4Account/MT4Account.Master.Overview.md)
  - `src/MT4Service.ts` — **Layer 2** source (+ all DTO interfaces) → [MT4Service overview](../MT4Service/MT4Service.Overview.md)
  - `src/MT4Sugar.ts` — **Layer 3** source → [MT4Sugar overview](../MT4Sugar/MT4Sugar.API_Overview.md)
  - `src/errors.ts` — `MrpcError` / `MT4Error` / `TradeOutcomeUnknownError` / `NotConnectedError` → [Return Codes & errors](./RETURN_CODES_REFERENCE.md)
  - `src/index.ts` — barrel: re-exports all three layers, errors, types and the `*Pb` stub modules
  - **`package/`** — generated protobuf stubs (`mt4-term-api-*_pb.js`, `*_grpc_pb.js`, `google/`) — the raw contract → [Protobuf Inspector](./PROTOBUF_INSPECTOR_GUIDE.md)
  - **`examples/`** — runnable code
    - `quickstart.js` — smallest connect-and-trade example
    - **`demos/`** — the demo suite (menu via `main.js`; details below) → [Getting Started](./GETTING_STARTED.md)
      - `main.js` · `run_all.js` — interactive menu / batch runner
      - `config/` — `config.js` + `config.json` (demo credentials & defaults)
      - `helpers/` — `connection.js` + `15_protobuf_inspector.js` (offline stub explorer)
      - `lowlevel/` — 01 general · 02 trading · 03 streaming — raw `MT4Account`
      - `service/` — 04 demo · 05 streaming — `MT4Service`
      - `sugar/` — 06 basics · 07 trading · 08 positions · 09 history · 10 advanced
      - `orchestrators/` — 11 trailing stop · 12 grid trader · 13 risk manager
      - `presets/` — 14 adaptive preset
      - `usercode/` — 16 sandbox for your own snippets
  - **`tests/`** — the `node --test` suite
  - **`docs/`** — this documentation site (mkdocs-material) — see the map below
  - `package.json` · `tsconfig.json` · `mkdocs.yml` — project / docs config

---

## 📚 Documentation tree

- **`docs/`**
  - [Home](../index.md) — landing page (cards into the three layers + Trade Copier)
  - **`All_Guides/`** — the guides in the left nav (Getting Started, MT4 for Beginners, Your First Project, Project Map, SDK Ecosystem, Glossary, Concurrency Model, gRPC Stream Management, Enums Usage, Return Codes, Protobuf Inspector, UserCode Sandbox)
  - **`MT4Account/`** — low-level gRPC docs → [overview](../MT4Account/MT4Account.Master.Overview.md) *(per-method pages inside)*
  - **`MT4Service/`** — typed facade docs → [overview](../MT4Service/MT4Service.Overview.md) *(per-group pages inside)*
  - **`MT4Sugar/`** — one-liner docs → [overview](../MT4Sugar/MT4Sugar.API_Overview.md) *(per-group pages inside)*
  - **`Orchestrators/`** — strategy loops & the adaptive preset → [overview](../Orchestrators/Strategies.Master.Overview.md)
  - `styles/` · `javascripts/` · `includes/` — assets & theme

> The `MT4Account/`, `MT4Service/` and `MT4Sugar/` folders hold the detail pages but are **not in the left sidebar** — reach them from the home cards or the overview links above. Each overview is the index into its own pages.

---

## 🎮 The demo suite (`examples/demos/`)

| Folder | Demos |
| ------ | ----- |
| `lowlevel/` | 01 general ops · 02 trading · 03 streaming — raw `MT4Account` |
| `service/` | 04 service demo · 05 service streaming — `MT4Service` |
| `sugar/` | 06 basics · 07 trading · 08 positions · 09 history · 10 advanced |
| `orchestrators/` | 11 trailing stop · 12 grid trader · 13 risk manager |
| `presets/` | 14 adaptive preset |
| `helpers/` | shared `connection.js` + `15_protobuf_inspector.js` (offline stub explorer) |
| `usercode/` | 16 sandbox for your own snippets |

```bash
node examples/demos/main.js 6                      # sugar basics
node examples/demos/main.js 11                     # trailing-stop orchestrator
node examples/demos/helpers/15_protobuf_inspector.js   # inspect the stubs (no connection)
```

Config comes from `examples/demos/config/config.json` or the env vars `MT4_LOGIN` / `MT4_PASSWORD` / `MT4_SERVER` / `MT4_SYMBOL` / `MT4_VOLUME` / `MRPC_API_KEY`.

---

## 🎯 Which layer should you use?

- **Most trading apps → [MT4Sugar](../MT4Sugar/MT4Sugar.API_Overview.md).** One-liners, risk-based sizing and pip SL/TP keep your code short and safe.
- **Custom execution → [MT4Service](../MT4Service/MT4Service.Overview.md).** Typed calls when you manage your own flow.
- **Protocol-level control → [MT4Account](../MT4Account/MT4Account.Master.Overview.md).** Raw protobuf requests and streams.
- **New to MT4?** → [MT4 for Beginners](./MT4_For_Beginners.md), then [Getting Started](./GETTING_STARTED.md).
- **Mirror trades to other accounts?** → [SDK Ecosystem → Trade Copier](./SDK_Ecosystem.md).
