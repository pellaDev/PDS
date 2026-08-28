/* GENERATED FROM tokens.json -- DO NOT EDIT. Run scripts/build-tokens.mjs. */
// Portable design tokens (colors as hex). Web consumes the theme via
// src/index.css; mobile (Expo) and any other platform import this object so the
// whole product shares one source of truth.
export const tokens = {
  "color": {
    "light": {
      "background": "#F9F9F9",
      "foreground": "#1B1B1B",
      "border": "#E4E3E3",
      "card": "#FFFFFF",
      "cardForeground": "#1B1B1B",
      "popover": "#FFFFFF",
      "popoverForeground": "#1B1B1B",
      "primary": "#204384",
      "primaryForeground": "#FFFFFF",
      "secondary": "#E4E3E3",
      "secondaryForeground": "#1B1B1B",
      "muted": "#E4E3E3",
      "mutedForeground": "#383838",
      "accent": "#CFEC14",
      "accentForeground": "#1B1B1B",
      "destructive": "#EE1F25",
      "destructiveForeground": "#FFFFFF",
      "input": "#E4E3E3",
      "ring": "#204384",
      "chart1": "#204384",
      "chart2": "#218A38",
      "chart3": "#CFEC14",
      "chart4": "#EE1F25",
      "chart5": "#919191",
      "sidebar": "#FFFFFF",
      "sidebarForeground": "#383838",
      "sidebarBorder": "#E4E3E3",
      "sidebarPrimary": "#204384",
      "sidebarPrimaryForeground": "#FFFFFF",
      "sidebarAccent": "#CFEC14",
      "sidebarAccentForeground": "#1B1B1B",
      "sidebarRing": "#204384"
    },
    "dark": {
      "background": "#1B1B1B",
      "foreground": "#F9F9F9",
      "border": "#383838",
      "card": "#383838",
      "cardForeground": "#F9F9F9",
      "popover": "#383838",
      "popoverForeground": "#F9F9F9",
      "primary": "#6C8FCB",
      "primaryForeground": "#1B1B1B",
      "secondary": "#383838",
      "secondaryForeground": "#F9F9F9",
      "muted": "#383838",
      "mutedForeground": "#E4E3E3",
      "accent": "#CFEC14",
      "accentForeground": "#1B1B1B",
      "destructive": "#EE1F25",
      "destructiveForeground": "#FFFFFF",
      "input": "#383838",
      "ring": "#CFEC14",
      "chart1": "#6C8FCB",
      "chart2": "#5BB86B",
      "chart3": "#CFEC14",
      "chart4": "#FF6B6F",
      "chart5": "#BDBDBD",
      "sidebar": "#1B1B1B",
      "sidebarForeground": "#F9F9F9",
      "sidebarBorder": "#383838",
      "sidebarPrimary": "#6C8FCB",
      "sidebarPrimaryForeground": "#1B1B1B",
      "sidebarAccent": "#CFEC14",
      "sidebarAccentForeground": "#1B1B1B",
      "sidebarRing": "#CFEC14"
    }
  },
  "fontFamily": {
    "sans": [
      "Roboto",
      "Arial",
      "sans-serif"
    ],
    "serif": [
      "Georgia",
      "serif"
    ],
    "mono": [
      "Menlo",
      "monospace"
    ]
  },
  "radius": "0.75rem",
  "spacing": "0.25rem"
} as const;

export type Tokens = typeof tokens;
export default tokens;
