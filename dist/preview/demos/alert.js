import { jsx, jsxs } from "react/jsx-runtime";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { Stack } from "../parts";
function AlertDemo() {
  return /* @__PURE__ */ jsx("div", { className: "max-w-xl p-6", children: /* @__PURE__ */ jsxs(Stack, { label: "Variants", children: [
    /* @__PURE__ */ jsxs(Alert, { children: [
      /* @__PURE__ */ jsx(CheckCircle2, {}),
      /* @__PURE__ */ jsx(AlertTitle, { children: "Deployment complete" }),
      /* @__PURE__ */ jsx(AlertDescription, { children: "Your latest changes are now live." })
    ] }),
    /* @__PURE__ */ jsxs(Alert, { variant: "destructive", children: [
      /* @__PURE__ */ jsx(AlertCircle, {}),
      /* @__PURE__ */ jsx(AlertTitle, { children: "Connection failed" }),
      /* @__PURE__ */ jsx(AlertDescription, { children: "Check your credentials and try again." })
    ] })
  ] }) });
}
export {
  AlertDemo
};
