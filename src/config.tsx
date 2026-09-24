/**
 * PDS runtime configuration — the three options an installation of the design system
 * can set, either at install time or live from any consuming app's themes menu:
 *
 *   1. Brand colors — one per theme (lightBrand / darkBrand, hex #RRGGBB).
 *   2. Field style  — "fill" (filled graySoft container) or "outline" (surface with the
 *      brand border): applied as the DEFAULT tone of the whole field family (Field, Input,
 *      Textarea). An explicit `tone` prop always wins over the setting.
 *   3. Font         — one of the self-hosted typefaces declared in tokens.json ->
 *      typography.fontOptions (default: roboto; also: inter, spaceGrotesk).
 *
 * Usage from a consuming app:
 *
 *   import "@workspace/pds/styles.css";
 *   import { configurePds, setPdsConfig, usePdsConfig } from "@workspace/pds/config";
 *
 *   // Install step — optional, and every flag is optional. Omitted flags keep the design
 *   // system defaults (fill fields, Roboto, exported brand colors). Call once at bootstrap.
 *   configurePds({ lightBrand: "#0B5FFF", darkBrand: "#7AB8FF", font: "inter" });
 *
 *   // Live, from anywhere in the app (e.g. its themes menu):
 *   setPdsConfig({ fieldStyle: "outline" });
 *   const { font } = usePdsConfig(); // re-renders on any change
 *
 * Brand and font choices are applied as inline custom properties on <html>
 * (--pds-brand-light / --pds-brand-dark / --pds-font-sans), so every consumer of the
 * generated theme follows live, in both themes, without a reload. All values persist to
 * localStorage ("pds-config") and survive reloads; install flags act as the base layer
 * under any persisted user choice.
 */
import { useSyncExternalStore } from 'react';
import { tokens } from './generated/tokens';

export type PdsFieldStyle = 'fill' | 'outline';
export type PdsFontId = keyof typeof tokens.fontOptions;

export interface PdsConfig {
  /** Brand primary for the light theme, hex (#RRGGBB). */
  lightBrand: string;
  /** Brand primary for the dark theme, hex (#RRGGBB). */
  darkBrand: string;
  /** Default tone of the field family — the value IS the tone name ("fill" | "outline"). */
  fieldStyle: PdsFieldStyle;
  /** Active UI typeface (tokens.json -> typography.fontOptions keys). */
  font: PdsFontId;
}

/** Installation defaults — what an app gets when it installs PDS without flags. */
export const PDS_DEFAULTS: Readonly<PdsConfig> = {
  lightBrand: tokens.color.light.primary.toLowerCase(),
  darkBrand: tokens.color.dark.primary.toLowerCase(),
  fieldStyle: 'fill',
  font: 'roboto',
};

/** Selectable typefaces in cycle order (tokens.json -> typography.fontOptions keys). */
export const PDS_FONT_IDS = Object.keys(tokens.fontOptions) as PdsFontId[];

/** Display name of each selectable typeface (first family of its stack). */
export const PDS_FONTS = Object.fromEntries(
  PDS_FONT_IDS.map((id) => [id, tokens.fontOptions[id][0]]),
) as Record<PdsFontId, string>;

const STORAGE_KEY = 'pds-config';
const HEX_RE = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

/** "#RRGGBB" (or #RGB) -> "H S% L%" — the triple shape every --*-color variable holds. */
export function hexToHslTriple(hex: string): string {
  let h = hex.replace('#', '').trim();
  if (h.length === 3)
    h = h
      .split('')
      .map((c) => c + c)
      .join('');
  if (!HEX_RE.test('#' + h)) throw new Error('pds/config: expected #RGB or #RRGGBB, got ' + hex);
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return `0 0% ${(l * 100).toFixed(1)}%`;
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let hue: number;
  if (max === r) hue = ((g - b) / d + (g < b ? 6 : 0)) * 60;
  else if (max === g) hue = ((b - r) / d + 2) * 60;
  else hue = ((r - g) / d + 4) * 60;
  return `${hue.toFixed(1)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%`;
}

function isHex(value: unknown): value is string {
  return typeof value === 'string' && HEX_RE.test(value.trim());
}
function isFontId(value: unknown): value is PdsFontId {
  return typeof value === 'string' && (PDS_FONT_IDS as string[]).includes(value);
}

/** Keep only the known, valid keys of a partial config (drops undefined/invalid values). */
function sanitize(partial?: Partial<PdsConfig>): Partial<PdsConfig> {
  const out: Partial<PdsConfig> = {};
  if (!partial) return out;
  if (isHex(partial.lightBrand)) out.lightBrand = partial.lightBrand.trim().toLowerCase();
  if (isHex(partial.darkBrand)) out.darkBrand = partial.darkBrand.trim().toLowerCase();
  const fs = partial.fieldStyle as string | undefined;
  // "fill"/"outline" are the current values; "flat"/"bordered" are the pre-rename names, migrated.
  if (fs === 'fill' || fs === 'outline') out.fieldStyle = fs;
  else if (fs === 'flat') out.fieldStyle = 'fill';
  else if (fs === 'bordered') out.fieldStyle = 'outline';
  if (isFontId(partial.font)) out.font = partial.font;
  return out;
}

function loadPersisted(): Partial<PdsConfig> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return sanitize(JSON.parse(raw) as Partial<PdsConfig>);
  } catch {
    return {};
  }
}

function persist(cfg: PdsConfig) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
  } catch {
    /* storage unavailable (private mode) — config still applies for this session */
  }
}

/** Push the config onto <html> as inline custom properties (the live theme seam). */
function applyToDocument(cfg: PdsConfig) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--pds-brand-light', hexToHslTriple(cfg.lightBrand));
  root.style.setProperty('--pds-brand-dark', hexToHslTriple(cfg.darkBrand));
  root.style.setProperty('--pds-font-sans', tokens.fontOptions[cfg.font].join(', '));
}

let baseConfig: PdsConfig = { ...PDS_DEFAULTS };
let snapshot: PdsConfig = { ...baseConfig, ...loadPersisted() };

// Restore persisted choices before first paint — the inline <html> vars win over the
// stylesheet defaults, so a reload comes back exactly as the user left it.
if (typeof window !== 'undefined') applyToDocument(snapshot);

/**
 * Install step — declare which values this installation ships with. Optional: call it
 * without arguments for pure defaults. Call once at bootstrap; persisted user choices
 * (setPdsConfig) always sit on top of these flags.
 */
export function configurePds(flags?: Partial<PdsConfig>): void {
  baseConfig = { ...PDS_DEFAULTS, ...sanitize(flags) };
  snapshot = { ...baseConfig, ...loadPersisted() };
  applyToDocument(snapshot);
}

/** Live update of one or more options (e.g. from the app's themes menu). Persists + applies immediately. */
export function setPdsConfig(partial: Partial<PdsConfig>): void {
  snapshot = { ...snapshot, ...sanitize(partial) };
  persist(snapshot);
  applyToDocument(snapshot);
  for (const listener of [...listeners]) listener();
}

/** Current config (stable object identity per change — safe to memo on). */
export function getPdsConfig(): PdsConfig {
  return snapshot;
}

const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** React binding — re-renders the consumer on any live config change. */
export function usePdsConfig(): PdsConfig {
  return useSyncExternalStore(subscribe, () => snapshot);
}
