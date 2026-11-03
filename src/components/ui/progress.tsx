'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';
import './progress.css';

const progressVariants = cva(
  'pds-progress relative w-full overflow-hidden rounded-full [background-color:var(--state-track-idle)]',
  {
    variants: {
      size: {
        default: '[height:var(--dim-ss)]',

        thick: '[height:var(--dim-llll)]',
      },

      color: {
        default: '',
        dynamic: '',
      },
      direction: {
        ascending: '',
        descending: '',
      },
    },
    defaultVariants: { size: 'default', color: 'default', direction: 'ascending' },
  },
);

const labelSegmentThreshold = 50;

const bandCount = 3;
const bandOfValue = (value: number) =>
  Math.min(bandCount, Math.floor(value / (100 / bandCount)) + 1);

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> &
    VariantProps<typeof progressVariants> & {
      loading?: boolean;

      color?: 'default' | 'dynamic';

      direction?: 'ascending' | 'descending';

      label?: React.ReactNode;
    }
>(({ className, value, size, loading, label, color, direction, ...props }, ref) => {
  const showsLabel = size === 'thick' && !loading && value != null;
  const segment = (value ?? 0) >= labelSegmentThreshold ? 'fill' : 'track';
  const band = color === 'dynamic' && value != null ? bandOfValue(value) : undefined;
  return (
    <ProgressPrimitive.Root
      ref={ref}
      data-slot="progress"
      data-size={size}
      data-color={color}
      data-direction={direction}
      data-band={band}
      data-segment={showsLabel ? segment : undefined}
      data-loading={loading ? true : undefined}
      {...(loading ? { 'aria-busy': true } : {})}
      className={cn(progressVariants({ size, color, direction, className }))}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full w-full flex-1 [background-color:var(--pds-progress-band-color,var(--color-primary))]"
        style={loading ? undefined : { transform: `translateX(-${100 - (value || 0)}%)` }}
      />
      {showsLabel ? <span data-slot="progress-label">{label ?? `${value}%`}</span> : null}
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
