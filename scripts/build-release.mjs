#!/usr/bin/env node

import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  cpSync,
  existsSync,
  readdirSync,
  statSync,
  unlinkSync,
} from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const dist = resolve(root, 'dist');

const args = process.argv.slice(2);
const flags = {};
for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--outline') flags.outline = true;
  else if (arg === '--flat') flags.flat = true;
  else if (arg === '--lightPrimary') flags.lightPrimary = args[++i];
  else if (arg === '--darkPrimary') flags.darkPrimary = args[++i];
  else if (arg === '--font') flags.font = args[++i];
}

console.log('\n\xf0\x9f\x94\xa8 PDS Release Build');
const activeFlags = Object.entries(flags).filter(([_, v]) => v !== undefined);
if (activeFlags.length) console.log('   ' + activeFlags.map(([k, v]) => k + '=' + v).join('  '));

function hexToHsl(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3)
    hex = hex
      .split('')
      .map((c) => c + c)
      .join('');
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return Math.round(h * 360) + ' ' + Math.round(s * 100) + '% ' + Math.round(l * 1000) / 10 + '%';
}

console.log('\n   \xf0\x9f\x93\x9d CSS...');
let css = readFileSync(resolve(root, 'src/index.css'), 'utf-8');

if (flags.lightPrimary) {
  const hsl = hexToHsl(flags.lightPrimary);
  css = css.replace(/--pds-brand-light:\s*[^;]+;/g, '--pds-brand-light: ' + hsl + ';');
  console.log('      \xf0\x9f\x8e\xa8 lightPrimary -> HSL(' + hsl + ')');
}
if (flags.darkPrimary) {
  const hsl = hexToHsl(flags.darkPrimary);
  css = css.replace(/--pds-brand-dark:\s*[^;]+;/g, '--pds-brand-dark: ' + hsl + ';');
  console.log('      \xf0\x9f\x8e\xa8 darkPrimary -> HSL(' + hsl + ')');
}
if (flags.font) {
  css = css.replace(
    /--pds-font-sans:\s*[^;]+;/g,
    "--pds-font-sans: '" + flags.font + "', sans-serif;",
  );
  console.log('      \xf0\x9f\x94\xa4 font -> ' + flags.font);
}
if (flags.flat) {
  css +=
    '\n:root, .dark {\n  --shadow-button: none !important;\n  --shadow-menuLeft: none !important;\n  --shadow-menuRight: none !important;\n  --shadow-dropDown: none !important;\n  --shadow-trigger: none !important;\n  --shadow-dots: none !important;\n  --elevate-1: transparent !important;\n  --elevate-2: transparent !important;\n}\n';
  console.log('      \xf0\x9f\x93\x90 flat (no shadows/elevation)');
}
if (flags.outline) {
  css +=
    '\n:root {\n  --pds-mode: outline;\n  --button-outline: rgba(0,0,0,.25);\n  --badge-outline: rgba(0,0,0,.15);\n}\n.dark {\n  --button-outline: rgba(255,255,255,.25);\n  --badge-outline: rgba(255,255,255,.15);\n}\n';
  console.log('      \xf0\x9f\x93\x90 outline (border mode)');
}

mkdirSync(dist, { recursive: true });
const tmpCss = join(dist, '.input.css');
writeFileSync(tmpCss, css);

try {
  execSync(
    'npx @tailwindcss/cli -i ' +
      JSON.stringify(tmpCss) +
      ' -o ' +
      JSON.stringify(join(dist, 'styles.css')) +
      ' --minify',
    { cwd: root, stdio: 'pipe' },
  );
  console.log('      \xe2\x9c\x85 dist/styles.css');
} catch (e) {
  console.warn('      \xe2\x9a\xa0\xef\xb8\x8f Tailwind CLI failed, copying raw CSS');
  writeFileSync(join(dist, 'styles.css'), css);
}
if (existsSync(tmpCss)) unlinkSync(tmpCss);

console.log('\n   \xe2\x9a\x99\xef\xb8\x8f TSX -> ESM...');
const esbuild = await import('esbuild');

function collectFiles(dir, outDir) {
  const results = [];
  if (!existsSync(dir)) return results;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      results.push(...collectFiles(full, join(outDir, entry)));
    } else if (/\.(tsx|ts)$/.test(entry) && entry !== 'App.tsx' && entry !== 'main.tsx') {
      const outName = entry.replace(/\.(tsx|ts)$/, '.js');
      results.push({ from: full, to: join(outDir, outName) });
    }
  }
  return results;
}

const files = collectFiles(resolve(root, 'src'), dist);
console.log('      ' + files.length + ' files');

for (const { from, to } of files) {
  const src = readFileSync(from, 'utf-8');
  const result = await esbuild.transform(src, {
    loader: from.endsWith('.tsx') ? 'tsx' : 'ts',
    format: 'esm',
    target: 'es2022',
    jsx: 'automatic',
  });
  mkdirSync(dirname(to), { recursive: true });
  writeFileSync(to, result.code);
}
console.log('      \xe2\x9c\x85 ' + files.length + ' files compiled');

console.log('\n   \xf0\x9f\x93\x8b Types...');
try {
  execSync(
    'npx tsc --declaration --emitDeclarationOnly --noEmit false --outDir dist --rootDir src --module esnext --moduleResolution bundler --jsx react-jsx --skipLibCheck',
    { cwd: root, stdio: 'pipe' },
  );
  console.log('      \xe2\x9c\x85 .d.ts generated');
} catch (e) {
  console.warn('      \xe2\x9a\xa0\xef\xb8\x8f tsc failed (non-fatal)');
}

const fontsSrc = resolve(root, 'public/fonts');
if (existsSync(fontsSrc)) {
  cpSync(fontsSrc, join(dist, 'fonts'), { recursive: true });
  console.log('\n   \xf0\x9f\x93\xbd dist/fonts/');
}

function copyCssFiles(srcDir, outDir) {
  if (!existsSync(srcDir)) return;
  for (const entry of readdirSync(srcDir)) {
    const full = join(srcDir, entry);
    if (statSync(full).isDirectory()) {
      copyCssFiles(full, join(outDir, entry));
    } else if (entry.endsWith('.css')) {
      mkdirSync(outDir, { recursive: true });
      cpSync(full, join(outDir, entry));
    }
  }
}
copyCssFiles(resolve(root, 'src/components'), join(dist, 'components'));
console.log('   \xf0\x9f\x93\xbd component CSS files');

const stylesPath = join(dist, 'styles.css');
if (existsSync(stylesPath)) {
  let cssOut = readFileSync(stylesPath, 'utf-8');
  cssOut = cssOut.replace(/\/fonts\//g, './fonts/');
  writeFileSync(stylesPath, cssOut);
}

const exportMap = {
  '.': './generated/tokens.js',
  './tokens': './generated/tokens.js',
  './styles.css': './styles.css',
  './config': './config.js',
  './components/*': './components/*',
  './lib/*': './lib/*',
  './hooks/*': './hooks/*',
};
writeFileSync(
  join(dist, 'package.json'),
  JSON.stringify({ type: 'module', exports: exportMap }, null, 2),
);

console.log('\n\xe2\x9c\x85 Build complete!\n');
