import * as React from 'react';
import './pagination.css';
export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    total?: number;
    current?: number;
}
export declare function Pagination({ total, current, ...props }: PaginationProps): React.JSX.Element;
export declare namespace Pagination {
    var displayName: string;
}
