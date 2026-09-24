import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LogoMark } from "@/components/brand/logo";
import { PageTransition } from "@/components/motion/page-transition";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { Process } from "@/components/sections/process";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";

type Principle = { title: string; text: string };
type Fact = { label: string; value: string };

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "About" });
  return pageMetadata({ locale, path: "/about", title: t("title"), description: t("subtitle") });
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("About");
  const principles = t.raw("principles") as Principle[];
  const facts = t.raw("facts") as Fact[];

  return (
    <PageTransition>
      <PageHero eyebrow="// about" title={t("title")} subtitle={t("subtitle")}>
        <Stagger className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4">
          {facts.map((f) => (
            <StaggerItem key={f.label} className="bg-[#021a18]/60 px-5 py-5 backdrop-blur">
              <p className="font-mono text-[0.7rem] tracking-[0.12em] text-white/45 uppercase">{f.label}</p>
              <p className="mt-1.5 font-semibold">{f.value}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </PageHero>

      <section className="py-20 sm:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-[1fr_0.8fr]">
          <Reveal>
            <Eyebrow>{t("missionEyebrow")}</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance sm:text-[2.6rem] sm:leading-[1.1]">
              {t("missionTitle")}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{t("missionText")}</p>
          </Reveal>
          <Reveal delay={0.15} className="relative mx-auto aspect-square w-full max-w-sm">
            <div className="absolute inset-0 rounded-[2rem] border border-border bg-surface bg-plus-muted" />
            <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,rgb(47_197_138/0.3),transparent_65%)] blur-xl" />
            <LogoMark className="absolute inset-[24%] h-[52%] w-[52%] animate-float" />
            <p className="absolute inset-x-0 bottom-6 text-center font-mono text-xs tracking-wide text-muted-foreground">
              Data / Intelligence / Platforms
            </p>
          </Reveal>
        </Container>
      </section>

      <Section eyebrow={t("principlesEyebrow")} title={t("principlesTitle")} className="bg-surface">
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => (
            <StaggerItem key={p.title} className="rounded-2xl border border-border bg-background p-7">
              <span className="font-mono text-sm font-bold text-accent-strong">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-xl font-bold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Process />
      <TechMarquee />
      <CtaBand />
    </PageTransition>
  );
}
