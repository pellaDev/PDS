import { jsx, jsxs } from "react/jsx-runtime";
import {
  FileText,
  MoreHorizontal,
  Bell,
  Wifi,
  ShieldCheck,
  Pencil,
  ChevronRight
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Tag } from "../../components/ui/tag";
import { Switch } from "../../components/ui/switch";
import { Checkbox } from "../../components/ui/checkbox";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle
} from "../../components/ui/item";
function ItemDemo() {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-8", children: [
    /* @__PURE__ */ jsxs("section", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx("h3", { className: "[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground", children: "Desktop \xB7 hover reveals actions" }),
      /* @__PURE__ */ jsxs(ItemGroup, { className: "w-full overflow-hidden rounded-lg border [border-color:var(--pds-container-border-color)]", children: [
        /* @__PURE__ */ jsxs(Item, { size: "sm", className: "relative min-h-8 rounded-none border-0 py-1", children: [
          /* @__PURE__ */ jsx(ItemMedia, { variant: "icon", className: "size-6 border-0 bg-transparent", children: /* @__PURE__ */ jsx(FileText, {}) }),
          /* @__PURE__ */ jsxs(ItemContent, { children: [
            /* @__PURE__ */ jsx(ItemTitle, { children: "Product brief" }),
            /* @__PURE__ */ jsx(ItemDescription, { children: "Goals, customer context, and launch requirements." })
          ] }),
          /* @__PURE__ */ jsx(ItemActions, { children: /* @__PURE__ */ jsx(Tag, { variant: "ready", children: "Draft" }) }),
          /* @__PURE__ */ jsxs("span", { className: "pointer-events-none absolute inset-y-0 right-0 flex items-center gap-1 rounded-r-md bg-[var(--pds-surface-bg)] px-3 opacity-0 transition-opacity group-hover/item:pointer-events-auto group-hover/item:opacity-100", children: [
            /* @__PURE__ */ jsx(Button, { size: "mini", "aria-label": "Edit", children: /* @__PURE__ */ jsx(Pencil, {}) }),
            /* @__PURE__ */ jsx(Button, { size: "mini", "aria-label": "More actions", children: /* @__PURE__ */ jsx(MoreHorizontal, {}) })
          ] })
        ] }),
        /* @__PURE__ */ jsx(ItemSeparator, {}),
        /* @__PURE__ */ jsxs(Item, { size: "sm", className: "min-h-8 rounded-none border-0 py-1", children: [
          /* @__PURE__ */ jsx(ItemMedia, { variant: "icon", className: "size-6 border-0 bg-transparent", children: /* @__PURE__ */ jsx(Bell, {}) }),
          /* @__PURE__ */ jsx(ItemContent, { children: /* @__PURE__ */ jsx(ItemTitle, { children: "Notifications" }) }),
          /* @__PURE__ */ jsx(ItemActions, { children: /* @__PURE__ */ jsx(Switch, { defaultChecked: true, "aria-label": "Notifications" }) })
        ] }),
        /* @__PURE__ */ jsx(ItemSeparator, {}),
        /* @__PURE__ */ jsxs(Item, { size: "sm", className: "min-h-8 rounded-none border-0 py-1", children: [
          /* @__PURE__ */ jsx(ItemMedia, { variant: "icon", className: "size-6 border-0 bg-transparent", children: /* @__PURE__ */ jsx(ShieldCheck, {}) }),
          /* @__PURE__ */ jsx(ItemContent, { children: /* @__PURE__ */ jsx(ItemTitle, { children: "Privacy" }) }),
          /* @__PURE__ */ jsx(ItemActions, { children: /* @__PURE__ */ jsx(Checkbox, { label: "Enhanced protection" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx("h3", { className: "[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground", children: "Mobile \xB7 touch" }),
      /* @__PURE__ */ jsxs(ItemGroup, { className: "max-w-[340px] overflow-hidden rounded-lg border [border-color:var(--pds-container-border-color)]", children: [
        /* @__PURE__ */ jsxs(Item, { size: "sm", children: [
          /* @__PURE__ */ jsx(ItemMedia, { children: /* @__PURE__ */ jsx(Avatar, { className: "size-8", children: /* @__PURE__ */ jsx(AvatarFallback, { className: "[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light", children: "PS" }) }) }),
          /* @__PURE__ */ jsxs(ItemContent, { children: [
            /* @__PURE__ */ jsx(ItemTitle, { children: "Account" }),
            /* @__PURE__ */ jsx(ItemDescription, { children: "Profile & security" })
          ] })
        ] }),
        /* @__PURE__ */ jsx(ItemSeparator, {}),
        /* @__PURE__ */ jsxs(Item, { size: "sm", children: [
          /* @__PURE__ */ jsx(ItemMedia, { variant: "icon", children: /* @__PURE__ */ jsx(Bell, {}) }),
          /* @__PURE__ */ jsx(ItemContent, { children: /* @__PURE__ */ jsx(ItemTitle, { children: "Notifications" }) }),
          /* @__PURE__ */ jsx(ItemActions, { children: /* @__PURE__ */ jsx(Tag, { variant: "ready", children: "On" }) })
        ] }),
        /* @__PURE__ */ jsx(ItemSeparator, {}),
        /* @__PURE__ */ jsxs(Item, { size: "sm", children: [
          /* @__PURE__ */ jsx(ItemMedia, { variant: "icon", children: /* @__PURE__ */ jsx(Wifi, {}) }),
          /* @__PURE__ */ jsx(ItemContent, { children: /* @__PURE__ */ jsx(ItemTitle, { children: "Wi-Fi" }) }),
          /* @__PURE__ */ jsx(ItemActions, { children: /* @__PURE__ */ jsx(Switch, { defaultChecked: true, "aria-label": "Wi-Fi" }) })
        ] }),
        /* @__PURE__ */ jsx(ItemSeparator, {}),
        /* @__PURE__ */ jsxs(Item, { size: "sm", children: [
          /* @__PURE__ */ jsx(ItemMedia, { variant: "icon", children: /* @__PURE__ */ jsx(ShieldCheck, {}) }),
          /* @__PURE__ */ jsx(ItemContent, { children: /* @__PURE__ */ jsx(ItemTitle, { children: "Privacy" }) }),
          /* @__PURE__ */ jsx(ItemActions, { children: /* @__PURE__ */ jsx(Button, { size: "mini", "aria-label": "Open privacy", children: /* @__PURE__ */ jsx(ChevronRight, {}) }) })
        ] })
      ] })
    ] })
  ] });
}
export {
  ItemDemo
};
