import { jsx, jsxs } from "react/jsx-runtime";
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";
function ScrollAreaDemo() {
  return /* @__PURE__ */ jsxs("div", { className: "grid max-w-2xl gap-4 md:grid-cols-2", children: [
    /* @__PURE__ */ jsx(ScrollArea, { className: "h-48 rounded-xl border bg-card p-4", children: /* @__PURE__ */ jsx("div", { className: "space-y-3 pr-4", children: Array.from({ length: 12 }, (_, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "border-b pb-3 [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light last:border-0",
        children: [
          "Activity item ",
          index + 1
        ]
      },
      index
    )) }) }),
    /* @__PURE__ */ jsxs(ScrollArea, { className: "w-full rounded-xl border bg-card p-4", children: [
      /* @__PURE__ */ jsx("div", { className: "flex w-max gap-3 pb-3", children: ["Alpha", "Beta", "Gamma", "Delta", "Epsilon"].map((label) => /* @__PURE__ */ jsx(
        "div",
        {
          className: "flex h-32 w-32 items-end rounded-lg bg-muted p-3 [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light",
          children: label
        },
        label
      )) }),
      /* @__PURE__ */ jsx(ScrollBar, { orientation: "horizontal" })
    ] })
  ] });
}
export {
  ScrollAreaDemo
};
