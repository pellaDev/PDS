import * as React from 'react';
import './checkbox.css';
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /** Visible text next to the control — every state in the export carries a label child. */
    label: string;
}
/**
 * Pella checkbox control — ported from tokens/components/checkboxes.json (brand family).
 * The check glyph is inline SVG colored graySoft per icon.onContainer in the export.
 */
declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>>;
export { Checkbox };
