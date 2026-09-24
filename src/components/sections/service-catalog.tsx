import { getTranslations } from "next-intl/server";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Spotlight } from "@/components/motion/spotlight";
import { ArrowIcon } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Tag } from "@/components/ui/tag";
import { Link } from "@/i18n/navigation";
import { accentColor } from "@/lib/accent";
import type { CatalogCategory } from "@/lib/cms";

/** Full catalog: one block per direction (anchor = category id), a card per service with an order link. */
export async function ServiceCatalog({ catalog }: { catalog: CatalogCategory[] }) {
  const t = await getTranslations("Services");

  return (
    <div className="py-8">
      {catalog.map((c) => (
        <section key={c.id} id={c.id} className="py-14 sm:py-20">
          <Container>
            <Reveal className="mb-10 grid gap-4 border-b border-border pb-8 lg:grid-cols-[auto_1fr] lg:gap-12">
              <p
                className="font-mono text-6xl font-extrabold tracking-tighter sm:text-7xl"
                style={{ color: `color-mix(in oklab, ${accentColor[c.accent]} 70%, transparent)` }}
              >
                {c.index}
              </p>
              <div>
                <p
                  className="font-mono text-xs font-semibold tracking-[0.14em] uppercase"
                  style={{ color: accentColor[c.accent] }}
                >
                  {c.label}
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{c.title}</h2>
                <p className="mt-3 max-w-2xl text-muted-foreground">{c.description}</p>
              </div>
            </Reveal>

            <Stagger className="grid gap-5 md:grid-cols-2">
              {c.services.map((s) => (
                <StaggerItem key={s.slug}>
                  <Spotlight
                    style={{ "--spot": accentColor[c.accent] } as React.CSSProperties}
                    className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-7 shadow-card transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-lift"
                  >
                    <span
                      aria-hidden
                      className="absolute top-7 bottom-7 left-0 w-[3px] rounded-r-full"
                      style={{ background: accentColor[c.accent] }}
                    />
                    <h3 className="text-lg font-bold">{s.title}</h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">{s.summary}</p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {s.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                    <Link
                      href={{ pathname: "/contact", query: { service: s.slug } }}
                      className="group/link relative mt-auto inline-flex items-center gap-2 self-start pt-6 text-sm font-semibold text-accent-strong"
                    >
                      {t("order")}
                      <ArrowIcon />
                    </Link>
                  </Spotlight>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </section>
      ))}
    </div>
  );
}
