#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

if ! command -v pnpm >/dev/null 2>&1; then
  echo 'error: pnpm not found in PATH.' >&2
  exit 1
fi

PORT="${PDS_PORT:-5173}"

if [ ! -d node_modules ]; then
  echo '[pds] first run: installing dependencies...'
  pnpm install
else
  echo '[pds] node_modules present, skipping install'
fi

echo "[pds] showcase starting at http://localhost:${PORT}/"
exec env PORT="${PORT}" pnpm run dev