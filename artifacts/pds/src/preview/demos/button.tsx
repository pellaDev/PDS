import { ArrowRight, Bell, Loader2, Mail, Pencil, Sparkles } from 'lucide-react';

import { Button } from '../../components/ui/button';
import { Tooltip } from '../../components/ui/tooltip';
import { Row } from '../parts';

export function ButtonDemo() {
  return (
    <div className="space-y-6 p-6 text-card-foreground">
      <Row label="Mini — icon only, with tooltip">
        <Tooltip content="Edit">
          <Button size="mini" aria-label="Edit">
            <Pencil />
          </Button>
        </Tooltip>
      </Row>
      <Row label="Small — icon only, with tooltip">
        <Tooltip content="Send mail">
          <Button size="icon" aria-label="Send mail">
            <Mail />
          </Button>
        </Tooltip>
        <Tooltip content="New item — large icon">
          <Button size="icon" className="[&_svg]:size-6" aria-label="New item">
            <Sparkles />
          </Button>
        </Tooltip>
      </Row>
      <Row label="Small — label, optional icon on the left or right">
        <Button size="small">Label</Button>
        <Button size="small">
          <Mail />
          Label
        </Button>
        <Button size="small">
          Label
          <ArrowRight />
        </Button>
      </Row>
      <Row label="Large — label, optional icon on the left or right">
        <Button size="large">Label</Button>
        <Button size="large">
          <Mail />
          Label
        </Button>
        <Button size="large">
          Label
          <ArrowRight />
        </Button>
      </Row>
      <Row label="Special — square, icon over label">
        <Button size="special">
          <Sparkles />
          Save
        </Button>
        <Button size="special">
          <Bell />
          Alerts
        </Button>
      </Row>
      <Row label="States">
        <Button size="small" disabled>
          Disabled
        </Button>
        <Button size="small" disabled>
          <Loader2 className="animate-spin" />
          Loading
        </Button>
        <Button size="small" variant="link">
          Link
        </Button>
        <Button size="small" variant="destructive">
          Destructive
        </Button>
      </Row>
    </div>
  );
}
