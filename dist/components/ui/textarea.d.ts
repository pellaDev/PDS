import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import './field.css';
/**
 * Textarea — bare Pella DS field (no label), multi-line. Same tone/state system as Input;
 * height is auto with a min-height of the size scale (see field.css).
 */
declare const textareaVariants: (props?: ({
    size?: "sm" | "lg" | null | undefined;
    tone?: "fill" | "outline" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface TextareaProps extends React.ComponentPropsWithoutRef<'textarea'>, VariantProps<typeof textareaVariants> {
}
declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
export { Textarea };
