# AGENTS.md — PDS repository

Operating rules for AI coding agents working in this repository, plus the usage reference
for agents building on an installed copy of PDS. Read before editing or building.

## What this is

PDS (Pella Design System) — a plug & play React design system built on the shadcn/ui
paradigm: Radix UI primitives + Tailwind CSS v4 + CVA, shipped as a **prebuilt ESM
package**. This repository IS the published package (flat layout): `src/` is the source,
`dist/` is the build output, `tokens.json` is the token SSOT.

## Single Source of Truth — non-negotiable

- `tokens.json` is the only source for design tokens.
- `src/index.css` and everything under `src/generated/` are **generated** by
  `pnpm run tokens` (scripts/build-tokens.mjs). Never hand-edit them.
- Token change workflow: edit `tokens.json` → `pnpm run tokens` → review the diff → build.

## Hard rules

1. Never hand-edit generated files (`src/index.css`, `src/generated/**`) or anything in `dist/`.
2. Never add absolute local filesystem paths in code or config.
3. camelCase; English for all code comments and docs.
4. New components follow the existing conventions exactly — open any file in
   `src/components/ui/` as reference: cva variants, Radix primitive where one exists,
   same import/export shape. **Do not invent new API patterns**: this repo is deliberately
   shadcn-conventional because AI agents transfer their shadcn knowledge onto it. Every
   deviation costs that transferability.
5. Theming stays zero-rerender: static CSS + CSS custom properties. Runtime theming goes
   through `configurePds()` / `setPdsConfig()` (src/config.tsx), which only sets inline
   variables on `<html>`. Never introduce runtime style computation.
6. Version bumps and releases are managed by the maintainers.
   Do not commit ad-hoc changes to `package.json` version or to `dist/`.

## Commands

| Command | Effect |
| --- | --- |
| `pnpm run tokens` | Regenerate CSS/TS from tokens.json |
| `pnpm run typecheck` | tsc --noEmit (runs the token build first) |
| `pnpm run dev` | Vite preview of the living style guide |
| `pnpm run build` | Rebuild `dist/` (JS + CSS + .d.ts) |

## Layout

- `src/components/ui/` — 56 components: a shadcn/ui v4 registry subset plus PDS additions (color-picker, icon, menu, mobile-navigation-menu, tag, toast, toaster).
- `tokens.json` — token SSOT · `scripts/build-tokens.mjs` + `scripts/core-tokens.mjs` — generators
- `src/config.tsx` — runtime configuration (brand colors, field style, font)
- `dist/` — prebuilt ESM + CSS + .d.ts (build output)
- `update.mjs` — version update/revert for consumers
- `README.md` — public docs (install / usage / exports) · `llms.txt` — LLM-oriented index · `SECURITY.md` — vulnerability disclosure

## Components

Every component lives in its own file; import form is `@workspace/pds/components/ui/<file>`.
Files that need custom styles pull them in automatically — no per-component CSS imports are ever required.

### Actions

| Component | File | What it does |
| --- | --- | --- |
| Button | `button` | Primary action control — sizes, destructive/link states, tooltips on compact sizes |
| Tag | `tag` | Pill status markers |
| Toggle | `toggle` | Pressable on/off control with icon or label |
| ToggleGroup | `toggle-group` | Single- or multi-select set of toggles |

### Forms & inputs

| Component | File | What it does |
| --- | --- | --- |
| Input | `input` | Text entry with validation states |
| InputOTP | `input-otp` | Segmented one-time code entry |
| Textarea | `textarea` | Multiline text entry |
| Checkbox | `checkbox` | Checkbox with brand fill states |
| Radio | `radio` | Single-choice radio control |
| Slider | `slider` | Single-value and range slider |
| Switch | `switch` | On/off switch, optional inline label |
| Calendar | `calendar` | Single-date calendar picker |
| Field | `field` | Floating-label input (fill/outline × small/large) |
| Form | `form` | Validated form composition — labels, messages, field wiring |
| Label | `label` | Accessible label for form controls |
| ColorPicker | `color-picker` | Flat swatch + native color input; optional WCAG contrast check (V indicator) against a list of backgrounds |

### Overlays

