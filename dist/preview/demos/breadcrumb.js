import { jsx, jsxs } from "react/jsx-runtime";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "../../components/ui/breadcrumb";
function BreadcrumbDemo() {
  return /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsx(Breadcrumb, { children: /* @__PURE__ */ jsxs(BreadcrumbList, { children: [
    /* @__PURE__ */ jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsx(BreadcrumbLink, { href: "#page=breadcrumb", children: "Home" }) }),
    /* @__PURE__ */ jsx(BreadcrumbSeparator, {}),
    /* @__PURE__ */ jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsx(BreadcrumbEllipsis, {}) }),
    /* @__PURE__ */ jsx(BreadcrumbSeparator, {}),
    /* @__PURE__ */ jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsx(BreadcrumbLink, { href: "#page=breadcrumb", children: "Components" }) }),
    /* @__PURE__ */ jsx(BreadcrumbSeparator, {}),
    /* @__PURE__ */ jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsx(BreadcrumbPage, { children: "Breadcrumb" }) })
  ] }) }) });
}
export {
  BreadcrumbDemo
};
