import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

import { cn } from '../../lib/utils';

// Tag - original composition (tokens/components/tags.json).
// States: default / error / alert / ready / disabled. Each state is a solid container fill with the sss corner radius; disabled adds opacity.disabled to the whole container.
// No hover/focus/active layers are exported for tags, so states stay flat except for that fade.
const tagVariants = cva(
  'inline-flex items-center whitespace-nowrap border-transparent font-light font-sans [border-radius:var(--radius-sm)] [padding-inline:var(--dim-sss)] [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] [letter-spacing:0.25px]',
  {
    variants: {
      variant: {
        // fill pella.sys.color.custom.light - theme-aware primary role (#204384 light / #6C8FCB dark).
        default: 'bg-primary text-primary-foreground',
        // fill pella.sys.color.red via semantic.error (#EE1F25 in both themes).
        error: 'bg-destructive text-destructive-foreground',
        // fill pella.sys.color.yellow via semantic.alert (#CFEC14), dark label per accent foreground.
        alert: 'bg-accent text-accent-foreground',
        // fill pella.sys.color.green - light #218A38 / dark #5BB86B, readable labels on both themes.
        ready: 'bg-success text-success-foreground',
        // original disabled state: same container fill as default plus opacity.disabled on the whole pill.
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
  /** When provided, renders a small close button (an X) that calls this on click. The parent owns removal. */
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

// TagToggle - self-contained preset tag with an on/off life-cycle.
// ON   = the chosen variant fill + an X; clicking the X switches it OFF (disabled look).
// OFF  = the system disabled state as a flat pill; clicking anywhere re-enables it.
// No custom text is added - it always renders its fixed label. Both states are
// interactive, so both carry hover-elevate (see C: hover only where there's an action).
export interface TagToggleProps {
  className?: string;
  variant?: VariantProps<typeof tagVariants>['variant'];
  /** Initial state. Defaults to on (preset tags start active). */
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
