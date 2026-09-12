import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import "./switch.css";
const Switch = React.forwardRef(function Switch2({ label, disabled, ...props }, ref) {
  return /* @__PURE__ */ jsx("label", { style: { display: "inline-flex" }, children: /* @__PURE__ */ jsxs("span", { className: "pds-toggle", "data-disabled": disabled || void 0, children: [
    /* @__PURE__ */ jsx("input", { ref, type: "checkbox", disabled, ...props }),
    /* @__PURE__ */ jsx("span", { className: "pds-toggle__switch", "aria-hidden": true, children: /* @__PURE__ */ jsx("span", { className: "pds-toggle__thumb" }) }),
    label ? /* @__PURE__ */ jsx("span", { style: { display: "inline-flex", alignItems: "center" }, children: label }) : null
  ] }) });
});
Switch.displayName = "Pella Switch";
export {
  Switch
};
