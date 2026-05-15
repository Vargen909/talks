"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import { TalksPageBrandHeader } from "@/components/brand/talks-page-brand-header";
import { ProtocolThreadCard } from "@/components/protocol/protocol-thread-card";
import { Link } from "@/i18n/navigation";
import { mockProtocolCatalog } from "@/lib/adapters/memory-adapters";
import { cn } from "@/lib/cn";
import { talksTapScale } from "@/lib/motion/talks-motion";
import { talksMutedNavControlClass, talksRecallFieldShellClass, talksSummaryPanelClass } from "@/lib/ui/talks-surfaces";

export function AgreementsHubView() {
  const t = useTranslations("agreementsHub");
  const tNav = useTranslations("nav");
  const tProduct = useTranslations("product");
  const [query, setQuery] = useState("");

  const protocols = useMemo(() => mockProtocolCatalog.search(query), [query]);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-5 py-10 sm:gap-10 sm:px-8 sm:py-14">
      <TalksPageBrandHeader
        logoSize="sm"
        title={<h1 className="text-[1.5rem] font-light leading-snug tracking-tight text-titanium sm:text-[1.85rem]">{t("title")}</h1>}
        description={
          <>
            <p className="text-[13px] font-normal leading-relaxed text-titanium/55 sm:text-[0.9375rem]">{t("subtitle")}</p>
            <p className="mt-3 text-[12px] font-normal leading-relaxed text-titanium/42">{tProduct("agreementRoomNote")}</p>
          </>
        }
      />

      <motion.label className={cn(talksRecallFieldShellClass, "cursor-text")} whileTap={{ scale: talksTapScale }}>
        <span className="shrink-0 text-[10px] font-medium uppercase tracking-[0.26em] text-champagne/65">{t("searchField")}</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="min-h-7 w-full flex-1 border-0 bg-transparent text-sm font-normal leading-relaxed text-titanium outline-none placeholder:text-titanium/28"
        />
      </motion.label>

      <section className={cn(talksSummaryPanelClass, "space-y-4")}>
        <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-champagne/55">{t("ledgerHint")}</p>
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-7">
          {protocols.length === 0 ? (
            <p className="col-span-full text-[13px] text-titanium/48">{t("empty")}</p>
          ) : (
            protocols.map((protocol, index) => <ProtocolThreadCard key={protocol.id} protocol={protocol} index={index} />)
          )}
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href="/protokoll/ny" className={talksMutedNavControlClass}>
          {tNav("create")}
        </Link>
      </div>
    </div>
  );
}
