#!/usr/bin/env bash
#
# One-command local setup for the Adfinis website monorepo.
#
#   ./scripts/setup.sh --check   only verify prerequisites
#   ./scripts/setup.sh           full setup (safe to re-run)
#
# What it does:
#   1. checks git, docker (running) and a Node version manager (fnm or nvm)
#   2. installs the Node versions pinned in strapi/.nvmrc and nextjs/.nvmrc
#   3. starts (or creates) the local PostgreSQL container
#   4. creates strapi/.env and nextjs/.env.local with generated secrets
#      (existing files are never overwritten)
#   5. installs npm dependencies in both apps
#   6. seeds Strapi: locales, admin user, content, revalidation webhook, API token
#
# Overridable: PG_CONTAINER (default adfinis-website-postgres), PG_PORT (default 5432)

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PG_CONTAINER="${PG_CONTAINER:-adfinis-website-postgres}"
PG_PORT="${PG_PORT:-5432}"
PG_PASSWORD="supersecret"
CHECK_ONLY=false
[[ "${1:-}" == "--check" ]] && CHECK_ONLY=true

if [[ -t 1 ]]; then B=$'\033[1m'; G=$'\033[32m'; R=$'\033[31m'; Y=$'\033[33m'; N=$'\033[0m'; else B=; G=; R=; Y=; N=; fi
step() { printf '\n%s==> %s%s\n' "$B" "$1" "$N"; }
ok()   { printf '  %s✓%s %s\n' "$G" "$N" "$1"; }
warn() { printf '  %s!%s %s\n' "$Y" "$N" "$1"; }
fail() { printf '  %s✗ %s%s\n' "$R" "$1" "$N"; FAILED=1; }
die()  { printf '\n%s%s%s\n' "$R" "$1" "$N" >&2; exit 1; }
FAILED=0

OS="$(uname -s)"

# ---------------------------------------------------------------- prerequisites
step "Checking prerequisites"

command -v git >/dev/null 2>&1 && ok "git" || fail "git not found. macOS: run 'xcode-select --install'"

if ! command -v docker >/dev/null 2>&1; then
  if [[ "$OS" == "Darwin" ]]; then
    fail "docker not found. Install it with: brew install --cask docker  (then start Docker Desktop)"
  else
    fail "docker not found. Install it with your package manager and start the service (see README)"
  fi
elif ! docker info >/dev/null 2>&1; then
  fail "docker is installed but not running (or your user may not access it). Start Docker Desktop / the docker service"
else
  ok "docker"
fi

# Node version manager: fnm preferred, nvm supported.
NODE_MANAGER=""
if command -v fnm >/dev/null 2>&1; then
  NODE_MANAGER="fnm"
  eval "$(fnm env)"
  ok "fnm"
else
  for candidate in "${NVM_DIR:-$HOME/.nvm}/nvm.sh" "/opt/homebrew/opt/nvm/nvm.sh" "/usr/local/opt/nvm/nvm.sh"; do
    if [[ -s "$candidate" ]]; then
      # shellcheck disable=SC1090
      NVM_DIR="${NVM_DIR:-$HOME/.nvm}" . "$candidate"
      NODE_MANAGER="nvm"
      set +u  # nvm.sh is not nounset-safe
      break
    fi
  done
  if [[ -n "$NODE_MANAGER" ]]; then
    ok "nvm"
  else
    if [[ "$OS" == "Darwin" ]]; then
      fail "no Node version manager found. Install fnm with: brew install fnm"
    else
      fail "no Node version manager found. Install fnm (https://github.com/Schniz/fnm) or nvm"
    fi
  fi
fi

command -v openssl >/dev/null 2>&1 && ok "openssl" || fail "openssl not found (needed to generate secrets)"

if [[ "$FAILED" -ne 0 ]]; then
  die "Fix the problems above and run this script again."
fi
if $CHECK_ONLY; then
  printf '\n%sAll prerequisites are in place.%s\n' "$G" "$N"
  exit 0
fi

