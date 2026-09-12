import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "../../lib/utils";
function getThumbCount(value, defaultValue) {
  const v = value ?? defaultValue;
  if (Array.isArray(v)) return Math.max(1, v.length);
  return 1;
}
const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));
const toPercent = (value, min, max) => max === min ? 0 : clamp(100 * (value - min) / (max - min), 0, 100);
function thumbOffsetPx(percent, direction) {
  const half = 8;
  const lin = percent / 50 * half;
  return (half - lin * direction) * direction;
}
const normalizeValues = (v) => {
  if (v == null) return [];
  return Array.isArray(v) ? v.map(Number) : [Number(v)];
};
const Slider = React.forwardRef(({ className, children, orientation = "horizontal", min, max, step, value, defaultValue, onValueChange, inverted, ...props }, ref) => {
  const vertical = orientation === "vertical";
  const lo = Number(min ?? 0);
  const hi = Number(max ?? 100);
  const isControlled = value !== void 0 && value !== null;
  const [internal, setInternal] = React.useState(() => normalizeValues(defaultValue));
  const vals = isControlled ? normalizeValues(value) : internal;
  const trackRef = React.useRef(null);
  const [trackSize, setTrackSize] = React.useState(0);
  React.useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setTrackSize(vertical ? r.height : r.width);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [vertical]);
  const direction = inverted ? -1 : 1;
  const slidingFromStart = direction === 1;
  const centers = vals.map((v) => {
    const pct = toPercent(v, lo, hi);
    return pct / 100 * trackSize + thumbOffsetPx(pct, direction);
  });
  const minC = centers.length ? Math.min(...centers) : 0;
  const maxC = centers.length ? Math.max(...centers) : 0;
  const fillAnchor = vals.length === 1 ? 0 : minC;
  const fillSpan = vals.length === 1 ? centers[0] ?? 0 : Math.max(0, maxC - minC);
  let fillStyle = { display: "none" };
  if (trackSize > 0 && vals.length) {
    if (vertical) {
      fillStyle = slidingFromStart ? { bottom: fillAnchor, height: fillSpan } : { top: fillAnchor, height: fillSpan };
    } else {
      fillStyle = slidingFromStart ? { left: fillAnchor, width: fillSpan } : { right: fillAnchor, width: fillSpan };
    }
  }
  const handleValueChange = (next) => {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };
  return /* @__PURE__ */ jsx(
    SliderPrimitive.Root,
    {
      ref,
      orientation,
      min: lo,
      max: hi,
      step: step ?? void 0,
      inverted,
      value: isControlled ? value : void 0,
      defaultValue: isControlled ? void 0 : normalizeValues(defaultValue).length ? normalizeValues(defaultValue) : [lo],
      onValueChange: handleValueChange,
      className: cn(
        "group/slider relative flex touch-none select-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-[var(--opacity-disabled)]",
        vertical ? "h-full w-4 justify-center" : "w-full items-center",
        className
      ),
      ...props,
      children: children ?? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          SliderPrimitive.Track,
          {
            ref: trackRef,
            className: cn(
              "relative grow overflow-hidden rounded-full bg-(--state-track-idle)",
              vertical ? "h-full w-1.5" : "h-1.5 w-full"
            ),
            children: /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "absolute h-full w-full bg-primary", style: fillStyle })
          }
        ),
        Array.from({ length: Math.max(vals.length, getThumbCount(value, defaultValue)) }, (_, i) => /* @__PURE__ */ jsx(
          SliderPrimitive.Thumb,
          {
            className: "block size-4 rounded-full border border-(--state-thumb-border) bg-background shadow transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring data-[disabled]:pointer-events-none"
          },
          i
        ))
      ] })
    }
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;
export {
  Slider
};