| Component | File | What it does |
| --- | --- | --- |
| Dialog | `dialog` | Modal dialog with header, footer, actions |
| AlertDialog | `alert-dialog` | Blocking confirmation for consequential actions |
| Sheet | `sheet` | Edge-aligned slide-in panel |
| Drawer | `drawer` | Bottom overlay panel (touch-friendly) |
| Popover | `popover` | Anchored interactive content |
| HoverCard | `hover-card` | Rich context revealed on hover |
| Tooltip | `tooltip` | Tooltip bubble (also used internally by compact buttons) |
| Command | `command` | Keyboard-first searchable command list |

### Menus & navigation

| Component | File | What it does |
| --- | --- | --- |
| Menu | `menu` | Unified dropdown + context menu (switched by `mode`) |
| Menubar | `menubar` | Desktop application menubar |
| NavigationMenu | `navigation-menu` | Primary nav with hover flyouts |
| Breadcrumb | `breadcrumb` | Hierarchical location links |
| Pagination | `pagination` | Numbered pagination cells |
| Tabs | `tabs` | Switch between related content views |
| Sidebar | `sidebar` | Desktop side panel (groups can collapse) |
| MobileNavigationMenu | `mobile-navigation-menu` | Mobile off-canvas drawer with expandable tree groups |

### Data display

| Component | File | What it does |
| --- | --- | --- |
| Avatar | `avatar` | Profile image with fallback |
| Badge | `badge` | Simple markers and numbered pills |
| Card | `card` | Grouped content block (header/body/footer) |
| Table | `table` | Structured tabular data |
| Accordion | `accordion` | Expandable sections |
| Collapsible | `collapsible` | Single expandable region |
| Carousel | `carousel` | Paged, keyboard-accessible carousel |
| Item | `item` | Flexible list rows with media, metadata, actions |
| Empty | `empty` | Empty-state guidance and actions |
| Kbd | `kbd` | Keyboard key display |
| AspectRatio | `aspect-ratio` | Proportional media container |

### Feedback

| Component | File | What it does |
| --- | --- | --- |
| Alert | `alert` | Inline informational or destructive message |
| Progress | `progress` | Determinate progress bar |
| Skeleton | `skeleton` | Loading placeholder shapes |
| Spinner | `spinner` | Indeterminate loading indicator |
| Toast | `toast` | Provider-backed transient notifications |
| Toaster | `toaster` | Host component for the toast system |
| Sonner | `sonner` | Stacked status notifications (peer: sonner) |

### Structure

| Component | File | What it does |
| --- | --- | --- |
| Separator | `separator` | Horizontal/vertical divider |
| ScrollArea | `scroll-area` | Bounded scrolling region with styled scrollbar |
| Template | `template` | Application frame — header, sub-header, sidebars, canvas, footer |
| Resizable | `resizable` | Resizable panel group (used by `TemplateBody`) |

### Charts

| Component | File | What it does |
| --- | --- | --- |
| Chart | `chart` | Recharts-based chart container, tooltip, legend (peer: recharts) |

### Icons

| Component | File | What it does |
| --- | --- | --- |
| Icon / IconSetProvider | `icon` | Named `Icon` component + provider to swap glyphs; for arbitrary icons use `lucide-react` directly |

Peer dependencies — install only the ones you actually use: `chart`→recharts · `carousel`→embla-carousel-react · `drawer`→vaul · `command`→cmdk · `sonner`→sonner.

## Canonical compositions

Verified compositions for the components that are easy to get wrong. Copy-paste ready;
replace icons/labels/data with your own. Icons come from `lucide-react`, which ships with PDS.

### Button

One brand style; size and state are props, not separate components.

| Prop | Values | Notes |
| --- | --- | --- |
| `size` | `mini` · `small` (default) · `large` · `icon` · `special` | `mini`/`icon`: icon-only squares · `special`: icon stacked above the label |
| `variant` | `default` · `destructive` · `link` | States of the same button, not separate types |
| `asChild` | boolean | Render a child element (e.g. `<a>`) with button styling — Radix Slot |
| `tooltip` | string | Tooltip text; wins over `title`/`aria-label` when deriving the auto-tooltip |

Plus all native `<button>` props (`disabled`, `onClick`, …).

