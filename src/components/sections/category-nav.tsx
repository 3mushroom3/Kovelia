"use client";

import { useEffect, useState } from "react";
import { accentColor } from "@/lib/accent";
import type { Accent, ServiceCategory } from "@/lib/cms/types";
import { cn } from "@/lib/utils";

/** Sticky chip bar for the catalog; highlights the direction currently in view. */
export function CategoryNav({
  categories,
  label,
  extra,
}: {
  categories: ServiceCategory[];
  label: string;
  extra?: { id: string; label: string };
}) {
  const [active, setActive] = useState<string | null>(null);
  const items: { id: string; label: string; accent?: Accent }[] = [
    ...categories.map((c) => ({ id: c.id, label: c.label, accent: c.accent })),
    ...(extra ? [extra] : []),
  ];

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav
      aria-label={label}
      className="sticky top-18 z-30 border-b border-border bg-background/85 backdrop-blur-xl"
    >
      <ul className="mx-auto flex max-w-7xl [scrollbar-width:none] gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-xs font-semibold whitespace-nowrap transition-colors",
                active === item.id
                  ? "border-accent-strong/40 bg-accent-soft text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {item.accent && (
                <span className="size-1.5 rounded-full" style={{ background: accentColor[item.accent] }} />
              )}
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
