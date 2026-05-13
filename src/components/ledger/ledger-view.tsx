"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import { AgreementDialog } from "@/components/agreement/agreement-dialog";
import { TalksTypingIndicator } from "@/components/brand/talks-typing-indicator";
import { MotionButton } from "@/components/ui/motion-button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { generateProtocolSummary } from "@/lib/memory/protocol-summary";
import { getProtocol } from "@/lib/mock-protocols";

type LedgerViewProps = {
  protocolId: string;
};

export function LedgerView({ protocolId }: LedgerViewProps) {
  const t = useTranslations("ledger");
  const tProtocol = useTranslations("protocol");
  const protocol = getProtocol(protocolId);
  const [agreementOpen, setAgreementOpen] = useState(false);
  const [agreementSurface, setAgreementSurface] = useState(false);

  const summary = useMemo(() => {
    if (!protocol) return "";
    return generateProtocolSummary(protocol.lastMessages);
  }, [protocol]);

  if (!protocol) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-titanium/70">
        {t("notFound")}
        <div className="mt-6">
          <Link
            href="/dashboard"
            className="text-sm uppercase tracking-[0.3em] text-champagne hover:text-champagne/80"
          >
            {t("back")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative min-h-[100dvh] bg-obsidian text-titanium transition-[filter] duration-500",
        agreementSurface && "blur-[1.5px]",
      )}
    >
      <AgreementDialog
        open={agreementOpen}
        onOpenChange={(open) => {
          setAgreementOpen(open);
          if (!open) {
            setAgreementSurface(false);
          }
        }}
      />

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 lg:flex-row lg:px-8">
        <main
          className={cn(
            "flex-1 space-y-6 rounded-3xl border border-white/10 bg-ether/70 p-6 lg:p-8",
            agreementSurface && "border-champagne/70 shadow-[0_0_0_1px_rgba(200,169,126,0.35)]",
          )}
        >
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-champagne/80">
                talks… / {t("title")}
              </p>
              <h1 className="text-2xl font-light">{protocol.title}</h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <motion.div whileTap={{ scale: 0.98 }}>
                <Link
                  href="/dashboard"
                  className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-titanium/70 transition-colors hover:border-white/30 hover:text-titanium"
                >
                  {t("dashboardNav")}
                </Link>
              </motion.div>
              <MotionButton
                type="button"
                className={cn(
                  "border px-4 py-2 text-xs uppercase tracking-[0.25em]",
                  agreementSurface
                    ? "border-champagne/70 bg-champagne/10 text-champagne"
                    : "border-white/15 text-titanium/80 hover:border-champagne/50 hover:text-champagne",
                )}
                onClick={() => {
                  if (agreementSurface) {
                    setAgreementOpen(false);
                    setAgreementSurface(false);
                  } else {
                    setAgreementSurface(true);
                    setAgreementOpen(true);
                  }
                }}
              >
                {agreementSurface ? t("exitAgreement") : t("agreementMode")}
              </MotionButton>
            </div>
          </header>

          <section className="rounded-2xl border border-white/10 bg-obsidian/40 p-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-champagne/80">
              {tProtocol("summaryLabel")}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-titanium/80">{summary}</p>
          </section>

          <section className="space-y-4">
            {protocol.lastMessages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-3 rounded-2xl border border-white/10 bg-obsidian/35 px-5 py-4 lg:grid-cols-[1fr_auto]"
              >
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-titanium/45">
                    {new Date(message.createdAt).toLocaleString("sv-SE")}
                  </p>
                  <p className="text-sm leading-relaxed text-titanium/85">{message.content}</p>
                </div>
                <div className="flex flex-col items-start gap-2 lg:items-end">
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.25em]",
                      message.verified_status
                        ? "border border-champagne/40 text-champagne"
                        : "border border-white/10 text-titanium/55",
                    )}
                  >
                    {message.verified_status ? tProtocol("verified") : tProtocol("pending")}
                  </span>
                  {message.agreement_id ? (
                    <span className="text-[10px] uppercase tracking-[0.25em] text-titanium/45">
                      {message.agreement_id}
                    </span>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </section>

          <footer className="flex items-center gap-3 border-t border-white/10 pt-4">
            <div className="relative flex-1">
              <div className="rounded-full border border-white/10 bg-obsidian/60 px-4 py-3 text-sm text-titanium/45">
                {t("composerPlaceholder")}
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-titanium/50">
              <span>{t("typing")}</span>
              <TalksTypingIndicator />
            </div>
          </footer>
        </main>

        <aside className="w-full shrink-0 space-y-4 lg:w-72">
          <div className="rounded-3xl border border-white/10 bg-ether/80 p-5">
            <p className="text-[10px] uppercase tracking-[0.3em] text-champagne/80">
              {t("timeline")}
            </p>
            <ul className="mt-4 space-y-3 text-sm text-titanium/75">
              {protocol.lastMessages.map((message) => (
                <li
                  key={`${message.id}-tl`}
                  className="flex flex-col gap-1 border-b border-white/5 pb-3 last:border-b-0"
                >
                  <span className="text-[11px] uppercase tracking-[0.2em] text-titanium/45">
                    {message.verified_status ? t("decisions") : t("files")}
                  </span>
                  <span className="leading-snug">{message.content}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
