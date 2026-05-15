"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";

import { TalksPageBrandHeader } from "@/components/brand/talks-page-brand-header";
import { Link } from "@/i18n/navigation";
import {
  listAgreementsNeedingMySignature,
  listAgreementsWaitingOnOthers,
} from "@/lib/agreement-platform/overview";
import { listCheckpointsAwaitingConfirmation, listPendingInvitationsAll } from "@/lib/protocol/mock-workspaces";
import { cn } from "@/lib/cn";
import {
  talksMutedNavControlClass,
  talksSummaryPanelClass,
  talksTimelineAsideItemClass,
} from "@/lib/ui/talks-surfaces";

export function SignaturesCenterView() {
  const t = useTranslations("signaturesCenter");
  const tNav = useTranslations("nav");
  const tProtocol = useTranslations("protocol");
  const mine = useMemo(() => listAgreementsNeedingMySignature(), []);
  const others = useMemo(() => listAgreementsWaitingOnOthers(), []);
  const checkpoints = useMemo(() => listCheckpointsAwaitingConfirmation(), []);
  const invites = useMemo(() => listPendingInvitationsAll(), []);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-5 py-10 sm:gap-12 sm:px-8 sm:py-14">
      <TalksPageBrandHeader
        logoSize="sm"
        title={<h1 className="text-[1.5rem] font-light leading-snug tracking-tight text-titanium sm:text-[1.85rem]">{t("title")}</h1>}
        description={<p className="text-[13px] font-normal leading-relaxed text-titanium/55 sm:text-[0.9375rem]">{t("subtitle")}</p>}
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <section className={cn(talksSummaryPanelClass, "space-y-4")}>
          <h2 className="text-[10px] font-medium uppercase tracking-[0.28em] text-champagne/58">{t("awaitingMe")}</h2>
          {mine.length === 0 ? (
            <p className="text-[13px] text-titanium/48">{t("emptyMe")}</p>
          ) : (
            <ul className="space-y-3">
              {mine.map((p) => (
                <li key={p.id} className={talksTimelineAsideItemClass}>
                  <p className="text-[13px] font-medium text-titanium/85">{p.title}</p>
                  <Link href={`/ledger/${p.id}`} className="mt-2 inline-block text-[10px] font-medium uppercase tracking-[0.22em] text-champagne/70">
                    {t("openAgreement")}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className={cn(talksSummaryPanelClass, "space-y-4")}>
          <h2 className="text-[10px] font-medium uppercase tracking-[0.28em] text-champagne/58">{t("awaitingOthers")}</h2>
          {others.length === 0 ? (
            <p className="text-[13px] text-titanium/48">{t("emptyOthers")}</p>
          ) : (
            <ul className="space-y-3">
              {others.map((p) => (
                <li key={p.id} className={talksTimelineAsideItemClass}>
                  <p className="text-[13px] font-medium text-titanium/85">{p.title}</p>
                  <Link href={`/ledger/${p.id}`} className="mt-2 inline-block text-[10px] font-medium uppercase tracking-[0.22em] text-champagne/70">
                    {t("openAgreement")}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section className={cn(talksSummaryPanelClass, "space-y-4")}>
        <h2 className="text-[10px] font-medium uppercase tracking-[0.28em] text-champagne/58">{t("checkpoints")}</h2>
        {checkpoints.length === 0 ? (
          <p className="text-[13px] text-titanium/48">{t("emptyCheckpoints")}</p>
        ) : (
          <ul className="space-y-3">
            {checkpoints.map((c) => (
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
        <h2 className="text-[10px] font-medium uppercase tracking-[0.28em] text-champagne/58">{t("invites")}</h2>
        {invites.length === 0 ? (
          <p className="text-[13px] text-titanium/48">{t("emptyInvites")}</p>
        ) : (
          <ul className="space-y-3">
            {invites.map((inv) => (
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

      <Link href="/dashboard" className={talksMutedNavControlClass}>
        {tNav("home")}
      </Link>
    </div>
  );
}
