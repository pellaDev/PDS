import * as React from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '../../lib/utils';
import { usePdsConfig } from '../../config';
import './field.css';

const fieldVariants = cva('pds-field font-sans font-light', {
  variants: {
    size: {
      sm: '[--field-h:var(--dim-lll)] [--pds-field-label-top:var(--dim-ssss)]',
      lg: '[--field-h:var(--dim-l)] [--pds-field-label-top:var(--dim-sss)]',
    },
    tone: { fill: 'pds-field--fill', outline: 'pds-field--outline' },
    state: { default: '', error: 'pds-field--error' },
    control: { single: '', multiline: 'pds-field--multiline pds-scrollbar' },
  },
});

export interface FieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onInput'> {
  size?: 'sm' | 'lg';
  tone?: 'fill' | 'outline';
  state?: 'default' | 'error';
  label: string;
  trailingIcon?: React.ReactNode;

  control?: 'single' | 'multiline';

  autoGrow?: boolean;
  rows?: number;

  onInput?: React.ReactEventHandler<HTMLElement>;
}

const Field = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, FieldProps>(function Field(
  {
    className,
    size = 'sm',
    tone,
    state = 'default',
    control = 'single',
    autoGrow = true,
    label,
    trailingIcon,
    disabled,
    rows,
    value,
    defaultValue,
    onInput,
    ...props
  },
  ref,
) {
  const { fieldStyle } = usePdsConfig();

  const innerRef = React.useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const setRef = (node: HTMLInputElement | HTMLTextAreaElement | null) => {
    innerRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  React.useEffect(() => {
    if (control === 'multiline' && autoGrow && innerRef.current) growToContent(innerRef.current);
  }, [control, autoGrow, value, defaultValue, rows]);

  return (
    <label
      {...(disabled ? { 'data-disabled': true } : {})}
      {...(trailingIcon ? { 'data-has-icon': true } : {})}
      {...(control === 'multiline' ? { 'data-auto-grow': autoGrow } : {})}
      className={cn(fieldVariants({ size, tone: tone ?? fieldStyle, state, control }), className)}
    >
      {}
      {control === 'multiline' ? (
        <textarea
          ref={setRef}
          placeholder=" "
          rows={rows}
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          onInput={(event) => {
            if (autoGrow) growToContent(event.currentTarget);
            onInput?.(event);
          }}
          className="pds-field__input"
        />
      ) : (
        <input
          ref={setRef}
          placeholder=" "
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          onInput={onInput}
          {...props}
          className="pds-field__input"
        />
      )}
      {trailingIcon ? (
        <span className="pds-field__icon" aria-hidden>
          {trailingIcon}
        </span>
      ) : null}
      <span className="pds-field__label">{label}</span>
    </label>
  );
});

function growToContent(el: HTMLElement) {
  el.style.height = 'auto';
  el.style.height = `${el.scrollHeight}px`;
}

export { Field, fieldVariants, growToContent };
