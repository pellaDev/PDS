import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '../../lib/utils';

/**
 * Radix >=1.4 renders one thumb per <SliderPrimitive.Thumb> element (collections API),
 * it no longer clones a single Thumb across all values of the array — so we render as
 * many Thumb elements as there are slider values.
 */
function getThumbCount(value?: number | number[], defaultValue?: number | number[]): number {
  const v = value ?? defaultValue;
  if (Array.isArray(v)) return Math.max(1, v.length);
  return 1;
}

/* ------------------------------------------------------------------ *
 * Fill geometry — align the active colour to the ACTUAL ball centres.
 *
 * This Radix build keeps each thumb inside track bounds by pulling it toward
 * centre with a per-value offset (getThumbInBoundsOffset), while its <Range>
 * still spans pure value-percentages to the track edges. Net effect: the fill
 * pokes ~half-a-thumb past the ball(s) — most visible on vertical sliders.
 *
 * We cannot correct that with a constant (the offset varies with the value), so
 * we stop using Radix's auto-sized <Range> and instead position our own colour
 * from measured track length to exactly span [first..last] ball-centre, reusing
 * Radix's identical in-bounds formula. Works for any value/orientation.
 * ------------------------------------------------------------------ */

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const toPercent = (value: number, min: number, max: number) =>
  max === min ? 0 : clamp((100 * (value - min)) / (max - min), 0, 100);

// Mirror of Radix's internal getThumbInBoundsOffset(thumbSize, percent, direction) — this Radix
// build measures the rendered thumb itself; ours is size-3 (12px = coreDimensions.s), so half = 6.
function thumbOffsetPx(percent: number, direction: 1 | -1): number {
  const half = 6; // size-3 / 2 in the main axis (px)
  const lin = (percent / 50) * half;
  return (half - lin * direction) * direction;
}

const normalizeValues = (v?: number | number[]): number[] => {
  if (v == null) return [];
  return Array.isArray(v) ? v.map(Number) : [Number(v)];
};

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(
  (
    {
      className,
      children,
      orientation = 'horizontal',
      min,
      max,
      step,
      value,
      defaultValue,
      onValueChange,
      inverted,
      ...props
    },
    ref,
  ) => {
    const vertical = orientation === 'vertical';
    const lo = Number(min ?? 0);
    const hi = Number(max ?? 100);

    // Current values: controlled (prop `value`) or mirrored locally for uncontrolled.
    const isControlled = value !== undefined && value !== null;
    const [internal, setInternal] = React.useState<number[]>(() => normalizeValues(defaultValue));
    const vals = isControlled ? normalizeValues(value) : internal;

    // Track main-axis length in px (measured so the fill can be placed in exact pixels).
    const trackRef = React.useRef<any>(null);
    const [trackSize, setTrackSize] = React.useState(0);
    React.useLayoutEffect(() => {
      const el = trackRef.current as HTMLElement | null;
      if (!el || typeof ResizeObserver === 'undefined') return;
      const measure = () => {
        const r = el.getBoundingClientRect();
        setTrackSize(vertical ? r.height : r.width);
      };
      measure();
      const ro = new ResizeObserver(measure);
      ro.observe(el);
      return () => ro.disconnect();
    }, [vertical]);

    // Mirror Radix: non-inverted starts at the low end (bottom / left).
    const direction: 1 | -1 = inverted ? -1 : 1;
    const slidingFromStart = direction === 1;

    // Ball centres, distance from the start edge in px.
    const centers = vals.map((v) => {
      const pct = toPercent(v, lo, hi);
      return (pct / 100) * trackSize + thumbOffsetPx(pct, direction);
    });
    const minC = centers.length ? Math.min(...centers) : 0;
    const maxC = centers.length ? Math.max(...centers) : 0;
    // Active fill: a RANGE spans between the two balls; a SINGLE value spans start edge -> ball
    // (a single value's active part is not zero-width). centres are measured from the start edge.
    const fillAnchor = vals.length === 1 ? 0 : minC;
    const fillSpan = vals.length === 1 ? (centers[0] ?? 0) : Math.max(0, maxC - minC);

    let fillStyle: React.CSSProperties = { display: 'none' };
    if (trackSize > 0 && vals.length) {
      if (vertical) {
        fillStyle = slidingFromStart
          ? { bottom: fillAnchor, height: fillSpan }
          : { top: fillAnchor, height: fillSpan };
      } else {
        fillStyle = slidingFromStart
          ? { left: fillAnchor, width: fillSpan }
          : { right: fillAnchor, width: fillSpan };
      }
    }

    const handleValueChange = (next: number[]) => {
      if (!isControlled) setInternal(next);
      onValueChange?.(next);
    };

    return (
      <SliderPrimitive.Root
        ref={ref}
        orientation={orientation}
        min={lo}
        max={hi}
        step={step ?? undefined}
        inverted={inverted}
        value={isControlled ? value : undefined}
        defaultValue={
          isControlled
            ? undefined
            : normalizeValues(defaultValue).length
              ? normalizeValues(defaultValue)
              : [lo]
        }
        onValueChange={handleValueChange}
        className={cn(
          'group/slider relative flex touch-none select-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-[var(--opacity-disabled)]',
          // Vertical root is w-2 (8px = coreDimensions.ss): the container hugs the track width, so the
          // 12px thumb overflows symmetrically on both sides. Token: pds.comp.slider.brand.vertical.
          vertical ? 'h-full w-2 justify-center' : 'w-full items-center',
          className,
        )}
        {...props}
      >
        {children ?? (
          <>
            <SliderPrimitive.Track
              ref={trackRef}
              className={cn(
                'relative grow overflow-hidden rounded-full bg-(--state-track-idle)',
                // Both axes run 8px (coreDimensions.ss): horizontal h-2, vertical w-2 — one scale value
                // for the track on either orientation.
                vertical ? 'h-full w-2' : 'h-2 w-full',
              )}
            >
              {/* Active/filled zone — brand primary. h-full/w-full give it full cross-axis extent so the
                inline main-axis sizing (left/width or top/height) actually renders; without a cross-axis
                size an absolute box with only left+width collapses to 0 height and the fill is invisible. */}
              <span
                aria-hidden="true"
                className="absolute h-full w-full bg-primary"
                style={fillStyle}
              />
            </SliderPrimitive.Track>
            {Array.from(
              { length: Math.max(vals.length, getThumbCount(value as any, defaultValue as any)) },
              (_, i) => (
                <SliderPrimitive.Thumb
                  key={i}
                  className="block size-3 rounded-full bg-primary shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring data-[disabled]:pointer-events-none"
                />
              ),
            )}
          </>
        )}
      </SliderPrimitive.Root>
    );
  },
);
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
