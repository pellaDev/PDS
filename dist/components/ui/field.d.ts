import * as React from 'react';
import './field.css';
export interface FieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    size?: 'sm' | 'lg';
    tone?: 'fill' | 'outline';
    state?: 'default' | 'error';
    label: string;
    trailingIcon?: React.ReactNode;
}
declare const Field: React.ForwardRefExoticComponent<FieldProps & React.RefAttributes<HTMLInputElement>>;
export { Field };
