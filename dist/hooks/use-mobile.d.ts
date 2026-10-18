import * as React from 'react';
export declare function breakpointToPx(value: string): number;
export declare const MOBILE_BREAKPOINT_PX: number;
export declare const DeviceDepthContext: React.Context<number>;
export declare const DevicePortalContext: React.Context<HTMLElement | null>;
export declare function useDevicePortal(): Element | undefined;
export declare function useIsMobile(): boolean;
