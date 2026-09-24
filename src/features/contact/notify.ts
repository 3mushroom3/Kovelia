import "server-only";
import { services } from "@/content/services";
import { env } from "@/lib/env";
import type { ContactInput } from "./schema";

function format(data: ContactInput) {
  const service = data.service && (services.ru.find((s) => s.slug === data.service)?.title ?? data.service);
  return [
    "New request from the website",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    service ? `Service: ${service}` : null,
    "",
    data.message,
  ]
    .filter((l) => l !== null)
    .join("\n");
}

async function sendTelegram(text: string) {
  const res = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text }),
  });
  if (!res.ok) throw new Error(`Telegram: ${res.status} ${await res.text()}`);
}

async function sendEmail(data: ContactInput, text: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.RESEND_API_KEY}` },
    body: JSON.stringify({
      from: env.CONTACT_EMAIL_FROM ?? "Kovelia Website <onboarding@resend.dev>",
      to: env.CONTACT_EMAIL_TO,
      reply_to: data.email,
      subject: `Website request: ${data.name}`,
      text,
    }),
  });
  if (!res.ok) throw new Error(`Resend: ${res.status} ${await res.text()}`);
}

/** Delivers a lead to every configured channel. Succeeds if at least one channel accepted it. */
export async function notifyContact(data: ContactInput): Promise<void> {
  const text = format(data);
  const jobs: Promise<void>[] = [];

  if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) jobs.push(sendTelegram(text));
  if (env.RESEND_API_KEY && env.CONTACT_EMAIL_TO) jobs.push(sendEmail(data, text));

  if (jobs.length === 0) {
    if (process.env.NODE_ENV === "production") throw new Error("No contact channel configured");
    console.info("[contact] no channel configured, message:\n" + text);
    return;
  }

  const results = await Promise.allSettled(jobs);
  const failed = results.filter((r) => r.status === "rejected");
  failed.forEach((r) => console.error("[contact]", (r as PromiseRejectedResult).reason));
  if (failed.length === results.length) throw new Error("All contact channels failed");
}
