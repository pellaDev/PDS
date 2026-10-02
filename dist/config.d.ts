import { tokens } from './generated/tokens';
export type PdsFieldStyle = 'fill' | 'outline';
export type PdsFontId = keyof typeof tokens.fontOptions;
export interface PdsConfig {
    lightBrand: string;
    darkBrand: string;
    fieldStyle: PdsFieldStyle;
    font: PdsFontId;
}
export declare const PDS_DEFAULTS: Readonly<PdsConfig>;
export declare const PDS_FONT_IDS: PdsFontId[];
export declare const PDS_FONTS: Record<PdsFontId, string>;
export declare function hexToHslTriple(hex: string): string;
export declare function configurePds(flags?: Partial<PdsConfig>): void;
export declare function setPdsConfig(partial: Partial<PdsConfig>): void;
export declare function getPdsConfig(): PdsConfig;
export declare function usePdsConfig(): PdsConfig;
