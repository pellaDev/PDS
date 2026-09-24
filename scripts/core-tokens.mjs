// Shared builders for theme-independent core scale tokens.
// Used by build-tokens.mjs; also importable standalone if ever needed elsewhere.

/** DTCG group entries, skipping $metadata keys and non-object leaves. */
function groupEntries(group) {
  const out = [];
  for (const [name, node] of Object.entries(group)) {
    if (name.startsWith('$')) continue;
    if (node && typeof node === 'object' && !Array.isArray(node)) out.push([name, node]);
  }
  return out;
}

/** #RRGGBB or #RRGGBBAA -> rgb()/rgba() for maximum browser support. */
function hexToRgba(hex) {
  const h = normalizeHexLocal(hex);
  const r = parseInt(h.slice(1, 3), 16);
  const g = parseInt(h.slice(3, 5), 16);
  const b = parseInt(h.slice(5, 7), 16);
  if (h.length === 7) return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  const a = Math.round((parseInt(h.slice(7, 9), 16) / 255) * 100) / 100;
  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
}

/** Local copy of the hex normalizer (kept independent on purpose). */
function normalizeHexLocal(value) {
  const v = String(value).trim().toUpperCase();
  if (/^#[0-9A-F]{6}$/.test(v) || /^#[0-9A-F]{8}$/.test(v)) return v;
  throw new Error('Expected #RRGGBB or #RRGGBBAA, got: ' + value);
}

/** Assemble the CSS box-shadow value for a DTCG shadow entry. */
function boxShadowCss(value) {
  const parts = [value.x, value.y, value.blur];
  if (value.spread && value.spread !== '0rem') parts.push(value.spread);
  const inset = value.type === 'innerShadow' ? 'inset ' : '';
  return inset + parts.join(' ') + ' ' + hexToRgba(value.color);
}

/** The theme-independent core scale: original type styles, dimension grid,
 * spacing presets, border weight, state constants and shadow set -- emitted as
 * plain CSS custom properties so any consumer can use them. */
function buildCoreTokens(tokens) {
  const ty = tokens.typography;
  const L = [];
  L.push('/* ===================================================================== */');
  L.push('/* CORE SCALE -- generated from tokens.json, theme-independent.          */');
  L.push('/* Edit tokens.json to change these values; never this file directly.    */');
  L.push(':root {');
  L.push('  /* Typography: the original system is Roboto Light (300) only, tracked +0.25px */');
  L.push('  --font-weight-base: ' + resolveValueLocal(ty.fontWeight.base, tokens) + ';');
  L.push('  --letter-spacing-base: ' + resolveValueLocal(ty.letterSpacing.base, tokens) + ';');
  for (const [name, node] of groupEntries(ty.styles)) {
    const v = node.$value;
    L.push(
      '  --type-' + name + '-size: ' + v.fontSize + '; /* ' + (node.$description || '') + ' */',
    );
    L.push('  --type-' + name + '-lh: ' + v.lineHeight + ';');
  }
  for (const [name, node] of groupEntries(tokens.dimensions)) {
    L.push(
      '  --dim-' +
        name +
        ': ' +
        resolveValueLocal(node, tokens) +
        '; /* ' +
        (node.$description || '') +
        ' */',
    );
  }
  L.push(
    '  --border-width: ' +
      resolveValueLocal(tokens.border.width, tokens) +
      '; /* original border weight (coreDimensions.ssss) */',
  );
  for (const [name, node] of groupEntries(tokens.spacing.presets)) {
    L.push(
      '  --space-' +
        name +
        ': ' +
        resolveValueLocal(node, tokens) +
        '; /* ' +
        (node.$description || '') +
        ' */',
    );
  }
  L.push(
    '  --opacity-disabled: ' +
      resolveValueLocal(tokens.opacity.disabled, tokens) +
      '; /* original global disabled opacity */',
  );
  for (const [name, node] of groupEntries(tokens.overlay)) {
    L.push(
      '  --overlay-' +
        name +
        ': ' +
        hexToRgba(resolveValueLocal(node, tokens)) +
        '; /* ' +
        (node.$description || '') +
        ' */',
    );
  }
  for (const [name, node] of groupEntries(tokens.shadows)) {
    L.push(
      '  --shadow-' +
        name +
        ': ' +
        boxShadowCss(node.$value) +
        '; /* ' +
        (node.$description || '') +
        ' */',
    );
  }
  // Sidebar geometry (layout group) -- defaults for the --sidebar-width* custom properties.
  for (const [name, node] of groupEntries(tokens.layout ?? {})) {
    const v = node?.$value;
    if (!v) continue;
    L.push(
      '  --' +
        name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() +
        ': ' +
        v +
        '; /* ' +
        (node.$description || '') +
        ' */',
    );
  }
  // Motion system (motion group) -- durations and easings used by PDS components.
  for (const [name, node] of groupEntries(tokens.motion?.duration ?? {})) {
    const v = node?.$value;
    if (!v) continue;
    L.push('  --duration-' + name + ': ' + v + '; /* ' + (node.$description || '') + ' */');
  }
  for (const [name, node] of groupEntries(tokens.motion?.easing ?? {})) {
    const v = node?.$value;
    if (!v) continue;
    L.push('  --ease-' + name + ': ' + v + '; /* ' + (node.$description || '') + ' */');
  }
  L.push('}');
  return L.join('\n');
}

/** Self-hosted font faces declared in tokens.json (typography.faces). */
function buildFontFaces(tokens) {
  const faces = Array.isArray(tokens.typography && tokens.typography.faces)
    ? tokens.typography.faces
    : [];
  if (!faces.length) return '/* no self-hosted font faces declared */';
  const Q = String.fromCharCode(34); // double quote, kept out of string literals on purpose
  const L = ['/* Self-hosted typeface set -- the original system fonts, served from /fonts. */'];
  for (const f of faces) {
    const face = [
      '@font-face {',
      '  font-family: ' + Q + f.family + Q + ';',
      '  font-style: ' + (f.style || 'normal') + ';',
      '  font-weight: ' + f.weight + ';',
      '  src: url(' + Q + f.src + Q + ') format(' + Q + 'woff2' + Q + ');',
      '}',
    ].join('\n');
    L.push(face);
  }
  return L.join('\n\n');
}

/** Minimal alias resolver (same contract as build-tokens.mjs resolveValue). */
function resolveValueLocal(node, tokens) {
  if (node === undefined || node === null) return '';
  const v = node.$value !== undefined ? node.$value : node;
  if (typeof v === 'string')
    return v.startsWith('{') ? String(resolveReferenceLocal(v.slice(1, -1), tokens)) : v;
  if (Array.isArray(v)) return v.join(', ');
  return String(v);
}

/** Resolve {a.b.c} references against the token tree. */
function resolveReferenceLocal(path, root) {
  let cur = root;
  for (const part of path.split('.')) cur = cur && cur[part];
  if (!cur) throw new Error('Unresolved reference: ' + path);
  return cur.$value !== undefined ? resolveValueLocal(cur, root) : cur;
}

export { groupEntries, hexToRgba, boxShadowCss, buildCoreTokens, buildFontFaces };
