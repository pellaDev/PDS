import * as React from "react"
import "./tooltip.css"

/** Pella Tooltip - tokens/components/tooltips.json. CSS-only reveal (hover / focus-within); the export defines no
    interaction leaves, so a portal-free wrapper span is the faithful minimal port. */
export type TooltipVariant = "default" | "alert" | "error"

export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Bubble text content (label node in the token family). */
  content: string
  /** Token variant - brand.default / alert / error. @default "default" */
  variant?: TooltipVariant
}

/** Wrap a focusable trigger; the bubble appears above it on hover or keyboard focus of any child. */
export function Tooltip({ content, variant = "default", children, ...props }: TooltipProps) {
  return (
    <span className="pds-tooltip" {...props}>
      {children}
      <span role="tooltip" className="pds-tooltip__bubble" data-variant={variant}>
        {content}
      </span>
    </span>
  )
}

Tooltip.displayName = "Pella Tooltip"
