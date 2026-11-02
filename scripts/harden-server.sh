#!/usr/bin/env bash
# Server-side fixes for the security audit of 25-26 Sep 2026 (SEC-01..SEC-03).
# Run ON THE SERVER as root, from an SSH session that you KEEP OPEN until the end:
#   bash /var/www/kovelia/scripts/harden-server.sh
#
# The server also hosts baza-apk (kovelia-agro.ru). This script does not touch its nginx config,
# pm2 process or the system Node. It changes sshd (shared by both projects) and upgrades the
# distro nginx package, which restarts nginx for about a second.
# Safe to re-run. SEC-04/SEC-05 (HSTS, CSP) live in next.config.ts and ship with deploy.sh.
set -euo pipefail

[ "$(id -u)" = "0" ] || { echo "Run as root"; exit 1; }

STAMP=$(date +%Y%m%d-%H%M%S)
BACKUP=/root/security-backup-$STAMP
SSHD_DROPIN=/etc/ssh/sshd_config.d/00-kovelia-hardening.conf
NGINX_SITE=/etc/nginx/sites-available/kovelia

mkdir -p "$BACKUP"
cp -a /etc/ssh "$BACKUP/ssh"
cp -a /etc/nginx "$BACKUP/nginx"
echo "Backup: $BACKUP"

# --- SEC-01 + SEC-02: sshd limits and modern algorithms -------------------------------------
# sshd uses the first value it reads and Ubuntu includes sshd_config.d/* at the top of
# sshd_config, so a "00-" drop-in wins over everything else.
grep -Eq '^\s*Include\s+/etc/ssh/sshd_config\.d/' /etc/ssh/sshd_config ||
  { echo "sshd_config does not include sshd_config.d, aborting"; exit 1; }

cat >"$SSHD_DROPIN" <<'EOF'
# Managed by /var/www/kovelia/scripts/harden-server.sh

# SEC-01: drop unauthenticated connections early instead of paying for the key exchange.
MaxStartups 10:30:60
PerSourceMaxStartups 3
PerSourceNetBlockSize 32:64
LoginGraceTime 20
MaxAuthTries 3

# SEC-02: no SHA-1 MACs, no CBC, no SHA-1 key exchange, no RSA/SHA-1 or DSA host keys.
KexAlgorithms curve25519-sha256,curve25519-sha256@libssh.org,sntrup761x25519-sha512@openssh.com,diffie-hellman-group16-sha512,diffie-hellman-group18-sha512
Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com,aes128-gcm@openssh.com,aes256-ctr,aes192-ctr,aes128-ctr
MACs hmac-sha2-512-etm@openssh.com,hmac-sha2-256-etm@openssh.com,umac-128-etm@openssh.com
HostKeyAlgorithms ssh-ed25519,ecdsa-sha2-nistp256,rsa-sha2-512,rsa-sha2-256
EOF

# Password logins are what the brute-force bots aim at. Opt-in, because whoever administers
# baza-apk might still log in with a password: DISABLE_PASSWORD_AUTH=1 bash harden-server.sh
if [ "${DISABLE_PASSWORD_AUTH:-0}" = "1" ]; then
  [ -s /root/.ssh/authorized_keys ] || { rm -f "$SSHD_DROPIN"; echo "No root authorized_keys, refusing to disable passwords"; exit 1; }
  cat >>"$SSHD_DROPIN" <<'EOF'

# Keys only.
PasswordAuthentication no
KbdInteractiveAuthentication no
PermitRootLogin prohibit-password
EOF
fi

if sshd -t; then
  # reload, not restart: sessions that are already open stay alive.
  systemctl reload ssh
  echo "sshd: hardening applied"
else
  rm -f "$SSHD_DROPIN"
  echo "sshd: config test failed, drop-in removed, nothing changed"
  exit 1
fi

# --- SEC-01: ban sources that hammer port 22 ------------------------------------------------
export DEBIAN_FRONTEND=noninteractive
apt-get update -q
apt-get install -y -q fail2ban

