import { getTranslations } from "next-intl/server";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ArrowIcon } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Link } from "@/i18n/navigation";

type Item = { q: string; a: string };

/** Two columns: sticky heading on the left, native <details> accordion on the right (works without JS). */
export async function Faq() {
  const [t, tNav] = await Promise.all([getTranslations("Faq"), getTranslations("Nav")]);
  const items = t.raw("items") as Item[];

  return (
    <section className="py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-[2.6rem] sm:leading-[1.1]">
            {t("title")}
          </h2>
          <Link
            href="/contact"
            className="group/link mt-6 inline-flex items-center gap-2 font-semibold text-accent-strong"
          >
            {tNav("cta")}
            <ArrowIcon />
          </Link>
        </Reveal>

        <Stagger className="grid gap-3">
          {items.map((item) => (
            <StaggerItem key={item.q}>
              <details
                name="faq"
                className="group/faq rounded-2xl border border-border bg-surface px-6 shadow-card transition-colors open:border-accent-strong/30 [&::details-content]:h-0 [&::details-content]:overflow-hidden [&::details-content]:transition-[height,content-visibility] [&::details-content]:[transition-behavior:allow-discrete] [&::details-content]:duration-300 open:[&::details-content]:h-auto"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-semibold [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    aria-hidden
                    className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-strong transition-transform duration-300 group-open/faq:rotate-45"
                  >
                    <svg
                      viewBox="0 0 16 16"
                      className="size-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M8 3v10M3 8h10" />
                    </svg>
                  </span>
                </summary>
                <p className="pb-6 leading-relaxed text-muted-foreground">{item.a}</p>
              </details>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
