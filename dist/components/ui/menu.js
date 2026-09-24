"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "../../lib/utils";
import "./menu.css";
const MenuContext = React.createContext("dropdown");
const toDropdown = (props) => props;
const toContext = (props) => props;
function MenuRoot({
  mode = "dropdown",
  children,
  ...rest
}) {
  return /* @__PURE__ */ jsx(MenuContext.Provider, { value: mode, children: mode === "dropdown" ? /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Root,
    {
      ...toDropdown(rest),
      children
    }
  ) : /* @__PURE__ */ jsx(
    ContextMenuPrimitive.Root,
    {
      ...toContext(rest),
      children
    }
  ) });
}
function MenuTrigger({
  className,
  children,
  ...rest
}) {
  const mode = React.useContext(MenuContext);
  if (mode === "dropdown") {
    return /* @__PURE__ */ jsx(
      DropdownMenuPrimitive.Trigger,
      {
        className,
        ...toDropdown(rest),
        children
      }
    );
  }
  return /* @__PURE__ */ jsx(
    ContextMenuPrimitive.Trigger,
    {
      className,
      ...toContext(rest),
      children
    }
  );
}
const CONTENT_ANIMATION = "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2";
function MenuContent({
  className,
  sideOffset = 4,
  children,
  ...rest
}) {
  const mode = React.useContext(MenuContext);
  if (mode === "dropdown") {
    return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
      DropdownMenuPrimitive.Content,
      {
        sideOffset,
        className: cn(
          "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden p-1 pds-menu-content",
          CONTENT_ANIMATION,
          "origin-[--radix-dropdown-menu-content-transform-origin]",
          className
        ),
        ...toDropdown(
          rest
        ),
        children
      }
    ) });
  }
  return /* @__PURE__ */ jsx(ContextMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    ContextMenuPrimitive.Content,
    {
      className: cn(
        "z-50 max-h-[var(--radix-context-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden p-1 pds-menu-content",
        CONTENT_ANIMATION,
        "origin-[--radix-context-menu-content-transform-origin]",
        className
      ),
      ...toContext(rest),
      children
    }
  ) });
}
const ITEM_BASE = "pds-menu-item relative flex cursor-default select-none items-center gap-2 px-3 py-1.5 data-[disabled]:pointer-events-none [&>svg]:size-4 [&>svg]:shrink-0";
function MenuItem({
  className,
  inset,
  children,
  ...rest
}) {
  const mode = React.useContext(MenuContext);
  const classes = cn(ITEM_BASE, inset && "pl-8", className);
  if (mode === "dropdown") {
    return /* @__PURE__ */ jsx(
      DropdownMenuPrimitive.Item,
      {
        className: classes,
        ...toDropdown(rest),
        children
      }
    );
  }
  return /* @__PURE__ */ jsx(
    ContextMenuPrimitive.Item,
    {
      className: classes,
      ...toContext(rest),
      children
    }
  );
}
const CHECK_ITEM_BASE = "pds-menu-item relative flex cursor-default select-none items-center py-1.5 pl-8 pr-3 data-[disabled]:pointer-events-none";
function MenuCheckboxItem({
  className,
  children,
  ...rest
}) {
  const mode = React.useContext(MenuContext);
  if (mode === "dropdown") {
    return /* @__PURE__ */ jsxs(
      DropdownMenuPrimitive.CheckboxItem,
      {
        className: cn(CHECK_ITEM_BASE, className),
        ...toDropdown(
          rest
        ),
        children: [
          /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "size-4" }) }) }),
          children
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    ContextMenuPrimitive.CheckboxItem,
    {
      className: cn(CHECK_ITEM_BASE, className),
      ...toContext(rest),
      children: [
        /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(ContextMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "size-4" }) }) }),
        children
      ]
    }
  );
}
function MenuRadioGroup(props) {
  const mode = React.useContext(MenuContext);
  if (mode === "dropdown")
    return /* @__PURE__ */ jsx(
      DropdownMenuPrimitive.RadioGroup,
      {
        ...toDropdown(
          props
        )
      }
    );
  return /* @__PURE__ */ jsx(
    ContextMenuPrimitive.RadioGroup,
    {
      ...toContext(props)
    }
  );
}
function MenuRadioItem({
  className,
  children,
  ...rest
}) {
  const mode = React.useContext(MenuContext);
  if (mode === "dropdown") {
    return /* @__PURE__ */ jsxs(
      DropdownMenuPrimitive.RadioItem,
      {
        className: cn(CHECK_ITEM_BASE, className),
        ...toDropdown(
          rest
        ),
        children: [
          /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "fill-current size-2" }) }) }),
          children
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    ContextMenuPrimitive.RadioItem,
    {
      className: cn(CHECK_ITEM_BASE, className),
      ...toContext(rest),
      children: [
        /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(ContextMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "fill-current size-2" }) }) }),
        children
      ]
    }
  );
}
function MenuLabel({
  className,
  inset,
  children,
  ...rest
}) {
  const mode = React.useContext(MenuContext);
  const classes = cn("pds-menu-label px-3 py-1.5", inset && "pl-8", className);
  if (mode === "dropdown")
    return /* @__PURE__ */ jsx(
      DropdownMenuPrimitive.Label,
      {
        className: classes,
        ...toDropdown(rest),
        children
      }
    );
  return /* @__PURE__ */ jsx(
    ContextMenuPrimitive.Label,
    {
      className: classes,
      ...toContext(rest),
      children
    }
  );
}
function MenuSeparator({ className, ...rest }) {
  const mode = React.useContext(MenuContext);
  if (mode === "dropdown")
    return /* @__PURE__ */ jsx(
      DropdownMenuPrimitive.Separator,
      {
        className: cn("pds-menu-separator -mx-1 my-1 h-px", className),
        ...toDropdown(
          rest
        )
      }
    );
  return /* @__PURE__ */ jsx(
    ContextMenuPrimitive.Separator,
    {
      className: cn("pds-menu-separator -mx-1 my-1 h-px", className),
      ...toContext(rest)
    }
  );
}
function MenuShortcut({
  className,
  children,
  ...rest
}) {
  return /* @__PURE__ */ jsx("span", { className: cn("ml-auto text-xs tracking-widest opacity-60", className), ...rest, children });
}
function MenuSub(props) {
  const mode = React.useContext(MenuContext);
  if (mode === "dropdown")
    return /* @__PURE__ */ jsx(
      DropdownMenuPrimitive.Sub,
      {
        ...toDropdown(props)
      }
    );
  return /* @__PURE__ */ jsx(
    ContextMenuPrimitive.Sub,
    {
      ...toContext(props)
    }
  );
}
function MenuSubTrigger({
  className,
  inset,
  children,
  ...rest
}) {
  const mode = React.useContext(MenuContext);
  const classes = cn(
    "pds-menu-item pds-sub flex cursor-default select-none items-center gap-2 px-3 py-1.5 [&_svg]:pointer-events-none [&_svg]:size-4",
    inset && "pl-8",
    className
  );
  if (mode === "dropdown") {
    return /* @__PURE__ */ jsxs(
      DropdownMenuPrimitive.SubTrigger,
      {
        className: classes,
        ...toDropdown(
          rest
        ),
        children: [
          children,
          /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto size-4" })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    ContextMenuPrimitive.SubTrigger,
    {
      className: classes,
      ...toContext(rest),
      children: [
        children,
        /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto size-4" })
      ]
    }
  );
}
function MenuSubContent({
  className,
  children,
  ...rest
}) {
  const mode = React.useContext(MenuContext);
  if (mode === "dropdown") {
    return /* @__PURE__ */ jsx(
      DropdownMenuPrimitive.SubContent,
      {
        className: cn(
          "z-50 min-w-[8rem] overflow-hidden p-1 pds-menu-sub-content",
          CONTENT_ANIMATION,
          "origin-[--radix-dropdown-menu-content-transform-origin]",
          className
        ),
        ...toDropdown(
          rest
        ),
        children
      }
    );
  }
  return /* @__PURE__ */ jsx(
    ContextMenuPrimitive.SubContent,
    {
      className: cn(
        "z-50 min-w-[8rem] overflow-hidden p-1 pds-menu-sub-content",
        CONTENT_ANIMATION,
        "origin-[--radix-context-menu-content-transform-origin]",
        className
      ),
      ...toContext(rest),
      children
    }
  );
}
const Menu = Object.assign(MenuRoot, {
  Trigger: MenuTrigger,
  Content: MenuContent,
  Item: MenuItem,
  CheckboxItem: MenuCheckboxItem,
  RadioGroup: MenuRadioGroup,
  RadioItem: MenuRadioItem,
  Label: MenuLabel,
  Separator: MenuSeparator,
  Shortcut: MenuShortcut,
  Sub: MenuSub,
  SubTrigger: MenuSubTrigger,
  SubContent: MenuSubContent
});
export {
  Menu
};
