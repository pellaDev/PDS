import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import './field.css';
declare const inputVariants: (props?: ({
    size?: "sm" | "lg" | null | undefined;
    tone?: "fill" | "outline" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface InputProps extends Omit<React.ComponentPropsWithoutRef<'input'>, 'size'>, VariantProps<typeof inputVariants> {
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
export { Input };
