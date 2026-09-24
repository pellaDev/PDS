import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { createContext, useContext } from "react";
const SurfaceThemeContext = createContext({
  mode: "light",
  surface: "base",
  part: "dual"
});
function BaseSurfaceOnly({ children }) {
  const slot = useContext(SurfaceThemeContext);
  return slot.surface === "base" ? /* @__PURE__ */ jsx(Fragment, { children }) : null;
}
function Row({ label, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    label ? /* @__PURE__ */ jsx("p", { className: "[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground", children: label }) : null,
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center gap-3", children })
  ] });
}
function Stack({ label, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    label ? /* @__PURE__ */ jsx("p", { className: "[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground", children: label }) : null,
    /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-3", children })
  ] });
}
function Guidelines({ items }) {
  return /* @__PURE__ */ jsx("ul", { className: "space-y-2 [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light", children: items.map((item) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
    /* @__PURE__ */ jsx(
      "span",
      {
        className: `shrink-0 font-light ${item.kind === "do" ? "text-primary" : "text-destructive"}`,
        children: item.kind === "do" ? "Do" : "Don't"
      }
    ),
    /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: item.text })
  ] }, `${item.kind}-${item.text}`)) });
}
export {
  BaseSurfaceOnly,
  Guidelines,
  Row,
  Stack,
  SurfaceThemeContext
};
