"use client";

import { useTranslations } from "next-intl";

import { TalksPageBrandHeader } from "@/components/brand/talks-page-brand-header";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { talksMutedNavControlClass, talksSummaryPanelClass } from "@/lib/ui/talks-surfaces";

export function CopilotHubView() {
  const t = useTranslations("copilotHub");
  const tNav = useTranslations("nav");

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-5 py-10 sm:px-8 sm:py-14">
      <TalksPageBrandHeader
        logoSize="xs"
        title={<h1 className="text-[1.5rem] font-light leading-snug tracking-tight text-titanium sm:text-[1.85rem]">{t("title")}</h1>}
        description={<p className="text-[13px] leading-relaxed text-titanium/58 sm:text-[0.9375rem]">{t("subtitle")}</p>}
      />
      <section className={cn(talksSummaryPanelClass, "space-y-4 text-[13px] leading-relaxed text-titanium/65")}>
        <p>{t("body")}</p>
        <p className="text-[12px] text-titanium/48">{t("privacy")}</p>
      </section>
      <Link href="/avtal" className={talksMutedNavControlClass}>
        {t("ctaLedger")}
      </Link>
      <Link href="/dashboard" className={talksMutedNavControlClass}>
        {tNav("home")}
      </Link>
    </div>
  );
}

export function IntegrationsView() {
  const t = useTranslations("integrations");

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-5 py-10 sm:px-8 sm:py-14">
      <TalksPageBrandHeader
        logoSize="xs"
        title={<h1 className="text-[1.5rem] font-light leading-snug tracking-tight text-titanium sm:text-[1.85rem]">{t("title")}</h1>}
        description={<p className="text-[13px] leading-relaxed text-titanium/58 sm:text-[0.9375rem]">{t("subtitle")}</p>}
      />
      <section className={cn(talksSummaryPanelClass, "space-y-5")}>
        <div>
          <h2 className="text-[10px] font-medium uppercase tracking-[0.28em] text-champagne/55">{t("apiTitle")}</h2>
          <p className="mt-2 text-[13px] leading-relaxed text-titanium/62">{t("apiBody")}</p>
        </div>
        <div>
          <h2 className="text-[10px] font-medium uppercase tracking-[0.28em] text-champagne/55">{t("webhookTitle")}</h2>
          <p className="mt-2 text-[13px] leading-relaxed text-titanium/62">{t("webhookBody")}</p>
        </div>
        <div>
          <h2 className="text-[10px] font-medium uppercase tracking-[0.28em] text-champagne/55">{t("embedTitle")}</h2>
          <p className="mt-2 text-[13px] leading-relaxed text-titanium/62">{t("embedBody")}</p>
        </div>
        <p className="text-[11px] font-mono leading-relaxed text-titanium/45">{t("docsTodo")}</p>
      </section>
    </div>
  );
}

export function AccountSecurityView() {
  const t = useTranslations("account");

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-5 py-10 sm:px-8 sm:py-14">
      <TalksPageBrandHeader
        logoSize="xs"
        title={<h1 className="text-[1.5rem] font-light leading-snug tracking-tight text-titanium sm:text-[1.85rem]">{t("title")}</h1>}
        description={<p className="text-[13px] leading-relaxed text-titanium/58 sm:text-[0.9375rem]">{t("subtitle")}</p>}
      />
      <section className={cn(talksSummaryPanelClass, "space-y-4 text-[13px] leading-relaxed text-titanium/60")}>
        <p>{t("todoAuth")}</p>
        <p>{t("todoOrg")}</p>
      </section>
    </div>
  );
}
