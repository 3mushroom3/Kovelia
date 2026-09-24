"use client";

import { AnimatePresence, motion } from "motion/react";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { ArrowIcon, Button } from "@/components/ui/button";
import { Field, SelectField } from "@/components/ui/field";
import { Link } from "@/i18n/navigation";
import { submitContact } from "./actions";
import type { ContactState } from "./schema";

export type ServiceOptionGroup = { label: string; options: { value: string; label: string }[] };

const initialState: ContactState = { status: "idle" };

/** Lead form. `?service=<slug>` in the URL preselects the service (links from catalog and price list). */
export function ContactForm({ serviceGroups }: { serviceGroups: ServiceOptionGroup[] }) {
  const t = useTranslations("Contact");
  const searchParams = useSearchParams();
  const [state, action, pending] = useActionState(submitContact, initialState);

  const known = new Set(serviceGroups.flatMap((g) => g.options.map((o) => o.value)));
  const fromUrl = searchParams.get("service");
  const values = state.status === "error" ? (state.values ?? {}) : {};
  const errors = state.status === "error" ? state.fieldErrors : undefined;
  const err = (key: keyof NonNullable<typeof errors>) => {
    const code = errors?.[key];
    return code ? t(`errors.${code}`) : undefined;
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {state.status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          role="status"
          className="grid place-items-center py-16 text-center"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
            className="grid size-16 place-items-center rounded-full bg-accent-soft text-accent-strong"
          >
            <svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth="2.2">
              <motion.path
                d="m5 12.5 4.5 4.5L19 7.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
            </svg>
          </motion.span>
          <h3 className="mt-6 text-2xl font-bold">{t("successTitle")}</h3>
          <p className="mt-2 max-w-sm text-muted-foreground">{t("success")}</p>
        </motion.div>
      ) : (
        <motion.form
          key={`form-${state.status}`}
          action={action}
          noValidate
          initial={false}
          exit={{ opacity: 0, y: -8 }}
          className="grid gap-5"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label={t("name")}
              name="name"
              autoComplete="name"
              required
              defaultValue={values.name}
              error={err("name")}
            />
            <Field
              label={t("email")}
              name="email"
              type="email"
              autoComplete="email"
              required
              defaultValue={values.email}
              error={err("email")}
            />
            <Field
              label={t("phone")}
              hint={t("optional")}
              name="phone"
              type="tel"
              autoComplete="tel"
              defaultValue={values.phone}
            />
            <SelectField
              label={t("service")}
              name="service"
              defaultValue={values.service ?? (fromUrl && known.has(fromUrl) ? fromUrl : "")}
            >
              <option value="">{t("servicePlaceholder")}</option>
              {serviceGroups.map((g) => (
                <optgroup key={g.label} label={g.label}>
                  {g.options.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </optgroup>
              ))}
              <option value="other">{t("serviceOther")}</option>
            </SelectField>
          </div>

          <Field
            label={t("message")}
            name="message"
            multiline
            required
            placeholder={t("messagePlaceholder")}
            defaultValue={values.message}
            error={err("message")}
          />

          {/* Honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

          <div className="grid gap-1.5">
            <label className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
              <input
                type="checkbox"
                name="consent"
                defaultChecked={values.consent === "on"}
                aria-invalid={err("consent") ? true : undefined}
                className="mt-0.5 size-4.5 shrink-0 cursor-pointer rounded accent-[var(--primary)]"
              />
              <span>
                {t.rich("consent", {
                  link: (chunks) => (
                    <Link
                      href="/privacy"
                      target="_blank"
                      className="font-medium text-accent-strong underline-offset-2 hover:underline"
                    >
                      {chunks}
                    </Link>
                  ),
                })}
              </span>
            </label>
            {err("consent") && <p className="text-sm text-red-600 dark:text-red-400">{err("consent")}</p>}
          </div>

          {state.status === "error" && !errors && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300"
            >
              {t("error")}
            </p>
          )}

          <Button type="submit" size="lg" disabled={pending} className="mt-1 justify-self-start">
            {pending ? t("sending") : t("submit")}
            {!pending && <ArrowIcon />}
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
