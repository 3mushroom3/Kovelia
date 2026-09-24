import "server-only";
import type { Locale } from "@/i18n/routing";
import { pricing } from "@/content/pricing";
import { projects } from "@/content/projects";
import { categories, services } from "@/content/services";
import { sanityFetch } from "./client";
import { projectsQuery, servicesQuery } from "./queries";
import type { PriceGroup, Project, Service, ServiceCategory } from "./types";

export type * from "./types";

// Public content API. Pages import from "@/lib/cms" only.
// Services and projects come from Sanity when configured, otherwise from src/content.
// Categories and pricing are static content (src/content) — they change rarely and need review anyway.

export async function getServices(locale: Locale): Promise<Service[]> {
  const fromCms = await sanityFetch<Service[]>(servicesQuery, { locale });
  return fromCms?.length ? fromCms : services[locale];
}

export async function getProjects(locale: Locale): Promise<Project[]> {
  const fromCms = await sanityFetch<Project[]>(projectsQuery, { locale });
  return fromCms?.length ? fromCms : projects[locale];
}

export function getCategories(locale: Locale): ServiceCategory[] {
  return categories[locale];
}

export function getPricing(locale: Locale): PriceGroup[] {
  return pricing[locale];
}

/** Categories with their services attached, in catalog order. */
export async function getCatalog(locale: Locale) {
  const all = await getServices(locale);
  return getCategories(locale).map((category) => ({
    ...category,
    services: all.filter((s) => s.category === category.id),
  }));
}

export type CatalogCategory = Awaited<ReturnType<typeof getCatalog>>[number];
