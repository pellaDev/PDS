import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { type VariantProps } from 'class-variance-authority';
import './toggle.css';
declare const toggleVariants: (props?: ({
    variant?: "default" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type ToggleVariants = VariantProps<typeof toggleVariants>;
type SingleToggleProps = React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & ToggleVariants & {
    type?: undefined;
    asItem?: undefined;
};
type GroupToggleProps = React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & ToggleVariants & {
    type: 'single' | 'multiple';
    asItem?: undefined;
};
type ToggleItemProps = React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & ToggleVariants & {
    asItem: true;
    type?: undefined;
};
type ToggleProps = SingleToggleProps | GroupToggleProps | ToggleItemProps;
declare const Toggle: React.ForwardRefExoticComponent<ToggleProps & React.RefAttributes<HTMLElement>>;
export { Toggle, toggleVariants };
