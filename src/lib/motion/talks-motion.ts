import type { Transition } from "framer-motion";

/** Calm, cinematic ease — matches `.cursor/rules/talks-rules.mdc` §6. */
export const TALKS_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Soft press — barely perceptible depth. */
export const talksTapScale = 0.988;

export const talksTapTransition: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 38,
};

export const talksStagger = (delayChildren = 0.12, staggerChildren = 0.14) =>
  ({
    hidden: {},
    show: {
      transition: { staggerChildren, delayChildren },
    },
  }) as const;

export const talksFadeRaise = (y = 10) =>
  ({
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.95, ease: TALKS_EASE },
    },
  }) as const;

export const talksListItem = (delayIndex: number, y = 12) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { delay: delayIndex * 0.07, duration: 0.58, ease: TALKS_EASE },
});

export const talksTimelineEntry = (delayIndex: number) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: delayIndex * 0.06, duration: 0.55, ease: TALKS_EASE },
});
