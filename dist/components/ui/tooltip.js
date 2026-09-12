import { jsx, jsxs } from "react/jsx-runtime";
import "./tooltip.css";
function Tooltip({ content, variant = "default", children, ...props }) {
  return /* @__PURE__ */ jsxs("span", { className: "pds-tooltip", ...props, children: [
    children,
    /* @__PURE__ */ jsx("span", { role: "tooltip", className: "pds-tooltip__bubble", "data-variant": variant, children: content })
  ] });
}
Tooltip.displayName = "Pella Tooltip";
export {
  Tooltip
};
