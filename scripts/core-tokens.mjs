// core-tokens.mjs — helper functions for build-tokens.mjs
// Generates CSS custom properties and @font-face blocks from tokens.json.

/**
 * Filter out $-prefixed metadata keys, return [key, value] pairs.
 */
export function groupEntries(obj) {
  return Object.entries(obj).filter(([k]) => !k.startsWith("$"));
}

/**
 * Convert a hex color string to rgba() CSS value.
 * Supports #RGB, #RRGGBB, #RRGGBBAA (8-digit with alpha).
 */
export function hexToRgba(hex) {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (h.length === 6) h += "ff";
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const a = Math.round((parseInt(h.slice(6, 8), 16) / 255) * 100) / 100;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/**
 * Convert a shadow token object to a CSS box-shadow value.
 * Input: { x, y, blur, spread, color, type }
 * Output: "[inset] x y [blur] [spread] rgba(...)"
 */
export function boxShadowCss(val) {
  if (typeof val === "string") return val;
  const parts = [];
  if (val.type === "inset" || val.type === "innerShadow") parts.push("inset");
  parts.push(val.x, val.y, val.blur);
  if (val.spread && val.spread !== "0rem") parts.push(val.spread);
  parts.push(hexToRgba(val.color));
  return parts.join(" ");
}

/**
 * Build the @font-face CSS blocks from tokens.typography.faces.
 */
export function buildFontFaces(tokens) {
  const faces = tokens.typography?.faces || [];
  if (!Array.isArray(faces) || faces.length === 0) return "";
  return faces
    .map(
      (f) =>
        `@font-face {
  font-family: "${f.family}";
  font-style: ${f.style};
  font-weight: ${f.weight};
  src: url("${f.src}") format("woff2");
}`,
    )
    .join("\n\n");
}

/**
 * Build the :root { ... } CSS block with core design tokens.
 * Includes typography, dimensions, spacing, border, opacity, overlays, shadows.
 */
export function buildCoreTokens(tokens) {
  const lines = [];
  lines.push(":root {");

  // Typography: base weight/letter-spacing from first style entry
  const styles = tokens.typography?.styles || {};
  const styleEntries = groupEntries(styles);
  if (styleEntries.length > 0) {
    const firstVal = styleEntries[0][1].$value;
    if (typeof firstVal === "object" && firstVal !== null) {
      lines.push(`  --font-weight-base: ${firstVal.fontWeight};`);
      lines.push(`  --letter-spacing-base: ${firstVal.letterSpacing};`);
    }
  }

  // Typography: per-style size/line-height pairs
  for (const [name, node] of styleEntries) {
    const v = node.$value;
    if (typeof v === "object" && v !== null) {
      lines.push(`  --type-${name}-size: ${v.fontSize};`);
      lines.push(`  --type-${name}-lh: ${v.lineHeight};`);
    }
  }

  // Dimensions
  const dims = tokens.dimensions || {};
  for (const [name, node] of groupEntries(dims)) {
    lines.push(`  --dim-${name}: ${node.$value};`);
  }

  // Border width
  if (tokens.border?.width?.$value) {
    lines.push(`  --border-width: ${tokens.border.width.$value};`);
  }

  // Spacing presets
  const presets = tokens.spacing?.presets || {};
  for (const [name, node] of groupEntries(presets)) {
    lines.push(`  --space-${name}: ${node.$value};`);
  }

  // Opacity
  if (tokens.opacity?.disabled?.$value != null) {
    lines.push(`  --opacity-disabled: ${tokens.opacity.disabled.$value};`);
  }

  // Overlays
  const overlay = tokens.overlay || {};
  for (const [name, node] of groupEntries(overlay)) {
    lines.push(`  --overlay-${name}: ${hexToRgba(node.$value)};`);
  }

  // Shadows
  const shadows = tokens.shadows || {};
  for (const [name, node] of groupEntries(shadows)) {
    lines.push(`  --shadow-${name}: ${boxShadowCss(node.$value)};`);
  }

  lines.push("}");
  return lines.join("\n");
}