# Run a command inside an app folder using the Node version from its .nvmrc.
in_app() {
  local dir="$1"; shift
  if [[ "$NODE_MANAGER" == "fnm" ]]; then
    (cd "$ROOT/$dir" && fnm exec --using=.nvmrc -- "$@")
  else
    (cd "$ROOT/$dir" && nvm exec "$(cat .nvmrc)" "$@")
  fi
}

# ------------------------------------------------------------------ node versions
step "Installing Node versions"
for app in strapi nextjs; do
  if [[ "$NODE_MANAGER" == "fnm" ]]; then
    (cd "$ROOT/$app" && fnm install >/dev/null 2>&1 || fnm install)
  else
    (cd "$ROOT/$app" && nvm install >/dev/null)
  fi
  ok "$app: Node $(tr -d '\n' < "$ROOT/$app/.nvmrc")"
done

# ------------------------------------------------------------------- postgres
step "Starting PostgreSQL ($PG_CONTAINER on port $PG_PORT)"
if docker ps -a --format '{{.Names}}' | grep -qx "$PG_CONTAINER"; then
  if docker ps --format '{{.Names}}' | grep -qx "$PG_CONTAINER"; then
    ok "container already running"
  else
    docker start "$PG_CONTAINER" >/dev/null
    ok "container started"
  fi
else
  if docker ps --format '{{.Ports}}' | grep -q ":${PG_PORT}->"; then
    die "Port $PG_PORT is used by another container. Stop it, or re-run with PG_PORT=<free port>."
  fi
  docker run -d -p "${PG_PORT}:5432" --name "$PG_CONTAINER" \
    -e POSTGRES_DB=postgres -e POSTGRES_PASSWORD="$PG_PASSWORD" postgres >/dev/null
  ok "container created"
fi
printf '  waiting for the database'
for _ in $(seq 1 30); do
  if docker exec "$PG_CONTAINER" pg_isready -U postgres >/dev/null 2>&1; then break; fi
  printf '.'; sleep 1
done
echo
docker exec "$PG_CONTAINER" pg_isready -U postgres >/dev/null 2>&1 || die "PostgreSQL did not become ready."
ok "database is accepting connections"

# ------------------------------------------------------------------- env files
# set_env FILE KEY VALUE: replace KEY=... if present, else append.
set_env() {
  local file="$1" key="$2" value="$3" tmp
  tmp="$(mktemp)"
  if grep -q "^${key}=" "$file" 2>/dev/null; then
    KEY="$key" VALUE="$value" awk -F= '$1 == ENVIRON["KEY"] { print ENVIRON["KEY"] "=" ENVIRON["VALUE"]; next } { print }' "$file" > "$tmp"
  else
    { cat "$file" 2>/dev/null; printf '%s=%s\n' "$key" "$value"; } > "$tmp"
  fi
  cat "$tmp" > "$file"; rm -f "$tmp"
}
# get_env FILE KEY: print the value, or nothing (never fails, so it is safe under set -e).
get_env() { { grep "^$2=" "$1" 2>/dev/null || true; } | head -1 | cut -d= -f2- | tr -d '"'; }
rand() { openssl rand -base64 24 | tr -d '\n'; }

step "Creating env files"
STRAPI_ENV="$ROOT/strapi/.env"
NEXT_ENV="$ROOT/nextjs/.env.local"

if [[ -f "$STRAPI_ENV" ]]; then
  ok "strapi/.env exists, leaving it alone"
else
  cp "$ROOT/strapi/.env.example" "$STRAPI_ENV"
  set_env "$STRAPI_ENV" APP_KEYS "\"$(rand),$(rand),$(rand),$(rand)\""
  for key in API_TOKEN_SALT ADMIN_JWT_SECRET TRANSFER_TOKEN_SALT JWT_SECRET; do
    set_env "$STRAPI_ENV" "$key" "$(rand)"
  done
  set_env "$STRAPI_ENV" DRAFT_MODE_SECRET "$(openssl rand -hex 32)"
  set_env "$STRAPI_ENV" DATABASE_CLIENT postgres
  set_env "$STRAPI_ENV" DATABASE_HOST localhost
  set_env "$STRAPI_ENV" DATABASE_PORT "$PG_PORT"
  set_env "$STRAPI_ENV" DATABASE_NAME postgres
  set_env "$STRAPI_ENV" DATABASE_USERNAME postgres
  set_env "$STRAPI_ENV" DATABASE_PASSWORD "$PG_PASSWORD"
  ok "strapi/.env created with generated secrets"
