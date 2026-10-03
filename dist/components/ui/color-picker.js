import { jsx, jsxs } from "react/jsx-runtime";
import { Check, RotateCcw, X } from "lucide-react";
function normalizeHex(value) {
  let h = value.replace("#", "").trim();
  if (h.length === 3)
    h = h.split("").map((c) => c + c).join("");
  return "#" + h.toLowerCase();
}
function relLuminance(hex) {
  const h = normalizeHex(hex).slice(1);
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const a = [r, g, b].map((v) => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}
function contrastRatio(a, b) {
  const la = relLuminance(a);
  const lb = relLuminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}
function ColorPicker({
  value,
  onChange,
  label,
  checks = false,
  checkAgainst = [],
  minContrast = 3,
  resetValue
}) {
  const hex = normalizeHex(value);
  const ratios = checks && checkAgainst.length > 0 ? checkAgainst.map((bg) => contrastRatio(hex, bg)) : [];
  const worst = ratios.length > 0 ? Math.min(...ratios) : null;
  const ok = worst !== null && worst >= minContrast;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      "data-slot": "color-picker",
      className: "flex items-center gap-2 rounded-md border bg-background px-2.5 py-1.5 transition-colors hover:bg-secondary",
      children: [
        /* @__PURE__ */ jsxs(
          "span",
          {
            className: "relative block size-6 shrink-0 cursor-pointer overflow-hidden rounded",
            title: label,
            children: [
              /* @__PURE__ */ jsx("span", { "aria-hidden": true, className: "absolute inset-0", style: { backgroundColor: hex } }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "color",
                  value: hex,
                  onChange: (e) => onChange?.(e.target.value),
                  "aria-label": label,
                  className: "absolute inset-0 size-full cursor-pointer opacity-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "font-mono uppercase [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)]", children: hex }),
        checks && worst !== null && /* @__PURE__ */ jsxs(
          "span",
          {
            "data-slot": "color-picker-check",
            title: "Contrast on " + checkAgainst.length + " background(s): " + worst.toFixed(2) + " worst case (needs \u2265 " + minContrast + ")",
            className: "ml-auto flex items-center gap-1",
            style: {
              color: ok ? "var(--pds-color-check-pass, #218A38)" : "var(--pds-color-check-fail, #EE1F25)"
            },
            children: [
              ok ? /* @__PURE__ */ jsx(Check, { size: 12 }) : /* @__PURE__ */ jsx(X, { size: 12 }),
              /* @__PURE__ */ jsx("span", { className: "[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)]", children: worst.toFixed(2) })
            ]
          }
        ),
        resetValue && /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => onChange?.(normalizeHex(resetValue)),
            title: "Reset color to default",
            "aria-label": "Reset color to default",
            className: (checks ? "" : "ml-auto ") + "rounded p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
            children: /* @__PURE__ */ jsx(RotateCcw, { size: 12 })
          }
        )
      ]
    }
  );
}
export {
  ColorPicker
};
