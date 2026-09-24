import { jsx, jsxs } from "react/jsx-runtime";
import { Field } from "../../components/ui/field";
import { Key } from "lucide-react";
function VariantRow({ label, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
    /* @__PURE__ */ jsx("p", { className: "[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground", children: label }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-x-4 sm:grid-cols-3", children })
  ] });
}
function FieldDemo() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8 p-6 text-card-foreground", children: [
    /* @__PURE__ */ jsxs("section", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx("p", { className: "[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground", children: "Variants" }),
      /* @__PURE__ */ jsxs(VariantRow, { label: "Fill / small", children: [
        /* @__PURE__ */ jsx(Field, { size: "sm", tone: "fill", label: "Email address", className: "w-full" }),
        /* @__PURE__ */ jsx(
          Field,
          {
            size: "sm",
            tone: "fill",
            state: "error",
            defaultValue: "not an email",
            label: "Invalid value",
            className: "w-full"
          }
        ),
        /* @__PURE__ */ jsx(Field, { size: "sm", tone: "fill", disabled: true, label: "Disabled field", className: "w-full" })
      ] }),
      /* @__PURE__ */ jsxs(VariantRow, { label: "Fill / large", children: [
        /* @__PURE__ */ jsx(Field, { size: "lg", tone: "fill", label: "Full name", className: "w-full" }),
        /* @__PURE__ */ jsx(
          Field,
          {
            size: "lg",
            tone: "fill",
            state: "error",
            defaultValue: "0",
            label: "Amount (error)",
            className: "w-full"
          }
        ),
        /* @__PURE__ */ jsx(Field, { size: "lg", tone: "fill", disabled: true, label: "Disabled field", className: "w-full" })
      ] }),
      /* @__PURE__ */ jsxs(VariantRow, { label: "Outline / small", children: [
        /* @__PURE__ */ jsx(Field, { size: "sm", tone: "outline", label: "Password", type: "password", className: "w-full" }),
        /* @__PURE__ */ jsx(
          Field,
          {
            size: "sm",
            tone: "outline",
            state: "error",
            defaultValue: "short",
            label: "Too short (error)",
            className: "w-full"
          }
        ),
        /* @__PURE__ */ jsx(Field, { size: "sm", tone: "outline", disabled: true, label: "Disabled field", className: "w-full" })
      ] }),
      /* @__PURE__ */ jsxs(VariantRow, { label: "Outline / large", children: [
        /* @__PURE__ */ jsx(Field, { size: "lg", tone: "outline", label: "Search", className: "w-full" }),
        /* @__PURE__ */ jsx(
          Field,
          {
            size: "lg",
            tone: "outline",
            state: "error",
            defaultValue: "x",
            label: "Invalid (error)",
            className: "w-full"
          }
        ),
        /* @__PURE__ */ jsx(Field, { size: "lg", tone: "outline", disabled: true, label: "Disabled field", className: "w-full" })
      ] }),
      /* @__PURE__ */ jsxs(VariantRow, { label: "Optional icon on right", children: [
        /* @__PURE__ */ jsx(
          Field,
          {
            size: "sm",
            tone: "outline",
            type: "password",
            label: "Password",
            trailingIcon: /* @__PURE__ */ jsx(Key, { size: 14 }),
            className: "w-full"
          }
        ),
        /* @__PURE__ */ jsx(
          Field,
          {
            size: "lg",
            tone: "outline",
            type: "password",
            label: "Password",
            trailingIcon: /* @__PURE__ */ jsx(Key, { size: 16 }),
            className: "w-full"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsx("p", { className: "font-mono [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground", children: "fields.json: fill container graySoft, padding sys.spacing.s, radius sss -- label + input INSIDE the box (label body2 inside, fades out while focused/filled) | outline adds borderWidth=ssss brand always on" }),
      /* @__PURE__ */ jsx("p", { className: "font-mono [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground", children: "outline label: at rest body2 inside the box; caption (body2 x 0.66) only while focused/filled, as a surface chip on the border" }),
      /* @__PURE__ */ jsx("p", { className: "font-mono [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground", children: "disabled: fill bg #919191 / onContainer #F9F9F9 | outline border+text #919191 | both at opacity.disabled=0.32" })
    ] })
  ] });
}
export {
  FieldDemo
};
