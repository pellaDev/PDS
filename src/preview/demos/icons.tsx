import { Bell, Wifi, ShieldCheck, FileText, Settings } from 'lucide-react';

// ICONS — PDS icon-set specimen. Each size row is a transparent, borderless square
// container whose height matches the matching Button size (mini/small/large = 24/32/40px).
// Icons render at 16px (the same size every Button uses) in the primary brand color.
// The browser renders this page on BOTH surfaces (splitLayout), so the primary color is
// checked against both backgrounds of the active theme.
const ICONS = [Bell, Wifi, ShieldCheck, FileText, Settings];

function IconRow({ label, sizeClass }: { label: string; sizeClass: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-28 shrink-0 [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light text-muted-foreground">
        {label}
      </span>
      <div className="flex items-center gap-3">
        {ICONS.map((Icon, i) => (
          <span
            key={i}
            className={`${sizeClass} flex items-center justify-center border-0 bg-transparent text-primary`}
          >
            <Icon size={16} strokeWidth={2} />
          </span>
        ))}
      </div>
    </div>
  );
}

export function IconsDemo() {
  return (
    <div className="space-y-5">
      <p className="max-w-prose [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light text-muted-foreground">
        Icon set. Transparent, borderless square containers sized to the matching Button height;
        icons at 16px in the primary brand color.
      </p>
      <IconRow label="Mini · 24" sizeClass="size-6" />
      <IconRow label="Small · 32" sizeClass="size-8" />
      <IconRow label="Large · 40" sizeClass="size-10" />
    </div>
  );
}
