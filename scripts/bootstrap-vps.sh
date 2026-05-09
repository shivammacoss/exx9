#!/usr/bin/env bash
# One-shot VPS bootstrap for EXX9.
#
# Run this AS ROOT on a fresh Ubuntu 22.04+ VPS *after* you have cloned the
# repo and placed Cloudflare origin certs in /etc/ssl/cloudflare/.
#
#   curl -fsSL https://<your-host>/bootstrap-vps.sh | bash
# or
#   cd /root/exx9 && ./scripts/bootstrap-vps.sh
#
# This script is idempotent — safe to re-run if a step fails halfway.

set -euo pipefail

REPO_DIR="${REPO_DIR:-/root/exx9}"
SSL_DIR="${SSL_DIR:-/etc/ssl/cloudflare}"

red()    { printf "\033[0;31m%s\033[0m\n" "$*"; }
green()  { printf "\033[0;32m%s\033[0m\n" "$*"; }
yellow() { printf "\033[0;33m%s\033[0m\n" "$*"; }
blue()   { printf "\033[0;34m== %s ==\033[0m\n" "$*"; }

die() { red "ERROR: $*"; exit 1; }

[[ $EUID -eq 0 ]] || die "Run as root (sudo -i)."
[[ -d "$REPO_DIR" ]] || die "Repo not found at $REPO_DIR. Clone it first."
cd "$REPO_DIR"

# ─── 1. System packages ──────────────────────────────────────
blue "1/8  System update + base packages"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get upgrade -y
apt-get install -y \
  curl wget git unzip nano htop \
  apt-transport-https ca-certificates gnupg lsb-release software-properties-common \
  nginx ufw fail2ban jq

# ─── 2. Docker ───────────────────────────────────────────────
blue "2/8  Docker"
if ! command -v docker >/dev/null 2>&1; then
  install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
    | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  chmod a+r /etc/apt/keyrings/docker.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
    https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
    > /etc/apt/sources.list.d/docker.list
  apt-get update -y
  apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
  systemctl enable docker
  systemctl start docker
  green "  Docker installed: $(docker --version)"
else
  green "  Docker already present: $(docker --version)"
fi

# ─── 3. Firewall ─────────────────────────────────────────────
blue "3/8  Firewall (UFW)"
ufw --force reset >/dev/null
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp comment 'SSH'
ufw allow 80/tcp comment 'HTTP'
ufw allow 443/tcp comment 'HTTPS'
ufw --force enable
green "  UFW configured (22, 80, 443 only)"

# ─── 4. fail2ban ─────────────────────────────────────────────
blue "4/8  fail2ban"
cat > /etc/fail2ban/jail.local <<'EOF'
[DEFAULT]
bantime  = 3600
findtime = 600
maxretry = 5
backend  = systemd

[sshd]
enabled = true
port    = ssh
maxretry = 3
EOF
systemctl enable fail2ban
systemctl restart fail2ban
green "  fail2ban active"

# ─── 5. .env file ────────────────────────────────────────────
blue "5/8  .env"
if [[ ! -f .env ]]; then
  cp .env.example .env
  yellow "  Created .env from .env.example — EDIT IT NOW with real secrets!"
  yellow "  Press ENTER to open the editor (or Ctrl+C to cancel and edit later)..."
  read -r
  ${EDITOR:-nano} .env
fi
green "  .env present"

# ─── 6. Pre-flight checks ────────────────────────────────────
blue "6/8  Pre-flight checks"
if [[ -x scripts/preflight-prod.sh ]]; then
  if ! ./scripts/preflight-prod.sh; then
    die "Pre-flight failed. Fix the issues above before continuing."
  fi
else
  yellow "  preflight-prod.sh missing or not executable — skipped"
fi

# ─── 7. SSL ──────────────────────────────────────────────────
blue "7/8  SSL certs"
if [[ -f "$SSL_DIR/origin.pem" && -f "$SSL_DIR/origin-key.pem" ]]; then
  chmod 644 "$SSL_DIR/origin.pem"
  chmod 600 "$SSL_DIR/origin-key.pem"
  chown root:root "$SSL_DIR"/*
  green "  Cloudflare origin cert + key present and chmod'd"
else
  yellow "  Missing $SSL_DIR/origin.pem or origin-key.pem"
  yellow "  Get them from Cloudflare Dashboard → SSL/TLS → Origin Server → Create Certificate"
  die "SSL certs required."
fi

# ─── 8. Nginx + Docker stack ─────────────────────────────────
blue "8/8  Nginx + Docker stack"
rm -f /etc/nginx/sites-enabled/default
cp deploy/nginx/exx9.conf /etc/nginx/sites-available/exx9.conf
ln -sf /etc/nginx/sites-available/exx9.conf /etc/nginx/sites-enabled/exx9.conf
nginx -t || die "Nginx config invalid"
systemctl enable nginx
systemctl restart nginx
green "  Nginx reloaded"

COMPOSE="docker compose -f docker-compose.yml -f docker-compose.prod.yml"
APP_VERSION=$(date +%Y%m%d-%H%M%S)
export APP_VERSION
$COMPOSE build
$COMPOSE up -d
$COMPOSE --profile migrate run --rm migrate
green "  Stack built, started, and migrated"

# Wait for gateway health
blue "Health check"
for i in 1 2 3 4 5 6 7 8 9 10; do
  if curl -fsS http://localhost:8000/health >/dev/null 2>&1; then
    green "  Gateway responding on :8000"
    break
  fi
  sleep 3
  [[ $i -eq 10 ]] && yellow "  Gateway not responding yet — check 'docker compose logs gateway'"
done

# Schedule daily backup
if [[ -x scripts/backup-db.sh ]]; then
  mkdir -p /root/backups
  CRON_LINE="0 2 * * * cd $REPO_DIR && ./scripts/backup-db.sh /root/backups >> /var/log/exx9-backup.log 2>&1"
  if ! crontab -l 2>/dev/null | grep -qF "$REPO_DIR/scripts/backup-db.sh"; then
    (crontab -l 2>/dev/null; echo "$CRON_LINE") | crontab -
    green "  Daily backup cron scheduled (02:00)"
  else
    green "  Backup cron already scheduled"
  fi
fi

echo
green "════════════════════════════════════════════════════"
green "  Bootstrap complete."
green "  Next: visit https://<your-domain> and verify."
green "  Login as the ADMIN_EMAIL/ADMIN_PASSWORD from .env"
green "  and CHANGE THE PASSWORD immediately."
green "════════════════════════════════════════════════════"
