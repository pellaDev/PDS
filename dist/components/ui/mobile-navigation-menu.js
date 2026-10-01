"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import * as MobileNavigationMenuPrimitive from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import { ChevronDownIcon, MenuIcon, XIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { usePdsConfig } from "../../config";
import { Button } from "./button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";
import { Separator } from "./separator";
const MobileNavigationMenu = MobileNavigationMenuPrimitive.Root;
const MobileNavigationMenuTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(MobileNavigationMenuPrimitive.Trigger, { asChild: true, children: /* @__PURE__ */ jsx(
  Button,
  {
    ref,
    size: "icon",
    "data-slot": "mobile-navigation-menu-trigger",
    "aria-label": "Open navigation menu",
    className: cn("shrink-0", className),
    ...props,
    children: children ?? /* @__PURE__ */ jsx(MenuIcon, { "aria-hidden": true })
  }
) }));
MobileNavigationMenuTrigger.displayName = MobileNavigationMenuPrimitive.Trigger.displayName;
const MobileNavigationMenuClose = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(MobileNavigationMenuPrimitive.Close, { asChild: true, children: /* @__PURE__ */ jsx(
  Button,
  {
    ref,
    size: "icon",
    "data-slot": "mobile-navigation-menu-close",
    "aria-label": "Close navigation menu",
    className: cn("ml-auto shrink-0", className),
    ...props,
    children: children ?? /* @__PURE__ */ jsx(XIcon, { "aria-hidden": true })
  }
) }));
MobileNavigationMenuClose.displayName = MobileNavigationMenuPrimitive.Close.displayName;
const MobileNavigationMenuOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  MobileNavigationMenuPrimitive.Overlay,
  {
    ref,
    "data-slot": "mobile-navigation-menu-overlay",
    className: cn(
      "fixed inset-0 z-50 bg-scrim data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
MobileNavigationMenuOverlay.displayName = MobileNavigationMenuPrimitive.Overlay.displayName;
const mobileNavigationMenuPanelVariants = cva(
  "fixed inset-y-0 z-50 flex w-[var(--sidebar-width-mobile)] max-w-[85vw] flex-col bg-background text-foreground transition ease-in-out [border-color:var(--pds-container-border-color)] data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=closed]:animate-out data-[state=open]:animate-in",
  {
    variants: {
      side: {
        // Panel hugging the left edge casts its shadow to the right (menuRight),
        // a right-edge panel casts it to the left (menuLeft).
        left: "left-0 border-r shadow-[var(--shadow-menuRight)] data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
        right: "right-0 border-l shadow-[var(--shadow-menuLeft)] data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right"
      }
    },
    defaultVariants: {
      side: "left"
    }
  }
);
const MobileNavigationMenuPanel = React.forwardRef(({ side = "left", className, children, ...props }, ref) => {
  const { fieldStyle } = usePdsConfig();
  return /* @__PURE__ */ jsxs(MobileNavigationMenuPrimitive.Portal, { children: [
    /* @__PURE__ */ jsx(MobileNavigationMenuOverlay, {}),
    /* @__PURE__ */ jsx(
      MobileNavigationMenuPrimitive.Content,
      {
        ref,
        "data-slot": "mobile-navigation-menu-panel",
        "data-pds-fieldstyle": fieldStyle,
        className: cn(mobileNavigationMenuPanelVariants({ side }), className),
        ...props,
        children
      }
    )
  ] });
});
MobileNavigationMenuPanel.displayName = MobileNavigationMenuPrimitive.Content.displayName;
function MobileNavigationMenuHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "mobile-navigation-menu-header",
      className: cn(
        "flex min-h-[var(--mobile-nav-header-height)] items-center gap-[var(--dim-s)] border-b [border-color:var(--pds-container-border-color)] px-[var(--dim-mmm)]",
        className
      ),
      ...props
    }
  );
}
MobileNavigationMenuHeader.displayName = "MobileNavigationMenuHeader";
const MobileNavigationMenuTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  MobileNavigationMenuPrimitive.Title,
  {
    ref,
    "data-slot": "mobile-navigation-menu-title",
    className: cn(
      "min-w-0 truncate [font-size:var(--type-body1-size)] [line-height:var(--type-body1-lh)] font-light text-foreground",
      className
    ),
    ...props
  }
));
MobileNavigationMenuTitle.displayName = MobileNavigationMenuPrimitive.Title.displayName;
const MobileNavigationMenuDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  MobileNavigationMenuPrimitive.Description,
  {
    ref,
    "data-slot": "mobile-navigation-menu-description",
    className: cn(
      "[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground",
      className
    ),
    ...props
  }
));
MobileNavigationMenuDescription.displayName = MobileNavigationMenuPrimitive.Description.displayName;
function MobileNavigationMenuContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "nav",
    {
      "data-slot": "mobile-navigation-menu-content",
      className: cn(
        "flex min-h-0 flex-1 flex-col gap-[var(--dim-sss)] overflow-y-auto px-[var(--dim-mmm)] py-[var(--dim-s)]",
        className
      ),
      ...props
    }
  );
}
MobileNavigationMenuContent.displayName = "MobileNavigationMenuContent";
const mobileNavigationMenuItemVariants = cva(
  "flex w-full min-w-0 items-center gap-[var(--dim-s)] rounded-md px-[var(--dim-mmm)] text-left outline-hidden transition-colors hover-elevate focus-visible:ring-2 focus-visible:ring-ring active:bg-[color-mix(in_srgb,currentColor_8%,transparent)] disabled:pointer-events-none disabled:opacity-50 data-[active=true]:bg-[color-mix(in_srgb,currentColor_10%,transparent)] data-[active=true]:font-medium data-[active=true]:shadow-[inset_2px_0_0_var(--color-primary)] min-h-[var(--dim-ll)] [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light [&>svg]:size-5 [&>svg]:shrink-0 [&>span:last-child]:truncate"
);
function MobileNavigationMenuItem({
  asChild = false,
  isActive = false,
  className,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "mobile-navigation-menu-item",
      "data-active": isActive,
      className: cn(mobileNavigationMenuItemVariants(), className),
      ...props
    }
  );
}
MobileNavigationMenuItem.displayName = "MobileNavigationMenuItem";
const MobileNavigationMenuTree = React.forwardRef(({ className, children, title, icon, ...props }, ref) => /* @__PURE__ */ jsxs(
  Collapsible,
  {
    ref,
    "data-slot": "mobile-navigation-menu-tree",
    className: cn("flex flex-col", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx(CollapsibleTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          "data-slot": "mobile-navigation-menu-tree-trigger",
          "aria-label": typeof title === "string" ? title : void 0,
          className: cn(
            mobileNavigationMenuItemVariants(),
            // chevron (last svg child) rotates like the accordion trigger
            "[&[data-state=open]>svg:last-child]:rotate-180"
          ),
          children: [
            icon,
            /* @__PURE__ */ jsx("span", { className: "min-w-0 flex-1 truncate", children: title }),
            /* @__PURE__ */ jsx(
              ChevronDownIcon,
              {
                className: "ml-auto shrink-0 text-muted-foreground transition-transform duration-200",
                "aria-hidden": true
              }
            )
          ]
        }
      ) }),
      /* @__PURE__ */ jsx(
        CollapsibleContent,
        {
          "data-slot": "mobile-navigation-menu-tree-content",
          className: "overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
          children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-[var(--dim-sss)] py-[var(--dim-sss)] pl-[calc(var(--dim-mmm)+var(--dim-s))]", children })
        }
      )
    ]
  }
));
MobileNavigationMenuTree.displayName = "MobileNavigationMenuTree";
function MobileNavigationMenuSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Separator,
    {
      "data-slot": "mobile-navigation-menu-separator",
      className: cn("my-[var(--dim-sss)]", className),
      ...props
    }
  );
}
function MobileNavigationMenuFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "mobile-navigation-menu-footer",
      className: cn(
        "flex flex-col gap-[var(--dim-s)] border-t [border-color:var(--pds-container-border-color)] px-[var(--dim-mmm)] py-[var(--dim-mm)]",
        className
      ),
      ...props
    }
  );
}
MobileNavigationMenuFooter.displayName = "MobileNavigationMenuFooter";
export {
  MobileNavigationMenu,
  MobileNavigationMenuClose,
  MobileNavigationMenuContent,
  MobileNavigationMenuDescription,
  MobileNavigationMenuFooter,
  MobileNavigationMenuHeader,
  MobileNavigationMenuItem,
  MobileNavigationMenuOverlay,
  MobileNavigationMenuPanel,
  MobileNavigationMenuSeparator,
  MobileNavigationMenuTitle,
  MobileNavigationMenuTree,
  MobileNavigationMenuTrigger
};
