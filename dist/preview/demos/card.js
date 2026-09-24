import { jsx, jsxs } from "react/jsx-runtime";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../../components/ui/card";
function CardDemo() {
  return /* @__PURE__ */ jsxs(Card, { className: "max-w-md", children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { children: "Weekly report" }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Activity across your workspace." })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-lg [background-color:var(--pds-surface-bg)] p-4", children: [
        /* @__PURE__ */ jsx("p", { className: "[font-size:var(--type-body1-size)] [line-height:var(--type-body1-lh)] font-light", children: "24" }),
        /* @__PURE__ */ jsx("p", { className: "[font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light text-muted-foreground", children: "Projects" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-lg [background-color:var(--pds-surface-bg)] p-4", children: [
        /* @__PURE__ */ jsx("p", { className: "[font-size:var(--type-body1-size)] [line-height:var(--type-body1-lh)] font-light", children: "89%" }),
        /* @__PURE__ */ jsx("p", { className: "[font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light text-muted-foreground", children: "On track" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(CardFooter, { children: /* @__PURE__ */ jsx(Button, { size: "small", children: "View report" }) })
  ] });
}
export {
  CardDemo
};
