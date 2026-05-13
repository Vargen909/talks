"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import * as React from "react";

import { cn } from "@/lib/cn";

export type MotionButtonProps = HTMLMotionProps<"button">;

export const MotionButton = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ className, children, ...props }, ref) => (
    <motion.button
      ref={ref}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 520, damping: 32 }}
      className={cn(
        "inline-flex items-center justify-center rounded-full outline-none transition-opacity duration-200 focus-visible:ring-2 focus-visible:ring-champagne/60 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian disabled:pointer-events-none disabled:opacity-40",
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  ),
);

MotionButton.displayName = "MotionButton";
