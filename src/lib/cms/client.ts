import "server-only";
import { createClient, type QueryParams } from "next-sanity";
import { env, isSanityConfigured } from "@/lib/env";

export const SANITY_TAG = "sanity";

const client = isSanityConfigured
  ? createClient({
      projectId: env.SANITY_PROJECT_ID,
      dataset: env.SANITY_DATASET,
      apiVersion: "2026-01-01",
      useCdn: !env.SANITY_API_READ_TOKEN,
      token: env.SANITY_API_READ_TOKEN,
    })
  : null;

/**
 * Cached Sanity fetch. Invalidated on-demand by /api/revalidate (Sanity webhook),
 * with a time-based fallback so content never gets stuck.
 */
export async function sanityFetch<T>(query: string, params: QueryParams = {}): Promise<T | null> {
  if (!client) return null;
  return client.fetch<T>(query, params, {
    next: { revalidate: 3600, tags: [SANITY_TAG] },
  });
}
