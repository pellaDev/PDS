import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import './button.css';
declare const buttonVariants: (props?: ({
    size?: "small" | "mini" | "large" | "special" | null | undefined;
    shape?: "label" | "icon" | null | undefined;
    variant?: "link" | "default" | "destructive" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare function Button({ className, variant, size, shape, asChild, tooltip, children, ...props }: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    shape?: 'label' | 'icon';
    tooltip?: string;
}): React.JSX.Element;
export { Button, buttonVariants };