```tsx
import { ArrowRight, Loader2, Mail, Pencil, Sparkles } from "lucide-react"
import { Button } from "@workspace/pds/components/ui/button"
import { Tooltip } from "@workspace/pds/components/ui/tooltip"

export function Example() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Compact icon buttons */}
      <Button size="mini" aria-label="Edit"><Pencil /></Button>
      <Tooltip content="Send mail">
        <Button size="icon" aria-label="Send mail"><Mail /></Button>
      </Tooltip>

      {/* Label with optional left/right icon */}
      <Button size="small">Label</Button>
      <Button size="large"><Mail />Label</Button>
      <Button size="large">Label<ArrowRight /></Button>

      {/* Square tile, icon over label */}
      <Button size="special"><Sparkles />Save</Button>

      {/* States */}
      <Button size="small" disabled>Disabled</Button>
      <Button size="small" disabled><Loader2 className="animate-spin" />Loading</Button>
      <Button size="small" variant="link">Link</Button>
      <Button size="small" variant="destructive">Destructive</Button>
    </div>
  )
}
```

- Icon-only buttons must carry an `aria-label` — it also feeds the tooltip text.
- `size="mini"`/`"small"` get a PDS Tooltip automatically when a label is derivable (`tooltip` → `title` → `aria-label`); for other sizes wrap in `<Tooltip>` explicitly if you want one.
- Use `asChild` to keep real semantics (links, inputs) while getting button styling.
- Loading state = `disabled` + spinning icon; there is no dedicated loading variant.

### Sidebar & mobile navigation

Two shapes from one family: a bounded **desktop panel** (groups can collapse) and a
**mobile off-canvas drawer** with expandable tree groups. The desktop shape is what you
pass to `TemplateBody` as `sidebar`.

Desktop panel:

```tsx
import { Home, Settings } from "lucide-react"
import { ScrollArea } from "@workspace/pds/components/ui/scroll-area"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@workspace/pds/components/ui/sidebar"

function LeftNav() {
  return (
    <SidebarProvider className="h-full !min-h-0">
      <Sidebar side="left" collapsible="none" className="!w-full">
        <SidebarContent className="overflow-hidden">
          <ScrollArea className="flex-1 min-h-0">
            <div className="pr-1">
              <SidebarGroup accordion>
                <SidebarGroupLabel>General</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive>
                        <Home />
                        <span>Overview</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton onClick={openSettings}>
                        <Settings />
                        <span>Settings</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </div>
          </ScrollArea>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
```

Mobile drawer:

```tsx
import { Folder, Home, Settings } from "lucide-react"
import {
  MobileNavigationMenu,
  MobileNavigationMenuClose,
  MobileNavigationMenuContent,
  MobileNavigationMenuDescription,
  MobileNavigationMenuHeader,
  MobileNavigationMenuItem,
  MobileNavigationMenuPanel,
  MobileNavigationMenuSeparator,
  MobileNavigationMenuTitle,
  MobileNavigationMenuTrigger,
  MobileNavigationMenuTree,
} from "@workspace/pds/components/ui/mobile-navigation-menu"

export function MobileNav() {
  return (
    <MobileNavigationMenu>
      {/* The trigger lives in your app header */}
      <div className="flex items-center justify-between px-4 py-2">
        <span>Pella</span>
        <MobileNavigationMenuTrigger />
      </div>

      <MobileNavigationMenuPanel side="left">
        <MobileNavigationMenuDescription className="sr-only">Primary navigation drawer.</MobileNavigationMenuDescription>
        <MobileNavigationMenuHeader>
          <MobileNavigationMenuTitle>Pella</MobileNavigationMenuTitle>
          <MobileNavigationMenuClose />
        </MobileNavigationMenuHeader>

        <MobileNavigationMenuContent>
          <MobileNavigationMenuItem asChild isActive>
            <a href="#"><Home /><span>Home</span></a>
          </MobileNavigationMenuItem>
          {/* Tree group: expandable subtree of child rows */}
          <MobileNavigationMenuTree title="Projects" icon={<Folder />} defaultOpen>
            <MobileNavigationMenuItem asChild>
              <a href="#"><span>Website</span></a>
            </MobileNavigationMenuItem>
          </MobileNavigationMenuTree>
          <MobileNavigationMenuSeparator />
          <MobileNavigationMenuItem asChild>
            <a href="#"><Settings /><span>Settings</span></a>
          </MobileNavigationMenuItem>
        </MobileNavigationMenuContent>
      </MobileNavigationMenuPanel>
    </MobileNavigationMenu>
  )
}
```

