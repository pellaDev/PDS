import { Bold, Italic, Underline } from 'lucide-react';
import { Toggle } from '../../components/ui/toggle';
import { Row } from '../parts';

export function ToggleDemo() {
  return (
    <div className="space-y-6 p-6">
      <Row label="Icon (icon inside)">
        <Toggle aria-label="Bold" defaultPressed>
          <Bold />
        </Toggle>
        <Toggle aria-label="Italic">
          <Italic />
        </Toggle>
        <Toggle aria-label="Underline">
          <Underline />
        </Toggle>
      </Row>
      <Row label="Text (plain text)">
        <Toggle defaultPressed>Bold</Toggle>
        <Toggle>Italic</Toggle>
        <Toggle>Underline</Toggle>
      </Row>
      <Row label="Sizes and states">
        <Toggle size="sm" aria-label="Small"><Bold /></Toggle>
        <Toggle size="lg" aria-label="Large"><Bold /></Toggle>
        <Toggle disabled aria-label="Disabled bold"><Bold /></Toggle>
      </Row>
    </div>
  );
}
