import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

type PageMetaInput = {
  locale: Locale;
  path: string; // locale-agnostic path, e.g. "/about"
  title?: string;
  description?: string;
};

/** Canonical + hreflang alternates + OpenGraph for a page. */
export function pageMetadata({ locale, path, title, description }: PageMetaInput): Metadata {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, getPathname({ locale: l, href: path })]),
  );

  return {
    title,
    description,
    alternates: {
      canonical: getPathname({ locale, href: path }),
      languages: { ...languages, "x-default": getPathname({ locale: routing.defaultLocale, href: path }) },
    },
    openGraph: {
      title,
      description,
      siteName: siteConfig.name,
      locale,
      type: "website",
      url: getPathname({ locale, href: path }),
    },
  };
}
