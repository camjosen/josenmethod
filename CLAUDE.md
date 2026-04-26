# CLAUDE.md

Guidance for Claude Code working in this repo.

## Overview

AI-powered education orchestration. A curriculum of structured reading lessons (`src/reading_app`) is rendered by a React SPA (`src/web_frontend`) and served live to multiple clients (teacher phone + student tablet) via a Hono + Bun backend (`src/backend`) that holds ephemeral session state and broadcasts updates over WebSockets.

## Layout

Three top-level code areas; only the first two are Bun workspaces:

- `src/backend` — Bun + Hono API, port 3001. WebSocket upgrade happens in `server.ts` before Hono's `fetch` runs.
- `src/web_frontend` — React + Vite SPA, port 5173.
- `src/reading_app` — not a workspace. Pure TS curriculum + tool definitions, imported by both sides. Edit here when changing what a lesson _is_; edit in the frontend when changing how it _looks_.

Frontend path aliases (`vite.config.ts` + `tsconfig.json`):

- `@/*` → `src/web_frontend/src/*`
- `@backend/*` → `src/backend/src/*`
- `@reading_app/*` → `src/reading_app/*`

Backend uses relative imports today; add an alias if you do substantial curriculum work from the backend.

## Backend: no side effects at module load

External clients (database, WorkOS, etc.) must be lazy:

```ts
let _client: Client | null = null;
function getClient() {
  if (!_client) _client = new Client(process.env.REQUIRED_VAR!);
  return _client;
}
```

Why: every module imported by `app.ts` runs at boot. A throw or env-var read at module load takes down _every_ feature, not just the one it belongs to, and blocks unrelated work for anyone without the relevant secrets in their env. Pattern is already applied to `db/index.ts` and the WorkOS client — keep it.

## Live sessions (`src/backend/src/sessions/`)

In-memory `Map<code, Session>`, ephemeral by design — no DB table, sessions evaporate when the process dies. One session per lesson; a 4-char code (30-char unambiguous alphabet, no `0/O/1/I`) is generated on create. Clients connect WS to `/sessions/:code/ws?role=teacher|student`; the server applies `ClientMsg` commands and broadcasts full `SessionState` snapshots on every change.

Wire types in `sessions/types.ts` are imported directly by the frontend via `@backend/sessions/types`.

## Frontend: rendering curriculum activities

`reading_exercise/` renders its own `Lesson`/`Activity`/`Word` types. `session/lessonAdapter.ts` maps curriculum activities (`ReadSounds`, `VerbalBlending`, `Story`, …) into that shape — currently with minimal item rendering. Richer rendering (compound tuples, story paragraphs, sound diacritics) is a known follow-up; extend `lessonAdapter` and the components in `reading_exercise/`, not `SessionStage`.

## Frontend: state

TanStack Query is configured but isn't used for sessions — `useSession` is WebSocket-native (push doesn't fit Query's pull model). Use Query for regular REST fetches; use a hook like `useSession` for anything real-time.

## Environment variables — two loading paths (this has bitten)

- **Vite** (frontend) loads `.env.local` from the **repo root** via `loadEnv(mode, path.resolve(__dirname, '../..'), '')` in `vite.config.ts`.
- **Bun** (backend) loads `.env` / `.env.local` from the **backend's CWD** (`src/backend`). It does NOT read the repo-root `.env.local`.

Repo-root `.env.local` is the source of truth for frontend-visible and shared dev secrets; copy what the backend needs into `src/backend/.env` (see `.env.example`). The backend boots without these (lazy init), but features that touch them fail at call time if missing.

## Auth

AuthKit-React owns the session end-to-end. Frontend calls `signIn()`/`signOut()` from `useAuth()`; WorkOS redirects back to `/callback`, which hydrates the session. API calls go through `useApiClient()` (Hono RPC client) which attaches `Authorization: Bearer <accessToken>` from AuthKit's auto-refreshing `getAccessToken()`. The backend verifies tokens via the WorkOS JWKS endpoint and lazily upserts an `accounts` row on first hit. There is no backend-minted JWT and no `/auth/*` route — AuthKit handles the OAuth dance client-side.

WorkOS dashboard must have `http://localhost:5173/callback` as an allowed redirect URI.
