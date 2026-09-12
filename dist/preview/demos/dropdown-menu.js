import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Row } from "../parts";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "../../components/ui/dropdown-menu";
const OPTIONS = ["Brand primary", "Surface white", "Ink black", "Gray soft"];
function Chevron() {
  return /* @__PURE__ */ jsx("span", { className: "pds-dropdown-trigger__icon", children: /* @__PURE__ */ jsx("svg", { width: "10", height: "6", viewBox: "0 0 10 6", fill: "none", children: /* @__PURE__ */ jsx("path", { d: "M1 1.2L5 4.8L9 1.2", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round" }) }) });
}
function Picker({ defaultValue, disabled, error }) {
  const [value, setValue] = useState(defaultValue);
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs("button", { type: "button", className: "pds-dropdown-trigger", "data-error": error || void 0, disabled, children: [
      value,
      /* @__PURE__ */ jsx(Chevron, {})
    ] }) }),
    /* @__PURE__ */ jsx(DropdownMenuContent, { className: "w-56", children: OPTIONS.map((o) => /* @__PURE__ */ jsxs(DropdownMenuItem, { "data-selected": o === value || void 0, onSelect: () => setValue(o), children: [
      /* @__PURE__ */ jsx(Check, { className: o === value ? "opacity-100" : "opacity-0" }),
      o
    ] }, o)) })
  ] });
}
function DropdownMenuDemo() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [theme, setTheme] = useState("system");
  return /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsx(Row, { label: "Value picker - token-faithful trigger + tokenized listbox", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-xs", children: /* @__PURE__ */ jsx(Picker, { defaultValue: "Brand primary" }) }) }),
    /* @__PURE__ */ jsx(Row, { label: "Disabled (blackSoft fill, gray label, opacity 0.32)", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-xs", children: /* @__PURE__ */ jsx(Picker, { defaultValue: "Surface white", disabled: true }) }) }),
    /* @__PURE__ */ jsx(Row, { label: "Error (full red semantic fill per export)", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-xs", children: /* @__PURE__ */ jsx(Picker, { defaultValue: "Ink black", error: true }) }) }),
    /* @__PURE__ */ jsx(Row, { label: "Action menu (label, checkbox, shortcuts, submenu)", children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [
      /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", children: "Open menu" }) }),
      /* @__PURE__ */ jsxs(DropdownMenuContent, { className: "w-56", children: [
        /* @__PURE__ */ jsx(DropdownMenuLabel, { children: "Workspace" }),
        /* @__PURE__ */ jsxs(DropdownMenuItem, { children: [
          "New project ",
          /* @__PURE__ */ jsx(DropdownMenuShortcut, { children: "Cmd N" })
        ] }),
        /* @__PURE__ */ jsx(DropdownMenuItem, { disabled: true, children: "Import project" }),
        /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
        /* @__PURE__ */ jsx(DropdownMenuCheckboxItem, { checked: showSidebar, onCheckedChange: (c) => setShowSidebar(c === true), children: "Show sidebar" }),
        /* @__PURE__ */ jsxs(DropdownMenuSub, { children: [
          /* @__PURE__ */ jsx(DropdownMenuSubTrigger, { children: "Theme" }),
          /* @__PURE__ */ jsx(DropdownMenuSubContent, { children: /* @__PURE__ */ jsxs(DropdownMenuRadioGroup, { value: theme, onValueChange: setTheme, children: [
            /* @__PURE__ */ jsx(DropdownMenuRadioItem, { value: "light", children: "Light" }),
            /* @__PURE__ */ jsx(DropdownMenuRadioItem, { value: "dark", children: "Dark" }),
            /* @__PURE__ */ jsx(DropdownMenuRadioItem, { value: "system", children: "System" })
          ] }) })
        ] })
      ] })
    ] }) })
  ] }) });
}
export {
  DropdownMenuDemo
};
