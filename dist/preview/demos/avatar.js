import { jsx, jsxs } from "react/jsx-runtime";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Row } from "../parts";
function AvatarDemo() {
  return /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
    /* @__PURE__ */ jsxs(Row, { label: "Sizes and fallback", children: [
      /* @__PURE__ */ jsx(Avatar, { className: "h-8 w-8", children: /* @__PURE__ */ jsx(AvatarFallback, { children: "AL" }) }),
      /* @__PURE__ */ jsxs(Avatar, { children: [
        /* @__PURE__ */ jsx(AvatarImage, { src: `${import.meta.env.BASE_URL}favicon.svg`, alt: "Design system mark" }),
        /* @__PURE__ */ jsx(AvatarFallback, { children: "SC" })
      ] }),
      /* @__PURE__ */ jsx(Avatar, { className: "h-14 w-14", children: /* @__PURE__ */ jsx(AvatarFallback, { children: "DT" }) })
    ] }),
    /* @__PURE__ */ jsxs(Row, { label: "With status dot", children: [
      /* @__PURE__ */ jsxs("span", { className: "relative inline-flex", children: [
        /* @__PURE__ */ jsx(Avatar, { className: "h-10 w-10", children: /* @__PURE__ */ jsx(AvatarFallback, { children: "JD" }) }),
        /* @__PURE__ */ jsx(
          Badge,
          {
            shape: "simple",
            variant: "ready",
            className: "absolute! bottom-1 right-1 h-3 w-3 rounded-full"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "relative inline-flex", children: [
        /* @__PURE__ */ jsx(Avatar, { className: "h-10 w-10", children: /* @__PURE__ */ jsx(AvatarFallback, { children: "MS" }) }),
        /* @__PURE__ */ jsx(
          Badge,
          {
            shape: "simple",
            variant: "alert",
            className: "absolute! bottom-1 right-1 h-3 w-3 rounded-full"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "relative inline-flex", children: [
        /* @__PURE__ */ jsx(Avatar, { className: "h-14 w-14", children: /* @__PURE__ */ jsx(AvatarFallback, { children: "DT" }) }),
        /* @__PURE__ */ jsx(
          Badge,
          {
            shape: "simple",
            variant: "error",
            className: "absolute! bottom-1.5 right-1.5 h-3.5 w-3.5 rounded-full"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-1 pt-2 font-mono [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground", children: /* @__PURE__ */ jsx("p", { children: `Status dot = Badge shape "simple" (dim-s 12px circle) overlaid inside the avatar's bottom-right corner.` }) })
  ] });
}
export {
  AvatarDemo
};
