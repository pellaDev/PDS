import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';

/**
 * Badge - a round status marker. Exactly two shapes, both perfect circles:
 *  simple   -> a dot with no content; fixed dim-s (12px) circle. Used as a status point
 *              (e.g. overlaid on an avatar corner). Geometry is the component's own, so it
 *              always renders round regardless of context.
 *  numbered -> a single digit 0-9, or ".." when the count exceeds 9; fixed dim-mmm (20px)
 *              circle. Pass `count` to render the value automatically - anything >9 collapses to "..".
 * Fills ride the live brand tokens: default = --primary, error = --destructive, alert = --accent
 * (the brand-lighter wash), ready = --success, disabled = --primary at opacity.disabled.
 * Every badge carries the dots inset shadow (--shadow-dots) for soft inner depth on dot surfaces.
 */
const badgeVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap border-transparent font-light font-sans rounded-full [box-shadow:var(--shadow-dots)] hover-elevate ',
  {
    variants: {
      shape: {
        simple: '[width:var(--dim-s)] [height:var(--dim-s)]', // s = 12px dot, always round
        numbered:
          '[width:var(--dim-mmm)] [height:var(--dim-mmm)]' + // mmm = 20px circle, always round
          ' [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] [letter-spacing:0.25px]',
      },
      variant: {
        default: 'bg-primary', // custom.light -> live --primary
        error: 'bg-destructive', // sys.color.red, fixed both themes
        alert: 'bg-accent', // the brand-lighter highlight wash
        ready: 'bg-success', // sys.color.green via success role
        disabled: 'bg-primary [opacity:var(--opacity-disabled)]',
      },
    },
    compoundVariants: [
      { shape: 'numbered', variant: 'default', className: 'text-primary-foreground' },
      { shape: 'numbered', variant: 'error', className: 'text-destructive-foreground' },
      { shape: 'numbered', variant: 'alert', className: 'text-accent-foreground' },
      { shape: 'numbered', variant: 'ready', className: 'text-success-foreground' },
      { shape: 'numbered', variant: 'disabled', className: 'text-primary-foreground' },
    ],
    defaultVariants: {
      shape: 'simple',
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /** numbered shape only - renders the digit 0-9, or ".." when the value exceeds 9. */
  count?: number;
}

function Badge({ className, shape, variant, count, children, ...props }: BadgeProps) {
  const content =
    shape === 'numbered' && typeof count === 'number'
      ? count > 9
        ? '..'
        : String(count)
      : children;
  return (
    <div className={cn(badgeVariants({ shape, variant }), className)} {...props}>
      {content}
    </div>
  );
}

export { Badge, badgeVariants };
