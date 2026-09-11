import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { Row } from '../parts';

export function AvatarDemo() {
  return (
    <div className="p-6">
      <Row label="Sizes and fallback">
        <Avatar className="h-8 w-8">
          <AvatarFallback>AL</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src={`${import.meta.env.BASE_URL}favicon.svg`}
            alt="Design system mark"
          />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <Avatar className="h-14 w-14">
          <AvatarFallback>DT</AvatarFallback>
        </Avatar>
      </Row>

      {
}
      <Row label="With status dot">
        <span className="relative inline-flex">
          <Avatar className="h-10 w-10">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Badge shape="simple" variant="ready" className="absolute bottom-1 right-1 h-3 w-3 rounded-full" />
        </span>
        <span className="relative inline-flex">
          <Avatar className="h-10 w-10">
            <AvatarFallback>MS</AvatarFallback>
          </Avatar>
          <Badge shape="simple" variant="alert" className="absolute bottom-1 right-1 h-3 w-3 rounded-full" />
        </span>
        <span className="relative inline-flex">
          <Avatar className="h-14 w-14">
            <AvatarFallback>DT</AvatarFallback>
          </Avatar>
          <Badge shape="simple" variant="error" className="absolute bottom-1.5 right-1.5 h-3.5 w-3.5 rounded-full" />
        </span>
      </Row>

      <div className="space-y-1 pt-2 font-mono text-[10px] leading-relaxed text-muted-foreground">
        <p>Status dot = Badge shape "simple" (dim-s 12px circle) overlaid inside the avatar's bottom-right corner.</p>
      </div>
    </div>
  );
}
