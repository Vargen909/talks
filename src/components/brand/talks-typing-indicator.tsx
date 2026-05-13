"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/cn";

export function TalksTypingIndicator({ className }: { className?: string }) {
  return (
    <span
      className={cn("inline-flex items-center gap-1.5 text-champagne", className)}
      aria-hidden
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-champagne"
          animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
          transition={{
            duration: 1.1,
            repeat: Infinity,
            delay: i * 0.18,
            ease: "easeInOut",
          }}
          style={i === 2 ? { boxShadow: "0 0 18px rgba(200,169,126,0.65)" } : undefined}
        />
      ))}
    </span>
  );
}
