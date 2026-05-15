"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

import { TalksSignalDots } from "@/components/brand/talks-signal-dots";
import { Link } from "@/i18n/navigation";
import { talksListItem, talksTapScale } from "@/lib/motion/talks-motion";
import type { ProtocolThread } from "@/lib/memory/types";
import { talksProtocolCardActionClass, talksProtocolIndexCardClass } from "@/lib/ui/talks-surfaces";

type ProtocolThreadCardProps = {
  protocol: ProtocolThread;
  index: number;
};

export function ProtocolThreadCard({ protocol, index }: ProtocolThreadCardProps) {
  const t = useTranslations("dashboard");
  const tProtocol = useTranslations("protocol");
  const motionProps = talksListItem(index);

  const lastInteractionLabel = useMemo(() => {
    const d = new Date(`${protocol.lastInteractionAt}T12:00:00`);
    if (Number.isNaN(d.getTime())) return protocol.lastInteractionAt;
    return d.toLocaleDateString("sv-SE", { dateStyle: "long" });
  }, [protocol.lastInteractionAt]);

  return (
    <motion.article
      initial={motionProps.initial}
      animate={motionProps.animate}
      transition={motionProps.transition}
      className={talksProtocolIndexCardClass}
    >
      {protocol.unreadEntryCount && protocol.unreadEntryCount > 0 ? (
        <div className="absolute right-6 top-6 sm:right-7 sm:top-7">
          <TalksSignalDots variant="unread" size="sm" label={t("unreadSignal")} />
        </div>
      ) : null}
      <div className="flex flex-col gap-2 pr-10 sm:pr-14">
        <div className="flex flex-wrap items-center gap-2">
          {protocol.protocolKind ? (
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.18em] text-champagne/60">
              {tProtocol(`kind.${protocol.protocolKind}`)}
            </span>
          ) : null}
          {protocol.protocolStatus ? (
            <span className="rounded-full border border-white/10 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.18em] text-titanium/48">
              {tProtocol(`status.${protocol.protocolStatus}`)}
            </span>
          ) : null}
        </div>
        <h2 className="text-base font-medium leading-snug tracking-tight text-titanium sm:text-lg">{protocol.title}</h2>
        <time
          dateTime={protocol.lastInteractionAt}
          className="block text-[10px] font-medium font-mono tabular-nums tracking-[0.12em] text-titanium/45"
        >
          {lastInteractionLabel}
        </time>
      </div>
      <p className="text-[13px] font-normal leading-[1.7] text-titanium/68 sm:text-sm">{protocol.summary}</p>
      <div className="flex items-center justify-between gap-4 border-t border-white/6 pt-5">
        <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-champagne/60">{tProtocol("summaryLabel")}</span>
        <motion.div whileTap={{ scale: talksTapScale }}>
          <Link href={`/ledger/${protocol.id}`} className={talksProtocolCardActionClass}>
            {t("openLedger")}
          </Link>
        </motion.div>
      </div>
    </motion.article>
  );
}
