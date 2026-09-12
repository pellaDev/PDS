import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { usePdsConfig } from "../../config";
import "./field.css";
const fieldVariants = cva(
  "pds-field font-sans font-light",
  {
    variants: {
      size: { sm: "[--field-h:var(--dim-lll)]", lg: "[--field-h:var(--dim-l)]" },
      tone: { fill: "pds-field--fill", outline: "pds-field--outline" },
      state: { default: "", error: "pds-field--error" }
    }
  }
);
const Field = React.forwardRef(function Field2({ className, size = "sm", tone, state = "default", label, trailingIcon, disabled, ...props }, ref) {
  const { fieldStyle } = usePdsConfig();
  return /* @__PURE__ */ jsxs("label", { ...disabled ? { "data-disabled": true } : {}, ...trailingIcon ? { "data-has-icon": true } : {}, className: cn(fieldVariants({ size, tone: tone ?? fieldStyle, state }), className), children: [
    /* @__PURE__ */ jsx("input", { ref, placeholder: " ", disabled, ...props, className: "pds-field__input" }),
    trailingIcon ? /* @__PURE__ */ jsx("span", { className: "pds-field__icon", "aria-hidden": true, children: trailingIcon }) : null,
    /* @__PURE__ */ jsx("span", { className: "pds-field__label", children: label })
  ] });
});
export {
  Field
};
