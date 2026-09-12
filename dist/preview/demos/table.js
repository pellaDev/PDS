import { jsx, jsxs } from "react/jsx-runtime";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "../../components/ui/table";
function TableDemo() {
  return /* @__PURE__ */ jsx("div", { className: "max-w-2xl p-4", children: /* @__PURE__ */ jsxs(Table, { children: [
    /* @__PURE__ */ jsx(TableCaption, { children: "Recent project usage." }),
    /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
      /* @__PURE__ */ jsx(TableHead, { children: "Project" }),
      /* @__PURE__ */ jsx(TableHead, { children: "Status" }),
      /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Hours" })
    ] }) }),
    /* @__PURE__ */ jsxs(TableBody, { children: [
      /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: "Launch site" }),
        /* @__PURE__ */ jsx(TableCell, { children: "Active" }),
        /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: "12" })
      ] }),
      /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: "Mobile app" }),
        /* @__PURE__ */ jsx(TableCell, { children: "Review" }),
        /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: "8" })
      ] })
    ] }),
    /* @__PURE__ */ jsx(TableFooter, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
      /* @__PURE__ */ jsx(TableCell, { colSpan: 2, children: "Total" }),
      /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: "20" })
    ] }) })
  ] }) });
}
export {
  TableDemo
};
