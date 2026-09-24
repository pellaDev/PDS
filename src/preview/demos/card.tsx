import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';

export function CardDemo() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Weekly report</CardTitle>
        <CardDescription>Activity across your workspace.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg [background-color:var(--pds-surface-bg)] p-4">
            <p className="[font-size:var(--type-body1-size)] [line-height:var(--type-body1-lh)] font-light">
              24
            </p>
            <p className="[font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light text-muted-foreground">
              Projects
            </p>
          </div>
          <div className="rounded-lg [background-color:var(--pds-surface-bg)] p-4">
            <p className="[font-size:var(--type-body1-size)] [line-height:var(--type-body1-lh)] font-light">
              89%
            </p>
            <p className="[font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light text-muted-foreground">
              On track
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button size="small">View report</Button>
      </CardFooter>
    </Card>
  );
}
