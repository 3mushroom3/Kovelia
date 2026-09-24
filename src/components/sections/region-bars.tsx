"use client";

import { motion } from "motion/react";

// Illustrative figures for the product preview (not live data).
const REGIONS: [string, number][] = [
  ["Ростовская обл.", 100],
  ["Краснодарский край", 86],
  ["Ставропольский край", 71],
  ["Воронежская обл.", 54],
  ["Алтайский край", 42],
];

export function RegionBars() {
  return (
    <ul className="grid gap-2.5">
      {REGIONS.map(([name, pct], i) => (
        <li key={name} className="flex items-center gap-3 text-[0.7rem]">
          <span className="w-[42%] truncate">{name}</span>
          <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#f1f5f4]">
            <motion.span
              className="block h-full rounded-full bg-[#075c44]"
              initial={{ width: 0 }}
              whileInView={{ width: `${pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            />
          </span>
        </li>
      ))}
    </ul>
  );
}
