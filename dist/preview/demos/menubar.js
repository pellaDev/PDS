import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger
} from "../../components/ui/menubar";
function MenubarDemo() {
  const [showToolbar, setShowToolbar] = useState(true);
  const [zoom, setZoom] = useState("100");
  return /* @__PURE__ */ jsx("div", { className: "max-w-lg p-6", children: /* @__PURE__ */ jsxs(Menubar, { children: [
    /* @__PURE__ */ jsxs(MenubarMenu, { children: [
      /* @__PURE__ */ jsx(MenubarTrigger, { children: "File" }),
      /* @__PURE__ */ jsxs(MenubarContent, { children: [
        /* @__PURE__ */ jsxs(MenubarItem, { children: [
          "New tab ",
          /* @__PURE__ */ jsx(MenubarShortcut, { children: "Cmd T" })
        ] }),
        /* @__PURE__ */ jsx(MenubarItem, { children: "New window" }),
        /* @__PURE__ */ jsx(MenubarSeparator, {}),
        /* @__PURE__ */ jsx(MenubarItem, { disabled: true, children: "Print" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(MenubarMenu, { children: [
      /* @__PURE__ */ jsx(MenubarTrigger, { children: "View" }),
      /* @__PURE__ */ jsxs(MenubarContent, { children: [
        /* @__PURE__ */ jsx(
          MenubarCheckboxItem,
          {
            checked: showToolbar,
            onCheckedChange: (checked) => setShowToolbar(checked === true),
            children: "Show toolbar"
          }
        ),
        /* @__PURE__ */ jsxs(MenubarSub, { children: [
          /* @__PURE__ */ jsx(MenubarSubTrigger, { children: "Zoom" }),
          /* @__PURE__ */ jsx(MenubarSubContent, { children: /* @__PURE__ */ jsxs(MenubarRadioGroup, { value: zoom, onValueChange: setZoom, children: [
            /* @__PURE__ */ jsx(MenubarRadioItem, { value: "90", children: "90%" }),
            /* @__PURE__ */ jsx(MenubarRadioItem, { value: "100", children: "100%" }),
            /* @__PURE__ */ jsx(MenubarRadioItem, { value: "110", children: "110%" })
          ] }) })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  MenubarDemo
};
