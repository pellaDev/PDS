import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { BatteryFull, Signal, Wifi } from "lucide-react";
import { cn } from "../../lib/utils";
import "./device.css";
import { DeviceDepthContext, DevicePortalContext } from "../../hooks/use-mobile";
function DeviceStatusBar({
  time = "9:41",
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs("div", { "data-slot": "device-status-bar", className: cn(className), ...props, children: [
    /* @__PURE__ */ jsx("span", { children: time }),
    /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", "aria-hidden": true, children: [
      /* @__PURE__ */ jsx(Signal, {}),
      /* @__PURE__ */ jsx(Wifi, {}),
      /* @__PURE__ */ jsx(BatteryFull, {})
    ] })
  ] });
}
function DeviceHomeIndicator({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { "data-slot": "device-home-indicator", className: cn(className), ...props });
}
function DeviceContent({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { "data-slot": "device-content", className: cn(className), ...props });
}
function Device({
  children,
  chrome = true,
  time,
  className,
  ...props
}) {
  const depth = React.useContext(DeviceDepthContext);
  const [portal, setPortal] = React.useState(null);
  return /* @__PURE__ */ jsx(DeviceDepthContext.Provider, { value: depth + 1, children: /* @__PURE__ */ jsx(DevicePortalContext.Provider, { value: portal, children: /* @__PURE__ */ jsx("div", { "data-slot": "device", className: cn(className), ...props, children: /* @__PURE__ */ jsxs("div", { "data-slot": "device-screen", children: [
    chrome ? /* @__PURE__ */ jsx(DeviceStatusBar, { time }) : null,
    /* @__PURE__ */ jsx(DeviceContent, { children }),
    /* @__PURE__ */ jsx("div", { "data-slot": "device-portal", ref: setPortal }),
    chrome ? /* @__PURE__ */ jsx(DeviceHomeIndicator, {}) : null
  ] }) }) }) });
}
export {
  Device,
  DeviceContent,
  DeviceDepthContext,
  DeviceHomeIndicator,
  DevicePortalContext,
  DeviceStatusBar
};
