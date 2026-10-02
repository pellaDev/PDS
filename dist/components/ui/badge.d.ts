import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const badgeVariants: (props?: ({
    shape?: "simple" | "numbered" | null | undefined;
    variant?: "alert" | "disabled" | "default" | "error" | "ready" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
    count?: number;
}
declare function Badge({ className, shape, variant, count, children, ...props }: BadgeProps): React.JSX.Element;
export { Badge, badgeVariants };
