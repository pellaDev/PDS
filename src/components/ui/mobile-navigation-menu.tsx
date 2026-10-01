'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import * as MobileNavigationMenuPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronDownIcon, MenuIcon, XIcon } from 'lucide-react';

import { cn } from '../../lib/utils';
import { usePdsConfig } from '../../config';
import { Button } from './button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible';
import { Separator } from './separator';

// Mobile navigation menu: the off-canvas drawer variant of PDS primary navigation.
// Mechanics mirror sheet.tsx (Radix dialog + scrim overlay + 300/500ms slide) and the
// row idiom mirrors sidebar.tsx (hover-elevate, active washes, inset brand bar), so
// both surfaces speak the same interaction language. All geometry/motion/shadows come
// from existing tokens: --sidebar-width-mobile, --shadow-menuLeft/Right, dim grid,
// body1/body2/caption type scales, scrim overlay, sheet durations.
//
// Container hairlines (panel edge, header, footer) read --pds-container-border-color,
// the same live token as Card, so they flip with the global FILL/OUTLINE field style:
// transparent in FILL (fill + shadow define the container), visible in OUTLINE.
// Separators use Separator's auto variant and flip too (fading in FILL, solid in OUTLINE).
// The panel is portaled to <body>, outside the [data-pds-fieldstyle] scope a host app puts
// on its layout root, so it carries data-pds-fieldstyle itself: the attribute-scoped token
// rules in index.css then apply across the portal boundary exactly as they do in-page.
// Trigger/close are PDS Buttons (size "icon" -- the square label-less composition); tree groups
// expand with the accordion idiom.

const MobileNavigationMenu = MobileNavigationMenuPrimitive.Root;

// Trigger and close are the PDS Button itself, size "icon" -- the square label-less composition
// (40x40, the documented 'small without label' form), so they keep the system's interaction
// language and focus ring while staying perfectly square with a comfortable touch target.
// Radix trigger/close merge through asChild; the merged props (onClick, aria-expanded,
// data-state) flow on to the native button element via Button's own prop spread.
// Close carries ml-auto by default: in the header's flex row it owns the free space and pins
// itself to the far edge. (With size small the auto Tooltip would wrap the button in a span and
// swallow that margin -- icon buttons are not tooltip-wrapped, so the class lands on the real
// flex item.)

const MobileNavigationMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof MobileNavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <MobileNavigationMenuPrimitive.Trigger asChild>
    <Button
      ref={ref}
      size="icon"
      data-slot="mobile-navigation-menu-trigger"
      aria-label="Open navigation menu"
      className={cn('shrink-0', className)}
      {...props}
    >
      {children ?? <MenuIcon aria-hidden />}
    </Button>
  </MobileNavigationMenuPrimitive.Trigger>
));
MobileNavigationMenuTrigger.displayName = MobileNavigationMenuPrimitive.Trigger.displayName;

const MobileNavigationMenuClose = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof MobileNavigationMenuPrimitive.Close>
>(({ className, children, ...props }, ref) => (
  <MobileNavigationMenuPrimitive.Close asChild>
    <Button
      ref={ref}
      size="icon"
      data-slot="mobile-navigation-menu-close"
      aria-label="Close navigation menu"
      className={cn('ml-auto shrink-0', className)}
      {...props}
    >
      {children ?? <XIcon aria-hidden />}
    </Button>
  </MobileNavigationMenuPrimitive.Close>
));
MobileNavigationMenuClose.displayName = MobileNavigationMenuPrimitive.Close.displayName;

const MobileNavigationMenuOverlay = React.forwardRef<
  React.ElementRef<typeof MobileNavigationMenuPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof MobileNavigationMenuPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <MobileNavigationMenuPrimitive.Overlay
    ref={ref}
    data-slot="mobile-navigation-menu-overlay"
    className={cn(
      'fixed inset-0 z-50 bg-scrim data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
  />
));
MobileNavigationMenuOverlay.displayName = MobileNavigationMenuPrimitive.Overlay.displayName;

