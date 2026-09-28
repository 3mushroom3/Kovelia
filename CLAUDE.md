@AGENTS.md

# Kovelia — корпоративный сайт

Сайт компании KOVELIA (Data / Intelligence / Platforms): AI и ML (LLM, RAG, агенты), аналитические платформы и данные, инфраструктура и DevOps, системное ПО на C++. Цель сайта — представить компанию и собирать заявки. Визуально сайт должен быть в одном стиле с продуктом компании KOVELIA Agro (https://zernovik.online).

## Стек

- **Next.js 16** (App Router, Turbopack), **React 19**, **TypeScript** (strict)
- **Tailwind CSS v4**: конфиг в CSS (`src/app/globals.css`), `tailwind.config.js` нет
- **next-intl v4**: локали `ru` (по умолчанию, без префикса) и `en` (`/en/...`)
- **next-themes**: светлая и тёмная тема, класс `.dark` на `<html>`
- **Sanity** (headless CMS) через `next-sanity`; без env отдаётся локальный контент
- **zod v4**: валидация (форма, env)
- **motion** (`motion/react`): анимации; переходы между страницами через React `<ViewTransition>`
- **Vitest**: юнит-тесты; **ESLint** + **Prettier** (с плагином Tailwind)
- Пакетный менеджер: **pnpm** (не npm и не yarn)

## Команды

```bash
pnpm dev            # dev-сервер, http://localhost:3000
pnpm build          # production-сборка (обязательно проверять перед коммитом крупных изменений)
pnpm check          # typecheck + lint + test (минимум перед каждым коммитом)
pnpm format         # prettier --write
pnpm test           # vitest run
```

## Важно: это Next.js 16

- `middleware.ts` переименован в **`src/proxy.ts`**.
- `params` и `searchParams` являются **Promise**: `const { locale } = await params`.
- Используй глобальные типы `PageProps<"/[locale]/about">` и `LayoutProps<"/[locale]">`. Они генерируются командой `next typegen`.
- `revalidateTag(tag, "max")`: второй аргумент обязателен.
- Если сомневаешься в API, смотри `node_modules/next/dist/docs/`, а не память.

## Архитектура

```
src/
  app/[locale]/        страницы; layout.tsx содержит <html>, провайдеры, Header/Footer
  app/api/revalidate/  вебхук Sanity, сбрасывает кэш по тегу
  app/sitemap.ts, robots.ts
  proxy.ts             next-intl: определение локали, rewrite / redirect
  i18n/                routing.ts (список локалей), navigation.ts, request.ts
  messages/{ru,en}.json  переводы UI; ru.json задаёт типы ключей
  components/ui/       примитивы без бизнес-логики (Button, Field, Section, Eyebrow, Tag…)
  components/brand/    Logo (полный логотип) и LogoMark (знак «K») из src/assets/brand
  components/motion/   Reveal/Stagger, CountUp, Spotlight, PageTransition
  components/layout/   Header, Footer, мобильное меню, переключатели языка и темы
  components/sections/ крупные блоки страниц (Hero, PageHero, Directions, CaseStudy, Process…)
  features/<name>/     законченные фичи: UI + server action + схема (сейчас contact)
  lib/cms/             единственная точка доступа к контенту (Sanity + локальный контент)
  lib/env.ts           серверные env, валидируются zod
  lib/seo.ts           pageMetadata(): canonical, hreflang, OpenGraph
  lib/site.ts          статичные данные компании и навигация
  content/             локальный контент ru/en: services, pricing, projects, privacy
sanity/schemaTypes/    схемы документов для будущей Sanity Studio
docs/                  ARCHITECTURE.md и прочая документация
```

Подробности и обоснование решений: `docs/ARCHITECTURE.md`.

## Правила

**Server/Client**

- По умолчанию пиши Server Components. `"use client"` ставится только там, где нужны состояние, эффекты или браузерные API, и как можно ниже по дереву.
- Серверный код (env, CMS, отправка заявок) помечается `import "server-only"`.

**i18n**

- Никакого хардкода текста в JSX. Каждая строка добавляется в **оба** файла, `messages/ru.json` и `messages/en.json`, с одинаковыми ключами.
- Для ссылок и навигации используй `Link`, `redirect`, `usePathname`, `useRouter` из `@/i18n/navigation`, а **не** из `next/link` или `next/navigation`.
- Каждая страница в `app/[locale]` делает `setRequestLocale(locale)`, иначе пропадает статическая генерация.
- Каждая страница экспортирует `generateMetadata`, которая вызывает `pageMetadata({ locale, path, title, description })`.
- Новую статическую страницу добавь в `pages` в `src/app/sitemap.ts` и, если нужно, в `siteConfig.nav`.

**Контент**

- Страницы получают данные только через функции из `@/lib/cms` (`getServices(locale)` и т. п.) и никогда не обращаются к Sanity напрямую.
- Новый тип контента добавляется так: тип в `lib/cms/types.ts`, GROQ-запрос в `queries.ts`, функция в `index.ts`, локальный контент в `content/<name>.ts`, схема в `sanity/schemaTypes/`.
- Услуги и цены взяты из «Каталога услуг» компании. Не выдумывай факты о компании (цены, гарантии, бесплатные услуги, цифры): бери их из контента или спрашивай.
- Локализованные поля в Sanity хранятся как `{ ru, en }`, в GROQ читаются через `coalesce(field[$locale], field.ru)`.

**Дизайн-система** (общая с zernovik.online)

- Палитра: глубокий зелёный «ink» (`#021a18 → #075c44 → #17a06f`), мятный акцент, светлый фон `#f7f9fb`. Градиент логотипа (лайм → изумруд → синий → голубой) используется только для акцентов (`text-brand-gradient`).
- Тёмные брендовые поверхности: `bg-ink-gradient` + `bg-plus` (паттерн с плюсиками). Они одинаковы в обеих темах.
- **Каждая страница начинается с тёмного hero** (`Hero` на главной, `PageHero` на остальных). Шапка поверх него прозрачная со светлым текстом (`group-data-[top=true]/header:`).
- Цвета направлений: `accentColor[category.accent]` из `lib/accent.ts` (ai → зелёный, data → синий, infra → янтарный, systems → серый).
- Скругления `rounded-xl` (кнопки, поля) и `rounded-2xl` (карточки), тени `shadow-card` / `shadow-lift`.
- Логотип официальный, тот же, что на zernovik.online: `src/assets/brand/*.png`, очищен от ореола прозрачности. `kovelia-logo-light.png` — вариант с белой надписью для тёмного фона. Не перерисовывать и не заменять SVG-версиями.
- Шрифты: Manrope (текст, кириллица) и JetBrains Mono (`font-mono`: eyebrow-метки, теги, цифры).

**Анимации**

- Появление при прокрутке делается через `Reveal` / `Stagger` + `StaggerItem`, а не через ручной `motion.div` в каждой секции.
- Контент каждой страницы оборачивается в `<PageTransition>` (в `page.tsx`, не в layout).
- `prefers-reduced-motion` учитывается глобально (`MotionConfig reducedMotion="user"` и CSS в `globals.css`). Новые canvas- и JS-анимации должны проверять его сами.
- Элементы с `overflow-hidden`, которые лежат прямо в flex-колонке `body`, должны иметь `shrink-0`, иначе схлопнутся до нулевой высоты.

**Стили**

- Только Tailwind-классы. Цвета берутся из семантических токенов (`bg-background`, `bg-surface`, `bg-surface-2`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-primary`, `bg-accent-soft`, `text-accent-strong`), а не `text-gray-500` или hex. Исключение: фиксированные цвета на ink-поверхностях (`text-white/70` и т. п.).
- Новый цвет добавляется токеном в `globals.css` сразу в `:root` и в `.dark`.
- Объединение классов делается через `cn()` из `@/lib/utils`.
- Ссылку, которая выглядит как кнопка, оформляй через `buttonStyles()`.

**Формы**

- Server Action + `useActionState`. Схема zod лежит в `schema.ts` фичи и общая для клиента и сервера.
- Сообщения ошибок zod — это i18n-ключи, а не готовый текст.
- Нужны honeypot-поле и серверная валидация. Клиентской валидации недостаточно.
- Форма заявки требует согласия на обработку персональных данных (152-ФЗ) со ссылкой на `/privacy`.
- Ссылка `/contact?service=<slug>` открывает форму с уже выбранной услугой.

**Код**

- Файлы в kebab-case (`contact-form.tsx`), компоненты в PascalCase, именованные экспорты. Исключение — файлы-конвенции Next (`page.tsx`, `layout.tsx`…).
- Импорты через алиас `@/`.
- Секреты хранятся только в `.env.local`. Новую переменную добавь в `.env.example` и в схему `src/lib/env.ts`.
- Доступность: семантичные теги, `aria-*` у иконок-кнопок, `label` у полей, видимый focus.

## Интеграции (всё опционально, настраивается через `.env.local`)

- **Sanity**: `SANITY_PROJECT_ID` и др. Пока не задано, отдаётся контент из `src/content/`. Вебхук Sanity указывает на `POST /api/revalidate` с секретом `SANITY_REVALIDATE_SECRET`.
- **Заявки**: Telegram (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`) и/или email через Resend (`RESEND_API_KEY`, `CONTACT_EMAIL_TO`). В dev без каналов заявка пишется в консоль, в production без каналов возвращается ошибка.

## Продакшен

Сайт работает на https://kovelia.ru. Как всё устроено и как обновлять, описано в `docs/DEPLOY.md`. На том же сервере работает **другой проект** (zernovik.online, pm2 `baza-apk`, системная Node 20): его процессы, системный Node и чужие конфиги nginx не трогать.

## Открытые TODO

- Доставка заявок в production: SMTP Mail.ru на `kovelia@list.ru` (нужен пароль для внешних приложений в `SMTP_PASS` в `/var/www/kovelia/.env.local`). Без него форма возвращает ошибку.
- Телефон и Telegram в `src/lib/site.ts` (корпоративный email `kovelia@list.ru` уже указан).
- Реквизиты ООО (название, ИНН/ОГРН, адрес) в политике конфиденциальности (`src/content/privacy.ts`), затем проверка юристом.
- Цифры в макете KOVELIA Agro (`case-study.tsx`, `region-bars.tsx`) иллюстративные: заменить реальными или согласовать.
- OG-изображение (`src/app/[locale]/opengraph-image.tsx`).
- Sanity Studio: установить `sanity`, создать `sanity.config.ts` с `schemaTypes` и роут `/studio`.
- Аналитика (если появится, то вместе с cookie-баннером и правкой политики).
