"use client";
import { jsx } from "react/jsx-runtime";
import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import "./avatar.css";
const avatarVariants = cva(
  "pds-avatar relative flex shrink-0 overflow-hidden [width:var(--avatar-size)] [height:var(--avatar-size)]",
  {
    variants: {
      size: {
        xs: "[--avatar-size:var(--dim-mmm)] [font-size:var(--type-caption-size)]",
        default: "[--avatar-size:var(--dim-lll)] [font-size:var(--type-body2-size)]"
      },
      shape: {
        circle: "rounded-full",
        roundedSquare: "rounded-[var(--radius-md)]"
      },
      interactive: {
        static: "",
        interactive: "cursor-pointer hover-elevate active-elevate-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-[var(--opacity-disabled)]"
      }
    },
    defaultVariants: { size: "default", shape: "circle", interactive: "static" }
  }
);
const Avatar = React.forwardRef(({ className, size, shape, interactive, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Root,
  {
    ref,
    "data-slot": "avatar",
    "data-size": size,
    "data-shape": shape,
    "data-interactive": interactive === "interactive" ? true : void 0,
    ...interactive === "interactive" ? { role: "button", tabIndex: 0 } : {},
    className: cn(avatarVariants({ size, shape, interactive, className })),
    ...props
  }
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Image,
  {
    ref,
    className: cn("aspect-square h-full w-full [border-radius:inherit]", className),
    ...props
  }
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center [border-radius:inherit] [background-color:var(--pds-surface-canvas-bg)]",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
export {
  Avatar,
  AvatarFallback,
  AvatarImage
};
