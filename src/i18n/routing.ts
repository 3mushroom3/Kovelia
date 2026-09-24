import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ru", "en"],
  defaultLocale: "ru",
  // /about for ru, /en/about for en
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
