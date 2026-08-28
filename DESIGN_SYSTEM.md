# PDS — Design system orientation base

Single entry point to understand, use, and maintain the **Pella Design System**.
Read order for a new contributor or consumer: root `README.md` (quick start) → this file → the group guides linked below.

## 1. What this repo is

The PDS lives in one pnpm workspace with two faces, by design:

- **An installable design system** — package [`@workspace/pds`](artifacts/pds/package.json). Consumers import its tokens, stylesheet and components through subpath exports (see §5).
- **A showcase WebUI that uses the DS itself** — `artifacts/pds/src/preview/` (a hash-routed browser with 53 live demo pages) served on a local port. The UI is built from the same `src/components/ui/*` files it documents: what you see in the browser *is* the design system, not a mock of it.

Supporting pattern layer in `lib/`: OpenAPI spec → Orval codegen (`api-spec`, `api-zod`, `api-client-react`) and an empty Drizzle ORM template (`db`).

## 2. Quick start (showcase)

```bash
./start.sh                 # http://localhost:5173/   (installs deps on first run)
PDS_PORT=8080 ./start.sh   # alternative port via env var
```

Manual equivalent, from the repo root:

```bash
pnpm install               # pnpm is mandatory — a preinstall guard rejects npm/yarn
PORT=5173 pnpm --filter @workspace/pds run dev
```

Notes for special environments: if your `$HOME` is read-only (agent sandboxes, locked-down machines), point the pnpm store elsewhere: `pnpm install --store-dir /tmp/pds-store`. Node v22 + pnpm 10 are the verified runtime pair.

## 3. Token pipeline — single source of truth

```
artifacts/pds/tokens.json                     <- ONLY file you ever edit for tokens
        |  scripts/build-tokens.mjs (runs automatically as prebuild/pretypecheck hook)
        v
src/generated/tokens.tsx   -> `tokens` const + `Tokens` type (also default export)
src/index.css              -> CSS custom properties, Tailwind v4 entry
public/favicon.svg         -> generated from the same tokens
```

The two outputs are **generated files**: they are committed (so consumers get them without running anything) and regenerate byte-identical. Never edit them by hand — edit `tokens.json` and run `pnpm --filter @workspace/pds run tokens`.

## 4. Component groups

Foundations pages in the showcase: [Color roles](http://localhost:5173/#?page=color-roles) · [Type scale](http://localhost:5173/#?page=type-scale) · [Spacing and radius](http://localhost:5173/#?page=spacing-radius).

| Group | Count | Guide (local-only docs) | Showcase section starts at |
|---|---|---|---|
| Actions | 4 | `artifacts/pds/docs/components/actions.md` | [Button](http://localhost:5173/#?page=button) |
| Forms & inputs | 12 | `artifacts/pds/docs/components/forms-and-inputs.md` | [Input](http://localhost:5173/#?page=input) |
| Overlays | 8 | `artifacts/pds/docs/components/overlays.md` | [Dialog](http://localhost:5173/#?page=dialog) |
| Menus & navigation | 8 | `artifacts/pds/docs/components/menus-and-navigation.md` | [Dropdown menu](http://localhost:5173/#?page=dropdown-menu) |
| Data display | 11 | `artifacts/pds/docs/components/data-display.md` | [Avatar](http://localhost:5173/#?page=avatar) |
| Feedback | 6 | `artifacts/pds/docs/components/feedback.md` | [Alert](http://localhost:5173/#?page=alert) |
| Structure | 3 | `artifacts/pds/docs/components/structure.md` | [Separator](http://localhost:5173/#?page=separator) |
| Charts | 1 | `artifacts/pds/docs/components/charts.md` | [Chart](http://localhost:5173/#?page=chart) |

Component files without a dedicated showcase page yet (documented from source only): `src/components/ui/icon.tsx`, `label.tsx`, `toaster.tsx` — adding their demo pages is open TODO.

## 5. Consuming the DS from another product

The package ships for subpath consumption (peer dependency: React ≥ 18):

```ts
import { Button } from "@workspace/pds/components/ui/button"; // any ui component, same path as src/
import { tokens, type Tokens } from "@workspace/pds/tokens";  // generated token values + types
// stylesheet via the "./styles.css" export (e.g. imported once at app entry)
```

`styles.css` carries an `@source ./components` directive so Tailwind v4 in a consuming app also generates this package's utility classes — consumers do not need to configure content scanning. Distribution model today: clone/link from git (the package is marked `"private": true`; flipping that plus adding a `"files"` field would be needed for npm-registry publishing).

## 6. Repo map (verified layout)

```
Design-System-Complete/            pnpm workspace root (pnpm-workspace.yaml, catalog)
├── start.sh                       one-shot launcher: install + showcase server
├── README.md                      consumer quickstart
├── DESIGN_SYSTEM.md               this file — orientation base
├── artifacts/pds/                 @workspace/pds — the design system package
│   ├── tokens.json                token source of truth
│   ├── scripts/build-tokens.mjs   generator (prebuild/pretypecheck hook)
│   ├── src/index.css              GENERATED — CSS entry for consumers
│   ├── src/generated/tokens.tsx   GENERATED — token values + types
│   ├── src/components/ui/         56 Radix/CVA components (the library surface)
│   ├── src/hooks/                 use-mobile, use-toast
│   ├── src/lib/utils.tsx          shared helpers
│   └── src/preview/               showcase WebUI: registry + 53 demo pages
├── lib/api-spec/                  OpenAPI spec + Orval codegen -> api-zod, api-client-react
└── lib/db/                        Drizzle ORM template (push/push-force scripts)
```

## 7. Maintenance invariants

- **pnpm only.** The root `preinstall` guard rejects npm/yarn — keep it.
- **Supply-chain settings are deliberate:** `minimumReleaseAge: 1440` and the security header in `pnpm-workspace.yaml`, plus two pinned esbuild overrides (`@esbuild-kit/esm-loader` → `tsx ^4.21`, `esbuild 0.27.3`). Do not remove without re-testing install + build.
- **Generated files stay committed** (tokens outputs, lockfile) and must regenerate byte-identical after any tokens.json change — treat drift as a bug.
- **Codegen commands:** `pnpm --filter @workspace/api-spec run codegen` (Orval); `pnpm --filter @workspace/db run push` (Drizzle, needs `DATABASE_URL`).
- **Known non-blocker:** recharts 2.15.4 prints a deprecation warning during install — pre-existing, cosmetic.

## 8. Documentation policy (docs separated from code)

By decision: working/maintenance documentation is kept **out of git**. `.gitignore` excludes `artifacts/pds/docs/` and the root process record `CLEAN_BASE.md`. What ships with the repo on git: this file, both READMEs, `start.sh`, source. Local-only under `artifacts/pds/docs/`: maintainer notes (AGENTS, PDS-MAINTENANCE), migration/consumption working docs, and the group guides in `components/` — those are maintained locally next to their context and linked from here for convenience on this machine.
