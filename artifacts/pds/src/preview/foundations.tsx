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
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';

const CORE_SWATCHES = [
  { name: 'Primary', className: 'bg-primary' },
  { name: 'Secondary', className: 'bg-secondary' },
  { name: 'Accent', className: 'bg-accent' },
] as const;


const TYPE_SCALE = [
  { label: 'Display', className: 'text-4xl font-bold' },
  { label: 'Heading', className: 'text-2xl font-semibold' },
  { label: 'Body', className: 'text-base' },
  { label: 'Label', className: 'text-sm font-medium' },
  { label: 'Caption', className: 'text-sm text-muted-foreground' },
] as const;

const SPACING_SCALE = [
  { label: '4', className: 'w-4' },
  { label: '8', className: 'w-8' },
  { label: '12', className: 'w-12' },
  { label: '16', className: 'w-16' },
  { label: '24', className: 'w-24' },
] as const;

function Swatch({
  name,
  className,
}: {
  name: string;
  className: string;
}) {
  return (
    <div className="space-y-2">
      <div className={`h-16 rounded-lg ${className}`} />
      <p className="text-sm font-medium">{name}</p>
    </div>
  );
}

export function OverviewPage() {
  return (
    <div className="space-y-4">
      <section className="rounded-xl border bg-card p-5 text-card-foreground">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Core palette
        </h2>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {CORE_SWATCHES.map((swatch) => (
            <Swatch key={swatch.name} {...swatch} />
          ))}
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border bg-card p-5 text-card-foreground">
          <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Typography
          </h2>
          <div className="mt-4 space-y-3">
            {TYPE_SCALE.map((entry) => (
              <p key={entry.label} className={entry.className}>
                {entry.label}
              </p>
            ))}
          </div>
        </section>

        <section className="rounded-xl border bg-card p-5 text-card-foreground">
          <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            In use
          </h2>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Create workspace</CardTitle>
              <CardDescription>
                Components composed from the tokens above.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="overview-name">Workspace name</Label>
                <Input id="overview-name" placeholder="Enter a name" />
              </div>
              <div className="flex items-center gap-2">
                <Switch defaultChecked id="overview-notify" />
                <Label htmlFor="overview-notify">Email notifications</Label>
                <Badge className="ml-auto">New</Badge>
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button>Save</Button>
              <Button variant="outline">Cancel</Button>
            </CardFooter>
          </Card>
        </section>
      </div>

      <section className="space-y-4 rounded-xl border bg-card p-5 text-card-foreground">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Components
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Badge>Badge</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </section>
    </div>
  );
}

// Global color inventory for both themes. Values are sourced 1:1 from artifacts/pds/tokens.json.
type GlobalColor = { name: string; hex: string; hint?: string };
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

const LIGHT_SET: ThemeSet = {
  label: 'Light',
  boxes: [
    { bg: '#F9F9F9', text: '#1B1B1B' },
    { bg: '#FFFFFF', text: '#1B1B1B' }
  ],
  groups: [
    { label: 'Brand', colors: [{ name: 'Primary', hex: '#204384', hint: 'brand primary' }] },
    { label: 'Traffic lights', colors: [
      { name: 'Red', hex: '#EE1F25', hint: 'error / destructive' },
      { name: 'Yellow', hex: '#CFEC14', hint: 'alert / accent' },
      { name: 'Green', hex: '#218A38', hint: 'success' }
    ] },
    { label: 'Gray scale (5 steps)', colors: [
      { name: 'Step 1 - lightest', hex: '#FFFFFF', hint: 'card / popover' },
      { name: 'Step 2', hex: '#F9F9F9', hint: 'background' },
      { name: 'Step 3', hex: '#E4E3E3', hint: 'border / input / muted' },
      { name: 'Step 4', hex: '#383838', hint: 'muted-foreground' },
      { name: 'Step 5 - darkest', hex: '#1B1B1B', hint: 'foreground' }
    ] }
  ]
};

