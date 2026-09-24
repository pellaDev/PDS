import { jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Calendar } from "../../components/ui/calendar";
function CalendarDemo() {
  const [selected, setSelected] = useState(new Date(2026, 6, 20));
  return /* @__PURE__ */ jsx("div", { className: "w-fit p-4", children: /* @__PURE__ */ jsx(
    Calendar,
    {
      mode: "single",
      defaultMonth: new Date(2026, 6, 1),
      selected,
      onSelect: setSelected
    }
  ) });
}
export {
  CalendarDemo
};
