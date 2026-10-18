import { jsx, jsxs } from "react/jsx-runtime";
import { useToast } from "../../hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from "./toast";
function Toaster({ toasterId }) {
  const { toasts } = useToast();
  const visible = toasts.filter((entry) => entry.toasterId === toasterId);
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    visible.map(function({ id, title, description, action, toasterId: _ignored, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}
export {
  Toaster
};
