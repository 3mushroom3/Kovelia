"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations("Error");

  return (
    <section className="flex min-h-[70svh] items-center bg-ink-gradient text-white">
      <Container className="pt-28 pb-16">
        <h1 className="text-3xl font-bold sm:text-4xl">{t("title")}</h1>
        <Button variant="light" size="lg" onClick={reset} className="mt-8">
          {t("retry")}
        </Button>
      </Container>
    </section>
  );
}
