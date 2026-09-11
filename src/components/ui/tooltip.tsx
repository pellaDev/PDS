import * as React from "react"
import "./tooltip.css"

export type TooltipVariant = "default" | "alert" | "error"

export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  
  content: string
  
  variant?: TooltipVariant
}

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
