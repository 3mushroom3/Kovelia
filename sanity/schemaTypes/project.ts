export const project = {
  name: "project",
  title: "Project (case study)",
  type: "document",
  fields: [
    { name: "title", type: "localizedString" },
    { name: "slug", type: "slug", options: { source: "title.ru" } },
    { name: "client", type: "localizedString" },
    { name: "summary", type: "localizedText" },
    { name: "url", type: "url" },
    { name: "image", type: "image", options: { hotspot: true } },
    { name: "tags", type: "array", of: [{ type: "string" }] },
  ],
};
