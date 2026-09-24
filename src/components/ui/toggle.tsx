import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';
import './toggle.css';

/**
 * Pella Toggle - Radix toggle button. No composition export exists for this control
 * (tokens/components/toggles.json covers only the switch), so state colors are documented
 * assumptions on the DS canon in ./toggle.css next to this file; typography follows
 * pella.ref.typography.button = Roboto 300 @ mmmm (16px). Sizes ride the dimension scale:
 * llll 32 / lll 40 ("button minimums" per coreDimensions) / ll 48.
 */
const toggleVariants = cva(
  'pds-toggle-btn inline-flex items-center justify-center gap-2 rounded-md transition-colors hover-elevate active-elevate-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'pds-toggle-btn--ghost',
      },
      size: {
        sm: 'h-8 min-w-8 px-2', // --dim-llll (32px)
        default: 'h-10 min-w-10 px-2', // --dim-lll (40px, "button minimums")
        lg: 'h-12 min-w-12 px-3', // --dim-ll (48px)
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size }), className)}
    {...props}
  />
));
Toggle.displayName = 'Toggle';

export { Toggle, toggleVariants };
