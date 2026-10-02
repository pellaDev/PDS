import * as React from 'react';
import './switch.css';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, disabled, ...props },
  ref,
) {
  return (
    <label style={{ display: 'inline-flex' }}>
      <span className="pds-toggle" data-disabled={disabled || undefined}>
        <input ref={ref} type="checkbox" disabled={disabled} {...props} />
        <span className="pds-toggle__switch" aria-hidden>
          <span className="pds-toggle__thumb" />
        </span>
        {label ? (
          <span style={{ display: 'inline-flex', alignItems: 'center' }}>{label}</span>
        ) : null}
      </span>
    </label>
  );
});

Switch.displayName = 'Pella Switch';
