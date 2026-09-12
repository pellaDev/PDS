import { jsx, jsxs } from "react/jsx-runtime";
import { Button } from "../../components/ui/button";
import { ToastAction } from "../../components/ui/toast";
import { Toaster } from "../../components/ui/toaster";
import { toast } from "../../hooks/use-toast";
import { Row } from "../parts";
function ToastDemo() {
  return /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
    /* @__PURE__ */ jsxs(Row, { label: "Notifications", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: () => toast({
            title: "Changes saved",
            description: "Your project settings are up to date."
          }),
          children: "Show toast"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "destructive",
          onClick: () => toast({
            variant: "destructive",
            title: "Upload failed",
            description: "The file could not be uploaded.",
            action: /* @__PURE__ */ jsx(ToastAction, { altText: "Retry upload", children: "Retry" })
          }),
          children: "Show error"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Toaster, {})
  ] });
}
export {
  ToastDemo
};
