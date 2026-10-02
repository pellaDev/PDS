import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const tagVariants: (props?: ({
    variant?: "alert" | "disabled" | "default" | "error" | "ready" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof tagVariants> {
    onDismiss?: () => void;
}
declare function Tag({ className, variant, onDismiss, children, ...props }: TagProps): React.JSX.Element;
export interface TagToggleProps {
    className?: string;
    variant?: VariantProps<typeof tagVariants>['variant'];
    defaultOn?: boolean;
    children?: React.ReactNode;
}
declare function TagToggle({ className, variant, defaultOn, children }: TagToggleProps): React.JSX.Element;
export { Tag, TagToggle, tagVariants };
