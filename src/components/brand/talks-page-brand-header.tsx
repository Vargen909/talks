"use client";

import type { ReactNode } from "react";

import { TalksLogo } from "@/components/brand/talks-logo";
import { cn } from "@/lib/cn";

export type TalksPageBrandHeaderProps = {
  /** Primary heading block (typically `h1` + classes). */
  title: ReactNode;
  /** Supporting copy under the title. */
  description?: ReactNode;
  /** Optional third line (product notes, disclaimers). */
  footer?: ReactNode;
  /** Mark-only wordmark for dense workspace headers. */
  logoSize?: "xs" | "sm" | "md";
  className?: string;
};

/**
 * Consistent page chrome: official mark + typographic stack.
 * Mobile: logo row then titles; desktop: mark and titles align in one calm band.
 */
export function TalksPageBrandHeader({
  title,
  description,
  footer,
  logoSize = "sm",
  className,
}: TalksPageBrandHeaderProps) {
  return (
    <header
      className={cn(
        "flex min-w-0 flex-col gap-5 border-b border-white/6 pb-8 sm:flex-row sm:items-start sm:gap-8 sm:pb-10",
        className,
      )}
    >
      <div className="flex shrink-0 justify-start sm:pt-0.5">
        <TalksLogo size={logoSize} align="start" lockup={false} className="opacity-[0.9]" />
      </div>
      <div className="min-w-0 flex-1 space-y-3">
        <div className="min-w-0 space-y-3">{title}</div>
        {description ? <div className="max-w-2xl">{description}</div> : null}
        {footer}
      </div>
    </header>
  );
}
