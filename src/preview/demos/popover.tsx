import { Button } from '../../components/ui/button';
import { Field } from '../../components/ui/field';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../components/ui/popover';

export function PopoverDemo() {
  return (
    <div className="p-6">
      <Popover>
        <PopoverTrigger asChild>
          <Button size="small">Set dimensions</Button>
        </PopoverTrigger>
        <PopoverContent className="space-y-3">
          <div>
            <p className="font-medium">Dimensions</p>
            <p className="text-sm text-muted-foreground">
              Set a fixed width for the panel.
            </p>
          </div>
          <Field size="sm" tone="outline" label="Width" defaultValue="320" />
        </PopoverContent>
      </Popover>
    </div>
  );
}