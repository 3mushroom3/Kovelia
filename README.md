# Kovelia — сайт компании

Next.js 16 · TypeScript · Tailwind CSS v4 · next-intl (ru/en) · Sanity CMS

## Быстрый старт

```bash
pnpm install
cp .env.example .env.local   # всё опционально для локальной разработки
pnpm dev                     # http://localhost:3000
```

## Скрипты

| Команда                     | Что делает                 |
| --------------------------- | -------------------------- |
| `pnpm dev`                  | dev-сервер                 |
| `pnpm build` / `pnpm start` | production-сборка и запуск |
| `pnpm check`                | typecheck + lint + тесты   |
| `pnpm format`               | Prettier                   |
| `pnpm test`                 | Vitest                     |

## Документация

- [`CLAUDE.md`](./CLAUDE.md): соглашения проекта, для людей и для Claude Code
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md): архитектура и принятые решения
