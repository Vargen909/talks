"use client";

import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import { TalksPageBrandHeader } from "@/components/brand/talks-page-brand-header";
import { Link } from "@/i18n/navigation";
import type { ProtocolStatus } from "@/lib/protocol/domain-types";
import { cn } from "@/lib/cn";
import { listAgreementsForVault } from "@/lib/agreement-platform/overview";
import { talksMutedNavControlClass, talksSummaryPanelClass } from "@/lib/ui/talks-surfaces";
import { motion } from "framer-motion";
import { talksTapScale } from "@/lib/motion/talks-motion";

type VaultFilter = "all" | "active" | "archived";

export function AgreementVaultView() {
  const t = useTranslations("vault");
  const tProtocol = useTranslations("protocol");
  const [filter, setFilter] = useState<VaultFilter>("all");

  const rows = useMemo(() => {
    const base = listAgreementsForVault();
    if (filter === "all") return base;
    if (filter === "active") return base.filter((p) => p.protocolStatus !== "archived");
    return base.filter((p) => p.protocolStatus === "archived");
  }, [filter]);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-5 py-10 sm:gap-10 sm:px-8 sm:py-14">
      <TalksPageBrandHeader
        logoSize="sm"
        title={<h1 className="text-[1.5rem] font-light leading-snug tracking-tight text-titanium sm:text-[1.85rem]">{t("title")}</h1>}
        description={<p className="text-[13px] font-normal leading-relaxed text-titanium/55 sm:text-[0.9375rem]">{t("subtitle")}</p>}
      />

      <div className="flex flex-wrap gap-2">
        {(
          [
            ["all", t("filterAll")],
            ["active", t("filterActive")],
            ["archived", t("filterArchived")],
          ] as const
        ).map(([key, label]) => (
          <motion.button
            key={key}
            type="button"
            whileTap={{ scale: talksTapScale }}
            onClick={() => setFilter(key)}
            className={cn(
              talksMutedNavControlClass,
              filter === key && "border-champagne/25 bg-champagne/[0.06] text-champagne",
            )}
          >
            {label}
          </motion.button>
        ))}
      </div>

      <section className={cn(talksSummaryPanelClass, "overflow-x-auto")}>
        {rows.length === 0 ? (
          <p className="text-[13px] text-titanium/48">{t("empty")}</p>
        ) : (
          <>
            <div className="hidden sm:block">
              <table className="w-full min-w-[20rem] border-collapse text-left text-[13px]">
                <thead>
                  <tr className="border-b border-white/8 text-[10px] font-medium uppercase tracking-[0.22em] text-titanium/42">
                    <th className="py-3 pr-4 font-medium">{t("columnsTitle")}</th>
                    <th className="py-3 pr-4 font-medium">{t("columnsStatus")}</th>
                    <th className="py-3 font-medium">{t("columnsUpdated")}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((p) => {
                    const status = p.protocolStatus as ProtocolStatus | undefined;
                    return (
                      <tr key={p.id} className="border-b border-white/5 last:border-0">
                        <td className="py-3 pr-4 align-top">
                          <Link href={`/ledger/${p.id}`} className="font-medium text-titanium/88 hover:text-champagne">
                            {p.title}
                          </Link>
                        </td>
                        <td className="py-3 pr-4 align-top text-titanium/55">
                          {status ? tProtocol(`status.${status}`) : "—"}
                        </td>
                        <td className="py-3 align-top font-mono text-[11px] tabular-nums text-titanium/45">
                          {p.lastInteractionAt}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <ul className="divide-y divide-white/6 sm:hidden">
              {rows.map((p) => {
                const status = p.protocolStatus as ProtocolStatus | undefined;
                return (
                  <li key={p.id} className="py-4 first:pt-0">
                    <Link href={`/ledger/${p.id}`} className="text-[13px] font-medium text-titanium/88 hover:text-champagne">
                      {p.title}
                    </Link>
                    <p className="mt-2 text-[11px] text-titanium/50">
                      {status ? tProtocol(`status.${status}`) : "—"}
                      <span className="mx-2 text-titanium/25">·</span>
                      <span className="font-mono tabular-nums text-titanium/45">{p.lastInteractionAt}</span>
                    </p>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </section>
    </div>
  );
}
