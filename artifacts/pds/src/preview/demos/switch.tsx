import { Switch } from '../../components/ui/switch';
import { BaseSurfaceOnly, Row } from '../parts';

export function SwitchDemo() {
  return (
    <div className="space-y-6 p-6 text-card-foreground">
      <BaseSurfaceOnly>
        <p className="text-sm text-muted-foreground">
          Disabled: the whole row (control + label) drops to opacity 0.32 per sys.opacity.disabled with no hover or focus states; on, disabled keeps the knob on the ON side.
        </p>
      </BaseSurfaceOnly>
      <Row label="States">
        <Switch name="st-off" label="Off" />
        <Switch name="st-on" defaultChecked label="On" />
        <Switch disabled label="Off, disabled" />
        <Switch disabled defaultChecked label="On, disabled" />
      </Row>
    </div>
  );
}