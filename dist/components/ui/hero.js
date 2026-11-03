import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/utils";
import { Row, Stack } from "./layout";
import "./hero.css";
function Hero({
  image,
  title,
  tags,
  media,
  subheadline,
  cards,
  actions,
  className,
  style,
  ...props
}) {
  const heroStyle = image ? {
    ...style,
    backgroundImage: `linear-gradient(to bottom, transparent, var(--color-surface-card) var(--pds-hero-fade-stop)), url(${image})`
  } : style;
  return /* @__PURE__ */ jsxs("div", { "data-slot": "hero", className: cn("pds-hero", className), style: heroStyle, ...props, children: [
    /* @__PURE__ */ jsxs(Row, { gap: "m", className: "pds-hero-head", children: [
      /* @__PURE__ */ jsxs(Stack, { gap: "s", className: "pds-hero-column", children: [
        title ? /* @__PURE__ */ jsx("span", { "data-slot": "hero-title", children: title }) : null,
        tags ? /* @__PURE__ */ jsx(Row, { gap: "s", className: "pds-hero-tags", children: tags }) : null
      ] }),
      media ? /* @__PURE__ */ jsx("div", { "data-slot": "hero-media", children: media }) : null
    ] }),
    /* @__PURE__ */ jsxs(Stack, { gap: "m", className: "pds-hero-foot", children: [
      subheadline ? /* @__PURE__ */ jsx("span", { "data-slot": "hero-subheadline", children: subheadline }) : null,
      cards ? /* @__PURE__ */ jsx(Row, { gap: "s", className: "pds-hero-cards", children: cards }) : null,
      actions ? /* @__PURE__ */ jsx(Row, { gap: "s", className: "pds-hero-actions", children: actions }) : null
    ] })
  ] });
}
export {
  Hero
};
