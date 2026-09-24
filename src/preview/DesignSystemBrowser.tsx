import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';

/* The two background surfaces of each theme (hex + label text color) -- imported sets keep this in lockstep with Color roles. */
type SurfaceBox = { bg: string; text: string };

const SURFACE_SETS: Record<'light' | 'dark', readonly SurfaceBox[]> = {
  light: LIGHT_SET.boxes,
  dark: DARK_SET.boxes,
};
import { Moon, Sun, Check, X, RotateCcw } from 'lucide-react';
import { contrastRatio } from './liveColor';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { ScrollArea } from '../components/ui/scroll-area';
import {
  Sidebar,
  SidebarProvider,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from '../components/ui/sidebar';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';

/* Background surfaces per theme -- single source of truth is the same data Color roles displays (LIGHT_SET/DARK_SET boxes): light = F9F9F9 + E4E3E3, dark = 1B1B1B + 383838. Every section renders twice, once on each background, so components are always visible against both surfaces of the active theme. */
import { DARK_SET, LIGHT_SET } from './foundations';

import { SurfaceThemeContext } from './parts';

import { ALL_ENTRIES, DESIGN_SYSTEM, NAV_GROUPS, OVERVIEW_ENTRY, type NavGroup } from './registry';

import logoAnimatedUrl from './assets/logoAnimated.svg';
import { PAGE_INTROS } from './intros';
import { PDS_DEFAULTS, PDS_FONTS, PDS_FONT_IDS, setPdsConfig, usePdsConfig } from '../config';

function readHashId(): string {
  const id = new URLSearchParams(window.location.hash.slice(1)).get('page');
  if (!id) {
    return OVERVIEW_ENTRY.id;
  }
  return ALL_ENTRIES.some((entry) => entry.id === id) ? id : OVERVIEW_ENTRY.id;
}

function useSelectedId(): [string, (id: string) => void] {
  const [selected, setSelected] = useState(readHashId);

  useEffect(() => {
    const onHashChange = () => setSelected(readHashId());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const select = (id: string) => {
    setSelected(id);
    window.location.hash = new URLSearchParams({ page: id }).toString();
  };

  return [selected, select];
}

function NavigationItems({
  showOverview,
  groups,
  activeId,
  query,
  select,
}: {
  showOverview: boolean;
  groups: NavGroup[];
  activeId: string;
  query: string;
  select: (id: string) => void;
}) {
  return (
    <nav aria-label="Design system navigation" className="space-y-3 py-1">
      {showOverview ? (
        <SidebarMenuButton
          isActive={OVERVIEW_ENTRY.id === activeId}
          onClick={() => select(OVERVIEW_ENTRY.id)}
          className="mb-1 w-full"
        >
          <span className="min-w-0 flex-1 truncate">{OVERVIEW_ENTRY.name}</span>
        </SidebarMenuButton>
      ) : null}

      {groups.map((group) => (
        <SidebarGroup key={group.name}>
          <SidebarGroupLabel>{group.name}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {group.entries.map((entry) => (
                <SidebarMenuItem key={entry.id}>
                  <SidebarMenuButton
                    isActive={entry.id === activeId}
                    onClick={() => select(entry.id)}
                  >
                    <span className="min-w-0 flex-1 truncate">{entry.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}

      {!showOverview && groups.length === 0 ? (
        <p className="px-2 py-4 [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] [letter-spacing:0.25px] font-light text-muted-foreground">
          No sections match “{query}”.
        </p>
      ) : null}
    </nav>
  );
}

/* Closes the mobile sidebar sheet as soon as a page is selected (the Sheet renders without its own close button). */
function CloseMobileNavOnSelect({ selectedId }: { selectedId: string }) {
  const { setOpenMobile } = useSidebar();
  useEffect(() => {
    setOpenMobile(false);
  }, [selectedId, setOpenMobile]);
  return null;
}

/* Chrome-only right-edge handle for the sidebar. The stock SidebarRail shows a resize
   cursor but only responds to clicks, so dragging it did nothing and read as broken.
   This makes the cursor honest: drag horizontally to resize live (it updates the
   --sidebar-width custom property the whole offcanvas layout derives from), arrow keys
   resize in 1rem steps. A plain click does nothing — same contract as
   .pds-resizable-handle, which this mirrors geometrically (1px line on the seam + a
   4px centered hit zone, no wide strip covering content). Desktop only (md+),
   persisted to localStorage like pds-theme. The SidebarRail primitive is untouched —
   this exists only because the showcase chrome wants drag-resize. */
const SIDEBAR_WIDTH_KEY = 'pds-sidebar-width';
const SIDEBAR_MIN_REM = 14;
const SIDEBAR_MAX_REM = 24;
const SIDEBAR_DEFAULT_REM = 16;

function clampSidebarRem(rem: number): number {
  return Math.min(SIDEBAR_MAX_REM, Math.max(SIDEBAR_MIN_REM, rem));
}

function readStoredSidebarWidth(): number {
  const stored = Number(window.localStorage.getItem(SIDEBAR_WIDTH_KEY));
  return Number.isFinite(stored) && stored >= SIDEBAR_MIN_REM && stored <= SIDEBAR_MAX_REM
    ? stored
    : SIDEBAR_DEFAULT_REM;
}

function ChromeSidebarEdge({ onWidthChange }: { onWidthChange: (rem: number) => void }) {
  const { state } = useSidebar();
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ startX: number; startPx: number; moved: boolean } | null>(null);
  const [dragging, setDragging] = useState(false);

  /* Live drag values go straight to the DOM (zero-lag) and commit to React state at the
     end; the provider no longer re-injects a default --sidebar-width, so DOM values
     survive re-renders until the style prop commits the same number. */
  const partsOf = (el: HTMLElement) => {
    const wrapper = el.closest('[data-slot="sidebar-wrapper"]') as HTMLElement | null;
    if (!wrapper) return null;
    const gap = wrapper.querySelector('[data-slot="sidebar-gap"]') as HTMLElement | null;
    const container = wrapper.querySelector(
      '[data-slot="sidebar-container"]',
    ) as HTMLElement | null;
    return { wrapper, gap, container };
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const el = ref.current;
    const parts = el ? partsOf(el) : null;
    if (!el || !parts?.gap) return;
    drag.current = {
      startX: e.clientX,
      startPx: parts.gap.getBoundingClientRect().width,
      moved: false,
    };
    setDragging(true);
    el.setPointerCapture(e.pointerId);
    /* Kill the 200ms width/left transitions for the duration of the drag so the edge
       tracks the cursor 1:1 instead of easing after it. */
    parts.gap.style.transition = 'none';
    if (parts.container) parts.container.style.transition = 'none';
    document.body.style.userSelect = 'none';
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const el = ref.current;
    if (!d || !el) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) < 3) return; // below the click threshold — still a plain click
    d.moved = true;
    if (state === 'collapsed') return; // no live resize while collapsed
    const parts = partsOf(el);
    if (!parts?.wrapper) return;
    const px = Math.min(SIDEBAR_MAX_REM * 16, Math.max(SIDEBAR_MIN_REM * 16, d.startPx + dx));
    parts.wrapper.style.setProperty('--sidebar-width', px + 'px');
  };

  const endDrag = () => {
    const d = drag.current;
    const el = ref.current;
    if (!d || !el) return;
    drag.current = null;
    setDragging(false);
    document.body.style.userSelect = '';
    const parts = partsOf(el);
    if (parts?.gap) parts.gap.style.transition = '';
    if (parts?.container) parts.container.style.transition = '';
    if (d.moved && state !== 'collapsed' && parts?.gap) {
      /* Commit in rem, quantized to 0.25rem (4px) steps — the value React persists. */
      onWidthChange(clampSidebarRem(Math.round(parts.gap.getBoundingClientRect().width / 4) / 4));
    }
    /* A plain click is a no-op — same contract as .pds-resizable-handle (no collapse). */
  };

  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      if (state === 'collapsed') return;
      e.preventDefault();
      const el = ref.current;
      const parts = el ? partsOf(el) : null;
      if (!parts?.gap) return;
      const currentRem = parts.gap.getBoundingClientRect().width / 16;
      onWidthChange(
        clampSidebarRem(Math.round((currentRem + (e.key === 'ArrowRight' ? 1 : -1)) * 4) / 4),
      );
    }
    /* Enter/Space intentionally do nothing: collapsing is not an edge-handle action. */
  };

  return (
    <div
      ref={ref}
      data-sidebar="chrome-edge"
      role="separator"
      aria-label="Resize sidebar: drag horizontally, arrow keys step by 1rem"
      aria-orientation="vertical"
      tabIndex={0}
      title="Drag to resize"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={onKeyDown}
      className={
        /* Same geometry contract as .pds-resizable-handle: a 1px line exactly on the seam
           (left-full = aside padding-box right, i.e. over the border-r) plus a 4px centered
           hit zone (after:w-1). The visible cue is a 2px brand-primary line centered on the seam, shown
           on hover/drag/focus — no wide strip covering content. */
        'absolute inset-y-0 left-full z-20 hidden w-px cursor-ew-resize touch-none md:flex outline-none' +
        ' after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2' +
        ' before:pointer-events-none before:absolute before:inset-y-0 before:left-full before:w-[2px] before:-translate-x-1/2 before:bg-transparent' +
        (dragging ? ' before:bg-primary' : '') +
        ' hover:before:bg-primary focus-visible:before:bg-primary'
      }
    />
  );
}

type ThemeName = 'light' | 'dark';

export function DesignSystemBrowser() {
  const [selectedId, select] = useSelectedId();
  const [query, setQuery] = useState('');
  const [dark, setDark] = useState(false);
  /* The three installation options (pds/config): brand colors per theme, default field
     style, UI typeface. This sidebar is the live "themes menu" a consuming app would build
     on top of the same API; every change persists and survives reloads. */
  const cfg = usePdsConfig();
  /* Chrome sidebar width in rem — set by dragging the right edge (ChromeSidebarEdge);
     persisted like pds-theme, applied through the provider's --sidebar-width. */
  const [sidebarWidthRem, setSidebarWidthRem] = useState(readStoredSidebarWidth);

  useEffect(() => {
    window.localStorage.setItem(SIDEBAR_WIDTH_KEY, String(sidebarWidthRem));
  }, [sidebarWidthRem]);

  const mobileNav = useRef<HTMLDetailsElement>(null);
  const mobileNavSummary = useRef<HTMLElement>(null);
  const normalizedQuery = query.trim().toLowerCase();

  useEffect(() => {
    const stored = window.localStorage.getItem('pds-theme');
    const queryTheme = new URLSearchParams(window.location.search).get('theme');
    const initial = queryTheme === 'dark' || (queryTheme !== 'light' && stored === 'dark');
    setDark(initial);
    document.documentElement.classList.toggle('dark', initial);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    window.localStorage.setItem('pds-theme', dark ? 'dark' : 'light');
  }, [dark]);

  /* Brand + font live on the pds/config store: it writes the inline brand/font custom
     properties on <html> and persists them, so nothing else to apply here. */
  const activeTheme: ThemeName = dark ? 'dark' : 'light';

  const setBrandFor = (theme: ThemeName, hex: string) => {
    if (theme === 'dark') setPdsConfig({ darkBrand: hex });
    else setPdsConfig({ lightBrand: hex });
  };

  const cycleFont = () => {
    const next = PDS_FONT_IDS[(PDS_FONT_IDS.indexOf(cfg.font) + 1) % PDS_FONT_IDS.length];
    setPdsConfig({ font: next });
  };

  const filteredGroups = useMemo(
    () =>
      NAV_GROUPS.map((group) => ({
        ...group,
        entries: group.name.toLowerCase().includes(normalizedQuery)
          ? group.entries
          : group.entries.filter((entry) =>
              `${entry.name} ${entry.description}`.toLowerCase().includes(normalizedQuery),
            ),
      })).filter((group) => group.entries.length > 0),
    [normalizedQuery],
  );

  const active = ALL_ENTRIES.find((entry) => entry.id === selectedId) ?? OVERVIEW_ENTRY;
  const activeGroup = NAV_GROUPS.find((group) =>
    group.entries.some((entry) => entry.id === active.id),
  );
  const ActivePage = active.Page;
  const surfaceMode: 'light' | 'dark' = dark ? 'dark' : 'light';
  const renderSurface = (slot: { surface: 'base' | 'alternate'; part: 'dual' | 'single' }) => (
    <SurfaceThemeContext.Provider
      value={{ mode: surfaceMode, surface: slot.surface, part: slot.part }}
    >
      <Suspense
        fallback={
          <div
            role="status"
            className="rounded-lg border p-4 [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] [letter-spacing:0.25px] font-light text-muted-foreground"
          >
            Loading preview…
          </div>
        }
      >
        <ActivePage />
      </Suspense>
    </SurfaceThemeContext.Provider>
  );
  const activeHex = (activeTheme === 'dark' ? cfg.darkBrand : cfg.lightBrand).toLowerCase();
  const pickerAria = 'Set ' + activeTheme + ' theme primary color';
  const pickerTitle = 'Pick the ' + activeTheme + ' theme primary color';

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [active.id]);

  const showOverview = `${OVERVIEW_ENTRY.name} ${OVERVIEW_ENTRY.description}`
    .toLowerCase()
    .includes(normalizedQuery);
  const selectPage = (id: string) => {
    select(id);
    if (mobileNav.current?.open) {
      mobileNav.current.removeAttribute('open');
      mobileNavSummary.current?.focus();
    }
  };

  return (
    <SidebarProvider
      className="min-h-screen bg-background text-foreground flex-col md:flex-row"
      data-pds-fieldstyle={cfg.fieldStyle}
      style={{ '--sidebar-width': sidebarWidthRem + 'rem' } as CSSProperties}
    >
      {/* Sidebar surface = page background (bg-background): keeps both field tones visibly distinct in the search box below. */}
      {/* data-pds-surface="base": the chrome sidebar IS a default-background panel; declaring it
          makes every surface-aware variable inside (tabs track, active pill, field fills, item
          hovers) resolve to the base set instead of the :root fallback (= alternate-set canvas). */}
      <Sidebar
        collapsible="offcanvas"
        data-pds-surface="base"
        className="border-r [border-color:var(--pds-container-border-color)]"
      >
        <div className="border-b px-5 py-5">
          <div className="flex items-center gap-2 [font-size:var(--type-h3-size)] [line-height:var(--type-h3-lh)] [letter-spacing:0.25px]">
            {/* Animated brand mark (SMIL) -- the workspace logoAnimated.svg, mirrored into assets. Scales with the "PDS" text (1em). */}
            <img
              src={logoAnimatedUrl}
              alt=""
              aria-hidden="true"
              className="h-[1em] w-auto shrink-0"
            />
            <span className="font-light [color:var(--color-primary)]">
              {DESIGN_SYSTEM.titlePrefix}
            </span>
          </div>
          <p className="mt-2 [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] [letter-spacing:0.25px] text-muted-foreground">
            <span className="font-light">{DESIGN_SYSTEM.titleSuffix}</span>
            <span className="font-light"> - {DESIGN_SYSTEM.version}</span>
          </p>

          {/* Primary color override for the active theme (light and dark kept separate) */}
          <div className="mt-4">
            <div className="flex items-center justify-between gap-2 rounded-md border bg-background px-2.5 py-1.5 transition-colors hover:bg-secondary">
              <label className="flex cursor-pointer items-center" title={pickerTitle}>
                {/* Flat swatch: the wrapper span carries the full-bleed color (no UA frame/border);
                    the native input sits on top invisibly so clicks still open the picker and the
                    control stays keyboard-focusable. */}
                <span className="relative block size-6 shrink-0 cursor-pointer overflow-hidden rounded">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{ backgroundColor: activeHex }}
                  />
                  <input
                    type="color"
                    value={activeHex}
                    onChange={(event) => setBrandFor(activeTheme, event.target.value)}
                    aria-label={pickerAria}
                    className="absolute inset-0 size-full cursor-pointer opacity-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </span>
                <span className="ml-2 font-mono uppercase [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)]">
                  {activeHex}
                </span>
              </label>
              {(() => {
                const s = SURFACE_SETS[activeTheme];
                const rb = contrastRatio(activeHex, s[0].bg);
                const ra = contrastRatio(activeHex, s[1].bg);
                const ok = rb >= 3 && ra >= 3;
                return (
                  <span
                    title={'base ' + rb.toFixed(2) + ' / alternate ' + ra.toFixed(2)}
                    className="flex items-center gap-1 [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] [letter-spacing:0.25px] font-light"
                    style={{ color: ok ? '#218A38' : '#EE1F25', marginLeft: '0.5rem' }}
                  >
                    {ok ? <Check size={12} /> : <X size={12} />}
                    <span>{Math.min(rb, ra).toFixed(2)}</span>
                  </span>
                );
              })()}
              <button
                type="button"
                onClick={() =>
                  setBrandFor(
                    activeTheme,
                    activeTheme === 'dark' ? PDS_DEFAULTS.darkBrand : PDS_DEFAULTS.lightBrand,
                  )
                }
                title="Reset brand color to default"
                aria-label="Reset brand color to default"
                className="flex size-6 shrink-0 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <RotateCcw size={12} />
              </button>
            </div>
            <p className="mt-2 [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] [letter-spacing:0.25px] font-light text-muted-foreground">
              You can select your custom Brand primary color for the current Theme. Check the
              contrast check in Color roles section for validate contrasts
            </p>

            {/* Installation options (pds/config): default field style + UI typeface, changeable live. Field style is a PDS Tabs segmented control (Tabs without TabsContent). */}
            <Tabs
              value={cfg.fieldStyle}
              onValueChange={(value) => setPdsConfig({ fieldStyle: value as 'fill' | 'outline' })}
              className="mt-3"
            >
              <TabsList className="w-full" aria-label="Default field style">
                {(['fill', 'outline'] as const).map((style) => (
                  <TabsTrigger key={style} value={style} className="flex-1 capitalize">
                    {style}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <button
              type="button"
              onClick={cycleFont}
              title="Cycle the UI typeface (pds/config font option)"
              className="mt-2 w-full rounded-md border bg-background px-2.5 py-1.5 text-left [font-size:var(--type-button-size)] [line-height:var(--type-button-lh)] [letter-spacing:0.25px] font-light transition-colors hover:bg-secondary"
            >
              <span className="text-muted-foreground">Font </span>
              <span>{PDS_FONTS[cfg.font]}</span>
            </button>
          </div>
        </div>
        <div className="p-4 pb-2">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search design system"
            placeholder="Search design system…"
          />
        </div>
        <ScrollArea className="hidden min-h-0 flex-1 px-4 pb-4 md:block">
          <NavigationItems
            showOverview={showOverview}
            groups={filteredGroups}
            activeId={active.id}
            query={query}
            select={selectPage}
          />
        </ScrollArea>
        <details ref={mobileNav} className="border-t px-4 py-3 md:hidden">
          <summary
            ref={mobileNavSummary}
            className="cursor-pointer [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] [letter-spacing:0.25px] font-light"
          >
            Browse sections: <span className="text-muted-foreground">{active.name}</span>
          </summary>
          <ScrollArea className="mt-3 h-64 pb-2">
            <NavigationItems
              showOverview={showOverview}
              groups={filteredGroups}
              activeId={active.id}
              query={query}
              select={selectPage}
            />
          </ScrollArea>
        </details>
        <ChromeSidebarEdge onWidthChange={setSidebarWidthRem} />
      </Sidebar>

      <CloseMobileNavOnSelect selectedId={selectedId} />

      <main className="min-w-0 flex-1 bg-secondary px-6 py-10 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 flex items-center justify-end gap-2">
            <SidebarTrigger className="md:hidden" />
            <Button
              size="special"
              onClick={() => setDark((value) => !value)}
              aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
              {dark ? 'Light' : 'Dark'}
            </Button>
          </div>
          <header>
            {active.id === OVERVIEW_ENTRY.id ? (
              <>
                <div className="flex items-center gap-3 [font-size:var(--type-h1-size)] [line-height:var(--type-h1-lh)] [letter-spacing:0.25px]">
                  <img
                    src={logoAnimatedUrl}
                    alt=""
                    aria-hidden="true"
                    className="h-[1em] w-auto shrink-0"
                  />
                  <span className="font-light [color:var(--color-primary)]">
                    {DESIGN_SYSTEM.titlePrefix}
                  </span>
                </div>
                <p className="mt-2 [font-size:var(--type-h3-size)] [line-height:var(--type-h3-lh)] [letter-spacing:0.25px] font-light text-muted-foreground">
                  {DESIGN_SYSTEM.titleSuffix}
                </p>
                <p className="mt-4 max-w-3xl [font-size:var(--type-subtitle1-size)] [line-height:var(--type-subtitle1-lh)] [letter-spacing:0.25px] font-light">
                  {DESIGN_SYSTEM.description}
                </p>
                <p className="mt-4 max-w-3xl [font-size:var(--type-body1-size)] [line-height:var(--type-body1-lh)] [letter-spacing:0.25px] font-light text-muted-foreground">
                  {DESIGN_SYSTEM.descriptionBody}
                </p>
              </>
            ) : (
              <>
                <p className="[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] [letter-spacing:0.25px] font-light text-muted-foreground">
                  {activeGroup?.name}
                </p>
                <h1 className="mt-2 [font-size:var(--type-body1-size)] [line-height:var(--type-body1-lh)] [letter-spacing:0.25px] font-light">
                  {active.name}
                </h1>
                <p className="mt-2 max-w-2xl [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] [letter-spacing:0.25px] font-light text-muted-foreground">
                  {active.description}
                </p>
                {(() => {
                  const intro = PAGE_INTROS[active.id];
                  if (!intro) return null;
                  return (
                    <div className="mt-3 max-w-2xl space-y-2 [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] [letter-spacing:0.25px] font-light text-muted-foreground">
                      {intro.split('\n\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  );
                })()}
              </>
            )}
          </header>

          {/* Dual-background layout -- the active page renders once per background surface of the CURRENT theme (LIGHT_SET/DARK_SET boxes). Split-layout pages additionally render a full-width single column below the pair, holding the sections that don't need the alternate background. */}
          <div className="space-y-5 pt-8">
            {active.singleColumn ? (
              <section
                aria-label="Single column"
                data-pds-surface="base"
                className="rounded-xl border bg-background [border-color:var(--pds-container-border-color)] p-4"
              >
                {renderSurface({ surface: 'base', part: 'single' })}
              </section>
            ) : (
              <>
                <div className="grid items-start gap-5 lg:grid-cols-2">
                  {SURFACE_SETS[dark ? 'dark' : 'light'].map((box, index) => (
                    <section
                      key={box.bg}
                      data-pds-surface={index === 0 ? 'base' : 'alternate'}
                      aria-label={
                        (index === 0 ? 'Default background' : 'Alternative background') +
                        ' surface ' +
                        box.bg
                      }
                      className={
                        (index === 0 ? 'bg-background' : 'bg-secondary') +
                        ' rounded-xl border [border-color:var(--pds-container-border-color)] p-4'
                      }
                    >
                      {active.id === 'color-roles' && (
                        <p
                          className={
                            (index === 0 ? 'text-foreground' : 'text-secondary-foreground') +
                            ' mb-3 font-mono [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light'
                          }
                        >
                          {index === 0 ? 'Default background' : 'Alternative background'} — {box.bg}
                        </p>
                      )}
                      {renderSurface({ surface: index === 0 ? 'base' : 'alternate', part: 'dual' })}
                    </section>
                  ))}
                </div>
                {active.splitLayout && (
                  <section
                    aria-label="Single column"
                    className="rounded-xl border bg-background [border-color:var(--pds-container-border-color)] p-4"
                  >
                    {renderSurface({ surface: 'base', part: 'single' })}
                  </section>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
