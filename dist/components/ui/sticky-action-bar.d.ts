import * as React from 'react';
import './sticky-action-bar.css';
declare function StickyActionBar({ className, children, tone, side, ...props }: React.ComponentProps<'div'> & {
    tone?: 'fill' | 'outline';
    side?: 'bottom' | 'top';
}): React.JSX.Element;
export { StickyActionBar };
