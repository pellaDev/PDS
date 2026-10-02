'use client';

import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { Check, ChevronRight, Circle } from 'lucide-react';

import { cn } from '../../lib/utils';

import './menu.css';

export type MenuMode = 'dropdown' | 'context';

const MenuContext = React.createContext<MenuMode>('dropdown');

type PassProps = Record<string, unknown>;
const toDropdown = <T,>(props: PassProps): T => props as T;
const toContext = <T,>(props: PassProps): T => props as T;

function MenuRoot({
  mode = 'dropdown',
  children,
  ...rest
}: { mode?: MenuMode; children?: React.ReactNode } & PassProps) {
  return (
    <MenuContext.Provider value={mode}>
      {mode === 'dropdown' ? (
        <DropdownMenuPrimitive.Root
          {...toDropdown<React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root>>(rest)}
        >
          {children}
        </DropdownMenuPrimitive.Root>
      ) : (
        <ContextMenuPrimitive.Root
          {...toContext<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Root>>(rest)}
        >
          {children}
        </ContextMenuPrimitive.Root>
      )}
    </MenuContext.Provider>
  );
}

function MenuTrigger({
  className,
  children,
  ...rest
}: { className?: string; children?: React.ReactNode } & PassProps) {
  const mode = React.useContext(MenuContext);
  if (mode === 'dropdown') {
    return (
      <DropdownMenuPrimitive.Trigger
        className={className}
        {...toDropdown<React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>>(rest)}
      >
        {children}
      </DropdownMenuPrimitive.Trigger>
    );
  }
  return (
    <ContextMenuPrimitive.Trigger
      className={className}
      {...toContext<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Trigger>>(rest)}
    >
      {children}
    </ContextMenuPrimitive.Trigger>
  );
}

const CONTENT_ANIMATION =
  'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2';

function MenuContent({
  className,
  sideOffset = 4,
  children,
  ...rest
}: { className?: string; sideOffset?: number; children?: React.ReactNode } & PassProps) {
  const mode = React.useContext(MenuContext);
  if (mode === 'dropdown') {
    return (
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          sideOffset={sideOffset}
          className={cn(
            'z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden p-1 pds-menu-content',
            CONTENT_ANIMATION,
            'origin-[--radix-dropdown-menu-content-transform-origin]',
            className,
          )}
          {...toDropdown<React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>>(
            rest,
          )}
        >
          {children}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    );
  }
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        className={cn(
          'z-50 max-h-[var(--radix-context-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden p-1 pds-menu-content',
          CONTENT_ANIMATION,
          'origin-[--radix-context-menu-content-transform-origin]',
          className,
        )}
        {...toContext<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>>(rest)}
      >
        {children}
      </ContextMenuPrimitive.Content>
    </ContextMenuPrimitive.Portal>
  );
}

const ITEM_BASE =
  'pds-menu-item relative flex cursor-default select-none items-center gap-2 px-3 py-1.5 data-[disabled]:pointer-events-none [&>svg]:size-4 [&>svg]:shrink-0';

function MenuItem({
  className,
  inset,
  children,
  ...rest
}: { className?: string; inset?: boolean; children?: React.ReactNode } & PassProps) {
  const mode = React.useContext(MenuContext);
  const classes = cn(ITEM_BASE, inset && 'pl-8', className);
  if (mode === 'dropdown') {
    return (
      <DropdownMenuPrimitive.Item
        className={classes}
        {...toDropdown<React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>>(rest)}
      >
        {children}
      </DropdownMenuPrimitive.Item>
    );
  }
  return (
    <ContextMenuPrimitive.Item
      className={classes}
      {...toContext<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item>>(rest)}
    >
      {children}
    </ContextMenuPrimitive.Item>
  );
}

const CHECK_ITEM_BASE =
  'pds-menu-item relative flex cursor-default select-none items-center py-1.5 pl-8 pr-3 data-[disabled]:pointer-events-none';

