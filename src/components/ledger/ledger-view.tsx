"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

import { AgreementDialog } from "@/components/agreement/agreement-dialog";
import { BrandLockup } from "@/components/brand/brand-lockup";
import { TalksBrandLoading } from "@/components/brand/talks-brand-loading";
import { TalksSignalDots } from "@/components/brand/talks-signal-dots";
import { LedgerProtocolTimeline } from "@/components/ledger/ledger-protocol-timeline";
import { ProtocolWorkspaceBanner } from "@/components/ledger/protocol-workspace-banner";
import { ProtocolCopilotPanel } from "@/components/ledger/protocol-copilot-panel";
import { ledgerBlockKindI18nKey, resolveLedgerBlockKind } from "@/components/ledger/protocol-ledger-block";
import { MotionButton } from "@/components/ui/motion-button";
import { Link } from "@/i18n/navigation";
import type { ProtocolThread } from "@/lib/memory/types";
import { mockProtocolCatalog, mockProtocolSummary } from "@/lib/adapters/memory-adapters";
import { mockProtocolCopilot } from "@/lib/adapters/copilot-adapter";
import { cn } from "@/lib/cn";
import { groupLedgerEntriesByDay } from "@/lib/ledger/group-by-day";
import { protocolWorkspaceToThread } from "@/lib/protocol/ledger-bridge";
import { getProtocolWorkspace } from "@/lib/mock-protocols";
import { listVolatileWorkspaces } from "@/lib/protocol/volatile-workspaces";
import { talksTapScale } from "@/lib/motion/talks-motion";
import {
  talksAgreementToggleActiveClass,
  talksAgreementToggleIdleClass,
  talksComposerFrameClass,
  talksComposerShellClass,
  talksEmptyPanelClass,
  talksLedgerAsideClass,
  talksLedgerMainClass,
  talksMutedNavControlClass,
  talksSummaryPanelClass,
  talksTimelineAsideItemClass,
} from "@/lib/ui/talks-surfaces";

type LedgerViewProps = {
  protocolId: string;
};

