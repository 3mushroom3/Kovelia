import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageTransition } from "@/components/motion/page-transition";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { ContactForm, type ServiceOptionGroup } from "@/features/contact/contact-form";
import type { Locale } from "@/i18n/routing";
import { getCatalog } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "Contact" });
  return pageMetadata({ locale, path: "/contact", title: t("title"), description: t("subtitle") });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const [t, catalog] = await Promise.all([getTranslations("Contact"), getCatalog(locale)]);
  const next = t.raw("next") as string[];

  const serviceGroups: ServiceOptionGroup[] = catalog.map((c) => ({
    label: `${c.index} · ${c.label}`,
    options: c.services.map((s) => ({ value: s.slug, label: s.title })),
  }));

  const info = [
    { label: t("info.email"), value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { label: t("info.response"), value: t("info.responseValue") },
    { label: t("info.format"), value: t("info.formatValue") },
  ];

  return (
    <PageTransition>
      <PageHero eyebrow="// contact" title={t("title")} subtitle={t("subtitle")} className="pb-28 sm:pb-36" />

      <Container className="relative z-10 -mt-20 grid gap-8 pb-24 lg:grid-cols-[1.5fr_1fr] lg:items-start">
        <Reveal className="rounded-3xl border border-border bg-surface p-6 shadow-lift sm:p-10">
          <h2 className="mb-8 text-2xl font-bold">{t("formTitle")}</h2>
          {/* useSearchParams needs a Suspense boundary for static rendering */}
          <Suspense>
            <ContactForm serviceGroups={serviceGroups} />
          </Suspense>
        </Reveal>

        <Reveal delay={0.15} className="grid gap-6 lg:sticky lg:top-28">
          <dl className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border shadow-card">
            {info.map((i) => (
              <div key={i.label} className="bg-surface px-6 py-5">
                <dt className="font-mono text-[0.7rem] tracking-[0.12em] text-muted-foreground uppercase">
                  {i.label}
                </dt>
                <dd className="mt-1 font-semibold break-all">
                  {i.href ? (
                    <a href={i.href} className="text-accent-strong hover:underline">
                      {i.value}
                    </a>
                  ) : (
                    i.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="rounded-3xl border border-border bg-surface p-6 shadow-card">
            <h2 className="font-bold">{t("nextTitle")}</h2>
            <ol className="mt-5 grid gap-4">
              {next.map((step, i) => (
                <li key={step} className="flex gap-4 text-sm">
                  <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-accent-soft font-mono text-xs font-bold text-accent-strong">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </Container>
    </PageTransition>
  );
}
