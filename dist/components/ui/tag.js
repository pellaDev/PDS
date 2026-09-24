import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";
const tagVariants = cva(
  "inline-flex items-center whitespace-nowrap border-transparent font-light font-sans [border-radius:var(--radius-sm)] [padding-inline:var(--dim-sss)] [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] [letter-spacing:0.25px]",
  {
    variants: {
      variant: {
        // fill pella.sys.color.custom.light - theme-aware primary role (#204384 light / #6C8FCB dark).
        default: "bg-primary text-primary-foreground",
        // fill pella.sys.color.red via semantic.error (#EE1F25 in both themes).
        error: "bg-destructive text-destructive-foreground",
        // fill pella.sys.color.yellow via semantic.alert (#CFEC14), dark label per accent foreground.
        alert: "bg-accent text-accent-foreground",
        // fill pella.sys.color.green - light #218A38 / dark #5BB86B, readable labels on both themes.
        ready: "bg-success text-success-foreground",
        // original disabled state: same container fill as default plus opacity.disabled on the whole pill.
        disabled: "bg-primary text-primary-foreground [opacity:var(--opacity-disabled)]"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Tag({ className, variant, onDismiss, children, ...props }) {
  return /* @__PURE__ */ jsxs(
    "span",
    {
      className: cn(tagVariants({ variant }), onDismiss && "hover-elevate", className),
      ...props,
      children: [
        children,
        onDismiss ? /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            "aria-label": "Remove tag",
            onClick: onDismiss,
            className: "ml-1 inline-flex items-center justify-center rounded-full opacity-60 transition-opacity hover:opacity-100",
            children: /* @__PURE__ */ jsx(X, { size: 12, strokeWidth: 2.5 })
          }
        ) : null
      ]
    }
  );
}
function TagToggle({ className, variant, defaultOn = true, children }) {
  const [on, setOn] = React.useState(defaultOn);
  if (!on) {
    return /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        "aria-label": "Enable tag",
        onClick: () => setOn(true),
        className: cn(
          tagVariants({ variant: "disabled" }),
          "cursor-pointer hover-elevate",
          className
        ),
        children
      }
    );
  }
  return /* @__PURE__ */ jsxs("span", { className: cn(tagVariants({ variant }), "hover-elevate cursor-pointer", className), children: [
    children,
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        "aria-label": "Disable tag",
        onClick: () => setOn(false),
        className: "ml-1 inline-flex items-center justify-center rounded-full opacity-60 transition-opacity hover:opacity-100",
        children: /* @__PURE__ */ jsx(X, { size: 12, strokeWidth: 2.5 })
      }
    )
  ] });
}
export {
  Tag,
  TagToggle,
  tagVariants
};
