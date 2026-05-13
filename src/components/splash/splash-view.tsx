"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { TalksWordmark } from "@/components/brand/talks-wordmark";
import { MotionButton } from "@/components/ui/motion-button";
import { Link } from "@/i18n/navigation";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18, delayChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function SplashView() {
  const t = useTranslations("splash");
  const [step, setStep] = useState<0 | 1>(0);

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-obsidian px-6 py-16 text-titanium">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(200,169,126,0.08),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(232,234,241,0.05),transparent_40%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4 }}
      />
      <AnimatePresence mode="wait">
        {step === 0 ? (
          <motion.div
            key="intro"
            className="relative z-10 flex max-w-lg flex-col items-center gap-10 text-center"
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -10, transition: { duration: 0.45 } }}
            variants={container}
          >
            <motion.div variants={item}>
              <TalksWordmark pulse />
            </motion.div>
            <motion.p
              variants={item}
              className="text-sm uppercase tracking-[0.35em] text-titanium/70"
            >
              {t("tagline")}
            </motion.p>
            <motion.div variants={item}>
              <MotionButton
                type="button"
                onClick={() => setStep(1)}
                className="bg-champagne/90 px-10 py-3 text-sm font-medium uppercase tracking-[0.28em] text-obsidian hover:bg-champagne"
              >
                {t("continue")}
              </MotionButton>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="onboarding"
            className="relative z-10 flex max-w-md flex-col items-center gap-8 text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <TalksWordmark />
            <p className="text-base leading-relaxed text-titanium/80">{t("onboardingLead")}</p>
            <motion.div whileTap={{ scale: 0.98 }}>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-full bg-champagne/90 px-10 py-3 text-sm font-medium uppercase tracking-[0.28em] text-obsidian transition-opacity duration-200 hover:bg-champagne focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne/70"
              >
                {t("continue")}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
