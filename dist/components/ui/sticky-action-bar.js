import { jsx } from "react/jsx-runtime";
import { cn } from "../../lib/utils";
import "./sticky-action-bar.css";
function StickyActionBar({ className, children, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sticky-action-bar",
      className: cn("pds-sticky-action-bar", className),
      ...props,
      children
    }
  );
}
export {
  StickyActionBar
};
