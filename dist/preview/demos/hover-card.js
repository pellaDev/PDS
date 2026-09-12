import { jsx, jsxs } from "react/jsx-runtime";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from "../../components/ui/hover-card";
function HoverCardDemo() {
  return /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxs(HoverCard, { children: [
    /* @__PURE__ */ jsx(HoverCardTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
      "a",
      {
        href: "#page=hover-card",
        className: "font-medium underline underline-offset-4",
        children: "@design-team"
      }
    ) }),
    /* @__PURE__ */ jsxs(HoverCardContent, { className: "flex gap-3", children: [
      /* @__PURE__ */ jsx(Avatar, { children: /* @__PURE__ */ jsx(AvatarFallback, { children: "DT" }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx("p", { className: "font-medium", children: "Design team" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Building clear, consistent product experiences." })
      ] })
    ] })
  ] }) });
}
export {
  HoverCardDemo
};
