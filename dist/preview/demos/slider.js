import { jsx, jsxs } from "react/jsx-runtime";
import { Slider } from "../../components/ui/slider";
import { Stack } from "../parts";
function SliderDemo() {
  return /* @__PURE__ */ jsxs("div", { className: "max-w-md space-y-6 p-6", children: [
    /* @__PURE__ */ jsx(Stack, { label: "Value", children: /* @__PURE__ */ jsx(Slider, { defaultValue: [40], max: 100, step: 1 }) }),
    /* @__PURE__ */ jsx(Stack, { label: "Range", children: /* @__PURE__ */ jsx(Slider, { defaultValue: [25, 75], max: 100, step: 5 }) }),
    /* @__PURE__ */ jsx(Stack, { label: "Vertical", children: /* @__PURE__ */ jsxs("div", { className: "flex h-40 items-center justify-center gap-8", children: [
      /* @__PURE__ */ jsx(Slider, { orientation: "vertical", defaultValue: [40], max: 100, step: 1 }),
      /* @__PURE__ */ jsx(Slider, { orientation: "vertical", defaultValue: [25, 75], max: 100, step: 5 }),
      /* @__PURE__ */ jsx(Slider, { orientation: "vertical", defaultValue: [60], max: 100, step: 1, disabled: true })
    ] }) }),
    /* @__PURE__ */ jsx(Stack, { label: "Disabled", children: /* @__PURE__ */ jsx(Slider, { defaultValue: [60], disabled: true }) })
  ] });
}
export {
  SliderDemo
};
