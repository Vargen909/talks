"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

import { groupLedgerEntriesByDay } from "@/lib/ledger/group-by-day";
import type { MemoryMessage } from "@/lib/memory/types";
import { TALKS_EASE } from "@/lib/motion/talks-motion";
import { talksLedgerDayAnchorClass } from "@/lib/ui/talks-surfaces";

import { ProtocolLedgerBlock } from "./protocol-ledger-block";

type LedgerProtocolTimelineProps = {
  messages: MemoryMessage[];
};

export function LedgerProtocolTimeline({ messages }: LedgerProtocolTimelineProps) {
  const dayGroups = useMemo(() => groupLedgerEntriesByDay(messages), [messages]);

  let motionIndex = 0;

  return (
    <div className="relative flex flex-col gap-10 sm:gap-12">
      {dayGroups.map((group, groupIndex) => (
        <section key={group.dayKey} className="relative">
          <div className="mb-6 flex justify-center sm:mb-8">
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: groupIndex * 0.04,
                duration: 0.55,
                ease: TALKS_EASE,
              }}
              className={talksLedgerDayAnchorClass}
            >
              <span className="max-w-[min(100%,28rem)] truncate">{group.dayLabel}</span>
            </motion.div>
          </div>

          <div className="relative flex flex-col gap-5 sm:gap-6">
            {group.items.map((item) => (
              <ProtocolLedgerBlock key={item.id} message={item} delayIndex={motionIndex++} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
