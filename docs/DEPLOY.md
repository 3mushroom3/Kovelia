# Деплой

Продакшен: **https://kovelia.ru** (и `www.kovelia.ru`), сервер `178.255.127.142` (Ubuntu 22.04).

## Как устроено

| Что        | Где                                                                                |
| ---------- | ---------------------------------------------------------------------------------- |
| Код        | `/var/www/kovelia` (клон этого репозитория)                                        |
| Node.js    | отдельная Node 24 в `/opt/node24`, только для Kovelia                              |
| Процесс    | pm2 `kovelia`: `next start -p 3002 -H localhost` (слушает только `127.0.0.1:3002`) |
| Прокси     | nginx `/etc/nginx/sites-available/kovelia` → `127.0.0.1:3002`                      |
| SSL        | Let's Encrypt через certbot, продлевается автоматически                            |
| Переменные | `/var/www/kovelia/.env.local` (права 600, в git не попадает)                       |

### На сервере работает ещё один проект

**baza-apk** (zernovik.online): pm2 `baza-apk`, порт 3001, **системная Node 20**, свой конфиг nginx. Не трогать:

- системный Node не обновлять: baza-apk работает на нём, а pnpm 11 требует Node ≥ 22, поэтому у Kovelia своя Node в `/opt/node24`;
- не запускать `pm2 restart all` или `pm2 delete all`, только `pm2 … kovelia`;
- перед `systemctl reload nginx` всегда выполнять `nginx -t`.

## Обновить сайт

```bash
ssh -i ~/.ssh/baza_apk_deploy root@178.255.127.142
bash /var/www/kovelia/scripts/deploy.sh
```

Скрипт делает `git pull`, `pnpm install`, `pnpm build`, перезапускает pm2 `kovelia` и проверяет, что сайт отвечает.

## Переменные окружения

`/var/www/kovelia/.env.local`, полный список в `.env.example`. После изменения:

```bash
bash /var/www/kovelia/scripts/deploy.sh   # NEXT_PUBLIC_* встраиваются при сборке
```

Для формы заявки в production нужен хотя бы один канал: `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` или `RESEND_API_KEY` + `CONTACT_EMAIL_TO`. Без них форма показывает ошибку отправки.

## Известные особенности

- **Не запускать `next start` с `-H 127.0.0.1`.** Rewrite локали next-intl (`/services` → `/ru/services`) за прокси с `X-Forwarded-Proto: https` тогда уходит в `https://localhost:3002` и падает с 500. Нужно использовать `-H localhost`.
- sshd иногда сбрасывает подключения (`kex_exchange_identification: Connection closed`). Причина в ботах, которые перебирают пароли и забивают лимит `MaxStartups`. Помогает повторить подключение.

## Логи

```bash
pm2 logs kovelia --lines 100
tail -f /var/log/nginx/error.log
```
