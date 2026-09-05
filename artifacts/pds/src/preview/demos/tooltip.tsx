import { Tooltip } from '../../components/ui/tooltip';
import { Row } from '../parts';

export function TooltipDemo() {
  return (
    <div className="p-6">
      <div className="space-y-5">
        <Row label="Variants (hover or Tab onto a trigger)">
          <Tooltip content="Default - live brand fill, graySoft text">
            <button type="button" className="rounded border px-3 py-1.5 text-sm hover:bg-accent">Hover me</button>
          </Tooltip>
          <Tooltip variant="alert" content="Alert - yellow step with blackSoft text">
            <button type="button" className="rounded border px-3 py-1.5 text-sm hover:bg-accent">Hover me</button>
          </Tooltip>
          <Tooltip variant="error" content="Error - red semantic fill, graySoft text">
            <button type="button" className="rounded border px-3 py-1.5 text-sm hover:bg-accent">Hover me</button>
          </Tooltip>
        </Row>
      </div>
    </div>
  );
}
