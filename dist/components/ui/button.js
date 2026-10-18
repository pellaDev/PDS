import { jsx } from "react/jsx-runtime";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Tooltip } from "./tooltip";
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-light [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-[var(--opacity-disabled)] [&_svg]:pointer-events-none [&_svg]:shrink-0 hover-elevate active-elevate-2 [min-height:var(--pds-control-min,_var(--pds-touch-min))]",
  {
    variants: {
      size: {
        mini: "h-6 w-6 [--pds-control-min:auto] [&_svg]:size-4",
        small: "h-8 px-3 [&_svg]:size-4",
        large: "h-10 px-6 [&_svg]:size-4",
        special: "flex-col size-[4.5rem] min-h-[4.5rem] min-w-[4.5rem] gap-1.5 overflow-hidden p-3 [&_svg]:size-5",
        icon: "h-10 w-10 [&_svg]:size-4"
      },
      variant: {
        default: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        link: "no-default-hover-elevate no-default-active-elevate bg-transparent p-0 text-primary underline-offset-4 hover:underline"
      }
    },
    defaultVariants: { variant: "default", size: "small" }
  }
);
function truncateLabel(children) {
  return React.Children.map(
    children,
    (child) => typeof child === "string" || typeof child === "number" ? /* @__PURE__ */ jsx("span", { className: "max-w-full truncate", children: child }) : child
  );
}
function Button({
  className,
  variant,
  size,
  asChild = false,
  tooltip,
  children,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  const buttonEl = /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props,
      children: size === "special" && !asChild ? truncateLabel(children) : children
    }
  );
  if (!asChild && (size === "mini" || size === "small")) {
    const label = tooltip ?? props.title ?? props["aria-label"];
    if (label) return /* @__PURE__ */ jsx(Tooltip, { content: String(label), children: buttonEl });
  }
  return buttonEl;
}
export {
  Button,
  buttonVariants
};
