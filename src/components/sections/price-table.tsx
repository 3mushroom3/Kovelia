import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { ArrowIcon } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Link } from "@/i18n/navigation";
import type { PriceGroup } from "@/lib/cms";

export async function PriceTable({ groups }: { groups: PriceGroup[] }) {
  const t = await getTranslations("Pricing");

  return (
    <Section
      id="pricing"
      eyebrow={t("eyebrow")}
      title={t("title")}
      subtitle={t("note")}
      className="bg-surface"
    >
      <div className="grid gap-10">
        {groups.map((g) => (
          <Reveal key={g.title}>
            <h3 className="mb-3 font-mono text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              {g.title}
            </h3>
            <ul className="overflow-hidden rounded-2xl border border-border bg-background">
              {g.items.map((item) => (
                <li key={item.title} className="border-b border-border last:border-b-0">
                  <Link
                    href={{
                      pathname: "/contact",
                      query: item.service ? { service: item.service } : undefined,
                    }}
                    className="group/link grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 px-5 py-4 transition-colors hover:bg-accent-soft/60 sm:grid-cols-[1fr_auto_4.5rem_auto] sm:px-6"
                  >
                    <span>
                      <span className="block font-medium">{item.title}</span>
                      <span className="block text-sm text-muted-foreground">{item.note}</span>
                    </span>
                    <span className="text-right font-mono text-sm font-bold whitespace-nowrap tabular-nums sm:text-base">
                      {item.price}
                    </span>
                    <span className="hidden text-right font-mono text-xs text-muted-foreground sm:block">
                      {t(`unit.${item.unit}`)}
                    </span>
                    <span className="hidden text-accent-strong opacity-0 transition-opacity group-hover/link:opacity-100 sm:block">
                      <ArrowIcon />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
