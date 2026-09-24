import { jsx, jsxs } from "react/jsx-runtime";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "../../components/ui/collapsible";
function CollapsibleDemo() {
  return /* @__PURE__ */ jsxs(Collapsible, { className: "max-w-md space-y-2 p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsx("p", { className: "[font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light", children: "3 linked repositories" }),
      /* @__PURE__ */ jsx(CollapsibleTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "link", size: "icon", "aria-label": "Toggle repositories", children: /* @__PURE__ */ jsx(ChevronsUpDown, {}) }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "rounded-md border px-4 py-2 font-mono [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light", children: "web-app" }),
    /* @__PURE__ */ jsxs(CollapsibleContent, { className: "space-y-2", children: [
      /* @__PURE__ */ jsx("div", { className: "rounded-md border px-4 py-2 font-mono [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light", children: "api" }),
      /* @__PURE__ */ jsx("div", { className: "rounded-md border px-4 py-2 font-mono [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light", children: "docs" })
    ] })
  ] });
}
export {
  CollapsibleDemo
};