cat >/etc/fail2ban/jail.d/kovelia-sshd.local <<'EOF'
# Managed by /var/www/kovelia/scripts/harden-server.sh
[sshd]
enabled = true
mode = aggressive
maxretry = 5
findtime = 10m
bantime = 1h
EOF
# Ubuntu logs sshd to /var/log/auth.log via rsyslog; without it, read the journal instead.
[ -f /var/log/auth.log ] || echo "backend = systemd" >>/etc/fail2ban/jail.d/kovelia-sshd.local
fail2ban-client -t >/dev/null || { echo "fail2ban: config test failed"; exit 1; }
systemctl enable -q fail2ban
systemctl restart fail2ban
echo "fail2ban: sshd jail enabled"

# Kernel-level limit on new connections, only if ufw already manages the firewall here.
if command -v ufw >/dev/null && ufw status | grep -q '^Status: active'; then
  ufw insert 1 limit 22/tcp comment 'kovelia: rate-limit ssh' || ufw limit 22/tcp
  echo "ufw: rate limit on 22/tcp added, check the order with: ufw status numbered"
else
  echo "ufw is not active: NOT enabling it automatically (it would affect every service here)."
  echo "  Rate limiting is covered by sshd limits and fail2ban only."
fi

# --- SEC-03: nginx security updates, hide the version ---------------------------------------
# Ubuntu backports security fixes into 1.18.0, so the package build matters, not the number.
apt-get install -y -q --only-upgrade -o Dpkg::Options::=--force-confold \
  nginx nginx-common nginx-core nginx-full nginx-light openssh-server
echo "nginx package: $(dpkg-query -W -f='${Version}' nginx-common 2>/dev/null || echo unknown)"

# Rate limits for kovelia.ru only. The zones live in conf.d (http context) under kovelia_* names,
# but nothing uses them outside the kovelia site, so baza-apk is unaffected.
# POSTs are Server Actions (the contact form): 10/min per IP. Everything else: 20 req/s per IP.
cat >/etc/nginx/conf.d/kovelia-limits.conf <<'EOF'
# Managed by /var/www/kovelia/scripts/harden-server.sh
map $request_method $kovelia_post_key {
    POST    $binary_remote_addr;
    default "";
}
limit_req_zone $kovelia_post_key   zone=kovelia_post:10m rate=10r/m;
limit_req_zone $binary_remote_addr zone=kovelia_req:10m  rate=20r/s;
EOF

if [ -f "$NGINX_SITE" ]; then
  # server context: applies to every location of each kovelia server block.
  grep -q 'server_tokens' "$NGINX_SITE" ||
    sed -i '/^\s*server_name\s/a\    server_tokens off;' "$NGINX_SITE"
  grep -q 'kovelia_req' "$NGINX_SITE" ||
    sed -i '/^\s*server_name\s/a\    limit_req zone=kovelia_req burst=80 nodelay;\n    limit_req zone=kovelia_post burst=5 nodelay;\n    limit_req_status 429;' "$NGINX_SITE"
  # The app keys its own form limit on X-Real-IP; set it if the proxy block doesn't yet.
  grep -q 'X-Real-IP' "$NGINX_SITE" ||
    sed -i '/^\s*proxy_pass\s/a\        proxy_set_header X-Real-IP $remote_addr;' "$NGINX_SITE"
fi

if nginx -t; then
  systemctl reload nginx
  echo "nginx: server_tokens off, rate limits on for kovelia.ru"
else
  [ -f "$NGINX_SITE" ] && cp -a "$BACKUP/nginx/sites-available/kovelia" "$NGINX_SITE"
  rm -f /etc/nginx/conf.d/kovelia-limits.conf
  echo "nginx: config test failed, kovelia site and limits restored from backup"
  exit 1
fi

# --- Result ---------------------------------------------------------------------------------
echo
echo "sshd effective settings:"
sshd -T | grep -Ei '^(maxstartups|persourcemaxstartups|logingracetime|maxauthtries|macs|ciphers|kexalgorithms|hostkeyalgorithms|passwordauthentication|permitrootlogin) '
echo
fail2ban-client status sshd || true
echo
echo "DO NOT close this session yet. Open a SECOND terminal and check that a new login works:"
echo "  ssh -i ~/.ssh/baza_apk_deploy root@178.255.127.142"
echo "If it does not: rm $SSHD_DROPIN && systemctl reload ssh"
