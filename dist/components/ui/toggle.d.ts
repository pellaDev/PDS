import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { type VariantProps } from 'class-variance-authority';
import './toggle.css';
/**
 * Pella Toggle - Radix toggle button. No composition export exists for this control
 * (tokens/components/toggles.json covers only the switch), so state colors are documented
 * assumptions on the DS canon in ./toggle.css next to this file; typography follows
 * pella.ref.typography.button = Roboto 300 @ mmmm (16px). Sizes ride the dimension scale:
 * llll 32 / lll 40 ("button minimums" per coreDimensions) / ll 48.
 */
declare const toggleVariants: (props?: ({
    variant?: "default" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const Toggle: React.ForwardRefExoticComponent<Omit<TogglePrimitive.ToggleProps & React.RefAttributes<HTMLButtonElement>, "ref"> & VariantProps<(props?: ({
    variant?: "default" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string> & React.RefAttributes<HTMLButtonElement>>;
export { Toggle, toggleVariants };
