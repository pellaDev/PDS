import { useContext, useState } from 'react';

import { Pencil, Sparkles, Check, X } from 'lucide-react';

import { SurfaceThemeContext } from './parts';
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
import { Checkbox } from '../components/ui/checkbox';
import { Radio } from '../components/ui/radio';
import { Slider } from '../components/ui/slider';
import { tokens } from '../generated/tokens';
import { Tag, TagToggle } from '../components/ui/tag';
import { hslTripleToHex, useLiveVar, contrastRatio, inkOn } from './liveColor';
import {
  ChevronLeft,
  MoreHorizontal,
  Search,
  Bell,
  Wifi,
  ShieldCheck,
  ChevronRight,
  Signal,
  BatteryFull,
  FileText,
} from 'lucide-react';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from '../components/ui/item';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { ToggleGroup, ToggleGroupItem } from '../components/ui/toggle-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export function OverviewPage() {
  const slot = useContext(SurfaceThemeContext);
  // The nested "Create workspace" card MATCHES its host surface: on the base (white) column it is
  // built from the primary set, on the alternate (gray) column from the alternative set. This keeps
  // each column's "Workspace name" field native to that background (was inverted before). The real
  // components inside keep their own token-driven styling.
  const primarySetCard = slot.surface === 'base';
  const switchId = 'overview-notify-' + slot.surface;
  const visId = 'overview-vis-' + slot.surface;
  return (
    <div className="space-y-4">
      {/* The actual components in use, composed on this surface */}
      <div className="flex flex-wrap items-center gap-3">
        <Button size="mini">
          <Pencil />
        </Button>
        <Button size="small">Small</Button>
        <Button size="special">
          <Sparkles />
          Special
        </Button>
        <Button variant="link">Link</Button>
      </div>

      <Card
        className={
          primarySetCard
            ? 'bg-background text-foreground shadow-none'
            : 'bg-secondary text-secondary-foreground shadow-none'
        }
      >
        <CardHeader>
          <CardTitle className="[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground">
            DESKTOP
          </CardTitle>
          <CardDescription>
            {primarySetCard
              ? 'Primary-set composition on the base surface.'
              : 'Alternative-set composition on the alternate surface.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Field size="sm" label="Workspace name" className="w-full max-w-60" />

          {/* Tags - DS Tag component */}
          <div className="flex flex-wrap items-center gap-2">
            <Tag variant="default">Team</Tag>
            <Tag variant="ready">Active</Tag>
            <Tag variant="disabled">Archived</Tag>
          </div>

          {/* Checkboxes - DS Checkbox */}
          <div className="flex flex-col gap-2">
            <Checkbox label="Public workspace" />
            <Checkbox defaultChecked label="Enable analytics" />
          </div>

          {/* Radio group - DS Radio (shared name, per surface) */}
          <div className="flex flex-col gap-2">
            <Radio name={visId} defaultChecked label="Private" value="private" />
            <Radio name={visId} label="Internal" value="internal" />
          </div>

          {/* Slider - DS Slider */}
          <div className="space-y-1.5">
            <Label>Max members</Label>
            <Slider defaultValue={[50]} max={200} step={10} />
          </div>

          <div className="flex items-center gap-2">
            <Switch defaultChecked id={switchId} />
            <Label htmlFor={switchId}>Email notifications</Label>
          </div>

          {/* Tabs - PDS Tabs (default size) with dummy content in the desktop zone */}
          <Tabs defaultValue="a" className="w-full">
            <TabsList>
              <TabsTrigger value="a">General</TabsTrigger>
              <TabsTrigger value="b">Members</TabsTrigger>
            </TabsList>
            <TabsContent value="a">
              <p className="[font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light text-muted-foreground">
                General settings placeholder.
              </p>
            </TabsContent>
            <TabsContent value="b">
              <p className="[font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light text-muted-foreground">
                Members list placeholder.
              </p>
            </TabsContent>
          </Tabs>

          {/* List - DS Item/ItemGroup; desktop rows reveal mini-button actions on hover */}
          <div className="overflow-hidden rounded-lg border">
            <ItemGroup>
              <Item size="sm" className="relative min-h-8 rounded-none border-0 py-1">
                <ItemMedia variant="icon" className="size-6 border-0 bg-transparent">
                  <FileText />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Product brief</ItemTitle>
                  <ItemDescription>Goals, customer context, launch requirements.</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Tag variant="ready">Draft</Tag>
                </ItemActions>
                {/* hover action bar — overlays ON TOP of the row's static content (not beside it).
                    Flat opaque fill (the column surface tone), never translucent: no bleed-through. */}
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center gap-1 rounded-r-md bg-[var(--pds-surface-bg)] px-3 opacity-0 transition-opacity group-hover/item:pointer-events-auto group-hover/item:opacity-100">
                  <Button size="mini" aria-label="Edit">
                    <Pencil />
                  </Button>
                  <Button size="mini" aria-label="More actions">
                    <MoreHorizontal />
                  </Button>
                </span>
              </Item>
              <ItemSeparator />
              <Item size="sm" className="relative min-h-8 rounded-none border-0 py-1">
                <ItemMedia variant="icon" className="size-6 border-0 bg-transparent">
                  <Bell />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Notifications</ItemTitle>
                </ItemContent>
                <ItemActions>
                  <Tag>3 new</Tag>
                </ItemActions>
                {/* hover action bar — overlays ON TOP of the row's static content (not beside it).
                    Flat opaque fill (the column surface tone), never translucent: no bleed-through. */}
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center gap-1 rounded-r-md bg-[var(--pds-surface-bg)] px-3 opacity-0 transition-opacity group-hover/item:pointer-events-auto group-hover/item:opacity-100">
                  <Button size="mini" aria-label="More actions">
                    <MoreHorizontal />
                  </Button>
                </span>
              </Item>
            </ItemGroup>
          </div>
        </CardContent>
        <CardFooter className="gap-2">
          <Button>Save</Button>
          <Button variant="link">Cancel</Button>
        </CardFooter>
      </Card>

      {/* Mobile — a simulated device UI composed only from touch-friendly PDS primitives.
          Renders in both columns (base + alternate surface). The list rows reuse the Item/ItemGroup
          primitive, which composes other primitives inside its slots (Avatar, Tag, mini Buttons). */}
      <div className="space-y-2 rounded-lg p-3">
        <div className="[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground">
          Mobile
        </div>

        <div
          data-pds-surface={primarySetCard ? 'base' : 'alternate'}
          className={
            'mx-auto w-full max-w-[280px] overflow-hidden rounded-[2rem] border ' +
            (primarySetCard ? 'bg-background' : 'bg-secondary') +
            ' shadow-sm'
          }
        >
          {/* device chrome: status bar */}
          <div className="flex items-center justify-between px-5 py-2 [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light">
            <span>9:41</span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Signal className="size-3" />
              <Wifi className="size-3.5" />
              <BatteryFull className="size-4" />
            </span>
          </div>

          {/* screen */}
          <div className="space-y-3 px-3 pb-4">
            {/* 1. header */}
            <div className="flex items-center gap-2 pt-1">
              <Button variant="link" size="icon" aria-label="Back">
                <ChevronLeft />
              </Button>
              <span className="flex-1 [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light">
                Settings
              </span>
              <Button variant="link" size="icon" aria-label="More options">
                <MoreHorizontal />
              </Button>
            </div>

            {/* 2. search (large field) */}
            <Field size="lg" label="Search" trailingIcon={<Search className="size-4" />} />

            {/* 3. segmented control */}
            <ToggleGroup type="single" defaultValue="today" className="w-full justify-between">
              <ToggleGroupItem value="today" className="flex-1">
                Today
              </ToggleGroupItem>
              <ToggleGroupItem value="week" className="flex-1">
                Week
              </ToggleGroupItem>
              <ToggleGroupItem value="month" className="flex-1">
                Month
              </ToggleGroupItem>
            </ToggleGroup>

            {/* 4. list — Item/ItemGroup composing Avatar, Tag and mini Buttons inside items */}
            <div className="overflow-hidden rounded-xl border">
              <ItemGroup>
                <Item size="sm">
                  <ItemMedia>
                    <Avatar className="size-8">
                      <AvatarFallback className="[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light">
                        PS
                      </AvatarFallback>
                    </Avatar>
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Account</ItemTitle>
                    <ItemDescription>Profile &amp; security</ItemDescription>
                  </ItemContent>
                </Item>
                <ItemSeparator />
                <Item size="sm">
                  <ItemMedia variant="icon">
                    <Bell />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Notifications</ItemTitle>
                  </ItemContent>
                  <ItemActions>
                    <Tag variant="ready">On</Tag>
                  </ItemActions>
                </Item>
                <ItemSeparator />
                <Item size="sm">
                  <ItemMedia variant="icon">
                    <Wifi />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Wi-Fi</ItemTitle>
                  </ItemContent>
                  <ItemActions>
                    <Switch defaultChecked aria-label="Wi-Fi" />
                  </ItemActions>
                </Item>
                <ItemSeparator />
                <Item size="sm">
                  <ItemMedia variant="icon">
                    <ShieldCheck />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Privacy</ItemTitle>
                  </ItemContent>
                  <ItemActions>
                    <Button variant="link" size="mini" aria-label="Open privacy">
                      <ChevronRight />
                    </Button>
                  </ItemActions>
                </Item>
              </ItemGroup>
            </div>

            {/* tabs (mobile) — real Tabs primitive at mobile touch size, splitting settings detail */}
            <div className="space-y-1">
              <Tabs defaultValue="general" className="w-full">
                <TabsList size="mobile">
                  <TabsTrigger size="mobile" value="general">
                    General
                  </TabsTrigger>
                  <TabsTrigger size="mobile" value="privacy">
                    Privacy
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="general"
                  className="rounded-md border p-3 [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light"
                >
                  Profile, appearance and app preferences.
                </TabsContent>
                <TabsContent
                  value="privacy"
                  className="rounded-md border p-3 [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light"
                >
                  Permissions, data and account safety.
                </TabsContent>
              </Tabs>
            </div>

            {/* 5. slider (shows the corrected primary fill) */}
            <div className="space-y-1 px-0.5">
              <Label className="[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground">
                Brightness
              </Label>
              <Slider defaultValue={[70]} max={100} step={5} />
            </div>

            {/* 6/7. large field already above; sticky large CTA */}
            <Button size="large" className="w-full">
              Continue
            </Button>
          </div>
        </div>
      </div>
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
  return (
    '#' +
    channels
      .map((c: number) =>
        Math.round(c * 0.68 + (towardWhite ? 255 : 0) * 0.32)
          .toString(16)
          .padStart(2, '0'),
      )
      .join('')
      .toUpperCase()
  );
}

export const LIGHT_SET: ThemeSet = {
  label: 'Light',
  boxes: [
    { bg: '#F9F9F9', text: '#1B1B1B' },
    { bg: '#E4E3E3', text: '#1B1B1B' },
  ],
  groups: [
    {
      label: 'Brand',
      colors: [
        {
          name: 'Primary',
          hex: '#204384',
          cssVar: 'primary',
          hint: 'brand primary - live from --primary',
        },
      ],
    },
    {
      label: 'Traffic lights',
      colors: [
        { name: 'Red', hex: '#EE1F25', hint: 'error / destructive' },
        { name: 'Yellow', hex: '#CFEC14', hint: 'alert / accent' },
        { name: 'Green', hex: '#218A38', hint: 'success' },
      ],
    },
    {
      label: 'Gray scale (5 steps)',
      colors: [
        {
          name: 'Step 1 - lightest',
          hex: '#F9F9F9',
          hint: 'background / card / popover (no pure white)',
        },
        { name: 'Step 2', hex: '#E4E3E3', hint: 'border / input / muted' },
        { name: 'Step 3', hex: '#919191', hint: 'disabled label / chart5' },
        { name: 'Step 4', hex: '#383838', hint: 'muted-foreground' },
        { name: 'Step 5 - darkest', hex: '#1B1B1B', hint: 'foreground' },
      ],
    },
  ],
};

export const DARK_SET: ThemeSet = {
  label: 'Dark',
  boxes: [
    { bg: '#383838', text: '#F9F9F9' },
    { bg: '#1B1B1B', text: '#F9F9F9' },
  ],
  groups: [
    {
      label: 'Brand',
      colors: [
        {
          name: 'Primary',
          hex: '#6C8FCB',
          cssVar: 'primary',
          hint: 'brand primary - live from --primary',
        },
      ],
    },
    {
      label: 'Traffic lights',
      colors: [
        { name: 'Red', hex: '#EE1F25', hint: 'error / destructive' },
        { name: 'Yellow', hex: '#CFEC14', hint: 'alert / accent' },
        { name: 'Green', hex: '#5BB86B', hint: 'success' },
      ],
    },
    {
      label: 'Gray scale (5 steps)',
      colors: [
        { name: 'Step 1 - lightest', hex: '#F9F9F9', hint: 'foreground' },
        { name: 'Step 2', hex: '#E4E3E3', hint: 'muted-foreground' },
        {
          name: 'Step 3',
          hex: '#919191',
          hint: 'intermediate step (added for scale completeness)',
        },
        { name: 'Step 4', hex: '#383838', hint: 'background / sidebar (page canvas)' },
        {
          name: 'Step 5 - darkest',
          hex: '#1B1B1B',
          hint: 'card / secondary / input (recessed panels)',
        },
      ],
    },
  ],
};

function ColorTriple({
  name,
  hex,
  hint,
  textColor,
  cssVar,
  hostBg,
}: {
  name: string;
  hex: string;
  hint?: string;
  textColor: string;
  cssVar?: string;
  hostBg?: string;
}) {
  const live = useLiveVar(cssVar);
  let baseHex = hex;
  if (cssVar && live) {
    const parsed = hslTripleToHex(live);
    if (parsed) baseHex = parsed;
  }
  const variants = [
    { label: 'Base', value: baseHex },
    { label: 'Lighter ' + HOVER_LAYER_ALPHA_LABEL, value: blendHex(baseHex, true) },
    { label: 'Darker ' + HOVER_LAYER_ALPHA_LABEL, value: blendHex(baseHex, false) },
  ];
  return (
    <div className="space-y-1.5">
      <p
        className={
          textColor +
          ' [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light'
        }
      >
        {name}
        {hint ? (
          <span className="ml-2 [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light opacity-60">
            {hint}
          </span>
        ) : null}
      </p>
      <div className="grid grid-cols-3 gap-2">
        {variants.map((variant) => (
          <div key={variant.label} className="space-y-1">
            <div
              className="relative h-9 rounded-md"
              style={{
                backgroundColor: variant.value,
                boxShadow: 'inset 0 0 0 1px rgba(127, 127, 127, 0.35)',
              }}
            >
              {hostBg
                ? (() => {
                    const ratio = contrastRatio(variant.value, hostBg);
                    const pass = ratio >= 3;
                    const ink = inkOn(variant.value);
                    const scrim = ink === '#1B1B1B' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.3)';
                    return (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span
                          className="flex items-center gap-1 rounded-full px-2 py-0.5 [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light tabular-nums"
                          style={{ color: ink, backgroundColor: scrim }}
                          title={
                            pass
                              ? 'Contrasto WCAG superato (>= 3:1)'
                              : 'Contrasto WCAG non superato (< 3:1)'
                          }
                        >
                          {pass ? <Check className="size-3.5" /> : <X className="size-3.5" />}
                          {ratio.toFixed(2)}
                        </span>
                      </span>
                    );
                  })()
                : null}
            </div>
            <p
              className={
                textColor +
                ' [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light opacity-80'
              }
            >
              {variant.label}
            </p>
            <p
              className={
                textColor +
                ' font-mono [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light'
              }
            >
              {variant.value.toUpperCase()}
            </p>
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
          <h3
            className={
              textClass +
              ' [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light'
            }
          >
            {group.label}
          </h3>
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

export function TextStylesPage() {
  const styles = tokens.typographyStyles as unknown as Record<
    string,
    {
      fontFamily: string;
      fontWeight: number;
      fontSize: string;
      lineHeight: string;
      letterSpacing: string;
    }
  >;
  const slot = useContext(SurfaceThemeContext);
  if (slot.part === 'dual') {
    // Top pair only: the typeface sample, once per background surface.
    return (
      <div className="space-y-8 p-6 text-card-foreground">
        <section>
          <h2 className="[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground">
            Typeface
          </h2>
          <p
            style={{
              fontFamily: 'Roboto, Arial, sans-serif',
              fontWeight: 300,
              letterSpacing: 'var(--letter-spacing-base)',
              fontSize: 'var(--type-h1-size)',
              lineHeight: 'var(--type-h1-lh)',
            }}
          >
            The quick brown fox jumps over the lazy dog.
          </p>
          <p className="mt-3 max-w-3xl [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light text-muted-foreground">
            Roboto Light (300) is the base face of every text style; emphasis uses Medium (500).
            Both are self-hosted from /fonts as latin woff2 subsets, tracked at +0.25px on every
            style.
          </p>
        </section>
      </div>
    );
  }
  // Full-width single column below the pair: everything that doesn't need the alternate background.
  return (
    <div className="space-y-8 p-6 text-card-foreground">
      {/* How the structure works */}
      <section className="space-y-3">
        <h2 className="[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground">
          How it works
        </h2>
        <p className="max-w-3xl [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light text-muted-foreground">
          A text style is one named, complete type definition — family, size, line height, tracking
          and weight together under a single name. Components never set font sizes ad hoc: they
          reference a named style, so the same name always means the same type everywhere in the
          product.
        </p>
        <p className="max-w-3xl [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light text-muted-foreground">
          Every base style sits on Light (300). Emphasis — labels, pressed and selected states —
          uses Medium (500), the system's single emphasis weight, shared by all three installable
          families.
        </p>
      </section>

      {/* The eight named styles */}
      <section className="space-y-4 border-t pt-6">
        <h2 className="[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground">
          Text styles
        </h2>
        {Object.entries(styles).map(([name, s]) => (
          <div key={name} className="grid items-start gap-x-4 sm:grid-cols-[130px_1fr]">
            <span className="pt-1.5 [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground">
              {name}
              <span className="ml-2 font-mono [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light normal-case opacity-70">
                ({remToPx(s.fontSize)} / {remToPx(s.lineHeight)} · {s.fontWeight})
              </span>
            </span>
            <p
              className={
                name === 'h1' || name === 'h2' ? 'min-w-0 [color:var(--color-primary)]' : 'min-w-0'
              }
              style={{
                fontFamily: s.fontFamily + ', Arial, sans-serif',
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
        <h2 className="[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground">
          System constants
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <Constant label="Family" value="Roboto, Arial, sans-serif" />
          <Constant label="Weights" value="300 base · 500 emphasis" />
          <Constant label="Tracking" value="+0.25px on every style" />
        </div>
      </section>
    </div>
  );
}

export function FamiliesPage() {
  const families = [
    {
      name: 'Roboto',
      weights: '300 · 500',
      note: 'Base family. Light (300) for all base text, Medium (500) for emphasis.',
    },
    {
      name: 'Inter',
      weights: '300 · 400 · 500',
      note: 'Alternative install face, with an extra regular (400).',
    },
    {
      name: 'Space Grotesk',
      weights: '300 · 400 · 500',
      note: 'Alternative install face, with an extra regular (400).',
    },
  ];
  return (
    <div className="space-y-8 p-6 text-card-foreground">
      <section className="space-y-3">
        <h2 className="[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground">
          Families &amp; weights
        </h2>
        <p className="max-w-3xl [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light text-muted-foreground">
          Three families are installable. The choice is made once, at install time, from the same
          fontOptions tokens that drive this page; every face ships self-hosted latin woff2 subsets,
          so no web-font requests happen at runtime.
        </p>
      </section>

      <section className="space-y-6 border-t pt-6">
        {families.map((f) => (
          <div key={f.name} className="grid items-start gap-x-4 sm:grid-cols-[130px_1fr]">
            <span className="pt-1.5 [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground">
              {f.name}
              <span className="ml-2 font-mono [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light normal-case opacity-70">
                ({f.weights})
              </span>
            </span>
            <div className="min-w-0 space-y-1">
              <p
                style={{
                  fontFamily: f.name + ', Arial, sans-serif',
                  fontWeight: 300,
                  fontSize: 'var(--type-h3-size)',
                  lineHeight: 'var(--type-h3-lh)',
                  letterSpacing: '0.25px',
                }}
              >
                The quick brown fox jumps over the lazy dog.
              </p>
              <p
                style={{
                  fontFamily: f.name + ', Arial, sans-serif',
                  fontWeight: 500,
                  fontSize: 'var(--type-h3-size)',
                  lineHeight: 'var(--type-h3-lh)',
                  letterSpacing: '0.25px',
                }}
              >
                The quick brown fox jumps over the lazy dog.
              </p>
              <p className="[font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light text-muted-foreground">
                {f.note}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Weight model */}
      <section className="space-y-3 border-t pt-6">
        <h2 className="[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground">
          Weight model
        </h2>
        <p className="max-w-3xl [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light text-muted-foreground">
          Font weight is not a global flag — each text style carries its own weight in the token
          definition, and emphasis is expressed by picking the right style or applying the emphasis
          weight to an inline fragment. The system's emphasis weight is Medium (500): every
          installable family ships it, while no family ships 700, so nothing falls back to
          faux-bold.
        </p>
      </section>
    </div>
  );
}

function ScaleTable({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <div className="space-y-3">
      <h2 className="[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground">
        {title}
      </h2>
      <dl className="divide-y rounded-lg border">
        {rows.map(([name, value]) => (
          <div key={name} className="flex items-baseline justify-between gap-4 px-3 py-1.5">
            <dt className="font-mono [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light">
              {name}
            </dt>
            <dd className="[font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light">
              {value}
              <span className="ml-2 font-mono [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light opacity-70">
                ({remToPx(value)})
              </span>
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
      <p className="[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 font-mono [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light">
        {value}
      </p>
    </div>
  );
}

// Self-contained tag-input editor demo. Renders the SAME live editor in one of two
// container styles so both are visible side by side: OUTLINE (bordered) or FILL
// (solid muted surface, no border). Each instance owns its own state.
function TagInputDemo({ filled = false }: { filled?: boolean }) {
  const [tags, setTags] = useState<string[]>(['Team', 'Design']);
  const [draft, setDraft] = useState('');
  const add = () => {
    const v = draft.trim().replace(/,$/, '');
    if (v && !tags.includes(v)) setTags((c) => [...c, v]);
    setDraft('');
  };
  const remove = (t: string) => setTags((c) => c.filter((x) => x !== t));
  return (
    <div
      className={
        'flex min-h-[2.75rem] flex-wrap items-center gap-2 rounded-lg p-2 ' +
        (filled ? '[background-color:var(--pds-field-fill-bg)]' : 'border')
      }
    >
      {tags.map((t) => (
        <Tag key={t} variant="default" onDismiss={() => remove(t)}>
          {t}
        </Tag>
      ))}
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            add();
          } else if (e.key === 'Backspace' && draft === '') setTags((c) => c.slice(0, -1));
        }}
        placeholder={tags.length ? '' : 'Add a tag…'}
        aria-label="Add a tag"
        className="min-w-[6rem] flex-1 bg-transparent [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}

const TAG_SEED: string[] = ['Team', 'Billing', 'Admin'];

export function TagsPage() {
  const [demoTags, setDemoTags] = useState<string[]>(TAG_SEED);
  const removeTag = (t: string) => setDemoTags((cur) => cur.filter((x) => x !== t));

  const dismissibleRow = (
    <div className="flex flex-wrap items-center gap-2">
      {demoTags.map((t) => (
        <Tag key={t} variant="default" onDismiss={() => removeTag(t)}>
          {t}
        </Tag>
      ))}
      {demoTags.length === 0 ? (
        <button
          type="button"
          onClick={() => setDemoTags(TAG_SEED)}
          className="[font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light text-muted-foreground underline underline-offset-2 hover:text-foreground"
        >
          Reset
        </button>
      ) : null}
    </div>
  );
  const states = [
    {
      variant: 'default',
      sample: 'New',
      fillRef: 'pella.sys.color.custom.light',
      hexes: '#204384 / #6C8FCB dark',
    },
    {
      variant: 'error',
      sample: 'Error 500',
      fillRef: 'semantic.error (red)',
      hexes: '#EE1F25 both themes',
    },
    {
      variant: 'alert',
      sample: 'Alert',
      fillRef: 'semantic.alert (yellow)',
      hexes: '#CFEC14 both themes',
    },
    {
      variant: 'ready',
      sample: 'Ready',
      fillRef: 'semantic.success (green)',
      hexes: '#218A38 / #5BB86B dark',
    },
    {
      variant: 'disabled',
      sample: 'Off',
      fillRef: 'custom.light + opacity.disabled',
      hexes: 'base fill at 32% opacity',
    },
  ] as const;

  const slot = useContext(SurfaceThemeContext);
  if (slot.part === 'dual') {
    // Top pair only: the live tag row, once per background surface.
    return (
      <div className="space-y-8 p-6 text-card-foreground">
        <section className="space-y-3">
          <h2 className="[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground">
            Variants
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            {states.map((s) => (
              <Tag key={s.variant} variant={s.variant}>
                {s.sample}
              </Tag>
            ))}
          </div>
        </section>
        <section className="space-y-3">
          <h2 className="[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground">
            Dismissible
          </h2>
          {dismissibleRow}
        </section>
        <section className="space-y-3">
          <h2 className="[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground">
            Tag input
          </h2>
          <div className="space-y-2">
            <TagInputDemo />
            <TagInputDemo filled />
          </div>
        </section>
        <section className="space-y-3">
          <h2 className="[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground">
            Preset tags (toggle)
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            {TAG_SEED.map((t) => (
              <TagToggle key={t} variant="default">
                {t}
              </TagToggle>
            ))}
          </div>
        </section>
      </div>
    );
  }
  // Full-width single column below the pair.
  return (
    <div className="space-y-8 p-6 text-card-foreground">
      {/* Dismissible - optional onDismiss */}
      <section className="space-y-3">
        <h2 className="[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground">
          Dismissible (optional onDismiss)
        </h2>
        <p className="max-w-3xl [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light text-muted-foreground">
          Pass{' '}
          <code className="font-mono [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light">
            onDismiss
          </code>{' '}
          to render a small close button; the parent owns removal. Click an X to remove that tag.
        </p>
        {dismissibleRow}
      </section>

      {/* Tag input - type to add freely, X (or Backspace on empty) removes */}
      <section className="space-y-3">
        <h2 className="[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground">
          Tag input
        </h2>
        <p className="max-w-3xl [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light text-muted-foreground">
          Type a tag and press{' '}
          <code className="font-mono [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light">
            Enter
          </code>{' '}
          (or comma) to add it; remove any with its X, or Backspace on an empty field. Shown in both
          container styles - OUTLINE (bordered) and FILL (solid, no border).
        </p>
        <div className="space-y-2">
          <TagInputDemo />
          <TagInputDemo filled />
        </div>
      </section>

      {/* Preset tags - self-contained on/off toggle, no custom add */}
      <section className="space-y-3">
        <h2 className="[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground">
          Preset tags (toggle)
        </h2>
        <p className="max-w-3xl [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light text-muted-foreground">
          A fixed set of preset tags with a self-contained on/off life-cycle: click the X to switch
          one off (it fades to the disabled state), click it again to re-enable. No custom text is
          added.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {TAG_SEED.map((t) => (
            <TagToggle key={t} variant="default">
              {t}
            </TagToggle>
          ))}
        </div>
      </section>

      {/* Evidence table */}
      <section className="space-y-3">
        <h2 className="[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground">
          Composition (tags.json)
        </h2>
        {states.map((s) => (
          <div
            key={s.variant}
            className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-lg border p-3"
          >
            <Tag variant={s.variant}>{s.sample}</Tag>
            <code className="[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light opacity-80">
              {s.fillRef}
            </code>
            <span className="font-mono [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light opacity-70">
              {s.hexes}
            </span>
          </div>
        ))}
      </section>

      {/* System mapping */}
      <section className="space-y-3 border-t pt-6">
        <h2 className="[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground">
          System mapping
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Constant
            label="Corner radius"
            value="--radius-sm = 0.25rem (sss - the same canonical value as fields, checkboxes and tooltips)"
          />
          <Constant
            label="Label typography"
            value="caption style - Roboto Light 300, 12px / 16px line / 0.25px tracking"
          />
          <Constant
            label="Container padding"
            value="horizontal sss only (0 {sss}) per the pill composition convention; tags.json exports no inner spacing"
          />
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
          <h2 className="[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground">
            Corner radii
          </h2>
          <p className="max-w-3xl [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light text-muted-foreground">
            Three canonical corner treatments. Buttons and inputs use the large radius; chips, tags
            and badges step down to sm.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {radii.map((r) => (
              <div key={r.name} className="space-y-2">
                <div
                  className="flex h-20 items-end border bg-background p-3"
                  style={{ borderRadius: r.value }}
                >
                  <span className="[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light">
                    {r.name}
                  </span>
                </div>
                <p className="font-mono [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light opacity-70">
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
        <h2 className="[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground">
          Dimensions
        </h2>
        <p className="mt-1 max-w-3xl [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light text-muted-foreground">
          The full dimension scale from the original tokens: component heights, widths and paddings,
          referenced verbatim by name in every component definition.
        </p>
        <div className="mt-4">
          <ScaleTable title="Core dimensions" rows={Object.entries(tokens.dimensions)} />
        </div>
      </section>

      {/* Spacing presets */}
      <section className="space-y-4 border-t pt-6">
        <h2 className="[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground">
          Spacing
        </h2>
        <p className="max-w-3xl [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light text-muted-foreground">
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
          <h2 className="[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground">
            Shadows
          </h2>
          <p className="max-w-3xl [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light text-muted-foreground">
            The six original elevation recipes: one per interaction surface. Note the trigger halo
            (pure spread, no blur) and the dots inner shadow.
          </p>
          {Object.entries(tokens.shadows).map(([name, css]) => (
            <div key={name} className="space-y-1">
              <div
                className="flex h-14 items-center justify-center rounded-lg border bg-card"
                style={{ boxShadow: css }}
              >
                <span className="[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light">
                  {name}
                </span>
              </div>
              <p className="break-all font-mono [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light opacity-70">
                {css}
              </p>
            </div>
          ))}
        </section>

        {/* Scrim over a sample surface with content underneath */}
        <section className="space-y-4 border-t pt-6">
          <h2 className="[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground">
            Scrim
          </h2>
          <p className="max-w-3xl [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light text-muted-foreground">
            The modal backdrop layer: black at 80% opacity, theme-independent. Shown here over a
            sample surface so the content underneath stays visible but dimmed.
          </p>
          <div className="relative h-24 overflow-hidden rounded-lg border bg-card">
            <div className="flex h-full items-center justify-center gap-3 p-6">
              <Button size="small">Primary action</Button>
              <span className="[font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light text-muted-foreground">
                Content behind the scrim
              </span>
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
        <h2 className="[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground">
          Shadow recipes
        </h2>
        <dl className="divide-y rounded-lg border">
          {Object.entries(tokens.shadows).map(([name, css]) => (
            <div key={name} className="flex items-baseline justify-between gap-4 px-3 py-1.5">
              <dt className="font-mono [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light">
                {name}
              </dt>
              <dd className="break-all text-right font-mono [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light">
                {css}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Scrim - data */}
      <section className="space-y-3 border-t pt-6">
        <h2 className="[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground">
          Scrim
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Constant label="overlay.scrim" value={tokens.overlays.scrim} />
          <Constant
            label="Consumers"
            value="dialog / drawer / sheet / alert-dialog backdrops (bg-scrim)"
          />
        </div>
      </section>
    </div>
  );
}
