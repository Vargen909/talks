"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { BrandLockup } from "@/components/brand/brand-lockup";
import { TalksSplashScreen } from "@/components/splash/TalksSplashScreen";
import { MotionButton } from "@/components/ui/motion-button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { talksStagger, talksFadeRaise, TALKS_EASE, talksTapScale } from "@/lib/motion/talks-motion";
import { talksPrimaryCtaSplashClass, talksPrimaryCtaWideLinkClass } from "@/lib/ui/talks-surfaces";

const container = talksStagger();
const item = talksFadeRaise(10);

export function SplashView() {
  const t = useTranslations("splash");
  const [step, setStep] = useState<0 | 1>(0);
  const reduceMotion = useReducedMotion();

  return (
    <TalksSplashScreen>
      <AnimatePresence mode="wait">
        {step === 0 ? (
          <motion.div
            key="intro"
            className="flex w-full min-w-0 max-w-lg flex-col items-center gap-8 text-center sm:gap-10 md:gap-12"
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -8, transition: { duration: 0.5, ease: TALKS_EASE } }}
            variants={container}
          >
            <motion.div
              variants={item}
              className="w-full min-w-0 drop-shadow-[0_22px_52px_rgba(201,171,130,0.11)] md:drop-shadow-[0_26px_60px_rgba(201,171,130,0.12)]"
            >
              {reduceMotion ? (
                <div className="flex justify-center">
                  <BrandLockup pulse size="hero" align="center" priority />
                </div>
              ) : (
                <motion.div
                  className="flex justify-center"
                  animate={{ y: [0, -2.5, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: TALKS_EASE }}
                >
                  <BrandLockup pulse size="hero" align="center" priority />
                </motion.div>
              )}
            </motion.div>
            <motion.p
              variants={item}
              className="max-w-[min(100%,22rem)] text-[11px] font-light uppercase tracking-[0.34em] text-titanium/70 sm:text-xs sm:tracking-[0.36em]"
            >
              {t("welcome")}
            </motion.p>
            <motion.p
              variants={item}
              className="max-w-[min(100%,22rem)] text-[11px] uppercase leading-relaxed tracking-[0.32em] text-titanium/58 sm:text-xs sm:tracking-[0.34em]"
            >
              {t("tagline")}
            </motion.p>
            <motion.div variants={item} className="w-full min-w-0 px-1 sm:px-0">
              <MotionButton
                type="button"
                onClick={() => setStep(1)}
                className={cn(
                  talksPrimaryCtaSplashClass,
                  "mx-auto w-full max-w-sm min-h-11 sm:min-h-12 sm:max-w-md",
                )}
              >
                {t("continue")}
              </MotionButton>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="onboarding"
            className="flex w-full min-w-0 max-w-md flex-col items-center gap-7 text-center sm:gap-8 md:gap-10"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.65, ease: TALKS_EASE }}
          >
            <div className="w-full min-w-0 drop-shadow-[0_18px_44px_rgba(201,171,130,0.09)]">
              <BrandLockup size="hero" pulse={false} />
            </div>
            <p className="max-w-[min(100%,24rem)] text-sm leading-[1.7] text-titanium/72 sm:text-[0.95rem]">
              {t("onboardingLead")}
            </p>
            <motion.div whileTap={{ scale: talksTapScale }} className="w-full min-w-0 px-1 sm:px-0">
              <Link
                href="/dashboard"
                className={cn(
                  talksPrimaryCtaWideLinkClass,
                  "mx-auto flex w-full max-w-sm min-h-11 items-center justify-center sm:min-h-12 sm:max-w-md",
                )}
              >
                {t("continue")}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </TalksSplashScreen>
  );
}
