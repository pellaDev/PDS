import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '../../lib/utils';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & { size?: 'default' | 'mobile' }
>(({ className, size = 'default', ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      // Fill flips with the host surface via --pds-surface-canvas-bg (base -> secondary gray, alternate -> background white) so the nav box never goes flush on its panel.
      'inline-flex items-center justify-center [border-radius:var(--radius-lg)] [background-color:var(--pds-surface-canvas-bg)] p-[var(--dim-sss)] text-muted-foreground',
      size === 'mobile' && 'flex w-full',
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & { size?: 'default' | 'mobile' }
>(({ className, size = 'default', ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap font-medium transition-all hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [ring-offset-color:var(--pds-surface-bg)] disabled:pointer-events-none disabled:opacity-[var(--opacity-disabled)] data-[state=active]:shadow data-[state=active]:text-foreground data-[state=active]:[background-color:var(--pds-surface-bg)]',
      '[border-radius:var(--radius-md)] [padding-inline:var(--dim-s)] [padding-block:var(--dim-sss)] [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)]',
      size === 'mobile' && 'min-h-[var(--dim-ll)] flex-1',
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      '[margin-top:var(--dim-ss)] [ring-offset-color:var(--pds-surface-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
