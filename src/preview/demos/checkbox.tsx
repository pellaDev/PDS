import { Checkbox } from '../../components/ui/checkbox';
import { BaseSurfaceOnly, Row } from '../parts';

export function CheckboxDemo() {
  return (
    <div className="space-y-6 p-6 text-card-foreground">
      <BaseSurfaceOnly>
        <p className="[font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light text-muted-foreground">
          Disabled: the whole row (control + label) drops to opacity 0.32 per sys.opacity.disabled;
          checked + disabled keeps the brand fill under the same fade.
        </p>
      </BaseSurfaceOnly>
      <Row label="States">
        <Checkbox defaultChecked label="Checked" />
        <Checkbox label="Unchecked" />
        <Checkbox disabled defaultChecked label="Checked, disabled" />
        <Checkbox disabled label="Unchecked, disabled" />
      </Row>
    </div>
  );
}
