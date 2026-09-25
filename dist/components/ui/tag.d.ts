import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const tagVariants: (props?: ({
    variant?: "alert" | "disabled" | "default" | "error" | "ready" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof tagVariants> {
    /** When provided, renders a small close button (an X) that calls this on click. The parent owns removal. */
    onDismiss?: () => void;
}
declare function Tag({ className, variant, onDismiss, children, ...props }: TagProps): React.JSX.Element;
export interface TagToggleProps {
    className?: string;
    variant?: VariantProps<typeof tagVariants>['variant'];
    /** Initial state. Defaults to on (preset tags start active). */
    defaultOn?: boolean;
    children?: React.ReactNode;
}
declare function TagToggle({ className, variant, defaultOn, children }: TagToggleProps): React.JSX.Element;
export { Tag, TagToggle, tagVariants };