- Give the desktop panel a bounded height: `h-full !min-h-0` on `SidebarProvider`. Inside `TemplateBody` you pass the whole composition as the `sidebar` prop.
- `collapsible="none"` + `className="!w-full"` = the panel fills its slot — the standard shape inside Template.
- Do not add your own padding to `SidebarContent`, `SidebarGroup`, or menu rows: inner padding is provided by the chain itself.
- Active state is `isActive` on `SidebarMenuButton`; keep selection in React state and wire `onClick` yourself.
- Mobile drawer items are usually real links via `asChild`; `MobileNavigationMenuTree` groups expand accordion-style.

### Template

The application frame: header, optional sub-header, optional left/right sidebars, a canvas
for content, and a footer. This is the outer shell of a PDS app screen.

| Component | Prop | Values / default | Notes |
| --- | --- | --- | --- |
| `TemplateBody` | `subHeader` | ReactNode | Sub-header row between header and body |
| `TemplateBody` | `sidebar` | ReactNode | Left panel (a `Sidebar` composition, see above) |
| `TemplateBody` | `rightSidebar` | ReactNode | Right panel (same shape) |
| `TemplateBody` | `defaultSidebarSize` | number · default 30 | Initial left panel width (%) |
| `TemplateBody` | `minSidebarSize` | number · default 20 | Minimum left panel width (%) |
| `TemplateBody` | `defaultRightSidebarSize` / `minRightSidebarSize` | same as above | Right panel sizing |
| `TemplateCanvas` | `layout` | `center` (default) · `full` · `grid` · `columns` | Content layout inside the canvas |

```tsx
import { Tag } from "@workspace/pds/components/ui/tag"
import {
  Template,
  TemplateBody,
  TemplateCanvas,
  TemplateFooter,
  TemplateHeader,
  TemplateSubHeader,
} from "@workspace/pds/components/ui/template"

export function AppFrame() {
  return (
    <div className="h-screen">
      <Template>
        <TemplateHeader>
          <span className="text-sm font-semibold tracking-tight">My app</span>
          <div className="ml-auto flex items-center gap-2">
            {/* header controls */}
          </div>
        </TemplateHeader>

        <TemplateBody
          defaultSidebarSize={28}
          subHeader={
            <TemplateSubHeader>
              <span>Workspace</span>
              <Tag>Demo</Tag>
            </TemplateSubHeader>
          }
          sidebar={<LeftNav />} {/* the desktop Sidebar composition above */}
        >
          <TemplateCanvas layout="center">
            {/* your content */}
          </TemplateCanvas>
        </TemplateBody>

        <TemplateFooter>
          <span>Status line</span>
        </TemplateFooter>
      </Template>
    </div>
  )
}
```

- Give `Template` a bounded height (`h-screen`, or a fixed-height container) — it fills its container.
- Sidebars are optional: omit the prop to drop a panel; pass `undefined` (not `null`) when toggling at runtime.
- Chrome padding (header / sub-header / footer / canvas) is provided by the component itself — do not add extra padding at these levels. Canvas inner content is your responsibility.
- With `layout="grid"` or `"columns"`, direct children of `TemplateCanvas` become grid cells; `"center"` centers a single column; `"full"` runs edge to edge.
- The gaps between panels are resizable drag handles; initial widths come from the size props above.

## Composition notes (other non-trivial components)

- **Field** — self-contained floating-label input: `label` prop is required; `size="sm"|"lg"`; `tone="fill"|"outline"` (an explicit tone wins over the installed field style, see Settings below); `state="error"`; optional `trailingIcon`.
- **Form** — react-hook-form composition: `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`, `useFormField`. react-hook-form ships with PDS — no extra install.
- **Menu** — one component for both dropdown and context menus: `<Menu mode="dropdown">` (trigger click) or `<Menu mode="context">` (right-click inside the trigger). Subcomponents: `Trigger`, `Content`, `Item`, `CheckboxItem`, `RadioGroup`, `RadioItem`, `Label`, `Separator`, `Shortcut`, `Sub`, `SubTrigger`, `SubContent`.
- **Command** — keyboard-first palette: `Command` + `CommandInput`, `CommandList`, `CommandGroup`, `CommandItem`, `CommandEmpty`, `CommandShortcut`, `CommandSeparator`; `CommandDialog` for the dialog form. Peer: cmdk.
- **Chart** — `ChartContainer` takes a `config` object mapping series keys to `{ label?, icon?, color | theme }` and wraps recharts elements; `ChartTooltip`/`ChartTooltipContent`, `ChartLegend`/`ChartLegendContent`, `ChartStyle`. Peer: recharts.
- **Drawer** — bottom sheet on vaul (peer: vaul): `Drawer > DrawerTrigger + DrawerContent(DrawerHeader(DrawerTitle, DrawerDescription), …, DrawerFooter)`; `DrawerClose` closes from anywhere inside.
- **Item** — list row: `Item > ItemMedia + ItemContent(ItemHeader(ItemTitle, ItemDescription), ItemActions) + ItemFooter?`; group rows in `ItemGroup`, divide with `ItemSeparator`.
- **Toast / Toaster** — mount `<Toaster />` once at the app root; fire notifications with `toast({ title, description, action? })` from `/hooks/use-toast` (also exported as `useToast`). The raw primitives (`ToastProvider`, `ToastViewport`, `Toast`, …) are available for custom setups.

