import { Badge } from '../../components/ui/badge';
import { Row } from '../parts';

type BState = 'default' | 'error' | 'alert' | 'ready' | 'disabled';

export function BadgeDemo() {
  return (
    <div className="p-6">
      {}
      <Row label="Numbered · 0–9, then '..'">
        <Badge shape="numbered" variant="default" count={3} />
        <Badge shape="numbered" variant="default" count={7} />
        <Badge shape="numbered" variant="default" count={12} />
        <Badge shape="numbered" variant="error" count={5} />
        <Badge shape="numbered" variant="alert" count={99} />
      </Row>

      {}
      <Row label="Dot · no content">
        {(['default', 'ready', 'alert', 'error'] as BState[]).map((v) => (
          <Badge key={v} shape="simple" variant={v} />
        ))}
      </Row>

      <div className="space-y-1 pt-2 font-mono text-[10px] leading-relaxed text-muted-foreground">
        <p>Two cases only: a number (single digit 0–9, ".." when the value exceeds 9) or nothing - a perfect round dot.</p>
        <p>Both shapes are fixed-size circles so they stay round with or without a value: numbered = dim-mmm (20px), dot = dim-s (12px).</p>
        <p>Fills ride the live brand tokens (default --primary, error --destructive, alert --accent wash, ready --success); disabled adds opacity var(--opacity-disabled).</p>
      </div>
    </div>
  );
}
