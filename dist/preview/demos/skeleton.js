import { jsx, jsxs } from "react/jsx-runtime";
import { Skeleton } from "../../components/ui/skeleton";
function SkeletonDemo() {
  return /* @__PURE__ */ jsxs("div", { className: "flex max-w-md items-center gap-4 p-6", children: [
    /* @__PURE__ */ jsx(Skeleton, { className: "h-12 w-12 rounded-full" }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-2/3" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-full" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-4/5" })
    ] })
  ] });
}
export {
  SkeletonDemo
};
