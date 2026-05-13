"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import { Link } from "@/i18n/navigation";
import { filterProtocols } from "@/lib/mock-protocols";

export function DashboardView() {
  const t = useTranslations("dashboard");
  const tProtocol = useTranslations("protocol");
  const [query, setQuery] = useState("");

  const protocols = useMemo(() => filterProtocols(query), [query]);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-16">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.35em] text-champagne/80">talks…</p>
        <div className="space-y-2">
          <h1 className="text-3xl font-light text-titanium">{t("title")}</h1>
          <p className="max-w-2xl text-sm text-titanium/65">{t("subtitle")}</p>
        </div>
      </header>

      <motion.label
        className="flex w-full max-w-2xl items-center gap-3 rounded-full border border-white/10 bg-ether/80 px-5 py-3 backdrop-blur-md transition-transform duration-200 focus-within:ring-2 focus-within:ring-champagne/50"
        whileTap={{ scale: 0.995 }}
      >
        <span className="text-[10px] uppercase tracking-[0.35em] text-champagne/80">
          Recall
        </span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="flex-1 bg-transparent text-sm text-titanium outline-none placeholder:text-titanium/35"
        />
      </motion.label>

      <div className="grid gap-5 md:grid-cols-2">
        {protocols.length === 0 ? (
          <p className="text-sm text-titanium/55">{t("empty")}</p>
        ) : (
          protocols.map((protocol, index) => (
            <motion.article
              key={protocol.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-ether/90 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-medium text-titanium">{protocol.title}</h2>
                  <p className="text-xs uppercase tracking-[0.25em] text-titanium/45">
                    {protocol.lastInteractionAt}
                  </p>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-champagne/90">
                  {tProtocol("summaryLabel")}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-titanium/75">{protocol.summary}</p>
              <motion.div whileTap={{ scale: 0.98 }} className="pt-1">
                <Link
                  href={`/ledger/${protocol.id}`}
                  className="inline-flex items-center justify-center rounded-full border border-champagne/50 px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-champagne transition-colors duration-200 hover:border-champagne hover:bg-champagne/10"
                >
                  {t("openLedger")}
                </Link>
              </motion.div>
            </motion.article>
          ))
        )}
      </div>
    </div>
  );
}
