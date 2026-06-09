# Browser Heroes 2

Browser Heroes 2 is a browser roguelike RPG built around fast, repeatable runs of deterministic turn-based combat.

The project uses a pnpm workspace monorepo so the web app, API, shared gameplay engine, and content package can evolve together without duplicating rules.

## Prerequisites

- Node.js 18.18+
- pnpm 10+
- MongoDB for API persistence

## Quick Start

```bash
pnpm install
pnpm dev
```

Default local services:

- Web: `http://localhost:5173`
- API: `http://localhost:4000`

## Environment

The API expects MongoDB configuration in `apps/api/.env`:

```env
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/browser_heroes_2
# WEB_ORIGIN=https://your-site.example
```

The web app may optionally set `VITE_API_BASE_URL` in `apps/web/.env`.

## Workspace Layout

```text
apps/
  api/       Express API for persistence, scores, and backend services
  web/       React, Vite, and Phaser browser client
packages/
  content/   Declarative game content and generated registries
  engine/    Shared deterministic gameplay engine
  shared/    Shared app/API types and schemas
```

## Common Scripts

```bash
pnpm dev          # Run workspace dev tasks
pnpm build        # Build all packages and apps
pnpm typecheck    # Type check the workspace
pnpm lint         # Run ESLint
pnpm test         # Run tests
pnpm format       # Format files with Prettier
```

## Documentation

Start with the [documentation map](docs/README.md). The docs are intentionally concise: they describe product intent, gameplay rules, architecture boundaries, combat direction, and infrastructure principles without duplicating volatile code or schemas.
