"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { TalksSignalDots } from "@/components/brand/talks-signal-dots";
import type { CopilotAnalysisResult, CopilotInsight, CopilotInsightSeverity } from "@/lib/copilot/types";
import { cn } from "@/lib/cn";
import { talksTimelineEntry } from "@/lib/motion/talks-motion";
import { talksCopilotInsightCardClass, talksCopilotShellClass } from "@/lib/ui/talks-surfaces";

function severityRail(severity: CopilotInsightSeverity) {
  if (severity === "risk") return "border-l-rose-400/28";
  if (severity === "attention") return "border-l-champagne/38";
  return "border-l-indigo-400/22";
}

type ProtocolCopilotPanelProps = {
  analysis: CopilotAnalysisResult;
  /** Stagger index offset so Copilot cards follow summary motion rhythm. */
  motionOffset: number;
};

export function ProtocolCopilotPanel({ analysis, motionOffset }: ProtocolCopilotPanelProps) {
  const t = useTranslations("ledger.copilot");
  const tInsights = useTranslations("ledger.copilot.insights");
  const { mode, insights } = analysis;

  if (mode === "off") {
    return (
      <section className={talksCopilotShellClass}>
        <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-titanium/42">{t("title")}</p>
        <p className="mt-3 text-[13px] font-normal leading-relaxed text-titanium/55">{t("disabledBody")}</p>
      </section>
    );
  }

  return (
    <section className={talksCopilotShellClass}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-indigo-200/55">{t("title")}</p>
            {insights.length > 0 ? (
              <TalksSignalDots variant="thinking" size="sm" className="text-indigo-200/40" label={t("signalLabel")} />
            ) : null}
          </div>
          <p className="max-w-prose text-[13px] font-normal leading-relaxed text-titanium/62">{t("subtitle")}</p>
        </div>
        <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.22em] text-titanium/50">
          {t(`modeBadge.${mode}`)}
        </span>
      </div>

      <div className="mt-5 space-y-3">
        {insights.length === 0 ? (
          <p className="text-[13px] font-normal leading-relaxed text-titanium/50">{t("emptyState")}</p>
        ) : (
          insights.map((insight: CopilotInsight, index: number) => {
            const m = talksTimelineEntry(motionOffset + index);
            return (
              <motion.article
                key={insight.id}
                initial={m.initial}
                animate={m.animate}
                transition={m.transition}
                className={cn(talksCopilotInsightCardClass, severityRail(insight.severity))}
              >
                <p className="text-[13px] font-normal leading-[1.7] text-titanium/78">{tInsights(insight.code)}</p>
              </motion.article>
            );
          })
        )}
      </div>

      <p className="mt-5 border-t border-white/6 pt-4 text-[11px] font-normal leading-relaxed text-titanium/42">
        {t("privacyFootnote")}
      </p>
    </section>
  );
}
