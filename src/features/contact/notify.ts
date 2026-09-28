import "server-only";
import nodemailer from "nodemailer";
import { services } from "@/content/services";
import { env } from "@/lib/env";
import type { ContactInput } from "./schema";

// Leads are read by the KOVELIA team, so notifications are in Russian regardless of the site locale.

function serviceTitle(slug?: string) {
  if (!slug) return undefined;
  if (slug === "other") return "Другое / пока не знает";
  return services.ru.find((s) => s.slug === slug)?.title ?? slug;
}

function format(data: ContactInput) {
  const service = serviceTitle(data.service);
  return [
    "Новая заявка с сайта kovelia.ru",
    "",
    `Имя: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Телефон: ${data.phone}` : null,
    service ? `Услуга: ${service}` : null,
    "",
    "Описание задачи:",
    data.message,
  ]
    .filter((l) => l !== null)
    .join("\n");
}

function subject(data: ContactInput) {
  const service = serviceTitle(data.service);
  return `Заявка с сайта: ${data.name}${service ? ` — ${service}` : ""}`;
}

async function sendTelegram(text: string) {
  const res = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text }),
  });
  if (!res.ok) throw new Error(`Telegram: ${res.status} ${await res.text()}`);
}

async function sendSmtp(data: ContactInput, text: string) {
  const transport = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
  });
  await transport.sendMail({
    // Mail.ru only allows sending from the authenticated mailbox.
    from: `"Сайт KOVELIA" <${env.SMTP_USER}>`,
    to: env.CONTACT_EMAIL_TO,
    replyTo: `"${data.name.replace(/"/g, "")}" <${data.email}>`,
    subject: subject(data),
    text,
  });
}

async function sendResend(data: ContactInput, text: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.RESEND_API_KEY}` },
    body: JSON.stringify({
      from: env.CONTACT_EMAIL_FROM ?? "Kovelia Website <onboarding@resend.dev>",
      to: env.CONTACT_EMAIL_TO,
      reply_to: data.email,
      subject: subject(data),
      text,
    }),
  });
  if (!res.ok) throw new Error(`Resend: ${res.status} ${await res.text()}`);
}

/** Delivers a lead to every configured channel. Succeeds if at least one channel accepted it. */
export async function notifyContact(data: ContactInput): Promise<void> {
  const text = format(data);
  const jobs: Promise<void>[] = [];

  if (env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS && env.CONTACT_EMAIL_TO)
    jobs.push(sendSmtp(data, text));
  if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) jobs.push(sendTelegram(text));
  if (env.RESEND_API_KEY && env.CONTACT_EMAIL_TO) jobs.push(sendResend(data, text));

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
