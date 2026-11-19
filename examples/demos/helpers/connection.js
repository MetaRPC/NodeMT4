/*══════════════════════════════════════════════════════════════════════════════
 FILE: connection.js - DEMO CONNECTION HELPER

 PURPOSE:
   One place that (1) loads the SDK, (2) connects a MT4Sugar (which exposes all
   three layers via sugar / sugar.service() / sugar.account()), and (3) provides
   the small console helpers every demo uses (printSection / printSub).

 Every demo receives an already-connected `sugar` and the loaded `cfg`.
══════════════════════════════════════════════════════════════════════════════*/

'use strict';

// The built SDK (run `npm run build` first). Exposes MT4Account / MT4Service / MT4Sugar / errors.
const sdk = require('../../../src');
const { loadConfig } = require('../config/config');

const C = { reset: '\x1b[0m', green: '\x1b[32m', cyan: '\x1b[36m', yellow: '\x1b[33m', dim: '\x1b[2m' };

/** A boxed section header. */
function printSection(title) {
  const line = '═'.repeat(78);
  console.log(`\n${C.cyan}${line}\n  ${title}\n${line}${C.reset}`);
}

/** A sub-step label inside a demo. */
function printSub(title) {
  console.log(`\n${C.yellow}── ${title} ──${C.reset}`);
}

/**
 * Build a MT4Sugar and connect it using the config (ConnectEx by broker server name).
 * @returns {Promise<import('../../../src').MT4Sugar>}
 */
async function connect(cfg = loadConfig()) {
  printSection('CONNECTION');
  if (!cfg.user || !cfg.password) {
    throw new Error('No credentials. Fill examples/demos/config/config.json or set MT4_LOGIN / MT4_PASSWORD / MT4_SERVER.');
  }
  const sugar = sdk.MT4Sugar.create(cfg.host, cfg.port, cfg.apiKey || null);
  console.log(`→ Connecting ${cfg.user} @ ${cfg.server} (${cfg.host}:${cfg.port}) …`);
  await sugar.service().connect({ user: cfg.user, password: cfg.password, server: cfg.server, timeoutSeconds: 120 });
  console.log(`${C.green}  ✓ Connected — terminal id ${sugar.account().id}${C.reset}`);
  return sugar;
}

/** Drop the channel (keeps the terminal warm on the gateway). */
function disconnectQuiet(sugar) {
  try { sugar.account().close(); } catch { /* ignore */ }
}

module.exports = { sdk, connect, disconnectQuiet, printSection, printSub, C };
