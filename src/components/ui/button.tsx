import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';
import { Tooltip } from './tooltip';

const buttonVariants = cva(
  // Typography from export pella.ref.typography.button (Roboto light, fontSize sys "1" = mmmm = 16px,
  // lineHeight 5) -- one button label type for every size, so no per-size text-* overrides.
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-light [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-[var(--opacity-disabled)] [&_svg]:pointer-events-none [&_svg]:shrink-0 hover-elevate active-elevate-2',
  {
    variants: {
      // Kept original compositions (tokens/components/buttons.json).
      size: {
        // 'mini' composition — 24×24 square icon button (min mm, icon mmmm = 16px).
        mini: 'h-6 w-6 [&_svg]:size-4',
        // 'small' composition — spacing regular (8px), labeled form.
        small: 'h-8 px-3 [&_svg]:size-4',
        // 'large' composition — 8/24 padding pair (sys.spacing.l).
        large: 'h-10 px-6 [&_svg]:size-4',
        // 'special' composition — near-square tile, icon stacked above the label.
        special: 'flex-col min-h-[4.5rem] min-w-[4.5rem] gap-1.5 p-3 [&_svg]:size-5',
        // small without label — square icon button (original min dimensions lll = 40px).
        icon: 'h-10 w-10 [&_svg]:size-4',
      },
      // The Pella system has a single brand button: this axis encodes its STATES, not
      // separate component types. 'destructive' and 'link' are states of the same
      // button, exactly like 'disabled' (the native attribute).
      variant: {
        default: 'bg-primary text-primary-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        link: 'no-default-hover-elevate no-default-active-elevate bg-transparent p-0 text-primary underline-offset-4 hover:underline',
      },
    },
    defaultVariants: { variant: 'default', size: 'small' },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  tooltip,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    /**
     * @default false
     */
    asChild?: boolean;
    /** Explicit tooltip text. Compact buttons (mini/small) always carry a PDS Tooltip; this value
        wins over the title / aria-label fallback when deriving the label. */
    tooltip?: string;
  }) {
  const Comp = asChild ? Slot : 'button';

  const buttonEl = (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );

  // Compact buttons are never used without a tooltip: nest the PDS Tooltip primitive by default
  // and derive its label from `tooltip`, falling back to title / aria-label.
  if (!asChild && (size === 'mini' || size === 'small')) {
    const label = tooltip ?? props.title ?? props['aria-label'];
    if (label) return <Tooltip content={String(label)}>{buttonEl}</Tooltip>;
  }

  return buttonEl;
}

export { Button, buttonVariants };
