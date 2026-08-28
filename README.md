# PDS — Pella Design System

Il design system di Michele Pella, in un unico workspace pnpm con due facce deliberate:

1. **Showcase WebUI** — una preview standalone (53 demo live) servita su porta locale;
   è costruita dai *stessi* file `src/components/ui/*` che la documenta: ciò che vedi
   nel browser **è** il design system, non un mock.
2. **Pacchetto installabile** — `@workspace/pds`: token generati da `tokens.json`,
   stylesheet e componenti importabili per sottopercorso da altri prodotti.

## Quick start (showcase)

```bash
./start.sh                 # → http://localhost:5173/  (installa le dipendenze al primo avvio)
PDS_PORT=8080 ./start.sh   # porta alternativa via variabile d'ambiente
```

Manuale, dalla root: `pnpm install && PORT=5173 pnpm --filter @workspace/pds run dev`.
Ambienti con `$HOME` in sola lettura (sandbox): `pnpm install --store-dir /tmp/pds-store`.

## Dove si trova la documentazione

- [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) — **base di orientazione unificata**: pipeline dei token,
  indice dei gruppi componenti con deep link, mappa del repo, invarianti di manutenzione.
- Guide per gruppo componente (local-only, escluse da git): `artifacts/pds/docs/components/*.md` —
  una tabella per famiglia: componente → fonte → demo live.
- Docs del pacchetto (leggere sul posto, non copiare): `consuming-web.md`, `consuming-expo.md`,
  `migrating-web.md`, `migrating-expo.md`, `github-consumption.md` in `artifacts/pds/docs/`.

> **Policy (decisione di prodotto):** documentazione working/mantenimento separata dal codice —
> `artifacts/pds/docs/` e `CLEAN_BASE.md` restano fuori da git; su git viaggiano README,
> `DESIGN_SYSTEM.md`, `start.sh` e sorgente.

## Usare PDS come design system

```ts
import { Button } from "@workspace/pds/components/ui/button";  // qualsiasi componente ui/*
import { tokens, type Tokens } from "@workspace/pds/tokens";   // valori generati + tipi
// stylesheet: export "./styles.css" (porta @source ./components per il consumer Tailwind v4)
```

Distribuzione attuale: git (clone/link — `private: true`; per pubblicare su npm servirebbero quel flag e un campo `files`). Dettaglio in `artifacts/pds/docs/github-consumption.md`.

## Stack

| Layer | Tecnologia |
|---|---|
| Runtime | Node v22.22.2 (verificato su HYPERION), pnpm 10, TypeScript ~5.9.3, Vite 7.3, React 19.1, Tailwind v4 — il package manager **deve essere pnpm**: lo script `preinstall` rifiuta npm/yarn |
| Linguaggio | TypeScript ~5.9 (`tsconfig.base.json`, project references su `lib/*`) |
| UI | Vite 7 · React 19 · Tailwind CSS v4 (plugin vite) · class-variance-authority · Radix primitives |
| Token | `tokens.json` → `artifacts/pds/scripts/build-tokens.mjs` → `src/generated/tokens.tsx` + `src/index.css` |
| API (pattern layer) | OpenAPI spec (`lib/api-spec/openapi.yaml`) → Orval codegen → client React Query + Zod schemas; Drizzle ORM come template vuoto (`lib/db`) |

## Comandi

Tutti da eseguire dalla root del workspace, a meno di indicazione diversa.

| Comando | Descrizione |
|---|---|
| `./start.sh` | Quick start showcase: install (se serve) + dev server su :5173 (`PDS_PORT` per override) |
| `pnpm install` | Installa le dipendenze (rigenera il lockfile se i manifest sono cambiati) |
| `pnpm run typecheck` | Typecheck completo: project references `lib/*` + ogni pacchetto con script dedicato |
| `pnpm run build` | Typecheck + build di tutti i pacchetti che espongono un build |
| `pnpm --filter @workspace/pds run dev` | Preview site dei componenti (Vite, host 0.0.0.0) |
| `pnpm --filter @workspace/pds run tokens` | Rigenera token CSS/TS da `tokens.json` (serve anche pre-build/pre-typecheck) |
| `pnpm --filter @workspace/api-spec run codegen` | Regenera client React + Zod schemas dall'OpenAPI spec via Orval |
| `pnpm --filter @workspace/db run push` | Push schema Drizzle in locale — richiede variabile d'ambiente `DATABASE_URL` (Postgres) |

Note operative:
- Il preview di pds **non richiede** le variabili `PORT`/`BASE_PATH`: se non definite usa porta 5173 e base `/`. Entrambe restano opzionali per chi deve fare override (`start.sh` inietta solo `PORT`).
- I file generati da Orval (`lib/api-client-react/src/generated/**`, `lib/api-zod/src/generated/**`)
  vanno **commit**: un consumer GitHub deve poter installare il progetto senza rigenerare nulla.

