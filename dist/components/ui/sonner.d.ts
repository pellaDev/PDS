import { Toaster as Sonner } from 'sonner';
import './sonner.css';
type ToasterProps = React.ComponentProps<typeof Sonner>;
declare const Toaster: ({ ...props }: ToasterProps) => import("react").JSX.Element;
export { Toaster };
