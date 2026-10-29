import * as React from 'react';

import { cn } from '../../lib/utils';
import './sticky-action-bar.css';

function StickyActionBar({ className, children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sticky-action-bar"
      className={cn('pds-sticky-action-bar', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { StickyActionBar };
