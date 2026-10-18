import { jsx } from "react/jsx-runtime";
import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import "./toggle.css";
const toggleVariants = cva(
  "pds-toggle-btn inline-flex items-center justify-center gap-2 rounded-md [min-height:var(--pds-touch-min)] transition-colors hover-elevate active-elevate-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "pds-toggle-btn--ghost"
      },
      size: {
        sm: "h-8 min-w-8 px-2",
        default: "h-10 min-w-10 px-2",
        lg: "h-12 min-w-12 px-3"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const ToggleGroupContext = React.createContext({
  size: "default",
  variant: "default"
});
const Toggle = React.forwardRef(
  ({ className, variant, size, type, asItem, children, ...props }, ref) => {
    const context = React.useContext(ToggleGroupContext);
    if (asItem) {
      return /* @__PURE__ */ jsx(
        ToggleGroupPrimitive.Item,
        {
          ref,
          className: cn(
            toggleVariants({ variant: context.variant || variant, size: context.size || size }),
            "[flex:var(--pds-item-grow)_1_auto]",
            className
          ),
          ...props,
          children
        }
      );
    }
    if (type) {
      return /* @__PURE__ */ jsx(
        ToggleGroupPrimitive.Root,
        {
          ref,
          className: cn(
            "flex items-center justify-center gap-1 [flex-wrap:var(--pds-row-wrap)] [width:var(--pds-block-width)]",
            className
          ),
          ...{ ...props, type },
          children: /* @__PURE__ */ jsx(ToggleGroupContext.Provider, { value: { variant, size }, children })
        }
      );
    }
    return /* @__PURE__ */ jsx(
      TogglePrimitive.Root,
      {
        ref,
        className: cn(toggleVariants({ variant, size }), className),
        ...props,
        children
      }
    );
  }
);
Toggle.displayName = "Toggle";
export {
  Toggle,
  toggleVariants
};
