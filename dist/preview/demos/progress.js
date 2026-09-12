import { jsx, jsxs } from "react/jsx-runtime";
import { Progress } from "../../components/ui/progress";
import { Stack } from "../parts";
function ProgressDemo() {
  return /* @__PURE__ */ jsxs("div", { className: "max-w-md space-y-6 p-6", children: [
    /* @__PURE__ */ jsx(Stack, { label: "Upload 64%", children: /* @__PURE__ */ jsx(Progress, { value: 64 }) }),
    /* @__PURE__ */ jsx(Stack, { label: "Complete", children: /* @__PURE__ */ jsx(Progress, { value: 100 }) }),
    /* @__PURE__ */ jsx(Stack, { label: "Waiting", children: /* @__PURE__ */ jsx(Progress, { value: 0 }) })
  ] });
}
export {
  ProgressDemo
};
