"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/brand/logo";
import { ArrowIcon, buttonStyles } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Full-screen ink overlay menu for small screens. */
export function MobileMenu() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- portal target only exists on the client
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const overlay = (
    <AnimatePresence>
      {open && (
        <motion.div
          key="menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] flex flex-col bg-ink-gradient text-white lg:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="pointer-events-none absolute inset-0 bg-plus" />
          <div className="relative flex h-18 items-center justify-between px-4 sm:px-6">
            <Logo inverted className="h-10" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("close")}
              className="grid size-10 place-items-center rounded-lg hover:bg-white/10"
            >
              <svg
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <nav className="relative flex-1 px-4 pt-8 sm:px-6">
            <ul className="grid gap-2">
              {siteConfig.nav.map((item, i) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <motion.li
                    key={item.key}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i + 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-baseline gap-4 py-2 text-4xl font-bold tracking-tight",
                        active ? "text-white" : "text-white/60",
                      )}
                    >
                      <span className="font-mono text-sm text-[#7ee2b5]">0{i + 1}</span>
                      {t(item.key)}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </nav>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative px-4 pb-[calc(2rem+env(safe-area-inset-bottom))] sm:px-6"
          >
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className={cn(buttonStyles({ variant: "light", size: "lg" }), "w-full")}
            >
              {t("cta")}
              <ArrowIcon />
            </Link>
            <p className="mt-4 text-center font-mono text-xs text-white/50">{siteConfig.email}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        type="button"
        aria-label={t("menu")}
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className={cn(
          "grid size-10 place-items-center rounded-lg transition-colors lg:hidden",
          "text-foreground hover:bg-surface-2",
          "group-data-[top=true]/header:text-white group-data-[top=true]/header:hover:bg-white/10",
        )}
      >
        <svg
          className="size-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <path d="M4 7h16M4 12h16M4 17h10" />
        </svg>
      </button>
      {mounted && createPortal(overlay, document.body)}
    </>
  );
}
