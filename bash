#!/usr/bin/env bash
LOG=/var/log/docker-monitor.log
APP_URL="http://127.0.0.1:8000/api/v1/webhook/wp-sites/status-callback"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# iterate containers or directories
SITES_DIR=/home/abir
if [ ! -d "$SITES_DIR" ]; then
  echo "$TIMESTAMP - INFO - Sites dir not found: $SITES_DIR" >> "$LOG"
  exit 0
fi

for dir in "$SITES_DIR"/*/; do
  [ -d "$dir" ] || continue
  # Attempt to find domain from docker-compose (simple grep)
  domain=$(grep -m1 'VIRTUAL_HOST:' -R "$dir" || true)
  domain=${domain##*:}
  domain=$(echo "$domain" | tr -d ' "')
  if [ -z "$domain" ]; then
    # fallback: infer domain from directory name
    domain=$(basename "$dir")
  fi

  # Check container health: find wordpress container status in this compose
  # We'll use docker compose ps --status
  status_output=$(cd "$dir" && docker compose ps --format json 2>/dev/null || true)
  if [ -z "$status_output" ]; then
    status=1
  else
    # crude: if any container not running => stopped/failed
    if echo "$status_output" | grep -q '"State":"running"'; then
      status=3
    else
      status=1
    fi
  fi

  echo "$TIMESTAMP - INFO - $domain => $status" >> "$LOG"

  # send webhook to Laravel (non-blocking, timeout)
  curl -m 10 -s -X POST "$APP_URL" -H "Content-Type: application/json" -d "{\"domain\":\"$domain\",\"status\":\"$status\"}" >/dev/null 2>&1 || true
done