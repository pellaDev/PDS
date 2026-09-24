import { jsx, jsxs } from "react/jsx-runtime";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
function DesktopTabs() {
  return /* @__PURE__ */ jsxs(Tabs, { defaultValue: "overview", children: [
    /* @__PURE__ */ jsxs(TabsList, { children: [
      /* @__PURE__ */ jsx(TabsTrigger, { value: "overview", children: "Overview" }),
      /* @__PURE__ */ jsx(TabsTrigger, { value: "activity", children: "Activity" }),
      /* @__PURE__ */ jsx(TabsTrigger, { value: "settings", disabled: true, children: "Settings" })
    ] }),
    /* @__PURE__ */ jsx(
      TabsContent,
      {
        value: "overview",
        className: "rounded-md border p-4 [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light",
        children: "Project summary and recent milestones."
      }
    ),
    /* @__PURE__ */ jsx(
      TabsContent,
      {
        value: "activity",
        className: "rounded-md border p-4 [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light",
        children: "Latest changes from your team."
      }
    )
  ] });
}
function MobileTabs() {
  return /* @__PURE__ */ jsxs(Tabs, { defaultValue: "overview", className: "w-full", children: [
    /* @__PURE__ */ jsxs(TabsList, { size: "mobile", children: [
      /* @__PURE__ */ jsx(TabsTrigger, { size: "mobile", value: "overview", children: "Overview" }),
      /* @__PURE__ */ jsx(TabsTrigger, { size: "mobile", value: "activity", children: "Activity" }),
      /* @__PURE__ */ jsx(TabsTrigger, { size: "mobile", value: "settings", disabled: true, children: "Settings" })
    ] }),
    /* @__PURE__ */ jsx(
      TabsContent,
      {
        value: "overview",
        className: "rounded-md border p-4 [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light",
        children: "Project summary and recent milestones."
      }
    ),
    /* @__PURE__ */ jsx(
      TabsContent,
      {
        value: "activity",
        className: "rounded-md border p-4 [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light",
        children: "Latest changes from your team."
      }
    )
  ] });
}
function TabsDemo() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8 p-6 text-card-foreground", children: [
    /* @__PURE__ */ jsxs("section", { className: "space-y-3", children: [
      /* @__PURE__ */ jsx("h2", { className: "[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground", children: "Desktop" }),
      /* @__PURE__ */ jsx("div", { className: "max-w-lg", children: /* @__PURE__ */ jsx(DesktopTabs, {}) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "space-y-3", children: [
      /* @__PURE__ */ jsx("h2", { className: "[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground", children: "Mobile" }),
      /* @__PURE__ */ jsx("div", { className: "max-w-sm", children: /* @__PURE__ */ jsx(MobileTabs, {}) })
    ] })
  ] });
}
export {
  TabsDemo
};
