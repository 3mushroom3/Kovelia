import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageTransition } from "@/components/motion/page-transition";
import { CaseStudy } from "@/components/sections/case-study";
import { CtaBand } from "@/components/sections/cta-band";
import { Directions } from "@/components/sections/directions";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { PricingPreview } from "@/components/sections/pricing-preview";
import { Process } from "@/components/sections/process";
import { StatsBar } from "@/components/sections/stats-bar";
import { TechMarquee } from "@/components/sections/tech-marquee";
import type { Locale } from "@/i18n/routing";
import { getCatalog, getPricing, getProjects } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return pageMetadata({ locale, path: "/" });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);

  const [catalog, projects] = await Promise.all([getCatalog(locale), getProjects(locale)]);
  const servicesCount = catalog.reduce((n, c) => n + c.services.length, 0);
  const featured = projects[0];

  return (
    <PageTransition>
      <Hero />
      <StatsBar servicesCount={servicesCount} />
      <Directions catalog={catalog} />
      {featured && <CaseStudy project={featured} />}
      <Process />
      <TechMarquee />
      <PricingPreview groups={getPricing(locale)} />
      <Faq />
      <CtaBand />
    </PageTransition>
  );
}
