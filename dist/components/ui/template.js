"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./resizable";
import "./template.css";
const Template = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      "data-slot": "template",
      className: cn("flex h-full min-h-0 flex-col", className),
      ...props
    }
  )
);
Template.displayName = "Template";
const TemplateHeader = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, "data-slot": "template-header", className: cn(className), ...props })
);
TemplateHeader.displayName = "TemplateHeader";
const TemplateFooter = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, "data-slot": "template-footer", className: cn(className), ...props })
);
TemplateFooter.displayName = "TemplateFooter";
const TemplateBody = React.forwardRef(
  ({ sidebar, defaultSidebarSize = 30, minSidebarSize = 20, children, className }, ref) => /* @__PURE__ */ jsx("div", { ref, "data-slot": "template-body", className: cn("min-h-0 flex-1", className), children: /* @__PURE__ */ jsxs(ResizablePanelGroup, { direction: "horizontal", className: "h-full w-full", children: [
    /* @__PURE__ */ jsx(ResizablePanel, { defaultSize: defaultSidebarSize, minSize: minSidebarSize, children: sidebar }),
    /* @__PURE__ */ jsx(ResizableHandle, {}),
    /* @__PURE__ */ jsx(ResizablePanel, { defaultSize: 100 - defaultSidebarSize, minSize: 40, children })
  ] }) })
);
TemplateBody.displayName = "TemplateBody";
const TemplateCanvas = React.forwardRef(
  ({ className, layout = "center", ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      "data-slot": "template-canvas",
      "data-layout": layout,
      className: cn("h-full min-h-0 w-full overflow-auto", className),
      ...props
    }
  )
);
TemplateCanvas.displayName = "TemplateCanvas";
export {
  Template,
  TemplateBody,
  TemplateCanvas,
  TemplateFooter,
  TemplateHeader
};
