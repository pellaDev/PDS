import * as React from 'react';
import { cn } from '../../lib/utils';
import './radio.css';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Visible text next to the control — every state in the export carries a label child. */
  label: string;
}

/**
 * Pella radio control — ported from tokens/components/radios.json (brand family).
 * Group radios by passing them a shared native `name`; no wrapper needed.
 */
const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, disabled, ...props }, ref) => (
    <label className={cn('pds-radio', className)} {...(disabled ? { 'data-disabled': true } : {})}>
      <input type="radio" ref={ref} disabled={disabled} {...props} />
      <span>{label}</span>
    </label>
  ),
);

Radio.displayName = 'Radio';

export { Radio };
