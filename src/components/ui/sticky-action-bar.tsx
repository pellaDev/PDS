import * as React from 'react';

import { cn } from '../../lib/utils';
import { usePdsConfig } from '../../config';
import './sticky-action-bar.css';

function StickyActionBar({
  className,
  children,
  tone,
  side = 'bottom',
  ...props
}: React.ComponentProps<'div'> & {
  tone?: 'fill' | 'outline';

  side?: 'bottom' | 'top';
}) {
  const { fieldStyle } = usePdsConfig();
  return (
    <div
      data-slot="sticky-action-bar"
      data-tone={tone ?? fieldStyle}
      data-side={side}
      className={cn('pds-sticky-action-bar', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { StickyActionBar };
