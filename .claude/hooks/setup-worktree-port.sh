#!/bin/bash
set -euo pipefail

INPUT=$(cat)

# Extract worktree path from tool response (may be object or string)
RESPONSE=$(echo "$INPUT" | jq -r '.tool_response // ""')

if echo "$RESPONSE" | jq -e 'type == "object"' &>/dev/null 2>&1; then
  WORKTREE_PATH=$(echo "$RESPONSE" | jq -r '.path // .worktree_path // ""')
else
  WORKTREE_PATH=$(echo "$RESPONSE" | grep -oE '/[A-Za-z0-9/_.-]+/\.claude/worktrees/[A-Za-z0-9_-]+' | head -1 || true)
fi

if [ -z "$WORKTREE_PATH" ] || [ "$WORKTREE_PATH" = "null" ]; then
  echo "setup-worktree-port: could not determine worktree path from tool response" >&2
  exit 0
fi

# Find the first available port in range 5174–5190
PORT=""
for p in $(seq 5174 5190); do
  if ! lsof -i:"$p" -sTCP:LISTEN -t &>/dev/null 2>&1; then
    PORT=$p
    break
  fi
done

if [ -z "$PORT" ]; then
  echo "setup-worktree-port: no free port found in 5174–5190" >&2
  exit 0
fi

ENV_FILE="$WORKTREE_PATH/.env.local"

if [ -f "$ENV_FILE" ] && grep -q '^FRONTEND_PORT=' "$ENV_FILE"; then
  sed -i '' "s/^FRONTEND_PORT=.*/FRONTEND_PORT=$PORT/" "$ENV_FILE"
else
  echo "FRONTEND_PORT=$PORT" >> "$ENV_FILE"
fi

echo "setup-worktree-port: set FRONTEND_PORT=$PORT in $ENV_FILE"

LAN_IP=$(ipconfig getifaddr en0 2>/dev/null || true)
if [ -n "$LAN_IP" ]; then
  echo "setup-worktree-port: LAN URL will be http://$LAN_IP:$PORT"
  echo "setup-worktree-port: to use WorkOS auth from another device, add http://$LAN_IP:$PORT/callback to the WorkOS dashboard's allowed redirect URIs"
fi
