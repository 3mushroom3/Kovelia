import { useTranslations } from "next-intl";
import { LogoMark } from "@/components/brand/logo";
import { ArrowIcon, buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden bg-ink-gradient text-white">
      <div aria-hidden className="absolute inset-0 -z-10 bg-plus" />
      <LogoMark className="absolute -right-16 -bottom-20 -z-10 h-[28rem] w-auto opacity-10" />
      <Container className="pt-28 pb-16">
        <p className="text-brand-gradient font-mono text-7xl font-extrabold sm:text-9xl">404</p>
        <h1 className="mt-6 text-3xl font-bold sm:text-4xl">{t("title")}</h1>
        <p className="mt-3 text-white/65">{t("description")}</p>
        <Link href="/" className={`${buttonStyles({ variant: "light", size: "lg" })} mt-10`}>
          {t("back")}
          <ArrowIcon />
        </Link>
      </Container>
    </section>
  );
}
