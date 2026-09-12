import { jsx, jsxs } from "react/jsx-runtime";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from "../../components/ui/input-otp";
import { Stack } from "../parts";
function InputOtpDemo() {
  return /* @__PURE__ */ jsx("div", { className: "max-w-sm p-6", children: /* @__PURE__ */ jsx(Stack, { label: "Six digit code", children: /* @__PURE__ */ jsxs(InputOTP, { maxLength: 6, defaultValue: "123", children: [
    /* @__PURE__ */ jsxs(InputOTPGroup, { children: [
      /* @__PURE__ */ jsx(InputOTPSlot, { index: 0 }),
      /* @__PURE__ */ jsx(InputOTPSlot, { index: 1 }),
      /* @__PURE__ */ jsx(InputOTPSlot, { index: 2 })
    ] }),
    /* @__PURE__ */ jsx(InputOTPSeparator, {}),
    /* @__PURE__ */ jsxs(InputOTPGroup, { children: [
      /* @__PURE__ */ jsx(InputOTPSlot, { index: 3 }),
      /* @__PURE__ */ jsx(InputOTPSlot, { index: 4 }),
      /* @__PURE__ */ jsx(InputOTPSlot, { index: 5 })
    ] })
  ] }) }) });
}
export {
  InputOtpDemo
};
