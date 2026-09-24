---
name: add-content-type
description: Add a new CMS-managed content type (e.g. team members, case studies, vacancies) to Kovelia end-to-end — Sanity schema, GROQ query, typed getter with local fallback. Use when content should be editable without code.
---

# Добавить тип контента из CMS

Слой контента лежит в `src/lib/cms/`, образец — `Service` (`getServices`).

1. **Тип домена** в `src/lib/cms/types.ts`: только поля, нужные UI, уже локализованные (строки, а не `{ru,en}`).
2. **Схема Sanity** в `sanity/schemaTypes/<name>.ts`. Переводимые поля имеют тип `localizedString` или `localizedText`. Зарегистрируй схему в `sanity/schemaTypes/index.ts`.
3. **GROQ-запрос** в `src/lib/cms/queries.ts` через `defineQuery`. Локализованные поля читаются как `"title": coalesce(title[$locale], title.ru)`, картинки как `"imageUrl": image.asset->url`.
4. **Локальный контент** в `src/content/<name>.ts`: `Record<Locale, T[]>` для ru и en.
5. **Геттер** в `src/lib/cms/index.ts`:
   ```ts
   export async function getX(locale: Locale): Promise<X[]> {
     const fromCms = await sanityFetch<X[]>(xQuery, { locale });
     return fromCms?.length ? fromCms : localX[locale];
   }
   ```
   Кэширование и тег `sanity` уже встроены в `sanityFetch`, вебхук сбрасывает их автоматически.
6. **Проверка.** `pnpm check && pnpm build`.
