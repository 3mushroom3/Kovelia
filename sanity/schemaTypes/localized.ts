// Sanity schema definitions for the future Studio (install `sanity` and wire these up in sanity.config.ts).
// Kept dependency-free on purpose so the Next.js app does not pull the Studio bundle.
export const locales = ["ru", "en"] as const;

export const localizedString = {
  name: "localizedString",
  title: "Localized string",
  type: "object",
  fields: locales.map((l) => ({ name: l, title: l.toUpperCase(), type: "string" })),
};

export const localizedText = {
  name: "localizedText",
  title: "Localized text",
  type: "object",
  fields: locales.map((l) => ({ name: l, title: l.toUpperCase(), type: "text", rows: 3 })),
};
