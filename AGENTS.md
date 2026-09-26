# AGENTS.md — PDS repository

Operating rules for AI coding agents working in this repository. Read before editing.

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
| `pnpm run build:release` | Rebuild `dist/` (JS + CSS + .d.ts) |
| `pnpm run update` | Consumer-side version update/revert (update.mjs) — do not modify casually |

## Layout

- `src/components/ui/` — 53 components: a shadcn/ui v4 registry subset plus PDS additions (icon, menu, tag, toast, toaster).
- `tokens.json` — token SSOT · `scripts/build-tokens.mjs` + `scripts/core-tokens.mjs` — generators
- `src/config.tsx` — runtime configuration (brand colors, field style, font)
- `dist/` — prebuilt ESM + CSS + .d.ts (build output)
- `update.mjs` — version update/revert for consumers
- `README.md` — public docs (install / usage / exports)

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
- ESM tree-shaking: import only what you use. Full API in `README.md`.
