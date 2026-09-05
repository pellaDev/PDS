import { Suspense, useEffect, useMemo, useRef, useState } from 'react';

/* The two background surfaces of each theme (hex + label text color) -- imported sets keep this in lockstep with Color roles. */
type SurfaceBox = { bg: string; text: string };

const SURFACE_SETS: Record<'light' | 'dark', readonly SurfaceBox[]> = { light: LIGHT_SET.boxes, dark: DARK_SET.boxes };
import { Moon, Sun } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { ScrollArea } from '../components/ui/scroll-area';

/* Background surfaces per theme -- single source of truth is the same data Color roles displays (LIGHT_SET/DARK_SET boxes): light = F9F9F9 + E4E3E3, dark = 1B1B1B + 383838. Every section renders twice, once on each background, so components are always visible against both surfaces of the active theme. */
import { DARK_SET, LIGHT_SET } from './foundations';

import { SurfaceThemeContext } from './parts';

import {
  ALL_ENTRIES,
  DESIGN_SYSTEM,
  NAV_GROUPS,
  OVERVIEW_ENTRY,
  type NavGroup,
} from './registry';

import logoAnimatedUrl from './assets/logoAnimated.svg';
import { PAGE_INTROS } from "./intros";
import { PDS_DEFAULTS, PDS_FONTS, PDS_FONT_IDS, setPdsConfig, usePdsConfig } from '../config';

