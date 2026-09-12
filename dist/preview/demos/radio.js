import { jsx, jsxs } from "react/jsx-runtime";
import { Radio } from "../../components/ui/radio";
import { BaseSurfaceOnly, Row } from "../parts";
function RadioDemo() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 p-6 text-card-foreground", children: [
    /* @__PURE__ */ jsx(BaseSurfaceOnly, { children: /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Disabled: the whole row (control + label) drops to opacity 0.32 per sys.opacity.disabled; selected + disabled keeps the brand dot under the same fade." }) }),
    /* @__PURE__ */ jsxs(Row, { label: "States", children: [
      /* @__PURE__ */ jsx(Radio, { name: "states", defaultChecked: true, label: "Selected" }),
      /* @__PURE__ */ jsx(Radio, { name: "states", label: "Unselected" }),
      /* @__PURE__ */ jsx(Radio, { name: "states-disabled", disabled: true, defaultChecked: true, label: "Selected, disabled" }),
      /* @__PURE__ */ jsx(Radio, { name: "states-disabled", disabled: true, label: "Unselected, disabled" })
    ] }),
    /* @__PURE__ */ jsxs(Row, { label: "Group (shared name \u2014 try it)", children: [
      /* @__PURE__ */ jsx(Radio, { name: "grp1", defaultValue: "", label: "Option one", value: "a" }),
      /* @__PURE__ */ jsx(Radio, { name: "grp1", label: "Option two", value: "b" }),
      /* @__PURE__ */ jsx(Radio, { name: "grp1", label: "Option three", value: "c" })
    ] })
  ] });
}
export {
  RadioDemo
};
