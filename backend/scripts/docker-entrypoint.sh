#!/bin/sh
set -e

echo "[entrypoint] Kuboqss backend starting..."

max_attempts=30
attempt=0

while [ "$attempt" -lt "$max_attempts" ]; do
  attempt=$((attempt + 1))
  echo "[entrypoint] Running migrations (attempt ${attempt}/${max_attempts})..."

  if alembic upgrade head; then
    echo "[entrypoint] Migrations applied successfully."
    break
  fi

  if [ "$attempt" -ge "$max_attempts" ]; then
    echo "[entrypoint] ERROR: migrations failed after ${max_attempts} attempts."
    exit 1
  fi

  echo "[entrypoint] Database not ready yet. Retrying in 3 seconds..."
  sleep 3
done

echo "[entrypoint] Starting Uvicorn on port 8000..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000
