# AI Assistant

A simple AI chat assistant powered by Google Gemini with text-to-speech (gTTS) support. Chat with Gemini AI and listen to responses read aloud.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/ai-assistant run dev` — run the frontend (port 19570)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string
- Required env: `AI_INTEGRATIONS_GEMINI_BASE_URL`, `AI_INTEGRATIONS_GEMINI_API_KEY` — auto-set by Replit AI Integrations

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- AI: Google Gemini 2.5 Flash via Replit AI Integrations (`@workspace/integrations-gemini-ai`)
- TTS: gTTS (Python 3, installed via python3 -m pip)
- DB: PostgreSQL + Drizzle ORM (conversations + messages tables)
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)
- Frontend: React + Vite + TailwindCSS + shadcn/ui, wouter routing

## Where things live

- `lib/api-spec/openapi.yaml` — OpenAPI spec (source of truth for contracts)
- `lib/db/src/schema/conversations.ts`, `messages.ts` — DB schema
- `artifacts/api-server/src/routes/gemini/` — Gemini chat routes (SSE streaming)
- `artifacts/api-server/src/routes/tts/` — gTTS text-to-speech route
- `artifacts/ai-assistant/src/` — React frontend

## Architecture decisions

- Gemini responses are streamed via SSE — the frontend consumes them with native `fetch` + `ReadableStream`, not the generated hook
- TTS uses a Python subprocess (`gTTS`) spawned by the Node.js Express server; audio is piped directly as `audio/mpeg`
- `@google/genai` was removed from esbuild externals so it gets bundled (it's pure JS)
- orval codegen overwrites `lib/api-zod/src/index.ts`; the codegen script now overwrites it with only `export * from "./generated/api"` after orval runs

## Product

- Create conversations and chat with Gemini AI
- Messages stream in real-time via SSE
- Play any AI response as speech using gTTS (Python)
- Delete conversations

## Gotchas

- gTTS requires Python 3 and must be installed: `python3 -m pip install gTTS`
- After OpenAPI spec changes, always run codegen before building
- `@google/*` was removed from esbuild externals — only `@google-cloud/*` remains
- The orval zod codegen script writes its own `index.ts`; codegen script patches it after
