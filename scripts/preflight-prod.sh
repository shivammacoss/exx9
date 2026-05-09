#!/usr/bin/env bash
# Pre-flight checks before pushing EXX9 to production.
#
# Verifies the .env in the current directory:
#  - secrets are not the placeholder values from .env.example
#  - JWT secrets meet minimum entropy (>= 32 hex chars)
#  - cookie flags are production-safe
#  - all required env vars are present
#  - migrations are applied (compose stack must be up)
#
# Usage:  ./scripts/preflight-prod.sh
# Exits non-zero on any failure so it can gate a deploy script.

set -euo pipefail

red()    { printf "\033[0;31m%s\033[0m\n" "$*"; }
green()  { printf "\033[0;32m%s\033[0m\n" "$*"; }
yellow() { printf "\033[0;33m%s\033[0m\n" "$*"; }

FAIL=0
WARN=0

fail() { red   "  ✘ $*"; FAIL=$((FAIL + 1)); }
warn() { yellow "  ⚠ $*"; WARN=$((WARN + 1)); }
ok()   { green "  ✓ $*"; }

# ── 1. .env present ──────────────────────────────────────────
if [[ ! -f .env ]]; then
  red "Missing .env in $(pwd). Copy .env.example and edit."
  exit 1
fi

# Load (without exporting expansion side effects)
set -a; # shellcheck disable=SC1091
source .env; set +a

echo "── Required env vars ──────────────────────────────────"
REQUIRED=(
  POSTGRES_USER POSTGRES_PASSWORD POSTGRES_DB
  TIMESCALE_USER TIMESCALE_PASSWORD TIMESCALE_DB
  REDIS_URL DATABASE_URL TIMESCALE_URL
  JWT_SECRET USER_JWT_SECRET ADMIN_JWT_SECRET
  ADMIN_EMAIL ADMIN_PASSWORD
  CORS_ORIGINS TRADER_APP_URL
)
for var in "${REQUIRED[@]}"; do
  if [[ -z "${!var:-}" ]]; then
    fail "$var is empty or unset"
  else
    ok "$var set"
  fi
done

# ── 2. Placeholder / default values ──────────────────────────
echo "── Default placeholder check ──────────────────────────"
declare -A PLACEHOLDERS=(
  [ADMIN_PASSWORD]="EXX9Admin2025!"
  [POSTGRES_PASSWORD]="exx9"
  [TIMESCALE_PASSWORD]="exx9"
)
for k in "${!PLACEHOLDERS[@]}"; do
  if [[ "${!k:-}" == "${PLACEHOLDERS[$k]}" ]]; then
    fail "$k still uses .env.example placeholder — rotate before deploy"
  else
    ok "$k rotated from default"
  fi
done

# Default ADMIN_EMAIL is also a tell-tale
if [[ "${ADMIN_EMAIL:-}" == "admin@exx9.com" ]]; then
  warn "ADMIN_EMAIL is still admin@exx9.com (default) — consider a real address"
fi

