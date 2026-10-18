import * as React from 'react';
import './layout.css';
export type LayoutGap = 'sss' | 'ss' | 's' | 'm' | 'l' | 'll';
type LayoutProps = {
    gap?: LayoutGap;
    className?: string;
    children?: React.ReactNode;
};
export declare function Stack({ gap, className, children, ...props }: LayoutProps): React.JSX.Element;
export declare function Row({ gap, className, children, ...props }: LayoutProps): React.JSX.Element;
export declare function Grid({ columns, gap, className, children, ...props }: LayoutProps & {
    columns?: number;
}): React.JSX.Element;
export declare function Panel({ gap, className, children, ...props }: LayoutProps): React.JSX.Element;
export {};
