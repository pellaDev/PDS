import { jsx, jsxs } from "react/jsx-runtime";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "../../components/ui/accordion";
function AccordionDemo() {
  return /* @__PURE__ */ jsx("div", { className: "max-w-lg px-6", children: /* @__PURE__ */ jsxs(Accordion, { type: "single", collapsible: true, defaultValue: "item-1", children: [
    /* @__PURE__ */ jsxs(AccordionItem, { value: "item-1", children: [
      /* @__PURE__ */ jsx(AccordionTrigger, { children: "Is it accessible?" }),
      /* @__PURE__ */ jsx(AccordionContent, { children: "Yes. It follows keyboard and screen-reader interaction patterns." })
    ] }),
    /* @__PURE__ */ jsxs(AccordionItem, { value: "item-2", children: [
      /* @__PURE__ */ jsx(AccordionTrigger, { children: "Can it be animated?" }),
      /* @__PURE__ */ jsx(AccordionContent, { children: "Open and close states include motion-ready data attributes." })
    ] })
  ] }) });
}
export {
  AccordionDemo
};
