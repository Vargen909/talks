"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { cn } from "@/lib/cn";

const dotBase =
  "h-1.5 w-1.5 rounded-full border border-white/15 bg-champagne/90 transition-transform duration-300";

export function TalksWordmark({
  className,
  pulse = false,
}: {
  className?: string;
  pulse?: boolean;
}) {
  const t = useTranslations("meta");
  const [activeDot, setActiveDot] = useState<number | null>(null);

  return (
    <div
      className={cn("flex flex-col items-center gap-6 text-center", className)}
      aria-label={t("title")}
    >
      <div className="flex items-baseline gap-1">
        <span className="font-sans text-4xl font-light tracking-[0.35em] text-titanium sm:text-5xl">
          talks
        </span>
        <span className="inline-flex translate-y-[3px] gap-1.5" aria-hidden>
          {[0, 1, 2].map((index) => (
            <motion.button
              key={index}
              type="button"
              aria-label={`Punkt ${index + 1}`}
              onClick={() => {
                setActiveDot(index);
                window.setTimeout(() => setActiveDot(null), 420);
              }}
              animate={
                pulse
                  ? {
                      scale: [1, 1.35, 1],
                      opacity: [0.45, 1, 0.45],
                    }
                  : activeDot === index
                    ? { scale: 1.25, opacity: 1 }
                    : { scale: 1, opacity: 0.85 }
              }
              transition={
                pulse
                  ? {
                      duration: 1.6,
                      repeat: Infinity,
                      delay: index * 0.35,
                      ease: "easeInOut",
                    }
                  : { type: "spring", stiffness: 320, damping: 22 }
              }
              className={cn(
                dotBase,
                "cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne/70",
                index === 2 &&
                  "shadow-[0_0_22px_rgba(200,169,126,0.75)] ring-1 ring-champagne/40",
              )}
            />
          ))}
        </span>
      </div>
    </div>
  );
}
