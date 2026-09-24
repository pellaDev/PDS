import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { FileText, Home, Pencil, Settings, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Tag } from "../../components/ui/tag";
import { ScrollArea } from "../../components/ui/scroll-area";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "../../components/ui/resizable";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider
} from "../../components/ui/sidebar";
function SidebarDemo() {
  const [active, setActive] = useState("home");
  return /* @__PURE__ */ jsx("div", { className: "h-80 max-w-3xl overflow-hidden rounded-xl border", children: /* @__PURE__ */ jsx(SidebarProvider, { className: "h-full min-h-0", children: /* @__PURE__ */ jsxs(ResizablePanelGroup, { direction: "horizontal", className: "min-h-0 w-full flex-1", children: [
    /* @__PURE__ */ jsx(ResizablePanel, { defaultSize: 34, minSize: 20, children: /* @__PURE__ */ jsxs(Sidebar, { collapsible: "none", className: "!w-full", children: [
      /* @__PURE__ */ jsxs(SidebarHeader, { children: [
        /* @__PURE__ */ jsx("p", { className: "px-2 [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light", children: "Acme workspace" }),
        /* @__PURE__ */ jsx(SidebarInput, { placeholder: "Search" })
      ] }),
      /* @__PURE__ */ jsx(SidebarContent, { className: "overflow-hidden", children: /* @__PURE__ */ jsx(ScrollArea, { className: "flex-1 min-h-0", children: /* @__PURE__ */ jsxs("div", { className: "pr-1", children: [
        /* @__PURE__ */ jsxs(SidebarGroup, { accordion: true, children: [
          /* @__PURE__ */ jsx(SidebarGroupLabel, { children: "Workspace" }),
          /* @__PURE__ */ jsx(SidebarGroupContent, { children: /* @__PURE__ */ jsxs(SidebarMenu, { children: [
            /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxs(
              SidebarMenuButton,
              {
                isActive: active === "home",
                onClick: () => setActive("home"),
                children: [
                  /* @__PURE__ */ jsx(Home, {}),
                  " ",
                  /* @__PURE__ */ jsx("span", { children: "Home" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxs(SidebarMenuItem, { children: [
              /* @__PURE__ */ jsxs(
                SidebarMenuButton,
                {
                  isActive: active === "documents",
                  onClick: () => setActive("documents"),
                  children: [
                    /* @__PURE__ */ jsx(FileText, {}),
                    " ",
                    /* @__PURE__ */ jsx("span", { children: "Documents" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(SidebarMenuBadge, { children: "12" })
            ] }),
            /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxs(
              SidebarMenuButton,
              {
                isActive: active === "settings",
                onClick: () => setActive("settings"),
                children: [
                  /* @__PURE__ */ jsx(Settings, {}),
                  " ",
                  /* @__PURE__ */ jsx("span", { children: "Settings" })
                ]
              }
            ) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs(SidebarGroup, { accordion: true, defaultOpen: false, children: [
          /* @__PURE__ */ jsx(SidebarGroupLabel, { children: "Library" }),
          /* @__PURE__ */ jsx(SidebarGroupContent, { children: /* @__PURE__ */ jsxs(SidebarMenu, { children: [
            /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxs(SidebarMenuButton, { className: "group/item relative no-default-hover-elevate pds-sidebar-actionrow", children: [
              /* @__PURE__ */ jsx("span", { className: "min-w-0 flex-1 truncate", children: "Reports" }),
              /* @__PURE__ */ jsx(Tag, { variant: "ready", className: "shrink-0", children: "Ready" }),
              /* @__PURE__ */ jsxs("span", { className: "pointer-events-none absolute inset-y-0 right-0 flex items-center gap-1 rounded-r-md pds-sidebar-actionbar px-3 opacity-0 backdrop-blur-[1px] group-hover/item:pointer-events-auto group-hover/item:opacity-100", children: [
                /* @__PURE__ */ jsx(Button, { size: "mini", "aria-label": "Edit", children: /* @__PURE__ */ jsx(Pencil, {}) }),
                /* @__PURE__ */ jsx(Button, { size: "mini", "aria-label": "Delete", children: /* @__PURE__ */ jsx(Trash2, {}) })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxs(SidebarMenuButton, { className: "group/item relative no-default-hover-elevate pds-sidebar-actionrow", children: [
              /* @__PURE__ */ jsx("span", { className: "min-w-0 flex-1 truncate", children: "Archive" }),
              /* @__PURE__ */ jsx(Tag, { variant: "default", className: "shrink-0", children: "24" }),
              /* @__PURE__ */ jsxs("span", { className: "pointer-events-none absolute inset-y-0 right-0 flex items-center gap-1 rounded-r-md pds-sidebar-actionbar px-3 opacity-0 backdrop-blur-[1px] group-hover/item:pointer-events-auto group-hover/item:opacity-100", children: [
                /* @__PURE__ */ jsx(Button, { size: "mini", "aria-label": "Edit", children: /* @__PURE__ */ jsx(Pencil, {}) }),
                /* @__PURE__ */ jsx(Button, { size: "mini", "aria-label": "Delete", children: /* @__PURE__ */ jsx(Trash2, {}) })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxs(SidebarMenuButton, { className: "group/item relative no-default-hover-elevate pds-sidebar-actionrow", children: [
              /* @__PURE__ */ jsx("span", { className: "min-w-0 flex-1 truncate", children: "Shared with me" }),
              /* @__PURE__ */ jsx(Tag, { variant: "alert", className: "shrink-0", children: "3" }),
              /* @__PURE__ */ jsxs("span", { className: "pointer-events-none absolute inset-y-0 right-0 flex items-center gap-1 rounded-r-md pds-sidebar-actionbar px-3 opacity-0 backdrop-blur-[1px] group-hover/item:pointer-events-auto group-hover/item:opacity-100", children: [
                /* @__PURE__ */ jsx(Button, { size: "mini", "aria-label": "Edit", children: /* @__PURE__ */ jsx(Pencil, {}) }),
                /* @__PURE__ */ jsx(Button, { size: "mini", "aria-label": "Delete", children: /* @__PURE__ */ jsx(Trash2, {}) })
              ] })
            ] }) })
          ] }) })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx(SidebarFooter, { children: /* @__PURE__ */ jsx("p", { className: "px-2 [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground", children: "3 members online" }) })
    ] }) }),
    /* @__PURE__ */ jsx(ResizableHandle, { className: "pds-resizable-handle" }),
    /* @__PURE__ */ jsx(ResizablePanel, { defaultSize: 66, minSize: 30, children: /* @__PURE__ */ jsxs(SidebarInset, { className: "min-h-0 h-full p-6", children: [
      /* @__PURE__ */ jsx("p", { className: "[font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light", children: "Project canvas" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light text-muted-foreground", children: "Click a category label to open or close it. Click a workspace item - the active highlight follows your selection. Hover a Library row to reveal its action bar." })
    ] }) })
  ] }) }) });
}
export {
  SidebarDemo
};
