import { jsx, jsxs } from "react/jsx-runtime";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from "../../components/ui/chart";
const chartConfig = {
  desktop: { label: "Desktop", color: "var(--color-chart-1)" },
  mobile: { label: "Mobile", color: "var(--color-chart-2)" }
};
const chartData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 273, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 }
];
function ChartDemo() {
  return /* @__PURE__ */ jsxs("div", { className: "max-w-2xl p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsx("p", { className: "[font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light", children: "Monthly visitors" }),
      /* @__PURE__ */ jsx("p", { className: "[font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light text-muted-foreground", children: "Desktop and mobile traffic." })
    ] }),
    /* @__PURE__ */ jsx(ChartContainer, { config: chartConfig, className: "max-h-72 w-full", children: /* @__PURE__ */ jsxs(BarChart, { data: chartData, accessibilityLayer: true, children: [
      /* @__PURE__ */ jsx(CartesianGrid, { vertical: false }),
      /* @__PURE__ */ jsx(XAxis, { dataKey: "month", tickLine: false, axisLine: false }),
      /* @__PURE__ */ jsx(YAxis, { tickLine: false, axisLine: false, width: 30 }),
      /* @__PURE__ */ jsx(ChartTooltip, { content: /* @__PURE__ */ jsx(ChartTooltipContent, {}) }),
      /* @__PURE__ */ jsx(ChartLegend, { content: /* @__PURE__ */ jsx(ChartLegendContent, {}) }),
      /* @__PURE__ */ jsx(Bar, { dataKey: "desktop", fill: "var(--color-desktop)", radius: 4 }),
      /* @__PURE__ */ jsx(Bar, { dataKey: "mobile", fill: "var(--color-mobile)", radius: 4 })
    ] }) })
  ] });
}
export {
  ChartDemo
};
