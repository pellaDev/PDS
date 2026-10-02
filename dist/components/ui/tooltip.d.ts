import * as React from 'react';
import './tooltip.css';
export type TooltipVariant = 'default' | 'alert' | 'error';
export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
    content: string;
    variant?: TooltipVariant;
}
export declare function Tooltip({ content, variant, children, ...props }: TooltipProps): React.JSX.Element;
