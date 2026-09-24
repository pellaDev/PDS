import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils";
import "./radio.css";
const Radio = React.forwardRef(
  ({ className, label, disabled, ...props }, ref) => /* @__PURE__ */ jsxs("label", { className: cn("pds-radio", className), ...disabled ? { "data-disabled": true } : {}, children: [
    /* @__PURE__ */ jsx("input", { type: "radio", ref, disabled, ...props }),
    /* @__PURE__ */ jsx("span", { children: label })
  ] })
);
Radio.displayName = "Radio";
export {
  Radio
};
