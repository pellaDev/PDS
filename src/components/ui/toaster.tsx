import { useToast } from '../../hooks/use-toast';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './toast';

export function Toaster({ toasterId }: { toasterId?: string }) {
  const { toasts } = useToast();

  const visible = toasts.filter((entry) => entry.toasterId === toasterId);

  return (
    <ToastProvider>
      {visible.map(function ({ id, title, description, action, toasterId: _ignored, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
