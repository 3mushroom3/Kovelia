import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Eyebrow } from "./eyebrow";

type SectionProps = Omit<React.ComponentProps<"section">, "title"> & {
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Right side of the header row, e.g. a "view all" link. */
  aside?: React.ReactNode;
  center?: boolean;
};

export function Section({
  eyebrow,
  title,
  subtitle,
  aside,
  center,
  className,
  children,
  ...props
}: SectionProps) {
  const hasHeader = eyebrow || title || subtitle;

  return (
    <section className={cn("py-20 sm:py-28", className)} {...props}>
      <Container>
        {hasHeader && (
          <Reveal
            className={cn(
              "mb-12 flex flex-col gap-6 sm:mb-16 lg:flex-row lg:items-end lg:justify-between",
              center && "items-center text-center lg:flex-col lg:items-center",
            )}
          >
            <header className={cn("max-w-2xl", center && "mx-auto")}>
              {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
              {title && (
                <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-[2.6rem] sm:leading-[1.1]">
                  {title}
                </h2>
              )}
              {subtitle && <p className="mt-4 text-lg text-pretty text-muted-foreground">{subtitle}</p>}
            </header>
            {aside}
          </Reveal>
        )}
        {children}
      </Container>
    </section>
  );
}
