import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { ScrollArea } from '../components/ui/scroll-area';
import {
  ALL_ENTRIES,
  DESIGN_SYSTEM,
  NAV_GROUPS,
  OVERVIEW_ENTRY,
  type NavGroup,
} from './registry';

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

/* ---- primary color override (per theme, persisted in localStorage) ---- */

const DEFAULT_PRIMARY = { light: '219 61% 32.2%', dark: '218 47.7% 61%' };
type ThemeName = keyof typeof DEFAULT_PRIMARY;

function hexToHsl(hex: string): string {
  const value = hex.replace('#', '');
  const r = parseInt(value.slice(0, 2), 16) / 255;
  const g = parseInt(value.slice(2, 4), 16) / 255;
  const b = parseInt(value.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return `0 0% ${(l * 100).toFixed(1)}%`;
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
  else if (max === g) h = ((b - r) / d + 2) * 60;
  else h = ((r - g) / d + 4) * 60;
  return `${h.toFixed(1)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%`;
}

function hslToHex(h: number, s: number, l: number): string {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let rgb: [number, number, number] = [0, 0, 0];
  if (h < 60) rgb = [c, x, 0];
  else if (h < 120) rgb = [x, c, 0];
  else if (h < 180) rgb = [0, c, x];
  else if (h < 240) rgb = [0, x, c];
  else if (h < 300) rgb = [x, 0, c];
  else rgb = [c, 0, x];
  return '#' + rgb.map((v) => Math.round((v + m) * 255).toString(16).padStart(2, '0')).join('');
}

function parseTriple(triple: string): [number, number, number] {
  const parts = triple.split(/s+/);
  return [parseFloat(parts[0]), parseFloat(parts[1]) / 100, parseFloat(parts[2]) / 100];
}

function loadStoredPrimary(): typeof DEFAULT_PRIMARY {
  try {
    const raw = window.localStorage.getItem('pds-primary');
    if (!raw) return DEFAULT_PRIMARY;
    const parsed = JSON.parse(raw);
    if (typeof parsed?.light === 'string' && typeof parsed?.dark === 'string') return parsed;
  } catch { /* fall through to defaults */ }
  return DEFAULT_PRIMARY;
}

export function DesignSystemBrowser() {
  const [selectedId, select] = useSelectedId();
  const [query, setQuery] = useState('');
  const [dark, setDark] = useState(false);
  const [primary, setPrimary] = useState(loadStoredPrimary);
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

  /* Apply the active theme primary override as an inline custom property.
     Inline --primary wins over both :root and .dark declarations, so each
     theme keeps its own value (persisted under the pds-primary key). */
  useEffect(() => {
    const active = dark ? primary.dark : primary.light;
    document.documentElement.style.setProperty('--primary', active);
  }, [dark, primary]);

  useEffect(() => {
    window.localStorage.setItem('pds-primary', JSON.stringify(primary));
  }, [primary]);

  const setThemePrimary = (theme: ThemeName) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrimary((prev) => ({ ...prev, [theme]: hexToHsl(event.target.value) }));
  };

  const activeTheme: ThemeName = dark ? 'dark' : 'light';
  const [activeH, activeS, activeL] = parseTriple(primary[activeTheme]);

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
  const activeHex = hslToHex(activeH, activeS, activeL);
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
      <aside className="border-b bg-muted/20 md:sticky md:top-0 md:flex md:h-screen md:flex-col md:border-b-0 md:border-r">
        <div className="border-b px-5 py-5">
          <p className="text-sm font-semibold">{DESIGN_SYSTEM.title}</p>
          <p className="mt-1 text-xs text-muted-foreground">Browse the system</p>

          {/* Primary color override for the active theme (light and dark kept separate) */}
          <div className="mt-4">
            <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              {activeTheme} primary
            </p>
            <div className="flex items-center justify-between gap-2 rounded-md border bg-background px-2.5 py-1.5 transition-colors hover:bg-muted/50">
              <label className="flex cursor-pointer items-center" title={pickerTitle}>
                <input
                  type="color"
                  value={activeHex}
                  onChange={setThemePrimary(activeTheme)}
                  aria-label={pickerAria}
                  className="size-6 cursor-pointer rounded border bg-transparent p-0"
                />
                <span className="ml-2 font-mono text-xs uppercase">{activeHex}</span>
              </label>
              <button
                type="button"
                onClick={() => setPrimary((prev) => ({ ...prev, [activeTheme]: DEFAULT_PRIMARY[activeTheme] }))}
                className="text-xs text-muted-foreground underline-offset-2 hover:underline"
              >
                Reset
              </button>
            </div>
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
              variant="outline"
              size="sm"
              onClick={() => setDark((value) => !value)}
              aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
              {dark ? 'Light' : 'Dark'}
            </Button>
          </div>
          <header className="border-b pb-8">
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
              </>
            )}
          </header>

          <div className="pt-8">
            <Suspense
              fallback={
                <div
                  role="status"
                  className="rounded-xl border bg-card p-6 text-sm text-muted-foreground"
                >
                  Loading preview…
                </div>
              }
            >
              <ActivePage />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
