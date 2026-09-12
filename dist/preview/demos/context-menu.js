import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger
} from "../../components/ui/context-menu";
function ContextMenuDemo() {
  const [favorite, setFavorite] = useState(true);
  const [location, setLocation] = useState("drafts");
  return /* @__PURE__ */ jsxs(ContextMenu, { children: [
    /* @__PURE__ */ jsx(ContextMenuTrigger, { className: "flex h-40 max-w-lg items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground", children: "Right-click this area" }),
    /* @__PURE__ */ jsxs(ContextMenuContent, { className: "w-56", children: [
      /* @__PURE__ */ jsx(ContextMenuLabel, { children: "Document" }),
      /* @__PURE__ */ jsxs(ContextMenuItem, { children: [
        "Rename ",
        /* @__PURE__ */ jsx(ContextMenuShortcut, { children: "F2" })
      ] }),
      /* @__PURE__ */ jsx(ContextMenuItem, { children: "Duplicate" }),
      /* @__PURE__ */ jsx(ContextMenuSeparator, {}),
      /* @__PURE__ */ jsx(
        ContextMenuCheckboxItem,
        {
          checked: favorite,
          onCheckedChange: (checked) => setFavorite(checked === true),
          children: "Favorite"
        }
      ),
      /* @__PURE__ */ jsxs(ContextMenuSub, { children: [
        /* @__PURE__ */ jsx(ContextMenuSubTrigger, { children: "Move to" }),
        /* @__PURE__ */ jsx(ContextMenuSubContent, { children: /* @__PURE__ */ jsxs(ContextMenuRadioGroup, { value: location, onValueChange: setLocation, children: [
          /* @__PURE__ */ jsx(ContextMenuRadioItem, { value: "drafts", children: "Drafts" }),
          /* @__PURE__ */ jsx(ContextMenuRadioItem, { value: "archive", children: "Archive" })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  ContextMenuDemo
};
