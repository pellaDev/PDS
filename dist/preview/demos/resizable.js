import { jsx, jsxs } from "react/jsx-runtime";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "../../components/ui/resizable";
function PanelBody({ label, muted = false }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: muted ? "flex h-full items-center justify-center bg-muted [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light" : "flex h-full items-center justify-center [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light",
      children: label
    }
  );
}
function Panels() {
  return /* @__PURE__ */ jsxs(ResizablePanelGroup, { direction: "horizontal", children: [
    /* @__PURE__ */ jsx(ResizablePanel, { defaultSize: 35, minSize: 18, children: /* @__PURE__ */ jsx(PanelBody, { label: "Navigation", muted: true }) }),
    /* @__PURE__ */ jsx(ResizableHandle, { className: "pds-resizable-handle" }),
    /* @__PURE__ */ jsx(ResizablePanel, { defaultSize: 65, minSize: 30, children: /* @__PURE__ */ jsxs(ResizablePanelGroup, { direction: "vertical", children: [
      /* @__PURE__ */ jsx(ResizablePanel, { defaultSize: 62, children: /* @__PURE__ */ jsx(PanelBody, { label: "Canvas" }) }),
      /* @__PURE__ */ jsx(ResizableHandle, { className: "pds-resizable-handle" }),
      /* @__PURE__ */ jsx(ResizablePanel, { defaultSize: 38, children: /* @__PURE__ */ jsx(PanelBody, { label: "Console", muted: true }) })
    ] }) })
  ] });
}
function ResizableDemo() {
  return /* @__PURE__ */ jsx("div", { className: "max-w-2xl", children: /* @__PURE__ */ jsxs("figure", { className: "m-0", children: [
    /* @__PURE__ */ jsx("figcaption", { className: "mb-2 [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground", children: "Field style segue il default della sidebar (fill/outline)" }),
    /* @__PURE__ */ jsx("div", { className: "h-52 overflow-hidden rounded-lg border bg-background", children: /* @__PURE__ */ jsx(Panels, {}) })
  ] }) });
}
export {
  ResizableDemo
};
