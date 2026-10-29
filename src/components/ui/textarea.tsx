import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { usePdsConfig } from '../../config';
import './field.css';
import './scrollbar.css';

const textareaVariants = cva('pds-field pds-scrollbar font-light', {
  variants: {
    size: { sm: '[--field-h:var(--dim-lll)]', lg: '[--field-h:var(--dim-l)]' },
    tone: { fill: 'pds-field--fill', outline: 'pds-field--outline' },
  },
  defaultVariants: { size: 'sm' },
});

export interface TextareaProps
  extends React.ComponentPropsWithoutRef<'textarea'>,
    VariantProps<typeof textareaVariants> {
  autoGrow?: boolean;
}

function growToContent(el: HTMLTextAreaElement) {
  el.style.height = 'auto';
  el.style.height = `${el.scrollHeight}px`;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, size, tone, autoGrow = true, onInput, value, defaultValue, rows, ...props },
    ref,
  ) => {
    const { fieldStyle } = usePdsConfig();
    const innerRef = React.useRef<HTMLTextAreaElement | null>(null);
    const setRef = (node: HTMLTextAreaElement | null) => {
      innerRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    React.useEffect(() => {
      if (autoGrow && innerRef.current) growToContent(innerRef.current);
    }, [autoGrow, value, defaultValue, rows]);

    return (
      <textarea
        ref={setRef}
        {...props}
        value={value}
        defaultValue={defaultValue}
        rows={rows}
        onInput={(event) => {
          if (autoGrow) growToContent(event.currentTarget);
          onInput?.(event);
        }}
        className={cn(textareaVariants({ size, tone: tone ?? fieldStyle }), className)}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
