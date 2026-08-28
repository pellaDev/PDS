#!/usr/bin/env bash
# PDS showcase launcher — installs workspace dependencies on first run, then
# starts the design-system WebUI (the same UI that ships inside @workspace/pds)
# on a local port. Run it from anywhere; it cd's to the repo root itself.
#
#   ./start.sh                 -> http://localhost:5173/
#   PDS_PORT=8080 ./start.sh   -> http://localhost:8080/
set -euo pipefail
cd "$(dirname "$0")"

if ! command -v pnpm >/dev/null 2>&1; then
  echo 'error: pnpm not found in PATH. This workspace requires pnpm (the preinstall guard rejects npm/yarn).' >&2
  exit 1
fi

PORT="${PDS_PORT:-5173}"

if [ ! -d node_modules ]; then
  echo '[pds] first run: installing workspace dependencies...'
  pnpm install
else
  echo '[pds] node_modules present, skipping install (delete it to force a clean reinstall)'
fi

echo "[pds] showcase starting at http://localhost:${PORT}/"
exec env PORT="${PORT}" pnpm --filter @workspace/pds run dev
