"use client";

import type { ReactNode } from "react";

import { CinematicBackdrop } from "@/components/shell/cinematic-backdrop";
import { cn } from "@/lib/cn";

type TalksSplashScreenProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Full-viewport splash shell: cinematic backdrop, safe areas, overflow-safe.
 * Content (logo, copy, CTAs) is composed by the parent for adaptive layouts.
 */
export function TalksSplashScreen({ children, className }: TalksSplashScreenProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-dvh min-w-0 flex-col items-center justify-center overflow-x-hidden bg-obsidian",
        "px-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))]",
        "pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]",
        "py-[max(3rem,8svh)] text-titanium sm:px-6 sm:py-[max(4rem,10svh)]",
        className,
      )}
    >
      <CinematicBackdrop />
      <div className="relative z-10 flex w-full min-w-0 max-w-[min(100%,36rem)] flex-col items-center">{children}</div>
    </div>
  );
}
