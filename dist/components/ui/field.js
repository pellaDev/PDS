import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { usePdsConfig } from "../../config";
import "./field.css";
const fieldVariants = cva("pds-field font-sans font-light", {
  variants: {
    size: {
      sm: "[--field-h:var(--dim-lll)] [--pds-field-label-top:var(--dim-ssss)]",
      lg: "[--field-h:var(--dim-l)] [--pds-field-label-top:var(--dim-sss)]"
    },
    tone: { fill: "pds-field--fill", outline: "pds-field--outline" },
    state: { default: "", error: "pds-field--error" },
    control: { single: "", multiline: "pds-field--multiline pds-scrollbar" }
  }
});
const Field = React.forwardRef(function Field2({
  className,
  size = "sm",
  tone,
  state = "default",
  control = "single",
  autoGrow = true,
  label,
  trailingIcon,
  disabled,
  rows,
  value,
  defaultValue,
  onInput,
  ...props
}, ref) {
  const { fieldStyle } = usePdsConfig();
  const innerRef = React.useRef(null);
  const setRef = (node) => {
    innerRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  };
  React.useEffect(() => {
    if (control === "multiline" && autoGrow && innerRef.current) growToContent(innerRef.current);
  }, [control, autoGrow, value, defaultValue, rows]);
  return /* @__PURE__ */ jsxs(
    "label",
    {
      ...disabled ? { "data-disabled": true } : {},
      ...trailingIcon ? { "data-has-icon": true } : {},
      ...control === "multiline" ? { "data-auto-grow": autoGrow } : {},
      className: cn(fieldVariants({ size, tone: tone ?? fieldStyle, state, control }), className),
      children: [
        control === "multiline" ? /* @__PURE__ */ jsx(
          "textarea",
          {
            ref: setRef,
            placeholder: " ",
            rows,
            disabled,
            value,
            defaultValue,
            onInput: (event) => {
              if (autoGrow) growToContent(event.currentTarget);
              onInput?.(event);
            },
            className: "pds-field__input"
          }
        ) : /* @__PURE__ */ jsx(
          "input",
          {
            ref: setRef,
            placeholder: " ",
            disabled,
            value,
            defaultValue,
            onInput,
            ...props,
            className: "pds-field__input"
          }
        ),
        trailingIcon ? /* @__PURE__ */ jsx("span", { className: "pds-field__icon", "aria-hidden": true, children: trailingIcon }) : null,
        /* @__PURE__ */ jsx("span", { className: "pds-field__label", children: label })
      ]
    }
  );
});
function growToContent(el) {
  el.style.height = "auto";
  el.style.height = `${el.scrollHeight}px`;
}
export {
  Field,
  fieldVariants,
  growToContent
};
