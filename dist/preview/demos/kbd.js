import { jsx, jsxs } from "react/jsx-runtime";
import { Command } from "lucide-react";
import { Kbd, KbdGroup } from "../../components/ui/kbd";
import { Row } from "../parts";
function KbdDemo() {
  return /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxs(Row, { label: "Keyboard shortcuts", children: [
    /* @__PURE__ */ jsx(Kbd, { children: "Esc" }),
    /* @__PURE__ */ jsxs(KbdGroup, { children: [
      /* @__PURE__ */ jsx(Kbd, { children: /* @__PURE__ */ jsx(Command, {}) }),
      /* @__PURE__ */ jsx("span", { children: "+" }),
      /* @__PURE__ */ jsx(Kbd, { children: "K" })
    ] }),
    /* @__PURE__ */ jsxs(KbdGroup, { children: [
      /* @__PURE__ */ jsx(Kbd, { children: "Ctrl" }),
      /* @__PURE__ */ jsx("span", { children: "+" }),
      /* @__PURE__ */ jsx(Kbd, { children: "Enter" })
    ] })
  ] }) });
}
export {
  KbdDemo
};
