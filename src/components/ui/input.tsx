import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { usePdsConfig } from "../../config"
import "./field.css"

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