const mobileNavigationMenuPanelVariants = cva(
  'fixed inset-y-0 z-50 flex w-[var(--sidebar-width-mobile)] max-w-[85vw] flex-col bg-background text-foreground transition ease-in-out [border-color:var(--pds-container-border-color)] data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=closed]:animate-out data-[state=open]:animate-in',
  {
    variants: {
      side: {
        // Panel hugging the left edge casts its shadow to the right (menuRight),
        // a right-edge panel casts it to the left (menuLeft).
        left: 'left-0 border-r shadow-[var(--shadow-menuRight)] data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
        right:
          'right-0 border-l shadow-[var(--shadow-menuLeft)] data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
      },
    },
    defaultVariants: {
      side: 'left',
    },
  },
);

interface MobileNavigationMenuPanelProps
  extends React.ComponentPropsWithoutRef<typeof MobileNavigationMenuPrimitive.Content>,
    VariantProps<typeof mobileNavigationMenuPanelVariants> {}

const MobileNavigationMenuPanel = React.forwardRef<
  React.ElementRef<typeof MobileNavigationMenuPrimitive.Content>,
  MobileNavigationMenuPanelProps
>(({ side = 'left', className, children, ...props }, ref) => {
  const { fieldStyle } = usePdsConfig();
  return (
    <MobileNavigationMenuPrimitive.Portal>
      <MobileNavigationMenuOverlay />
      <MobileNavigationMenuPrimitive.Content
        ref={ref}
        data-slot="mobile-navigation-menu-panel"
        data-pds-fieldstyle={fieldStyle}
        className={cn(mobileNavigationMenuPanelVariants({ side }), className)}
        {...props}
      >
        {children}
      </MobileNavigationMenuPrimitive.Content>
    </MobileNavigationMenuPrimitive.Portal>
  );
});
MobileNavigationMenuPanel.displayName = MobileNavigationMenuPrimitive.Content.displayName;

function MobileNavigationMenuHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="mobile-navigation-menu-header"
      className={cn(
        'flex min-h-[var(--mobile-nav-header-height)] items-center gap-[var(--dim-s)] border-b [border-color:var(--pds-container-border-color)] px-[var(--dim-mmm)]',
        className,
      )}
      {...props}
    />
  );
}
MobileNavigationMenuHeader.displayName = 'MobileNavigationMenuHeader';

const MobileNavigationMenuTitle = React.forwardRef<
  React.ElementRef<typeof MobileNavigationMenuPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof MobileNavigationMenuPrimitive.Title>
>(({ className, ...props }, ref) => (
  <MobileNavigationMenuPrimitive.Title
    ref={ref}
    data-slot="mobile-navigation-menu-title"
    className={cn(
      'min-w-0 truncate [font-size:var(--type-body1-size)] [line-height:var(--type-body1-lh)] font-light text-foreground',
      className,
    )}
    {...props}
  />
));
MobileNavigationMenuTitle.displayName = MobileNavigationMenuPrimitive.Title.displayName;

const MobileNavigationMenuDescription = React.forwardRef<
  React.ElementRef<typeof MobileNavigationMenuPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof MobileNavigationMenuPrimitive.Description>
>(({ className, ...props }, ref) => (
  <MobileNavigationMenuPrimitive.Description
    ref={ref}
    data-slot="mobile-navigation-menu-description"
    className={cn(
      '[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground',
      className,
    )}
    {...props}
  />
));
MobileNavigationMenuDescription.displayName = MobileNavigationMenuPrimitive.Description.displayName;

// Scrollable navigation body. A <nav> landmark so the drawer announces as a
// navigation region; rows are touch-sized (48px min from the dim grid).
function MobileNavigationMenuContent({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      data-slot="mobile-navigation-menu-content"
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-[var(--dim-sss)] overflow-y-auto px-[var(--dim-mmm)] py-[var(--dim-s)]',
        className,
      )}
      {...props}
    />
  );
}
MobileNavigationMenuContent.displayName = 'MobileNavigationMenuContent';

// Touch row in the sidebar-menu idiom: hover wash, pressed currentColor wash, and -
// when active - a stronger currentColor tint plus the inset brand edge bar.
const mobileNavigationMenuItemVariants = cva(
  'flex w-full min-w-0 items-center gap-[var(--dim-s)] rounded-md px-[var(--dim-mmm)] text-left outline-hidden transition-colors hover-elevate focus-visible:ring-2 focus-visible:ring-ring active:bg-[color-mix(in_srgb,currentColor_8%,transparent)] disabled:pointer-events-none disabled:opacity-50 data-[active=true]:bg-[color-mix(in_srgb,currentColor_10%,transparent)] data-[active=true]:font-medium data-[active=true]:shadow-[inset_2px_0_0_var(--color-primary)] min-h-[var(--dim-ll)] [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light [&>svg]:size-5 [&>svg]:shrink-0 [&>span:last-child]:truncate',
);

function MobileNavigationMenuItem({
  asChild = false,
  isActive = false,
  className,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean;
  isActive?: boolean;
}) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="mobile-navigation-menu-item"
      data-active={isActive}
      className={cn(mobileNavigationMenuItemVariants(), className)}
      {...props}
    />
  );
}
MobileNavigationMenuItem.displayName = 'MobileNavigationMenuItem';

// Tree group: a top-level row that expands an inline subtree of child rows (tree format).
// Same expansion language as accordion.tsx - Radix collapsible primitive, chevron rotation,
// accordion-down/up keyframes; children are regular MobileNavigationMenuItem rows, indented
// one icon+gap step so they align under the parent label.
// The native "title" attribute is deliberately overridden: on this component the label IS the
// visible row text, not a browser tooltip.
interface MobileNavigationMenuTreeProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Collapsible>, 'title'> {
  /** Label shown on the expandable row. */
  title: React.ReactNode;
  /** Optional leading icon, sized like every other row icon. */
  icon?: React.ReactNode;
}

const MobileNavigationMenuTree = React.forwardRef<
  React.ElementRef<typeof Collapsible>,
  MobileNavigationMenuTreeProps
>(({ className, children, title, icon, ...props }, ref) => (
  <Collapsible
    ref={ref}
    data-slot="mobile-navigation-menu-tree"
    className={cn('flex flex-col', className)}
    {...props}
  >
    <CollapsibleTrigger asChild>
      <button
        type="button"
        data-slot="mobile-navigation-menu-tree-trigger"
        aria-label={typeof title === 'string' ? title : undefined}
        className={cn(
          mobileNavigationMenuItemVariants(),
          // chevron (last svg child) rotates like the accordion trigger
          '[&[data-state=open]>svg:last-child]:rotate-180',
        )}
      >
        {icon}
        <span className="min-w-0 flex-1 truncate">{title}</span>
        <ChevronDownIcon
          className="ml-auto shrink-0 text-muted-foreground transition-transform duration-200"
          aria-hidden
        />
      </button>
    </CollapsibleTrigger>
    <CollapsibleContent
      data-slot="mobile-navigation-menu-tree-content"
      className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    >
      {/* indent = row icon (dim-mmm) + row gap (dim-s): children align under the parent label */}
      <div className="flex flex-col gap-[var(--dim-sss)] py-[var(--dim-sss)] pl-[calc(var(--dim-mmm)+var(--dim-s))]">
        {children}
      </div>
    </CollapsibleContent>
  </Collapsible>
));
MobileNavigationMenuTree.displayName = 'MobileNavigationMenuTree';

function MobileNavigationMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="mobile-navigation-menu-separator"
      className={cn('my-[var(--dim-sss)]', className)}
      {...props}
    />
  );
}

function MobileNavigationMenuFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="mobile-navigation-menu-footer"
      className={cn(
        'flex flex-col gap-[var(--dim-s)] border-t [border-color:var(--pds-container-border-color)] px-[var(--dim-mmm)] py-[var(--dim-mm)]',
        className,
      )}
      {...props}
    />
  );
}
MobileNavigationMenuFooter.displayName = 'MobileNavigationMenuFooter';

export {
  MobileNavigationMenu,
  MobileNavigationMenuTrigger,
  MobileNavigationMenuClose,
  MobileNavigationMenuOverlay,
  MobileNavigationMenuPanel,
  MobileNavigationMenuHeader,
  MobileNavigationMenuTitle,
  MobileNavigationMenuDescription,
  MobileNavigationMenuContent,
  MobileNavigationMenuItem,
  MobileNavigationMenuTree,
  MobileNavigationMenuSeparator,
  MobileNavigationMenuFooter,
};
