import { jsx, jsxs } from "react/jsx-runtime";
import { Button } from "../../components/ui/button";
import { Spinner } from "../../components/ui/spinner";
import { Row } from "../parts";
function SpinnerDemo() {
  return /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxs(Row, { label: "Sizes and context", children: [
    /* @__PURE__ */ jsx(Spinner, { className: "size-4 text-primary" }),
    /* @__PURE__ */ jsx(Spinner, { className: "size-6 text-primary" }),
    /* @__PURE__ */ jsx(Spinner, { className: "size-8 text-primary" }),
    /* @__PURE__ */ jsxs(Button, { disabled: true, children: [
      /* @__PURE__ */ jsx(Spinner, {}),
      " Saving"
    ] })
  ] }) });
}
export {
  SpinnerDemo
};
