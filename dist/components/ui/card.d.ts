import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import './card.css';
declare const cardVariants: (props?: ({
    variant?: "plain" | "fadeHeader" | "mediaTop" | "mediaTopFadeHeader" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const Card: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & VariantProps<(props?: ({
    variant?: "plain" | "fadeHeader" | "mediaTop" | "mediaTopFadeHeader" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string> & React.RefAttributes<HTMLDivElement>>;
declare const CardHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
type CardMediaProps = {
    image?: string;
    children?: React.ReactNode;
    className?: string;
};
declare function CardMedia({ image, children, className }: CardMediaProps): React.JSX.Element | null;
declare namespace CardMedia {
    var displayName: string;
}
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, CardMedia, cardVariants, };
