import { ChevronsUpDown } from 'lucide-react';
import { Button } from '../../components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../components/ui/collapsible';

export function CollapsibleDemo() {
  return (
    <Collapsible className="max-w-md space-y-2 p-6">
      <div className="flex items-center justify-between gap-4">
        <p className="[font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light">
          3 linked repositories
        </p>
        <CollapsibleTrigger asChild>
          <Button variant="link" size="icon" aria-label="Toggle repositories">
            <ChevronsUpDown />
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 font-mono [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light">
        web-app
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 font-mono [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light">
          api
        </div>
        <div className="rounded-md border px-4 py-2 font-mono [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light">
          docs
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
