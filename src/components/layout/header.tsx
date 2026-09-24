"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/brand/logo";
import { ArrowIcon, buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileMenu } from "./mobile-menu";
import { NavLink } from "./nav-link";
import { ThemeToggle } from "./theme-toggle";

/**
 * Every page starts with a dark "ink" hero, so the header is transparent with light text at the top
 * and turns into a frosted surface once the page is scrolled.
 */
export function Header() {
  const t = useTranslations("Nav");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-top={!scrolled}
      style={{ viewTransitionName: "site-header" }}
      className={cn(
        "group/header fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
        scrolled
          ? "border-b border-border bg-background/80 shadow-[0_2px_20px_rgb(0_0_0/0.05)] backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only rounded-lg bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        {t("skip")}
      </a>
      <Container className="flex h-18 items-center justify-between gap-6">
        <Link href="/" aria-label="KOVELIA" className="rounded-lg">
          <Logo inverted={!scrolled} />
        </Link>

        <nav className="hidden lg:block" aria-label="Main">
          <ul className="flex items-center gap-1">
            {siteConfig.nav.map((item) => (
              <li key={item.key}>
                <NavLink href={item.href}>{t(item.key)}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <LocaleSwitcher />
          <ThemeToggle />
          <Link
            href="/contact"
            className={cn(
              buttonStyles({ variant: scrolled ? "primary" : "light", size: "sm" }),
              "ml-2 hidden sm:inline-flex",
            )}
          >
            {t("cta")}
            <ArrowIcon />
          </Link>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
