import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageTransition } from "@/components/motion/page-transition";
import { CategoryNav } from "@/components/sections/category-nav";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { PriceTable } from "@/components/sections/price-table";
import { ServiceCatalog } from "@/components/sections/service-catalog";
import type { Locale } from "@/i18n/routing";
import { getCatalog, getPricing } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/services">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "Services" });
  return pageMetadata({ locale, path: "/services", title: t("title"), description: t("subtitle") });
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);

  const [t, tPricing, catalog] = await Promise.all([
    getTranslations("Services"),
    getTranslations("Pricing"),
    getCatalog(locale),
  ]);

  return (
    <PageTransition>
      <PageHero eyebrow="// services" title={t("title")} subtitle={t("subtitle")} />
      <CategoryNav
        categories={catalog}
        label={t("nav")}
        extra={{ id: "pricing", label: tPricing("eyebrow") }}
      />
      <ServiceCatalog catalog={catalog} />
      <PriceTable groups={getPricing(locale)} />
      <CtaBand />
    </PageTransition>
  );
}
