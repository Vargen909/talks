"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { TALKS_EASE } from "@/lib/motion/talks-motion";

export default function LocaleTemplate({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className="min-w-0">{children}</div>;
  }

  return (
    <motion.div
      className="min-w-0"
      initial={{ opacity: 0.96, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: TALKS_EASE }}
    >
      {children}
    </motion.div>
  );
}
