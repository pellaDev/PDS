import { Button } from '../../components/ui/button';
import { Spinner } from '../../components/ui/spinner';
import { Row } from '../parts';

export function SpinnerDemo() {
  return (
    <div className="p-6">
      <Row label="Sizes and context">
        <Spinner className="size-4 text-primary" />
        <Spinner className="size-6 text-primary" />
        <Spinner className="size-8 text-primary" />
        <Button disabled>
          <Spinner /> Saving
        </Button>
      </Row>
    </div>
  );
}
