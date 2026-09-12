import { jsx, jsxs } from "react/jsx-runtime";
import { Pagination } from "../../components/ui/pagination";
import { Row } from "../parts";
function PaginationDemo() {
  return /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsx(Row, { label: "Page 3 of 10 (windowing with ellipsis)", children: /* @__PURE__ */ jsx(Pagination, { total: 10, current: 3 }) }),
    /* @__PURE__ */ jsx(Row, { label: "Page 24 of 60 - long range, gaps collapse to ellipses", children: /* @__PURE__ */ jsx(Pagination, { total: 60, current: 24 }) }),
    /* @__PURE__ */ jsx(Row, { label: "First / last page (boundary arrows disabled)", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-8 items-center", children: [
      /* @__PURE__ */ jsx(Pagination, { total: 7, current: 1 }),
      /* @__PURE__ */ jsx(Pagination, { total: 7, current: 7 })
    ] }) })
  ] }) });
}
export {
  PaginationDemo
};
