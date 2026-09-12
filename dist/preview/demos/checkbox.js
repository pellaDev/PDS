import { jsx, jsxs } from "react/jsx-runtime";
import { Checkbox } from "../../components/ui/checkbox";
import { BaseSurfaceOnly, Row } from "../parts";
function CheckboxDemo() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 p-6 text-card-foreground", children: [
    /* @__PURE__ */ jsx(BaseSurfaceOnly, { children: /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Disabled: the whole row (control + label) drops to opacity 0.32 per sys.opacity.disabled; checked + disabled keeps the brand fill under the same fade." }) }),
    /* @__PURE__ */ jsxs(Row, { label: "States", children: [
      /* @__PURE__ */ jsx(Checkbox, { defaultChecked: true, label: "Checked" }),
      /* @__PURE__ */ jsx(Checkbox, { label: "Unchecked" }),
      /* @__PURE__ */ jsx(Checkbox, { disabled: true, defaultChecked: true, label: "Checked, disabled" }),
      /* @__PURE__ */ jsx(Checkbox, { disabled: true, label: "Unchecked, disabled" })
    ] })
  ] });
}
export {
  CheckboxDemo
};
