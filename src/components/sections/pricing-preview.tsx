import { getTranslations } from "next-intl/server";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { ArrowIcon, buttonStyles } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Link } from "@/i18n/navigation";
import type { PriceGroup } from "@/lib/cms";

/** First offer of each price group as a card, with a link to the full price list. */
export async function PricingPreview({ groups }: { groups: PriceGroup[] }) {
  const t = await getTranslations("Pricing");

  return (
    <Section
      eyebrow={t("eyebrow")}
      title={t("title")}
      subtitle={t("note")}
      aside={
        <Link href="/services#pricing" className={buttonStyles({ variant: "secondary" })}>
          {t("viewAll")}
          <ArrowIcon />
        </Link>
      }
    >
      <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((g) => {
          const item = g.items[0];
          return (
            <StaggerItem
              key={g.title}
              className="group/card flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-card transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-accent-strong/30 hover:shadow-lift"
            >
              <p className="font-mono text-[0.7rem] tracking-[0.12em] text-accent-strong uppercase">
                {g.title}
              </p>
              <h3 className="mt-4 font-semibold text-balance">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.note}</p>
              <p className="mt-auto pt-6 text-2xl font-extrabold tracking-tight tabular-nums">
                {item.price}
                <span className="ml-1.5 text-sm font-medium text-muted-foreground">
                  / {t(`unit.${item.unit}`)}
                </span>
              </p>
              <Link
                href={{ pathname: "/contact", query: item.service ? { service: item.service } : undefined }}
                className="group/link mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent-strong"
              >
                {t("order")}
                <ArrowIcon />
              </Link>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
