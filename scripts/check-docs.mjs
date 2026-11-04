#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const pkgRoot = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const monoRoot = path.resolve(pkgRoot, '../..');
const uiDir = path.join(pkgRoot, 'src', 'components', 'ui');
const countersOnly = process.argv.includes('--counters');

function agentsPath() {
  const candidates = [
    path.join(monoRoot, 'release-assets', 'AGENTS.md'),
    path.join(pkgRoot, 'AGENTS.md'),
  ];
  for (const candidate of candidates) if (fs.existsSync(candidate)) return candidate;
  return null;
}

const failures = [];
const listed = new Set();
let rows = 0;
let statedCount = null;
const agents = agentsPath();
if (agents) {
  const text = fs.readFileSync(agents, 'utf8');
  const start = text.indexOf('## Components');
  const end = text.indexOf('## Canonical compositions');
  if (start >= 0 && end > start) {
    for (const line of text.slice(start, end).split('\n')) {
      const m = line.match(/^\| ([A-Za-z][^|]*)\| `([^`]+)` \|/);
      if (!m) continue;
      rows += 1;
      listed.add(m[2]);
    }
  }
  for (const line of text.split('\n')) {
    const m = line.match(/(\d+) components/);
    if (m) {
      statedCount = Number(m[1]);
      break;
    }
  }
  if (statedCount !== null && statedCount !== listed.size) {
    failures.push(
      'AGENTS.md states ' + statedCount + ' components, its index lists ' + listed.size,
    );
  }
}

const componentFiles = fs
  .readdirSync(uiDir)
  .filter((f) => f.endsWith('.tsx'))
  .map((f) => f.replace('.tsx', ''));
if (agents) {
  for (const name of componentFiles)
    if (!listed.has(name))
      failures.push('src/components/ui/' + name + '.tsx is not in the AGENTS.md index');
  for (const name of listed)
    if (!fs.existsSync(path.join(uiDir, name + '.tsx')))
      failures.push(
        'the index lists ' + name + ' but src/components/ui/' + name + '.tsx is missing',
      );
}

const caps = { components: 60, usage: 40 };
const baselinePath = path.join(pkgRoot, 'scripts', 'docs-baseline.json');
const baseline = fs.existsSync(baselinePath)
  ? JSON.parse(fs.readFileSync(baselinePath, 'utf8'))
  : {};
let aboveCap = 0;
for (const [group, cap] of Object.entries(caps)) {
  const dir = path.join(pkgRoot, 'docs', group);
  if (!fs.existsSync(dir)) continue;
  for (const file of fs.readdirSync(dir).sort()) {
    if (!file.endsWith('.md')) continue;
    const lines = fs.readFileSync(path.join(dir, file), 'utf8').split('\n').length;
    const key = group + '/' + file;
    const allowed = baseline[key] === undefined ? cap : baseline[key];
    if (lines > allowed) failures.push(key + ' is ' + lines + ' lines, cap ' + allowed);
    else if (allowed > cap) aboveCap += 1;
  }
}

const measured = {
  indexRows: rows,
  listedFiles: listed.size,
  componentFiles: componentFiles.length,
  statedCount,
  usageDocsAboveCap: aboveCap,
};
if (countersOnly) {
  console.log(JSON.stringify(measured));
  process.exit(0);
}
console.log('check-docs: ' + JSON.stringify(measured));
if (failures.length) {
  for (const f of failures) console.log('  ' + f);
  process.exit(1);
}
console.log('check-docs: OK');
