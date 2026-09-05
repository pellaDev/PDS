import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "../../lib/utils"

/**
 * Radix >=1.4 renders one thumb per <SliderPrimitive.Thumb> element (collections API),
 * it no longer clones a single Thumb across all values of the array — so we render as
 * many Thumb elements as there are slider values.
 */
function getThumbCount(value?: number | number[], defaultValue?: number | number[]): number {
  const v = value ?? defaultValue
  if (Array.isArray(v)) return Math.max(1, v.length)
  return 1
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, children, ...props }, ref) => {
  const thumbCount = getThumbCount(
    props.value as number | number[] | undefined,
    (props.defaultValue as number | number[] | undefined),
  )

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "group/slider relative flex w-full touch-none select-none items-center data-[disabled]:cursor-not-allowed",
        className,
      )}
      {...props}
    >
      {children ?? (
        <>
          <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-(--state-track-idle) group-data-[disabled]/slider:bg-muted">
            <SliderPrimitive.Range className="absolute h-full bg-primary group-data-[disabled]/slider:bg-muted-foreground" />
          </SliderPrimitive.Track>
          {Array.from({ length: thumbCount }, (_, i) => (
            <SliderPrimitive.Thumb
              key={i}
              className="block size-4 rounded-full border border-(--state-thumb-border) bg-background shadow transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring data-[disabled]:pointer-events-none data-[disabled]:border-muted-foreground data-[disabled]:bg-muted"
            />
          ))}
        </>
      )}
    </SliderPrimitive.Root>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
