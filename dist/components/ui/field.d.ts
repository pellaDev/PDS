import * as React from 'react';
import './field.css';
declare const fieldVariants: (props?: ({
    size?: "sm" | "lg" | null | undefined;
    tone?: "fill" | "outline" | null | undefined;
    state?: "default" | "error" | null | undefined;
    control?: "single" | "multiline" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface FieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onInput'> {
    size?: 'sm' | 'lg';
    tone?: 'fill' | 'outline';
    state?: 'default' | 'error';
    label: string;
    trailingIcon?: React.ReactNode;
    control?: 'single' | 'multiline';
    autoGrow?: boolean;
    rows?: number;
    onInput?: React.ReactEventHandler<HTMLElement>;
}
declare const Field: React.ForwardRefExoticComponent<FieldProps & React.RefAttributes<HTMLInputElement | HTMLTextAreaElement>>;
declare function growToContent(el: HTMLElement): void;
export { Field, fieldVariants, growToContent };
