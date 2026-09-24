import { Button } from '../../components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';

export function DialogDemo() {
  return (
    <div className="p-6">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Edit profile</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Update the details shown to your teammates.</DialogDescription>
          </DialogHeader>
          <div className="rounded-md border bg-muted p-4 [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light">
            Profile settings appear here.
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="link">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button>Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
