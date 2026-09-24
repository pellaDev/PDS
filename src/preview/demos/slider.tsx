import { Slider } from '../../components/ui/slider';
import { Stack } from '../parts';

export function SliderDemo() {
  return (
    <div className="max-w-md space-y-6 p-6">
      <Stack label="Value">
        <Slider defaultValue={[40]} max={100} step={1} />
      </Stack>
      <Stack label="Range">
        <Slider defaultValue={[25, 75]} max={100} step={5} />
      </Stack>
      <Stack label="Vertical">
        <div className="flex h-40 items-center justify-center gap-8">
          <Slider orientation="vertical" defaultValue={[40]} max={100} step={1} />
          <Slider orientation="vertical" defaultValue={[25, 75]} max={100} step={5} />
          <Slider orientation="vertical" defaultValue={[60]} max={100} step={1} disabled />
        </div>
      </Stack>
      <Stack label="Disabled">
        <Slider defaultValue={[60]} disabled />
      </Stack>
    </div>
  );
}
