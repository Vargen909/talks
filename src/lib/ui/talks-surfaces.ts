import { cn } from "@/lib/cn";

/** Shared depth: soft outer shadow + subtle inner top light (matte glass). */
const depthCard =
  "shadow-[0_28px_80px_-22px_rgba(0,0,0,0.58),inset_0_1px_0_0_rgba(255,255,255,0.06)]";

const depthLift =
  "shadow-[0_20px_55px_-18px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.05)]";

const depthDialog =
  "shadow-[0_48px_120px_-24px_rgba(0,0,0,0.72),inset_0_1px_0_0_rgba(255,255,255,0.06)]";

/** Primary champagne CTA — splash, onboarding, agreement confirm. rounded-2xl */
export const talksPrimaryCtaClass = cn(
  "rounded-2xl inline-flex min-h-12 items-center justify-center border border-white/10",
  "bg-gradient-to-b from-white/[0.07] to-white/[0.02] px-10 py-3.5 text-[11px] font-medium uppercase tracking-[0.24em] text-champagne",
  depthLift,
  "backdrop-blur-md transition-[transform,box-shadow,background-color,border-color,color] duration-500 ease-out",
  "hover:border-champagne/22 hover:from-champagne/[0.12] hover:to-champagne/[0.04] hover:text-champagne",
  "hover:shadow-[0_24px_60px_-14px_rgba(200,169,126,0.14),inset_0_1px_0_0_rgba(255,255,255,0.08)]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne/30 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian",
  "sm:min-h-[3.25rem] sm:px-11 sm:text-sm sm:tracking-[0.26em]",
);

export const talksPrimaryCtaSplashClass = cn(talksPrimaryCtaClass, "backdrop-blur-lg");

export const talksPrimaryCtaFullWidthClass = cn(talksPrimaryCtaClass, "w-full");

export const talksPrimaryCtaWideLinkClass = cn(
  talksPrimaryCtaClass,
  "min-w-[11.5rem] backdrop-blur-lg",
);

/** Protocol index cards — rounded-3xl, breathable. */
export const talksProtocolIndexCardClass = cn(
  "rounded-3xl group relative flex flex-col gap-5 border border-white/10",
  "bg-gradient-to-br from-white/[0.06] via-ether/50 to-obsidian/30 p-6 sm:gap-6 sm:p-8",
  depthCard,
  "backdrop-blur-lg transition-[border-color,box-shadow] duration-500 ease-out hover:border-white/15",
);

export const talksProtocolCardActionClass = cn(
  "rounded-2xl inline-flex min-h-11 items-center justify-center border border-white/10 bg-white/[0.03] px-5 outline-none",
  "text-[10px] font-medium uppercase tracking-[0.22em] text-champagne backdrop-blur-sm",
  "transition-[transform,background-color,border-color,box-shadow] duration-500 ease-out",
  "hover:border-champagne/25 hover:bg-champagne/[0.08] hover:shadow-[0_12px_36px_-12px_rgba(200,169,126,0.12)]",
  "focus-visible:ring-2 focus-visible:ring-champagne/28 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian",
  "sm:text-[11px] sm:tracking-[0.24em]",
);

/** Semantic recall — rounded-2xl, integrated surface. */
export const talksRecallFieldShellClass = cn(
  "flex w-full max-w-2xl min-h-14 flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 backdrop-blur-lg",
  "transition-[border-color,box-shadow,background-color] duration-500 ease-out sm:flex-row sm:items-center sm:gap-6 sm:px-6 sm:py-4",
  "focus-within:border-champagne/18 focus-within:bg-white/[0.045]",
  "focus-within:shadow-[0_0_0_1px_rgba(200,169,126,0.12),0_0_48px_-10px_rgba(200,169,126,0.1)]",
  "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-champagne/26 has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-obsidian",
);

export const talksMutedNavControlClass = cn(
  "rounded-2xl inline-flex min-h-11 items-center justify-center border border-white/10 bg-white/[0.02] px-5 outline-none",
  "text-[10px] font-medium uppercase tracking-[0.22em] text-titanium/55 backdrop-blur-sm",
  "transition-[transform,background-color,border-color,color,box-shadow] duration-500 ease-out",
  "hover:border-white/18 hover:bg-white/[0.04] hover:text-titanium/88 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]",
  "focus-visible:ring-2 focus-visible:ring-champagne/26 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian",
);

export const talksGhostDialogActionClass = cn(
  "rounded-2xl min-h-11 w-full border border-white/10 bg-white/[0.02] py-3 text-[10px] font-medium uppercase tracking-[0.24em] text-titanium/50 backdrop-blur-sm",
  "transition-[background-color,border-color,color] duration-500 ease-out hover:border-white/16 hover:bg-white/[0.05] hover:text-titanium/75",
);

