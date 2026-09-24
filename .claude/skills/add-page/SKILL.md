---
name: add-page
description: Add a new localized page to the Kovelia site (route under app/[locale], translations for ru and en, SEO metadata, sitemap, optional nav entry). Use when asked to create a new page or section URL.
---

# Добавить страницу

Аргумент: путь страницы (например `/careers`) и её назначение.

1. **Переводы.** В `src/messages/ru.json` и `src/messages/en.json` добавь namespace в PascalCase (например `"Careers"`) с минимумом ключей `title` и `subtitle`. Ключи в обоих файлах должны совпадать. Если страница в меню, добавь ключ в `Nav`.
2. **Роут.** Создай `src/app/[locale]/<path>/page.tsx` по образцу `src/app/[locale]/services/page.tsx`:
   - `generateMetadata` вызывает `pageMetadata({ locale, path, title, description })` из `@/lib/seo`;
   - в компоненте есть `setRequestLocale(locale)` до любых вызовов next-intl;
   - типы берутся из `PageProps<"/[locale]/<path>">`;
   - данные приходят только из `@/lib/cms`, разметка строится из `Section` и компонентов `components/sections`;
   - весь контент обёрнут в `<PageTransition>`, первым идёт `<PageHero eyebrow="// <slug>" title=… subtitle=…>` (тёмный hero нужен, чтобы шапка корректно выглядела);
   - анимации появления делаются через `Reveal` / `Stagger`.
3. **Sitemap.** Добавь путь в массив `pages` в `src/app/sitemap.ts`.
4. **Навигация** (если нужна). Добавь `{ href, key }` в `siteConfig.nav` в `src/lib/site.ts`.
5. **Проверка.** Запусти `pnpm check && pnpm build`. В выводе build страница должна быть `●` (SSG) для `/ru/...` и `/en/...`.
