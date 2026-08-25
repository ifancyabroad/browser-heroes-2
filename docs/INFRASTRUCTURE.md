# Browser Heroes 2 - Infrastructure

## 1. Purpose

This document defines runtime, persistence, networking, deployment, authentication, and operational direction for Browser Heroes 2.

Architecture boundaries belong in `ARCHITECTURE.md`. Gameplay rules belong in `RULES.md` and `COMBAT.md`.

## 2. Runtime Model

The project runs as a pnpm workspace containing a React/Vite web app, an Express API, and shared engine/content/shared packages.

Current local responsibilities:

- the web app renders the game and submits player intent
- the API manages sessions, persistence, and backend action application
- the engine resolves deterministic gameplay transitions
- the content package provides validated shared game definitions
- the shared package provides web/API contracts

Gameplay logic must remain portable and environment-independent. The backend may validate and persist gameplay outcomes, but must not introduce gameplay divergence from the shared engine.

Offline play is not current product behavior, but the engine should remain able to run and serialize gameplay without persistent server connectivity.

## 3. Frontend

Current frontend stack:

- React
- Vite
- Tailwind CSS
- TanStack Query
- Zustand
- Socket.IO client

The React client renders shared state and submits player intent. UI behavior and gameplay authority are defined in `DESIGN.md` and `ARCHITECTURE.md`.

## 4. Backend

Current backend stack:

- Node.js
- Express
- Mongoose
- MongoDB
- Zod
- Socket.IO
- Express sessions backed by MongoDB

The backend supports guest-first identity, optional accounts and recovery, persisted gameplay and meta-game data, health checks, and both HTTP and socket-based run actions. Its application responsibilities and authority boundaries are defined in `ARCHITECTURE.md`.

## 5. Persistence

MongoDB is the current persistence store.

Runs store the full engine-owned run state as the authoritative gameplay snapshot. Persistence should not duplicate the full engine state shape as database schema fields.

Daily challenge definitions are derived from their UTC date and stored when first played. The date determines the shared seed, class, and midnight ghost-pool cutoff, so an unplayed day remains reproducible without a database record. Runs identify their mode and challenge date, and a unique constraint permits only one daily attempt per user and date. Ghost selection derives a daily run's cutoff from that date, while normal runs use their creation time directly.

The database may store derived summaries for lookup, display, and indexing. These summaries are not authoritative gameplay data and should be regenerated from run state when state changes.

Run actions are recorded in sequence for debugging, replay investigation, and future audit/reconstruction workflows.

Achievement unlocks are stored separately from run snapshots with one permanent unlock per user and achievement. They are created transactionally while authoritative actions and ghost outcomes are processed. Achievement-bearing guests are retained by guest cleanup.

## 6. Networking

Browser Heroes 2 is not a real-time multiplayer game.

Current networking supports standard HTTP API requests and Socket.IO action submission. Both paths should route gameplay actions through the same backend engine application flow.

Networking exists primarily for:

- submitting player intent
- keeping persisted run state current
- retrieving persisted and derived application data
- lightweight event delivery where useful

## 7. Authentication and Sessions

The authentication model is guest-first with optional email/password accounts.

Players can begin without account creation. Guest sessions are stored through server-side sessions and associated with persisted users and runs. A guest can register later, upgrading the same user record so existing runs, ghosts, history, and achievement progress remain attached.

Registered accounts support login and password recovery. Signing into an existing account switches the browser to that account without transferring history from the previous guest session. Registration instead upgrades the current guest user in place, so its heroes and history remain attached automatically. Passwords are stored as Argon2id hashes. Recovery uses expiring, single-use opaque tokens whose hashes are persisted.

Sessions use secure HTTP-only, `SameSite=Lax` cookies backed by MongoDB. Production serves the web app and API from the same site so session cookies do not need cross-site access. Authentication transitions regenerate the session, and identity-changing requests accept only the configured web origin. Amazon SES delivers password-reset messages; local development logs these links by default.

Direct connections use zero trusted proxy hops. Deployments behind CloudFront or a load balancer must configure the verified proxy-hop count so Express derives HTTPS and client IP information from the intended forwarding chain.

Production startup requires an HTTPS application URL, a session secret of at least 32 characters, SES email delivery, and an explicit trusted proxy-hop count. Development retains local HTTP, logged email delivery, and zero proxy hops as defaults.

Gameplay should remain accessible without mandatory account creation.

Guest retention is separate from public game history. Empty guests may be removed after a short retention period and abandoned active guest runs after extended inactivity. Ranked daily challenge runs and published ghosts remain available to keep historical results and deterministic ghost pools stable, along with the minimal guest record required by their ownership references. Cleanup scheduling is future operational work.

The guest cleanup command defaults to a read-only report:

```bash
pnpm --filter @app/api cleanup:guests
```

Passing `--execute` deletes empty guests inactive for seven days and active or abandoned runs owned by guests inactive for twelve months:

```bash
pnpm --filter @app/api cleanup:guests -- --execute
```

The command processes bounded batches, rechecks eligibility in MongoDB transactions, preserves dead and retired runs and their actions, and preserves ghosts and their source runs. It requires only `MONGO_URI`. Production execution remains manual until the retention behavior has been validated against live dry-run reports.

## 8. Deployment

The production deployment target is:

- AWS infrastructure
- CloudFront CDN
- S3 frontend hosting
- Elastic Beanstalk API hosting
- CodeBuild and CodePipeline CI/CD

The repository-owned artifact and runtime contract is defined in `DEPLOYMENT.md`; the infrastructure stack and operational sequence are summarized in `../infra/README.md`.

## 9. CI/CD and Operations

Production uses Elastic Beanstalk enhanced health reporting without publishing optional CloudWatch custom metrics or streaming application logs. This provides detailed current environment health without intentionally adding monitoring charges; historical application latency and request metrics can be enabled later if needed.

Gameplay and content releases that can change seeded opportunity generation should be activated at
a UTC Daily Challenge boundary.

## 10. Guiding Principle

Infrastructure should make the game easier to run, deploy, observe, and maintain. If an infrastructure choice adds operational burden without a clear need, prefer the simpler option.
