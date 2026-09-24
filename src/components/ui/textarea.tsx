import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { usePdsConfig } from '../../config';
import './field.css';

/**
 * Textarea — bare Pella DS field (no label), multi-line. Same tone/state system as Input;
 * height is auto with a min-height of the size scale (see field.css).
 */
const textareaVariants = cva('pds-field font-light', {
  variants: {
    size: { sm: '[--field-h:var(--dim-lll)]', lg: '[--field-h:var(--dim-l)]' },
    tone: { fill: 'pds-field--fill', outline: 'pds-field--outline' },
  },
  defaultVariants: { size: 'sm' },
});

export interface TextareaProps
  extends React.ComponentPropsWithoutRef<'textarea'>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size, tone, ...props }, ref) => {
    // No explicit tone -> the installation's field style (pds/config: "fill" | "outline").
    const { fieldStyle } = usePdsConfig();
    return (
      <textarea
        ref={ref}
        {...props}
        className={cn(textareaVariants({ size, tone: tone ?? fieldStyle }), className)}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
