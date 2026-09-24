import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageTransition } from "@/components/motion/page-transition";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { privacy } from "@/content/privacy";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "Privacy" });
  return pageMetadata({ locale, path: "/privacy", title: t("title") });
}

export default async function PrivacyPage({ params }: PageProps<"/[locale]/privacy">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("Privacy");

  return (
    <PageTransition>
      <PageHero eyebrow="// legal" title={t("title")} subtitle={t("updated")} />
      <Container className="max-w-3xl py-20">
        <div className="grid gap-10">
          {privacy[locale].map((block) => (
            <section key={block.heading}>
              <h2 className="text-xl font-bold">{block.heading}</h2>
              {block.paragraphs.map((p) => (
                <p key={p} className="mt-3 leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </Container>
    </PageTransition>
  );
}
