'use client';

import * as React from 'react';

import { cn } from '../../lib/utils';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './resizable';
import './template.css';

const Template = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="template"
      className={cn('flex h-full min-h-0 flex-col', className)}
      {...props}
    />
  ),
);
Template.displayName = 'Template';

const TemplateHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="template-header" className={cn(className)} {...props} />
  ),
);
TemplateHeader.displayName = 'TemplateHeader';

const TemplateFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="template-footer" className={cn(className)} {...props} />
  ),
);
TemplateFooter.displayName = 'TemplateFooter';

type TemplateBodyProps = {
  sidebar: React.ReactNode;
  defaultSidebarSize?: number;
  minSidebarSize?: number;
  children: React.ReactNode;
  className?: string;
};

const TemplateBody = React.forwardRef<HTMLDivElement, TemplateBodyProps>(
  ({ sidebar, defaultSidebarSize = 30, minSidebarSize = 20, children, className }, ref) => (
    <div ref={ref} data-slot="template-body" className={cn('min-h-0 flex-1', className)}>
      <ResizablePanelGroup direction="horizontal" className="h-full w-full">
        <ResizablePanel defaultSize={defaultSidebarSize} minSize={minSidebarSize}>
          {sidebar}
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={100 - defaultSidebarSize} minSize={40}>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
);
TemplateBody.displayName = 'TemplateBody';

type TemplateCanvasLayout = 'center' | 'full' | 'grid' | 'columns';

type TemplateCanvasProps = React.HTMLAttributes<HTMLDivElement> & {
  layout?: TemplateCanvasLayout;
};

const TemplateCanvas = React.forwardRef<HTMLDivElement, TemplateCanvasProps>(
  ({ className, layout = 'center', ...props }, ref) => (
    <div
      ref={ref}
      data-slot="template-canvas"
      data-layout={layout}
      className={cn('h-full min-h-0 w-full overflow-auto', className)}
      {...props}
    />
  ),
);
TemplateCanvas.displayName = 'TemplateCanvas';

export { Template, TemplateHeader, TemplateFooter, TemplateBody, TemplateCanvas };
