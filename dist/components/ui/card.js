import { jsx } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import "./card.css";
const cardVariants = cva(
  "pds-card rounded-lg border [background-color:var(--pds-card-bg)] text-card-foreground [border-color:var(--pds-container-border-color)] shadow",
  {
    variants: {
      variant: {
        plain: "",
        fadeHeader: "",
        mediaTop: "",
        mediaTopFadeHeader: ""
      }
    },
    defaultVariants: { variant: "plain" }
  }
);
const Card = React.forwardRef(({ className, variant, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    "data-slot": "card",
    "data-variant": variant,
    className: cn(cardVariants({ variant, className })),
    ...props
  }
));
Card.displayName = "Card";
const CardHeader = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      "data-slot": "card-header",
      className: cn("flex flex-col space-y-1.5 p-6", className),
      ...props
    }
  )
);
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      "data-slot": "card-title",
      className: cn("font-semibold leading-none tracking-tight", className),
      ...props
    }
  )
);
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      "data-slot": "card-description",
      className: cn("text-sm text-muted-foreground", className),
      ...props
    }
  )
);
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, "data-slot": "card-content", className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      "data-slot": "card-footer",
      className: cn("flex items-center p-6 pt-0", className),
      ...props
    }
  )
);
CardFooter.displayName = "CardFooter";
function CardMedia({ image, children, className }) {
  if (!image && !children) return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-media",
      className: cn("[border-radius:inherit]", className),
      style: image ? { backgroundImage: "url(" + image + ")" } : void 0,
      children
    }
  );
}
CardMedia.displayName = "CardMedia";
export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
  CardTitle,
  cardVariants
};