## Settings panel pattern

The settings an installation exposes, and how to wire each control. All runtime theming
goes through the config module + CSS custom properties (zero re-render); contrast-check
surfaces come from the runtime `tokens` object — never hardcode hex values.

1. **Dark / light** — app-managed, not part of the PDS config: toggle the `dark` class on `<html>` (the generated theme defines its dark variant as `.dark *`). Persist the choice in your own storage key and keep it in shared state so dependent UI re-renders.
2. **Field style (fill / outline)** — `setPdsConfig({ fieldStyle })`, read live with `usePdsConfig()`; applies to every Field/Input/Textarea without an explicit `tone`.
3. **Brand color** — one hex per theme (`lightBrand`/`darkBrand`). Wire a `ColorPicker` per active theme with `checks` + `checkAgainst` built from the main surfaces of that theme (`tokens.color.<theme>`); the V indicator stays visible while contrast is at or above `minContrast` (default 3:1).
4. **Font** — `setPdsConfig({ font })` where font is one of the exported `PDS_FONT_IDS` (default: "roboto").

```tsx
import { tokens } from "@workspace/pds/tokens"
import { PDS_DEFAULTS, setPdsConfig, usePdsConfig } from "@workspace/pds/config"
import { Button } from "@workspace/pds/components/ui/button"
import { ColorPicker } from "@workspace/pds/components/ui/color-picker"

export function SettingsSection() {
  const cfg = usePdsConfig()
  // Theme is app-managed (`.dark` on <html>); keep this in shared state with your toggle.
  const dark = document.documentElement.classList.contains("dark")
  const brand = dark ? cfg.darkBrand : cfg.lightBrand
  // Contrast-check surfaces for the active theme — from tokens, never hardcoded.
  const t = tokens.color[dark ? "dark" : "light"]
  const surfaces = [t.background, t.card, t.popover]

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Dark / light */}
      <Button size="mini" aria-label="Toggle theme" onClick={() => document.documentElement.classList.toggle("dark")}>
        {dark ? "Light mode" : "Dark mode"}
      </Button>

      {/* Field style */}
      <Button size="mini" aria-label="Toggle field style" onClick={() => setPdsConfig({ fieldStyle: cfg.fieldStyle === "fill" ? "outline" : "fill" })}>
        Fields: {cfg.fieldStyle}
      </Button>

      {/* Brand color — V = passes contrast on every listed surface */}
      <ColorPicker
        value={brand}
        onChange={(hex) => setPdsConfig(dark ? { darkBrand: hex } : { lightBrand: hex })}
        label="Brand primary"
        checks
        checkAgainst={surfaces}
        resetValue={dark ? PDS_DEFAULTS.darkBrand : PDS_DEFAULTS.lightBrand}
      />
    </div>
  )
}
```

## If you are an agent in a CONSUMER app that installed PDS

- Install: `pnpm add "https://github.com/pellaDev/PDS#main"` (pin with `#vX.Y.Z`)
- Import from subpaths; include the styles once at your entry point:

```tsx
import "@workspace/pds/styles.css";
import { Button } from "@workspace/pds/components/ui/button";
import { configurePds, setPdsConfig } from "@workspace/pds/config"; // optional runtime theming
```

- Optional peer dependencies — install only if you use the component:
  `chart`→recharts, `carousel`→embla-carousel-react, `drawer`→vaul,
  `command`→cmdk, `sonner`→sonner. Full table in `README.md`.
- ESM tree-shaking: import only what you use. The component index, canonical compositions, and the settings pattern are in the sections above this one.
