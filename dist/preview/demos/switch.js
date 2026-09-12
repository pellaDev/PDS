import { jsx, jsxs } from "react/jsx-runtime";
import { Switch } from "../../components/ui/switch";
import { Row } from "../parts";
function SwitchDemo() {
  return /* @__PURE__ */ jsx("div", { className: "space-y-6 p-6 text-card-foreground", children: /* @__PURE__ */ jsxs(Row, { label: "States", children: [
    /* @__PURE__ */ jsx(Switch, { name: "st-off", label: "Off" }),
    /* @__PURE__ */ jsx(Switch, { name: "st-on", defaultChecked: true, label: "On" }),
    /* @__PURE__ */ jsx(Switch, { disabled: true, label: "Off, disabled" }),
    /* @__PURE__ */ jsx(Switch, { disabled: true, defaultChecked: true, label: "On, disabled" })
  ] }) });
}
export {
  SwitchDemo
};
