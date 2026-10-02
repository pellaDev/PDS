import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const buttonVariants: (props?: ({
    size?: "small" | "mini" | "large" | "special" | "icon" | null | undefined;
    variant?: "link" | "default" | "destructive" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare function Button({ className, variant, size, asChild, tooltip, ...props }: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    tooltip?: string;
}): React.JSX.Element;
export { Button, buttonVariants };
