import * as React from 'react';
import { BatteryFull, Signal, Wifi } from 'lucide-react';

import { cn } from '../../lib/utils';
import './device.css';

import { DeviceDepthContext, DevicePortalContext } from '../../hooks/use-mobile';

function DeviceStatusBar({
  time = '9:41',
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { time?: string }) {
  return (
    <div data-slot="device-status-bar" className={cn(className)} {...props}>
      <span>{time}</span>
      <span className="flex items-center gap-1" aria-hidden>
        <Signal />
        <Wifi />
        <BatteryFull />
      </span>
    </div>
  );
}

function DeviceHomeIndicator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="device-home-indicator" className={cn(className)} {...props} />;
}

function DeviceContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="device-content" className={cn(className)} {...props} />;
}

function Device({
  children,
  chrome = true,
  time,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  chrome?: boolean;

  time?: string;
}) {
  const depth = React.useContext(DeviceDepthContext);

  const [portal, setPortal] = React.useState<HTMLElement | null>(null);
  return (
    <DeviceDepthContext.Provider value={depth + 1}>
      <DevicePortalContext.Provider value={portal}>
        <div data-slot="device" className={cn(className)} {...props}>
          <div data-slot="device-screen">
            {chrome ? <DeviceStatusBar time={time} /> : null}
            <DeviceContent>{children}</DeviceContent>
            <div data-slot="device-portal" ref={setPortal} />
            {chrome ? <DeviceHomeIndicator /> : null}
          </div>
        </div>
      </DevicePortalContext.Provider>
    </DeviceDepthContext.Provider>
  );
}

export {
  Device,
  DeviceStatusBar,
  DeviceContent,
  DeviceHomeIndicator,
  DeviceDepthContext,
  DevicePortalContext,
};
