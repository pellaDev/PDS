import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';
import './toggle.css';

const toggleVariants = cva(
  'pds-toggle-btn inline-flex items-center justify-center gap-2 rounded-md [min-height:var(--pds-touch-min)] transition-colors hover-elevate active-elevate-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'pds-toggle-btn--ghost',
      },
      size: {
        sm: 'h-8 min-w-8 px-2',
        default: 'h-10 min-w-10 px-2',
        lg: 'h-12 min-w-12 px-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

type ToggleVariants = VariantProps<typeof toggleVariants>;

type SingleToggleProps = React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
  ToggleVariants & { type?: undefined; asItem?: undefined };

type GroupToggleProps = React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
  ToggleVariants & { type: 'single' | 'multiple'; asItem?: undefined };

type ToggleItemProps = React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
  ToggleVariants & { asItem: true; type?: undefined };

type ToggleProps = SingleToggleProps | GroupToggleProps | ToggleItemProps;

const ToggleGroupContext = React.createContext<ToggleVariants>({
  size: 'default',
  variant: 'default',
});

const Toggle = React.forwardRef<HTMLElement, ToggleProps>(
  ({ className, variant, size, type, asItem, children, ...props }, ref) => {
    const context = React.useContext(ToggleGroupContext);

    if (asItem) {
      return (
        <ToggleGroupPrimitive.Item
          ref={ref as React.Ref<HTMLButtonElement>}
          className={cn(
            toggleVariants({ variant: context.variant || variant, size: context.size || size }),

            '[flex:var(--pds-item-grow)_1_auto]',
            className,
          )}
          {...(props as React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>)}
        >
          {children}
        </ToggleGroupPrimitive.Item>
      );
    }

    if (type) {
      return (
        <ToggleGroupPrimitive.Root
          ref={ref as React.Ref<HTMLDivElement>}
          className={cn(
            'flex items-center justify-center gap-1 [flex-wrap:var(--pds-row-wrap)] [width:var(--pds-block-width)]',
            className,
          )}
          {...({ ...props, type } as unknown as React.ComponentPropsWithoutRef<
            typeof ToggleGroupPrimitive.Root
          >)}
        >
          <ToggleGroupContext.Provider value={{ variant, size }}>
            {children}
          </ToggleGroupContext.Provider>
        </ToggleGroupPrimitive.Root>
      );
    }

    return (
      <TogglePrimitive.Root
        ref={ref as React.Ref<HTMLButtonElement>}
        className={cn(toggleVariants({ variant, size }), className)}
        {...(props as React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>)}
      >
        {children}
      </TogglePrimitive.Root>
    );
  },
);
Toggle.displayName = 'Toggle';

export { Toggle, toggleVariants };
