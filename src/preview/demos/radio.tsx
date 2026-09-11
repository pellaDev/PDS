import { Radio } from '../../components/ui/radio';
import { BaseSurfaceOnly, Row } from '../parts';

export function RadioDemo() {
  return (
    <div className="space-y-6 p-6 text-card-foreground">
      <BaseSurfaceOnly>
        <p className="text-sm text-muted-foreground">
          Disabled: the whole row (control + label) drops to opacity 0.32 per sys.opacity.disabled; selected + disabled keeps the brand dot under the same fade.
        </p>
      </BaseSurfaceOnly>
      <Row label="States">
        <Radio name="states" defaultChecked label="Selected" />
        <Radio name="states" label="Unselected" />
        <Radio name="states-disabled" disabled defaultChecked label="Selected, disabled" />
        <Radio name="states-disabled" disabled label="Unselected, disabled" />
      </Row>
      <Row label="Group (shared name — try it)">
        <Radio name="grp1" defaultValue="" label="Option one" value="a" />
        <Radio name="grp1" label="Option two" value="b" />
        <Radio name="grp1" label="Option three" value="c" />
      </Row>
    </div>
  );
}