import type { ReactNode } from 'react';
import { Field } from '../../components/ui/field';

import { Key } from 'lucide-react';

function VariantRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <div className="grid gap-x-4 sm:grid-cols-3">{children}</div>
    </div>
  );
}

export function FieldDemo() {
  return (
    <div className="space-y-8 p-6 text-card-foreground">
      <section className="space-y-6">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Variants</p>
        <VariantRow label="Fill / small">
          <Field size="sm" tone="fill" label="Email address" className="w-full" />
          <Field size="sm" tone="fill" state="error" defaultValue="not an email" label="Invalid value" className="w-full" />
          <Field size="sm" tone="fill" disabled label="Disabled field" className="w-full" />
        </VariantRow>
        <VariantRow label="Fill / large">
          <Field size="lg" tone="fill" label="Full name" className="w-full" />
          <Field size="lg" tone="fill" state="error" defaultValue="0" label="Amount (error)" className="w-full" />
          <Field size="lg" tone="fill" disabled label="Disabled field" className="w-full" />
        </VariantRow>
        <VariantRow label="Outline / small">
          <Field size="sm" tone="outline" label="Password" type="password" className="w-full" />
          <Field size="sm" tone="outline" state="error" defaultValue="short" label="Too short (error)" className="w-full" />
          <Field size="sm" tone="outline" disabled label="Disabled field" className="w-full" />
        </VariantRow>
        <VariantRow label="Outline / large">
          <Field size="lg" tone="outline" label="Search" className="w-full" />
          <Field size="lg" tone="outline" state="error" defaultValue="x" label="Invalid (error)" className="w-full" />
          <Field size="lg" tone="outline" disabled label="Disabled field" className="w-full" />
        </VariantRow>

        <VariantRow label="Optional icon on right">
          <Field size="sm" tone="outline" type="password" label="Password" trailingIcon={<Key size={14} />} className="w-full" />
          <Field size="lg" tone="outline" type="password" label="Password" trailingIcon={<Key size={16} />} className="w-full" />
        </VariantRow>
      </section>

      <div className="space-y-1">
        <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">
          {'fields.json: fill container graySoft, padding sys.spacing.s, radius sss -- label + input INSIDE the box (label body2 inside, fades out while focused/filled) | outline adds borderWidth=ssss brand always on'}
        </p>
        <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">
          {'outline label: at rest body2 inside the box; caption (body2 x 0.66) only while focused/filled, as a surface chip on the border'}
        </p>
        <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">
          {'disabled: fill bg #919191 / onContainer #F9F9F9 | outline border+text #919191 | both at opacity.disabled=0.32'}
        </p>
      </div>
    </div>
  );
}