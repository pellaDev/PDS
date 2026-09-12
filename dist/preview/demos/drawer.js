import { jsx, jsxs } from "react/jsx-runtime";
import { Button } from "../../components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "../../components/ui/drawer";
function DrawerDemo() {
  return /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxs(Drawer, { children: [
    /* @__PURE__ */ jsx(DrawerTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", children: "Open activity" }) }),
    /* @__PURE__ */ jsx(DrawerContent, { children: /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full max-w-md", children: [
      /* @__PURE__ */ jsxs(DrawerHeader, { children: [
        /* @__PURE__ */ jsx(DrawerTitle, { children: "Recent activity" }),
        /* @__PURE__ */ jsx(DrawerDescription, { children: "Review changes made to this project." })
      ] }),
      /* @__PURE__ */ jsx(DrawerFooter, { children: /* @__PURE__ */ jsx(DrawerClose, { asChild: true, children: /* @__PURE__ */ jsx(Button, { children: "Done" }) }) })
    ] }) })
  ] }) });
}
export {
  DrawerDemo
};
