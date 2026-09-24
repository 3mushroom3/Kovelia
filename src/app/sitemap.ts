import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

// Add new static pages here.
const pages = ["/", "/services", "/about", "/contact", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (locale: (typeof routing.locales)[number], href: string) =>
    siteConfig.url + getPathname({ locale, href });

  return pages.map((href) => ({
    url: url(routing.defaultLocale, href),
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(routing.locales.map((l) => [l, url(l, href)])),
    },
  }));
}
