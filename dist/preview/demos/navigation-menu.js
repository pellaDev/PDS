import { jsx, jsxs } from "react/jsx-runtime";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "../../components/ui/navigation-menu";
function NavigationMenuDemo() {
  return /* @__PURE__ */ jsx("div", { className: "min-h-48 max-w-2xl p-6", children: /* @__PURE__ */ jsx(NavigationMenu, { children: /* @__PURE__ */ jsxs(NavigationMenuList, { children: [
    /* @__PURE__ */ jsxs(NavigationMenuItem, { children: [
      /* @__PURE__ */ jsx(NavigationMenuTrigger, { children: "Products" }),
      /* @__PURE__ */ jsx(NavigationMenuContent, { children: /* @__PURE__ */ jsxs("ul", { className: "grid w-80 gap-2 p-4", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
          NavigationMenuLink,
          {
            href: "#page=navigation-menu",
            className: "block rounded-md p-3 hover:bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)]",
            children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Apps" }),
              /* @__PURE__ */ jsx("span", { className: "block text-sm text-muted-foreground", children: "Build and publish full-stack projects." })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
          NavigationMenuLink,
          {
            href: "#page=navigation-menu",
            className: "block rounded-md p-3 hover:bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)]",
            children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Teams" }),
              /* @__PURE__ */ jsx("span", { className: "block text-sm text-muted-foreground", children: "Collaborate with shared tools and access." })
            ]
          }
        ) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(NavigationMenuItem, { children: /* @__PURE__ */ jsx(
      NavigationMenuLink,
      {
        href: "#page=navigation-menu",
        className: navigationMenuTriggerStyle(),
        children: "Pricing"
      }
    ) }),
    /* @__PURE__ */ jsx(NavigationMenuIndicator, {})
  ] }) }) });
}
export {
  NavigationMenuDemo
};
