"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { LogoMark } from "@/components/brand/logo";
import { ArrowIcon, buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { NetworkCanvas } from "./network-canvas";

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay },
});

// Chips orbiting the logo mark: [label, position classes, float delay]
const CHIPS: [string, string, string][] = [
  ["LLM · RAG", "left-[2%] top-[18%]", "0s"],
  ["PostgreSQL", "right-[0%] top-[8%]", "1.2s"],
  ["AI-agents", "right-[-4%] top-[58%]", "2.4s"],
  ["C++20", "left-[8%] bottom-[10%]", "0.6s"],
  ["WireGuard", "right-[22%] bottom-[-2%]", "1.8s"],
];

export function Hero() {
  const t = useTranslations("Hero");
  const words = t("titleStart").split(" ");

  return (
    <section className="relative isolate overflow-hidden bg-ink-gradient text-white">
      <div aria-hidden className="absolute inset-0 -z-10 bg-plus" />
      <NetworkCanvas className="absolute inset-0 -z-10 h-full w-full" />
      {/* bottom fade into the page */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-b from-transparent to-[#021a18]/40"
      />

      <Container className="grid min-h-[100svh] items-center gap-12 pt-28 pb-20 lg:grid-cols-[1.15fr_0.85fr] lg:pt-32">
        <div>
          <motion.p
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-xs tracking-wide text-white/80 backdrop-blur"
          >
            <span className="size-1.5 animate-blink rounded-full bg-[#7ee2b5]" />
            {t("badge")}
          </motion.p>

          <h1 className="mt-7 text-[2.6rem] leading-[1.04] font-extrabold tracking-tight text-balance sm:text-6xl lg:text-[4.6rem]">
            {words.map((word, i) => (
              <motion.span key={i} {...fadeUp(0.1 + i * 0.06)} className="mr-[0.25em] inline-block">
                {word}
              </motion.span>
            ))}
            <motion.span {...fadeUp(0.25)} className="inline text-brand-gradient">
              {t("titleAccent")}
            </motion.span>{" "}
            <motion.span {...fadeUp(0.4)} className="inline-block text-white/90">
              {t("titleEnd")}
            </motion.span>
          </h1>

          <motion.p
            {...fadeUp(0.55)}
            className="mt-7 max-w-xl text-lg leading-relaxed text-pretty text-white/70"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div {...fadeUp(0.7)} className="mt-10 flex flex-wrap gap-3">
            <Link href="/contact" className={buttonStyles({ variant: "light", size: "lg" })}>
              {t("ctaPrimary")}
              <ArrowIcon />
            </Link>
            <Link href="/services" className={buttonStyles({ variant: "outlineLight", size: "lg" })}>
              {t("ctaSecondary")}
            </Link>
          </motion.div>

          <motion.ul
            {...fadeUp(0.85)}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-white/55"
          >
            {(["contract", "remote", "direct"] as const).map((k) => (
              <li key={k} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-[#3cc07f]" />
                {t(`facts.${k}`)}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Brand visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
          className="relative mx-auto hidden aspect-square w-full max-w-md lg:block"
          aria-hidden
        >
          <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgb(47_197_138/0.45),transparent_65%)] blur-2xl" />
          <div className="absolute inset-[6%] rounded-full border border-white/10" />
          <div className="absolute inset-[20%] rounded-full border border-dashed border-white/10 motion-safe:animate-[spin_60s_linear_infinite]" />
          <div className="absolute inset-[26%] animate-float drop-shadow-[0_20px_40px_rgb(0_0_0/0.35)]">
            <LogoMark priority className="h-full w-full" />
          </div>
          {CHIPS.map(([label, pos, delay]) => (
            <span
              key={label}
              style={{ animationDelay: delay }}
              className={cn(
                "absolute animate-float rounded-lg border border-white/15 bg-white/[0.07] px-3 py-1.5 font-mono text-xs text-white/80 shadow-lg backdrop-blur-md",
                pos,
              )}
            >
              {label}
            </span>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
