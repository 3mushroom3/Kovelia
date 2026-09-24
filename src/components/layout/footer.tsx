import { getTranslations } from "next-intl/server";
import { Logo } from "@/components/brand/logo";
import { ArrowIcon } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getCategories } from "@/lib/cms";
import { siteConfig } from "@/lib/site";

export async function Footer({ locale }: { locale: Locale }) {
  const [t, tNav] = await Promise.all([getTranslations("Footer"), getTranslations("Nav")]);
  const categories = getCategories(locale);
  const linkClass = "text-white/60 transition-colors hover:text-white";

  return (
    <footer className="relative shrink-0 overflow-hidden bg-ink-gradient text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-plus" />
      <Container className="relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr]">
        <div className="max-w-xs">
          <Logo inverted tagline />
          <p className="mt-6 text-sm leading-relaxed text-white/60">{t("tagline")}</p>
        </div>

        <nav aria-label={t("nav")}>
          <h2 className="mb-4 font-mono text-xs tracking-[0.14em] text-white/40 uppercase">{t("nav")}</h2>
          <ul className="grid gap-2.5 text-sm">
            {siteConfig.nav.map((item) => (
              <li key={item.key}>
                <Link href={item.href} className={linkClass}>
                  {tNav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 font-mono text-xs tracking-[0.14em] text-white/40 uppercase">
            {t("services")}
          </h2>
          <ul className="grid gap-2.5 text-sm">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/services#${c.id}`} className={linkClass}>
                  {c.label} <span className="text-white/35">— {c.index}</span>
                </Link>
              </li>
            ))}
            {siteConfig.products.map((p) => (
              <li key={p.url}>
                <a href={p.url} target="_blank" rel="noopener" className={linkClass}>
                  {p.name} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-mono text-xs tracking-[0.14em] text-white/40 uppercase">{t("contact")}</h2>
          <a href={`mailto:${siteConfig.email}`} className="text-sm break-all text-white/80 hover:text-white">
            {siteConfig.email}
          </a>
          <Link
            href="/contact"
            className="group/link mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#7ee2b5] hover:text-white"
          >
            {tNav("cta")}
            <ArrowIcon />
          </Link>
        </div>
      </Container>

      <Container className="relative flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} KOVELIA. {t("rights")}
        </p>
        <Link href="/privacy" className="hover:text-white">
          {t("privacy")}
        </Link>
      </Container>
    </footer>
  );
}
