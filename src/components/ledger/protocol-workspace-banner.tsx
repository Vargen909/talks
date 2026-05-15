"use client";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/cn";
import type { Protocol } from "@/lib/protocol/domain-types";
import { talksSummaryPanelClass } from "@/lib/ui/talks-surfaces";

type ProtocolWorkspaceBannerProps = {
  workspace: Protocol;
};

export function ProtocolWorkspaceBanner({ workspace }: ProtocolWorkspaceBannerProps) {
  const t = useTranslations("protocol");

  const pendingInvites = workspace.invitations.filter(
    (i) => i.status === "awaiting_response" || i.status === "sent",
  ).length;

  return (
    <section className={cn(talksSummaryPanelClass, "space-y-5")}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-champagne/58">{t("workspaceLabel")}</p>
          <p className="text-[13px] font-normal leading-relaxed text-titanium/72">
            <span className="text-titanium/50">{t("kindLabel")}:</span>{" "}
            <span className="text-titanium/88">{t(`kind.${workspace.kind}`)}</span>
            <span className="mx-2 text-titanium/25">·</span>
            <span className="text-titanium/50">{t("statusLabel")}:</span>{" "}
            <span className="text-titanium/88">{t(`status.${workspace.status}`)}</span>
          </p>
          {workspace.description ? (
            <p className="max-w-2xl text-[13px] font-normal leading-relaxed text-titanium/58">{workspace.description}</p>
          ) : null}
        </div>
        {pendingInvites > 0 ? (
          <span className="shrink-0 rounded-full border border-champagne/22 bg-champagne/[0.06] px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.2em] text-champagne/80">
            {t("pendingInvitesBadge", { count: pendingInvites })}
          </span>
        ) : null}
      </div>
      <div className="border-t border-white/6 pt-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-titanium/40">{t("participantsLabel")}</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {workspace.participants.map((p) => (
            <li
              key={p.id}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-titanium/78"
            >
              {p.displayName}
              <span className="ml-2 text-[10px] uppercase tracking-[0.16em] text-titanium/38">{t(`role.${p.role}`)}</span>
              <span className="ml-2 text-[10px] uppercase tracking-[0.16em] text-champagne/45">
                {t(`inviteStatus.${p.inviteStatus}`)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
