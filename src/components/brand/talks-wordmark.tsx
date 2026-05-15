"use client";

/**
 * Legacy wrapper — `TalksLogo` läser officiell SVG under `/public/brand/`.
 * Written product name elsewhere is always "talks" without dots — see project rules.
 */
import { TalksLogo } from "@/components/brand/talks-logo";
import { cn } from "@/lib/cn";

type TalksWordmarkProps = {
  className?: string;
  pulse?: boolean;
  size?: "hero" | "compact";
  align?: "center" | "start";
};

export function TalksWordmark({ className, pulse = false, size = "hero", align = "center" }: TalksWordmarkProps) {
  return (
    <TalksLogo
      className={cn(className)}
      size={size === "hero" ? "xl" : "sm"}
      lockup={false}
      animated={pulse}
      align={align}
    />
  );
}
