// Domain types returned by the CMS layer. UI depends only on these, never on raw Sanity documents.

export type CategoryId = "ai" | "data" | "infra" | "systems";

/** Accent color of a service direction; mapped to CSS tokens in globals.css. */
export type Accent = "green" | "blue" | "amber" | "slate";

export type ServiceCategory = {
  id: CategoryId;
  index: string; // "01"
  label: string; // short tag, e.g. "AI & ML"
  title: string;
  description: string;
  accent: Accent;
};

export type Service = {
  slug: string;
  category: CategoryId;
  title: string;
  summary: string;
  tags: string[];
};

export type PriceItem = {
  title: string;
  note: string;
  price: string; // preformatted, e.g. "от 60 000 ₽"
  unit: "project" | "month" | "hour";
  service?: string; // slug to preselect in the contact form
};

export type PriceGroup = {
  title: string;
  items: PriceItem[];
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  summary: string;
  url?: string;
  tags: string[];
};
