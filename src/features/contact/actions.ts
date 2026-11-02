"use server";

import { headers } from "next/headers";
import { notifyContact } from "./notify";
import { clientIp, takeToken } from "./rate-limit";
import { contactSchema, type ContactErrorKey, type ContactState } from "./schema";

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: bots fill hidden fields, humans don't. Pretend success.
  if (formData.get("company")) return { status: "success" };

  const text = (key: string) => {
    const v = formData.get(key);
    return typeof v === "string" && v !== "" ? v : undefined;
  };
  // Required fields default to "" so zod reports our i18n keys instead of "expected string".
  const values = {
    name: text("name") ?? "",
    email: text("email") ?? "",
    phone: text("phone"),
    service: text("service"),
    message: text("message") ?? "",
    consent: text("consent"),
  };

  const parsed = contactSchema.safeParse(values);

  if (!parsed.success) {
    const fieldErrors: Extract<ContactState, { status: "error" }>["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof typeof fieldErrors;
      fieldErrors[field] ??= issue.message as ContactErrorKey;
    }
    return { status: "error", fieldErrors, values };
  }

  // Counted only for valid submissions, so typos don't eat a visitor's quota.
  // Without a proxy IP (local dev) there is nothing to key on; nginx limits POSTs in production.
  const ip = clientIp(await headers());
  if (ip && !takeToken(ip)) {
    console.warn("[contact] rate limited", ip);
    return { status: "error", values };
  }

  try {
    await notifyContact(parsed.data);
    return { status: "success" };
  } catch (err) {
    console.error("[contact] delivery failed", err);
    return { status: "error", values };
  }
}
