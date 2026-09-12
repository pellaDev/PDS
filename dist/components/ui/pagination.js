import { jsx, jsxs } from "react/jsx-runtime";
import "./pagination.css";
function buildItems(current, total) {
  const wanted = /* @__PURE__ */ new Set([1, total]);
  for (const n of [current - 2, current - 1, current, current + 1, current + 2]) if (n >= 1 && n <= total) wanted.add(n);
  const sorted = [...wanted].sort((a, b) => a - b);
  const out = [];
  for (const n of sorted) {
    const prev = out[out.length - 1];
    if (prev !== void 0 && typeof prev === "number" && n - prev > 1) out.push("gap");
    out.push(n);
  }
  return out;
}
function Chevron({ dir }) {
  return /* @__PURE__ */ jsx("svg", { width: "8", height: "12", viewBox: "0 0 8 12", fill: "none", "aria-hidden": true, children: dir === "left" ? /* @__PURE__ */ jsx("path", { d: "M6.4 1L2.4 6L6.4 11", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round" }) : /* @__PURE__ */ jsx("path", { d: "M1.6 1L5.6 6L1.6 11", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round" }) });
}
function Pagination({ total = 1, current = 1, ...props }) {
  const items = buildItems(Math.min(current, Math.max(total, 1)), Math.max(total, 1));
  return /* @__PURE__ */ jsx("nav", { "aria-label": "Pagination", ...props, children: /* @__PURE__ */ jsxs("div", { className: "pds-pg", children: [
    /* @__PURE__ */ jsx("button", { type: "button", className: "pds-pg__cell pds-pg__cell--prev", disabled: current <= 1, "aria-label": "Previous page", children: /* @__PURE__ */ jsx(Chevron, { dir: "left" }) }),
    items.map(
      (item, i) => item === "gap" ? /* @__PURE__ */ jsx("span", { className: "pds-pg__cell pds-pg__ellipsis", "aria-hidden": true, children: "..." }, "gap-" + i) : /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "pds-pg__cell " + (item % 2 === 1 ? "pds-pg__cell--odd" : "pds-pg__cell--even"),
          "aria-current": item === current ? "page" : void 0,
          children: item
        },
        item
      )
    ),
    /* @__PURE__ */ jsx("button", { type: "button", className: "pds-pg__cell pds-pg__cell--next", disabled: current >= total, "aria-label": "Next page", children: /* @__PURE__ */ jsx(Chevron, { dir: "right" }) })
  ] }) });
}
Pagination.displayName = "Pella Pagination";
export {
  Pagination
};