const DARK_SET: ThemeSet = {
  label: 'Dark',
  boxes: [
    { bg: '#1B1B1B', text: '#F9F9F9' },
    { bg: '#383838', text: '#F9F9F9' }
  ],
  groups: [
    { label: 'Brand', colors: [{ name: 'Primary', hex: '#6C8FCB', hint: 'brand primary' }] },
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

function ColorTriple({ name, hex, hint, textColor }: { name: string; hex: string; hint?: string; textColor: string }) {
  const variants = [
    { label: 'Base', value: hex },
    { label: 'Lighter ' + HOVER_LAYER_ALPHA_LABEL, value: blendHex(hex, true) },
    { label: 'Darker ' + HOVER_LAYER_ALPHA_LABEL, value: blendHex(hex, false) }
  ];
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-medium" style={{ color: textColor }}>
        {name}
        {hint ? <span className="ml-2 text-[10px] opacity-60">{hint}</span> : null}
      </p>
      <div className="grid grid-cols-3 gap-2">
        {variants.map((variant) => (
          <div key={variant.label} className="space-y-1">
            <div className="h-9 rounded-md" style={{ backgroundColor: variant.value, boxShadow: 'inset 0 0 0 1px rgba(127, 127, 127, 0.35)' }} />
            <p className="text-[9px] leading-tight opacity-80" style={{ color: textColor }}>{variant.label}</p>
            <p className="font-mono text-[10px]" style={{ color: textColor }}>{variant.value.toUpperCase()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function GlobalColorSection({ set }: { set: ThemeSet }) {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{set.label} theme</h2>
      <div className="grid gap-4 lg:grid-cols-2">
        {set.boxes.map((box) => (
          <div key={box.bg} className="rounded-xl border p-5" style={{ backgroundColor: box.bg }}>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-wide opacity-60" style={{ color: box.text }}>{box.bg}</p>
            <div className="space-y-5">
              {set.groups.map((group) => (
                <div key={group.label} className="space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wide" style={{ color: box.text }}>{group.label}</h3>
                  {group.colors.map((color) => (
                    <ColorTriple
                      key={color.name + ' ' + color.hex}
                      name={color.name}
                      hex={color.hex}
                      hint={color.hint}
                      textColor={box.text}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ColorsPage() {
  return (
    <div className="space-y-8 rounded-xl border bg-card p-6 text-card-foreground">
      <section>
        <h2 className="font-semibold">Global colors</h2>
        <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
          Every base color of the system for each theme: brand primary, traffic lights (red - error,
          yellow - alert, green - success), and the five-step gray scale. Each value lists its lighter
          and darker variants derived with a transparent layer at 32% over the base color - white to
          lighten, black to darken. That is how interactive states such as hover shift each base value
          instead of switching to fixed colors.
        </p>
      </section>
      <GlobalColorSection set={LIGHT_SET} />
      <GlobalColorSection set={DARK_SET} />
    </div>
  );
}

export function FontsPage() {
  return (
    <div className="space-y-8 rounded-xl border bg-card p-6 text-card-foreground">
      <section>
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Font family
        </h2>
        <p className="mt-4 text-4xl font-bold">The quick brown fox</p>
        <p className="mt-2 text-sm text-muted-foreground">
          The token font family is applied across this entire preview.
        </p>
      </section>

      <section className="space-y-4 border-t pt-6">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Type scale
        </h2>
        {TYPE_SCALE.map((entry) => (
          <div key={entry.label} className="grid gap-2 sm:grid-cols-[88px_1fr]">
            <span className="pt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {entry.label}
            </span>
            <p className={entry.className}>Build products people understand.</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export function LayoutPage() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="rounded-xl border bg-card p-6 text-card-foreground">
        <h2 className="font-semibold">Spacing</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          The spacing scale, derived from the base spacing token.
        </p>
        <div className="mt-6 space-y-4">
          {SPACING_SCALE.map((space) => (
            <div key={space.label} className="flex items-center gap-4">
              <span className="w-8 text-xs text-muted-foreground">
                {space.label}
              </span>
              <div className={`h-3 rounded-full bg-primary ${space.className}`} />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border bg-card p-6 text-card-foreground">
        <h2 className="font-semibold">Radius</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Corner treatments derive from the base radius token.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4">
          {[
            { label: 'Small', className: 'rounded-sm' },
            { label: 'Medium', className: 'rounded-md' },
            { label: 'Large', className: 'rounded-lg' },
            { label: 'Extra large', className: 'rounded-xl' },
          ].map((radius) => (
            <div
              key={radius.label}
              className={`flex h-24 items-end border bg-muted p-3 ${radius.className}`}
            >
              <span className="text-xs font-medium">{radius.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
