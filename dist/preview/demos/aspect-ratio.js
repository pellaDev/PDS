import { jsx, jsxs } from "react/jsx-runtime";
import { AspectRatio } from "../../components/ui/aspect-ratio";
function AspectRatioDemo() {
  return /* @__PURE__ */ jsx("div", { className: "max-w-lg overflow-hidden rounded-xl border bg-card", children: /* @__PURE__ */ jsx(AspectRatio, { ratio: 16 / 9, children: /* @__PURE__ */ jsx("div", { className: "flex h-full items-end bg-gradient-to-br from-primary/80 via-primary/40 to-muted p-6 text-primary-foreground", children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold", children: "16:9 media" }),
    /* @__PURE__ */ jsx("p", { className: "text-sm opacity-80", children: "Responsive, proportional content." })
  ] }) }) }) });
}
export {
  AspectRatioDemo
};
