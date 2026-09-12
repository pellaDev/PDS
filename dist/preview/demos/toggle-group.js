import { jsx, jsxs } from "react/jsx-runtime";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import {
  ToggleGroup,
  ToggleGroupItem
} from "../../components/ui/toggle-group";
import { Stack } from "../parts";
function ToggleGroupDemo() {
  return /* @__PURE__ */ jsxs("div", { className: "max-w-sm space-y-6 p-6", children: [
    /* @__PURE__ */ jsx(Stack, { label: "Single selection", children: /* @__PURE__ */ jsxs(ToggleGroup, { type: "single", defaultValue: "left", children: [
      /* @__PURE__ */ jsx(ToggleGroupItem, { value: "left", "aria-label": "Align left", children: /* @__PURE__ */ jsx(AlignLeft, {}) }),
      /* @__PURE__ */ jsx(ToggleGroupItem, { value: "center", "aria-label": "Align center", children: /* @__PURE__ */ jsx(AlignCenter, {}) }),
      /* @__PURE__ */ jsx(ToggleGroupItem, { value: "right", "aria-label": "Align right", children: /* @__PURE__ */ jsx(AlignRight, {}) })
    ] }) }),
    /* @__PURE__ */ jsx(Stack, { label: "Multiple selection", children: /* @__PURE__ */ jsxs(ToggleGroup, { type: "multiple", size: "sm", defaultValue: ["bold"], children: [
      /* @__PURE__ */ jsx(ToggleGroupItem, { value: "bold", children: "Bold" }),
      /* @__PURE__ */ jsx(ToggleGroupItem, { value: "italic", children: "Italic" })
    ] }) })
  ] });
}
export {
  ToggleGroupDemo
};
