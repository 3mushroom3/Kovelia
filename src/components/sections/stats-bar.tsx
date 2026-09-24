import { getLocale, getTranslations } from "next-intl/server";
import { CountUp } from "@/components/motion/count-up";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";

type Stat = { value: number; key: "directions" | "services" | "response" | "steps" };

/** Key numbers in cards that overlap the bottom edge of the hero. */
export async function StatsBar({ servicesCount }: { servicesCount: number }) {
  const [t, locale] = await Promise.all([getTranslations("Stats"), getLocale()]);
  const stats: Stat[] = [
    { value: 4, key: "directions" },
    { value: servicesCount, key: "services" },
    { value: 1, key: "response" },
    { value: 4, key: "steps" },
  ];

  return (
    <Container className="relative z-10 -mt-14">
      <Stagger className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-lift lg:grid-cols-4">
        {stats.map((s) => (
          <StaggerItem key={s.key} className="bg-surface px-6 py-7">
            <p className="text-4xl font-extrabold tracking-tight tabular-nums sm:text-5xl">
              <CountUp to={s.value} locale={locale} className="text-brand-gradient" />
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{t(s.key)}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </Container>
  );
}
