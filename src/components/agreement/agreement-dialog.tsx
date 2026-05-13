"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useTranslations } from "next-intl";

import { MotionButton } from "@/components/ui/motion-button";

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
        <Dialog.Overlay className="fixed inset-0 bg-[#05070d]/80 backdrop-blur-xl" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[min(92vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-champagne/70 bg-ether/95 p-8 text-titanium shadow-[0_0_0_1px_rgba(200,169,126,0.15),0_30px_120px_rgba(0,0,0,0.65)] outline-none">
          <div className="space-y-3 text-center">
            <Dialog.Title className="text-lg font-medium tracking-wide">
              {t("agreementMode")}
            </Dialog.Title>
            <Dialog.Description className="text-sm text-titanium/70">
              {t("agreementDescription")}
            </Dialog.Description>
          </div>
          <div className="mt-8 flex flex-col gap-3">
            <MotionButton
              type="button"
              className="w-full bg-champagne/90 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-obsidian hover:bg-champagne"
              onClick={() => {
                onSigned?.();
                onOpenChange(false);
              }}
            >
              {t("signConfirm")}
            </MotionButton>
            <MotionButton
              type="button"
              className="w-full border border-white/10 bg-transparent py-3 text-xs uppercase tracking-[0.3em] text-titanium/70 hover:border-white/25 hover:text-titanium"
              onClick={() => onOpenChange(false)}
            >
              {t("exitAgreement")}
            </MotionButton>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
