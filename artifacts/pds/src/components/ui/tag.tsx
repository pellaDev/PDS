import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

// Tag - original composition (tokens/components/tags.json).
// States: default / error / alert / ready / disabled. Each state is a solid container fill with the sss corner radius; disabled adds opacity.disabled to the whole container.
// No hover/focus/active layers are exported for tags, so states stay flat except for that fade.
const tagVariants = cva(
  "inline-flex items-center whitespace-nowrap border-transparent font-light font-sans [border-radius:var(--radius-sm)] [padding-inline:var(--dim-sss)] [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] [letter-spacing:0.25px]" +
  " hover-elevate ",
  {
    variants: {
      variant: {
        // fill pella.sys.color.custom.light - theme-aware primary role (#204384 light / #6C8FCB dark).
        default: "bg-primary text-primary-foreground",
        // fill pella.sys.color.red via semantic.error (#EE1F25 in both themes).
        error: "bg-destructive text-destructive-foreground",
        // fill pella.sys.color.yellow via semantic.alert (#CFEC14), dark label per accent foreground.
        alert: "bg-accent text-accent-foreground",
        // fill pella.sys.color.green - light #218A38 / dark #5BB86B, readable labels on both themes.
        ready: "bg-success text-success-foreground",
        // original disabled state: same container fill as default plus opacity.disabled on the whole pill.
        disabled: "bg-primary text-primary-foreground [opacity:var(--opacity-disabled)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof tagVariants> {}

function Tag({ className, variant, ...props }: TagProps) {
  return <span className={cn(tagVariants({ variant }), className)} {...props} />;
}

export { Tag, tagVariants }
