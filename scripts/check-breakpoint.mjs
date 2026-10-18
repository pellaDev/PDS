#!/usr/bin/env node

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = join(fileURLToPath(import.meta.url), '..', '..');
const tokensPath = join(packageRoot, 'tokens.json');
const srcDir = join(packageRoot, 'src');
const ROOT_FONT_SIZE_PX = 16;

function toPx(value) {
  const n = Number.parseFloat(value);
  if (!Number.isFinite(n)) return null;
  if (/(rem|em)$/.test(String(value).trim())) return n * ROOT_FONT_SIZE_PX;
  return n;
}

function cssFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...cssFiles(full));
    else if (entry.endsWith('.css')) out.push(full);
  }
  return out;
}

const tokens = JSON.parse(readFileSync(tokensPath, 'utf8'));
const tokenValue =
  tokens.layout && tokens.layout.breakpointMobile && tokens.layout.breakpointMobile.$value;
const tokenPx = toPx(tokenValue);
if (!tokenPx) {
  console.error(
    'check-breakpoint: tokens.json -> layout.breakpointMobile is not a dimension (got ' +
      tokenValue +
      ')',
  );
  process.exit(1);
}

const queryRe = /@(?:media|container)[^{]*?(max-width|min-width):\s*([0-9.]+)(px|rem|em)/g;
const failures = [];
const notes = [];

for (const file of cssFiles(srcDir)) {
  const text = readFileSync(file, 'utf8');
  for (const m of text.matchAll(queryRe)) {
    const px = toPx(m[2] + m[3]);
    const at = m.index;
    const line = text.slice(0, at).split('\n').length;
    const context = text.slice(Math.max(0, at - 220), at + m[0].length);
    if (px === tokenPx) continue;
    if (/intentional:/.test(context)) {
      notes.push(
        file.replace(packageRoot + '/', '') +
          ':' +
          line +
          ' — ' +
          m[2] +
          m[3] +
          ' (' +
          px +
          'px) marked intentional',
      );
      continue;
    }
    failures.push(
      file.replace(packageRoot + '/', '') +
        ':' +
        line +
        ' — ' +
        m[2] +
        m[3] +
        ' (' +
        px +
        'px) != breakpointMobile ' +
        tokenValue +
        ' (' +
        tokenPx +
        'px)',
    );
  }
}

console.log('check-breakpoint: shared mobile breakpoint = ' + tokenValue + ' (' + tokenPx + 'px)');
if (notes.length) console.log('  documented exceptions:\n  ' + notes.join('\n  '));
if (failures.length) {
  console.error('  queries that do not match the token:\n  ' + failures.join('\n  '));
  console.error(
    '  Fix: state the token value, or mark the query with /* intentional: <reason> */.',
  );
  process.exit(1);
}
console.log('  all media- and container-query widths match the token.');
