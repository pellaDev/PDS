<div align="center">
  <noscript><a href="https://liberapay.com/pellaDev/donate"><img alt="Donate using Liberapay" target="_blank" src="https://liberapay.com/assets/widgets/donate.svg"></a></noscript>
</h1>

<h1 align="center">
  PDS | Pella Design System
</div>

<div align="center">
  <img src="src/preview/assets/logoAnimated.svg" width="124" alt="Pella Design System animated logo"/>
</div>

<div align="center">
React design system: tokens, components, and a live showcase.
</div>

## Install

```bash
pnpm add "https://github.com/pellaDev/PDS#main"
```

Pin a version:

```bash
pnpm add "https://github.com/pellaDev/PDS#v1.2.0"
```

## Usage

```tsx
import "@workspace/pds/styles.css";
import { Button } from "@workspace/pds/components/button";
import { tokens } from "@workspace/pds/tokens";

export function App() {
  return <Button>Save</Button>;
}
```

### Configuration (optional)

```tsx
import { configurePds, setPdsConfig, usePdsConfig } from "@workspace/pds/config";

configurePds({ lightBrand: "#0B5FFF", darkBrand: "#7AB8FF", font: "inter" });
setPdsConfig({ fieldStyle: "outline" });
```

| Option | Values | Default |
| --- | --- | --- |
| Brand colors | `lightBrand` / `darkBrand` — hex | exported brand primaries |
| Field style | `"fill"` or `"outline"` | `"fill"` |
| Font | self-hosted typeface name from tokens | `roboto` |

## Showcase (local preview)

```bash
./start.sh          # -> http://localhost:5173/
PDS_PORT=8080 ./start.sh
```

## Exports

| Subpath | Content |
| --- | --- |
| `@workspace/pds` / `/tokens` | Generated token values + types |
| `@workspace/pds/styles.css` | Generated CSS theme |
| `@workspace/pds/config` | Runtime configuration (brand, font, field style) |
| `@workspace/pds/components/*` | UI components |
| `@workspace/pds/lib/*` | Shared utilities |
| `@workspace/pds/hooks/*` | Shared hooks |

## Requirements

- Node v22+, pnpm 10
- React >= 18 (peer dependency)
