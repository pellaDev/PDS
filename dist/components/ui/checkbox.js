import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils";
import "./checkbox.css";
const Checkbox = React.forwardRef(
  ({ className, label, disabled, ...props }, ref) => /* @__PURE__ */ jsxs(
    "label",
    {
      className: cn("pds-checkbox", className),
      ...disabled ? { "data-disabled": true } : {},
      children: [
        /* @__PURE__ */ jsx("input", { type: "checkbox", ref, disabled, ...props }),
        /* @__PURE__ */ jsx("span", { className: "pds-checkbox__icon", "aria-hidden": true, children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 16 16", width: "16", height: "16", children: /* @__PURE__ */ jsx(
          "path",
          {
            d: "M3.4 8.6l3 3L12.6 5",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.9",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ) }) }),
        /* @__PURE__ */ jsx("span", { children: label })
      ]
    }
  )
);
Checkbox.displayName = "Checkbox";
export {
  Checkbox
};
