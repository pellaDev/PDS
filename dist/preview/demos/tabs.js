import { jsx, jsxs } from "react/jsx-runtime";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "../../components/ui/tabs";
function DesktopTabs() {
  return /* @__PURE__ */ jsxs(Tabs, { defaultValue: "overview", children: [
    /* @__PURE__ */ jsxs(TabsList, { children: [
      /* @__PURE__ */ jsx(TabsTrigger, { value: "overview", children: "Overview" }),
      /* @__PURE__ */ jsx(TabsTrigger, { value: "activity", children: "Activity" }),
      /* @__PURE__ */ jsx(TabsTrigger, { value: "settings", disabled: true, children: "Settings" })
    ] }),
    /* @__PURE__ */ jsx(TabsContent, { value: "overview", className: "rounded-md border p-4 text-sm", children: "Project summary and recent milestones." }),
    /* @__PURE__ */ jsx(TabsContent, { value: "activity", className: "rounded-md border p-4 text-sm", children: "Latest changes from your team." })
  ] });
}
function MobileTabs() {
  return /* @__PURE__ */ jsxs(Tabs, { defaultValue: "overview", className: "w-full", children: [
    /* @__PURE__ */ jsxs(TabsList, { size: "mobile", children: [
      /* @__PURE__ */ jsx(TabsTrigger, { size: "mobile", value: "overview", children: "Overview" }),
      /* @__PURE__ */ jsx(TabsTrigger, { size: "mobile", value: "activity", children: "Activity" }),
      /* @__PURE__ */ jsx(TabsTrigger, { size: "mobile", value: "settings", disabled: true, children: "Settings" })
    ] }),
    /* @__PURE__ */ jsx(TabsContent, { value: "overview", className: "rounded-md border p-4 text-sm", children: "Project summary and recent milestones." }),
    /* @__PURE__ */ jsx(TabsContent, { value: "activity", className: "rounded-md border p-4 text-sm", children: "Latest changes from your team." })
  ] });
}
function Card({ surface, children }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-pds-surface": surface,
      className: "rounded-xl border p-4 [border-color:var(--pds-container-border-color)] " + (surface === "base" ? "bg-background" : "bg-secondary"),
      children
    }
  );
}
function TabsDemo() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8 p-6 text-card-foreground", children: [
    /* @__PURE__ */ jsxs("section", { className: "space-y-3", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xs font-medium uppercase tracking-wide text-muted-foreground", children: "Desktop" }),
      /* @__PURE__ */ jsx("div", { className: "max-w-lg", children: /* @__PURE__ */ jsx(Card, { surface: "base", children: /* @__PURE__ */ jsx(DesktopTabs, {}) }) }),
      /* @__PURE__ */ jsx("div", { className: "max-w-lg", children: /* @__PURE__ */ jsx(Card, { surface: "alternate", children: /* @__PURE__ */ jsx(DesktopTabs, {}) }) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "space-y-3", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xs font-medium uppercase tracking-wide text-muted-foreground", children: "Mobile" }),
      /* @__PURE__ */ jsx("div", { className: "max-w-sm", children: /* @__PURE__ */ jsx(Card, { surface: "base", children: /* @__PURE__ */ jsx(MobileTabs, {}) }) }),
      /* @__PURE__ */ jsx("div", { className: "max-w-sm", children: /* @__PURE__ */ jsx(Card, { surface: "alternate", children: /* @__PURE__ */ jsx(MobileTabs, {}) }) })
    ] })
  ] });
}
export {
  TabsDemo
};
