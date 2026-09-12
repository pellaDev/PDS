import { jsx } from "react/jsx-runtime";
import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "../../lib/utils";
import "./separator.css";
const Separator = React.forwardRef(
  ({ className, orientation = "horizontal", decorative = true, fade, ...props }, ref) => /* @__PURE__ */ jsx(
    SeparatorPrimitive.Root,
    {
      ref,
      decorative,
      orientation,
      "data-orientation": orientation,
      className: cn(
        "shrink-0",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        fade === void 0 ? "pds-separator--auto" : fade ? orientation === "horizontal" ? "[background-image:linear-gradient(to_right,transparent_0%,var(--color-separator)_12%,var(--color-separator)_88%,transparent_100%)]" : "[background-image:linear-gradient(to_bottom,transparent_0%,var(--color-separator)_12%,var(--color-separator)_88%,transparent_100%)]" : "bg-separator",
        className
      ),
      ...props
    }
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;
export {
  Separator
};
