/*══════════════════════════════════════════════════════════════════════════════
 FILE: 15_protobuf_inspector.js — INTERACTIVE PROTOBUF TYPES INSPECTOR

 PURPOSE:
   Explore the generated MT4 protobuf stubs at runtime — message getters/setters
   and enum values — without guessing names. The generated package/*_pb.js files
   are typed `any`, so this is the fastest way to answer "what's the real getter?"
   (e.g. getTradetickvalue, not getTradeTickValue) or "what are this enum's values?".

 OFFLINE: loads the stubs only; no connection, no API key, no trades.

 RUN (REPL):     node examples/demos/helpers/15_protobuf_inspector.js
 RUN (one-shot): node examples/demos/helpers/15_protobuf_inspector.js OrderSendRequest
                 node examples/demos/helpers/15_protobuf_inspector.js enum OrderSendOperationType
                 node examples/demos/helpers/15_protobuf_inspector.js search Tick

 COMMANDS (REPL):
   list [--msg|--enum]   list message types / enums
   <TypeName>            show a message's getters + setters
   search <text>         find message/enum names containing <text>
   enum <Name>           show an enum's values
   stats                 counts
   help / ?              this help
   exit / quit / q       leave

 NOTE: jspb stubs don't expose field numbers / proto types the way Python/Go
 descriptors do — this tool reports the real JS getters/setters and enum values,
 which is what you actually call. See docs/All_Guides/PROTOBUF_INSPECTOR_GUIDE.md.
══════════════════════════════════════════════════════════════════════════════*/

'use strict';

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const PKG_DIR = path.join(__dirname, '..', '..', '..', 'package');

// ── discover types & enums from every *_pb.js stub ──────────────────────────────
const types = new Map(); // name -> { module, getters, setters }
const enums = new Map(); // name -> { KEY: number }

function loadStubs() {
  const files = fs.readdirSync(PKG_DIR)
    .filter((f) => f.endsWith('_pb.js') && !f.endsWith('_grpc_pb.js'));
  for (const file of files) {
    let mod;
    try { mod = require(path.join(PKG_DIR, file)); } catch { continue; }
    for (const [name, val] of Object.entries(mod)) {
      if (typeof val === 'function' && val.prototype) {
        const getters = Object.getOwnPropertyNames(val.prototype).filter((n) => n.startsWith('get')).sort();
        const setters = Object.getOwnPropertyNames(val.prototype).filter((n) => n.startsWith('set')).sort();
        if (getters.length || setters.length) types.set(name, { module: file, getters, setters });
      } else if (val && typeof val === 'object') {
        const entries = Object.entries(val).filter(([, v]) => typeof v === 'number');
        if (entries.length) enums.set(name, Object.fromEntries(entries));
      }
    }
  }
}

// ── commands ────────────────────────────────────────────────────────────────────
const line = (c = '─') => c.repeat(59);

function cmdList(arg) {
  const showMsg = arg !== '--enum';
  const showEnum = arg !== '--msg';
  if (showMsg) {
    console.log(`\nMESSAGE TYPES (${types.size})\n${line()}`);
    [...types.keys()].sort().forEach((n, i) => console.log(`  ${String(i + 1).padStart(3)}. ${n}`));
  }
  if (showEnum) {
    console.log(`\nENUMS (${enums.size})\n${line()}`);
    [...enums.keys()].sort().forEach((n, i) => console.log(`  ${String(i + 1).padStart(3)}. ${n}`));
  }
}

function resolve(map, name) {
  if (map.has(name)) return name;
  const lc = name.toLowerCase();
  const exact = [...map.keys()].find((k) => k.toLowerCase() === lc);
  if (exact) return exact;
  const partial = [...map.keys()].filter((k) => k.toLowerCase().includes(lc));
  if (partial.length === 1) return partial[0];
  if (partial.length > 1) { console.log(`\n[!] Multiple match '${name}':\n  ` + partial.slice(0, 15).join('\n  ')); return null; }
  return null;
}

