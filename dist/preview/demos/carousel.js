import { jsx, jsxs } from "react/jsx-runtime";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "../../components/ui/carousel";
function CarouselDemo() {
  return /* @__PURE__ */ jsx("div", { className: "max-w-md px-12 py-6", children: /* @__PURE__ */ jsxs(Carousel, { opts: { loop: true }, children: [
    /* @__PURE__ */ jsx(CarouselContent, { children: [1, 2, 3].map((item) => /* @__PURE__ */ jsx(CarouselItem, { children: /* @__PURE__ */ jsx("div", { className: "flex aspect-[4/3] items-center justify-center rounded-xl border bg-card [font-size:var(--type-h3-size)] [line-height:var(--type-h3-lh)] font-light", children: item }) }, item)) }),
    /* @__PURE__ */ jsx(CarouselPrevious, {}),
    /* @__PURE__ */ jsx(CarouselNext, {})
  ] }) });
}
export {
  CarouselDemo
};
