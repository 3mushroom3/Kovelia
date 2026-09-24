export const service = {
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    { name: "title", type: "localizedString", validation: (r: { required: () => unknown }) => r.required() },
    { name: "slug", type: "slug", options: { source: "title.ru" } },
    {
      name: "category",
      type: "string",
      options: { list: ["ai", "data", "infra", "systems"] },
      validation: (r: { required: () => unknown }) => r.required(),
    },
    { name: "summary", type: "localizedText" },
    { name: "tags", type: "array", of: [{ type: "string" }] },
    { name: "order", type: "number" },
  ],
};
