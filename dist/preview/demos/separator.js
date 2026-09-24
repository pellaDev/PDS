import { jsx, jsxs } from "react/jsx-runtime";
import { Separator } from "../../components/ui/separator";
import { Stack } from "../parts";
function SeparatorDemo() {
  return /* @__PURE__ */ jsxs("div", { className: "max-w-md space-y-6 p-6", children: [
    /* @__PURE__ */ jsx(Stack, { label: "Horizontal", children: /* @__PURE__ */ jsx(Separator, {}) }),
    /* @__PURE__ */ jsx(Stack, { label: "Fading at both ends", children: /* @__PURE__ */ jsx(Separator, { fade: true }) }),
    /* @__PURE__ */ jsx(Stack, { label: "Vertical (normal / fading)", children: /* @__PURE__ */ jsxs("div", { className: "flex h-16 items-center gap-4 [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light", children: [
      /* @__PURE__ */ jsx("span", { children: "Docs" }),
      /* @__PURE__ */ jsx(Separator, { orientation: "vertical" }),
      /* @__PURE__ */ jsx("span", { children: "Components" }),
      /* @__PURE__ */ jsx(Separator, { fade: true, orientation: "vertical" }),
      /* @__PURE__ */ jsx("span", { children: "Patterns" })
    ] }) })
  ] });
}
export {
  SeparatorDemo
};
