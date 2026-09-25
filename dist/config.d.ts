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
export declare const PDS_DEFAULTS: Readonly<PdsConfig>;
/** Selectable typefaces in cycle order (tokens.json -> typography.fontOptions keys). */
export declare const PDS_FONT_IDS: PdsFontId[];
/** Display name of each selectable typeface (first family of its stack). */
export declare const PDS_FONTS: Record<PdsFontId, string>;
/** "#RRGGBB" (or #RGB) -> "H S% L%" — the triple shape every --*-color variable holds. */
export declare function hexToHslTriple(hex: string): string;
/**
 * Install step — declare which values this installation ships with. Optional: call it
 * without arguments for pure defaults. Call once at bootstrap; persisted user choices
 * (setPdsConfig) always sit on top of these flags.
 */
export declare function configurePds(flags?: Partial<PdsConfig>): void;
/** Live update of one or more options (e.g. from the app's themes menu). Persists + applies immediately. */
export declare function setPdsConfig(partial: Partial<PdsConfig>): void;
/** Current config (stable object identity per change — safe to memo on). */
export declare function getPdsConfig(): PdsConfig;
/** React binding — re-renders the consumer on any live config change. */
export declare function usePdsConfig(): PdsConfig;
