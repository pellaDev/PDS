import * as React from "react";
import { tokens } from "../generated/tokens";
const ROOT_FONT_SIZE_PX = 16;
function breakpointToPx(value) {
  const n = Number.parseFloat(value);
  if (!Number.isFinite(n))
    throw new Error(`use-mobile: layout.breakpointMobile is not a dimension, got "${value}"`);
  return value.trim().endsWith("rem") ? n * ROOT_FONT_SIZE_PX : n;
}
const MOBILE_BREAKPOINT_PX = breakpointToPx(tokens.layout.breakpointMobile);
const DeviceDepthContext = React.createContext(0);
const DevicePortalContext = React.createContext(null);
function useDevicePortal() {
  return React.useContext(DevicePortalContext) ?? void 0;
}
function useIsMobile() {
  const depth = React.useContext(DeviceDepthContext);
  const [isMobile, setIsMobile] = React.useState(void 0);
  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT_PX - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT_PX);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT_PX);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return depth > 0 || !!isMobile;
}
export {
  DeviceDepthContext,
  DevicePortalContext,
  MOBILE_BREAKPOINT_PX,
  breakpointToPx,
  useDevicePortal,
  useIsMobile
};
