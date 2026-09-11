import { Tooltip } from '../../components/ui/tooltip';
import { Row } from '../parts';
import { Button } from '../../components/ui/button';

export function TooltipDemo() {
  return (
    <div className="p-6">
      <div className="space-y-5">
        <Row label="Variants (hover or Tab onto a trigger)">
          <Tooltip content="Default - live brand fill, graySoft text">
            <Button size="small">Hover me</Button>
          </Tooltip>
          <Tooltip variant="alert" content="Alert - yellow step with blackSoft text">
            <Button size="small">Hover me</Button>
          </Tooltip>
          <Tooltip variant="error" content="Error - red semantic fill, graySoft text">
            <Button size="small">Hover me</Button>
          </Tooltip>
        </Row>
      </div>
    </div>
  );
}
