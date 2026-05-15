"use client";

import { useTranslations } from "next-intl";

import { TalksLoadingDots } from "@/components/brand/talks-loading-dots";
import { cn } from "@/lib/cn";

export type TalksBrandLoadingProps = {
  className?: string;
  /** Minimum vertical space so layout does not jump when swapping to content. */
  minHeight?: string;
  /** Tighter vertical padding for nested panels. */
  dense?: boolean;
};

/**
 * Global route / section loading — three-dot system + calm caption.
 * Use from `loading.tsx`, async boundaries, and in-view placeholders.
 */
export function TalksBrandLoading({ className, minHeight = "42dvh", dense }: TalksBrandLoadingProps) {
  const t = useTranslations("common");

  return (
    <div
      className={cn(
        "flex w-full min-w-0 flex-col items-center justify-center gap-6 px-5 text-center sm:px-8",
        dense ? "py-12" : "py-20",
        className,
      )}
      style={{ minHeight }}
    >
      <TalksLoadingDots size="md" className="text-champagne/85" label={t("loading")} />
      <p aria-hidden className="max-w-xs text-[10px] font-medium uppercase tracking-[0.3em] text-titanium/36">
        {t("loading")}
      </p>
    </div>
  );
}
