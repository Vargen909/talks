"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/cn";
import type { LedgerBlockKind, MemoryMessage } from "@/lib/memory/types";
import { talksTimelineEntry } from "@/lib/motion/talks-motion";
import {
  talksLedgerBlockEventClass,
  talksTimelineEntryCardClass,
} from "@/lib/ui/talks-surfaces";

export function resolveLedgerBlockKind(message: MemoryMessage): LedgerBlockKind {
  return message.blockKind ?? "message";
}

export function ledgerBlockKindI18nKey(kind: LedgerBlockKind): `blockKinds.${LedgerBlockKind}` {
  return `blockKinds.${kind}`;
}

function surfaceForKind(kind: LedgerBlockKind): string {
  switch (kind) {
    case "timeline_event":
      return talksLedgerBlockEventClass;
    case "verified_decision":
    case "signed_confirmation":
      return cn(
        talksTimelineEntryCardClass,
        "border-l-[3px] border-l-champagne/35 border-white/10 bg-gradient-to-b from-champagne/[0.06] to-transparent",
      );
    case "agreement_checkpoint":
      return cn(
        talksTimelineEntryCardClass,
        "border-champagne/15 bg-gradient-to-b from-champagne/[0.04] to-transparent",
      );
    case "ai_summary":
      return cn(
        talksTimelineEntryCardClass,
        "border-white/12 bg-gradient-to-b from-white/[0.06] to-ether/20",
      );
    case "uploaded_file":
      return cn(
        talksTimelineEntryCardClass,
        "border-white/10 bg-gradient-to-br from-white/[0.05] via-transparent to-ether/25",
      );
    case "semantic_highlight":
      return cn(
        talksTimelineEntryCardClass,
        "border-l-[3px] border-l-white/25 border-white/10",
      );
    case "protocol_annotation":
      return cn(
        talksTimelineEntryCardClass,
        "border-white/10 bg-gradient-to-b from-indigo-500/[0.04] to-transparent",
      );
    case "copilot_insight":
      return cn(
        talksTimelineEntryCardClass,
        "border-l-[2px] border-l-indigo-400/28 border-white/10 bg-gradient-to-b from-indigo-500/[0.05] to-transparent",
      );
    case "message":
      return talksTimelineEntryCardClass;
  }
}

function railClassFor(message: MemoryMessage, kind: LedgerBlockKind): string {
  if (kind === "timeline_event") {
    return "w-px shrink-0 self-stretch bg-gradient-to-b from-white/20 via-white/8 to-transparent";
  }
  if (kind === "copilot_insight") {
    return "w-[3px] shrink-0 self-stretch rounded-full bg-gradient-to-b from-indigo-300/35 via-indigo-400/15 to-transparent";
  }
  if (message.verified_status) {
    return "w-[3px] shrink-0 self-stretch rounded-full bg-gradient-to-b from-champagne/50 via-champagne/22 to-champagne/8 shadow-[0_0_18px_rgba(201,171,130,0.22)]";
  }
  return "w-[3px] shrink-0 self-stretch rounded-full bg-gradient-to-b from-white/18 to-white/[0.06]";
}

type ProtocolLedgerBlockProps = {
  message: MemoryMessage;
  delayIndex: number;
};

export function ProtocolLedgerBlock({ message, delayIndex }: ProtocolLedgerBlockProps) {
  const t = useTranslations("ledger");
  const kind = resolveLedgerBlockKind(message);
  const surface = surfaceForKind(kind);
  const m = talksTimelineEntry(delayIndex);

  return (
    <motion.article
      initial={m.initial}
      animate={m.animate}
      transition={m.transition}
      className={cn(surface, kind === "timeline_event" && "motion-safe:transition-[border-color,box-shadow] duration-700")}
    >
      <div className="flex gap-4 sm:gap-5">
        <div className={railClassFor(message, kind)} aria-hidden />
        <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
          <div className="min-w-0 flex-1 space-y-2.5">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-champagne/58">
                {t(ledgerBlockKindI18nKey(kind))}
              </span>
              <time
                dateTime={message.createdAt}
                className="font-mono text-[11px] font-medium tabular-nums tracking-[0.08em] text-titanium/42"
              >
                {new Date(message.createdAt).toLocaleString("sv-SE", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </time>
            </div>
            {message.blockTitle ? (
              <p className="text-[12px] font-medium leading-snug tracking-tight text-titanium/78">{message.blockTitle}</p>
            ) : null}
            {kind === "uploaded_file" && message.artifactLabel ? (
              <p className="inline-flex max-w-full items-center rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium tracking-wide text-titanium/72">
                {message.artifactLabel}
              </p>
            ) : null}
            <p className="text-[13px] font-normal leading-[1.75] text-titanium/86 sm:text-sm">{message.content}</p>
          </div>
          <div className="flex shrink-0 flex-col items-start gap-1.5 border-t border-white/6 pt-3 sm:border-t-0 sm:border-l sm:pl-6 sm:pt-0">
            <span
              className={cn(
                "text-[10px] font-medium uppercase tracking-[0.2em]",
                message.verified_status ? "text-champagne/78" : "text-titanium/42",
              )}
            >
              {message.verified_status ? t("sealedMemory") : t("awaitingSeal")}
            </span>
            {message.agreement_id ? (
              <span className="text-[10px] font-medium tabular-nums tracking-[0.12em] text-titanium/38">{message.agreement_id}</span>
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
