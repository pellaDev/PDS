import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import './field.css';
declare const textareaVariants: (props?: ({
    size?: "sm" | "lg" | null | undefined;
    tone?: "fill" | "outline" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface TextareaProps extends React.ComponentPropsWithoutRef<'textarea'>, VariantProps<typeof textareaVariants> {
}
declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
export { Textarea };
