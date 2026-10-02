import { jsx } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
const badgeVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap border-transparent font-light font-sans rounded-full [box-shadow:var(--shadow-dots)] hover-elevate ",
  {
    variants: {
      shape: {
        simple: "[width:var(--dim-s)] [height:var(--dim-s)]",
        numbered: "[width:var(--dim-mmm)] [height:var(--dim-mmm)] [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] [letter-spacing:0.25px]"
      },
      variant: {
        default: "bg-primary",
        error: "bg-destructive",
        alert: "bg-accent",
        ready: "bg-success",
        disabled: "bg-primary [opacity:var(--opacity-disabled)]"
      }
    },
    compoundVariants: [
      { shape: "numbered", variant: "default", className: "text-primary-foreground" },
      { shape: "numbered", variant: "error", className: "text-destructive-foreground" },
      { shape: "numbered", variant: "alert", className: "text-accent-foreground" },
      { shape: "numbered", variant: "ready", className: "text-success-foreground" },
      { shape: "numbered", variant: "disabled", className: "text-primary-foreground" }
    ],
    defaultVariants: {
      shape: "simple",
      variant: "default"
    }
  }
);
function Badge({ className, shape, variant, count, children, ...props }) {
  const content = shape === "numbered" && typeof count === "number" ? count > 9 ? ".." : String(count) : children;
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ shape, variant }), className), ...props, children: content });
}
export {
  Badge,
  badgeVariants
};
