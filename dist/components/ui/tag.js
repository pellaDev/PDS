import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";
import { usePdsConfig } from "../../config";
import { useIsMobile } from "../../hooks/use-mobile";
import { fieldVariants } from "./field";
const tagVariants = cva(
  "inline-flex items-center whitespace-nowrap border-transparent font-light font-sans [border-radius:var(--radius-sm)] [padding-inline:var(--dim-sss)] [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] [letter-spacing:0.25px]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        error: "bg-destructive text-destructive-foreground",
        alert: "bg-accent text-accent-foreground",
        ready: "bg-success text-success-foreground",
        disabled: "bg-primary text-primary-foreground [opacity:var(--opacity-disabled)]"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Tag({ className, variant, onDismiss, children, ...props }) {
  return /* @__PURE__ */ jsxs(
    "span",
    {
      "data-slot": "tag",
      className: cn(tagVariants({ variant }), onDismiss && "hover-elevate", className),
      ...props,
      children: [
        children,
        onDismiss ? /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            "aria-label": "Remove tag",
            onClick: onDismiss,
            className: "ml-1 inline-flex items-center justify-center rounded-full opacity-60 transition-opacity hover:opacity-100",
            children: /* @__PURE__ */ jsx(X, { size: 12, strokeWidth: 2.5 })
          }
        ) : null
      ]
    }
  );
}
function TagToggle({ className, variant, defaultOn = true, children }) {
  const [on, setOn] = React.useState(defaultOn);
  if (!on) {
    return /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        "aria-label": "Enable tag",
        onClick: () => setOn(true),
        className: cn(
          tagVariants({ variant: "disabled" }),
          "cursor-pointer hover-elevate",
          className
        ),
        children
      }
    );
  }
  return /* @__PURE__ */ jsxs("span", { className: cn(tagVariants({ variant }), "hover-elevate cursor-pointer", className), children: [
    children,
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        "aria-label": "Disable tag",
        onClick: () => setOn(false),
        className: "ml-1 inline-flex items-center justify-center rounded-full opacity-60 transition-opacity hover:opacity-100",
        children: /* @__PURE__ */ jsx(X, { size: 12, strokeWidth: 2.5 })
      }
    )
  ] });
}
function TagInput({
  tags,
  onAdd,
  onRemove,
  placeholder = "Add a tag",
  className,
  ...props
}) {
  const { fieldStyle } = usePdsConfig();
  const size = useIsMobile() ? "lg" : "sm";
  const [draft, setDraft] = React.useState("");
  const commit = () => {
    const value = draft.trim().replace(/,$/, "");
    if (value && !tags.includes(value)) onAdd(value);
    setDraft("");
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      "data-composition": "tag-input",
      className: cn(fieldVariants({ size, tone: fieldStyle }), className),
      ...props,
      children: [
        tags.map((tag) => /* @__PURE__ */ jsx(Tag, { variant: "default", onDismiss: () => onRemove(tag), children: tag }, tag)),
        /* @__PURE__ */ jsx(
          "input",
          {
            className: "pds-field__input",
            value: draft,
            onChange: (event) => setDraft(event.target.value),
            onKeyDown: (event) => {
              if (event.key === "Enter" || event.key === ",") {
                event.preventDefault();
                commit();
              } else if (event.key === "Backspace" && draft === "" && tags.length) {
                onRemove(tags[tags.length - 1]);
              }
            },
            placeholder: tags.length ? "" : placeholder,
            "aria-label": placeholder
          }
        )
      ]
    }
  );
}
export {
  Tag,
  TagInput,
  TagToggle,
  tagVariants
};
