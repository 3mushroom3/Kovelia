"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations("Nav");
  const current = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={t("switchLocale")} className={cn("flex items-center text-xs", className)}>
      {routing.locales.map((locale) => (
        <Link
          key={locale}
          href={pathname}
          locale={locale}
          aria-current={locale === current ? "true" : undefined}
          className={cn(
            "rounded-md px-2 py-1.5 font-mono font-semibold tracking-wider uppercase transition-colors",
            locale === current
              ? "text-foreground group-data-[top=true]/header:text-white"
              : "text-muted-foreground group-data-[top=true]/header:text-white/50 hover:text-foreground group-data-[top=true]/header:hover:text-white",
          )}
        >
          {locale}
        </Link>
      ))}
    </nav>
  );
}
