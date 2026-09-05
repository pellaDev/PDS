import * as React from "react"
import "./select.css"

export interface SelectOption {
  value: string
  label?: string
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "options"> {
  /** Flat option list; strings or {value,label}. */
  options?: (string | SelectOption)[]
  /** Renders the error state of dropdowns.json - full red fill with light label, per export. */
  error?: boolean
}

/** Pella Select trigger - tokens/components/dropdowns.json. The token family only defines the closed control
    (no listbox leaves exist), so a styled native select is the faithful port; its popup stays browser-native. */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { options = [], error: isError, disabled, ...props },
  ref,
) {
  return (
    <span className="pds-select">
      <select ref={ref} data-error={isError || undefined} disabled={disabled} {...props}>
        {options.map((o) => {
          const value = typeof o === "string" ? o : o.value
          const label = typeof o === "string" ? o : (o.label ?? o.value)
          return (
            <option key={value} value={value}>
              {label}
            </option>
          )
        })}
      </select>
      <span className="pds-select__icon" aria-hidden>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path d="M1 1.2L5 4.8L9 1.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </span>
    </span>
  )
})

Select.displayName = "Pella Select"
