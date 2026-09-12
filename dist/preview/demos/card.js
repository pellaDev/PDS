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
      /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-muted p-4", children: [
        /* @__PURE__ */ jsx("p", { className: "text-2xl font-semibold", children: "24" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Projects" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-muted p-4", children: [
        /* @__PURE__ */ jsx("p", { className: "text-2xl font-semibold", children: "89%" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "On track" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(CardFooter, { children: /* @__PURE__ */ jsx(Button, { size: "small", children: "View report" }) })
  ] });
}
export {
  CardDemo
};
