import { jsx } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { usePdsConfig } from "../../config";
import "./field.css";
import "./scrollbar.css";
const textareaVariants = cva("pds-field pds-scrollbar font-light", {
  variants: {
    size: { sm: "[--field-h:var(--dim-lll)]", lg: "[--field-h:var(--dim-l)]" },
    tone: { fill: "pds-field--fill", outline: "pds-field--outline" }
  },
  defaultVariants: { size: "sm" }
});
function growToContent(el) {
  el.style.height = "auto";
  el.style.height = `${el.scrollHeight}px`;
}
const Textarea = React.forwardRef(
  ({ className, size, tone, autoGrow = true, onInput, value, defaultValue, rows, ...props }, ref) => {
    const { fieldStyle } = usePdsConfig();
    const innerRef = React.useRef(null);
    const setRef = (node) => {
      innerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    };
    React.useEffect(() => {
      if (autoGrow && innerRef.current) growToContent(innerRef.current);
    }, [autoGrow, value, defaultValue, rows]);
    return /* @__PURE__ */ jsx(
      "textarea",
      {
        ref: setRef,
        ...props,
        value,
        defaultValue,
        rows,
        onInput: (event) => {
          if (autoGrow) growToContent(event.currentTarget);
          onInput?.(event);
        },
        className: cn(textareaVariants({ size, tone: tone ?? fieldStyle }), className)
      }
    );
  }
);
Textarea.displayName = "Textarea";
export {
  Textarea
};
