import { jsx, jsxs } from "react/jsx-runtime";
import { FileText, Settings, User } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from "../../components/ui/command";
function CommandDemo() {
  return /* @__PURE__ */ jsx("div", { className: "max-w-md overflow-hidden", children: /* @__PURE__ */ jsxs(Command, { children: [
    /* @__PURE__ */ jsx(CommandInput, { placeholder: "Type a command" }),
    /* @__PURE__ */ jsxs(CommandList, { children: [
      /* @__PURE__ */ jsx(CommandEmpty, { children: "No results found." }),
      /* @__PURE__ */ jsxs(CommandGroup, { heading: "Suggestions", children: [
        /* @__PURE__ */ jsxs(CommandItem, { children: [
          /* @__PURE__ */ jsx(FileText, {}),
          " New document",
          /* @__PURE__ */ jsx(CommandShortcut, { children: "Cmd N" })
        ] }),
        /* @__PURE__ */ jsxs(CommandItem, { children: [
          /* @__PURE__ */ jsx(User, {}),
          " View profile"
        ] })
      ] }),
      /* @__PURE__ */ jsx(CommandSeparator, {}),
      /* @__PURE__ */ jsx(CommandGroup, { heading: "Settings", children: /* @__PURE__ */ jsxs(CommandItem, { disabled: true, children: [
        /* @__PURE__ */ jsx(Settings, {}),
        " Team settings"
      ] }) })
    ] })
  ] }) });
}
export {
  CommandDemo
};
