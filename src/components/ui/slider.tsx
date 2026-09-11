import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "../../lib/utils"

function getThumbCount(value?: number | number[], defaultValue?: number | number[]): number {
  const v = value ?? defaultValue
  if (Array.isArray(v)) return Math.max(1, v.length)
  return 1
}

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n))
const toPercent = (value: number, min: number, max: number) =>
  max === min ? 0 : clamp((100 * (value - min)) / (max - min), 0, 100)

function thumbOffsetPx(percent: number, direction: 1 | -1): number {
  const half = 8 
  const lin = (percent / 50) * half
  return (half - lin * direction) * direction
}

const normalizeValues = (v?: number | number[]): number[] => {
  if (v == null) return []
  return Array.isArray(v) ? v.map(Number) : [Number(v)]
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, children, orientation = "horizontal", min, max, step, value, defaultValue, onValueChange, inverted, ...props }, ref) => {
  const vertical = orientation === "vertical"
  const lo = Number(min ?? 0)
  const hi = Number(max ?? 100)

  
  const isControlled = value !== undefined && value !== null
  const [internal, setInternal] = React.useState<number[]>(() => normalizeValues(defaultValue))
  const vals = isControlled ? normalizeValues(value) : internal

  
  const trackRef = React.useRef<any>(null)
  const [trackSize, setTrackSize] = React.useState(0)
  React.useLayoutEffect(() => {
    const el = trackRef.current as HTMLElement | null
    if (!el || typeof ResizeObserver === "undefined") return
    const measure = () => {
      const r = el.getBoundingClientRect()
      setTrackSize(vertical ? r.height : r.width)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [vertical])

  
  const direction: 1 | -1 = inverted ? -1 : 1
  const slidingFromStart = direction === 1

  
  const centers = vals.map((v) => {
    const pct = toPercent(v, lo, hi)
    return (pct / 100) * trackSize + thumbOffsetPx(pct, direction)
  })
  const minC = centers.length ? Math.min(...centers) : 0
  const maxC = centers.length ? Math.max(...centers) : 0
  
  
  const fillAnchor = vals.length === 1 ? 0 : minC
  const fillSpan = vals.length === 1 ? (centers[0] ?? 0) : Math.max(0, maxC - minC)

  let fillStyle: React.CSSProperties = { display: "none" }
  if (trackSize > 0 && vals.length) {
    if (vertical) {
      fillStyle = slidingFromStart
        ? { bottom: fillAnchor, height: fillSpan }
        : { top: fillAnchor, height: fillSpan }
    } else {
      fillStyle = slidingFromStart
        ? { left: fillAnchor, width: fillSpan }
        : { right: fillAnchor, width: fillSpan }
    }
  }

  const handleValueChange = (next: number[]) => {
    if (!isControlled) setInternal(next)
    onValueChange?.(next)
  }

  return (
    <SliderPrimitive.Root
      ref={ref}
      orientation={orientation}
      min={lo}
      max={hi}
      step={step ?? undefined}
      inverted={inverted}
      value={isControlled ? value : undefined}
      defaultValue={isControlled ? undefined : (normalizeValues(defaultValue).length ? normalizeValues(defaultValue) : [lo])}
      onValueChange={handleValueChange}
      className={cn(
        "group/slider relative flex touch-none select-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-[var(--opacity-disabled)]",
        vertical ? "h-full w-4 justify-center" : "w-full items-center",
        className,
      )}
      {...props}
    >
      {children ?? (
        <>
          <SliderPrimitive.Track
            ref={trackRef}
            className={cn(
              "relative grow overflow-hidden rounded-full bg-(--state-track-idle)",
              vertical ? "h-full w-1.5" : "h-1.5 w-full",
            )}
          >
            {

}
            <span aria-hidden="true" className="absolute h-full w-full bg-primary" style={fillStyle} />
          </SliderPrimitive.Track>
          {Array.from({ length: Math.max(vals.length, getThumbCount(value as any, defaultValue as any)) }, (_, i) => (
            <SliderPrimitive.Thumb
              key={i}
              className="block size-4 rounded-full border border-(--state-thumb-border) bg-background shadow transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring data-[disabled]:pointer-events-none"
            />
          ))}
        </>
      )}
    </SliderPrimitive.Root>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }

