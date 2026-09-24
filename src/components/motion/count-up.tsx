"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

type CountUpProps = {
  to: number;
  duration?: number;
  locale?: string;
  className?: string;
};

/** Animates a number from 0 when it scrolls into view. Server HTML already contains the final value. */
export function CountUp({ to, duration = 1.6, locale = "ru", className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const format = (n: number) => Math.round(n).toLocaleString(locale);

  useEffect(() => {
    if (!inView || reduced || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (node.textContent = format(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, to, duration]);

  return (
    <span ref={ref} className={className}>
      {format(to)}
    </span>
  );
}
