import { defineQuery } from "next-sanity";

// Localized fields are stored as { ru, en } objects; fall back to ru when a translation is missing.
export const servicesQuery = defineQuery(`
  *[_type == "service"] | order(order asc) {
    "slug": slug.current,
    category,
    "title": coalesce(title[$locale], title.ru),
    "summary": coalesce(summary[$locale], summary.ru),
    "tags": coalesce(tags, [])
  }
`);

export const projectsQuery = defineQuery(`
  *[_type == "project"] | order(_createdAt desc) {
    "slug": slug.current,
    "title": coalesce(title[$locale], title.ru),
    "client": coalesce(client[$locale], client.ru),
    "summary": coalesce(summary[$locale], summary.ru),
    url,
    "tags": coalesce(tags, [])
  }
`);
