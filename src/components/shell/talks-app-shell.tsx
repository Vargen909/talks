"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { TalksLogo } from "@/components/brand/talks-logo";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { TALKS_EASE, talksTapScale } from "@/lib/motion/talks-motion";
import { talksPrimaryCtaClass, talksMutedNavControlClass } from "@/lib/ui/talks-surfaces";

type NavDef = { href: string; labelKey: "home" | "agreements" | "signatures" | "vault" | "copilot" | "integrations" | "account" | "create" };

const PRIMARY_NAV: NavDef[] = [
  { href: "/dashboard", labelKey: "home" },
  { href: "/avtal", labelKey: "agreements" },
  { href: "/signeringar", labelKey: "signatures" },
  { href: "/valv", labelKey: "vault" },
];

const MORE_NAV: NavDef[] = [
  { href: "/copilot", labelKey: "copilot" },
  { href: "/integrationer", labelKey: "integrations" },
  { href: "/konto", labelKey: "account" },
];

function navLinkClass(active: boolean) {
  return cn(
    "whitespace-nowrap rounded-2xl border px-3 py-2 text-[9px] font-medium uppercase tracking-[0.2em] transition-[background-color,border-color,color] duration-300 ease-out sm:px-3.5 sm:text-[10px] sm:tracking-[0.22em]",
    active
      ? "border-champagne/28 bg-champagne/[0.08] text-champagne shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
      : "border-transparent text-titanium/52 hover:border-white/10 hover:bg-white/[0.03] hover:text-titanium/85",
  );
}

function pathActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  if (href === "/avtal")
    return pathname === "/avtal" || pathname.startsWith("/ledger/") || pathname.startsWith("/rum/");
  if (href === "/signeringar") return pathname === "/signeringar";
  if (href === "/valv") return pathname === "/valv";
  if (href === "/copilot") return pathname === "/copilot";
  if (href === "/integrationer") return pathname === "/integrationer";
  if (href === "/konto") return pathname === "/konto";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function TalksAppShell({ children }: { children: React.ReactNode }) {
  const t = useTranslations("nav");
  const tShell = useTranslations("shell");
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setMoreOpen(false);
    });
  }, [pathname]);

  return (
    <div className="flex min-h-dvh flex-col bg-obsidian text-titanium">
      <header className="sticky top-0 z-30 border-b border-white/6 bg-obsidian/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-3.5">
          <Link
            href="/dashboard"
            className="flex min-w-0 shrink-0 items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-champagne/28 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
          >
            <TalksLogo size="sm" align="start" priority />
          </Link>
          <nav className="hidden flex-1 flex-wrap items-center justify-center gap-1.5 md:flex lg:gap-2">
            {PRIMARY_NAV.map((item) => (
              <Link key={item.href} href={item.href} className={navLinkClass(pathActive(pathname, item.href))}>
                {t(item.labelKey)}
              </Link>
            ))}
            <Link href="/protokoll/ny" className={cn(talksPrimaryCtaClass, "min-h-10 px-6 py-2.5 text-[9px] sm:text-[10px]")}>
              {t("create")}
            </Link>
            {MORE_NAV.map((item) => (
              <Link key={item.href} href={item.href} className={navLinkClass(pathActive(pathname, item.href))}>
                {t(item.labelKey)}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 md:hidden">
            <motion.button
              type="button"
              whileTap={{ scale: talksTapScale }}
              className={cn(talksMutedNavControlClass, "min-h-10 px-4 text-[9px]")}
              aria-expanded={moreOpen}
              aria-controls="talks-more-drawer"
              onClick={() => setMoreOpen((o) => !o)}
            >
              {tShell("more")}
            </motion.button>
            <motion.div whileTap={{ scale: talksTapScale }}>
              <Link href="/protokoll/ny" className={cn(talksPrimaryCtaClass, "min-h-10 px-5 py-2.5 text-[9px]")}>
                {t("create")}
              </Link>
            </motion.div>
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col pb-[calc(5.25rem+env(safe-area-inset-bottom,0px))] md:pb-6">{children}</main>

      <nav
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/8 bg-obsidian/92 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-2xl md:hidden"
        aria-label={tShell("primaryNavAria")}
      >
        <div className="mx-auto flex max-w-lg items-center justify-between gap-1 px-3">
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-w-0 flex-1 flex-col items-center justify-center rounded-xl py-2 text-[8px] font-medium uppercase tracking-[0.16em]",
                pathActive(pathname, item.href) ? "text-champagne" : "text-titanium/48",
              )}
            >
              <span className="truncate px-0.5 text-center leading-tight">{t(item.labelKey)}</span>
            </Link>
          ))}
        </div>
      </nav>

      <AnimatePresence>
        {moreOpen ? (
          <motion.div
            key="drawer"
            id="talks-more-drawer"
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: TALKS_EASE }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-obsidian/75 backdrop-blur-md"
              aria-label={tShell("closeMenu")}
              onClick={() => setMoreOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              className="absolute bottom-0 left-0 right-0 max-h-[min(70dvh,28rem)] rounded-t-[28px] border border-white/10 border-b-0 bg-gradient-to-b from-ether/98 to-obsidian/98 p-6 shadow-[0_-24px_80px_-20px_rgba(0,0,0,0.65)]"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.38, ease: TALKS_EASE }}
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-titanium/42">{tShell("moreTitle")}</p>
              <div className="mt-4 flex items-center gap-3 border-b border-white/6 pb-4">
                <TalksLogo size="xs" align="start" lockup={false} className="opacity-90" />
              </div>
              <ul className="mt-5 space-y-2">
                {MORE_NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-titanium/78"
                      onClick={() => setMoreOpen(false)}
                    >
                      {t(item.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
