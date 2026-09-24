import { lazy } from "react";
import {
  ColorsPage,
  FamiliesPage,
  LayoutPage,
  TextStylesPage,
  OverviewPage,
  ShadowsPage,
  TagsPage
} from "./foundations";
function lazyPage(load) {
  return lazy(async () => ({ default: await load() }));
}
const AccordionDemo = lazyPage(
  () => import("./demos/accordion").then(({ AccordionDemo: AccordionDemo2 }) => AccordionDemo2)
);
const AlertDemo = lazyPage(() => import("./demos/alert").then(({ AlertDemo: AlertDemo2 }) => AlertDemo2));
const AlertDialogDemo = lazyPage(
  () => import("./demos/alert-dialog").then(({ AlertDialogDemo: AlertDialogDemo2 }) => AlertDialogDemo2)
);
const AspectRatioDemo = lazyPage(
  () => import("./demos/aspect-ratio").then(({ AspectRatioDemo: AspectRatioDemo2 }) => AspectRatioDemo2)
);
const AvatarDemo = lazyPage(() => import("./demos/avatar").then(({ AvatarDemo: AvatarDemo2 }) => AvatarDemo2));
const IconsDemo = lazyPage(() => import("./demos/icons").then(({ IconsDemo: IconsDemo2 }) => IconsDemo2));
const BadgeDemo = lazyPage(() => import("./demos/badge").then(({ BadgeDemo: BadgeDemo2 }) => BadgeDemo2));
const BreadcrumbDemo = lazyPage(
  () => import("./demos/breadcrumb").then(({ BreadcrumbDemo: BreadcrumbDemo2 }) => BreadcrumbDemo2)
);
const ButtonDemo = lazyPage(() => import("./demos/button").then(({ ButtonDemo: ButtonDemo2 }) => ButtonDemo2));
const CalendarDemo = lazyPage(
  () => import("./demos/calendar").then(({ CalendarDemo: CalendarDemo2 }) => CalendarDemo2)
);
const CardDemo = lazyPage(() => import("./demos/card").then(({ CardDemo: CardDemo2 }) => CardDemo2));
const CarouselDemo = lazyPage(
  () => import("./demos/carousel").then(({ CarouselDemo: CarouselDemo2 }) => CarouselDemo2)
);
const ChartDemo = lazyPage(() => import("./demos/chart").then(({ ChartDemo: ChartDemo2 }) => ChartDemo2));
const CheckboxDemo = lazyPage(
  () => import("./demos/checkbox").then(({ CheckboxDemo: CheckboxDemo2 }) => CheckboxDemo2)
);
const CollapsibleDemo = lazyPage(
  () => import("./demos/collapsible").then(({ CollapsibleDemo: CollapsibleDemo2 }) => CollapsibleDemo2)
);
const CommandDemo = lazyPage(
  () => import("./demos/command").then(({ CommandDemo: CommandDemo2 }) => CommandDemo2)
);
const DialogDemo = lazyPage(() => import("./demos/dialog").then(({ DialogDemo: DialogDemo2 }) => DialogDemo2));
const DrawerDemo = lazyPage(() => import("./demos/drawer").then(({ DrawerDemo: DrawerDemo2 }) => DrawerDemo2));
const EmptyDemo = lazyPage(() => import("./demos/empty").then(({ EmptyDemo: EmptyDemo2 }) => EmptyDemo2));
const FieldDemo = lazyPage(() => import("./demos/field").then(({ FieldDemo: FieldDemo2 }) => FieldDemo2));
const FormDemo = lazyPage(() => import("./demos/form").then(({ FormDemo: FormDemo2 }) => FormDemo2));
const HoverCardDemo = lazyPage(
  () => import("./demos/hover-card").then(({ HoverCardDemo: HoverCardDemo2 }) => HoverCardDemo2)
);
const InputDemo = lazyPage(() => import("./demos/input").then(({ InputDemo: InputDemo2 }) => InputDemo2));
const InputOtpDemo = lazyPage(
  () => import("./demos/input-otp").then(({ InputOtpDemo: InputOtpDemo2 }) => InputOtpDemo2)
);
const ItemDemo = lazyPage(() => import("./demos/item").then(({ ItemDemo: ItemDemo2 }) => ItemDemo2));
const KbdDemo = lazyPage(() => import("./demos/kbd").then(({ KbdDemo: KbdDemo2 }) => KbdDemo2));
const MenuDemo = lazyPage(() => import("./demos/menu").then(({ MenuDemo: MenuDemo2 }) => MenuDemo2));
const MenubarDemo = lazyPage(
  () => import("./demos/menubar").then(({ MenubarDemo: MenubarDemo2 }) => MenubarDemo2)
);
const NavigationMenuDemo = lazyPage(
  () => import("./demos/navigation-menu").then(({ NavigationMenuDemo: NavigationMenuDemo2 }) => NavigationMenuDemo2)
);
const PaginationDemo = lazyPage(
  () => import("./demos/pagination").then(({ PaginationDemo: PaginationDemo2 }) => PaginationDemo2)
);
const PopoverDemo = lazyPage(
  () => import("./demos/popover").then(({ PopoverDemo: PopoverDemo2 }) => PopoverDemo2)
);
const ProgressDemo = lazyPage(
  () => import("./demos/progress").then(({ ProgressDemo: ProgressDemo2 }) => ProgressDemo2)
);
const RadioDemo = lazyPage(() => import("./demos/radio").then(({ RadioDemo: RadioDemo2 }) => RadioDemo2));
const ResizableDemo = lazyPage(
  () => import("./demos/resizable").then(({ ResizableDemo: ResizableDemo2 }) => ResizableDemo2)
);
const ScrollAreaDemo = lazyPage(
  () => import("./demos/scroll-area").then(({ ScrollAreaDemo: ScrollAreaDemo2 }) => ScrollAreaDemo2)
);
const SeparatorDemo = lazyPage(
  () => import("./demos/separator").then(({ SeparatorDemo: SeparatorDemo2 }) => SeparatorDemo2)
);
const SheetDemo = lazyPage(() => import("./demos/sheet").then(({ SheetDemo: SheetDemo2 }) => SheetDemo2));
const SidebarDemo = lazyPage(
  () => import("./demos/sidebar").then(({ SidebarDemo: SidebarDemo2 }) => SidebarDemo2)
);
const SkeletonDemo = lazyPage(
  () => import("./demos/skeleton").then(({ SkeletonDemo: SkeletonDemo2 }) => SkeletonDemo2)
);
const SliderDemo = lazyPage(() => import("./demos/slider").then(({ SliderDemo: SliderDemo2 }) => SliderDemo2));
const SonnerDemo = lazyPage(() => import("./demos/sonner").then(({ SonnerDemo: SonnerDemo2 }) => SonnerDemo2));
const SpinnerDemo = lazyPage(
  () => import("./demos/spinner").then(({ SpinnerDemo: SpinnerDemo2 }) => SpinnerDemo2)
);
const SwitchDemo = lazyPage(() => import("./demos/switch").then(({ SwitchDemo: SwitchDemo2 }) => SwitchDemo2));
const TableDemo = lazyPage(() => import("./demos/table").then(({ TableDemo: TableDemo2 }) => TableDemo2));
const TabsDemo = lazyPage(() => import("./demos/tabs").then(({ TabsDemo: TabsDemo2 }) => TabsDemo2));
const TextareaDemo = lazyPage(
  () => import("./demos/textarea").then(({ TextareaDemo: TextareaDemo2 }) => TextareaDemo2)
);
const ToastDemo = lazyPage(() => import("./demos/toast").then(({ ToastDemo: ToastDemo2 }) => ToastDemo2));
const ToggleDemo = lazyPage(() => import("./demos/toggle").then(({ ToggleDemo: ToggleDemo2 }) => ToggleDemo2));
const ToggleGroupDemo = lazyPage(
  () => import("./demos/toggle-group").then(({ ToggleGroupDemo: ToggleGroupDemo2 }) => ToggleGroupDemo2)
);
const TooltipDemo = lazyPage(
  () => import("./demos/tooltip").then(({ TooltipDemo: TooltipDemo2 }) => TooltipDemo2)
);
const DESIGN_SYSTEM = {
  // Wordmark parts — the logo mark is rendered inline between prefix and suffix by the preview shell.
  titlePrefix: "PDS",
  titleSuffix: "Pella Design System",
  // Current design system version -- mirrors the git tag on branch pds-gh.
  version: "v1.3.0",
  description: "Simple but complete AI Ready design system in React: foundations, accessible components, and ready-to-use patterns for consistent products.",
  descriptionBody: "Pick up your Light theme and Dark theme colors, check if the colors pass the contrast test in Color roles, and choose an available font and style. When you are ready, install the PDS with the flags your colors/font/style and you are done."
};
const OVERVIEW_ENTRY = {
  id: "overview",
  name: "Overview",
  description: "The visual foundations and principles that shape this system.",
  Page: OverviewPage
};
const NON_PRIMITIVE_IDS = /* @__PURE__ */ new Set([
  "overview",
  // meta / foundations intro
  "color-roles",
  // color specimen
  "text-styles",
  // type specimen (named styles)
  "font-families",
  // families & weights specimen
  "shadows",
  // elevation specimen
  "spacing-radius",
  // spacing & radius specimen
  "form",
  // composes several fields (a pattern, not a single primitive)
  "chart"
  // application-level data visualization, not a core UI primitive
]);
const isPrimitiveEntry = (e) => !NON_PRIMITIVE_IDS.has(e.id);
const RAW_NAV_GROUPS = [
  { name: "Brand", entries: [] },
  {
    name: "Colors",
    entries: [
      {
        id: "color-roles",
        name: "Color roles",
        description: "Global colors for both themes - brand primaries, traffic lights, gray scales, hover-layer variants.",
        Page: ColorsPage
      }
    ]
  },
  {
    name: "Typography",
    entries: [
      {
        id: "text-styles",
        name: "Text styles",
        description: "The eight named text styles \u2014 family, size, line height, tracking, weight \u2014 and the raw scales.",
        Page: TextStylesPage,
        splitLayout: true
      },
      {
        id: "font-families",
        name: "Families & weights",
        description: "Installable font families, their available weights, and the system emphasis rule.",
        Page: FamiliesPage
      }
    ]
  },
  {
    name: "Icons",
    entries: [
      {
        id: "icons",
        name: "Icons",
        description: "Icon set \u2014 Mini/Small/Large in transparent square containers, primary color.",
        Page: IconsDemo,
        splitLayout: true
      }
    ]
  },
  {
    name: "Layout",
    entries: [
      {
        id: "shadows",
        name: "Shadows",
        description: "The six original elevation recipes plus the modal scrim layer.",
        Page: ShadowsPage,
        splitLayout: true
      },
      {
        id: "spacing-radius",
        name: "Spacing and radius",
        description: "The spacing rhythm and corner treatments used by the system.",
        Page: LayoutPage,
        splitLayout: true
      }
    ]
  },
  {
    name: "Actions",
    entries: [
      {
        id: "button",
        name: "Buttons",
        description: "Button variants, sizes, icon treatments, and states.",
        Page: ButtonDemo
      },
      {
        id: "tag",
        name: "Tags",
        description: "Pill markers with one solid fill per state, straight from the original tags.json composition.",
        Page: TagsPage,
        splitLayout: true
      },
      {
        id: "toggle",
        name: "Toggle",
        description: "Pressed controls in multiple variants and sizes.",
        Page: ToggleDemo
      },
      {
        id: "toggle-group",
        name: "Toggle group",
        description: "Single and multiple selection toggle sets.",
        Page: ToggleGroupDemo
      }
    ]
  },
  {
    name: "Forms & inputs",
    entries: [
      {
        id: "input",
        name: "Input",
        description: "Text, email, file, and validation states.",
        Page: InputDemo
      },
      {
        id: "input-otp",
        name: "Input OTP",
        description: "Segmented one-time code entry.",
        Page: InputOtpDemo
      },
      {
        id: "textarea",
        name: "Textarea",
        description: "Multiline text entry and states.",
        Page: TextareaDemo
      },
      {
        id: "checkbox",
        name: "Checkbox",
        description: "Pella checkbox from checkboxes.json \u2014 brand-family fill states with graySoft glyph.",
        Page: CheckboxDemo
      },
      {
        id: "radio",
        name: "Radio",
        description: "Pella radio control from radios.json \u2014 selected ring with runtime \xB132% state outlines.",
        Page: RadioDemo
      },
      {
        id: "slider",
        name: "Slider",
        description: "Single values, ranges, and disabled states.",
        Page: SliderDemo
      },
      {
        id: "switch",
        name: "Switch",
        description: "Toggle switch from toggles.json - outlined off track to solid live-brand on fill with token-set knob geometry.",
        Page: SwitchDemo
      },
      {
        id: "calendar",
        name: "Calendar",
        description: "A deterministic single-date calendar.",
        Page: CalendarDemo
      },
      {
        id: "field",
        name: "Field",
        description: "Floating-label inputs from fields.json - fill/border x small/large, runtime-computed \xB132% state outlines.",
        Page: FieldDemo
      },
      {
        id: "form",
        name: "Form",
        description: "Validated form composition with labels and messages.",
        Page: FormDemo
      }
    ]
  },
  {
    name: "Overlays",
    entries: [
      {
        id: "dialog",
        name: "Dialog",
        description: "Modal content with header, footer, and actions.",
        Page: DialogDemo
      },
      {
        id: "alert-dialog",
        name: "Alert dialog",
        description: "Confirmation for consequential actions.",
        Page: AlertDialogDemo
      },
      {
        id: "sheet",
        name: "Sheet",
        description: "Edge-aligned overlay panels.",
        Page: SheetDemo
      },
      {
        id: "drawer",
        name: "Drawer",
        description: "Touch-friendly bottom overlay content.",
        Page: DrawerDemo
      },
      {
        id: "popover",
        name: "Popover",
        description: "Anchored interactive content.",
        Page: PopoverDemo
      },
      {
        id: "hover-card",
        name: "Hover card",
        description: "Rich context revealed on hover.",
        Page: HoverCardDemo
      },
      {
        id: "tooltip",
        name: "Tooltip",
        description: "Tooltip bubbles from tooltips.json - brand / alert / error fills at caption type, CSS-only reveal.",
        Page: TooltipDemo
      },
      {
        id: "command",
        name: "Command",
        description: "Searchable keyboard-first command lists.",
        Page: CommandDemo
      }
    ]
  },
  {
    name: "Menus & navigation",
    entries: [
      {
        id: "menu",
        name: "Dropdown",
        description: 'Unified PDS dropdown + context menu (mode="dropdown" opens on click, mode="context" on right-click): token-faithful trigger from dropdowns.json, floating listbox with the dropDown shadow recipe, rounded rows in the sidebar-menu idiom with neutral washes and a brand edge.',
        Page: MenuDemo
      },
      {
        id: "menubar",
        name: "Menubar",
        description: "Desktop-style application menus.",
        Page: MenubarDemo
      },
      {
        id: "navigation-menu",
        name: "Navigation menu",
        description: "Primary navigation with rich flyouts.",
        Page: NavigationMenuDemo
      },
      {
        id: "breadcrumb",
        name: "Breadcrumb",
        description: "Hierarchical location and parent links.",
        Page: BreadcrumbDemo
      },
      {
        id: "pagination",
        name: "Pagination",
        description: "Pagination cells from paginations.json - odd/even resting fills with capped previous/next corners per export.",
        Page: PaginationDemo
      },
      {
        id: "tabs",
        name: "Tabs",
        description: "Switch between related content views.",
        Page: TabsDemo
      },
      {
        id: "sidebar",
        name: "Sidebar",
        description: "Bounded application navigation and content layout - category items sit right of a vertical separator, and labels can collapse their category via the optional accordion prop on SidebarGroup.",
        Page: SidebarDemo
      }
    ]
  },
  {
    name: "Data display",
    entries: [
      {
        id: "avatar",
        name: "Avatar",
        description: "Profile images, fallbacks, and sizes.",
        Page: AvatarDemo
      },
      {
        id: "badge",
        name: "Badge",
        description: "Simple markers and numbered pills from badges.json (caption label, live brand fills).",
        Page: BadgeDemo
      },
      {
        id: "card",
        name: "Card",
        description: "Grouped content with header, body, and footer.",
        Page: CardDemo
      },
      {
        id: "table",
        name: "Table",
        description: "Structured tabular data and summaries.",
        Page: TableDemo
      },
      {
        id: "accordion",
        name: "Accordion",
        description: "Expandable sections for progressive disclosure.",
        Page: AccordionDemo
      },
      {
        id: "collapsible",
        name: "Collapsible",
        description: "A compact expandable content region.",
        Page: CollapsibleDemo
      },
      {
        id: "carousel",
        name: "Carousel",
        description: "Keyboard-accessible paged content.",
        Page: CarouselDemo
      },
      {
        id: "item",
        name: "Item / List",
        description: "Flexible rows with media, metadata, and actions.",
        Page: ItemDemo
      },
      {
        id: "empty",
        name: "Empty state",
        description: "Guidance and actions when content is absent.",
        Page: EmptyDemo
      },
      {
        id: "kbd",
        name: "Keyboard key",
        description: "Individual and grouped keyboard shortcuts.",
        Page: KbdDemo
      },
      {
        id: "aspect-ratio",
        name: "Aspect ratio",
        description: "Responsive proportional media containers.",
        Page: AspectRatioDemo,
        singleColumn: true
      }
    ]
  },
  {
    name: "Feedback",
    entries: [
      {
        id: "alert",
        name: "Alert",
        description: "Informational and destructive messages.",
        Page: AlertDemo
      },
      {
        id: "progress",
        name: "Progress",
        description: "Completion indicators for ongoing work.",
        Page: ProgressDemo
      },
      {
        id: "skeleton",
        name: "Skeleton",
        description: "Placeholder shapes for loading content.",
        Page: SkeletonDemo
      },
      {
        id: "spinner",
        name: "Spinner",
        description: "Indeterminate loading indicators.",
        Page: SpinnerDemo
      },
      {
        id: "toast",
        name: "Toast",
        description: "Provider-backed transient notifications and actions.",
        Page: ToastDemo,
        singleColumn: true
      },
      {
        id: "sonner",
        name: "Sonner",
        description: "Stacked notifications with status and actions.",
        Page: SonnerDemo,
        singleColumn: true
      }
    ]
  },
  {
    name: "Structure",
    entries: [
      {
        id: "separator",
        name: "Separator",
        description: "Horizontal and vertical visual dividers.",
        Page: SeparatorDemo
      },
      {
        id: "scroll-area",
        name: "Scroll area",
        description: "Bounded vertical and horizontal scrolling.",
        Page: ScrollAreaDemo,
        singleColumn: true
      },
      {
        id: "resizable",
        name: "Resizable panels",
        description: "Bounded split panes with draggable handles.",
        Page: ResizableDemo,
        singleColumn: true
      }
    ]
  },
  { name: "Content", entries: [] },
  {
    name: "Charts",
    entries: [
      {
        id: "chart",
        name: "Chart",
        description: "Configured data visualization, tooltip, and legend.",
        Page: ChartDemo
      }
    ]
  },
  { name: "Motion", entries: [] },
  { name: "Applied examples", entries: [] }
];
const NAV_GROUPS = RAW_NAV_GROUPS.map((group) => ({
  ...group,
  entries: [...group.entries].sort((a, b) => a.name.localeCompare(b.name))
}));
const ALL_ENTRIES = [
  OVERVIEW_ENTRY,
  ...NAV_GROUPS.flatMap((group) => group.entries)
];
const duplicateIds = ALL_ENTRIES.map((entry) => entry.id).filter(
  (id, index, ids) => ids.indexOf(id) !== index
);
if (duplicateIds.length > 0) {
  throw new Error(
    `Duplicate preview page id(s): ${[...new Set(duplicateIds)].join(
      ", "
    )}. Every page id must be unique across all nav groups.`
  );
}
export {
  ALL_ENTRIES,
  DESIGN_SYSTEM,
  NAV_GROUPS,
  OVERVIEW_ENTRY,
  isPrimitiveEntry
};
