import { jsx, jsxs } from "react/jsx-runtime";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../../components/ui/hover-card";
function HoverCardDemo() {
  return /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxs(HoverCard, { children: [
    /* @__PURE__ */ jsx(HoverCardTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
      "a",
      {
        href: "#page=hover-card",
        className: "[font-size:var(--type-button-size)] [line-height:var(--type-button-lh)] font-light underline underline-offset-4",
        children: "@design-team"
      }
    ) }),
    /* @__PURE__ */ jsxs(HoverCardContent, { className: "flex gap-3", children: [
      /* @__PURE__ */ jsx(Avatar, { children: /* @__PURE__ */ jsx(AvatarFallback, { children: "DT" }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx("p", { className: "[font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light", children: "Design team" }),
        /* @__PURE__ */ jsx("p", { className: "[font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light text-muted-foreground", children: "Building clear, consistent product experiences." })
      ] })
    ] })
  ] }) });
}
export {
  HoverCardDemo
};
