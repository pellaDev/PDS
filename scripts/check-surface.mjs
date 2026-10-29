#!/usr/bin/env node

import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = join(fileURLToPath(import.meta.url), '..', '..');
const srcDir = join(packageRoot, 'src', 'components', 'ui');
const baselinePath = join(packageRoot, 'scripts', 'surface-baseline.json');

const RE_TSX = /(^|[\s"'`])bg-(background|card|secondary|muted)(?![\w-])/;
const RE_CSS =
  /background(?:-color)?:\s*var\(--color-(background|card|secondary|popover|muted)\)(?![\w-])/;

function scan() {
  const out = {};
  for (const entry of readdirSync(srcDir).sort()) {
    const full = join(srcDir, entry);
    if (!statSync(full).isFile()) continue;
    if (!entry.endsWith('.tsx') && !entry.endsWith('.css')) continue;
    const text = readFileSync(full, 'utf8');
    const hits = [];
    text.split('\n').forEach((line, i) => {
      if (line.includes('color-mix')) return;
      const isTsx = entry.endsWith('.tsx');
      if ((isTsx && RE_TSX.test(line)) || (!isTsx && RE_CSS.test(line))) {
        hits.push({ line: i + 1, marked: /intentional:/.test(line) });
      }
    });
    if (hits.length) out[entry] = hits;
  }
  return out;
}

const live = scan();
const liveTotal = Object.values(live).reduce((s, hits) => s + hits.length, 0);

if (process.argv.includes('--write-baseline')) {
  const prev = JSON.parse(readFileSync(baselinePath, 'utf8'));
  const files = {};
  for (const [name, hits] of Object.entries(live)) {
    const old = prev.files[name];
    files[name] = {
      kind: old ? old.kind : 'unclassified',
      note: old ? old.note : 'new hit, classify it before committing',
      count: hits.length,
      lines: hits.map((h) => h.line),
      marked: hits.filter((h) => h.marked).length,
    };
  }
  const next = {
    ...prev,
    generatedBy: 'scripts/check-surface.mjs baseline mode',
    total: liveTotal,
    files,
  };
  writeFileSync(baselinePath, JSON.stringify(next, null, 2) + '\n');
  console.log(
    'check-surface: baseline rewritten with ' +
      liveTotal +
      ' hits across ' +
      Object.keys(files).length +
      ' files.',
  );
  process.exit(0);
}

const baseline = JSON.parse(readFileSync(baselinePath, 'utf8'));
const failures = [];
const warnings = [];

for (const [name, hits] of Object.entries(live)) {
  const entry = baseline.files[name];
  const unmarked = hits.filter((h) => !h.marked);
  if (!entry) {
    failures.push(
      name +
        ':' +
        hits.map((h) => h.line).join(',') +
        ' — not in the baseline (' +
        hits.length +
        ' static fill)',
    );
    continue;
  }
  if (unmarked.length > entry.count) {
    failures.push(
      name +
        ': ' +
        unmarked.length +
        ' unmarked static fills > baseline ' +
        entry.count +
        ' (' +
        hits.map((h) => (h.marked ? 'ok' : 'line ' + h.line)).join(', ') +
        ')',
    );
    continue;
  }
  if (entry.kind === 'pending-role') {
    warnings.push(
      name +
        ': ' +
        entry.count +
        ' pending (' +
        entry.note +
        ') — lines ' +
        hits.map((h) => h.line).join(','),
    );
  }
}
for (const [name, entry] of Object.entries(baseline.files)) {
  if (!live[name])
    warnings.push(name + ': baseline entry is stale (0 live hits) — shrink the baseline');
}

console.log(
  'check-surface: ' +
    liveTotal +
    ' static palette fills across ' +
    Object.keys(live).length +
    ' files (baseline ' +
    baseline.total +
    ')',
);
if (warnings.length) console.log('  recorded debt:\n  ' + warnings.join('\n  '));
if (failures.length) {
  console.error('  new static fills:\n  ' + failures.join('\n  '));
  console.error(
    "  Fix: use a surface role utility (bg-surface / bg-surface-card / bg-surface-canvas / bg-surface-field / bg-surface-row), or mark the line with an 'intentional:' comment plus the token leaf that declares it.",
  );
  process.exit(1);
}
console.log('  no new static fills.');
