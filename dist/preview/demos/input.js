import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Field } from "../../components/ui/field";
import { FolderOpen } from "lucide-react";
import { Stack } from "../parts";
function InputDemo() {
  const [fileName, setFileName] = useState("");
  return /* @__PURE__ */ jsxs("div", { className: "max-w-md space-y-6 p-6", children: [
    /* @__PURE__ */ jsxs(Stack, { label: "Types", children: [
      /* @__PURE__ */ jsx(Input, { placeholder: "Name" }),
      /* @__PURE__ */ jsx(Input, { type: "email", placeholder: "name@example.com" }),
      /* @__PURE__ */ jsx(
        Field,
        {
          type: "file",
          label: fileName || "Choose file",
          trailingIcon: /* @__PURE__ */ jsx(FolderOpen, { size: 16 }),
          className: "w-full",
          onChange: (e) => setFileName(e.target.files?.[0]?.name ?? "")
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Stack, { label: "States", children: [
      /* @__PURE__ */ jsx(Input, { defaultValue: "Read only", readOnly: true }),
      /* @__PURE__ */ jsx(Input, { placeholder: "Disabled", disabled: true }),
      /* @__PURE__ */ jsx(Input, { placeholder: "Invalid", "aria-invalid": "true" })
    ] })
  ] });
}
export {
  InputDemo
};
