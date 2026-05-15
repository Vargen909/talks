"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useTranslations } from "next-intl";

import { TalksLoadingDots } from "@/components/brand/talks-loading-dots";
import { MotionButton } from "@/components/ui/motion-button";
import {
  talksDialogContentClass,
  talksDialogOverlayClass,
  talksGhostDialogActionClass,
  talksPrimaryCtaFullWidthClass,
} from "@/lib/ui/talks-surfaces";

type AgreementDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSigned?: () => void;
};

export function AgreementDialog({ open, onOpenChange, onSigned }: AgreementDialogProps) {
  const t = useTranslations("ledger");

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={talksDialogOverlayClass} />
        <Dialog.Content className={talksDialogContentClass}>
          <div className="flex flex-col items-center gap-3">
            <TalksLoadingDots size="sm" className="text-champagne/90" />
            <div className="space-y-2 text-center">
              <Dialog.Title className="text-base font-normal tracking-wide text-titanium sm:text-lg">
                {t("agreementMode")}
              </Dialog.Title>
              <Dialog.Description className="text-[13px] leading-relaxed text-titanium/65 sm:text-sm">
                {t("agreementDescription")}
              </Dialog.Description>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-2.5">
            <MotionButton
              type="button"
              className={talksPrimaryCtaFullWidthClass}
              onClick={() => {
                onSigned?.();
                onOpenChange(false);
              }}
            >
              {t("signConfirm")}
            </MotionButton>
            <MotionButton type="button" className={talksGhostDialogActionClass} onClick={() => onOpenChange(false)}>
              {t("exitAgreement")}
            </MotionButton>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
