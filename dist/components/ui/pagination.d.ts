import * as React from 'react';
import './pagination.css';
export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    /** Number of pages. @default 1 */
    total?: number;
    /** Currently selected page (rendered with aria-current="page"). @default 1 */
    current?: number;
}
/** Pella Pagination - tokens/components/paginations.json (simple.brand family). */
export declare function Pagination({ total, current, ...props }: PaginationProps): React.JSX.Element;
export declare namespace Pagination {
    var displayName: string;
}
