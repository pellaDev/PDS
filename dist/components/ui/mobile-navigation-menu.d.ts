import * as React from 'react';
import * as MobileNavigationMenuPrimitive from '@radix-ui/react-dialog';
import { type VariantProps } from 'class-variance-authority';
import { Collapsible } from './collapsible';
import { Separator } from './separator';
declare const MobileNavigationMenu: React.FC<MobileNavigationMenuPrimitive.DialogProps>;
declare const MobileNavigationMenuTrigger: React.ForwardRefExoticComponent<Omit<MobileNavigationMenuPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const MobileNavigationMenuClose: React.ForwardRefExoticComponent<Omit<MobileNavigationMenuPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const MobileNavigationMenuOverlay: React.ForwardRefExoticComponent<Omit<MobileNavigationMenuPrimitive.DialogOverlayProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const mobileNavigationMenuPanelVariants: (props?: ({
    side?: "left" | "right" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
interface MobileNavigationMenuPanelProps extends React.ComponentPropsWithoutRef<typeof MobileNavigationMenuPrimitive.Content>, VariantProps<typeof mobileNavigationMenuPanelVariants> {
}
declare const MobileNavigationMenuPanel: React.ForwardRefExoticComponent<MobileNavigationMenuPanelProps & React.RefAttributes<HTMLDivElement>>;
declare function MobileNavigationMenuHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
declare namespace MobileNavigationMenuHeader {
    var displayName: string;
}
declare const MobileNavigationMenuTitle: React.ForwardRefExoticComponent<Omit<MobileNavigationMenuPrimitive.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
declare const MobileNavigationMenuDescription: React.ForwardRefExoticComponent<Omit<MobileNavigationMenuPrimitive.DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;
declare function MobileNavigationMenuContent({ className, ...props }: React.ComponentProps<'nav'>): React.JSX.Element;
declare namespace MobileNavigationMenuContent {
    var displayName: string;
}
declare function MobileNavigationMenuItem({ asChild, isActive, className, ...props }: React.ComponentProps<'button'> & {
    asChild?: boolean;
    isActive?: boolean;
}): React.JSX.Element;
declare namespace MobileNavigationMenuItem {
    var displayName: string;
}
interface MobileNavigationMenuTreeProps extends Omit<React.ComponentPropsWithoutRef<typeof Collapsible>, 'title'> {
    title: React.ReactNode;
    icon?: React.ReactNode;
}
declare const MobileNavigationMenuTree: React.ForwardRefExoticComponent<MobileNavigationMenuTreeProps & React.RefAttributes<HTMLDivElement>>;
declare function MobileNavigationMenuSeparator({ className, ...props }: React.ComponentProps<typeof Separator>): React.JSX.Element;
declare function MobileNavigationMenuFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
declare namespace MobileNavigationMenuFooter {
    var displayName: string;
}
export { MobileNavigationMenu, MobileNavigationMenuTrigger, MobileNavigationMenuClose, MobileNavigationMenuOverlay, MobileNavigationMenuPanel, MobileNavigationMenuHeader, MobileNavigationMenuTitle, MobileNavigationMenuDescription, MobileNavigationMenuContent, MobileNavigationMenuItem, MobileNavigationMenuTree, MobileNavigationMenuSeparator, MobileNavigationMenuFooter, };
