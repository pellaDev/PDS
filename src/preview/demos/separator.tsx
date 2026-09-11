import { Separator } from '../../components/ui/separator';
import { Stack } from '../parts';

export function SeparatorDemo() {
  return (
    <div className="max-w-md space-y-6 p-6">
      <Stack label="Horizontal">
        <Separator />
      </Stack>
      <Stack label="Fading at both ends">
        <Separator fade />
      </Stack>
      <Stack label="Vertical (normal / fading)">
        <div className="flex h-16 items-center gap-4 text-sm">
          <span>Docs</span>
          <Separator orientation="vertical" />
          <span>Components</span>
          <Separator fade orientation="vertical" />
          <span>Patterns</span>
        </div>
      </Stack>
    </div>
  );
}
