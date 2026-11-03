import { jsx } from "react/jsx-runtime";
import { cn } from "../../lib/utils";
import { usePdsConfig } from "../../config";
import "./sticky-action-bar.css";
function StickyActionBar({
  className,
  children,
  tone,
  side = "bottom",
  ...props
}) {
  const { fieldStyle } = usePdsConfig();
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sticky-action-bar",
      "data-tone": tone ?? fieldStyle,
      "data-side": side,
      className: cn("pds-sticky-action-bar", className),
      ...props,
      children
    }
  );
}
export {
  StickyActionBar
};
