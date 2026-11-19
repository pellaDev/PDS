import { jsx } from "react/jsx-runtime";
import { Loader2Icon } from "lucide-react";
import { cn } from "../../lib/utils";
function Spinner({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    Loader2Icon,
    {
      role: "status",
      "aria-label": "Loading",
      className: cn("size-[var(--dim-mmmm)] animate-spin", className),
      ...props
    }
  );
}
export {
  Spinner
};
