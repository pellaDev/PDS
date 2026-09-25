import * as React from 'react';
import './radio.css';
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /** Visible text next to the control — every state in the export carries a label child. */
    label: string;
}
/**
 * Pella radio control — ported from tokens/components/radios.json (brand family).
 * Group radios by passing them a shared native `name`; no wrapper needed.
 */
declare const Radio: React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLInputElement>>;
export { Radio };
