'use client';

import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';
import './avatar.css';

const avatarVariants = cva('pds-avatar relative flex shrink-0 overflow-hidden bg-surface-canvas', {
  variants: {
    size: {
      xs: '[--avatar-size:var(--dim-mmm)] [font-size:var(--type-caption-size)]',

      default: '[--avatar-size:var(--dim-lll)] [font-size:var(--type-body2-size)]',
    },
    shape: {
      circle: 'rounded-full',

      roundedSquare: 'rounded-[var(--radius-md)]',
    },
    interactive: {
      static: '',

      interactive:
        'cursor-pointer hover-elevate active-elevate-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-[var(--opacity-disabled)]',
    },
    state: {
      default: '',

      error: '[color:var(--color-destructive-foreground)]',

      loading: '',
    },
  },
  defaultVariants: { size: 'default', shape: 'circle', interactive: 'static' },
});

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & VariantProps<typeof avatarVariants>
>(({ className, size, shape, interactive, state, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    data-slot="avatar"
    data-size={size}
    data-shape={shape}
    data-interactive={interactive === 'interactive' ? true : undefined}
    data-state={state}
    {...(interactive === 'interactive' ? { role: 'button', tabIndex: 0 } : {})}
    className={cn(avatarVariants({ size, shape, interactive, state, className }))}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full [border-radius:inherit]', className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center [border-radius:inherit]',
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
