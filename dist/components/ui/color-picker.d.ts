export interface ColorPickerProps {
    value: string;
    onChange?: (hex: string) => void;
    label?: string;
    checks?: boolean;
    checkAgainst?: readonly string[];
    minContrast?: number;
    resetValue?: string;
}
export declare function ColorPicker({ value, onChange, label, checks, checkAgainst, minContrast, resetValue, }: ColorPickerProps): import("react").JSX.Element;
