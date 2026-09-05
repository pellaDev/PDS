import { Bold, Italic, Underline } from 'lucide-react';
import { Button } from '../../components/ui/button';
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from '../../components/ui/button-group';
import { Row } from '../parts';

export function ButtonGroupDemo() {
  return (
    <div className="space-y-6 p-6">
      <Row label="Grouped actions">
        <ButtonGroup>
          <Button variant="link" size="icon" aria-label="Bold">
            <Bold />
          </Button>
          <ButtonGroupSeparator />
          <Button variant="link" size="icon" aria-label="Italic">
            <Italic />
          </Button>
          <Button variant="link" size="icon" aria-label="Underline">
            <Underline />
          </Button>
        </ButtonGroup>
      </Row>
      <Row label="Attached label">
        <ButtonGroup>
          <ButtonGroupText>https://</ButtonGroupText>
          <Button size="small" variant="link">Copy link</Button>
        </ButtonGroup>
      </Row>
    </div>
  );
}
