import * as React from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '../../lib/utils';
import { usePdsConfig } from '../../config';
import './field.css';

const fieldVariants = cva('pds-field font-sans font-light', {
  variants: {
    size: { sm: '[--field-h:var(--dim-lll)]', lg: '[--field-h:var(--dim-l)]' },
    tone: { fill: 'pds-field--fill', outline: 'pds-field--outline' },
    state: { default: '', error: 'pds-field--error' },
  },
});

export interface FieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'lg';
  tone?: 'fill' | 'outline';
  state?: 'default' | 'error';
  label: string;
  trailingIcon?: React.ReactNode;
}

const Field = React.forwardRef<HTMLInputElement, FieldProps>(function Field(
  { className, size = 'sm', tone, state = 'default', label, trailingIcon, disabled, ...props },
  ref,
) {
  const { fieldStyle } = usePdsConfig();
  return (
    <label
      {...(disabled ? { 'data-disabled': true } : {})}
      {...(trailingIcon ? { 'data-has-icon': true } : {})}
      className={cn(fieldVariants({ size, tone: tone ?? fieldStyle, state }), className)}
    >
      {}
      <input
        ref={ref}
        placeholder=" "
        disabled={disabled}
        {...props}
        className="pds-field__input"
      />
      {trailingIcon ? (
        <span className="pds-field__icon" aria-hidden>
          {trailingIcon}
        </span>
      ) : null}
      <span className="pds-field__label">{label}</span>
    </label>
  );
});

export { Field };