# ── 3. JWT secret entropy (>= 32 hex chars) ──────────────────
echo "── JWT secret entropy ─────────────────────────────────"
for var in JWT_SECRET USER_JWT_SECRET ADMIN_JWT_SECRET; do
  v="${!var:-}"
  if [[ ${#v} -lt 32 ]]; then
    fail "$var is too short (${#v} chars; need >= 32). Generate with: openssl rand -hex 32"
  else
    ok "$var is long enough"
  fi
  if [[ "$v" == *"change-me"* || "$v" == *"placeholder"* || "$v" == "test-"* ]]; then
    fail "$var contains a placeholder string"
  fi
done

# ── 4. Cookie flags ──────────────────────────────────────────
echo "── Cookie flags ───────────────────────────────────────"
case "${COOKIE_SAMESITE:-lax}" in
  lax|strict|none) ok "COOKIE_SAMESITE=${COOKIE_SAMESITE:-lax}" ;;
  *) fail "COOKIE_SAMESITE invalid: '${COOKIE_SAMESITE}' (must be lax|strict|none)" ;;
esac
if [[ "${COOKIE_SECURE:-}" == "false" ]]; then
  warn "COOKIE_SECURE=false — only safe behind HTTP-only local dev. For prod, omit or set true."
fi
if [[ "${ENVIRONMENT:-}" == "development" ]]; then
  warn "ENVIRONMENT=development — set to 'production' before deploy"
fi

# ── 5. CORS doesn't include localhost ────────────────────────
echo "── CORS ──────────────────────────────────────────────"
if [[ ",${CORS_ORIGINS:-}," == *",http://localhost:3000,"* ]]; then
  warn "CORS_ORIGINS still includes http://localhost:3000 — fine for staging, remove for prod"
fi
if [[ -n "${CORS_ORIGINS:-}" && "${CORS_ORIGINS}" == *"*"* ]]; then
  fail "CORS_ORIGINS contains wildcard '*' — not allowed with credentialed cookies"
fi

# ── Market data feed (AllTick) ───────────────────────────────
echo "── Market data feed ──────────────────────────────────"
ALLTICK="${ALLTICK_API_KEY:-}"
if [[ -z "$ALLTICK" || "$ALLTICK" == *"your-alltick"* || "$ALLTICK" == *"placeholder"* ]]; then
  fail "ALLTICK_API_KEY missing/placeholder — production must NOT run on the simulator. Get a key from https://alltick.co"
else
  ok "ALLTICK_API_KEY set"
fi
case "${ALLTICK_ONLY:-false}" in
  true|1|yes)
    ok "ALLTICK_ONLY=true (simulator fallback disabled — correct for production)"
    ;;
  *)
    warn "ALLTICK_ONLY=false — simulator will fill any symbol AllTick doesn't cover (fake prices in real-money UI). Set ALLTICK_ONLY=true for production."
    ;;
esac

# ── 6. SSL certs present (skip if not on prod host) ──────────
if [[ -d /etc/ssl/cloudflare ]]; then
  echo "── SSL certs ─────────────────────────────────────────"
  if [[ -f /etc/ssl/cloudflare/origin.pem && -f /etc/ssl/cloudflare/origin-key.pem ]]; then
    ok "Cloudflare origin cert + key present"
    perms=$(stat -c '%a' /etc/ssl/cloudflare/origin-key.pem 2>/dev/null || stat -f '%A' /etc/ssl/cloudflare/origin-key.pem)
    if [[ "$perms" != "600" ]]; then
      warn "origin-key.pem permissions are $perms — should be 600"
    fi
  else
    fail "Cloudflare origin cert/key missing in /etc/ssl/cloudflare/"
  fi
fi

# ── 7. Migrations applied (only if compose stack is up) ──────
if command -v docker >/dev/null 2>&1; then
  echo "── Migration status ──────────────────────────────────"
  COMPOSE="docker compose -f docker-compose.yml -f docker-compose.prod.yml"
  if $COMPOSE ps postgres 2>/dev/null | grep -q "Up\|running"; then
    if $COMPOSE exec -T postgres psql -U "${POSTGRES_USER}" -d "${POSTGRES_DB}" -tAc \
         "SELECT version_num FROM alembic_version LIMIT 1" >/tmp/alembic_ver 2>/dev/null; then
      ver=$(cat /tmp/alembic_ver | tr -d '[:space:]')
      if [[ -n "$ver" ]]; then
        ok "Alembic at revision $ver"
      else
        fail "alembic_version table empty — run: \$COMPOSE --profile migrate run --rm migrate"
      fi
    else
      fail "alembic_version table missing — migrations not applied"
    fi
    rm -f /tmp/alembic_ver
  else
    warn "Postgres container not running — skipped migration check"
  fi
fi

# ── Summary ──────────────────────────────────────────────────
echo
echo "── Summary ───────────────────────────────────────────"
echo "  $FAIL failure(s), $WARN warning(s)"
if [[ $FAIL -gt 0 ]]; then
  red "Pre-flight FAILED — do not deploy until the above are fixed."
  exit 1
fi
green "Pre-flight passed."
[[ $WARN -gt 0 ]] && yellow "Review warnings above before deploying."
exit 0
