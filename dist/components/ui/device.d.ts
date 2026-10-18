import * as React from 'react';
import './device.css';
import { DeviceDepthContext, DevicePortalContext } from '../../hooks/use-mobile';
declare function DeviceStatusBar({ time, className, ...props }: React.HTMLAttributes<HTMLDivElement> & {
    time?: string;
}): React.JSX.Element;
declare function DeviceHomeIndicator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
declare function DeviceContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
declare function Device({ children, chrome, time, className, ...props }: React.HTMLAttributes<HTMLDivElement> & {
    chrome?: boolean;
    time?: string;
}): React.JSX.Element;
export { Device, DeviceStatusBar, DeviceContent, DeviceHomeIndicator, DeviceDepthContext, DevicePortalContext, };
