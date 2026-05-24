#!/usr/bin/env sh
set -eu

ROOT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
BACKUP_DIR="${ROOT_DIR}/backups"
STAMP="$(date +%Y%m%d_%H%M%S)"

set -a
. "${ROOT_DIR}/.env.vps"
set +a

mkdir -p "${BACKUP_DIR}"

docker compose -f "${ROOT_DIR}/docker-compose.yml" --env-file "${ROOT_DIR}/.env.vps" \
  exec -T db pg_dump -U "${POSTGRES_USER}" "${POSTGRES_DB}" > "${BACKUP_DIR}/db_${STAMP}.sql"

# keep last 7 backups
ls -1t "${BACKUP_DIR}"/db_*.sql 2>/dev/null | awk 'NR>7' | xargs -r rm -f

echo "Backup created: ${BACKUP_DIR}/db_${STAMP}.sql"
