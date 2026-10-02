import { useSyncExternalStore } from 'react';
import { tokens } from './generated/tokens';

export type PdsFieldStyle = 'fill' | 'outline';
export type PdsFontId = keyof typeof tokens.fontOptions;

export interface PdsConfig {
  lightBrand: string;

  darkBrand: string;

  fieldStyle: PdsFieldStyle;

  font: PdsFontId;
}

export const PDS_DEFAULTS: Readonly<PdsConfig> = {
  lightBrand: tokens.color.light.primary.toLowerCase(),
  darkBrand: tokens.color.dark.primary.toLowerCase(),
  fieldStyle: 'fill',
  font: 'roboto',
};

export const PDS_FONT_IDS = Object.keys(tokens.fontOptions) as PdsFontId[];

export const PDS_FONTS = Object.fromEntries(
  PDS_FONT_IDS.map((id) => [id, tokens.fontOptions[id][0]]),
) as Record<PdsFontId, string>;

const STORAGE_KEY = 'pds-config';
const HEX_RE = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

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

function sanitize(partial?: Partial<PdsConfig>): Partial<PdsConfig> {
  const out: Partial<PdsConfig> = {};
  if (!partial) return out;
  if (isHex(partial.lightBrand)) out.lightBrand = partial.lightBrand.trim().toLowerCase();
  if (isHex(partial.darkBrand)) out.darkBrand = partial.darkBrand.trim().toLowerCase();
  const fs = partial.fieldStyle as string | undefined;

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
  } catch {}
}

function applyToDocument(cfg: PdsConfig) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--pds-brand-light', hexToHslTriple(cfg.lightBrand));
  root.style.setProperty('--pds-brand-dark', hexToHslTriple(cfg.darkBrand));
  root.style.setProperty('--pds-font-sans', tokens.fontOptions[cfg.font].join(', '));
}

let baseConfig: PdsConfig = { ...PDS_DEFAULTS };
let snapshot: PdsConfig = { ...baseConfig, ...loadPersisted() };

if (typeof window !== 'undefined') applyToDocument(snapshot);

export function configurePds(flags?: Partial<PdsConfig>): void {
  baseConfig = { ...PDS_DEFAULTS, ...sanitize(flags) };
  snapshot = { ...baseConfig, ...loadPersisted() };
  applyToDocument(snapshot);
}

export function setPdsConfig(partial: Partial<PdsConfig>): void {
  snapshot = { ...snapshot, ...sanitize(partial) };
  persist(snapshot);
  applyToDocument(snapshot);
  for (const listener of [...listeners]) listener();
}

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

export function usePdsConfig(): PdsConfig {
  return useSyncExternalStore(subscribe, () => snapshot);
}
