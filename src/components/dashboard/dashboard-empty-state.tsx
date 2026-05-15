"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { TalksSignalDots } from "@/components/brand/talks-signal-dots";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { TALKS_EASE, talksTapScale } from "@/lib/motion/talks-motion";
import { talksEmptyPanelClass } from "@/lib/ui/talks-surfaces";

export function DashboardEmptyState() {
  const t = useTranslations("dashboard");

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: TALKS_EASE }}
      className={cn("col-span-full flex flex-col items-center", talksEmptyPanelClass)}
    >
      <TalksSignalDots variant="static" size="md" className="mb-7 text-champagne/80" />
      <h2 className="text-base font-medium tracking-tight text-titanium sm:text-lg">{t("emptyTitle")}</h2>
      <p className="mt-4 max-w-md text-[13px] font-normal leading-relaxed text-titanium/52 sm:text-sm">
        {t("emptyBody")}
      </p>
      <motion.div className="mt-8" whileTap={{ scale: talksTapScale }}>
        <Link href="/protokoll/ny" className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] px-8 text-[11px] font-medium uppercase tracking-[0.24em] text-champagne backdrop-blur-md">
          {t("createProtocol")}
        </Link>
      </motion.div>
      <motion.div
        className="mt-10 h-px w-20 rounded-full bg-gradient-to-r from-transparent via-champagne/30 to-transparent"
        initial={{ scaleX: 0.35, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.18, duration: 0.85, ease: TALKS_EASE }}
      />
    </motion.section>
  );
}
