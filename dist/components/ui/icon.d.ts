import { type ComponentType, type ReactNode } from 'react';
import { type LucideProps } from 'lucide-react';
export type PdsIconName = 'check' | 'chevron-down' | 'chevron-left' | 'chevron-right' | 'chevron-up';
export type PdsIconComponent = ComponentType<LucideProps>;
export type PdsIconSet = Partial<Record<PdsIconName, PdsIconComponent>>;
declare const defaultIconSet: Record<PdsIconName, PdsIconComponent>;
declare const IconSetContext: import("react").Context<Partial<Record<PdsIconName, PdsIconComponent>>>;
export declare function IconSetProvider({ icons, children }: {
    icons: PdsIconSet;
    children: ReactNode;
}): import("react").JSX.Element;
export declare function Icon({ name, ...props }: LucideProps & {
    name: PdsIconName;
}): import("react").JSX.Element;
export { defaultIconSet, IconSetContext };
