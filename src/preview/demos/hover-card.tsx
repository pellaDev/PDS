import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../../components/ui/hover-card';

export function HoverCardDemo() {
  return (
    <div className="p-6">
      <HoverCard>
        <HoverCardTrigger asChild>
          <a
            href="#page=hover-card"
            className="[font-size:var(--type-button-size)] [line-height:var(--type-button-lh)] font-light underline underline-offset-4"
          >
            @design-team
          </a>
        </HoverCardTrigger>
        <HoverCardContent className="flex gap-3">
          <Avatar>
            <AvatarFallback>DT</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="[font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light">
              Design team
            </p>
            <p className="[font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] font-light text-muted-foreground">
              Building clear, consistent product experiences.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
