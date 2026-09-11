import { FileText, MoreHorizontal, Bell, Wifi, ShieldCheck, Pencil, ChevronRight } from 'lucide-react';
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

export function ItemDemo() {
  return (
    <div className="flex flex-col gap-8">
      {}
      <section className="space-y-2">
        <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Desktop · hover reveals actions</h3>
        <ItemGroup className="w-full overflow-hidden rounded-lg border [border-color:var(--pds-container-border-color)]">
          {}
          <Item size="sm" className="relative min-h-8 rounded-none border-0 py-1">
            <ItemMedia variant="icon" className="size-6 border-0 bg-transparent"><FileText /></ItemMedia>
            <ItemContent>
              <ItemTitle>Product brief</ItemTitle>
              <ItemDescription>Goals, customer context, and launch requirements.</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Tag variant="ready">Draft</Tag>
            </ItemActions>
            {}
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center gap-1 rounded-r-md bg-[color-mix(in_srgb,var(--pds-surface-bg)_82%,transparent)] px-3 opacity-0 backdrop-blur-[1px] transition-opacity group-hover/item:pointer-events-auto group-hover/item:opacity-100">
              <Button size="mini" aria-label="Edit"><Pencil /></Button>
              <Button size="mini" aria-label="More actions"><MoreHorizontal /></Button>
            </span>
          </Item>
          <ItemSeparator />
          {}
          <Item size="sm" className="min-h-8 rounded-none border-0 py-1">
            <ItemMedia variant="icon" className="size-6 border-0 bg-transparent"><Bell /></ItemMedia>
            <ItemContent><ItemTitle>Notifications</ItemTitle></ItemContent>
            <ItemActions><Switch defaultChecked aria-label="Notifications" /></ItemActions>
          </Item>
          <ItemSeparator />
          {}
          <Item size="sm" className="min-h-8 rounded-none border-0 py-1">
            <ItemMedia variant="icon" className="size-6 border-0 bg-transparent"><ShieldCheck /></ItemMedia>
            <ItemContent><ItemTitle>Privacy</ItemTitle></ItemContent>
            <ItemActions><Checkbox label="Enhanced protection" /></ItemActions>
          </Item>
        </ItemGroup>
      </section>

      {}
      <section className="space-y-2">
        <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Mobile · touch</h3>
        <ItemGroup className="max-w-[340px] overflow-hidden rounded-lg border [border-color:var(--pds-container-border-color)]">
          {}
          <Item size="sm">
            <ItemMedia><Avatar className="size-8"><AvatarFallback className="text-xs">PS</AvatarFallback></Avatar></ItemMedia>
            <ItemContent>
              <ItemTitle>Account</ItemTitle>
              <ItemDescription>Profile &amp; security</ItemDescription>
            </ItemContent>
          </Item>
          <ItemSeparator />
          {}
          <Item size="sm">
            <ItemMedia variant="icon"><Bell /></ItemMedia>
            <ItemContent><ItemTitle>Notifications</ItemTitle></ItemContent>
            <ItemActions><Tag variant="ready">On</Tag></ItemActions>
          </Item>
          <ItemSeparator />
          {}
          <Item size="sm">
            <ItemMedia variant="icon"><Wifi /></ItemMedia>
            <ItemContent><ItemTitle>Wi-Fi</ItemTitle></ItemContent>
            <ItemActions><Switch defaultChecked aria-label="Wi-Fi" /></ItemActions>
          </Item>
          <ItemSeparator />
          {}
          <Item size="sm">
            <ItemMedia variant="icon"><ShieldCheck /></ItemMedia>
            <ItemContent><ItemTitle>Privacy</ItemTitle></ItemContent>
            <ItemActions><Button size="mini" aria-label="Open privacy"><ChevronRight /></Button></ItemActions>
          </Item>
        </ItemGroup>
      </section>
    </div>
  );
}
