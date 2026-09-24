import type { Accent } from "@/lib/cms/types";

/** CSS color for a service-direction accent (tokens in globals.css). */
export const accentColor: Record<Accent, string> = {
  green: "var(--cat-green)",
  blue: "var(--cat-blue)",
  amber: "var(--cat-amber)",
  slate: "var(--cat-slate)",
};