type InteractiveProps = {
  checked?: boolean | 'indeterminate';
  onCheckedChange?: (checked: boolean) => void;
};
function MenuCheckboxItem({
  className,
  children,
  ...rest
}: { className?: string; children?: React.ReactNode } & InteractiveProps & PassProps) {
  const mode = React.useContext(MenuContext);
  if (mode === 'dropdown') {
    return (
      <DropdownMenuPrimitive.CheckboxItem
        className={cn(CHECK_ITEM_BASE, className)}
        {...toDropdown<React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>>(
          rest,
        )}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <DropdownMenuPrimitive.ItemIndicator>
            <Check className="size-4" />
          </DropdownMenuPrimitive.ItemIndicator>
        </span>
        {children}
      </DropdownMenuPrimitive.CheckboxItem>
    );
  }
  return (
    <ContextMenuPrimitive.CheckboxItem
      className={cn(CHECK_ITEM_BASE, className)}
      {...toContext<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>>(rest)}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <Check className="size-4" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
}

type RadioGroupProps = { value?: string; onValueChange?: (value: string) => void };
function MenuRadioGroup(props: RadioGroupProps & PassProps) {
  const mode = React.useContext(MenuContext);
  if (mode === 'dropdown')
    return (
      <DropdownMenuPrimitive.RadioGroup
        {...toDropdown<React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioGroup>>(
          props,
        )}
      />
    );
  return (
    <ContextMenuPrimitive.RadioGroup
      {...toContext<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioGroup>>(props)}
    />
  );
}

type RadioItemProps = { value?: string };
function MenuRadioItem({
  className,
  children,
  ...rest
}: { className?: string; children?: React.ReactNode } & RadioItemProps & PassProps) {
  const mode = React.useContext(MenuContext);
  if (mode === 'dropdown') {
    return (
      <DropdownMenuPrimitive.RadioItem
        className={cn(CHECK_ITEM_BASE, className)}
        {...toDropdown<React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>>(
          rest,
        )}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <DropdownMenuPrimitive.ItemIndicator>
            <Circle className="fill-current size-2" />
          </DropdownMenuPrimitive.ItemIndicator>
        </span>
        {children}
      </DropdownMenuPrimitive.RadioItem>
    );
  }
  return (
    <ContextMenuPrimitive.RadioItem
      className={cn(CHECK_ITEM_BASE, className)}
      {...toContext<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>>(rest)}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <Circle className="fill-current size-2" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
}

function MenuLabel({
  className,
  inset,
  children,
  ...rest
}: { className?: string; inset?: boolean; children?: React.ReactNode } & PassProps) {
  const mode = React.useContext(MenuContext);
  const classes = cn('pds-menu-label px-3 py-1.5', inset && 'pl-8', className);
  if (mode === 'dropdown')
    return (
      <DropdownMenuPrimitive.Label
        className={classes}
        {...toDropdown<React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>>(rest)}
      >
        {children}
      </DropdownMenuPrimitive.Label>
    );
  return (
    <ContextMenuPrimitive.Label
      className={classes}
      {...toContext<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label>>(rest)}
    >
      {children}
    </ContextMenuPrimitive.Label>
  );
}

function MenuSeparator({ className, ...rest }: { className?: string } & PassProps) {
  const mode = React.useContext(MenuContext);
  if (mode === 'dropdown')
    return (
      <DropdownMenuPrimitive.Separator
        className={cn('pds-menu-separator -mx-1 my-1 h-px', className)}
        {...toDropdown<React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>>(
          rest,
        )}
      />
    );
  return (
    <ContextMenuPrimitive.Separator
      className={cn('pds-menu-separator -mx-1 my-1 h-px', className)}
      {...toContext<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>>(rest)}
    />
  );
}

function MenuShortcut({
  className,
  children,
  ...rest
}: { className?: string; children?: React.ReactNode } & PassProps) {
  return (
    <span className={cn('ml-auto text-xs tracking-widest opacity-60', className)} {...rest}>
      {children}
    </span>
  );
}

function MenuSub(props: PassProps) {
  const mode = React.useContext(MenuContext);
  if (mode === 'dropdown')
    return (
      <DropdownMenuPrimitive.Sub
        {...toDropdown<React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Sub>>(props)}
      />
    );
  return (
    <ContextMenuPrimitive.Sub
      {...toContext<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Sub>>(props)}
    />
  );
}

function MenuSubTrigger({
  className,
  inset,
  children,
  ...rest
}: { className?: string; inset?: boolean; children?: React.ReactNode } & PassProps) {
  const mode = React.useContext(MenuContext);
  const classes = cn(
    'pds-menu-item pds-sub flex cursor-default select-none items-center gap-2 px-3 py-1.5 [&_svg]:pointer-events-none [&_svg]:size-4',
    inset && 'pl-8',
    className,
  );
  if (mode === 'dropdown') {
    return (
      <DropdownMenuPrimitive.SubTrigger
        className={classes}
        {...toDropdown<React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger>>(
          rest,
        )}
      >
        {children}
        <ChevronRight className="ml-auto size-4" />
      </DropdownMenuPrimitive.SubTrigger>
    );
  }
  return (
    <ContextMenuPrimitive.SubTrigger
      className={classes}
      {...toContext<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger>>(rest)}
    >
      {children}
      <ChevronRight className="ml-auto size-4" />
    </ContextMenuPrimitive.SubTrigger>
  );
}

function MenuSubContent({
  className,
  children,
  ...rest
}: { className?: string; children?: React.ReactNode } & PassProps) {
  const mode = React.useContext(MenuContext);
  if (mode === 'dropdown') {
    return (
      <DropdownMenuPrimitive.SubContent
        className={cn(
          'z-50 min-w-[8rem] overflow-hidden p-1 pds-menu-sub-content',
          CONTENT_ANIMATION,
          'origin-[--radix-dropdown-menu-content-transform-origin]',
          className,
        )}
        {...toDropdown<React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>>(
          rest,
        )}
      >
        {children}
      </DropdownMenuPrimitive.SubContent>
    );
  }
  return (
    <ContextMenuPrimitive.SubContent
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden p-1 pds-menu-sub-content',
        CONTENT_ANIMATION,
        'origin-[--radix-context-menu-content-transform-origin]',
        className,
      )}
      {...toContext<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>>(rest)}
    >
      {children}
    </ContextMenuPrimitive.SubContent>
  );
}

export const Menu = Object.assign(MenuRoot, {
  Trigger: MenuTrigger,
  Content: MenuContent,
  Item: MenuItem,
  CheckboxItem: MenuCheckboxItem,
  RadioGroup: MenuRadioGroup,
  RadioItem: MenuRadioItem,
  Label: MenuLabel,
  Separator: MenuSeparator,
  Shortcut: MenuShortcut,
  Sub: MenuSub,
  SubTrigger: MenuSubTrigger,
  SubContent: MenuSubContent,
});
