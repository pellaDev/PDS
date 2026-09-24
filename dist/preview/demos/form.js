import { jsx, jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { Field } from "../../components/ui/field";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage
} from "../../components/ui/form";
function FormDemo() {
  const form = useForm({
    defaultValues: { username: "" }
  });
  return /* @__PURE__ */ jsx("div", { className: "max-w-md p-6", children: /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { className: "space-y-4", onSubmit: form.handleSubmit(() => void 0), children: [
    /* @__PURE__ */ jsx(
      FormField,
      {
        control: form.control,
        name: "username",
        rules: { required: "Enter a username." },
        render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Field, { label: "Username", size: "sm", tone: "outline", ...field }) }),
          /* @__PURE__ */ jsx(FormDescription, { children: "Your public display name." }),
          /* @__PURE__ */ jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsx(Button, { type: "submit", children: "Save profile" })
  ] }) }) });
}
export {
  FormDemo
};
