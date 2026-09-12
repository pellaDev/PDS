import { jsx, jsxs } from "react/jsx-runtime";
import { Textarea } from "../../components/ui/textarea";
import { Stack } from "../parts";
function TextareaDemo() {
  return /* @__PURE__ */ jsxs("div", { className: "max-w-md space-y-6 p-6", children: [
    /* @__PURE__ */ jsx(Stack, { label: "Default", children: /* @__PURE__ */ jsx(Textarea, { placeholder: "Add context for your team" }) }),
    /* @__PURE__ */ jsx(Stack, { label: "Outline", children: /* @__PURE__ */ jsx(Textarea, { tone: "outline", placeholder: "Add context for your team" }) }),
    /* @__PURE__ */ jsxs(Stack, { label: "States", children: [
      /* @__PURE__ */ jsx(Textarea, { "aria-invalid": true, defaultValue: "A concise project update." }),
      /* @__PURE__ */ jsx(Textarea, { placeholder: "Disabled", disabled: true })
    ] })
  ] });
}
export {
  TextareaDemo
};
