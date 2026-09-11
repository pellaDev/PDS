import * as React from "react";
import { cn } from "../../lib/utils";
import "./checkbox.css";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  
  label: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, disabled, ...props }, ref) => (
    <label
      className={cn("pds-checkbox", className)}
      {...(disabled ? { "data-disabled": true } : {})}
    >
      <input type="checkbox" ref={ref} disabled={disabled} {...props} />
      <span className="pds-checkbox__icon" aria-hidden>
        <svg viewBox="0 0 16 16" width="16" height="16">
          <path
            d="M3.4 8.6l3 3L12.6 5"
            fill="none"
            stroke="currentColor" 
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span>{label}</span>
    </label>
  ),
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
