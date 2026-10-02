"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
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
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      "data-slot": "template-header",
      "data-pds-surface": "alternate",
      className: cn(className),
      ...props
    }
  )
);
TemplateHeader.displayName = "TemplateHeader";
const TemplateFooter = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      "data-slot": "template-footer",
      "data-pds-surface": "alternate",
      className: cn(className),
      ...props
    }
  )
);
TemplateFooter.displayName = "TemplateFooter";
const TemplateSubHeader = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, "data-slot": "template-subheader", className: cn(className), ...props })
);
TemplateSubHeader.displayName = "TemplateSubHeader";
const TemplateBody = React.forwardRef(
  ({
    subHeader,
    sidebar,
    rightSidebar,
    defaultSidebarSize = 30,
    minSidebarSize = 20,
    defaultRightSidebarSize = 30,
    minRightSidebarSize = 20,
    children,
    className
  }, ref) => {
    const hasLeft = sidebar != null;
    const hasRight = rightSidebar != null;
    const canvasSize = 100 - (hasLeft ? defaultSidebarSize : 0) - (hasRight ? defaultRightSidebarSize : 0);
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        "data-slot": "template-body",
        className: cn("flex min-h-0 flex-1 flex-col", className),
        children: [
          subHeader,
          /* @__PURE__ */ jsxs(
            ResizablePanelGroup,
            {
              direction: "horizontal",
              className: "min-h-0 flex-1 w-full",
              children: [
                hasLeft && /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(ResizablePanel, { defaultSize: defaultSidebarSize, minSize: minSidebarSize, children: sidebar }),
                  /* @__PURE__ */ jsx(ResizableHandle, {})
                ] }),
                /* @__PURE__ */ jsx(ResizablePanel, { defaultSize: canvasSize, minSize: 40, children }),
                hasRight && /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(ResizableHandle, {}),
                  /* @__PURE__ */ jsx(ResizablePanel, { defaultSize: defaultRightSidebarSize, minSize: minRightSidebarSize, children: rightSidebar })
                ] })
              ]
            },
            `${hasLeft}|${hasRight}`
          )
        ]
      }
    );
  }
);
TemplateBody.displayName = "TemplateBody";
const TemplateCanvas = React.forwardRef(
  ({ className, layout = "center", ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      "data-slot": "template-canvas",
      "data-pds-surface": "alternate",
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
  TemplateHeader,
  TemplateSubHeader
};
