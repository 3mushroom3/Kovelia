import type { routing } from "./routing";
import type messages from "../messages/ru.json";

// Type-safe translation keys: ru.json is the source of truth.
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
