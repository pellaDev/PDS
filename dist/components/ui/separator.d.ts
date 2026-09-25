import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import './separator.css';
declare const Separator: React.ForwardRefExoticComponent<Omit<SeparatorPrimitive.SeparatorProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    fade?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
export { Separator };
