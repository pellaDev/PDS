import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { Toaster } from "../../components/ui/sonner";
import { Row } from "../parts";
function SonnerDemo() {
  return /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
    /* @__PURE__ */ jsxs(Row, { label: "Notifications", children: [
      /* @__PURE__ */ jsx(Button, { onClick: () => toast.success("Project published"), children: "Success" }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "link",
          onClick: () => toast("Invitation sent", {
            description: "alex@example.com can now join the workspace.",
            action: { label: "Undo", onClick: () => void 0 }
          }),
          children: "With action"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Toaster, {})
  ] });
}
export {
  SonnerDemo
};