function readHashId(): string {
  const id = new URLSearchParams(window.location.hash.slice(1)).get('page');
  if (!id) {
    return OVERVIEW_ENTRY.id;
  }
  return ALL_ENTRIES.some((entry) => entry.id === id)
    ? id
    : OVERVIEW_ENTRY.id;
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
    <nav aria-label="Design system navigation" className="space-y-5 py-2">
      {showOverview ? (
        <button
          type="button"
          onClick={() => select(OVERVIEW_ENTRY.id)}
          aria-current={OVERVIEW_ENTRY.id === activeId}
          className="block w-full rounded-md px-2 py-2 text-left text-sm font-medium transition-colors hover:bg-muted aria-[current=true]:bg-primary aria-[current=true]:text-primary-foreground"
        >
          {OVERVIEW_ENTRY.name}
        </button>
      ) : null}

      {groups.map((group) => (
        <div key={group.name}>
          <p className="px-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {group.name}
          </p>
          <div className="mt-2 space-y-1 border-l pl-2">
            {group.entries.map((entry) => (
              <button
                key={entry.id}
                type="button"
                onClick={() => select(entry.id)}
                aria-current={entry.id === activeId}
                className="block w-full rounded-md px-2 py-1.5 text-left text-sm transition-colors hover:bg-muted aria-[current=true]:bg-primary aria-[current=true]:text-primary-foreground"
              >
                {entry.name}
              </button>
            ))}
          </div>
        </div>
      ))}

      {!showOverview && groups.length === 0 ? (
        <p className="px-2 py-4 text-sm text-muted-foreground">
          No sections match “{query}”.
        </p>
      ) : null}
    </nav>
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
              `${entry.name} ${entry.description}`
                .toLowerCase()
                .includes(normalizedQuery),
            ),
      })).filter((group) => group.entries.length > 0),
    [normalizedQuery],
  );

  const active =
    ALL_ENTRIES.find((entry) => entry.id === selectedId) ?? OVERVIEW_ENTRY;
  const activeGroup = NAV_GROUPS.find((group) =>
    group.entries.some((entry) => entry.id === active.id),
  );
  const ActivePage = active.Page;
  const surfaceMode: 'light' | 'dark' = dark ? 'dark' : 'light';
  const renderSurface = (slot: { surface: 'base' | 'alternate'; part: 'dual' | 'single' }) => (
    <SurfaceThemeContext.Provider value={{ mode: surfaceMode, surface: slot.surface, part: slot.part }}>
      <Suspense
        fallback={
          <div role="status" className="rounded-lg border p-4 text-sm text-muted-foreground">
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
    <div className="min-h-screen bg-background text-foreground md:grid md:grid-cols-[260px_minmax(0,1fr)]">
      {/* Sidebar surface = page background (bg-background): keeps both field tones visibly distinct in the search box below. */}
      <aside className="border-b bg-background md:sticky md:top-0 md:flex md:h-screen md:flex-col md:border-b-0 md:border-r">
        <div className="border-b px-5 py-5">
          <div className="flex items-center gap-3">
            {/* Animated brand mark (SMIL) -- the workspace logoAnimated.svg, mirrored into assets. */}
            <img src={logoAnimatedUrl} alt="" aria-hidden="true" className="h-8 w-auto shrink-0" />
            <p className="text-sm font-semibold leading-tight">{DESIGN_SYSTEM.title}</p>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Version {DESIGN_SYSTEM.version}</p>

          {/* Primary color override for the active theme (light and dark kept separate) */}
          <div className="mt-4">
            <div className="flex items-center justify-between gap-2 rounded-md border bg-background px-2.5 py-1.5 transition-colors hover:bg-secondary">
              <label className="flex cursor-pointer items-center" title={pickerTitle}>
                <input
                  type="color"
                  value={activeHex}
                  onChange={(event) => setBrandFor(activeTheme, event.target.value)}
                  aria-label={pickerAria}
                  className="size-6 cursor-pointer rounded border bg-transparent p-0"
                />
                <span className="ml-2 font-mono text-xs uppercase">{activeHex}</span>
              </label>
              <button
                type="button"
                onClick={() => setBrandFor(activeTheme, activeTheme === 'dark' ? PDS_DEFAULTS.darkBrand : PDS_DEFAULTS.lightBrand)}
                className="text-xs text-muted-foreground underline-offset-2 hover:underline"
              >
                Reset
              </button>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
              You can select your custom Brand primary color for the current Theme. Check the contrast check in Color roles section for validate contrasts
            </p>

            {/* Installation options (pds/config): default field style + UI typeface, changeable live. */}
            <div className="mt-3 flex items-center gap-1 rounded-md border bg-background p-0.5" role="group" aria-label="Default field style">
              {(['fill', 'outline'] as const).map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => setPdsConfig({ fieldStyle: style })}
                  aria-pressed={cfg.fieldStyle === style}
                  className={'flex-1 rounded px-2 py-1 text-xs capitalize transition-colors ' + (cfg.fieldStyle === style ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground')}
                >
                  {style}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={cycleFont}
              title="Cycle the UI typeface (pds/config font option)"
              className="mt-2 w-full rounded-md border bg-background px-2.5 py-1.5 text-left text-xs transition-colors hover:bg-secondary"
            >
              <span className="text-muted-foreground">Font </span>
              <span className="font-medium">{PDS_FONTS[cfg.font]}</span>
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
            className="cursor-pointer text-sm font-medium"
          >
            Browse sections:{' '}
            <span className="text-muted-foreground">{active.name}</span>
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
      </aside>

      <main className="min-w-0 px-6 py-10 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 flex justify-end">
            <Button
              size="small"
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
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {DESIGN_SYSTEM.title}
                </h1>
                <p className="mt-3 max-w-2xl text-muted-foreground">
                  {DESIGN_SYSTEM.description}
                </p>
              </>
            ) : (
              <>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {activeGroup?.name}
                </p>
                <h1 className="mt-2 text-2xl font-semibold">{active.name}</h1>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                  {active.description}
                </p>
                {(() => {
                  const intro = PAGE_INTROS[active.id];
                  if (!intro) return null;
                  return (
                    <div className="mt-3 max-w-2xl space-y-2 text-sm leading-relaxed text-muted-foreground">
                      {intro.split("\n\n").map((paragraph, index) => (
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
            <div className="grid items-start gap-5 lg:grid-cols-2">
              {SURFACE_SETS[dark ? 'dark' : 'light'].map((box, index) => (
                <section
                  key={box.bg}
                  data-pds-surface={index === 0 ? 'base' : 'alternate'}
                  aria-label={(index === 0 ? 'Background' : 'Alternative background') + ' surface ' + box.bg}
                  className={(index === 0 ? 'bg-background' : 'bg-secondary') + " rounded-xl border p-4"}
                >
                  {active.id === 'color-roles' && (
                    <p className={(index === 0 ? 'text-foreground' : 'text-secondary-foreground') + " mb-3 font-mono text-[10px] uppercase tracking-wide"}>
                      {index === 0 ? 'Background' : 'Alternative background'} — {box.bg}
                    </p>
                  )}
                  {renderSurface({ surface: index === 0 ? 'base' : 'alternate', part: 'dual' })}
                </section>
              ))}
            </div>
            {active.splitLayout && (
              <section
                aria-label="Single column"
                className="rounded-xl border bg-background p-4"
              >
                {renderSurface({ surface: 'base', part: 'single' })}
              </section>
            )}
          </div>
          </div>
      </main>
    </div>
  );
}
