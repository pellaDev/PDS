import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

import { cn } from '../../lib/utils';

const tagVariants = cva(
  'inline-flex items-center whitespace-nowrap border-transparent font-light font-sans [border-radius:var(--radius-sm)] [padding-inline:var(--dim-sss)] [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] [letter-spacing:0.25px]',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',

        error: 'bg-destructive text-destructive-foreground',

        alert: 'bg-accent text-accent-foreground',

        ready: 'bg-success text-success-foreground',

        disabled: 'bg-primary text-primary-foreground [opacity:var(--opacity-disabled)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  onDismiss?: () => void;
}

function Tag({ className, variant, onDismiss, children, ...props }: TagProps) {
  return (
    <span
      className={cn(tagVariants({ variant }), onDismiss && 'hover-elevate', className)}
      {...props}
    >
      {children}
      {onDismiss ? (
        <button
          type="button"
          aria-label="Remove tag"
          onClick={onDismiss}
          className="ml-1 inline-flex items-center justify-center rounded-full opacity-60 transition-opacity hover:opacity-100"
        >
          <X size={12} strokeWidth={2.5} />
        </button>
      ) : null}
    </span>
  );
}

export interface TagToggleProps {
  className?: string;
  variant?: VariantProps<typeof tagVariants>['variant'];

  defaultOn?: boolean;
  children?: React.ReactNode;
}

function TagToggle({ className, variant, defaultOn = true, children }: TagToggleProps) {
  const [on, setOn] = React.useState(defaultOn);
  if (!on) {
    return (
      <button
        type="button"
        aria-label="Enable tag"
        onClick={() => setOn(true)}
        className={cn(
          tagVariants({ variant: 'disabled' }),
          'cursor-pointer hover-elevate',
          className,
        )}
      >
        {children}
      </button>
    );
  }
  return (
    <span className={cn(tagVariants({ variant }), 'hover-elevate cursor-pointer', className)}>
      {children}
      <button
        type="button"
        aria-label="Disable tag"
        onClick={() => setOn(false)}
        className="ml-1 inline-flex items-center justify-center rounded-full opacity-60 transition-opacity hover:opacity-100"
      >
        <X size={12} strokeWidth={2.5} />
      </button>
    </span>
  );
}

export { Tag, TagToggle, tagVariants };
