import * as React from "react"
import "./switch.css"

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Optional row label rendered beside the switch (label node of the token family, body2). */
  label?: string
}

/** Pella Toggle - tokens/components/toggles.json. Native checkbox drives every state in pure CSS; no JS state needed. */
export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, disabled, ...props },
  ref,
) {
  return (
    <label data-disabled={disabled || undefined} style={{ display: "inline-flex" }}>
      <span className="pds-toggle">
        <input ref={ref} type="checkbox" disabled={disabled} {...props} />
        <span className="pds-toggle__switch" aria-hidden>
          <span className="pds-toggle__thumb" />
        </span>
        {label ? (
          <span style={{ display: "inline-flex", alignItems: "center" }}>{label}</span>
        ) : null}
      </span>
    </label>
  )
})

Switch.displayName = "Pella Switch"
