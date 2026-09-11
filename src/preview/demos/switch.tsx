import { Switch } from '../../components/ui/switch';
import { Row } from '../parts';

export function SwitchDemo() {
  return (
    <div className="space-y-6 p-6 text-card-foreground">
      <Row label="States">
        <Switch name="st-off" label="Off" />
        <Switch name="st-on" defaultChecked label="On" />
        <Switch disabled label="Off, disabled" />
        <Switch disabled defaultChecked label="On, disabled" />
      </Row>
    </div>
  );
}