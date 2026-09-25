import * as React from 'react';
import './switch.css';
export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    /** Optional row label rendered beside the switch (label node of the token family, body2). */
    label?: string;
}
/** Pella Toggle - tokens/components/toggles.json. Native checkbox drives every state in pure CSS; no JS state needed. */
export declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLInputElement>>;
