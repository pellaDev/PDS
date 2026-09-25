import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * Badge - a round status marker. Exactly two shapes, both perfect circles:
 *  simple   -> a dot with no content; fixed dim-s (12px) circle. Used as a status point
 *              (e.g. overlaid on an avatar corner). Geometry is the component's own, so it
 *              always renders round regardless of context.
 *  numbered -> a single digit 0-9, or ".." when the count exceeds 9; fixed dim-mmm (20px)
 *              circle. Pass `count` to render the value automatically - anything >9 collapses to "..".
 * Fills ride the live brand tokens: default = --primary, error = --destructive, alert = --accent
 * (the brand-lighter wash), ready = --success, disabled = --primary at opacity.disabled.
 * Every badge carries the dots inset shadow (--shadow-dots) for soft inner depth on dot surfaces.
 */
declare const badgeVariants: (props?: ({
    shape?: "simple" | "numbered" | null | undefined;
    variant?: "alert" | "disabled" | "default" | "error" | "ready" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
    /** numbered shape only - renders the digit 0-9, or ".." when the value exceeds 9. */
    count?: number;
}
declare function Badge({ className, shape, variant, count, children, ...props }: BadgeProps): React.JSX.Element;
export { Badge, badgeVariants };
