import * as React from 'react';
import './template.css';
declare const Template: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const TemplateHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const TemplateFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const TemplateSubHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
type TemplateBodyProps = {
    subHeader?: React.ReactNode;
    sidebar?: React.ReactNode;
    rightSidebar?: React.ReactNode;
    defaultSidebarSize?: number;
    minSidebarSize?: number;
    defaultRightSidebarSize?: number;
    minRightSidebarSize?: number;
    children: React.ReactNode;
    className?: string;
};
declare const TemplateBody: React.ForwardRefExoticComponent<TemplateBodyProps & React.RefAttributes<HTMLDivElement>>;
type TemplateCanvasLayout = 'center' | 'full' | 'grid' | 'columns';
declare const TemplateCanvas: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    layout?: TemplateCanvasLayout;
} & React.RefAttributes<HTMLDivElement>>;
export { Template, TemplateHeader, TemplateSubHeader, TemplateFooter, TemplateBody, TemplateCanvas, };
