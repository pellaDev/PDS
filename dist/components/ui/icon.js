import { jsx } from "react/jsx-runtime";
import {
  createContext,
  useContext
} from "react";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp
} from "lucide-react";
const defaultIconSet = {
  check: Check,
  "chevron-down": ChevronDown,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "chevron-up": ChevronUp
};
const IconSetContext = createContext(defaultIconSet);
function IconSetProvider({
  icons,
  children
}) {
  return /* @__PURE__ */ jsx(IconSetContext.Provider, { value: { ...defaultIconSet, ...icons }, children });
}
function Icon({
  name,
  ...props
}) {
  const iconSet = useContext(IconSetContext);
  const IconComponent = iconSet[name] ?? defaultIconSet[name];
  return /* @__PURE__ */ jsx(IconComponent, { "aria-hidden": "true", ...props });
}
export {
  Icon,
  IconSetContext,
  IconSetProvider,
  defaultIconSet
};