## Mappa della struttura

```
Design-System-Complete/
├── start.sh                # launcher one-shot: install + showcase server (start da qualsiasi cwd)
├── DESIGN_SYSTEM.md        # base di orientazione unificata del design system
├── artifacts/
│   └── pds/                  # @workspace/pds — IL design system: componenti, token, preview Vite
│       ├── tokens.json       # ← single source of truth dei token visivi (DTCG)
│       ├── scripts/build-tokens.mjs
│       ├── vite.config.ts    # plugin react + tailwind + watcher token (no dipendenze da piattaforma)
│       ├── docs/             # working docs del pacchetto — local-only, escluse da git
│       └── src/              # components/ui/*, hooks/, lib/utils, generated/tokens.tsx, index.css
├── lib/                      # layer di pattern standalone, nessuna dipendenza reciproca con pds
│   ├── api-spec/             # openapi.yaml + orval.config.ts (codegen)
│   ├── api-client-react/     # client React Query generato da Orval (+ custom-fetch mutator)
│   ├── api-zod/              # Zod schemas generati da Orval
│   └── db/                   # template Drizzle ORM vuoto (drizzle.config.ts, schema/)
├── attached_assets/          # export originali dei token — provenienza storica di tokens.json, NON toccare
├── pnpm-workspace.yaml       # catalog + security guardrail (vedi sotto)
└── tsconfig.base.json / tsconfig.json   # config TS condivisa + project references su lib/*
```

(`CLEAN_BASE.md`, record del processo di sanificazione workspace, è sul disco ma escluso da git per policy docs.)

## Decisioni architetturali

1. **Token = single source of truth.** Ogni modifica visiva parte da `tokens.json`; CSS e tipi sono
   generati, mai editati a mano (zero drift tra documenti).
2. **Tailwind v4 + CVA preservati** — è l'architettura visiva del design system, non un artefatto della
   piattaforma: mantenuti integralmente durante la pulizia.
3. **`lib/*` separabile da `artifacts/pds`:** i layer API (spec → client → zod) e il DB template sono
   indipendenti dalla UI; chi consuma solo i componenti non trae dipendenze inutili.
4. **Supply-chain guardrail attivo:** `minimumReleaseAge: 1440` in `pnpm-workspace.yaml` impone che ogni
   versione npm sia pubblicata da ≥24h prima dell'installazione (difesa contro attacchi supply-chain).
   **Non rimuoverlo.** Gli override funzionali residui (pin `esbuild: 0.27.3`, alias tsx per drizzle-kit)
   sono documentati nel file stesso.
5. **Showcase-first (decisione prodotto):** la preview è il design system che si usa da sé — doc e
   implementazione non possono divergere; ogni nuovo componente richiede story + voce in `registry.tsx` nello stesso change.

## Gotchas

- **pnpm è obbligatorio** — lo script `preinstall` della root fallisce con npm/yarn di proposito.
- Il lockfile va rigenerato (**solo**) dopo modifiche ai manifest; non committare mai
  `dist/`, `.tsbuildinfo`, `node_modules` (già gitignorati).
- recharts 2.15.4 stampa un warning deprecation all'install: preesistente, cosmetico, non bloccante.
- Le note storiche nei documenti spieganono *perché* certe scelte esistono (es. commit dei file
  generati): sono contesto deliberato, non spazzatura residua.

---

## Dev status / TODO — istruzioni di ripresa a zero contesto

**Stato attuale:** sanificazione workspace completata (2026-08-27) + pacchetto showcase-first applicato:
`start.sh` one-shot launcher; policy docs separati da git (`.gitignore`: `artifacts/pds/docs/`,
`CLEAN_BASE.md`; i file sono sul disco, non nell'index); `DESIGN_SYSTEM.md` base di orientazione + 8 guide per gruppo in `artifacts/pds/docs/components/` (local-only). Working tree **non committato**: contiene ancora le modifiche WIP preesistenti del maintainer su alcuni componenti (`badge, button, calendar, chart, checkbox, field, radio-group, switch`) — non mescolarle in un commit senza revisione.

TODO:
- [ ] Commit finale della pulizia (decidere se separare il cleanup dalle WIP components; la policy docs è già applicata sull'index)
- [ ] Decidere sorte di `attached_assets/` a lungo termine (provenienza token; oggi tenuta come riferimento)
- [ ] Demo pages mancanti per `icon.tsx`, `label.tsx`, `toaster.tsx` (gap noto, documentato in DESIGN_SYSTEM.md §4)

Per riprendere da zero: leggere questa README + `DESIGN_SYSTEM.md`, poi `./start.sh`.
Se l'ambiente ha $HOME read-only aggiungere `--store-dir /tmp/pds-store` a ogni `pnpm install`.
Verifica verde attesa: `pnpm run typecheck` (zero error) e `pnpm --filter @workspace/pds run build` (~4.5s).
