#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const pkgRoot = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const uiDir = path.join(pkgRoot, 'src', 'components', 'ui');
const primitiveSlots = new Set(['stack', 'row', 'grid', 'panel']);

const failures = [];
let scanned = 0;
for (const file of fs.readdirSync(uiDir).sort()) {
  if (!file.endsWith('.tsx') || file === 'layout.tsx') continue;
  const text = fs
    .readFileSync(path.join(uiDir, file), 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/[^\n]*/g, '');
  for (const m of text.matchAll(/data-slot="([a-z0-9-]+)"/g)) {
    scanned += 1;
    if (primitiveSlots.has(m[1]))
      failures.push(`${file}: data-slot="${m[1]}" belongs to a layout primitive`);
  }
}

if (failures.length) {
  console.log('check-dataslot: ' + failures.length + ' primitive slot(s) claimed by a component');
  for (const f of failures) console.log('  ' + f);
  process.exit(1);
}
console.log('check-dataslot: OK (' + scanned + ' data-slot values scanned)');
