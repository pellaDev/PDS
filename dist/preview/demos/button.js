import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, Bell, Loader2, Mail, Pencil, Sparkles } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Tooltip } from "../../components/ui/tooltip";
import { Row } from "../parts";
function ButtonDemo() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 p-6 text-card-foreground", children: [
    /* @__PURE__ */ jsx(Row, { label: "Mini \u2014 icon only, with tooltip", children: /* @__PURE__ */ jsx(Tooltip, { content: "Edit", children: /* @__PURE__ */ jsx(Button, { size: "mini", "aria-label": "Edit", children: /* @__PURE__ */ jsx(Pencil, {}) }) }) }),
    /* @__PURE__ */ jsx(Row, { label: "Small \u2014 icon only, with tooltip", children: /* @__PURE__ */ jsx(Tooltip, { content: "Send mail", children: /* @__PURE__ */ jsx(Button, { size: "icon", "aria-label": "Send mail", children: /* @__PURE__ */ jsx(Mail, {}) }) }) }),
    /* @__PURE__ */ jsxs(Row, { label: "Small \u2014 label, optional icon on the left or right", children: [
      /* @__PURE__ */ jsx(Button, { size: "small", children: "Label" }),
      /* @__PURE__ */ jsxs(Button, { size: "small", children: [
        /* @__PURE__ */ jsx(Mail, {}),
        "Label"
      ] }),
      /* @__PURE__ */ jsxs(Button, { size: "small", children: [
        "Label",
        /* @__PURE__ */ jsx(ArrowRight, {})
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Row, { label: "Large \u2014 label, optional icon on the left or right", children: [
      /* @__PURE__ */ jsx(Button, { size: "large", children: "Label" }),
      /* @__PURE__ */ jsxs(Button, { size: "large", children: [
        /* @__PURE__ */ jsx(Mail, {}),
        "Label"
      ] }),
      /* @__PURE__ */ jsxs(Button, { size: "large", children: [
        "Label",
        /* @__PURE__ */ jsx(ArrowRight, {})
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Row, { label: "Special \u2014 square, icon over label", children: [
      /* @__PURE__ */ jsxs(Button, { size: "special", children: [
        /* @__PURE__ */ jsx(Sparkles, {}),
        "Save"
      ] }),
      /* @__PURE__ */ jsxs(Button, { size: "special", children: [
        /* @__PURE__ */ jsx(Bell, {}),
        "Alerts"
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Row, { label: "States", children: [
      /* @__PURE__ */ jsx(Button, { size: "small", disabled: true, children: "Disabled" }),
      /* @__PURE__ */ jsxs(Button, { size: "small", disabled: true, children: [
        /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }),
        "Loading"
      ] }),
      /* @__PURE__ */ jsx(Button, { size: "small", variant: "link", children: "Link" }),
      /* @__PURE__ */ jsx(Button, { size: "small", variant: "destructive", children: "Destructive" })
    ] })
  ] });
}
export {
  ButtonDemo
};
