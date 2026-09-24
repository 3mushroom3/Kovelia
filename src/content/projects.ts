import type { Locale } from "@/i18n/routing";
import type { Project } from "@/lib/cms/types";

export const projects: Record<Locale, Project[]> = {
  ru: [
    {
      slug: "zernovik",
      title: "KOVELIA Agro — реестр АПК",
      client: "Собственный продукт",
      summary:
        "Реестр деклараций соответствия на зерно по всей России: производители, трейдеры, объёмы и контакты. Данные обновляются автоматически, у реестра есть интерактивная карта, интеграция с CRM и уведомления о новых декларациях.",
      url: "https://zernovik.online",
      tags: ["Парсинг", "PostgreSQL", "Карты", "Bitrix24", "Подписки"],
    },
  ],
  en: [
    {
      slug: "zernovik",
      title: "KOVELIA Agro — agribusiness registry",
      client: "In-house product",
      summary:
        "A registry of grain conformity declarations across Russia: producers, traders, volumes and contacts. Automatically updated data, an interactive map, CRM integration and alerts about new declarations.",
      url: "https://zernovik.online",
      tags: ["Scraping", "PostgreSQL", "Maps", "Bitrix24", "Subscriptions"],
    },
  ],
};
