/* Batch runner: connect ONCE (one trial terminal), run a sequence of demos on the
   same sugar, then disconnect WITH delete to free the trial-per-IP slot. */
'use strict';

const { connect, printSection, C } = require('./helpers/connection');
const { loadConfig } = require('./config/config');

const SEQ = (process.argv[2] || '1,4,5,6,8,9,10,7,2,11,12,13,14,3').split(',');

const MODS = {
  '1': './lowlevel/01_general_operations',
  '2': './lowlevel/02_trading_operations',
  '3': './lowlevel/03_streaming_methods',
  '4': './service/04_service_demo',
  '5': './service/05_service_streaming',
  '6': './sugar/06_sugar_basics',
  '7': './sugar/07_sugar_trading',
  '8': './sugar/08_sugar_positions',
  '9': './sugar/09_sugar_history',
  '10': './sugar/10_sugar_advanced',
  '11': './orchestrators/11_trailing_stop',
  '12': './orchestrators/12_grid_trader',
  '13': './orchestrators/13_risk_manager',
  '14': './presets/14_adaptive_preset',
  '16': './usercode/16_usercode',
};

(async () => {
  const cfg = loadConfig();
  let sugar;
  try {
    sugar = await connect(cfg);
  } catch (e) {
    console.error('CONNECT FAILED:', e.message);
    process.exit(1);
  }

  for (const id of SEQ) {
    const mod = MODS[id];
    if (!mod) { console.log(`\n(skip unknown demo ${id})`); continue; }
    printSection(`DEMO ${id}  —  ${mod}`);
    try {
      const demo = require(mod);
      await demo(sugar, cfg, {});
      console.log(`${C.green}  ✓ demo ${id} OK${C.reset}`);
    } catch (e) {
      console.log(`${C.yellow}  ✗ demo ${id} ERROR: ${e.message}${C.reset}`);
    }
  }

  // Free the trial terminal slot on the gateway.
  try {
    printSection('DISCONNECT (delete terminal — free trial slot)');
    await sugar.service().disconnect(true);
    console.log(`${C.green}  ✓ disconnected + deleted${C.reset}`);
  } catch (e) {
    console.log(`  disconnect note: ${e.message}`);
    try { sugar.account().close(); } catch { /* ignore */ }
  }
  process.exit(0);
})();
