import { Bell, Wifi, ShieldCheck, FileText, Settings } from 'lucide-react';

const ICONS = [Bell, Wifi, ShieldCheck, FileText, Settings];

function IconRow({ label, sizeClass }: { label: string; sizeClass: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-28 shrink-0 text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</span>
      <div className="flex items-center gap-3">
        {ICONS.map((Icon, i) => (
          <span key={i} className={`${sizeClass} flex items-center justify-center border-0 bg-transparent text-primary`}>
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
      <p className="max-w-prose text-sm text-muted-foreground">
        Icon set. Transparent, borderless square containers sized to the matching Button height; icons at 16px in the primary brand color.
      </p>
      <IconRow label="Mini · 24" sizeClass="size-6" />
      <IconRow label="Small · 32" sizeClass="size-8" />
      <IconRow label="Large · 40" sizeClass="size-10" />
    </div>
  );
}
