"use client";

import { TalksLogo } from "@/components/brand/talks-logo";

import { cn } from "@/lib/cn";

type BrandLockupProps = {
  pulse?: boolean;
  size?: "hero" | "compact";
  showSlogan?: boolean;
  align?: "center" | "start";
  className?: string;
  priority?: boolean;
  monochrome?: boolean;
};

/** Visuell lockup: officiell SVG (`/public/brand/`) — med eller utan inbyggd tagline. */
export function BrandLockup({
  pulse = false,
  size = "compact",
  showSlogan = true,
  align = "center",
  className,
  priority = false,
  monochrome = false,
}: BrandLockupProps) {
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "start" ? "items-start text-left" : "items-center text-center",
        className,
      )}
    >
      <TalksLogo
        lockup={showSlogan}
        size={size === "hero" ? "xl" : "sm"}
        animated={pulse}
        align={align}
        priority={priority}
        monochrome={monochrome}
      />
    </div>
  );
}
