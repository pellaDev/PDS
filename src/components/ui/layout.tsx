import * as React from 'react';

import { cn } from '../../lib/utils';
import './layout.css';

export type LayoutGap = 'sss' | 'ss' | 's' | 'm' | 'l' | 'll';

type LayoutProps = {
  gap?: LayoutGap;
  className?: string;
  children?: React.ReactNode;
};

export function Stack({ gap, className, children, ...props }: LayoutProps) {
  return (
    <div data-slot="stack" data-gap={gap} className={cn(className)} {...props}>
      {children}
    </div>
  );
}

export function Row({ gap, className, children, ...props }: LayoutProps) {
  return (
    <div data-slot="row" data-gap={gap} className={cn(className)} {...props}>
      {children}
    </div>
  );
}

export function Grid({
  columns = 3,
  gap,
  className,
  children,
  ...props
}: LayoutProps & { columns?: number }) {
  return (
    <div
      data-slot="grid"
      data-gap={gap}
      style={{ '--pds-grid-columns': columns } as React.CSSProperties}
      className={cn(className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function Panel({ gap, className, children, ...props }: LayoutProps) {
  return (
    <div data-slot="panel" data-gap={gap} className={cn(className)} {...props}>
      {children}
    </div>
  );
}