fi

touch "$NEXT_ENV"
[[ -n "$(get_env "$NEXT_ENV" DRAFT_MODE_SECRET)" ]] || set_env "$NEXT_ENV" DRAFT_MODE_SECRET "$(get_env "$STRAPI_ENV" DRAFT_MODE_SECRET)"
[[ -n "$(get_env "$NEXT_ENV" ALTCHA_HMAC_KEY)" ]] || set_env "$NEXT_ENV" ALTCHA_HMAC_KEY "$(openssl rand -hex 32)"
ok "nextjs/.env.local ready (DRAFT_MODE_SECRET matches Strapi)"

# ---------------------------------------------------------------- dependencies
step "Installing npm dependencies (this takes a minute)"
in_app strapi npm ci --no-audit --no-fund >/dev/null 2>&1 && ok "strapi" || die "npm ci failed in strapi/. Run it manually to see the error."
in_app nextjs npm ci --no-audit --no-fund >/dev/null 2>&1 && ok "nextjs" || die "npm ci failed in nextjs/. Run it manually to see the error."

# ------------------------------------------------------------------------ seed
step "Seeding Strapi (locales, admin, content, revalidation webhook, API token)"
# The seed never writes env files; it prints the API token as `SEEDED_API_TOKEN=...` and we
# store it here. If Strapi has the token but nextjs/.env.local lost the key, regenerate it.
SEED_LOG="$(mktemp)"
trap 'rm -f "$SEED_LOG"' EXIT
REGENERATE=0
[[ -n "$(get_env "$NEXT_ENV" STRAPI_API_TOKEN)" ]] || REGENERATE=1
# The revalidation webhook authenticates with the same REVALIDATE_SECRET Next.js uses
# (.env.local overrides the committed .env).
REVALIDATE_SECRET="$(get_env "$NEXT_ENV" REVALIDATE_SECRET)"
[[ -n "$REVALIDATE_SECRET" ]] || REVALIDATE_SECRET="$(get_env "$ROOT/nextjs/.env" REVALIDATE_SECRET)"
(
  export SEED_PRINT_TOKEN=1 SEED_REGENERATE_TOKEN="$REGENERATE" SEED_REVALIDATE_SECRET="$REVALIDATE_SECRET"
  in_app strapi npm run --silent seed
) 2>&1 | tee "$SEED_LOG" | grep -v '^SEEDED_API_TOKEN=' || true
grep -q '^Done\.' "$SEED_LOG" || die "Seeding failed, see the output above."
SEEDED_TOKEN="$(grep '^SEEDED_API_TOKEN=' "$SEED_LOG" | head -1 | cut -d= -f2-)"
if [[ -n "$SEEDED_TOKEN" ]]; then
  set_env "$NEXT_ENV" STRAPI_API_TOKEN "$SEEDED_TOKEN"
  ok "API token saved to nextjs/.env.local"
elif [[ -n "$(get_env "$NEXT_ENV" STRAPI_API_TOKEN)" ]]; then
  ok "API token already in nextjs/.env.local"
else
  warn "no API token available; create one in the Strapi admin and set STRAPI_API_TOKEN in nextjs/.env.local"
fi

cat <<EOF

${G}${B}Setup complete.${N}

Start the two apps in separate terminals:

  cd strapi && npm run develop     # http://localhost:1337/admin
  cd nextjs && npm run dev         # http://localhost:3000

Strapi admin login (only created if the database had no admin yet):
  admin@adfinis.test / Adfinis-local-1
  (set DEFAULT_STRAPI_ADMIN_PASS in your shell or strapi/.env before running to choose another password)
EOF
