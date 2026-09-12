import { jsx, jsxs } from "react/jsx-runtime";
import { Tooltip } from "../../components/ui/tooltip";
import { Row } from "../parts";
import { Button } from "../../components/ui/button";
function TooltipDemo() {
  return /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsx("div", { className: "space-y-5", children: /* @__PURE__ */ jsxs(Row, { label: "Variants (hover or Tab onto a trigger)", children: [
    /* @__PURE__ */ jsx(Tooltip, { content: "Default - live brand fill, graySoft text", children: /* @__PURE__ */ jsx(Button, { size: "small", children: "Hover me" }) }),
    /* @__PURE__ */ jsx(Tooltip, { variant: "alert", content: "Alert - yellow step with blackSoft text", children: /* @__PURE__ */ jsx(Button, { size: "small", children: "Hover me" }) }),
    /* @__PURE__ */ jsx(Tooltip, { variant: "error", content: "Error - red semantic fill, graySoft text", children: /* @__PURE__ */ jsx(Button, { size: "small", children: "Hover me" }) })
  ] }) }) });
}
export {
  TooltipDemo
};
