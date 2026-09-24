import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
};

/** Dark brand band at the top of inner pages; keeps the header's light-on-ink state consistent site-wide. */
export function PageHero({ eyebrow, title, subtitle, children, className }: PageHeroProps) {
  return (
    <section className={cn("relative isolate overflow-hidden bg-ink-gradient text-white", className)}>
      <div aria-hidden className="absolute inset-0 -z-10 bg-plus" />
      <div
        aria-hidden
        className="absolute -top-40 -right-40 -z-10 size-[36rem] rounded-full bg-[radial-gradient(circle,rgb(43_143_224/0.25),transparent_65%)] blur-2xl"
      />
      <Container className="pt-36 pb-20 sm:pt-44 sm:pb-24">
        <Reveal>
          {eyebrow && (
            <Eyebrow inverted className="mb-5">
              {eyebrow}
            </Eyebrow>
          )}
          <h1 className="max-w-4xl text-4xl leading-[1.08] font-extrabold tracking-tight text-balance sm:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-white/70">{subtitle}</p>
          )}
        </Reveal>
        {children}
      </Container>
    </section>
  );
}
