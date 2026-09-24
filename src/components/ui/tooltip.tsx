import * as React from 'react';
import { createPortal } from 'react-dom';

import './tooltip.css';

export type TooltipVariant = 'default' | 'alert' | 'error';

export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Text shown in the bubble. */
  content: string;
  /** Brand (default), alert or error fill — see tooltip.css for the token mapping. */
  variant?: TooltipVariant;
}

/** Pella Tooltip — portal-based primitive.
 *
 * The trigger wrapper stays inline where the consumer places it; the bubble is rendered into
 * document.body through a portal with position:fixed and the app topmost z-index, so it is never
 * clipped by an ancestor overflow nor buried under another surface's stacking context (dual-surface
 * sections, sticky chrome, sheets, menus). Every component that wraps its trigger in <Tooltip>
 * inherits this behavior — no per-consumer override exists or is needed.
 *
 * Show/hide is JS-driven (mouseenter/leave + focus/blur on the wrapper); position comes from the
 * trigger bounding rect at show time, invalidated on scroll/resize where fixed coordinates go stale. */
export function Tooltip({ content, variant = 'default', children, ...props }: TooltipProps) {
  const [anchor, setAnchor] = React.useState<DOMRect | null>(null);

  const show = (element: Element) => setAnchor(element.getBoundingClientRect());
  const hide = () => setAnchor(null);

  // Fixed coordinates are only valid for the current viewport/scroll state.
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
