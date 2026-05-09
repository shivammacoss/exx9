#!/usr/bin/env bash
# Daily database backup for EXX9.
#
# Dumps both Postgres (transactional) and TimescaleDB (market data) to
# the directory passed as $1, then prunes anything older than 14 days.
#
# Usage (manual):     ./scripts/backup-db.sh /root/backups
# Usage (cron, 2am):  0 2 * * * cd /root/exx9 && ./scripts/backup-db.sh /root/backups >> /var/log/exx9-backup.log 2>&1

set -euo pipefail

BACKUP_DIR="${1:-/root/backups}"
RETENTION_DAYS="${BACKUP_RETENTION_DAYS:-14}"
COMPOSE="docker compose -f docker-compose.yml -f docker-compose.prod.yml"
TS=$(date +%Y%m%d-%H%M%S)

mkdir -p "$BACKUP_DIR"

# Read DB creds from .env (POSIX-ish: KEY=VALUE lines)
if [[ ! -f .env ]]; then
  echo "[backup-db] .env not found in $(pwd) — aborting." >&2
  exit 1
fi
# shellcheck disable=SC2046
export $(grep -E '^(POSTGRES_USER|POSTGRES_DB|TIMESCALE_USER|TIMESCALE_DB)=' .env | xargs -d '\n')

PG_USER="${POSTGRES_USER:-protrader}"
PG_DB="${POSTGRES_DB:-protrader}"
TS_USER="${TIMESCALE_USER:-protrader}"
TS_DB="${TIMESCALE_DB:-market_data}"

echo "[backup-db] $TS — starting"

# Postgres (main app DB)
PG_OUT="$BACKUP_DIR/pg_${PG_DB}_${TS}.sql.gz"
$COMPOSE exec -T postgres pg_dump -U "$PG_USER" -d "$PG_DB" --no-owner --no-acl \
  | gzip -9 > "$PG_OUT"
echo "[backup-db] wrote $PG_OUT ($(du -h "$PG_OUT" | cut -f1))"

# TimescaleDB (market data) — schema + data; for very large hypertables
# you may want to limit time ranges or use timescaledb-backup separately.
TS_OUT="$BACKUP_DIR/ts_${TS_DB}_${TS}.sql.gz"
$COMPOSE exec -T timescaledb pg_dump -U "$TS_USER" -d "$TS_DB" --no-owner --no-acl \
  | gzip -9 > "$TS_OUT"
echo "[backup-db] wrote $TS_OUT ($(du -h "$TS_OUT" | cut -f1))"

# Prune old backups
find "$BACKUP_DIR" -maxdepth 1 -type f -name '*.sql.gz' -mtime +"$RETENTION_DAYS" -print -delete

echo "[backup-db] $TS — done"
