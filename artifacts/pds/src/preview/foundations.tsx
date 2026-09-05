import { useContext } from 'react';

import { Pencil, Sparkles, Check, X } from 'lucide-react';

import { SurfaceThemeContext } from './parts';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Field } from '../components/ui/field';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { tokens } from '../generated/tokens';
import { Tag } from '../components/ui/tag';
import { hslTripleToHex, useLiveVar, contrastRatio, inkOn } from './liveColor';

export function OverviewPage() {
  const slot = useContext(SurfaceThemeContext);
  // The nested "Create workspace" card inverts its composition against the host surface: on the
  // alternative (gray) background it is built from the primary set, and vice versa. The real
  // components inside keep their own token-driven styling.
  const primarySetCard = slot.surface === 'alternate';
  const switchId = 'overview-notify-' + slot.surface;
  return (
    <div className="space-y-4">
      {/* The actual components in use, composed on this surface */}
      <div className="flex flex-wrap items-center gap-3">
        <Button size="mini">
          <Pencil />
        </Button>
        <Button size="small">Small</Button>
        <Button size="large">Large</Button>
        <Button size="special">
          <Sparkles />
          Special
        </Button>
        <Button variant="link">Link</Button>
        <Badge shape="numbered" variant="default">Default</Badge>
        <Badge shape="numbered" variant="alert">Alert</Badge>
        <Badge shape="numbered" variant="disabled">Disabled</Badge>
      </div>

      <Card className={primarySetCard ? 'bg-background text-foreground' : 'bg-secondary text-secondary-foreground'}>
        <CardHeader>
          <CardTitle>Create workspace</CardTitle>
          <CardDescription>
            {primarySetCard
              ? 'Primary-set composition on the alternative surface.'
              : 'Alternative-set composition on the primary surface.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Field size="sm" tone="outline" label="Workspace name" className="w-full max-w-60" />

          <div className="flex items-center gap-2">
            <Switch defaultChecked id={switchId} />
            <Label htmlFor={switchId}>Email notifications</Label>
            <Badge shape="numbered" className="ml-auto">New</Badge>
          </div>
        </CardContent>
        <CardFooter className="gap-2">
          <Button>Save</Button>
          <Button variant="link">Cancel</Button>
        </CardFooter>
      </Card>
    </div>
  );
}



// Global color inventory for both themes. Values are sourced 1:1 from artifacts/pds/tokens.json.
type GlobalColor = { name: string; hex: string; hint?: string; cssVar?: string };
type ColorGroup = { label: string; colors: GlobalColor[] };
type ThemeSet = {
  label: string;
  boxes: { bg: string; text: string }[];
  groups: ColorGroup[];
};

const HOVER_LAYER_ALPHA_LABEL = '32%';

// Blend a base hex with white (lighten) or black (darken) at the documented 32% layer alpha.
function blendHex(hex: string, towardWhite: boolean): string {
  const n = parseInt(hex.slice(1), 16);
  const channels = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return '#'+channels.map((c: number)=>Math.round(c*0.68+(towardWhite?255:0)*0.32).toString(16).padStart(2,'0')).join('').toUpperCase();
}

export const LIGHT_SET: ThemeSet = {
  label: 'Light',
  boxes: [
    { bg: '#F9F9F9', text: '#1B1B1B' },
    { bg: '#E4E3E3', text: '#1B1B1B' }
  ],
  groups: [
    { label: 'Brand', colors: [{ name: 'Primary', hex: '#204384', cssVar: 'primary', hint: 'brand primary - live from --primary' }] },
    { label: 'Traffic lights', colors: [
      { name: 'Red', hex: '#EE1F25', hint: 'error / destructive' },
      { name: 'Yellow', hex: '#CFEC14', hint: 'alert / accent' },
      { name: 'Green', hex: '#218A38', hint: 'success' }
    ] },
    { label: 'Gray scale (5 steps)', colors: [
      { name: 'Step 1 - lightest', hex: '#F9F9F9', hint: 'background / card / popover (no pure white)' },
      { name: 'Step 2', hex: '#E4E3E3', hint: 'border / input / muted' },
      { name: 'Step 3', hex: '#919191', hint: 'disabled label / chart5' },
      { name: 'Step 4', hex: '#383838', hint: 'muted-foreground' },
      { name: 'Step 5 - darkest', hex: '#1B1B1B', hint: 'foreground' }
    ] }
  ]
};

export const DARK_SET: ThemeSet = {
  label: 'Dark',
  boxes: [
    { bg: '#1B1B1B', text: '#F9F9F9' },
    { bg: '#383838', text: '#F9F9F9' }
  ],
  groups: [
    { label: 'Brand', colors: [{ name: 'Primary', hex: '#6C8FCB', cssVar: 'primary', hint: 'brand primary - live from --primary' }] },
    { label: 'Traffic lights', colors: [
      { name: 'Red', hex: '#EE1F25', hint: 'error / destructive' },
      { name: 'Yellow', hex: '#CFEC14', hint: 'alert / accent' },
      { name: 'Green', hex: '#5BB86B', hint: 'success' }
    ] },
    { label: 'Gray scale (5 steps)', colors: [
      { name: 'Step 1 - lightest', hex: '#F9F9F9', hint: 'foreground' },
      { name: 'Step 2', hex: '#E4E3E3', hint: 'muted-foreground' },
      { name: 'Step 3', hex: '#919191', hint: 'intermediate step (added for scale completeness)' },
      { name: 'Step 4', hex: '#383838', hint: 'card / border / surface' },
      { name: 'Step 5 - darkest', hex: '#1B1B1B', hint: 'background' }
    ] }
  ]
};

function ColorTriple({ name, hex, hint, textColor, cssVar, hostBg }: { name: string; hex: string; hint?: string; textColor: string; cssVar?: string; hostBg?: string }) {
  const live = useLiveVar(cssVar);
  let baseHex = hex;
  if (cssVar && live) {
    const parsed = hslTripleToHex(live);
    if (parsed) baseHex = parsed;
  }
  const variants = [
    { label: 'Base', value: baseHex },
    { label: 'Lighter ' + HOVER_LAYER_ALPHA_LABEL, value: blendHex(baseHex, true) },
    { label: 'Darker ' + HOVER_LAYER_ALPHA_LABEL, value: blendHex(baseHex, false) }
  ];
  return (
    <div className="space-y-1.5">
      <p className={textColor + " text-xs font-medium"}>
        {name}
        {hint ? <span className="ml-2 text-[10px] opacity-60">{hint}</span> : null}
      </p>
      <div className="grid grid-cols-3 gap-2">
        {variants.map((variant) => (
          <div key={variant.label} className="space-y-1">
            <div className="relative h-9 rounded-md" style={{ backgroundColor: variant.value, boxShadow: 'inset 0 0 0 1px rgba(127, 127, 127, 0.35)' }}>
              {hostBg ? (
                (() => {
                  const ratio = contrastRatio(variant.value, hostBg);
                  const pass = ratio >= 3;
                  const ink = inkOn(variant.value);
                  const scrim = ink === '#1B1B1B' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.3)';
                  return (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span
                        className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold tabular-nums"
                        style={{ color: ink, backgroundColor: scrim }}
                        title={pass ? 'Contrasto WCAG superato (>= 3:1)' : 'Contrasto WCAG non superato (< 3:1)'}
                      >
                        {pass ? <Check className="size-3.5" /> : <X className="size-3.5" />}
                        {ratio.toFixed(2)}
                      </span>
                    </span>
                  );
                })()
              ) : null}
            </div>
            <p className={textColor + " text-[9px] leading-tight opacity-80"}>{variant.label}</p>
            <p className={textColor + " font-mono text-[10px]"}>{variant.value.toUpperCase()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ColorsPage() {
  const slot = useContext(SurfaceThemeContext);
  const set = slot.mode === 'dark' ? DARK_SET : LIGHT_SET;
  const textClass = slot.surface === 'base' ? 'text-foreground' : 'text-secondary-foreground';
  return (
    <div className="space-y-5">
      {/* The outer dual-layout container already provides this surface's background and label, so the groups render directly on it -- no nested box, no theme title. */}
      {set.groups.map((group) => (
        <section key={group.label} className="space-y-3">
          <h3 className={textClass + " text-xs font-semibold uppercase tracking-wide"}>{group.label}</h3>
          {group.colors.map((color) => (
            <ColorTriple
              key={color.name + ' ' + color.hex}
              name={color.name}
              hex={color.hex}
              cssVar={color.cssVar}
              hostBg={set.boxes[slot.surface === 'base' ? 0 : 1].bg}
              hint={color.hint}
              textColor={textClass}
            />
          ))}
        </section>
      ))}
    </div>
  );
}

/* rem string -> rounded px label (annotation only) */
const remToPx = (value: string) => Math.round(parseFloat(value.slice(0, -3)) * 16) + 'px';

export function FontsPage() {
  const styles = tokens.typographyStyles as unknown as Record<
    string,
    { fontFamily: string; fontWeight: number; fontSize: string; lineHeight: string; letterSpacing: string }
  >;
  const slot = useContext(SurfaceThemeContext);
  if (slot.part === 'dual') {
    // Top pair only: the typeface sample, once per background surface.
    return (
      <div className="space-y-8 p-6 text-card-foreground">
        <section>
          <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Typeface</h2>
          <p
            style={{
              fontFamily: "Roboto, Arial, sans-serif",
              fontWeight: 300,
              letterSpacing: "var(--letter-spacing-base)",
              fontSize: "4rem",
              lineHeight: "5rem",
            }}
          >
            The quick brown fox jumps over the lazy dog.
          </p>
          <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
            Roboto Light (weight 300) is the only face and weight of the original system. It is
            self-hosted from /fonts as a latin woff2 subset, tracked at +0.25px everywhere.
          </p>
        </section>
      </div>
    );
  }
  // Full-width single column below the pair: everything that doesn't need the alternate background.
  return (
    <div className="space-y-8 p-6 text-card-foreground">

      {/* The eight named styles */}
      <section className="space-y-4 border-t pt-6">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Text styles</h2>
        {Object.entries(styles).map(([name, s]) => (
          <div key={name} className="grid items-start gap-x-4 sm:grid-cols-[130px_1fr]">
            <span className="pt-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {name}
              <span className="ml-2 font-mono text-[10px] normal-case opacity-70">(
                {remToPx(s.fontSize)} /{' '}
                {remToPx(s.lineHeight)}
              )</span>
            </span>
            <p
              className="min-w-0"
              style={{
                fontFamily: s.fontFamily + ", Arial, sans-serif",
                fontWeight: s.fontWeight,
                fontSize: s.fontSize,
                lineHeight: s.lineHeight,
                letterSpacing: s.letterSpacing,
              }}
            >
              Build products people understand.
            </p>
          </div>
        ))}
      </section>

      {/* Raw scales, tables stacked */}
      <section className="space-y-6 border-t pt-6">
        <ScaleTable title="Font sizes" rows={Object.entries(tokens.fontSizes)} />
        <ScaleTable title="Line heights" rows={Object.entries(tokens.lineHeights)} />
      </section>

      {/* Canonical constants -- single column (base surface only) */}
      <section className="space-y-3 border-t pt-6">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">System constants</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <Constant label="Family" value="Roboto, Arial, sans-serif" />
          <Constant label="Weight" value="300 (Light) only" />
          <Constant label="Tracking" value="+0.25px on every style" />
        </div>
      </section>
    </div>
  );
}

function ScaleTable({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <div className="space-y-3">
      <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{title}</h2>
      <dl className="divide-y rounded-lg border">
        {rows.map(([name, value]) => (
          <div key={name} className="flex items-baseline justify-between gap-4 px-3 py-1.5">
            <dt className="font-mono text-xs">{name}</dt>
            <dd className="text-sm font-medium">
              {value}
              <span className="ml-2 font-mono text-[10px] opacity-70">(
                {remToPx(value)}
              )</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Constant({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border p-3">
      <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 font-mono text-xs">{value}</p>
    </div>
  );
}


export function TagsPage() {
  const states = [
    { variant: 'default', sample: 'New', fillRef: 'pella.sys.color.custom.light', hexes: '#204384 / #6C8FCB dark' },
    { variant: 'error', sample: 'Error 500', fillRef: 'semantic.error (red)', hexes: '#EE1F25 both themes' },
    { variant: 'alert', sample: 'Alert', fillRef: 'semantic.alert (yellow)', hexes: '#CFEC14 both themes' },
    { variant: 'ready', sample: 'Ready', fillRef: 'semantic.success (green)', hexes: '#218A38 / #5BB86B dark' },
    { variant: 'disabled', sample: 'Off', fillRef: 'custom.light + opacity.disabled', hexes: 'base fill at 32% opacity' }
  ] as const;

  const slot = useContext(SurfaceThemeContext);
  if (slot.part === 'dual') {
    // Top pair only: the live tag row, once per background surface.
    return (
      <div className="space-y-8 p-6 text-card-foreground">
        <section className="space-y-3">
          <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Variants</h2>
          <div className="flex flex-wrap items-center gap-3">
            {states.map((s) => (
              <Tag key={s.variant} variant={s.variant}>{s.sample}</Tag>
            ))}
          </div>
        </section>
      </div>
    );
  }
  // Full-width single column below the pair.
  return (
    <div className="space-y-8 p-6 text-card-foreground">

      {/* Evidence table */}
      <section className="space-y-3">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Composition (tags.json)</h2>
        {states.map((s) => (
          <div key={s.variant} className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-lg border p-3">
            <Tag variant={s.variant}>{s.sample}</Tag>
            <code className="text-[11px] opacity-80">{s.fillRef}</code>
            <span className="font-mono text-[11px] opacity-70">{s.hexes}</span>
          </div>
        ))}
      </section>

      {/* System mapping */}
      <section className="space-y-3 border-t pt-6">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">System mapping</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Constant label="Corner radius" value="--radius-sm = 0.25rem (sss - the same canonical value as fields, checkboxes and tooltips)" />
          <Constant label="Label typography" value="caption style - Roboto Light 300, 12px / 16px line / 0.25px tracking" />
          <Constant label="Container padding" value="horizontal sss only (0 {sss}) per the pill composition convention; tags.json exports no inner spacing" />
        </div>
      </section>

    </div>
  );
}
export function LayoutPage() {
  const radii = [
    { name: 'sm', value: tokens.radiusSm },
    { name: 'md', value: tokens.radiusMd },
    { name: 'lg (base)', value: tokens.radius },
  ];
  const slot = useContext(SurfaceThemeContext);
  if (slot.part === 'dual') {
    // Top pair only: the corner radii, once per background surface.
    return (
      <div className="space-y-8 p-6 text-card-foreground">
        <section className="space-y-4">
          <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Corner radii</h2>
          <p className="max-w-3xl text-sm text-muted-foreground">
            Three canonical corner treatments. Buttons and inputs use the large radius; chips, tags
            and badges step down to sm.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {radii.map((r) => (
              <div key={r.name} className="space-y-2">
                <div
                  className="flex h-20 items-end border bg-muted p-3"
                  style={{ borderRadius: r.value }}
                >
                  <span className="text-xs font-medium">{r.name}</span>
                </div>
                <p className="font-mono text-[11px] opacity-70">
                  {r.value} ({remToPx(r.value)})
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }
  // Full-width single column below the pair.
  return (
    <div className="space-y-8 p-6 text-card-foreground">

      {/* Dimensions */}
      <section>
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Dimensions</h2>
        <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
          The full dimension scale from the original tokens: component heights, widths and paddings,
          referenced verbatim by name in every component definition.
        </p>
        <div className="mt-4">
          <ScaleTable title="Core dimensions" rows={Object.entries(tokens.dimensions)} />
        </div>
      </section>

      {/* Spacing presets */}
      <section className="space-y-4 border-t pt-6">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Spacing</h2>
        <p className="max-w-3xl text-sm text-muted-foreground">
          Base spacing and the named presets (including compound ones like textAndIcon) that
          components reference instead of raw values.
        </p>
        <ScaleTable title="Spacing" rows={Object.entries(tokens.spacingPresets)} />
      </section>
    </div>
  );
}

export function ShadowsPage() {
  const slot = useContext(SurfaceThemeContext);
  if (slot.part === 'dual') {
    // Top pair only: the live elevation samples, once per background surface.
    return (
      <div className="space-y-8 p-6 text-card-foreground">
        <section className="space-y-4">
          <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Shadows</h2>
          <p className="max-w-3xl text-sm text-muted-foreground">
            The six original elevation recipes: one per interaction surface. Note the trigger halo
            (pure spread, no blur) and the dots inner shadow.
          </p>
          {Object.entries(tokens.shadows).map(([name, css]) => (
            <div key={name} className="space-y-1">
              <div
                className="flex h-14 items-center justify-center rounded-lg border bg-card"
                style={{ boxShadow: css }}
              >
                <span className="text-xs font-medium">{name}</span>
              </div>
              <p className="break-all font-mono text-[10px] opacity-70">{css}</p>
            </div>
          ))}
        </section>

        {/* Scrim over a sample surface with content underneath */}
        <section className="space-y-4 border-t pt-6">
          <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Scrim</h2>
          <p className="max-w-3xl text-sm text-muted-foreground">
            The modal backdrop layer: black at 80% opacity, theme-independent. Shown here over a
            sample surface so the content underneath stays visible but dimmed.
          </p>
          <div className="relative h-24 overflow-hidden rounded-lg border bg-card">
            <div className="flex h-full items-center justify-center gap-3 p-6">
              <Button size="small">Primary action</Button>
              <span className="text-sm text-muted-foreground">Content behind the scrim</span>
            </div>
            <div className="absolute inset-0" style={{ background: 'var(--overlay-scrim)' }} />
          </div>
        </section>
      </div>
    );
  }
  // Full-width single column below the pair.
  return (
    <div className="space-y-8 p-6 text-card-foreground">

      {/* Shadow recipes - data */}
      <section className="space-y-3">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Shadow recipes</h2>
        <dl className="divide-y rounded-lg border">
          {Object.entries(tokens.shadows).map(([name, css]) => (
            <div key={name} className="flex items-baseline justify-between gap-4 px-3 py-1.5">
              <dt className="font-mono text-xs">{name}</dt>
              <dd className="break-all text-right font-mono text-[11px]">{css}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Scrim - data */}
      <section className="space-y-3 border-t pt-6">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Scrim</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Constant label="overlay.scrim" value={tokens.overlays.scrim} />
          <Constant label="Consumers" value="dialog / drawer / sheet / alert-dialog backdrops (bg-scrim)" />
        </div>
      </section>
    </div>
  );
}