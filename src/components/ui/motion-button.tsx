"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import * as React from "react";

import { cn } from "@/lib/cn";
import { talksTapScale, talksTapTransition } from "@/lib/motion/talks-motion";

export type MotionButtonProps = HTMLMotionProps<"button">;

export const MotionButton = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ className, children, ...props }, ref) => (
    <motion.button
      ref={ref}
      whileTap={{ scale: talksTapScale }}
      transition={talksTapTransition}
      className={cn(
        "inline-flex items-center justify-center rounded-2xl outline-none",
        "transition-[transform,opacity,box-shadow] duration-500 ease-out",
        "focus-visible:ring-2 focus-visible:ring-champagne/28 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian",
        "disabled:pointer-events-none disabled:opacity-35",
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  ),
);

MotionButton.displayName = "MotionButton";
