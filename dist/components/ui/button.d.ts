import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const buttonVariants: (props?: ({
    size?: "small" | "mini" | "large" | "special" | "icon" | null | undefined;
    variant?: "link" | "default" | "destructive" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare function Button({ className, variant, size, asChild, tooltip, ...props }: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & {
    /**
     * @default false
     */
    asChild?: boolean;
    /** Explicit tooltip text. Compact buttons (mini/small) always carry a PDS Tooltip; this value
        wins over the title / aria-label fallback when deriving the label. */
    tooltip?: string;
}): React.JSX.Element;
export { Button, buttonVariants };
