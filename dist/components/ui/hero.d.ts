import * as React from 'react';
import './hero.css';
type HeroSlots = {
    image?: string;
    title?: React.ReactNode;
    tags?: React.ReactNode;
    media?: React.ReactNode;
    subheadline?: React.ReactNode;
    cards?: React.ReactNode;
    actions?: React.ReactNode;
};
export declare function Hero({ image, title, tags, media, subheadline, cards, actions, className, style, ...props }: HeroSlots & React.ComponentProps<'div'>): React.JSX.Element;
export {};
