import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "../../lib/utils";
import "./menu-list.css";
import "./menu.css";
function MenubarMenu({ ...props }) {
  return /* @__PURE__ */ jsx(MenubarPrimitive.Menu, { ...props });
}
function MenubarGroup({ ...props }) {
  return /* @__PURE__ */ jsx(MenubarPrimitive.Group, { ...props });
}
function MenubarPortal({ ...props }) {
  return /* @__PURE__ */ jsx(MenubarPrimitive.Portal, { ...props });
}
function MenubarRadioGroup({ ...props }) {
  return /* @__PURE__ */ jsx(MenubarPrimitive.RadioGroup, { ...props });
}
function MenubarSub({ ...props }) {
  return /* @__PURE__ */ jsx(MenubarPrimitive.Sub, { "data-slot": "menubar-sub", ...props });
}
const Menubar = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  MenubarPrimitive.Root,
  {
    ref,
    className: cn(
      "flex h-9 items-center space-x-1 rounded-md border bg-background p-1 shadow-sm",
      className
    ),
    ...props
  }
));
Menubar.displayName = MenubarPrimitive.Root.displayName;
const MenubarTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  MenubarPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none pds-list-item",
      className
    ),
    ...props
  }
));
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;
const MenubarSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  MenubarPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "pds-menu-item pds-sub flex cursor-default select-none items-center gap-2 px-3 py-1.5 [&_svg]:pointer-events-none [&_svg]:size-4",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto h-4 w-4" })
    ]
  }
));
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;
const MenubarSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  MenubarPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden p-1 pds-menu-sub-content data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-menubar-content-transform-origin]",
      className
    ),
    ...props
  }
));
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;
const MenubarContent = React.forwardRef(({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => /* @__PURE__ */ jsx(MenubarPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  MenubarPrimitive.Content,
  {
    ref,
    align,
    alignOffset,
    sideOffset,
    className: cn(
      "z-50 max-h-[var(--radix-menubar-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden p-1 pds-menu-content data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-menubar-content-transform-origin]",
      className
    ),
    ...props
  }
) }));
MenubarContent.displayName = MenubarPrimitive.Content.displayName;
const MenubarItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  MenubarPrimitive.Item,
  {
    ref,
    className: cn(
      "pds-menu-item relative flex cursor-default select-none items-center gap-2 px-3 py-1.5 data-[disabled]:pointer-events-none [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
MenubarItem.displayName = MenubarPrimitive.Item.displayName;
const MenubarCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  MenubarPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "pds-menu-item relative flex cursor-default select-none items-center py-1.5 pl-8 pr-3 data-[disabled]:pointer-events-none",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(MenubarPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;
const MenubarRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  MenubarPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "pds-menu-item relative flex cursor-default select-none items-center py-1.5 pl-8 pr-3 data-[disabled]:pointer-events-none",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(MenubarPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-4 w-4 fill-current" }) }) }),
      children
    ]
  }
));
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;
const MenubarLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  MenubarPrimitive.Label,
  {
    ref,
    className: cn("pds-menu-label px-3 py-1.5", inset && "pl-8", className),
    ...props
  }
));
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;
const MenubarSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  MenubarPrimitive.Separator,
  {
    ref,
    className: cn("pds-menu-separator -mx-1 my-1 h-px", className),
    ...props
  }
));
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;
const MenubarShortcut = ({ className, ...props }) => {
  return /* @__PURE__ */ jsx("span", { className: cn("ml-auto text-xs tracking-widest opacity-60", className), ...props });
};
MenubarShortcut.displayname = "MenubarShortcut";
export {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger
};
