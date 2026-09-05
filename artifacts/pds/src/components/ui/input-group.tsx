import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { usePdsConfig } from "../../config"
import { Button } from "./button"
import "./field.css"

/**
 * InputGroup — Pella DS field container holding a control + addons. The wrapper IS a
 * .pds-field (it wears the tone classes), so it renders exactly like a standalone Field of
 * the same tone/size: fill = graySoft box, outline = surface + brand border 1.6px; hover/focus
 * washes and the aria-invalid error rule come from field.css. Inner controls are bare
 * pds-field__input elements keeping their base 4/12 framing in both tones (see field.tsx for
 * the tone anatomy). Source of truth: tokens/components/fields.json.
 */
const inputGroupVariants = cva(
  "pds-field pds-field-group font-light relative flex w-full items-center outline-none",
  {
    variants: {
      size: { sm: "[--field-h:var(--dim-lll)]", lg: "[--field-h:var(--dim-l)]" },
      tone: { fill: "pds-field--fill", outline: "pds-field--outline" },
    },
    defaultVariants: { size: "sm" },
  }
)

export interface InputGroupProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof inputGroupVariants> {}

function InputGroup({ className, size, tone, ...props }: InputGroupProps) {
  // No explicit tone -> the installation's field style (pds/config: "fill" | "outline").
  const { fieldStyle } = usePdsConfig()
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        inputGroupVariants({ size, tone: tone ?? fieldStyle }),
        // Variants based on alignment.
        "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col",
        "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col",
        // Variants based on input size.
        "has-[>textarea]:h-auto"
      )}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  "flex items-center gap-2 whitespace-nowrap select-none",
  {
    variants: {
      align: {
        inline: "",
        "inline-start": "pl-3 pr-2",
        "inline-end": "pl-2 pr-3",
        "block-start": "px-3 pt-3",
        "block-end": "flex-wrap wrap justify-between gap-x-5 px-3 pb-3",
      },
    },
    compoundVariants: [
      {
        align: ["inline-start", "inline-end"],
        class:
          "[&+*]:border-0 [&+*]:pl-2 has-[>button]:px-2 has-[>button]:py-1.5 has-[>button]:h-auto has-[>button]:shrink-0 has-[>button]:rounded-none has-[>button]:border-0 has-[>button]:shadow-none has-[>button]:shadow-xs",
      },
      { align: "block-start", class: "[&>*]:pb-0" },
      { align: "block-end", class: "[&>*]:pt-0" },
    ],
    defaultVariants: { align: "inline" },
  }
)

function InputGroupAddon({
  className,
  align = "inline",
  ...props }: React.ComponentPropsWithoutRef<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      data-slot="input-group-text"
      className={cn(
        "flex h-auto items-center gap-2 text-sm font-normal select-none",
        className
      )}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva("px-2.5 rounded-none shadow-none", {
  variants: {
    size: {
      default: "h-auto",
      xs: "h-auto px-2.5",
      sm: "h-auto px-2.5",
      lg: "h-auto px-2.5",
      icon: "size-9",
      "icon-xs": "size-7",
      "icon-sm": "size-8",
      "icon-lg": "size-10",
    },
  },
  defaultVariants: { size: "default" },
})

function InputGroupButton({
  className,
  type = "button",
  size = "default",
  ...props }: Omit<React.ComponentPropsWithoutRef<"button">, "size"> &
  VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <Button
      type={type}
      data-size={size}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props }: React.ComponentPropsWithoutRef<"input">) {
  return (
    <input
      data-slot="input-group-control"
      {...props}
      className={cn("pds-field__input flex-1", className)}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props }: React.ComponentPropsWithoutRef<"textarea">) {
  return (
    <textarea
      data-slot="input-group-control"
      {...props}
      className={cn("pds-field__input flex-1 resize-none", className)}
    />
  )
}

export {
  InputGroup,
  InputGroupText,
  InputGroupButton,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
}