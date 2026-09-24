import {
  FileText,
  MoreHorizontal,
  Bell,
  Wifi,
  ShieldCheck,
  Pencil,
  ChevronRight,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Tag } from '../../components/ui/tag';
import { Switch } from '../../components/ui/switch';
import { Checkbox } from '../../components/ui/checkbox';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from '../../components/ui/item';

// ITEM / LIST — the List primitive (Item + ItemGroup). Every slot is filled with a real
// PDS component nested inside it, so the list is fully tokenized and cascades: restyle
// one primitive (e.g. the mini Button) and every copy in every row updates with it.
//
//   ItemMedia    -> left slot.  variant="icon" | avatar | image
//   ItemContent  -> ItemTitle + optional ItemDescription (rendered under the title)
//   ItemActions  -> any action set: Tag, mini Button, Switch, Checkbox, ...
//
// Desktop rows reveal their buttons on hover (group-hover/item); mobile/touch keeps them visible.
export function ItemDemo() {
  return (
    <div className="flex flex-col gap-8">
      {/* DESKTOP — icon-left media, description under title, varied actions; buttons reveal on hover */}
      <section className="space-y-2">
        <h3 className="[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground">
          Desktop · hover reveals actions
        </h3>
        <ItemGroup className="w-full overflow-hidden rounded-lg border [border-color:var(--pds-container-border-color)]">
          {/* icon + title + description | Tag (always) + mini Buttons (hover, PDS button) */}
          <Item size="sm" className="relative min-h-8 rounded-none border-0 py-1">
            <ItemMedia variant="icon" className="size-6 border-0 bg-transparent">
              <FileText />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Product brief</ItemTitle>
              <ItemDescription>Goals, customer context, and launch requirements.</ItemDescription>
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
          {/* icon + title | Switch action */}
          <Item size="sm" className="min-h-8 rounded-none border-0 py-1">
            <ItemMedia variant="icon" className="size-6 border-0 bg-transparent">
              <Bell />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Notifications</ItemTitle>
            </ItemContent>
            <ItemActions>
              <Switch defaultChecked aria-label="Notifications" />
            </ItemActions>
          </Item>
          <ItemSeparator />
          {/* icon + title | Checkbox action */}
          <Item size="sm" className="min-h-8 rounded-none border-0 py-1">
            <ItemMedia variant="icon" className="size-6 border-0 bg-transparent">
              <ShieldCheck />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Privacy</ItemTitle>
            </ItemContent>
            <ItemActions>
              <Checkbox label="Enhanced protection" />
            </ItemActions>
          </Item>
        </ItemGroup>
      </section>

      {/* MOBILE — touch context: same slots, actions always visible */}
      <section className="space-y-2">
        <h3 className="[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground">
          Mobile · touch
        </h3>
        <ItemGroup className="max-w-[340px] overflow-hidden rounded-lg border [border-color:var(--pds-container-border-color)]">
          {/* avatar media + title + description */}
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
          {/* icon + title | Tag action */}
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
          {/* icon + title | Switch action */}
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
          {/* icon + title | mini Button action (PDS button, always visible on touch) */}
          <Item size="sm">
            <ItemMedia variant="icon">
              <ShieldCheck />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Privacy</ItemTitle>
            </ItemContent>
            <ItemActions>
              <Button size="mini" aria-label="Open privacy">
                <ChevronRight />
              </Button>
            </ItemActions>
          </Item>
        </ItemGroup>
      </section>
    </div>
  );
}
