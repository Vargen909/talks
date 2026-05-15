"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/cn";
import { TALKS_EASE } from "@/lib/motion/talks-motion";

export type TalksSignalVariant =
  | "static"
  | "pulse"
  | "loading"
  | "typing"
  | "thinking"
  | "unread";

const dotBase =
  "rounded-full border border-white/8 bg-champagne/[0.88] shadow-[0_0_0_1px_rgba(201,171,130,0.1)]";

const sizes = {
  sm: "h-1 w-1 min-h-1 min-w-1",
  md: "h-1.5 w-1.5 min-h-1.5 min-w-1.5",
  lg: "h-2 w-2 min-h-2 min-w-2",
} as const;

export type TalksSignalDotsProps = {
  variant?: TalksSignalVariant;
  size?: keyof typeof sizes;
  className?: string;
  label?: string;
};

/**
 * Brand ellipsis — champagne dots used for loading, typing, cognition and unread.
 * Motion stays restrained (luxury-tech, not chat-app bounce).
 */
export function TalksSignalDots({
  variant = "static",
  size = "md",
  className,
  label,
}: TalksSignalDotsProps) {
  const reduceMotion = useReducedMotion();
  const dotClass = cn(dotBase, sizes[size]);

  if (variant === "static") {
    return (
      <span
        className={cn("inline-flex items-center gap-1.5 text-champagne", className)}
        aria-hidden={!label}
        aria-label={label}
        role={label ? "img" : undefined}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn(
              dotClass,
              "opacity-[0.82]",
              i === 2 && "shadow-[0_0_20px_rgba(201,171,130,0.38)] ring-1 ring-champagne/28",
            )}
          />
        ))}
      </span>
    );
  }

  if (variant === "unread") {
    return (
      <span
        className={cn("inline-flex items-center gap-1.5 text-champagne", className)}
        aria-hidden={!label}
        aria-label={label}
        role={label ? "status" : undefined}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className={cn(dotClass, i === 2 ? "opacity-100" : "opacity-45")}
            animate={
              reduceMotion
                ? { opacity: i === 2 ? 1 : 0.45, scale: 1 }
                : i === 2
                  ? { opacity: [0.65, 1, 0.65], scale: [1, 1.035, 1] }
                  : { opacity: [0.35, 0.55, 0.35] }
            }
            transition={{
              duration: i === 2 ? 2.8 : 3.4,
              repeat: reduceMotion ? 0 : Infinity,
              ease: TALKS_EASE,
            }}
            style={
              i === 2
                ? { boxShadow: "0 0 20px rgba(200,169,126,0.55)" }
                : undefined
            }
          />
        ))}
      </span>
    );
  }

  if (variant === "pulse") {
    return (
      <span className={cn("inline-flex items-center gap-1.5 text-champagne", className)} aria-hidden>
        {[0, 1, 2].map((index) => (
          <motion.span
            key={index}
            className={cn(
              dotClass,
              "will-change-transform",
              index === 2 && "shadow-[0_0_20px_rgba(201,171,130,0.4)] ring-1 ring-champagne/28",
            )}
            animate={
              reduceMotion
                ? { scale: 1, opacity: index === 2 ? 0.92 : 0.52 }
                : { scale: [1, 1.08, 1], opacity: [0.38, 0.95, 0.38] }
            }
            transition={{
              duration: 2,
              repeat: reduceMotion ? 0 : Infinity,
              delay: index * 0.36,
              ease: TALKS_EASE,
            }}
          />
        ))}
      </span>
    );
  }

  if (variant === "loading") {
    return (
      <span
        className={cn("inline-flex items-center gap-1.5 text-champagne", className)}
        aria-hidden={!label}
        aria-label={label}
        role={label ? "status" : undefined}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className={cn(dotClass, "will-change-transform", i === 2 && "ring-1 ring-champagne/30")}
            animate={
              reduceMotion
                ? { opacity: i === 0 ? 0.48 : i === 1 ? 0.68 : 1 }
                : { opacity: [0.12, 1, 0.12] }
            }
            transition={{
              duration: reduceMotion ? 0 : 1.05,
              repeat: reduceMotion ? 0 : Infinity,
              delay: i * 0.24,
              ease: TALKS_EASE,
            }}
            style={i === 2 ? { boxShadow: "0 0 18px rgba(201,171,130,0.38)" } : undefined}
          />
        ))}
      </span>
    );
  }

  if (variant === "typing" || variant === "thinking") {
    const duration = variant === "thinking" ? 1.75 : 1.15;
    const y = variant === "thinking" ? [-0.28, -0.65, -0.28] : [0, -0.85, 0];
    const opacityMin = variant === "thinking" ? 0.35 : 0.22;

    return (
      <span
        className={cn("inline-flex items-center gap-1.5 text-champagne", className)}
        aria-hidden={!label}
        aria-label={label}
        role={label ? "status" : undefined}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className={cn(dotClass, "will-change-transform")}
            animate={
              reduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: [opacityMin, 1, opacityMin], y }
            }
            transition={{
              duration,
              repeat: reduceMotion ? 0 : Infinity,
              delay: i * (variant === "thinking" ? 0.26 : 0.16),
              ease: TALKS_EASE,
            }}
            style={i === 2 ? { boxShadow: "0 0 14px rgba(201,171,130,0.42)" } : undefined}
          />
        ))}
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-1.5 text-champagne", className)} aria-hidden>
      {[0, 1, 2].map((i) => (
        <span key={i} className={cn(dotClass, "opacity-[0.82]")} />
      ))}
    </span>
  );
}
