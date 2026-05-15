"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";

import { BrandLockup } from "@/components/brand/brand-lockup";
import { DashboardEmptyState } from "@/components/dashboard/dashboard-empty-state";
import { ProtocolThreadCard } from "@/components/protocol/protocol-thread-card";
import { MotionButton } from "@/components/ui/motion-button";
import { Link } from "@/i18n/navigation";
import { mockProtocolCatalog } from "@/lib/adapters/memory-adapters";
import { cn } from "@/lib/cn";
import {
  allCopilotRecords,
  listCheckpointsAwaitingConfirmation,
  listPendingInvitationsAll,
  recentProtocolActivity,
  recentVerifiedDecisions,
} from "@/lib/protocol/mock-workspaces";
import { subscribeVolatileWorkspaces, clearVolatileWorkspaces } from "@/lib/protocol/volatile-workspaces";
import { TALKS_EASE, talksTapScale } from "@/lib/motion/talks-motion";
import {
  talksDialogContentClass,
  talksDialogOverlayClass,
  talksGhostDialogActionClass,
  talksMutedNavControlClass,
  talksPrimaryCtaClass,
  talksRecallFieldShellClass,
  talksSummaryPanelClass,
  talksTimelineAsideItemClass,
} from "@/lib/ui/talks-surfaces";

