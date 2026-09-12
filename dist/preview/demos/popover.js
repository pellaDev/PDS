import { jsx, jsxs } from "react/jsx-runtime";
import { Button } from "../../components/ui/button";
import { Field } from "../../components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "../../components/ui/popover";
function PopoverDemo() {
  return /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxs(Popover, { children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", children: "Set dimensions" }) }),
    /* @__PURE__ */ jsxs(PopoverContent, { className: "space-y-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "font-medium", children: "Dimensions" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Set a fixed width for the panel." })
      ] }),
      /* @__PURE__ */ jsx(Field, { size: "sm", tone: "outline", label: "Width", defaultValue: "320" })
    ] })
  ] }) });
}
export {
  PopoverDemo
};
