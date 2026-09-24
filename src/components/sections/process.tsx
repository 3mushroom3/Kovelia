"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";

type Step = { title: string; text: string };

/** Four steps connected by a line that fills as the section scrolls through the viewport. */
export function Process({ className }: { className?: string }) {
  const t = useTranslations("Process");
  const steps = t.raw("steps") as Step[];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <Section eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} className={className}>
      <div ref={ref} className="relative">
        {/* connector: horizontal on desktop */}
        <div aria-hidden className="absolute top-6 right-[12.5%] left-[12.5%] hidden h-px bg-border lg:block">
          <motion.div style={{ scaleX: progress }} className="h-full origin-left bg-primary" />
        </div>

        <Stagger as="ol" stagger={0.12} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, i) => (
            <StaggerItem as="li" key={step.title} className="relative lg:text-center">
              <span className="relative z-10 mb-6 grid size-12 place-items-center rounded-2xl border border-border bg-surface font-mono text-sm font-bold text-accent-strong shadow-card lg:mx-auto">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