function cmdType(name) {
  const key = resolve(types, name);
  if (!key) { if (!enums.has(name)) console.log(`\n[!] Message type '${name}' not found (try: search ${name})`); return cmdEnumIfAny(name); }
  const t = types.get(key);
  console.log(`\nTYPE: ${key}   (${t.module})\n${line('=')}`);
  console.log(`getters (${t.getters.length}): ${t.getters.join(' ')}`);
  console.log(`\nsetters (${t.setters.length}): ${t.setters.join(' ')}`);
}

function cmdEnumIfAny(name) { if (resolve(enums, name)) cmdEnum(name); }

function cmdEnum(name) {
  const key = resolve(enums, name);
  if (!key) { console.log(`\n[!] Enum '${name}' not found`); return; }
  const e = enums.get(key);
  console.log(`\nENUM: ${key}\n${line('=')}`);
  Object.entries(e).sort((a, b) => a[1] - b[1]).forEach(([k, v]) => console.log(`  ${k.padEnd(40)} = ${v}`));
}

function cmdSearch(q) {
  const lc = q.toLowerCase();
  const m = [...types.keys()].filter((n) => n.toLowerCase().includes(lc)).sort();
  const en = [...enums.keys()].filter((n) => n.toLowerCase().includes(lc)).sort();
  console.log(`\nMATCHES for '${q}'\n${line()}`);
  if (m.length) console.log(`messages: ${m.join(', ')}`);
  if (en.length) console.log(`enums:    ${en.join(', ')}`);
  if (!m.length && !en.length) console.log('  (none)');
}

function cmdStats() {
  const totalEnumVals = [...enums.values()].reduce((s, e) => s + Object.keys(e).length, 0);
  console.log(`\nSTATS\n${line('=')}`);
  console.log(`  message types : ${types.size}`);
  console.log(`  enums         : ${enums.size}`);
  console.log(`  enum values   : ${totalEnumVals}`);
}

function help() {
  console.log(`\nCOMMANDS\n${line()}`);
  console.log('  list [--msg|--enum]   list messages / enums');
  console.log('  <TypeName>            show a message\'s getters + setters');
  console.log('  search <text>         find names containing <text>');
  console.log('  enum <Name>           show an enum\'s values');
  console.log('  stats                 counts');
  console.log('  help / ?              this help');
  console.log('  exit / quit / q       leave');
}

function dispatch(input) {
  const [cmd, ...rest] = input.trim().split(/\s+/);
  const arg = rest.join(' ');
  switch ((cmd || '').toLowerCase()) {
    case '': return;
    case 'list': case 'ls': return cmdList(arg);
    case 'search': case 'find': return arg ? cmdSearch(arg) : console.log('[!] Usage: search <text>');
    case 'enum': return arg ? cmdEnum(arg) : console.log('[!] Usage: enum <Name>');
    case 'stats': return cmdStats();
    case 'help': case '?': return help();
    default: return cmdType(input.trim());
  }
}

// ── main ────────────────────────────────────────────────────────────────────────
loadStubs();

const argv = process.argv.slice(2);
if (argv.length) {
  dispatch(argv.join(' '));       // one-shot
  process.exit(0);
}

console.log(`${line('=')}\nMT4 PROTOBUF INSPECTOR (Node)\n${line('=')}`);
console.log(`  ${types.size} message types · ${enums.size} enums discovered`);
console.log("  Type 'help' for commands, 'list' to browse, 'exit' to quit.");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '\n> ' });
rl.prompt();
rl.on('line', (l) => {
  const t = l.trim().toLowerCase();
  if (t === 'exit' || t === 'quit' || t === 'q') { rl.close(); return; }
  try { dispatch(l); } catch (e) { console.log(`[X] ${e.message}`); }
  rl.prompt();
});
rl.on('close', () => { console.log('\n[+] bye'); process.exit(0); });
