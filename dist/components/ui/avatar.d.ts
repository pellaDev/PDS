import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { type VariantProps } from 'class-variance-authority';
declare const Avatar: React.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarProps & React.RefAttributes<HTMLSpanElement>, "ref"> & VariantProps<(props?: ({
    size?: "default" | "xs" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string> & React.RefAttributes<HTMLSpanElement>>;
declare const AvatarImage: React.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarImageProps & React.RefAttributes<HTMLImageElement>, "ref"> & React.RefAttributes<HTMLImageElement>>;
declare const AvatarFallback: React.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarFallbackProps & React.RefAttributes<HTMLSpanElement>, "ref"> & React.RefAttributes<HTMLSpanElement>>;
export { Avatar, AvatarImage, AvatarFallback };
