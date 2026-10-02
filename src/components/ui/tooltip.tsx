import * as React from 'react';
import { createPortal } from 'react-dom';

import './tooltip.css';

export type TooltipVariant = 'default' | 'alert' | 'error';

export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  content: string;

  variant?: TooltipVariant;
}

export function Tooltip({ content, variant = 'default', children, ...props }: TooltipProps) {
  const [anchor, setAnchor] = React.useState<DOMRect | null>(null);

  const show = (element: Element) => setAnchor(element.getBoundingClientRect());
  const hide = () => setAnchor(null);

  React.useEffect(() => {
    if (!anchor) return;
    const onInvalidate = () => setAnchor(null);
    window.addEventListener('scroll', onInvalidate, true);
    window.addEventListener('resize', onInvalidate);
    return () => {
      window.removeEventListener('scroll', onInvalidate, true);
      window.removeEventListener('resize', onInvalidate);
    };
  }, [anchor]);

  const bottom = anchor
    ? 'calc(' + (window.innerHeight - anchor.top) + 'px + var(--dim-sss))'
    : undefined;

  return (
    <span
      className="pds-tooltip"
      onMouseEnter={(event) => show(event.currentTarget)}
      onMouseLeave={hide}
      onFocus={(event) => {
        const target = event.target as Element;
        if (target !== event.currentTarget) show(target);
      }}
      onBlur={hide}
      {...props}
    >
      {children}
      {anchor &&
        typeof document !== 'undefined' &&
        createPortal(
          <span
            role="tooltip"
            className="pds-tooltip__bubble"
            data-variant={variant}
            style={{ left: anchor.left + anchor.width / 2, bottom }}
          >
            {content}
          </span>,
          document.body,
        )}
    </span>
  );
}
