import { createContext, useContext, type ComponentType, type ReactNode } from 'react';
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  type LucideProps,
} from 'lucide-react';

export type PdsIconName =
  | 'check'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up';

export type PdsIconComponent = ComponentType<LucideProps>;

export type PdsIconSet = Partial<Record<PdsIconName, PdsIconComponent>>;

const defaultIconSet: Record<PdsIconName, PdsIconComponent> = {
  check: Check,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'chevron-up': ChevronUp,
};

const IconSetContext = createContext<PdsIconSet>(defaultIconSet);

export function IconSetProvider({ icons, children }: { icons: PdsIconSet; children: ReactNode }) {
  return (
    <IconSetContext.Provider value={{ ...defaultIconSet, ...icons }}>
      {children}
    </IconSetContext.Provider>
  );
}

export function Icon({ name, ...props }: LucideProps & { name: PdsIconName }) {
  const iconSet = useContext(IconSetContext);
  const IconComponent = iconSet[name] ?? defaultIconSet[name];
  return <IconComponent aria-hidden="true" {...props} />;
}

export { defaultIconSet, IconSetContext };
