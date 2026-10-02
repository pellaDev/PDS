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
    <div
      ref={ref}
      data-slot="template-header"
      data-pds-surface="alternate"
      className={cn(className)}
      {...props}
    />
  ),
);
TemplateHeader.displayName = 'TemplateHeader';

const TemplateFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="template-footer"
      data-pds-surface="alternate"
      className={cn(className)}
      {...props}
    />
  ),
);
TemplateFooter.displayName = 'TemplateFooter';

const TemplateSubHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="template-subheader" className={cn(className)} {...props} />
  ),
);
TemplateSubHeader.displayName = 'TemplateSubHeader';

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

const TemplateBody = React.forwardRef<HTMLDivElement, TemplateBodyProps>(
  (
    {
      subHeader,
      sidebar,
      rightSidebar,
      defaultSidebarSize = 30,
      minSidebarSize = 20,
      defaultRightSidebarSize = 30,
      minRightSidebarSize = 20,
      children,
      className,
    },
    ref,
  ) => {
    const hasLeft = sidebar != null;
    const hasRight = rightSidebar != null;
    const canvasSize =
      100 - (hasLeft ? defaultSidebarSize : 0) - (hasRight ? defaultRightSidebarSize : 0);

    return (
      <div
        ref={ref}
        data-slot="template-body"
        className={cn('flex min-h-0 flex-1 flex-col', className)}
      >
        {subHeader}
        {}
        <ResizablePanelGroup
          key={`${hasLeft}|${hasRight}`}
          direction="horizontal"
          className="min-h-0 flex-1 w-full"
        >
          {hasLeft && (
            <>
              <ResizablePanel defaultSize={defaultSidebarSize} minSize={minSidebarSize}>
                {sidebar}
              </ResizablePanel>
              <ResizableHandle />
            </>
          )}
          <ResizablePanel defaultSize={canvasSize} minSize={40}>
            {children}
          </ResizablePanel>
          {hasRight && (
            <>
              <ResizableHandle />
              <ResizablePanel defaultSize={defaultRightSidebarSize} minSize={minRightSidebarSize}>
                {rightSidebar}
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    );
  },
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
      data-pds-surface="alternate"
      data-layout={layout}
      className={cn('h-full min-h-0 w-full overflow-auto', className)}
      {...props}
    />
  ),
);
TemplateCanvas.displayName = 'TemplateCanvas';

export {
  Template,
  TemplateHeader,
  TemplateSubHeader,
  TemplateFooter,
  TemplateBody,
  TemplateCanvas,
};
