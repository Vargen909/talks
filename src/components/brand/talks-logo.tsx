"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/cn";
import {
  TALKS_LOGO_LOCKUP_DIM,
  TALKS_LOGO_LOCKUP_SRC,
  TALKS_LOGO_MARK_DIM,
  TALKS_LOGO_MARK_SRC,
} from "@/lib/brand/talks-logo-assets";
import { TALKS_EASE } from "@/lib/motion/talks-motion";

/** Höjd per storlek — `w-auto` behåller proportioner enligt `TALKS_LOGO_*_ DIM` / beskuren `viewBox`. */
const markClass = {
  xs: "h-6 w-auto max-w-full sm:h-7",
  sm: "h-8 w-auto max-w-full sm:h-9",
  md: "h-9 w-auto max-w-full sm:h-10",
  lg: "h-11 w-auto max-w-full sm:h-12",
  xl: "h-14 w-auto max-w-full sm:h-16 md:h-[4.25rem]",
} as const;

const lockupClass = {
  xs: "h-9 w-auto max-w-full sm:h-11",
  sm: "h-12 w-auto max-w-full sm:h-14",
  md: "h-14 w-auto max-w-full sm:h-16",
  lg: "h-16 w-auto max-w-full sm:h-[4.5rem]",
  xl: "h-[4.5rem] w-auto max-w-full sm:h-24 md:h-28",
} as const;

const variantWrap = {
  default: "",
  white: "[filter:brightness(0)_invert(0.93)]",
  dark: "[filter:brightness(0)_invert(0.12)]",
} as const;

const monochromeWrap = "[filter:grayscale(1)_saturate(0.85)_contrast(1.05)]";

export type TalksLogoProps = {
  size?: keyof typeof markClass;
  /** `default` = mörk UI; `white` / `dark` för ljusa respektive mörka bakgrunder. */
  variant?: keyof typeof variantWrap;
  lockup?: boolean;
  animated?: boolean;
  align?: "center" | "start";
  className?: string;
  /** Neutral single-channel mark (t.ex. ljus panel). */
  monochrome?: boolean;
  /** Höj LCP-prioritet (splash, app header). */
  priority?: boolean;
};

/**
 * Optimerad mark/lockup från `public/brand/` (källa: `src/assets/brand/*.svg`).
 * `<img>` + explicit höjd: skarp skalning, inga stretch-artefakter, stabil layout.
 */
export function TalksLogo({
  size = "md",
  variant = "default",
  lockup = false,
  animated = false,
  align = "center",
  className,
  monochrome = false,
  priority = false,
}: TalksLogoProps) {
  const t = useTranslations("meta");
  const src = lockup ? TALKS_LOGO_LOCKUP_SRC : TALKS_LOGO_MARK_SRC;
  const dim = lockup ? TALKS_LOGO_LOCKUP_DIM : TALKS_LOGO_MARK_DIM;
  const dimClass = lockup ? lockupClass[size] : markClass[size];

  const img = (
    // eslint-disable-next-line @next/next/no-img-element -- vektor från /public
    <img
      src={src}
      width={dim.w}
      height={dim.h}
      alt=""
      decoding="async"
      draggable={false}
      fetchPriority={priority ? "high" : undefined}
      className={cn(
        "block shrink-0 object-contain object-left select-none [-webkit-tap-highlight-color:transparent]",
        dimClass,
      )}
    />
  );

  const wrapped = (
    <div
      className={cn(
        "inline-flex max-w-full",
        variant !== "default" && variantWrap[variant],
        monochrome && monochromeWrap,
      )}
    >
      {img}
    </div>
  );

  const inner = animated ? (
    <motion.div
      className="inline-flex max-w-full"
      initial={{ opacity: 0, scale: 0.985 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.85, ease: TALKS_EASE }}
    >
      {wrapped}
    </motion.div>
  ) : (
    wrapped
  );

  return (
    <div
      className={cn(
        "inline-flex max-w-full shrink-0",
        align === "center" ? "justify-center" : "justify-start",
        className,
      )}
      aria-label={t("wordmarkAriaLabel")}
      role="img"
    >
      {inner}
    </div>
  );
}
