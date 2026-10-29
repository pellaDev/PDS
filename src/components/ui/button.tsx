import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';
import { Tooltip } from './tooltip';

const DEFAULT_SIZE = 'small';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-light [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-[var(--opacity-disabled)] [&_svg]:pointer-events-none [&_svg]:shrink-0 hover-elevate active-elevate-2 [min-height:var(--pds-control-min,_var(--pds-touch-min))]',
  {
    variants: {
      size: {
        mini: 'h-6 w-6 [--pds-control-min:auto] [&_svg]:size-4',

        small: 'h-8 px-3 [&_svg]:size-4',

        large: 'h-10 px-6 [&_svg]:size-4',

        special:
          'flex-col size-[4.5rem] min-h-[4.5rem] min-w-[4.5rem] gap-1.5 overflow-hidden p-3 [&_svg]:size-5',

        icon: 'size-[var(--dim-lll)] min-h-[var(--pds-touch-min)] min-w-[var(--pds-touch-min)] [&_svg]:size-4',
      },

      variant: {
        default: 'bg-primary text-primary-foreground',

        destructive: 'bg-destructive text-black',
        link: 'no-default-hover-elevate no-default-active-elevate bg-transparent p-0 text-primary underline-offset-4 hover:underline',
      },
    },
    defaultVariants: { variant: 'default', size: DEFAULT_SIZE },
  },
);

function truncateLabel(children: React.ReactNode) {
  return React.Children.map(children, (child) =>
    typeof child === 'string' || typeof child === 'number' ? (
      <span className="max-w-full truncate">{child}</span>
    ) : (
      child
    ),
  );
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  tooltip,
  children,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;

    tooltip?: string;
  }) {
  const Comp = asChild ? Slot : 'button';

  const buttonEl = (
    <Comp
      data-slot="button"
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {size === 'special' && !asChild ? truncateLabel(children) : children}
    </Comp>
  );

  const effectiveSize = size ?? DEFAULT_SIZE;
  if (
    !asChild &&
    (effectiveSize === 'mini' || effectiveSize === 'small' || effectiveSize === 'icon')
  ) {
    const label = tooltip ?? props.title ?? props['aria-label'];
    if (label) return <Tooltip content={String(label)}>{buttonEl}</Tooltip>;
  }

  return buttonEl;
}

export { Button, buttonVariants };
