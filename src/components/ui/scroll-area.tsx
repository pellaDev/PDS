import * as React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

import { cn } from '../../lib/utils';
import { useIsMobile } from '../../hooks/use-mobile';
import './scroll-area.css';

const IDLE_MS = 1200;

function useFingerDrag() {
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const drag = React.useRef<{ x: number; y: number; left: number; top: number } | null>(null);
  const isMobile = useIsMobile();

  const start = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isMobile || event.button !== 0) return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = {
      x: event.clientX,
      y: event.clientY,
      left: viewport.scrollLeft,
      top: viewport.scrollTop,
    };
  };

  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.scrollLeft = drag.current.left - (event.clientX - drag.current.x);
    viewport.scrollTop = drag.current.top - (event.clientY - drag.current.y);
  };

  const end = () => {
    drag.current = null;
  };

  return { viewportRef, start, move, end, isMobile };
}

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => {
  const [scrolling, setScrolling] = React.useState(false);
  const idle = React.useRef<number | undefined>(undefined);
  const { viewportRef, start, move, end, isMobile } = useFingerDrag();

  const onScroll = () => {
    setScrolling(true);
    window.clearTimeout(idle.current);
    idle.current = window.setTimeout(() => setScrolling(false), IDLE_MS);
  };

  React.useEffect(() => () => window.clearTimeout(idle.current), []);

  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      data-slot="scroll-area"
      data-scrolling={scrolling ? 'true' : 'false'}
      className={cn('relative overflow-hidden', className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        ref={viewportRef}
        className={cn('h-full w-full rounded-[inherit]', isMobile && 'select-none')}
        onScroll={onScroll}
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={end}
        onPointerCancel={end}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar scrolling={scrolling} />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
});
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> & {
    scrolling?: boolean;
  }
>(({ className, orientation = 'vertical', scrolling, ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    data-slot="scroll-area-scrollbar"
    data-scrolling={scrolling ? 'true' : 'false'}
    className={cn(
      'flex touch-none select-none transition-colors',
      orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent p-[1px]',
      orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent p-[1px]',
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
