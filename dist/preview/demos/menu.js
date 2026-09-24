import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Menu } from "../../components/ui/menu";
import { Row } from "../parts";
const OPTIONS = ["Brand primary", "Surface white", "Ink black", "Gray soft"];
function Chevron() {
  return /* @__PURE__ */ jsx("span", { className: "pds-menu-trigger__icon", children: /* @__PURE__ */ jsx("svg", { width: "10", height: "6", viewBox: "0 0 10 6", fill: "none", children: /* @__PURE__ */ jsx(
    "path",
    {
      d: "M1 1.2L5 4.8L9 1.2",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round"
    }
  ) }) });
}
function Picker({
  defaultValue,
  disabled,
  error
}) {
  const [value, setValue] = useState(defaultValue);
  return /* @__PURE__ */ jsxs(Menu, { mode: "dropdown", children: [
    /* @__PURE__ */ jsx(Menu.Trigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        className: "pds-menu-trigger",
        "data-error": error || void 0,
        disabled,
        children: [
          value,
          /* @__PURE__ */ jsx(Chevron, {})
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(Menu.Content, { className: "w-56", children: OPTIONS.map((o) => /* @__PURE__ */ jsxs(Menu.Item, { "data-selected": o === value || void 0, onSelect: () => setValue(o), children: [
      /* @__PURE__ */ jsx(Check, { className: o === value ? "opacity-100" : "opacity-0" }),
      o
    ] }, o)) })
  ] });
}
function MenuDemo() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [theme, setTheme] = useState("system");
  const [favorite, setFavorite] = useState(true);
  const [location, setLocation] = useState("drafts");
  return /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsx(Row, { label: "Dropdown - value picker (token-faithful trigger + tokenized listbox)", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-xs", children: /* @__PURE__ */ jsx(Picker, { defaultValue: "Brand primary" }) }) }),
    /* @__PURE__ */ jsx(Row, { label: "Dropdown - disabled (blackSoft fill, gray label, opacity 0.32)", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-xs", children: /* @__PURE__ */ jsx(Picker, { defaultValue: "Surface white", disabled: true }) }) }),
    /* @__PURE__ */ jsx(Row, { label: "Dropdown - error (full red semantic fill per export)", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-xs", children: /* @__PURE__ */ jsx(Picker, { defaultValue: "Ink black", error: true }) }) }),
    /* @__PURE__ */ jsx(Row, { label: "Dropdown - action menu (label, checkbox, shortcuts, submenu)", children: /* @__PURE__ */ jsxs(Menu, { mode: "dropdown", children: [
      /* @__PURE__ */ jsx(Menu.Trigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", children: "Open menu" }) }),
      /* @__PURE__ */ jsxs(Menu.Content, { className: "w-56", children: [
        /* @__PURE__ */ jsx(Menu.Label, { children: "Workspace" }),
        /* @__PURE__ */ jsxs(Menu.Item, { children: [
          "New project ",
          /* @__PURE__ */ jsx(Menu.Shortcut, { children: "Cmd N" })
        ] }),
        /* @__PURE__ */ jsx(Menu.Item, { disabled: true, children: "Import project" }),
        /* @__PURE__ */ jsx(Menu.Separator, {}),
        /* @__PURE__ */ jsx(
          Menu.CheckboxItem,
          {
            checked: showSidebar,
            onCheckedChange: (c) => setShowSidebar(c === true),
            children: "Show sidebar"
          }
        ),
        /* @__PURE__ */ jsxs(Menu.Sub, { children: [
          /* @__PURE__ */ jsx(Menu.SubTrigger, { children: "Theme" }),
          /* @__PURE__ */ jsx(Menu.SubContent, { children: /* @__PURE__ */ jsxs(Menu.RadioGroup, { value: theme, onValueChange: setTheme, children: [
            /* @__PURE__ */ jsx(Menu.RadioItem, { value: "light", children: "Light" }),
            /* @__PURE__ */ jsx(Menu.RadioItem, { value: "dark", children: "Dark" }),
            /* @__PURE__ */ jsx(Menu.RadioItem, { value: "system", children: "System" })
          ] }) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Row, { label: "Context - right-click area (same tokenized listbox)", children: /* @__PURE__ */ jsxs(Menu, { mode: "context", children: [
      /* @__PURE__ */ jsx(Menu.Trigger, { className: "flex h-40 max-w-lg items-center justify-center rounded-xl border border-dashed [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light text-muted-foreground", children: "Right-click this area" }),
      /* @__PURE__ */ jsxs(Menu.Content, { className: "w-56", children: [
        /* @__PURE__ */ jsx(Menu.Label, { children: "Document" }),
        /* @__PURE__ */ jsxs(Menu.Item, { children: [
          "Rename ",
          /* @__PURE__ */ jsx(Menu.Shortcut, { children: "F2" })
        ] }),
        /* @__PURE__ */ jsx(Menu.Item, { children: "Duplicate" }),
        /* @__PURE__ */ jsx(Menu.Separator, {}),
        /* @__PURE__ */ jsx(
          Menu.CheckboxItem,
          {
            checked: favorite,
            onCheckedChange: (c) => setFavorite(c === true),
            children: "Favorite"
          }
        ),
        /* @__PURE__ */ jsxs(Menu.Sub, { children: [
          /* @__PURE__ */ jsx(Menu.SubTrigger, { children: "Move to" }),
          /* @__PURE__ */ jsx(Menu.SubContent, { children: /* @__PURE__ */ jsxs(Menu.RadioGroup, { value: location, onValueChange: setLocation, children: [
            /* @__PURE__ */ jsx(Menu.RadioItem, { value: "drafts", children: "Drafts" }),
            /* @__PURE__ */ jsx(Menu.RadioItem, { value: "archive", children: "Archive" })
          ] }) })
        ] })
      ] })
    ] }) })
  ] }) });
}
export {
  MenuDemo
};
