"use client";
import { jsx } from "react/jsx-runtime";
import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
const avatarVariants = cva(
  "pds-avatar relative flex shrink-0 overflow-hidden rounded-full [width:var(--avatar-size)] [height:var(--avatar-size)]",
  {
    variants: {
      size: {
        xs: "[--avatar-size:var(--dim-mmm)] [font-size:var(--type-caption-size)]",
        default: "[--avatar-size:var(--dim-lll)] [font-size:var(--type-body2-size)]"
      }
    },
    defaultVariants: { size: "default" }
  }
);
const Avatar = React.forwardRef(({ className, size, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Root,
  {
    ref,
    "data-slot": "avatar",
    "data-size": size,
    className: cn(avatarVariants({ size, className })),
    ...props
  }
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Image,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full [background-color:var(--pds-surface-canvas-bg)]",
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
