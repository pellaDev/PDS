import { Badge } from '../../components/ui/badge';
import { Row } from '../parts';

type BState = 'default' | 'error' | 'alert' | 'ready' | 'disabled';
const SAMPLES: [BState, string][] = [
  ['default', '3'],
  ['error', '12'],
  ['alert', '!'],
  ['ready', 'OK'],
  ['disabled', '0'],
];

export function BadgeDemo() {
  return (
    <div className="p-6">

      <Row label="Numbered">
        {SAMPLES.map(([variant, content]) => (
          <Badge key={variant} shape="numbered" variant={variant}>
            {content}
          </Badge>
        ))}
      </Row>

      <Row label="Simple marker">
        {/* demo size only - the original exports fill + radius sss for this shape, no sizing tokens */}
        {SAMPLES.map(([variant]) => (
          <Badge key={variant} variant={variant} className="[width:var(--dim-ll)] [height:var(--dim-mmm)]" />
        ))}
      </Row>

      <div className="space-y-1 pt-2 font-mono text-[10px] leading-relaxed text-muted-foreground">
        <p>pella.comp.badge.simple.brand.*.container - fill custom.light/red/yellow/green + opacity.disabled, radius sss (4px), no label tokens exported</p>
        <p>{'labelSpacing "0 {sss}" - numbered container radius ss (8px)'}</p>
        <p>.label - typography caption; fill graySoft E4E3E3 (alert: blackSoft 383838); disabled adds opacity var(--opacity-disabled) = 0.32</p>
      </div>
    </div>
  );
}
