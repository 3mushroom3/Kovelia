import "server-only";
import { z } from "zod";

// Server-side env, validated once. Everything is optional so the site builds without integrations.
const schema = z.object({
  SANITY_PROJECT_ID: z.string().optional(),
  SANITY_DATASET: z.string().default("production"),
  SANITY_API_READ_TOKEN: z.string().optional(),
  SANITY_REVALIDATE_SECRET: z.string().optional(),

  TELEGRAM_BOT_TOKEN: z.string().optional(),
  TELEGRAM_CHAT_ID: z.string().optional(),

  RESEND_API_KEY: z.string().optional(),
  CONTACT_EMAIL_TO: z.email().optional(),
  CONTACT_EMAIL_FROM: z.string().optional(),
});

const emptyToUndefined = Object.fromEntries(
  Object.entries(process.env).map(([k, v]) => [k, v === "" ? undefined : v]),
);

export const env = schema.parse(emptyToUndefined);

export const isSanityConfigured = Boolean(env.SANITY_PROJECT_ID);
