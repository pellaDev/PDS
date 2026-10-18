import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "../../lib/utils";
import { useIsMobile } from "../../hooks/use-mobile";
import "./scroll-area.css";
const IDLE_MS = 1200;
function useFingerDrag() {
  const viewportRef = React.useRef(null);
  const drag = React.useRef(null);
  const isMobile = useIsMobile();
  const start = (event) => {
    if (!isMobile || event.button !== 0) return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = {
      x: event.clientX,
      y: event.clientY,
      left: viewport.scrollLeft,
      top: viewport.scrollTop
    };
  };
  const move = (event) => {
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
const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => {
  const [scrolling, setScrolling] = React.useState(false);
  const idle = React.useRef(void 0);
  const { viewportRef, start, move, end, isMobile } = useFingerDrag();
  const onScroll = () => {
    setScrolling(true);
    window.clearTimeout(idle.current);
    idle.current = window.setTimeout(() => setScrolling(false), IDLE_MS);
  };
  React.useEffect(() => () => window.clearTimeout(idle.current), []);
  return /* @__PURE__ */ jsxs(
    ScrollAreaPrimitive.Root,
    {
      ref,
      "data-slot": "scroll-area",
      "data-scrolling": scrolling ? "true" : "false",
      className: cn("relative overflow-hidden", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          ScrollAreaPrimitive.Viewport,
          {
            ref: viewportRef,
            className: cn("h-full w-full rounded-[inherit]", isMobile && "select-none"),
            onScroll,
            onPointerDown: start,
            onPointerMove: move,
            onPointerUp: end,
            onPointerCancel: end,
            children
          }
        ),
        /* @__PURE__ */ jsx(ScrollBar, { scrolling }),
        /* @__PURE__ */ jsx(ScrollAreaPrimitive.Corner, {})
      ]
    }
  );
});
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
const ScrollBar = React.forwardRef(({ className, orientation = "vertical", scrolling, ...props }, ref) => /* @__PURE__ */ jsx(
  ScrollAreaPrimitive.ScrollAreaScrollbar,
  {
    ref,
    orientation,
    "data-slot": "scroll-area-scrollbar",
    "data-scrolling": scrolling ? "true" : "false",
    className: cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ScrollAreaPrimitive.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
  }
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;
export {
  ScrollArea,
  ScrollBar
};
