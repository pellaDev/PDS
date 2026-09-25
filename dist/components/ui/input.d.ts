import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import './field.css';
/**
 * Input — bare Pella DS field (no label). Same tone/state system as Field (see field.tsx):
 * the <input> IS the .pds-field container, so all tone/state geometry lives in field.css.
 * Source of truth: tokens/components/fields.json — "fill" = pella.comp.field.{small,large}.brand,
 * "outline" = {smallBorder,largeBorder}; size sm/lg map to small/large (40/56px).
 */
declare const inputVariants: (props?: ({
    size?: "sm" | "lg" | null | undefined;
    tone?: "fill" | "outline" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface InputProps extends Omit<React.ComponentPropsWithoutRef<'input'>, 'size'>, VariantProps<typeof inputVariants> {
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
export { Input };
