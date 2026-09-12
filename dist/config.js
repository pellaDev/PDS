import { useSyncExternalStore } from "react";
import { tokens } from "./generated/tokens";
const PDS_DEFAULTS = {
  lightBrand: tokens.color.light.primary.toLowerCase(),
  darkBrand: tokens.color.dark.primary.toLowerCase(),
  fieldStyle: "fill",
  font: "roboto"
};
const PDS_FONT_IDS = Object.keys(tokens.fontOptions);
const PDS_FONTS = Object.fromEntries(
  PDS_FONT_IDS.map((id) => [id, tokens.fontOptions[id][0]])
);
const STORAGE_KEY = "pds-config";
const HEX_RE = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
function hexToHslTriple(hex) {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (!HEX_RE.test("#" + h)) throw new Error("pds/config: expected #RGB or #RRGGBB, got " + hex);
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return `0 0% ${(l * 100).toFixed(1)}%`;
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let hue;
  if (max === r) hue = ((g - b) / d + (g < b ? 6 : 0)) * 60;
  else if (max === g) hue = ((b - r) / d + 2) * 60;
  else hue = ((r - g) / d + 4) * 60;
  return `${hue.toFixed(1)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%`;
}
function isHex(value) {
  return typeof value === "string" && HEX_RE.test(value.trim());
}
function isFontId(value) {
  return typeof value === "string" && PDS_FONT_IDS.includes(value);
}
function sanitize(partial) {
  const out = {};
  if (!partial) return out;
  if (isHex(partial.lightBrand)) out.lightBrand = partial.lightBrand.trim().toLowerCase();
  if (isHex(partial.darkBrand)) out.darkBrand = partial.darkBrand.trim().toLowerCase();
  const fs = partial.fieldStyle;
  if (fs === "fill" || fs === "outline") out.fieldStyle = fs;
  else if (fs === "flat") out.fieldStyle = "fill";
  else if (fs === "bordered") out.fieldStyle = "outline";
  if (isFontId(partial.font)) out.font = partial.font;
  return out;
}
function loadPersisted() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return sanitize(JSON.parse(raw));
  } catch {
    return {};
  }
}
function persist(cfg) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
  } catch {
  }
}
function applyToDocument(cfg) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.style.setProperty("--pds-brand-light", hexToHslTriple(cfg.lightBrand));
  root.style.setProperty("--pds-brand-dark", hexToHslTriple(cfg.darkBrand));
  root.style.setProperty("--pds-font-sans", tokens.fontOptions[cfg.font].join(", "));
}
let baseConfig = { ...PDS_DEFAULTS };
let snapshot = { ...baseConfig, ...loadPersisted() };
if (typeof window !== "undefined") applyToDocument(snapshot);
function configurePds(flags) {
  baseConfig = { ...PDS_DEFAULTS, ...sanitize(flags) };
  snapshot = { ...baseConfig, ...loadPersisted() };
  applyToDocument(snapshot);
}
function setPdsConfig(partial) {
  snapshot = { ...snapshot, ...sanitize(partial) };
  persist(snapshot);
  applyToDocument(snapshot);
  for (const listener of [...listeners]) listener();
}
function getPdsConfig() {
  return snapshot;
}
const listeners = /* @__PURE__ */ new Set();
function subscribe(listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
function usePdsConfig() {
  return useSyncExternalStore(subscribe, () => snapshot);
}
export {
  PDS_DEFAULTS,
  PDS_FONTS,
  PDS_FONT_IDS,
  configurePds,
  getPdsConfig,
  hexToHslTriple,
  setPdsConfig,
  usePdsConfig
};
