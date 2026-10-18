import { jsx } from "react/jsx-runtime";
import { cn } from "../../lib/utils";
import "./layout.css";
function Stack({ gap, className, children, ...props }) {
  return /* @__PURE__ */ jsx("div", { "data-slot": "stack", "data-gap": gap, className: cn(className), ...props, children });
}
function Row({ gap, className, children, ...props }) {
  return /* @__PURE__ */ jsx("div", { "data-slot": "row", "data-gap": gap, className: cn(className), ...props, children });
}
function Grid({
  columns = 3,
  gap,
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "grid",
      "data-gap": gap,
      style: { "--pds-grid-columns": columns },
      className: cn(className),
      ...props,
      children
    }
  );
}
function Panel({ gap, className, children, ...props }) {
  return /* @__PURE__ */ jsx("div", { "data-slot": "panel", "data-gap": gap, className: cn(className), ...props, children });
}
export {
  Grid,
  Panel,
  Row,
  Stack
};
