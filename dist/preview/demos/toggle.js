import { jsx, jsxs } from "react/jsx-runtime";
import { Bold, Italic, Underline } from "lucide-react";
import { Toggle } from "../../components/ui/toggle";
import { Row } from "../parts";
function ToggleDemo() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 p-6", children: [
    /* @__PURE__ */ jsxs(Row, { label: "Icon (icon inside)", children: [
      /* @__PURE__ */ jsx(Toggle, { "aria-label": "Bold", defaultPressed: true, children: /* @__PURE__ */ jsx(Bold, {}) }),
      /* @__PURE__ */ jsx(Toggle, { "aria-label": "Italic", children: /* @__PURE__ */ jsx(Italic, {}) }),
      /* @__PURE__ */ jsx(Toggle, { "aria-label": "Underline", children: /* @__PURE__ */ jsx(Underline, {}) })
    ] }),
    /* @__PURE__ */ jsxs(Row, { label: "Text (plain text)", children: [
      /* @__PURE__ */ jsx(Toggle, { defaultPressed: true, children: "Bold" }),
      /* @__PURE__ */ jsx(Toggle, { children: "Italic" }),
      /* @__PURE__ */ jsx(Toggle, { children: "Underline" }),
      /* @__PURE__ */ jsx(Toggle, { size: "sm", defaultPressed: true, children: "Bold" }),
      /* @__PURE__ */ jsx(Toggle, { size: "sm", children: "Italic" }),
      /* @__PURE__ */ jsx(Toggle, { size: "sm", children: "Underline" })
    ] }),
    /* @__PURE__ */ jsxs(Row, { label: "Sizes and states", children: [
      /* @__PURE__ */ jsx(Toggle, { size: "sm", "aria-label": "Small", children: /* @__PURE__ */ jsx(Bold, {}) }),
      /* @__PURE__ */ jsx(Toggle, { size: "lg", "aria-label": "Large", children: /* @__PURE__ */ jsx(Bold, {}) }),
      /* @__PURE__ */ jsx(Toggle, { disabled: true, "aria-label": "Disabled bold", children: /* @__PURE__ */ jsx(Bold, {}) })
    ] })
  ] });
}
export {
  ToggleDemo
};
