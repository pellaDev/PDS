import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
const SURFACE_SETS = {
  light: LIGHT_SET.boxes,
  dark: DARK_SET.boxes
};
import { Moon, Sun, Check, X, RotateCcw } from "lucide-react";
import { contrastRatio } from "./liveColor";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { ScrollArea } from "../components/ui/scroll-area";
import {
  Sidebar,
  SidebarProvider,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar
} from "../components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { DARK_SET, LIGHT_SET } from "./foundations";
import { SurfaceThemeContext } from "./parts";
import { ALL_ENTRIES, DESIGN_SYSTEM, NAV_GROUPS, OVERVIEW_ENTRY } from "./registry";
import logoAnimatedUrl from "./assets/logoAnimated.svg";
import { PAGE_INTROS } from "./intros";
import { PDS_DEFAULTS, PDS_FONTS, PDS_FONT_IDS, setPdsConfig, usePdsConfig } from "../config";
function readHashId() {
  const id = new URLSearchParams(window.location.hash.slice(1)).get("page");
  if (!id) {
    return OVERVIEW_ENTRY.id;
  }
  return ALL_ENTRIES.some((entry) => entry.id === id) ? id : OVERVIEW_ENTRY.id;
}
function useSelectedId() {
  const [selected, setSelected] = useState(readHashId);
  useEffect(() => {
    const onHashChange = () => setSelected(readHashId());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  const select = (id) => {
    setSelected(id);
    window.location.hash = new URLSearchParams({ page: id }).toString();
  };
  return [selected, select];
}
function NavigationItems({
  showOverview,
  groups,
  activeId,
  query,
  select
}) {
  return /* @__PURE__ */ jsxs("nav", { "aria-label": "Design system navigation", className: "space-y-3 py-1", children: [
    showOverview ? /* @__PURE__ */ jsx(
      SidebarMenuButton,
      {
        isActive: OVERVIEW_ENTRY.id === activeId,
        onClick: () => select(OVERVIEW_ENTRY.id),
        className: "mb-1 w-full",
        children: /* @__PURE__ */ jsx("span", { className: "min-w-0 flex-1 truncate", children: OVERVIEW_ENTRY.name })
      }
    ) : null,
    groups.map((group) => /* @__PURE__ */ jsxs(SidebarGroup, { children: [
      /* @__PURE__ */ jsx(SidebarGroupLabel, { children: group.name }),
      /* @__PURE__ */ jsx(SidebarGroupContent, { children: /* @__PURE__ */ jsx(SidebarMenu, { children: group.entries.map((entry) => /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsx(
        SidebarMenuButton,
        {
          isActive: entry.id === activeId,
          onClick: () => select(entry.id),
          children: /* @__PURE__ */ jsx("span", { className: "min-w-0 flex-1 truncate", children: entry.name })
        }
      ) }, entry.id)) }) })
    ] }, group.name)),
    !showOverview && groups.length === 0 ? /* @__PURE__ */ jsxs("p", { className: "px-2 py-4 [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] [letter-spacing:0.25px] font-light text-muted-foreground", children: [
      "No sections match \u201C",
      query,
      "\u201D."
    ] }) : null
  ] });
}
function CloseMobileNavOnSelect({ selectedId }) {
  const { setOpenMobile } = useSidebar();
  useEffect(() => {
    setOpenMobile(false);
  }, [selectedId, setOpenMobile]);
  return null;
}
const SIDEBAR_WIDTH_KEY = "pds-sidebar-width";
const SIDEBAR_MIN_REM = 14;
const SIDEBAR_MAX_REM = 24;
const SIDEBAR_DEFAULT_REM = 16;
function clampSidebarRem(rem) {
  return Math.min(SIDEBAR_MAX_REM, Math.max(SIDEBAR_MIN_REM, rem));
}
function readStoredSidebarWidth() {
  const stored = Number(window.localStorage.getItem(SIDEBAR_WIDTH_KEY));
  return Number.isFinite(stored) && stored >= SIDEBAR_MIN_REM && stored <= SIDEBAR_MAX_REM ? stored : SIDEBAR_DEFAULT_REM;
}
function ChromeSidebarEdge({ onWidthChange }) {
  const { state } = useSidebar();
  const ref = useRef(null);
  const drag = useRef(null);
  const [dragging, setDragging] = useState(false);
  const partsOf = (el) => {
    const wrapper = el.closest('[data-slot="sidebar-wrapper"]');
    if (!wrapper) return null;
    const gap = wrapper.querySelector('[data-slot="sidebar-gap"]');
    const container = wrapper.querySelector(
      '[data-slot="sidebar-container"]'
    );
    return { wrapper, gap, container };
  };
  const onPointerDown = (e) => {
    if (e.button !== 0) return;
    const el = ref.current;
    const parts = el ? partsOf(el) : null;
    if (!el || !parts?.gap) return;
    drag.current = {
      startX: e.clientX,
      startPx: parts.gap.getBoundingClientRect().width,
      moved: false
    };
    setDragging(true);
    el.setPointerCapture(e.pointerId);
    parts.gap.style.transition = "none";
    if (parts.container) parts.container.style.transition = "none";
    document.body.style.userSelect = "none";
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    const el = ref.current;
    if (!d || !el) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) < 3) return;
    d.moved = true;
    if (state === "collapsed") return;
    const parts = partsOf(el);
    if (!parts?.wrapper) return;
    const px = Math.min(SIDEBAR_MAX_REM * 16, Math.max(SIDEBAR_MIN_REM * 16, d.startPx + dx));
    parts.wrapper.style.setProperty("--sidebar-width", px + "px");
  };
  const endDrag = () => {
    const d = drag.current;
    const el = ref.current;
    if (!d || !el) return;
    drag.current = null;
    setDragging(false);
    document.body.style.userSelect = "";
    const parts = partsOf(el);
    if (parts?.gap) parts.gap.style.transition = "";
    if (parts?.container) parts.container.style.transition = "";
    if (d.moved && state !== "collapsed" && parts?.gap) {
      onWidthChange(clampSidebarRem(Math.round(parts.gap.getBoundingClientRect().width / 4) / 4));
    }
  };
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      if (state === "collapsed") return;
      e.preventDefault();
      const el = ref.current;
      const parts = el ? partsOf(el) : null;
      if (!parts?.gap) return;
      const currentRem = parts.gap.getBoundingClientRect().width / 16;
      onWidthChange(
        clampSidebarRem(Math.round((currentRem + (e.key === "ArrowRight" ? 1 : -1)) * 4) / 4)
      );
    }
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      "data-sidebar": "chrome-edge",
      role: "separator",
      "aria-label": "Resize sidebar: drag horizontally, arrow keys step by 1rem",
      "aria-orientation": "vertical",
      tabIndex: 0,
      title: "Drag to resize",
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onKeyDown,
      className: (
        /* Same geometry contract as .pds-resizable-handle: a 1px line exactly on the seam
           (left-full = aside padding-box right, i.e. over the border-r) plus a 4px centered
           hit zone (after:w-1). The visible cue is a 2px brand-primary line centered on the seam, shown
           on hover/drag/focus — no wide strip covering content. */
        "absolute inset-y-0 left-full z-20 hidden w-px cursor-ew-resize touch-none md:flex outline-none after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 before:pointer-events-none before:absolute before:inset-y-0 before:left-full before:w-[2px] before:-translate-x-1/2 before:bg-transparent" + (dragging ? " before:bg-primary" : "") + " hover:before:bg-primary focus-visible:before:bg-primary"
      )
    }
  );
}
function DesignSystemBrowser() {
  const [selectedId, select] = useSelectedId();
  const [query, setQuery] = useState("");
  const [dark, setDark] = useState(false);
  const cfg = usePdsConfig();
  const [sidebarWidthRem, setSidebarWidthRem] = useState(readStoredSidebarWidth);
  useEffect(() => {
    window.localStorage.setItem(SIDEBAR_WIDTH_KEY, String(sidebarWidthRem));
  }, [sidebarWidthRem]);
  const mobileNav = useRef(null);
  const mobileNavSummary = useRef(null);
  const normalizedQuery = query.trim().toLowerCase();
  useEffect(() => {
    const stored = window.localStorage.getItem("pds-theme");
    const queryTheme = new URLSearchParams(window.location.search).get("theme");
    const initial = queryTheme === "dark" || queryTheme !== "light" && stored === "dark";
    setDark(initial);
    document.documentElement.classList.toggle("dark", initial);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    window.localStorage.setItem("pds-theme", dark ? "dark" : "light");
  }, [dark]);
  const activeTheme = dark ? "dark" : "light";
  const setBrandFor = (theme, hex) => {
    if (theme === "dark") setPdsConfig({ darkBrand: hex });
    else setPdsConfig({ lightBrand: hex });
  };
  const cycleFont = () => {
    const next = PDS_FONT_IDS[(PDS_FONT_IDS.indexOf(cfg.font) + 1) % PDS_FONT_IDS.length];
    setPdsConfig({ font: next });
  };
  const filteredGroups = useMemo(
    () => NAV_GROUPS.map((group) => ({
      ...group,
      entries: group.name.toLowerCase().includes(normalizedQuery) ? group.entries : group.entries.filter(
        (entry) => `${entry.name} ${entry.description}`.toLowerCase().includes(normalizedQuery)
      )
    })).filter((group) => group.entries.length > 0),
    [normalizedQuery]
  );
  const active = ALL_ENTRIES.find((entry) => entry.id === selectedId) ?? OVERVIEW_ENTRY;
  const activeGroup = NAV_GROUPS.find(
    (group) => group.entries.some((entry) => entry.id === active.id)
  );
  const ActivePage = active.Page;
  const surfaceMode = dark ? "dark" : "light";
  const renderSurface = (slot) => /* @__PURE__ */ jsx(
    SurfaceThemeContext.Provider,
    {
      value: { mode: surfaceMode, surface: slot.surface, part: slot.part },
      children: /* @__PURE__ */ jsx(
        Suspense,
        {
          fallback: /* @__PURE__ */ jsx(
            "div",
            {
              role: "status",
              className: "rounded-lg border p-4 [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] [letter-spacing:0.25px] font-light text-muted-foreground",
              children: "Loading preview\u2026"
            }
          ),
          children: /* @__PURE__ */ jsx(ActivePage, {})
        }
      )
    }
  );
  const activeHex = (activeTheme === "dark" ? cfg.darkBrand : cfg.lightBrand).toLowerCase();
  const pickerAria = "Set " + activeTheme + " theme primary color";
  const pickerTitle = "Pick the " + activeTheme + " theme primary color";
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [active.id]);
  const showOverview = `${OVERVIEW_ENTRY.name} ${OVERVIEW_ENTRY.description}`.toLowerCase().includes(normalizedQuery);
  const selectPage = (id) => {
    select(id);
    if (mobileNav.current?.open) {
      mobileNav.current.removeAttribute("open");
      mobileNavSummary.current?.focus();
    }
  };
  return /* @__PURE__ */ jsxs(
    SidebarProvider,
    {
      className: "min-h-screen bg-background text-foreground flex-col md:flex-row",
      "data-pds-fieldstyle": cfg.fieldStyle,
      style: { "--sidebar-width": sidebarWidthRem + "rem" },
      children: [
        /* @__PURE__ */ jsxs(
          Sidebar,
          {
            collapsible: "offcanvas",
            "data-pds-surface": "base",
            className: "border-r [border-color:var(--pds-container-border-color)]",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "border-b px-5 py-5", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 [font-size:var(--type-h3-size)] [line-height:var(--type-h3-lh)] [letter-spacing:0.25px]", children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: logoAnimatedUrl,
                      alt: "",
                      "aria-hidden": "true",
                      className: "h-[1em] w-auto shrink-0"
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "font-light [color:var(--color-primary)]", children: DESIGN_SYSTEM.titlePrefix })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "mt-2 [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] [letter-spacing:0.25px] text-muted-foreground", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-light", children: DESIGN_SYSTEM.titleSuffix }),
                  /* @__PURE__ */ jsxs("span", { className: "font-light", children: [
                    " - ",
                    DESIGN_SYSTEM.version
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 rounded-md border bg-background px-2.5 py-1.5 transition-colors hover:bg-secondary", children: [
                    /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-center", title: pickerTitle, children: [
                      /* @__PURE__ */ jsxs("span", { className: "relative block size-6 shrink-0 cursor-pointer overflow-hidden rounded", children: [
                        /* @__PURE__ */ jsx(
                          "span",
                          {
                            "aria-hidden": "true",
                            className: "absolute inset-0",
                            style: { backgroundColor: activeHex }
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "color",
                            value: activeHex,
                            onChange: (event) => setBrandFor(activeTheme, event.target.value),
                            "aria-label": pickerAria,
                            className: "absolute inset-0 size-full cursor-pointer opacity-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsx("span", { className: "ml-2 font-mono uppercase [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)]", children: activeHex })
                    ] }),
                    (() => {
                      const s = SURFACE_SETS[activeTheme];
                      const rb = contrastRatio(activeHex, s[0].bg);
                      const ra = contrastRatio(activeHex, s[1].bg);
                      const ok = rb >= 3 && ra >= 3;
                      return /* @__PURE__ */ jsxs(
                        "span",
                        {
                          title: "base " + rb.toFixed(2) + " / alternate " + ra.toFixed(2),
                          className: "flex items-center gap-1 [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] [letter-spacing:0.25px] font-light",
                          style: { color: ok ? "#218A38" : "#EE1F25", marginLeft: "0.5rem" },
                          children: [
                            ok ? /* @__PURE__ */ jsx(Check, { size: 12 }) : /* @__PURE__ */ jsx(X, { size: 12 }),
                            /* @__PURE__ */ jsx("span", { children: Math.min(rb, ra).toFixed(2) })
                          ]
                        }
                      );
                    })(),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setBrandFor(
                          activeTheme,
                          activeTheme === "dark" ? PDS_DEFAULTS.darkBrand : PDS_DEFAULTS.lightBrand
                        ),
                        title: "Reset brand color to default",
                        "aria-label": "Reset brand color to default",
                        className: "flex size-6 shrink-0 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                        children: /* @__PURE__ */ jsx(RotateCcw, { size: 12 })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "mt-2 [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] [letter-spacing:0.25px] font-light text-muted-foreground", children: "You can select your custom Brand primary color for the current Theme. Check the contrast check in Color roles section for validate contrasts" }),
                  /* @__PURE__ */ jsx(
                    Tabs,
                    {
                      value: cfg.fieldStyle,
                      onValueChange: (value) => setPdsConfig({ fieldStyle: value }),
                      className: "mt-3",
                      children: /* @__PURE__ */ jsx(TabsList, { className: "w-full", "aria-label": "Default field style", children: ["fill", "outline"].map((style) => /* @__PURE__ */ jsx(TabsTrigger, { value: style, className: "flex-1 capitalize", children: style }, style)) })
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: cycleFont,
                      title: "Cycle the UI typeface (pds/config font option)",
                      className: "mt-2 w-full rounded-md border bg-background px-2.5 py-1.5 text-left [font-size:var(--type-button-size)] [line-height:var(--type-button-lh)] [letter-spacing:0.25px] font-light transition-colors hover:bg-secondary",
                      children: [
                        /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Font " }),
                        /* @__PURE__ */ jsx("span", { children: PDS_FONTS[cfg.font] })
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "p-4 pb-2", children: /* @__PURE__ */ jsx(
                Input,
                {
                  value: query,
                  onChange: (event) => setQuery(event.target.value),
                  "aria-label": "Search design system",
                  placeholder: "Search design system\u2026"
                }
              ) }),
              /* @__PURE__ */ jsx(ScrollArea, { className: "hidden min-h-0 flex-1 px-4 pb-4 md:block", children: /* @__PURE__ */ jsx(
                NavigationItems,
                {
                  showOverview,
                  groups: filteredGroups,
                  activeId: active.id,
                  query,
                  select: selectPage
                }
              ) }),
              /* @__PURE__ */ jsxs("details", { ref: mobileNav, className: "border-t px-4 py-3 md:hidden", children: [
                /* @__PURE__ */ jsxs(
                  "summary",
                  {
                    ref: mobileNavSummary,
                    className: "cursor-pointer [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] [letter-spacing:0.25px] font-light",
                    children: [
                      "Browse sections: ",
                      /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: active.name })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(ScrollArea, { className: "mt-3 h-64 pb-2", children: /* @__PURE__ */ jsx(
                  NavigationItems,
                  {
                    showOverview,
                    groups: filteredGroups,
                    activeId: active.id,
                    query,
                    select: selectPage
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsx(ChromeSidebarEdge, { onWidthChange: setSidebarWidthRem })
            ]
          }
        ),
        /* @__PURE__ */ jsx(CloseMobileNavOnSelect, { selectedId }),
        /* @__PURE__ */ jsx("main", { className: "min-w-0 flex-1 bg-secondary px-6 py-10 sm:px-10 lg:px-14", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-end gap-2", children: [
            /* @__PURE__ */ jsx(SidebarTrigger, { className: "md:hidden" }),
            /* @__PURE__ */ jsxs(
              Button,
              {
                size: "special",
                onClick: () => setDark((value) => !value),
                "aria-label": dark ? "Switch to light theme" : "Switch to dark theme",
                children: [
                  dark ? /* @__PURE__ */ jsx(Sun, { className: "size-4" }) : /* @__PURE__ */ jsx(Moon, { className: "size-4" }),
                  dark ? "Light" : "Dark"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx("header", { children: active.id === OVERVIEW_ENTRY.id ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 [font-size:var(--type-h1-size)] [line-height:var(--type-h1-lh)] [letter-spacing:0.25px]", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: logoAnimatedUrl,
                  alt: "",
                  "aria-hidden": "true",
                  className: "h-[1em] w-auto shrink-0"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "font-light [color:var(--color-primary)]", children: DESIGN_SYSTEM.titlePrefix })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 [font-size:var(--type-h3-size)] [line-height:var(--type-h3-lh)] [letter-spacing:0.25px] font-light text-muted-foreground", children: DESIGN_SYSTEM.titleSuffix }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-3xl [font-size:var(--type-subtitle1-size)] [line-height:var(--type-subtitle1-lh)] [letter-spacing:0.25px] font-light", children: DESIGN_SYSTEM.description }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-3xl [font-size:var(--type-body1-size)] [line-height:var(--type-body1-lh)] [letter-spacing:0.25px] font-light text-muted-foreground", children: DESIGN_SYSTEM.descriptionBody })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("p", { className: "[font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] [letter-spacing:0.25px] font-light text-muted-foreground", children: activeGroup?.name }),
            /* @__PURE__ */ jsx("h1", { className: "mt-2 [font-size:var(--type-body1-size)] [line-height:var(--type-body1-lh)] [letter-spacing:0.25px] font-light", children: active.name }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 max-w-2xl [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] [letter-spacing:0.25px] font-light text-muted-foreground", children: active.description }),
            (() => {
              const intro = PAGE_INTROS[active.id];
              if (!intro) return null;
              return /* @__PURE__ */ jsx("div", { className: "mt-3 max-w-2xl space-y-2 [font-size:var(--type-body2-size)] [line-height:var(--type-body2-lh)] [letter-spacing:0.25px] font-light text-muted-foreground", children: intro.split("\n\n").map((paragraph, index) => /* @__PURE__ */ jsx("p", { children: paragraph }, index)) });
            })()
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "space-y-5 pt-8", children: active.singleColumn ? /* @__PURE__ */ jsx(
            "section",
            {
              "aria-label": "Single column",
              "data-pds-surface": "base",
              className: "rounded-xl border bg-background [border-color:var(--pds-container-border-color)] p-4",
              children: renderSurface({ surface: "base", part: "single" })
            }
          ) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("div", { className: "grid items-start gap-5 lg:grid-cols-2", children: SURFACE_SETS[dark ? "dark" : "light"].map((box, index) => /* @__PURE__ */ jsxs(
              "section",
              {
                "data-pds-surface": index === 0 ? "base" : "alternate",
                "aria-label": (index === 0 ? "Default background" : "Alternative background") + " surface " + box.bg,
                className: (index === 0 ? "bg-background" : "bg-secondary") + " rounded-xl border [border-color:var(--pds-container-border-color)] p-4",
                children: [
                  active.id === "color-roles" && /* @__PURE__ */ jsxs(
                    "p",
                    {
                      className: (index === 0 ? "text-foreground" : "text-secondary-foreground") + " mb-3 font-mono [font-size:var(--type-caption-size)] [line-height:var(--type-caption-lh)] font-light",
                      children: [
                        index === 0 ? "Default background" : "Alternative background",
                        " \u2014 ",
                        box.bg
                      ]
                    }
                  ),
                  renderSurface({ surface: index === 0 ? "base" : "alternate", part: "dual" })
                ]
              },
              box.bg
            )) }),
            active.splitLayout && /* @__PURE__ */ jsx(
              "section",
              {
                "aria-label": "Single column",
                className: "rounded-xl border bg-background [border-color:var(--pds-container-border-color)] p-4",
                children: renderSurface({ surface: "base", part: "single" })
              }
            )
          ] }) })
        ] }) })
      ]
    }
  );
}
export {
  DesignSystemBrowser
};
