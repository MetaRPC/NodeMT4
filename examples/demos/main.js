/*══════════════════════════════════════════════════════════════════════════════
 FILE: main.js - ENTRY POINT FOR ALL NODEMT4 DEMOS
 ╔═══════════════════════════════════════════════════════════════════════════╗
 ║                   NodeMT4 — MetaTrader 4 gRPC Client                      ║
 ╚═══════════════════════════════════════════════════════════════════════════╝

 Interactive menu (or direct launch) for the examples. Connects once, then runs
 the selected demo at the chosen abstraction level.

 LEARNING PROGRESSION:
   1) LOW-LEVEL  (MT4Account)  → lowlevel/   raw gRPC / protobuf
   2) MID-LEVEL  (MT4Service)  → service/    friendly structs, plain args
   3) HIGH-LEVEL (MT4Sugar)    → sugar/      one-liners, risk sizing

 USAGE:
   npm run build                      # compile the SDK first (emits src/*.js)
   node examples/demos/main.js        # interactive menu
   node examples/demos/main.js 1      # run demo [1] directly
   node examples/demos/main.js 2 <API_KEY>   # pass an API key as the 2nd arg

 Credentials: examples/demos/config/config.json or the MT4_* env vars.
══════════════════════════════════════════════════════════════════════════════*/

'use strict';

const readline = require('readline');
const { loadConfig, setApiKeyOverride } = require('./config/config');
const { connect, disconnectQuiet, C } = require('./helpers/connection');

// Demo registry: id → { label, warn?, mod }  (each module exports an async (sugar, cfg) => {}).
const DEMOS = {
  '1': { label: 'General operations    - account & symbols (raw MT4Account)', mod: './lowlevel/01_general_operations' },
  '2': { label: 'Trading operations    - orderSend/Modify/Close (raw)', warn: true, mod: './lowlevel/02_trading_operations' },
  '3': { label: 'Streaming             - raw tick + tickets streams (~6s)', mod: './lowlevel/03_streaming_methods' },
  '4': { label: 'Service demo          - friendly AccountInfo/Quote/OrderInfo + stats', mod: './service/04_service_demo' },
  '5': { label: 'Service streaming     - friendly Tick + trade + live account', mod: './service/05_service_streaming' },
  '6': { label: 'Sugar basics          - connection, balance, prices', mod: './sugar/06_sugar_basics' },
  '7': { label: 'Sugar trading         - open & close a tiny demo order', warn: true, mod: './sugar/07_sugar_trading' },
  '8': { label: 'Sugar positions       - list / inspect positions (read-only)', mod: './sugar/08_sugar_positions' },
  '9': { label: 'Sugar history         - deals & daily stats (read-only)', mod: './sugar/09_sugar_history' },
  '10': { label: 'Sugar advanced        - risk sizing / margin (read-only)', mod: './sugar/10_sugar_advanced' },
  '11': { label: 'Trailing stop         - open, trail SL, close', warn: true, mod: './orchestrators/11_trailing_stop' },
  '12': { label: 'Grid trader           - place & remove a pending grid', warn: true, mod: './orchestrators/12_grid_trader' },
  '13': { label: 'Risk manager          - monitor account / kill-switch', mod: './orchestrators/13_risk_manager' },
  '14': { label: 'Adaptive preset       - analyse market → pick an orchestrator', mod: './presets/14_adaptive_preset' },
  '16': { label: 'Sandbox               - your own code (edit 16_usercode.js)', mod: './usercode/16_usercode' },
};

function printMenu() {
  console.log(`\n${C.cyan}══════════════════════════════════════════════════════════════════════════════`);
  console.log('  NodeMT4 DEMOS');
  console.log(`══════════════════════════════════════════════════════════════════════════════${C.reset}`);
  for (const [id, d] of Object.entries(DEMOS)) {
    const mark = d.warn ? `${C.yellow}⚠${C.reset} ` : '  ';
    console.log(`  [${id.padStart(2)}] ${mark}${d.label}`);
  }
  console.log('\n  [0] exit');
}

async function run(id, sugar, cfg) {
  const entry = DEMOS[id];
  if (!entry) return false;
  const demo = require(entry.mod);
  await demo(sugar, cfg);
  return true;
}

async function main() {
  const args = process.argv.slice(2);
  const direct = args[0];
  if (args[1]) setApiKeyOverride(args[1]);

  const cfg = loadConfig();
  if (!cfg.user || !cfg.password) {
    console.error('No credentials. Fill examples/demos/config/config.json or set MT4_LOGIN / MT4_PASSWORD / MT4_SERVER.');
    process.exit(2);
  }

  let sugar;
  try {
    sugar = await connect(cfg);

    if (direct && direct !== 'menu') {
      if (!(await run(direct, sugar, cfg))) { console.error(`Unknown demo: ${direct}`); process.exit(1); }
      return;
    }

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const ask = (q) => new Promise((res) => rl.question(q, res));
    for (;;) {
      printMenu();
      const choice = (await ask('\n  Select: ')).trim();
      if (choice === '0' || choice === 'exit' || choice === 'quit') break;
      try {
        if (!(await run(choice, sugar, cfg))) console.log('  Unknown choice.');
      } catch (e) {
        console.error(`${C.yellow}  demo error:${C.reset} ${e.message || e}`);
      }
      await ask('\n  Press Enter to return to the menu…');
    }
    rl.close();
  } catch (e) {
    console.error(`Fatal: ${e.message || e}`);
    process.exitCode = 1;
  } finally {
    if (sugar) disconnectQuiet(sugar);
  }
}

main();
