import { jsx, jsxs } from "react/jsx-runtime";
import { FolderOpen } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from "../../components/ui/empty";
function EmptyDemo() {
  return /* @__PURE__ */ jsxs(Empty, { className: "max-w-xl border [border-color:var(--pds-container-border-color)]", children: [
    /* @__PURE__ */ jsxs(EmptyHeader, { children: [
      /* @__PURE__ */ jsx(EmptyMedia, { variant: "icon", children: /* @__PURE__ */ jsx(FolderOpen, {}) }),
      /* @__PURE__ */ jsx(EmptyTitle, { children: "No projects yet" }),
      /* @__PURE__ */ jsx(EmptyDescription, { children: "Create a project to start organizing your work." })
    ] }),
    /* @__PURE__ */ jsx(EmptyContent, { children: /* @__PURE__ */ jsx(Button, { children: "Create project" }) })
  ] });
}
export {
  EmptyDemo
};
