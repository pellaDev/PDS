import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { usePdsConfig } from "../../config"
import "./field.css"

/**
 * Input — bare Pella DS field (no label). Same tone/state system as Field (see field.tsx):
 * the <input> IS the .pds-field container, so all tone/state geometry lives in field.css.
 * Source of truth: tokens/components/fields.json — "fill" = pella.comp.field.{small,large}.brand,
 * "outline" = {smallBorder,largeBorder}; size sm/lg map to small/large (40/56px).
 */
const inputVariants = cva(
  "pds-field font-light",
  {
    variants: {
      size: { sm: "[--field-h:var(--dim-lll)]", lg: "[--field-h:var(--dim-l)]" },
      tone: { fill: "pds-field--fill", outline: "pds-field--outline" },
    },
    defaultVariants: { size: "sm" },
  }
)

export interface InputProps
  extends Omit<React.ComponentPropsWithoutRef<"input">, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size, tone, ...props }, ref) => {
    // No explicit tone -> the installation's field style (pds/config: "fill" | "outline").
    const { fieldStyle } = usePdsConfig()
    return (
      <input
        type={type}
        ref={ref}
        {...props}
        className={cn(inputVariants({ size, tone: tone ?? fieldStyle }), className)}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }