#!/usr/bin/env bash
# Update the production site from GitHub. Run ON THE SERVER as root:
#   bash /var/www/kovelia/scripts/deploy.sh
#
# The server also hosts baza-apk (zernovik.online, pm2 "baza-apk", port 3001, system Node 20).
# This script touches only the "kovelia" pm2 process and uses its private Node 24 in /opt/node24.
set -euo pipefail

APP=/var/www/kovelia
NODE_DIR=/opt/node24
export PATH="$NODE_DIR/bin:$PATH"
export COREPACK_ENABLE_DOWNLOAD_PROMPT=0

cd "$APP"
git pull --ff-only
corepack pnpm install --frozen-lockfile
# Capped heap + low priority so the build does not starve baza-apk.
NODE_OPTIONS=--max-old-space-size=1536 nice -n 10 corepack pnpm build

pm2 restart kovelia --update-env
sleep 4

code=$(curl -s -o /dev/null -w '%{http_code}' -H 'Host: kovelia.ru' -H 'X-Forwarded-Proto: https' http://127.0.0.1:3002/services)
echo "local check /services: $code"
[ "$code" = "200" ] || { echo "DEPLOY CHECK FAILED"; pm2 logs kovelia --lines 30 --nostream; exit 1; }
echo "Deployed $(git rev-parse --short HEAD)"
