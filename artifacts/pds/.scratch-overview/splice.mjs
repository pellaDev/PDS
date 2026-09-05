import { readFileSync, writeFileSync } from 'node:fs';
const p = new URL('./foundations.tsx', import.meta.url);
let src = readFileSync(p, 'utf8');
const start = src.indexOf('export function OverviewPage() {');
if (start < 0) throw new Error('OverviewPage not found');
const i0 = src.indexOf('{', start);
let depth = 0, end = -1;
for (let i = i0; i < src.length; i++) {
  if (src[i] === '{') depth++;
  else if (src[i] === '}') { depth--; if (depth === 0) { end = i + 1; break; } }
}
if (end < 0) throw new Error('brace match failed');
const NEW = readFileSync(new URL('./newfn.tsx', import.meta.url), 'utf8');
src = src.slice(0, start) + NEW + src.slice(end);
writeFileSync(p, src);
console.log('spliced OK, new length', src.length);
