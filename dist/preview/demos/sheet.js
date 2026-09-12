import { jsx, jsxs } from "react/jsx-runtime";
import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "../../components/ui/sheet";
function SheetDemo() {
  return /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxs(Sheet, { children: [
    /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", children: "Open settings" }) }),
    /* @__PURE__ */ jsxs(SheetContent, { side: "right", children: [
      /* @__PURE__ */ jsxs(SheetHeader, { children: [
        /* @__PURE__ */ jsx(SheetTitle, { children: "Workspace settings" }),
        /* @__PURE__ */ jsx(SheetDescription, { children: "Configure members, access, and notifications." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "my-6 rounded-md border p-4 text-sm text-muted-foreground", children: "Settings content" }),
      /* @__PURE__ */ jsx(SheetFooter, { children: /* @__PURE__ */ jsx(SheetClose, { asChild: true, children: /* @__PURE__ */ jsx(Button, { children: "Save" }) }) })
    ] })
  ] }) });
}
export {
  SheetDemo
};
