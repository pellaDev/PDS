import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { createPortal } from "react-dom";
import "./tooltip.css";
function Tooltip({ content, variant = "default", children, ...props }) {
  const [anchor, setAnchor] = React.useState(null);
  const show = (element) => setAnchor(element.getBoundingClientRect());
  const hide = () => setAnchor(null);
  React.useEffect(() => {
    if (!anchor) return;
    const onInvalidate = () => setAnchor(null);
    window.addEventListener("scroll", onInvalidate, true);
    window.addEventListener("resize", onInvalidate);
    return () => {
      window.removeEventListener("scroll", onInvalidate, true);
      window.removeEventListener("resize", onInvalidate);
    };
  }, [anchor]);
  const bottom = anchor ? "calc(" + (window.innerHeight - anchor.top) + "px + var(--dim-sss))" : void 0;
  return /* @__PURE__ */ jsxs(
    "span",
    {
      className: "pds-tooltip",
      onMouseEnter: (event) => show(event.currentTarget),
      onMouseLeave: hide,
      onFocus: (event) => {
        const target = event.target;
        if (target !== event.currentTarget) show(target);
      },
      onBlur: hide,
      ...props,
      children: [
        children,
        anchor && typeof document !== "undefined" && createPortal(
          /* @__PURE__ */ jsx(
            "span",
            {
              role: "tooltip",
              className: "pds-tooltip__bubble",
              "data-variant": variant,
              style: { left: anchor.left + anchor.width / 2, bottom },
              children: content
            }
          ),
          document.body
        )
      ]
    }
  );
}
export {
  Tooltip
};
