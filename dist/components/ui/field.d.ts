import * as React from 'react';
import './field.css';
declare const fieldVariants: (props?: ({
    size?: "sm" | "lg" | null | undefined;
    tone?: "fill" | "outline" | null | undefined;
    state?: "default" | "error" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface FieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    size?: 'sm' | 'lg';
    tone?: 'fill' | 'outline';
    state?: 'default' | 'error';
    label: string;
    trailingIcon?: React.ReactNode;
}
declare const Field: React.ForwardRefExoticComponent<FieldProps & React.RefAttributes<HTMLInputElement>>;
export { Field, fieldVariants };
