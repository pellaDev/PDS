# PDS — Pella Design System

PDS is the standalone React design system for Pella products. It contains the
Pella token source, generated web theme, portable token object, reusable
accessible UI primitives, and a living style-guide preview.

## Install from GitHub

The package is intentionally self-contained and can be consumed directly from
GitHub without depending on the surrounding workspace.

```bash
pnpm add "https://github.com/AIdevelopmentPit/pellaDS#main"
```

Pin a release tag or commit for reproducible builds:

```bash
pnpm add "https://github.com/AIdevelopmentPit/pellaDS#v1.0.0"
# or
pnpm add "https://github.com/AIdevelopmentPit/pellaDS#<commit-sha>"
```

The consuming app must provide React and React DOM. PDS lists them as peer
dependencies and provides its UI/runtime dependencies as package dependencies.

## Web usage

Import the generated theme once, near the application entry point:

```tsx
import "@workspace/pds/styles.css";
import { Button } from "@workspace/pds/components/button";

export function App() {
  return <Button>Save</Button>;
}
```

If the package is installed under a different package name, use that name in
the imports. The public subpath exports are:

```text
<package>              portable generated tokens
<package>/tokens       portable generated tokens
<package>/styles.css   generated web theme
<package>/config       runtime configuration (install flags + live theming)
<package>/components/* reusable UI components
<package>/lib/*        shared utilities
<package>/hooks/*      shared hooks
```

Import the theme before rendering PDS components. Do not copy component source
or token values into the consuming application.

## Theming at install time and live

An installation of PDS exposes three options through `<package>/config`. All are optional —
an app that installs without flags gets the design system defaults (fill fields, Roboto,
exported brand colors):

| Option | Values | Default |
| --- | --- | --- |
| Brand colors | `lightBrand` / `darkBrand` — hex, one per theme | exported brand primaries |
| Field style | `fieldStyle` — `"fill"` (filled graySoft container) or `"outline"` (surface with brand border) | `"fill"` |
| Font | `font` — a self-hosted typeface from the generated tokens (`tokens.fontOptions`) | `roboto` |

```tsx
import "@workspace/pds/styles.css";
import { configurePds, setPdsConfig, usePdsConfig } from "@workspace/pds/config";

// Install step (optional) — pin what this installation ships with. Call once at bootstrap.
configurePds({ lightBrand: "#0B5FFF", darkBrand: "#7AB8FF", font: "inter" });

// Live, from anywhere in the app (e.g. its themes menu). Persists and applies immediately.
setPdsConfig({ fieldStyle: "outline" });

function ThemesMenu() {
  const { font, fieldStyle } = usePdsConfig(); // re-renders on any change
  return <p>{font} / {fieldStyle}</p>;
}
```

Brand and font choices are applied as inline custom properties on `<html>`
(`--pds-brand-light`, `--pds-brand-dark`, `--pds-font-sans`), so every consumer of the
generated theme follows live, in both themes, without a reload. Values persist to
`localStorage` under `pds-config`; install flags act as the base layer under any persisted
user choice. Field style sets the *default* tone of the field family (Field, Input,
Textarea, InputGroup) — an explicit `tone` prop always wins over the setting.

## Updating from GitHub

For a floating branch reference:

```bash
pnpm update <package-name>
```

For a pinned tag or commit, update the reference in `package.json` and run:

```bash
pnpm install
```

After updating, run the consumer's typecheck and visual smoke test. Read
`docs/consuming-web.md` for integration details and
`docs/migrating-web.md` before replacing an existing local component library.

## Maintaining PDS

The canonical maintenance instructions for an LLM are in
`docs/PDS-MAINTENANCE.md`. They define the source-of-truth rules, token
workflow, state checklist, GitHub release process, file tree, and verification
requirements.

The short version:

1. Edit `tokens.json`, never generated outputs.
2. Keep every semantic color in both light and dark themes.
3. Use semantic PDS classes instead of raw color, border, spacing, or font
   values in components.
4. Add/update a preview demo with every component behavior change.
5. Run `pnpm tokens`, `pnpm typecheck`, and a production build.
6. Verify both themes and inspect browser console output.

## Local preview

```bash
pnpm install
PORT=5173 BASE_PATH=/pds/ pnpm dev
```

The preview includes foundations, all registered component demos, responsive
navigation, search, and the light/dark theme switch. `?theme=dark` can be used
for an automated dark-mode screenshot.

## GitHub repository expectations

Commit the generated files. A GitHub consumer should be able to install a
commit as-is, without any external workspace tooling. Do not commit
`node_modules`, Vite caches, or local build state.

Recommended release flow:

```bash
pnpm tokens
pnpm typecheck
pnpm build
git add tokens.json src/index.css src/generated/tokens.tsx public/favicon.svg
git commit -m "release: update PDS"
git tag v1.0.0
git push origin main --tags
```