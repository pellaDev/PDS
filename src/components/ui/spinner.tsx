import { Loader2Icon } from 'lucide-react';

import { cn } from '../../lib/utils';

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn('size-[var(--dim-mmmm)] animate-spin', className)}
      {...props}
    />
  );
}

export { Spinner };
