import * as React from 'react';
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
export declare function Tooltip({ content, variant, children, ...props }: TooltipProps): React.JSX.Element;
