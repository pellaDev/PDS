import { jsx, jsxs } from "react/jsx-runtime";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../../components/ui/dialog";
function DialogDemo() {
  return /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { children: "Edit profile" }) }),
    /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Edit profile" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Update the details shown to your teammates." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-md border bg-muted p-4 [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light", children: "Profile settings appear here." }),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsx(DialogClose, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "link", children: "Cancel" }) }),
        /* @__PURE__ */ jsx(DialogClose, { asChild: true, children: /* @__PURE__ */ jsx(Button, { children: "Save changes" }) })
      ] })
    ] })
  ] }) });
}
export {
  DialogDemo
};
