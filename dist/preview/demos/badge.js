import { jsx, jsxs } from "react/jsx-runtime";
import { Badge } from "../../components/ui/badge";
import { Row } from "../parts";
function BadgeDemo() {
  return /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
    /* @__PURE__ */ jsxs(Row, { label: "Numbered \xB7 0\u20139, then '..'", children: [
      /* @__PURE__ */ jsx(Badge, { shape: "numbered", variant: "default", count: 3 }),
      /* @__PURE__ */ jsx(Badge, { shape: "numbered", variant: "default", count: 7 }),
      /* @__PURE__ */ jsx(Badge, { shape: "numbered", variant: "default", count: 12 }),
      /* @__PURE__ */ jsx(Badge, { shape: "numbered", variant: "error", count: 5 }),
      /* @__PURE__ */ jsx(Badge, { shape: "numbered", variant: "alert", count: 99 })
    ] }),
    /* @__PURE__ */ jsx(Row, { label: "Dot \xB7 no content", children: ["default", "ready", "alert", "error"].map((v) => /* @__PURE__ */ jsx(Badge, { shape: "simple", variant: v }, v)) }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-1 pt-2 font-mono text-[10px] leading-relaxed text-muted-foreground", children: [
      /* @__PURE__ */ jsx("p", { children: 'Two cases only: a number (single digit 0\u20139, ".." when the value exceeds 9) or nothing - a perfect round dot.' }),
      /* @__PURE__ */ jsx("p", { children: "Both shapes are fixed-size circles so they stay round with or without a value: numbered = dim-mmm (20px), dot = dim-s (12px)." }),
      /* @__PURE__ */ jsx("p", { children: "Fills ride the live brand tokens (default --primary, error --destructive, alert --accent wash, ready --success); disabled adds opacity var(--opacity-disabled)." })
    ] })
  ] });
}
export {
  BadgeDemo
};
