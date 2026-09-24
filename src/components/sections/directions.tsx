import { getTranslations } from "next-intl/server";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Spotlight } from "@/components/motion/spotlight";
import { ArrowIcon } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Link } from "@/i18n/navigation";
import { accentColor } from "@/lib/accent";
import type { CatalogCategory } from "@/lib/cms";

/** Bento grid of the four service directions. */
export async function Directions({ catalog }: { catalog: CatalogCategory[] }) {
  const t = await getTranslations("Directions");

  return (
    <Section eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")}>
      <Stagger className="grid gap-5 md:grid-cols-2">
        {catalog.map((c, i) => (
          <StaggerItem key={c.id} className={i === 0 || i === 3 ? "md:row-span-1" : undefined}>
            <Spotlight
              style={{ "--spot": accentColor[c.accent] } as React.CSSProperties}
              className="h-full rounded-2xl border border-border bg-surface shadow-card transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-lift"
            >
              <Link
                href={`/services#${c.id}`}
                className="group/link relative flex h-full flex-col p-7 sm:p-9"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="rounded-md px-2 py-1 font-mono text-[0.7rem] font-semibold tracking-[0.12em] uppercase"
                    style={{
                      color: accentColor[c.accent],
                      background: `color-mix(in oklab, ${accentColor[c.accent]} 14%, transparent)`,
                    }}
                  >
                    {c.index} / {c.label}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {t("count", { count: c.services.length })}
                  </span>
                </div>

                <h3 className="mt-8 text-2xl font-bold tracking-tight text-balance">{c.title}</h3>
                <p className="mt-3 text-muted-foreground">{c.description}</p>

                <ul className="mt-6 grid gap-2 text-sm">
                  {c.services.map((s) => (
                    <li key={s.slug} className="flex items-start gap-2.5">
                      <span
                        aria-hidden
                        className="mt-2 size-1.5 shrink-0 rounded-full"
                        style={{ background: accentColor[c.accent] }}
                      />
                      {s.title}
                    </li>
                  ))}
                </ul>

                <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-accent-strong">
                  {t("more")}
                  <ArrowIcon />
                </span>

                {/* accent line that grows on hover */}
                <span
                  aria-hidden
                  className="absolute top-0 left-9 h-[3px] w-10 origin-left rounded-b-full transition-transform duration-500 group-hover/link:scale-x-[3]"
                  style={{ background: accentColor[c.accent] }}
                />
              </Link>
            </Spotlight>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
