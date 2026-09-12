import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { groupEntries, hexToRgba, boxShadowCss, buildCoreTokens, buildFontFaces } from "./core-tokens.mjs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const tokensPath = join(root, "tokens.json");
const templatePath = join(here, "theme-template.css");
const cssOut = join(root, "src", "index.css");
const tsOutDir = join(root, "src", "generated");
const indexHtmlPath = join(root, "index.html");
const faviconOut = join(root, "public", "favicon.svg");

function resolveValue(node, tokens) {
  const raw = node?.$value;
  if (typeof raw === "string" && raw.startsWith("{") && raw.endsWith("}")) {
    const path = raw.slice(1, -1).split(".");
    let cur = tokens;
    for (const key of path) cur = cur?.[key];
    return resolveValue(cur, tokens);
  }
  return raw;
}

function hexToHslChannels(hex) {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let s = 0;
  let hue = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        hue = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        hue = (b - r) / d + 2;
        break;
      default:
        hue = (r - g) / d + 4;
    }
    hue /= 6;
  }
  const H = Math.round(hue * 360);
  const S = Math.round(s * 1000) / 10;
  const L = Math.round(l * 1000) / 10;
  return `${H} ${S}% ${L}%`;
}

function toFontStack(value) {
  return Array.isArray(value) ? value.join(", ") : value;
}

function buildFavicon() {
  const logo = readFileSync(join(root, "src", "preview", "assets", "logo.svg"), "utf8");
  return logo;
}

function colorEntries(scope, tokens) {
  const out = {};
  for (const [name, node] of Object.entries(tokens.color[scope])) {
    if (name.startsWith("$")) continue;
    out[name] = resolveValue(node, tokens);
  }
  return out;
}

function buildCss(tokens) {
  let css = readFileSync(templatePath, "utf8");
  const replacements = {};

  for (const scope of ["light", "dark"]) {
    for (const [name, hex] of Object.entries(colorEntries(scope, tokens))) {
      replacements[`__DS_${scope.toUpperCase()}_${name.toUpperCase()}__`] =
        hexToHslChannels(hex);
    }
  }

  replacements.__DS_FONT_SANS__ = toFontStack(
    resolveValue(tokens.typography.fontFamily.sans, tokens),
  );
  replacements.__DS_FONT_SERIF__ = toFontStack(
    resolveValue(tokens.typography.fontFamily.serif, tokens),
  );
  replacements.__DS_FONT_MONO__ = toFontStack(
    resolveValue(tokens.typography.fontFamily.mono, tokens),
  );
  replacements.__DS_RADIUS__ = resolveValue(tokens.radius.base, tokens);
  replacements.__DS_RADIUS_SM__ = resolveValue(tokens.radius.sm, tokens);
  replacements.__DS_RADIUS_MD__ = resolveValue(tokens.radius.md, tokens);
  replacements.__DS_SPACING__ = resolveValue(tokens.spacing.base, tokens);
  replacements.__DS_CORE_TOKENS__ = buildCoreTokens(tokens);
  replacements.__DS_FONT_FACES__ = buildFontFaces(tokens);

  for (const [token, value] of Object.entries(replacements)) {
    css = css.split(token).join(value);
  }

  const leftover = css.match(/__DS_[A-Z0-9_]+__/g);
  if (leftover) {
    throw new Error(
      `tokens.json is missing values for: ${[...new Set(leftover)].join(", ")}`,
    );
  }
  return css;
}

function buildTs(tokens) {
  const portable = {
    color: {
      light: colorEntries("light", tokens),
      dark: colorEntries("dark", tokens),
    },
    fontFamily: {
      sans: resolveValue(tokens.typography.fontFamily.sans, tokens),
      serif: resolveValue(tokens.typography.fontFamily.serif, tokens),
      mono: resolveValue(tokens.typography.fontFamily.mono, tokens),
    },
    fontOptions: Object.fromEntries(
      groupEntries(tokens.typography.fontOptions || {}).map(([name, node]) => [name, resolveValue(node, tokens)]),
    ),
    radius: resolveValue(tokens.radius.base, tokens),
    radiusSm: resolveValue(tokens.radius.sm, tokens),
    radiusMd: resolveValue(tokens.radius.md, tokens),
    spacing: resolveValue(tokens.spacing.base, tokens),
    typographyStyles: Object.fromEntries(groupEntries(tokens.typography.styles).map(([name, node]) => [name, resolveValue(node, tokens)])),
    fontSizes: Object.fromEntries(groupEntries(tokens.typography.fontSizes || {}).map(([name, node]) => [name, resolveValue(node, tokens)])),
    lineHeights: Object.fromEntries(groupEntries(tokens.typography.lineHeights || {}).map(([name, node]) => [name, resolveValue(node, tokens)])),
    dimensions: Object.fromEntries(groupEntries(tokens.dimensions).map(([name, node]) => [name, resolveValue(node, tokens)])),
    spacingPresets: Object.fromEntries(groupEntries(tokens.spacing.presets || {}).map(([name, node]) => [name, resolveValue(node, tokens)])),
    borderWidth: resolveValue(tokens.border.width, tokens),
    opacityDisabled: resolveValue(tokens.opacity.disabled, tokens),
    overlays: {
      lighter: hexToRgba(resolveValue(tokens.overlay.lighter, tokens)),
      darker: hexToRgba(resolveValue(tokens.overlay.darker, tokens)),
    scrim: hexToRgba(resolveValue(tokens.overlay.scrim, tokens)),
    },
    shadows: Object.fromEntries(groupEntries(tokens.shadows).map(([name, node]) => [name, boxShadowCss(node.$value)])),
  };
  return `

export const tokens = ${JSON.stringify(portable, null, 2)} as const;

export type Tokens = typeof tokens;
export default tokens;
`;
}

export function buildTokens() {
  const tokens = JSON.parse(readFileSync(tokensPath, "utf8"));
  writeFileSync(cssOut, buildCss(tokens));
  mkdirSync(tsOutDir, { recursive: true });
  writeFileSync(join(tsOutDir, "tokens.tsx"), buildTs(tokens));
  mkdirSync(dirname(faviconOut), { recursive: true });
  writeFileSync(faviconOut, buildFavicon(tokens));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  buildTokens();
  process.stdout.write(
    "Generated src/index.css, src/generated/tokens.tsx, and public/favicon.svg\n",
  );
}
