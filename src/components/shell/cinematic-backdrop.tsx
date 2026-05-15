"use client";

import { motion } from "framer-motion";

import { TALKS_EASE } from "@/lib/motion/talks-motion";

const noiseSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

/**
 * Shared cinematic layer: restrained champagne / titanium radials + film grain.
 * Keeps splash and future full-bleed views aligned with the constitution.
 */
export function CinematicBackdrop() {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_130%_90%_at_50%_-25%,rgba(201,171,130,0.055),transparent_58%),radial-gradient(circle_at_12%_22%,rgba(232,234,239,0.028),transparent_48%),radial-gradient(circle_at_92%_8%,rgba(201,171,130,0.04),transparent_42%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.1, ease: TALKS_EASE }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.028] mix-blend-overlay"
        style={{ backgroundImage: noiseSvg }}
      />
    </>
  );
}
