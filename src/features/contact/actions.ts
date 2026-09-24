"use server";

import { notifyContact } from "./notify";
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

  try {
    await notifyContact(parsed.data);
    return { status: "success" };
  } catch (err) {
    console.error("[contact] delivery failed", err);
    return { status: "error", values };
  }
}
