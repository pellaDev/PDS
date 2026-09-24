import { jsx, jsxs } from "react/jsx-runtime";
import { Bell, Wifi, ShieldCheck, FileText, Settings } from "lucide-react";
const ICONS = [Bell, Wifi, ShieldCheck, FileText, Settings];
function IconRow({ label, sizeClass }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
    /* @__PURE__ */ jsx("span", { className: "w-28 shrink-0 [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground", children: label }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: ICONS.map((Icon, i) => /* @__PURE__ */ jsx(
      "span",
      {
        className: `${sizeClass} flex items-center justify-center border-0 bg-transparent text-primary`,
        children: /* @__PURE__ */ jsx(Icon, { size: 16, strokeWidth: 2 })
      },
      i
    )) })
  ] });
}
function IconsDemo() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsx("p", { className: "max-w-prose [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light text-muted-foreground", children: "Icon set. Transparent, borderless square containers sized to the matching Button height; icons at 16px in the primary brand color." }),
    /* @__PURE__ */ jsx(IconRow, { label: "Mini \xB7 24", sizeClass: "size-6" }),
    /* @__PURE__ */ jsx(IconRow, { label: "Small \xB7 32", sizeClass: "size-8" }),
    /* @__PURE__ */ jsx(IconRow, { label: "Large \xB7 40", sizeClass: "size-10" })
  ] });
}
export {
  IconsDemo
};
