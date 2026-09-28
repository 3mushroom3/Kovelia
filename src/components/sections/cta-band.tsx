import { getTranslations } from "next-intl/server";
import { LogoMark } from "@/components/brand/logo";
import { Reveal } from "@/components/motion/reveal";
import { ArrowIcon, buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site";

export async function CtaBand() {
  const t = await getTranslations("Cta");

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal className="relative isolate overflow-hidden rounded-[2rem] bg-ink-gradient px-7 py-14 text-white sm:px-14 sm:py-20">
          <div aria-hidden className="absolute inset-0 -z-10 bg-plus" />
          <LogoMark className="absolute -right-10 -bottom-16 -z-10 h-80 w-auto opacity-15 sm:h-[26rem]" />
          <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight text-balance sm:text-5xl sm:leading-[1.08]">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-xl text-lg text-white/70">{t("subtitle")}</p>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link href="/contact" className={buttonStyles({ variant: "light", size: "lg" })}>
              {t("button")}
              <ArrowIcon />
            </Link>
            <p className="text-sm text-white/60">
              {t("or")}{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-medium text-white underline-offset-4 hover:underline"
              >
                {siteConfig.email}
              </a>
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