/** Modal shell — rounded-[32px]. */
export const talksDialogContentClass = cn(
  "fixed left-1/2 top-1/2 w-[min(92vw,480px)] -translate-x-1/2 -translate-y-1/2 rounded-[32px] border border-white/10",
  "bg-gradient-to-b from-ether/95 to-obsidian/95 p-8 text-titanium outline-none sm:p-10",
  depthDialog,
  "backdrop-blur-2xl",
);

export const talksDialogOverlayClass =
  "fixed inset-0 bg-obsidian/80 backdrop-blur-2xl backdrop-saturate-150";

/** Ledger main — rounded-[28px]. */
export const talksLedgerMainClass = cn(
  "flex-1 space-y-8 rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 sm:space-y-10 sm:p-8 lg:p-10",
  depthCard,
  "backdrop-blur-xl",
);

/** Floating side panel — rounded-[36px]. */
export const talksLedgerAsideClass = cn(
  "rounded-[36px] border border-white/10 bg-gradient-to-b from-white/[0.05] to-ether/40 p-6 sm:p-7 backdrop-blur-xl",
  "shadow-[0_24px_70px_-20px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.05)]",
);

export const talksSummaryPanelClass = cn(
  "rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md sm:p-6",
  "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_12px_40px_-18px_rgba(0,0,0,0.45)]",
);

/** Protocol Copilot — intelligence shell (subtle indigo veil, not loud SaaS AI). */
export const talksCopilotShellClass = cn(
  "rounded-3xl border border-white/10 bg-gradient-to-b from-indigo-500/[0.04] to-transparent p-5 backdrop-blur-md sm:p-6",
  "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_0_52px_-16px_rgba(99,102,241,0.09)]",
);

/** Single Copilot observation — ledger-adjacent, not chat. */
export const talksCopilotInsightCardClass = cn(
  "rounded-2xl border border-white/8 bg-white/[0.025] px-4 py-3.5 backdrop-blur-sm",
  "border-l-[2px] border-l-indigo-400/22",
);

export const talksAgreementToggleIdleClass = cn(
  "inline-flex items-center justify-center rounded-2xl min-h-11 border border-white/10 bg-white/[0.02] px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.22em] text-titanium/70 backdrop-blur-sm",
  "transition-[background-color,border-color,color,box-shadow] duration-500 ease-out hover:border-champagne/22 hover:text-champagne",
);

export const talksAgreementToggleActiveClass = cn(
  "inline-flex items-center justify-center rounded-2xl min-h-11 border border-champagne/25 bg-champagne/[0.08] px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.22em] text-champagne backdrop-blur-sm",
  "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_0_32px_-8px_rgba(200,169,126,0.15)]",
);

export const talksComposerShellClass = cn(
  "relative min-h-[3rem] flex-1 rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-3.5 backdrop-blur-md sm:min-h-[3.25rem]",
  "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]",
);

/** One protocol entry / timeline row — rounded-3xl block (not chat bubble). */
export const talksTimelineEntryCardClass = cn(
  "rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.045] to-transparent p-5 backdrop-blur-md sm:p-6",
  "shadow-[0_16px_48px_-20px_rgba(0,0,0,0.45),inset_0_1px_0_0_rgba(255,255,255,0.05)]",
);

/** Timeline list item inside aside — soft chip. */
export const talksTimelineAsideItemClass = cn(
  "rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3 backdrop-blur-sm",
);

/** Floating calendar-day anchor in the ledger timeline. */
export const talksLedgerDayAnchorClass = cn(
  "mx-auto inline-flex max-w-full items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-titanium/75 backdrop-blur-md",
  "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_8px_28px_-12px_rgba(0,0,0,0.35)]",
);

/** Premium composer frame — wraps input + actions as one surface. */
export const talksComposerFrameClass = cn(
  "rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.05] to-ether/40 p-3 backdrop-blur-xl sm:p-4",
  "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_20px_60px_-24px_rgba(0,0,0,0.5)]",
);

/** Protocol / timeline event — lighter, document-like marker row. */
export const talksLedgerBlockEventClass = cn(
  "rounded-2xl border border-dashed border-white/12 bg-white/[0.02] px-5 py-3.5 backdrop-blur-sm sm:px-6",
  "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]",
);

/** Empty / not-found panels. */
export const talksEmptyPanelClass = cn(
  "rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-ether/30 px-8 py-16 text-center backdrop-blur-lg sm:py-20",
  depthLift,
);