export function LedgerView({ protocolId }: LedgerViewProps) {
  const t = useTranslations("ledger");
  const tProtocol = useTranslations("protocol");
  const [mounted, setMounted] = useState(false);
  const [volatileThread, setVolatileThread] = useState<ProtocolThread | undefined>(undefined);

  const catalogProtocol = useMemo(() => mockProtocolCatalog.findById(protocolId), [protocolId]);

  useEffect(() => {
    listVolatileWorkspaces();
    queueMicrotask(() => {
      if (!catalogProtocol) {
        const ws = getProtocolWorkspace(protocolId);
        setVolatileThread(ws ? protocolWorkspaceToThread(ws) : undefined);
      } else {
        setVolatileThread(undefined);
      }
      setMounted(true);
    });
  }, [catalogProtocol, protocolId]);

  const protocol = catalogProtocol ?? volatileThread;

  const [agreementOpen, setAgreementOpen] = useState(false);
  const [agreementSurface, setAgreementSurface] = useState(false);
  const summary = useMemo(() => {
    if (!protocol) return "";
    return mockProtocolSummary.summarize(protocol.lastMessages);
  }, [protocol]);

  const timelineAsideItems = useMemo(() => {
    if (!protocol) return [];
    return groupLedgerEntriesByDay(protocol.lastMessages).flatMap((g) => g.items);
  }, [protocol]);

  const workspace = useMemo(() => mockProtocolCatalog.findWorkspaceById(protocolId) ?? null, [protocolId]);
  const copilotAnalysis = useMemo(() => {
    if (!protocol) return null;
    return mockProtocolCopilot.analyze(protocol);
  }, [protocol]);

  if (!protocol) {
    if (!mounted) {
      return (
        <div className="mx-auto flex min-h-[70dvh] max-w-lg flex-col justify-center px-5 py-16 sm:px-8">
          <div className={cn("flex flex-col items-center", talksEmptyPanelClass)}>
            <TalksBrandLoading dense minHeight="0" className="py-0" />
            <p className="mt-6 text-sm font-normal leading-relaxed text-titanium/55">{t("loadingLocal")}</p>
          </div>
        </div>
      );
    }
    return (
      <div className="mx-auto flex min-h-[70dvh] max-w-lg flex-col justify-center px-5 py-16 sm:px-8">
        <div className={cn("flex flex-col items-center", talksEmptyPanelClass)}>
          <TalksSignalDots variant="static" size="md" className="mb-6 text-champagne/80" />
          <p className="text-sm font-normal leading-relaxed text-titanium/80">{t("notFound")}</p>
          <p className="mt-3 max-w-sm text-[13px] font-normal leading-relaxed text-titanium/48">{t("notFoundHint")}</p>
          <motion.div className="mt-10" whileTap={{ scale: talksTapScale }}>
            <Link href="/dashboard" className={talksMutedNavControlClass}>
              {t("back")}
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative min-h-dvh bg-obsidian text-titanium transition-[filter] duration-700 ease-out",
        agreementSurface && "brightness-[0.98]",
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

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 sm:gap-10 sm:px-7 sm:py-14 lg:flex-row lg:gap-10 lg:px-10">
        <main
          className={cn(
            talksLedgerMainClass,
            agreementSurface &&
              "border-champagne/22 shadow-[0_0_0_1px_rgba(201,171,130,0.12),0_0_72px_-14px_rgba(201,171,130,0.1)]",
          )}
        >
          <header className="flex flex-col gap-8 border-b border-white/6 pb-8 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <div className="space-y-4">
              <BrandLockup size="compact" align="start" showSlogan />
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-titanium/38">
                  {t("title")} · {protocol.id}
                </p>
                <h1 className="mt-2 text-xl font-light leading-snug tracking-tight text-titanium sm:text-2xl">
                  {protocol.title}
                </h1>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 sm:justify-end">
              <motion.div whileTap={{ scale: talksTapScale }}>
                <Link href="/dashboard" className={talksMutedNavControlClass}>
                  {t("dashboardNav")}
                </Link>
              </motion.div>
              <MotionButton
                type="button"
                className={agreementSurface ? talksAgreementToggleActiveClass : talksAgreementToggleIdleClass}
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

          {workspace ? <ProtocolWorkspaceBanner workspace={workspace} /> : null}

          <section className={talksSummaryPanelClass}>
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-champagne/62">
              {tProtocol("summaryLabel")}
            </p>
            <p className="mt-3 text-[13px] font-normal leading-relaxed text-titanium/72 sm:text-sm">{summary}</p>
          </section>

          {copilotAnalysis ? <ProtocolCopilotPanel analysis={copilotAnalysis} motionOffset={2} /> : null}

          <section>
            <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.28em] text-titanium/42">{t("entries")}</p>
            <LedgerProtocolTimeline messages={protocol.lastMessages} />
          </section>

          <footer className="border-t border-white/6 pt-8">
            <div className={talksComposerFrameClass}>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <div
                  className={cn(
                    talksComposerShellClass,
                    "flex-1 border-white/8 bg-white/[0.02] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]",
                  )}
                >
                  <p className="text-[12px] font-normal leading-relaxed text-titanium/40 sm:text-sm">
                    {t("composerPlaceholder")}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3.5 text-[10px] font-medium uppercase tracking-[0.2em] text-titanium/42 sm:text-[11px]">
                  <TalksSignalDots variant="thinking" size="sm" />
                  <span className="max-w-[11rem] leading-snug sm:max-w-none">{t("memoryIndexing")}</span>
                </div>
              </div>
            </div>
          </footer>
        </main>

        <aside className="flex w-full shrink-0 flex-col gap-6 lg:w-80">
          {workspace && workspace.agreementCheckpoints.length > 0 ? (
            <div className={talksLedgerAsideClass}>
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-champagne/62">{t("checkpointsAside")}</p>
              <ul className="mt-4 space-y-3">
                {workspace.agreementCheckpoints.map((c) => (
                  <li key={c.id} className={talksTimelineAsideItemClass}>
                    <span className="text-[11px] font-medium leading-snug text-titanium/78">{c.title}</span>
                    <span className="mt-1.5 block text-[10px] font-medium uppercase tracking-[0.18em] text-titanium/40">
                      {t(`checkpointStatus.${c.status}`)}
                    </span>
                    <span className="mt-2 block text-[12px] font-normal leading-relaxed text-titanium/55">{c.summary}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className={talksLedgerAsideClass}>
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-champagne/62">{t("timeline")}</p>
            <p className="mt-2 text-[10px] font-normal leading-relaxed text-titanium/38">{t("timelineCaption")}</p>
            <ul className="mt-6 space-y-3">
              {timelineAsideItems.map((message) => {
                const kind = resolveLedgerBlockKind(message);
                return (
                  <li key={`${message.id}-tl`} className={talksTimelineAsideItemClass}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-champagne/52">
                        {t(ledgerBlockKindI18nKey(kind))}
                      </span>
                      <time
                        dateTime={message.createdAt}
                        className="font-mono text-[10px] font-medium tabular-nums tracking-[0.1em] text-titanium/35"
                      >
                        {new Date(message.createdAt).toLocaleString("sv-SE", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </time>
                    </div>
                    <span className="mt-2 block text-[10px] font-medium uppercase tracking-[0.18em] text-titanium/38">
                      {message.verified_status ? t("sealedMemory") : t("awaitingSeal")}
                    </span>
                    <span className="mt-1.5 block text-[13px] font-normal leading-snug text-titanium/75">
                      {message.blockTitle ? (
                        <>
                          <span className="text-titanium/55">{message.blockTitle}</span>
                          <span className="mx-1.5 text-titanium/30">·</span>
                        </>
                      ) : null}
                      {message.content}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
