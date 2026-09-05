import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

/**
 * Badge - source of truth: tokens/components/badges.json (pella.comp.badge.*).
 *
 * Two shapes are exported by the original system:
 *  simple   -> badge.simple.brand.{default,error,alert,ready,disabled}.container
 *              fill = custom.light / red / yellow / green / custom.light+opacity.disabled,
 *              borderRadius = coreDimensions.sss (4px). No label/typography/spacing tokens are
 *              exported for this shape: it is a status marker and the component sets no size of
 *              its own - geometry belongs to the composition context.
 *  numbered -> badge.numbered.brand.*.container + .label plus the shared spacing token
 *              badge.spacing.numbered.labelSpacing = "0 {sss}" (vertical zero, horizontal sss=4px):
 *              borderRadius ss (8px), caption typography, label fill graySoft #E4E3E3 in every
 *              state EXCEPT alert which uses blackSoft #383838.
 * Colors: default/disabled fills ride var(--primary) so they follow the live brand picker;
 * red EE1F25 / yellow CFEC14 (accent role) are theme-fixed system colors from first.json.
 */
const badgeVariants = cva(
  // Roboto Light is the only face in the system; state wash applied at use site.
  "inline-flex items-center justify-center whitespace-nowrap border-transparent font-light font-sans hover-elevate ",
  {
    variants: {
      shape: {
        simple: "[border-radius:var(--dim-sss)]", // sss = 4px
        numbered:
          "[border-radius:var(--dim-ss)] [padding-block:0rem] [padding-inline:var(--dim-sss)]" +
          " [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] [letter-spacing:0.25px]", // ss = 8px, labelSpacing "0 {sss}"
      },
      variant: {
        default: "bg-primary", // custom.light -> live --primary
        error: "bg-destructive", // sys.color.red, fixed both themes
        alert: "bg-accent", // sys.color.yellow = accent role CFEC14
        ready: "bg-success", // sys.color.green 218A38 / dark 5BB86B via success role
        disabled: "bg-primary [opacity:var(--opacity-disabled)]",
      },
    },
    compoundVariants: [
      { shape: "numbered", variant: "default", className: "text-gray-soft" }, // graySoft label fill (theme-fixed scale step)
      { shape: "numbered", variant: "error", className: "text-gray-soft" },
      { shape: "numbered", variant: "alert", className: "text-black-soft" }, // blackSoft, alert only
      { shape: "numbered", variant: "ready", className: "text-gray-soft" },
      { shape: "numbered", variant: "disabled", className: "text-gray-soft" },
    ],
    defaultVariants: {
      shape: "simple",
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, shape, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ shape, variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
