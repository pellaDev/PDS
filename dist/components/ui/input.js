import { jsx } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { usePdsConfig } from "../../config";
import "./field.css";
const inputVariants = cva("pds-field font-light", {
  variants: {
    size: { sm: "[--field-h:var(--dim-lll)]", lg: "[--field-h:var(--dim-l)]" },
    tone: { fill: "pds-field--fill", outline: "pds-field--outline" }
  },
  defaultVariants: { size: "sm" }
});
const Input = React.forwardRef(
  ({ className, type, size, tone, ...props }, ref) => {
    const { fieldStyle } = usePdsConfig();
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        ref,
        ...props,
        className: cn(inputVariants({ size, tone: tone ?? fieldStyle }), className)
      }
    );
  }
);
Input.displayName = "Input";
export {
  Input
};
