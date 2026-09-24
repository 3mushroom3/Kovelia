"use client";

import { motion, type HTMLMotionProps, type Variants } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  /** Vertical offset in px the element rises from. */
  y?: number;
};

/** Fades and lifts its children in once they scroll into view. */
export function Reveal({ delay = 0, y = 24, children, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

const container: Variants = {
  hidden: {},
  show: (stagger: number = 0.08) => ({ transition: { staggerChildren: stagger } }),
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

type StaggerProps = HTMLMotionProps<"div"> & { stagger?: number; as?: "div" | "ul" | "ol" };

/** Reveals <StaggerItem> children one after another. */
export function Stagger({ stagger = 0.08, as = "div", children, ...props }: StaggerProps) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      variants={container}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      {...props}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({ as = "div", ...props }: HTMLMotionProps<"div"> & { as?: "div" | "li" }) {
  const Component = motion[as] as typeof motion.div;
  return <Component variants={item} {...props} />;
}
