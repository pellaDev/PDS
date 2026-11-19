import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '../../lib/utils';
import { cva } from 'class-variance-authority';
import { Icon } from './icon';
import './scrollbar.css';
import './tabs.css';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & { size?: 'default' | 'mobile' }
>(({ className, size = 'default', ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'flex items-center justify-center [border-radius:var(--radius-lg)] [background-color:var(--pds-surface-canvas-bg)] p-[var(--dim-sss)] text-muted-foreground [flex-wrap:var(--pds-row-wrap)] [width:var(--pds-block-width)]',
      size === 'mobile' && 'flex w-full',
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & { size?: 'default' | 'mobile' }
>(({ className, size = 'default', ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap font-medium transition-all [min-height:var(--pds-touch-min)] [flex:var(--pds-item-grow)_1_auto] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [ring-offset-color:var(--pds-surface-bg)] disabled:pointer-events-none disabled:opacity-[var(--opacity-disabled)] data-[state=active]:shadow data-[state=active]:text-foreground data-[state=active]:[background-color:var(--pds-surface-bg)]',
      '[border-radius:var(--radius-md)] [padding-inline:var(--dim-s)] [padding-block:var(--dim-sss)] [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)]',

      size === 'mobile' && 'flex-1',
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      '[margin-top:var(--dim-ss)] [ring-offset-color:var(--pds-surface-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

const cardVariants = cva(
  'relative block text-muted-foreground [--pds-card-bridge-x:0rem] [--pds-card-bridge-y:0rem] [--pds-card-bridge-w:0rem] [--pds-card-bridge-h:0rem] [--pds-card-content-bg:var(--pds-surface-canvas-bg,var(--pds-card-bg))] [--pds-card-strip-inset:var(--dim-s)] [--pds-scrollbar-thumb:transparent] [--pds-scrollbar-track-bg:transparent] [--pds-card-box-c:transparent] [--pds-card-box-w:var(--dim-zero)] [--pds-card-content-shadow:var(--shadow-button)] [--pds-card-bridge-fill:var(--pds-card-content-bg)] [--pds-card-bridge-c:transparent] [--pds-card-bridge-w:var(--dim-zero)] [--pds-card-fade-l:0rem] [--pds-card-fade-r:0rem]',
);

const TabsCard = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ className, children, defaultValue, ...props }, ref) => {
  const kids =
    children === undefined || children === null
      ? []
      : Array.isArray(children)
        ? children
        : [children];

  const firstValueOf = (nodes: unknown[], depth: number): string | undefined => {
    if (depth <= 0) return undefined;
    for (const node of nodes) {
      const own = (node as unknown as { props?: { value?: unknown; children?: unknown } }).props;
      if (!own) continue;
      if (typeof own.value === 'string') return own.value;
      if (own.children !== undefined) {
        const nested = Array.isArray(own.children) ? own.children : [own.children];
        const found = firstValueOf(nested, depth - 1);
        if (found) return found;
      }
    }
    return undefined;
  };
  return (
    <TabsPrimitive.Root
      ref={ref}
      data-slot="tabs-card"
      defaultValue={defaultValue ?? firstValueOf(kids, 2)}
      data-pds-card-tone=""
      className={cn(cardVariants(), className)}
      {...props}
    >
      {[
        ...kids,

        <span
          key="__pds-card-bridge"
          aria-hidden
          className="absolute pointer-events-none [left:var(--pds-card-bridge-x)] [top:var(--pds-card-bridge-y)] [width:var(--pds-card-bridge-w)] [height:var(--pds-card-bridge-h)] [background-color:var(--pds-card-bridge-fill)] [border-width:var(--pds-card-bridge-w)] [border-color:var(--pds-card-bridge-c)] [border-style:solid]"
        />,
      ]}
    </TabsPrimitive.Root>
  );
});
TabsCard.displayName = TabsPrimitive.Root.displayName;

const TabsCardList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(
  (
    {
      className,
      children,
      value,
      defaultValue,
      onValueChange,
      orientation,
      dir,
      activationMode,
      ...props
    },
    ref,
  ) => {
    const raw =
      children === undefined || children === null
        ? []
        : Array.isArray(children)
          ? children
          : [children];

    const kids = raw.filter((kid) => !(typeof kid === 'string' && !kid.trim()));
    console.warn('[pds-nav] render list', kids.length);

    const navProbe = React.useRef<HTMLElement | null>(null);
    React.useEffect(() => {
      const nav = navProbe.current ? (navProbe.current.parentElement as HTMLElement) : null;
      if (!nav) {
        console.warn('[pds-nav] noProbe');
        return;
      }
      const list = nav.querySelector('[data-pds-tabs-card-list]') as HTMLElement | null;
      if (!list) {
        console.warn('[pds-nav] noList');
        return;
      }
      const card = nav.closest('[data-slot="tabs-card"]') as HTMLElement | null;
      const apply = () => {
        const chips = (Array.from(list.children) as HTMLElement[]).filter((kid) =>
          kid.hasAttribute('data-state'),
        );
        const activeIdx = chips.findIndex((kid) => kid.getAttribute('data-state') === 'active');

        const portBox = list.getBoundingClientRect();
        let clipLeft = false;
        let clipRight = false;
        for (const kid of chips) {
          if (!kid.hasAttribute('data-state')) continue;
          const kidBox = kid.getBoundingClientRect();
          if (kidBox.left < portBox.left - 0.5 && kidBox.right > portBox.left + 0.5)
            clipLeft = true;
          if (kidBox.right > portBox.right + 0.5 && kidBox.left < portBox.right - 0.5)
            clipRight = true;
        }
        list.style.setProperty('--pds-card-fade-l', clipLeft ? 'var(--dim-s)' : '0rem');
        list.style.setProperty('--pds-card-fade-r', clipRight ? 'var(--dim-s)' : '0rem');
        for (const affordance of Array.from(
          nav.querySelectorAll('[data-pds-card-affordance]'),
        ) as HTMLElement[]) {
          const goesLeft = affordance.getAttribute('data-pds-card-side') === 'left';

          const usable =
            activeIdx >= 0 && (goesLeft ? activeIdx > 0 : activeIdx < chips.length - 1);

          if (usable) {
            affordance.removeAttribute('inert');
            affordance.style.visibility = 'visible';
          } else {
            affordance.setAttribute('inert', '');
            affordance.style.visibility = 'hidden';
          }
        }
      };
      const link = () => {
        if (!card) return;
        const clear = () => card.style.setProperty('--pds-card-bridge-w', '0rem');
        const active = list.querySelector('[data-state="active"]') as HTMLElement | null;
        const content = Array.from(card.querySelectorAll('[data-slot="tabs-content"]')).find(
          (node) => !(node as HTMLElement).hidden,
        ) as HTMLElement | undefined;
        if (!active || !content) {
          clear();
          return;
        }
        const box = card.getBoundingClientRect();
        const chip = active.getBoundingClientRect();
        const strip = list.getBoundingClientRect();
        if (!chip.width || !chip.height || chip.left < strip.left || chip.right > strip.right) {
          clear();
          return;
        }
        const styles = getComputedStyle(card);
        const num = (name: string) => {
          const raw = styles.getPropertyValue(name).trim();
          const value = parseFloat(raw);
          if (!Number.isFinite(value)) return 0;
          if (raw.includes('rem')) {
            const root = parseFloat(styles.fontSize);
            return value * (Number.isFinite(root) ? root : 16);
          }
          return value;
        };
        const top = chip.bottom - num('--dim-sss');
        const bottom = content.getBoundingClientRect().top - box.top + num('--dim-ssss');
        if (bottom <= top) {
          clear();
          return;
        }
        card.style.setProperty('--pds-card-bridge-x', String(chip.left - box.left) + 'px');
        card.style.setProperty('--pds-card-bridge-y', String(top) + 'px');
        card.style.setProperty('--pds-card-bridge-w', String(chip.width) + 'px');
        card.style.setProperty('--pds-card-bridge-h', String(bottom - top) + 'px');
      };
      let measureLog = 0;
      const measure = () => {
        apply();
        link();
        if (measureLog < 3) {
          measureLog++;
          console.log('[pds-nav] box', list.clientWidth, list.scrollWidth, list.scrollLeft);
        }
      };
      requestAnimationFrame(measure);
      const observer = new ResizeObserver(measure);
      observer.observe(list);

      const stateObserver = new MutationObserver(measure);
      stateObserver.observe(list, { attributes: true, subtree: true });
      list.addEventListener('scroll', measure);

      let dragFrom: number | null = null;
      let dragBase = 0;
      const dragDown = (event: PointerEvent) => {
        if (event.pointerType === 'touch') return;
        const hit = event.target as HTMLElement | null;
        if (hit && hit.closest('[data-pds-card-affordance]') !== null) return;
        dragFrom = 0;
        dragBase = list.scrollLeft;
      };
      const dragMove = (event: PointerEvent) => {
        if (dragFrom === null) return;
        const max = list.scrollWidth - list.clientWidth;
        dragBase += event.movementX;
        const want = Math.round(Math.max(0, Math.min(dragBase, max)));
        if (want !== list.scrollLeft) list.scrollLeft = want;
      };
      const dragEnd = () => {
        dragFrom = null;
      };
      nav.addEventListener('pointerdown', dragDown);
      nav.addEventListener('pointermove', dragMove);
      nav.addEventListener('pointerup', dragEnd);
      nav.addEventListener('pointercancel', dragEnd);
      nav.addEventListener('pointerleave', dragEnd);

      return () => {
        observer.disconnect();
        stateObserver.disconnect();
        list.removeEventListener('scroll', measure);
        nav.removeEventListener('pointerdown', dragDown);
        nav.removeEventListener('pointermove', dragMove);
        nav.removeEventListener('pointerup', dragEnd);
        nav.removeEventListener('pointercancel', dragEnd);
        nav.removeEventListener('pointerleave', dragEnd);
      };
    }, []);

    return (
      <div
        ref={ref}
        data-pds-card-nav=""
        className={cn(
          'flex items-center whitespace-nowrap [flex-wrap:nowrap] [gap:var(--dim-s)] w-full',

          '[border-top-left-radius:var(--radius-lg)] [border-top-right-radius:var(--radius-lg)] [border-inline-width:calc(var(--pds-card-box-w)_+_var(--pds-card-strip-inset))] [border-block-width:var(--pds-card-box-w)] [border-color:var(--pds-card-box-c)] [border-style:solid]',
          className,
        )}
        {...props}
      >
        {[
          <TabsCardScroll key="__pds-card-chev-left" side="left" />,

          <span
            key="__pds-card-nav-probe"
            aria-hidden
            data-pds-card-nav-probe=""
            className="hidden"
            ref={navProbe}
          />,
          <TabsPrimitive.List
            key="__pds-card-scroller"
            data-pds-tabs-card-list=""
            className={cn(
              'flex items-center whitespace-nowrap [flex-wrap:nowrap] [gap:var(--dim-s)] [flex-1] [min-w:0] [overflow-x:auto] [overflow-y:hidden] pds-scrollbar-hide [-webkit-mask-image:linear-gradient(to_right,transparent,black_var(--pds-card-fade-l),black_calc(100%_-_var(--pds-card-fade-r)),transparent)] [mask-image:linear-gradient(to_right,transparent,black_var(--pds-card-fade-l),black_calc(100%_-_var(--pds-card-fade-r)),transparent)]',
            )}
            children={kids}
          />,
          <TabsCardScroll key="__pds-card-chev-right" side="right" />,
        ]}
      </div>
    );
  },
);
TabsCardList.displayName = 'TabsCardList';

const advanceTab = (list: HTMLElement, dir: 1 | -1) => {
  const chips = (Array.from(list.children) as HTMLElement[]).filter((node) =>
    node.hasAttribute('data-state'),
  );
  const activeIdx = chips.findIndex((node) => node.getAttribute('data-state') === 'active');
  const nextIdx = activeIdx + dir;
  if (activeIdx < 0 || nextIdx < 0 || nextIdx >= chips.length) return;
  const target = chips[nextIdx];
  const port = list.getBoundingClientRect();
  const box = target.getBoundingClientRect();
  const maxLeft = list.scrollWidth - list.clientWidth;
  let want = list.scrollLeft;
  if (box.left < port.left - 0.5) want = list.scrollLeft + (port.left - box.left);
  else if (box.right > port.right + 0.5) want = list.scrollLeft - (box.right - port.right);
  list.scrollLeft = Math.round(Math.max(0, Math.min(want, maxLeft)));

  target.focus();
  target.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Enter' }));
};

const TabsCardScroll = React.forwardRef<
  React.ElementRef<'button'>,
  React.ComponentPropsWithoutRef<'button'> & { side?: 'left' | 'right' }
>(({ className, side = 'left', ...props }, ref) => {
  console.warn('[pds-nav] render scroll', side);

  const advance = (target: HTMLElement | null, dir: 1 | -1) => {
    const nav = target ? target.closest('[data-pds-card-nav]') : null;
    const list = nav ? nav.querySelector('[data-pds-tabs-card-list]') : null;
    if (list) advanceTab(list as HTMLElement, dir);
  };
  return (
    <button
      ref={ref}
      type="button"
      data-pds-card-affordance=""
      data-pds-card-side={side}
      aria-label={side === 'left' ? 'Select the previous tab' : 'Select the next tab'}
      onClick={(event) => advance(event.target as HTMLElement, side === 'left' ? -1 : 1)}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') advance(event.target as HTMLElement, 1);
        else if (event.key === 'ArrowLeft') advance(event.target as HTMLElement, -1);
      }}
      className={cn(
        'shrink-0',

        '[min-w:var(--pds-touch-min)] [min-h:var(--pds-touch-min)] [padding:var(--dim-sss)]',
        'items-center justify-center cursor-pointer text-muted-foreground hover:text-foreground rounded-md active:[background-color:var(--pds-surface-bg)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [ring-offset-color:var(--pds-surface-bg)]',
        className,
      )}
      {...props}
    >
      <Icon
        name={side === 'left' ? 'chevron-left' : 'chevron-right'}
        size={16}
        strokeWidth={3}
        className="pointer-events-none"
      />
    </button>
  );
});
TabsCardScroll.displayName = 'TabsCardScroll';

const TabsCardTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap font-medium transition-all [min-height:var(--pds-touch-min)] [flex-grow:var(--pds-item-grow)] [flex-shrink:0] [flex-basis:auto] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [ring-offset-color:var(--pds-surface-bg)] disabled:pointer-events-none disabled:opacity-[var(--opacity-disabled)] data-[state=active]:text-foreground data-[state=active]:[background-color:var(--pds-card-content-bg)] data-[state=inactive]:[background-color:transparent]',
      '[border-top-left-radius:var(--radius-md)] [border-top-right-radius:var(--radius-md)] [padding-inline:var(--dim-s)] [padding-block:var(--dim-sss)] [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)]',
      className,
    )}
    {...props}
  >
    {children}
  </TabsPrimitive.Trigger>
));
TabsCardTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsCardContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    data-slot="tabs-content"
    className={cn(
      '[margin-top:var(--dim-zero)] [padding-bottom:var(--dim-s)] [padding-top:var(--dim-s)] [border-top-left-radius:var(--radius-lg)] [border-top-right-radius:var(--radius-lg)] [border-bottom-left-radius:var(--radius-lg)] [border-bottom-right-radius:var(--radius-lg)] [background-color:var(--pds-card-content-bg)] [border-width:var(--pds-card-box-w)] [border-color:var(--pds-card-box-c)] [border-style:solid] [box-shadow:var(--pds-card-content-shadow)] [padding-inline:var(--dim-s)] [ring-offset-color:var(--pds-surface-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  >
    {children}
  </TabsPrimitive.Content>
));
TabsCardContent.displayName = 'TabsCardContent';

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsCard,
  TabsCardList,
  TabsCardScroll,
  TabsCardTrigger,
  TabsCardContent,
};
