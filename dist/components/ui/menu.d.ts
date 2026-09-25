import * as React from 'react';
import './menu.css';
/** Interaction mode of the unified Pella Menu:
 *  - "dropdown": opens from a <Menu.Trigger> click (former DropdownMenu)
 *  - "context":  opens on right-click inside <Menu.Trigger> (former ContextMenu)
 */
export type MenuMode = 'dropdown' | 'context';
type PassProps = Record<string, unknown>;
declare function MenuRoot({ mode, children, ...rest }: {
    mode?: MenuMode;
    children?: React.ReactNode;
} & PassProps): React.JSX.Element;
declare function MenuTrigger({ className, children, ...rest }: {
    className?: string;
    children?: React.ReactNode;
} & PassProps): React.JSX.Element;
declare function MenuContent({ className, sideOffset, children, ...rest }: {
    className?: string;
    sideOffset?: number;
    children?: React.ReactNode;
} & PassProps): React.JSX.Element;
declare function MenuItem({ className, inset, children, ...rest }: {
    className?: string;
    inset?: boolean;
    children?: React.ReactNode;
} & PassProps): React.JSX.Element;
type InteractiveProps = {
    checked?: boolean | 'indeterminate';
    onCheckedChange?: (checked: boolean) => void;
};
declare function MenuCheckboxItem({ className, children, ...rest }: {
    className?: string;
    children?: React.ReactNode;
} & InteractiveProps & PassProps): React.JSX.Element;
type RadioGroupProps = {
    value?: string;
    onValueChange?: (value: string) => void;
};
declare function MenuRadioGroup(props: RadioGroupProps & PassProps): React.JSX.Element;
type RadioItemProps = {
    value?: string;
};
declare function MenuRadioItem({ className, children, ...rest }: {
    className?: string;
    children?: React.ReactNode;
} & RadioItemProps & PassProps): React.JSX.Element;
declare function MenuLabel({ className, inset, children, ...rest }: {
    className?: string;
    inset?: boolean;
    children?: React.ReactNode;
} & PassProps): React.JSX.Element;
declare function MenuSeparator({ className, ...rest }: {
    className?: string;
} & PassProps): React.JSX.Element;
declare function MenuShortcut({ className, children, ...rest }: {
    className?: string;
    children?: React.ReactNode;
} & PassProps): React.JSX.Element;
declare function MenuSub(props: PassProps): React.JSX.Element;
declare function MenuSubTrigger({ className, inset, children, ...rest }: {
    className?: string;
    inset?: boolean;
    children?: React.ReactNode;
} & PassProps): React.JSX.Element;
declare function MenuSubContent({ className, children, ...rest }: {
    className?: string;
    children?: React.ReactNode;
} & PassProps): React.JSX.Element;
/** Unified Pella Menu — one component for both former DropdownMenu and ContextMenu, recreated on
 * PDS tokens (see menu.css). mode="dropdown" opens from a trigger click; mode="context" opens on
 * right-click inside the trigger. */
export declare const Menu: typeof MenuRoot & {
    Trigger: typeof MenuTrigger;
    Content: typeof MenuContent;
    Item: typeof MenuItem;
    CheckboxItem: typeof MenuCheckboxItem;
    RadioGroup: typeof MenuRadioGroup;
    RadioItem: typeof MenuRadioItem;
    Label: typeof MenuLabel;
    Separator: typeof MenuSeparator;
    Shortcut: typeof MenuShortcut;
    Sub: typeof MenuSub;
    SubTrigger: typeof MenuSubTrigger;
    SubContent: typeof MenuSubContent;
};
export {};
