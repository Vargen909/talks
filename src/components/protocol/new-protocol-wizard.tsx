"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { BrandLockup } from "@/components/brand/brand-lockup";
import { MotionButton } from "@/components/ui/motion-button";
import { Link, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { createMockProtocolFromDraft } from "@/lib/protocol/create-protocol-draft";
import type { ProtocolKind } from "@/lib/protocol/domain-types";
import { talksTapScale } from "@/lib/motion/talks-motion";
import { pushVolatileWorkspace } from "@/lib/protocol/volatile-workspaces";
import {
  talksMutedNavControlClass,
  talksPrimaryCtaClass,
  talksRecallFieldShellClass,
  talksSummaryPanelClass,
} from "@/lib/ui/talks-surfaces";

const KINDS: ProtocolKind[] = [
  "uthyrning",
  "forsaljning",
  "tjanstejobb",
  "leverans",
  "deposition",
  "samarbete",
  "privat",
  "anpassat",
];

export function NewProtocolWizard() {
  const t = useTranslations("newProtocol");
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [kind, setKind] = useState<ProtocolKind>("leverans");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [valueAmount, setValueAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [location, setLocation] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [invitePhone, setInvitePhone] = useState("");

  const canAdvanceStep1 = true;
  const canAdvanceStep2 = title.trim().length >= 2 && description.trim().length >= 4;
  const canSubmit = canAdvanceStep2;

  function finish() {
    const protocol = createMockProtocolFromDraft({
      kind,
      title,
      description,
      valueAmount: valueAmount.trim() || undefined,
      deadline: deadline.trim() || undefined,
      location: location.trim() || undefined,
      inviteEmail: inviteEmail.trim() || undefined,
      invitePhone: invitePhone.trim() || undefined,
    });
    pushVolatileWorkspace(protocol);
    router.push(`/ledger/${protocol.id}`);
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-10 px-5 py-14 sm:gap-12 sm:px-8 sm:py-20">
      <header className="space-y-6">
        <BrandLockup size="compact" align="start" showSlogan />
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/6 pb-8">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-titanium/40">{t("eyebrow")}</p>
            <h1 className="mt-2 text-xl font-light tracking-tight text-titanium sm:text-2xl">{t("title")}</h1>
            <p className="mt-3 max-w-xl text-[13px] font-normal leading-relaxed text-titanium/55">{t("lead")}</p>
          </div>
          <motion.div whileTap={{ scale: talksTapScale }}>
            <Link href="/dashboard" className={talksMutedNavControlClass}>
              {t("cancel")}
            </Link>
          </motion.div>
        </div>
        <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-champagne/55">
          {t("stepIndicator", { step: step + 1, total: 4 })}
        </p>
      </header>

      {step === 0 ? (
        <section className="space-y-5">
          <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-titanium/42">{t("step1Label")}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {KINDS.map((k) => (
              <motion.button
                key={k}
                type="button"
                whileTap={{ scale: talksTapScale }}
                onClick={() => setKind(k)}
                className={cn(
                  talksSummaryPanelClass,
                  "w-full text-left transition-[border-color,box-shadow] duration-500 ease-out",
                  kind === k ? "border-champagne/28 shadow-[0_0_0_1px_rgba(201,171,130,0.12)]" : "hover:border-white/14",
                )}
              >
                <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-champagne/60">
                  {t(`kinds.${k}`)}
                </span>
              </motion.button>
            ))}
          </div>
          <div className="flex justify-end pt-2">
            <MotionButton
              type="button"
              disabled={!canAdvanceStep1}
              className={talksPrimaryCtaClass}
              onClick={() => setStep(1)}
            >
              {t("continue")}
            </MotionButton>
          </div>
        </section>
      ) : null}

      {step === 1 ? (
        <section className="space-y-5">
          <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-titanium/42">{t("step2Label")}</p>
          <div className={cn(talksRecallFieldShellClass, "max-w-none flex-col gap-4 sm:flex-col")}>
            <label className="flex w-full flex-col gap-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-champagne/55">{t("fieldTitle")}</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-titanium outline-none focus-visible:ring-2 focus-visible:ring-champagne/25"
              />
            </label>
            <label className="flex w-full flex-col gap-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-champagne/55">{t("fieldDescription")}</span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-titanium outline-none focus-visible:ring-2 focus-visible:ring-champagne/25"
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-3">
              <label className="flex flex-col gap-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-titanium/45">{t("fieldAmount")}</span>
                <input
                  value={valueAmount}
                  onChange={(e) => setValueAmount(e.target.value)}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-titanium outline-none focus-visible:ring-2 focus-visible:ring-champagne/25"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-titanium/45">{t("fieldDeadline")}</span>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-titanium outline-none focus-visible:ring-2 focus-visible:ring-champagne/25"
                />
              </label>
              <label className="flex flex-col gap-2 sm:col-span-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-titanium/45">{t("fieldLocation")}</span>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-titanium outline-none focus-visible:ring-2 focus-visible:ring-champagne/25"
                />
              </label>
            </div>
          </div>
          <div className="flex flex-wrap justify-between gap-3 pt-2">
            <MotionButton type="button" className={talksMutedNavControlClass} onClick={() => setStep(0)}>
              {t("back")}
            </MotionButton>
            <MotionButton
              type="button"
              disabled={!canAdvanceStep2}
              className={talksPrimaryCtaClass}
              onClick={() => setStep(2)}
            >
              {t("continue")}
            </MotionButton>
          </div>
        </section>
      ) : null}

      {step === 2 ? (
        <section className="space-y-5">
          <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-titanium/42">{t("step3Label")}</p>
          <p className="text-[13px] font-normal leading-relaxed text-titanium/55">{t("step3Hint")}</p>
          <div className={cn(talksRecallFieldShellClass, "max-w-none flex-col gap-4 sm:flex-col")}>
            <label className="flex w-full flex-col gap-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-champagne/55">{t("fieldInviteEmail")}</span>
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-titanium outline-none focus-visible:ring-2 focus-visible:ring-champagne/25"
              />
            </label>
            <label className="flex w-full flex-col gap-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-champagne/55">{t("fieldInvitePhone")}</span>
              <input
                value={invitePhone}
                onChange={(e) => setInvitePhone(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-titanium outline-none focus-visible:ring-2 focus-visible:ring-champagne/25"
              />
            </label>
            <p className="text-[12px] font-normal leading-relaxed text-titanium/45">{t("inviteLinkPlaceholder")}</p>
            <p className="text-[12px] font-normal leading-relaxed text-titanium/38">{t("inviteQrPlaceholder")}</p>
          </div>
          <div className="flex flex-wrap justify-between gap-3 pt-2">
            <MotionButton type="button" className={talksMutedNavControlClass} onClick={() => setStep(1)}>
              {t("back")}
            </MotionButton>
            <MotionButton type="button" className={talksPrimaryCtaClass} onClick={() => setStep(3)}>
              {t("continue")}
            </MotionButton>
          </div>
        </section>
      ) : null}

      {step === 3 ? (
        <section className={cn(talksSummaryPanelClass, "space-y-5")}>
          <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-titanium/42">{t("step4Label")}</p>
          <dl className="space-y-3 text-[13px] font-normal leading-relaxed text-titanium/72">
            <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
              <dt className="text-titanium/45">{t("summaryKind")}</dt>
              <dd className="text-titanium/88">{t(`kinds.${kind}`)}</dd>
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
              <dt className="text-titanium/45">{t("summaryTitle")}</dt>
              <dd className="text-right text-titanium/88">{title}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-titanium/45">{t("summaryDescription")}</dt>
              <dd className="text-titanium/80">{description}</dd>
            </div>
          </dl>
          <div className="flex flex-wrap justify-between gap-3 pt-4">
            <MotionButton type="button" className={talksMutedNavControlClass} onClick={() => setStep(2)}>
              {t("back")}
            </MotionButton>
            <MotionButton type="button" disabled={!canSubmit} className={talksPrimaryCtaClass} onClick={finish}>
              {t("createProtocol")}
            </MotionButton>
          </div>
        </section>
      ) : null}
    </div>
  );
}