export function DashboardView() {
  const t = useTranslations("dashboard");
  const tProtocol = useTranslations("protocol");
  const tProduct = useTranslations("product");
  const [query, setQuery] = useState("");
  const [volatileTick, setVolatileTick] = useState(0);
  const [clearDialogOpen, setClearDialogOpen] = useState(false);
  const clearDialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => subscribeVolatileWorkspaces(() => setVolatileTick((x) => x + 1)), []);

  useEffect(() => {
    if (!clearDialogOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setClearDialogOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [clearDialogOpen]);

  useEffect(() => {
    if (!clearDialogOpen) return;
    const id = window.requestAnimationFrame(() => {
      clearDialogRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(id);
  }, [clearDialogOpen]);

  const protocols = useMemo(() => {
    void volatileTick;
    return mockProtocolCatalog.search(query);
  }, [query, volatileTick]);

  const pendingInvites = useMemo(() => {
    void volatileTick;
    return listPendingInvitationsAll();
  }, [volatileTick]);
  const pendingCheckpoints = useMemo(() => {
    void volatileTick;
    return listCheckpointsAwaitingConfirmation();
  }, [volatileTick]);
  const decisions = useMemo(() => {
    void volatileTick;
    return recentVerifiedDecisions();
  }, [volatileTick]);
  const activity = useMemo(() => {
    void volatileTick;
    return recentProtocolActivity();
  }, [volatileTick]);
  const copilotFeed = useMemo(() => {
    void volatileTick;
    return allCopilotRecords();
  }, [volatileTick]);

  function handleClearLocalProtocolsConfirm() {
    clearVolatileWorkspaces();
    setVolatileTick((x) => x + 1);
    setClearDialogOpen(false);
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-5 py-16 sm:gap-12 sm:px-8 sm:py-20">
      <header className="space-y-8 sm:space-y-10">
        <BrandLockup size="compact" align="start" showSlogan />
        <div className="flex flex-col gap-6 border-b border-white/6 pb-8 sm:flex-row sm:items-end sm:justify-between sm:pb-10">
          <div className="space-y-3">
            <h1 className="text-[1.65rem] font-light leading-snug tracking-tight text-titanium sm:text-[2rem]">
              {t("title")}
            </h1>
            <p className="max-w-2xl text-[13px] font-normal leading-relaxed text-titanium/55 sm:text-[0.9375rem]">
              {t("subtitle")}
            </p>
            <p className="max-w-2xl text-[12px] font-normal leading-relaxed text-titanium/42 sm:text-[13px]">
              {t("platformLead")}
            </p>
            <p className="max-w-2xl text-[11px] font-normal leading-relaxed text-titanium/38">{tProduct("positioning")}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              <Link href="/signeringar" className={talksMutedNavControlClass}>
                {t("quickSignatures")}
              </Link>
              <Link href="/valv" className={talksMutedNavControlClass}>
                {t("quickVault")}
              </Link>
              <Link href="/protokoll/ny" className={talksMutedNavControlClass}>
                {t("inviteCounterparty")}
              </Link>
            </div>
          </div>
          <motion.div whileTap={{ scale: talksTapScale }} className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <MotionButton
              type="button"
              className={talksMutedNavControlClass}
              onClick={() => setClearDialogOpen(true)}
            >
              {t("clearLocalProtocols")}
            </MotionButton>
            <Link href="/protokoll/ny" className={talksPrimaryCtaClass}>
              {t("createProtocol")}
            </Link>
          </motion.div>
        </div>
      </header>

      <p className="max-w-2xl text-[12px] font-normal leading-relaxed text-titanium/42">{t("clearLocalProtocolsHint")}</p>

      <motion.label className={cn(talksRecallFieldShellClass, "cursor-text")} whileTap={{ scale: talksTapScale }}>
        <span className="shrink-0 text-[10px] font-medium uppercase tracking-[0.26em] text-champagne/65">
          {t("recallField")}
        </span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="min-h-7 w-full flex-1 border-0 bg-transparent text-sm font-normal leading-relaxed text-titanium outline-none placeholder:text-titanium/28"
        />
      </motion.label>

      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-[10px] font-medium uppercase tracking-[0.28em] text-titanium/42">{t("activeProtocols")}</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-7">
          {protocols.length === 0 ? (
            <DashboardEmptyState />
          ) : (
            protocols.map((protocol, index) => (
              <ProtocolThreadCard key={protocol.id} protocol={protocol} index={index} />
            ))
          )}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <section className={cn(talksSummaryPanelClass, "space-y-4")}>
          <h2 className="text-[10px] font-medium uppercase tracking-[0.28em] text-champagne/58">{t("pendingConfirmations")}</h2>
          {pendingCheckpoints.length === 0 ? (
            <p className="text-[13px] font-normal leading-relaxed text-titanium/48">{t("pendingConfirmationsEmpty")}</p>
          ) : (
            <ul className="space-y-3">
              {pendingCheckpoints.map((c) => (
                <li key={c.id} className={talksTimelineAsideItemClass}>
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-titanium/40">{c.protocolId}</p>
                  <p className="mt-1 text-[13px] font-medium leading-snug text-titanium/80">{c.title}</p>
                  <p className="mt-1 text-[12px] font-normal leading-relaxed text-titanium/55">{c.summary}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className={cn(talksSummaryPanelClass, "space-y-4")}>
          <h2 className="text-[10px] font-medium uppercase tracking-[0.28em] text-champagne/58">{t("invitations")}</h2>
          {pendingInvites.length === 0 ? (
            <p className="text-[13px] font-normal leading-relaxed text-titanium/48">{t("invitationsEmpty")}</p>
          ) : (
            <ul className="space-y-3">
              {pendingInvites.map((inv) => (
                <li key={inv.id} className={talksTimelineAsideItemClass}>
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-titanium/40">{inv.protocolId}</p>
                  <p className="mt-1 text-[13px] font-normal leading-relaxed text-titanium/78">{inv.channelLabel}</p>
                  <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-champagne/55">
                    {tProtocol(`inviteStatus.${inv.status}`)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section className={cn(talksSummaryPanelClass, "space-y-4")}>
        <h2 className="text-[10px] font-medium uppercase tracking-[0.28em] text-champagne/58">{t("recentDecisions")}</h2>
        <ul className="space-y-3">
          {decisions.map((d) => (
            <li key={`${d.protocolId}-${d.at}`} className={talksTimelineAsideItemClass}>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-titanium/38">{d.protocolTitle}</p>
              <p className="mt-1 text-[13px] font-normal leading-relaxed text-titanium/78">{d.content}</p>
              <time className="mt-2 block font-mono text-[10px] tabular-nums text-titanium/35">
                {new Date(d.at).toLocaleString("sv-SE", { dateStyle: "short", timeStyle: "short" })}
              </time>
            </li>
          ))}
        </ul>
      </section>

      <section className={cn(talksSummaryPanelClass, "space-y-4")}>
        <h2 className="text-[10px] font-medium uppercase tracking-[0.28em] text-champagne/58">{t("recentActivity")}</h2>
        <ul className="space-y-2">
          {activity.map((row, idx) => (
            <li
              key={`${row.protocolId}-${row.at}-${idx}`}
              className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/5 py-2 last:border-0"
            >
              <span className="text-[12px] font-normal text-titanium/72">
                <span className="text-titanium/45">{row.protocolTitle}</span>
                <span className="mx-2 text-titanium/25">·</span>
                <span className="uppercase tracking-[0.14em] text-[10px] text-titanium/40">{row.label}</span>
              </span>
              <time className="font-mono text-[10px] tabular-nums text-titanium/35">
                {new Date(row.at).toLocaleString("sv-SE", { dateStyle: "short", timeStyle: "short" })}
              </time>
            </li>
          ))}
        </ul>
      </section>

      <section className={cn(talksSummaryPanelClass, "space-y-4")}>
        <h2 className="text-[10px] font-medium uppercase tracking-[0.28em] text-champagne/58">{t("copilotFeed")}</h2>
        <ul className="space-y-3">
          {copilotFeed.map((r) => (
            <li key={r.id} className={talksTimelineAsideItemClass}>
              <p className="text-[11px] font-medium text-titanium/78">{r.title}</p>
              <p className="mt-1 text-[12px] font-normal leading-relaxed text-titanium/58">{r.message}</p>
            </li>
          ))}
        </ul>
      </section>

      <AnimatePresence>
        {clearDialogOpen ? (
          <motion.div
            key="dashboard-clear-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.26, ease: TALKS_EASE }}
          >
            <button
              type="button"
              className={cn(talksDialogOverlayClass, "absolute inset-0 cursor-default border-0")}
              aria-label={t("clearLocalProtocolsOverlayAria")}
              onClick={() => setClearDialogOpen(false)}
            />
            <motion.div
              ref={clearDialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="dashboard-clear-local-title"
              tabIndex={-1}
              className={cn(talksDialogContentClass, "relative z-10 space-y-6")}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.4, ease: TALKS_EASE }}
            >
              <h2
                id="dashboard-clear-local-title"
                className="text-[1.1rem] font-light leading-snug tracking-tight text-titanium"
              >
                {t("clearLocalProtocolsDialogTitle")}
              </h2>
              <p className="text-[13px] font-normal leading-relaxed text-titanium/62">{t("clearLocalProtocolsDialogBody")}</p>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end sm:gap-4">
                <MotionButton
                  type="button"
                  className={cn(talksGhostDialogActionClass, "sm:w-auto sm:min-w-34")}
                  onClick={() => setClearDialogOpen(false)}
                >
                  {t("clearLocalProtocolsCancel")}
                </MotionButton>
                <MotionButton
                  type="button"
                  className={cn(
                    talksMutedNavControlClass,
                    "border-rose-400/18 text-rose-100/85 hover:border-rose-400/28 hover:bg-rose-500/6 hover:text-rose-50/90 sm:min-w-34",
                  )}
                  onClick={handleClearLocalProtocolsConfirm}
                >
                  {t("clearLocalProtocolsSubmit")}
                </MotionButton>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
