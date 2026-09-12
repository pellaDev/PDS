import { jsx, jsxs } from "react/jsx-runtime";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "../../components/ui/resizable";
function PanelBody({ label, muted = false }) {
  return /* @__PURE__ */ jsx("div", { className: muted ? "flex h-full items-center justify-center bg-muted text-sm" : "flex h-full items-center justify-center text-sm", children: label });
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
  return /* @__PURE__ */ jsxs("div", { className: "max-w-2xl space-y-5", children: [
    /* @__PURE__ */ jsxs("figure", { className: "m-0", children: [
      /* @__PURE__ */ jsx("figcaption", { className: "mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground", children: "Fill \u2014 separatore visibile solo in hover" }),
      /* @__PURE__ */ jsx("div", { "data-pds-fieldstyle": "fill", className: "h-52 overflow-hidden rounded-lg border bg-background", children: /* @__PURE__ */ jsx(Panels, {}) })
    ] }),
    /* @__PURE__ */ jsxs("figure", { className: "m-0", children: [
      /* @__PURE__ */ jsx("figcaption", { className: "mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground", children: "Outline \u2014 doppio spessore del border in hover" }),
      /* @__PURE__ */ jsx("div", { "data-pds-fieldstyle": "outline", className: "h-52 overflow-hidden rounded-lg border bg-background", children: /* @__PURE__ */ jsx(Panels, {}) })
    ] })
  ] });
}
export {
  ResizableDemo
};
