import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { type VariantProps } from 'class-variance-authority';
import './progress.css';
declare const Progress: React.ForwardRefExoticComponent<Omit<ProgressPrimitive.ProgressProps & React.RefAttributes<HTMLDivElement>, "ref"> & VariantProps<(props?: ({
    size?: "default" | "thick" | null | undefined;
    color?: "default" | "dynamic" | null | undefined;
    direction?: "ascending" | "descending" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string> & {
    loading?: boolean;
    color?: "default" | "dynamic";
    direction?: "ascending" | "descending";
    label?: React.ReactNode;
} & React.RefAttributes<HTMLDivElement>>;
export { Progress };
