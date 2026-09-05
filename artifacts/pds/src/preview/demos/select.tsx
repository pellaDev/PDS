import { Select } from '../../components/ui/select';
import { Row } from '../parts';

const options = ['Brand primary', 'Surface white', 'Ink black', 'Gray soft'];

export function SelectDemo() {
  return (
    <div className="p-6">
      <div className="space-y-5">
        <Row label="Default (hover / focus washes are runtime 32% mixes of the live brand)">
          <div className="w-full max-w-xs"><Select options={options} defaultValue="Brand primary" /></div>
        </Row>
        <Row label="Disabled (blackSoft fill, gray label, row opacity 0.32)">
          <div className="w-full max-w-xs"><Select options={options} disabled value="Surface white" /></div>
        </Row>
        <Row label="Error (full red semantic fill per export)">
          <div className="w-full max-w-xs"><Select options={options} error defaultValue="Ink black" /></div>
        </Row>
      </div>
    </div>
  );
}
