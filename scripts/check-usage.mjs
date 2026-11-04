#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const pkgRoot = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const uiDir = path.join(pkgRoot, 'src', 'components', 'ui');
const demoDir = path.join(pkgRoot, 'src', 'preview', 'demos');
if (!fs.existsSync(demoDir)) process.exit(0);

function stripComments(text) {
  const out = [];
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '/' && text[i + 1] === '*') {
      const end = text.indexOf('*/', i + 2);
      i = end < 0 ? text.length : end + 1;
      continue;
    }
    if (text[i] === '/' && text[i + 1] === '/') {
      const end = text.indexOf('\n', i);
      i = end < 0 ? text.length : end;
      continue;
    }
    out.push(text[i]);
  }
  return out.join('');
}

function objectEnd(text, i) {
  let depth = 0;
  for (let j = i; j < text.length; j++) {
    if (text[j] === '{') depth++;
    else if (text[j] === '}') {
      depth--;
      if (depth === 0) return j;
    }
  }
  return -1;
}

function topLevelKeys(body) {
  const keys = [];
  let depth = 0;
  for (let j = 0; j < body.length; j++) {
    const c = body[j];
    if (c === '{' || c === '[') depth++;
    else if (c === '}' || c === ']') depth--;
    else if (depth === 0) {
      const m = body.slice(j, j + 40).match(/^([A-Za-z_$][\w$]*)\s*:/);
      if (m) {
        keys.push(m[1]);
        j += m[1].length;
      }
    }
  }
  return keys;
}

function variantMap(text) {
  const cvaAt = text.indexOf('cva(');
  if (cvaAt < 0) return null;
  const variantsAt = text.indexOf('variants:', cvaAt);
  if (variantsAt < 0) return null;
  const brace = text.indexOf('{', variantsAt);
  if (brace < 0) return null;
  const body = text.slice(brace + 1, objectEnd(text, brace));
  const map = {};
  for (const axis of topLevelKeys(body)) {
    const axisAt = body.indexOf(axis + ':');
    const axisBrace = body.indexOf('{', axisAt);
    if (axisBrace < 0) continue;
    map[axis] = new Set(topLevelKeys(body.slice(axisBrace + 1, objectEnd(body, axisBrace))));
  }
  return map;
}

function importMap(text) {
  const map = {};
  for (const m of text.matchAll(
    /import\s*\{([^}]*)\}\s*from\s*"[^"]*components\/ui\/([a-z0-9-]+)"/g,
  )) {
    for (const raw of m[1].split(',')) {
      const name = raw.trim().split(' as ')[0].trim();
      if (name) map[name] = m[2];
    }
  }
  return map;
}

const cache = new Map();
function variantsFor(file) {
  if (cache.has(file)) return cache.get(file);
  const compPath = path.join(uiDir, file + '.tsx');
  if (!fs.existsSync(compPath)) {
    cache.set(file, null);
    return null;
  }
  const map = variantMap(stripComments(fs.readFileSync(compPath, 'utf8')));
  cache.set(file, map);
  return map;
}

const failures = [];
let checked = 0;
for (const file of fs.readdirSync(demoDir).sort()) {
  if (!file.endsWith('.tsx')) continue;
  const text = stripComments(fs.readFileSync(path.join(demoDir, file), 'utf8'));
  const names = importMap(text);
  for (const m of text.matchAll(/<([A-Z][A-Za-z0-9_]*)/g)) {
    const component = names[m[1]];
    if (!component) continue;
    const map = variantsFor(component);
    if (!map) continue;
    const openEnd = text.indexOf('>', m.index);
    if (openEnd < 0) continue;
    const tag = text.slice(m.index, openEnd);
    for (const attr of tag.matchAll(/\b([a-z]+)="([A-Za-z0-9_-]+)"/g)) {
      if (!map[attr[1]]) continue;
      checked += 1;
      if (!map[attr[1]].has(attr[2]))
        failures.push(
          file +
            ': <' +
            m[1] +
            ' ' +
            attr[1] +
            '="' +
            attr[2] +
            '"> — declared values: ' +
            [...map[attr[1]]].join(', '),
        );
    }
  }
}

if (failures.length) {
  console.log('check-usage: ' + failures.length + ' undeclared usage value(s)');
  for (const f of failures) console.log('  ' + f);
  process.exit(1);
}
console.log('check-usage: OK (' + checked + ' usage values checked against declared cva axes)');
