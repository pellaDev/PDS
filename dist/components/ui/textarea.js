import { jsx } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { usePdsConfig } from "../../config";
import "./field.css";
const textareaVariants = cva("pds-field font-light", {
  variants: {
    size: { sm: "[--field-h:var(--dim-lll)]", lg: "[--field-h:var(--dim-l)]" },
    tone: { fill: "pds-field--fill", outline: "pds-field--outline" }
  },
  defaultVariants: { size: "sm" }
});
const Textarea = React.forwardRef(
  ({ className, size, tone, ...props }, ref) => {
    const { fieldStyle } = usePdsConfig();
    return /* @__PURE__ */ jsx(
      "textarea",
      {
        ref,
        ...props,
        className: cn(textareaVariants({ size, tone: tone ?? fieldStyle }), className)
      }
    );
  }
);
Textarea.displayName = "Textarea";
export {
  Textarea
};
