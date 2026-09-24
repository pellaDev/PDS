import * as React from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '../../lib/utils';
import { usePdsConfig } from '../../config';
import './field.css';

/**
 * Field - floating-label text input. Source of truth for values: tokens/components/fields.json
 * (four composition families x six states) + themes/light.json resolved colors; the per-line
 * token mapping lives in field.css next to this file.
 *
 *   tone "fill"    -> pella.comp.field.{small,large}.brand        graySoft container, no default border;
 *                     the label sits INSIDE the box above the input (body2; it never moves, it
 *                     fades out while focused/filled)
 *   tone "outline" -> pella.comp.field.{smallBorder,largeBorder}  surface container, brand border always on;
 *                     label at rest body2 inside the box, caption (body2 x fontScale 0.66 via
 *                     comp.typography.fieldSmallLabel) only while focused/filled, as a chip on the border
 * State outlines are computed at runtime from the live --primary with the canonical +32%/-32% wash;
 * disabled rides sys.opacity.disabled (0.32) with its own container/onContainer pair per tone.
 */
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
  // No explicit tone -> the installation's field style (pds/config: "fill" | "outline").
  const { fieldStyle } = usePdsConfig();
  return (
    <label
      {...(disabled ? { 'data-disabled': true } : {})}
      {...(trailingIcon ? { 'data-has-icon': true } : {})}
      className={cn(fieldVariants({ size, tone: tone ?? fieldStyle, state }), className)}
    >
      {/* default placeholder=" " drives the pure-CSS float via :placeholder-shown; a user-supplied
          placeholder overrides it and may visually collide with the floated label */}
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
