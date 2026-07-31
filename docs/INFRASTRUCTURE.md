# Browser Heroes 2 - Infrastructure

## 1. Purpose

This document defines runtime, persistence, networking, deployment, authentication, and operational direction for Browser Heroes 2.

Architecture boundaries belong in `ARCHITECTURE.md`. Gameplay rules belong in `RULES.md` and `COMBAT.md`.

## 2. Infrastructure Philosophy

Browser Heroes 2 should remain operationally manageable for a solo developer or small team.

Infrastructure decisions should prioritize:

- reliability
- simplicity
- maintainability
- predictable deployments
- fast iteration speed
- low operational overhead

Infrastructure complexity should increase only in response to proven requirements.

The project avoids:

- premature microservices
- unnecessary distributed systems
- excessive cloud abstraction
- speculative scalability systems

## 3. Current Runtime Model

The project runs as a pnpm workspace containing a React/Vite web app, an Express API, and shared engine/content/shared packages.

Current local responsibilities:

- the web app renders the game and submits player intent
- the API manages sessions, persistence, and backend action application
- the engine resolves deterministic gameplay transitions
- the content package provides validated shared game definitions
- the shared package provides web/API contracts

Gameplay logic must remain portable and environment-independent. The backend may validate and persist gameplay outcomes, but must not introduce gameplay divergence from the shared engine.

## 4. Frontend Infrastructure

Current frontend stack:

- React
- Vite
- Tailwind CSS
- TanStack Query
- Zustand
- Socket.IO client

The frontend is responsible for rendering, user interaction, local orchestration, visual feedback, and submitting player intent.

The web client does not use Phaser or another standalone game rendering engine. Town, combat, character creation, and meta-game screens should be implemented as React interfaces backed by shared engine state, content, and selectors.

The frontend should prioritize responsiveness, fast loading, mobile compatibility, and low runtime overhead.

## 5. Backend Infrastructure

Current backend stack:

- Node.js
- Express
- Mongoose
- MongoDB
- Zod
- Socket.IO
- Express sessions backed by MongoDB

The backend currently supports guest-first sessions, optional accounts and recovery, run creation, current run lookup, run retrieval, action submission, action history, health checks, and socket-based run actions.

Backend responsibilities include:

- session management
- persistence
- applying actions through the shared engine
- validating request bodies and engine results
- storing run snapshots
- recording action history
- deriving non-authoritative summaries for querying and responses

The backend should remain lightweight, operationally simple, and stateless where practical outside session and database storage.

## 6. Persistence Model

MongoDB is the current persistence store.

Runs store the full engine-owned run state as the authoritative gameplay snapshot. Persistence should not duplicate the full engine state shape as database schema fields.

The database may store derived summaries for lookup, display, and indexing. These summaries are not authoritative gameplay data and should be regenerated from run state when state changes.

Run actions are recorded in sequence for debugging, replay investigation, and future audit/reconstruction workflows.

Achievement unlocks are stored separately from run snapshots with one permanent unlock per user and achievement. They are created transactionally while authoritative actions and ghost outcomes are processed. Achievement-bearing guests are retained by guest cleanup.

Persistence should support:

- flexible run storage
- action history
- debugging and historical analysis
- future replay validation

## 7. Networking Model

Browser Heroes 2 is not a real-time multiplayer game.

Current networking supports standard HTTP API requests and Socket.IO action submission. Both paths should route gameplay actions through the same backend engine application flow.

Networking exists primarily for:

- submitting player intent
- keeping persisted run state current
- retrieving persisted and derived application data
- lightweight event delivery where useful

The networking model should avoid:

- real-time combat synchronization
- lockstep multiplayer systems
- latency-sensitive gameplay mechanics

## 8. Authentication and Sessions

The authentication model is guest-first with optional email/password accounts.

Players can begin without account creation. Guest sessions are stored through server-side sessions and associated with persisted users and runs. A guest can register later, upgrading the same user record so existing runs, ghosts, and statistics remain attached.

Registered accounts support login and password recovery. Signing into an existing account switches the browser to that account without transferring history from the previous guest session. Registration instead upgrades the current guest user in place, so its heroes and history remain attached automatically. Passwords are stored as Argon2id hashes. Recovery uses expiring, single-use opaque tokens whose hashes are persisted.

Sessions use secure HTTP-only cookies backed by MongoDB. Authentication transitions regenerate the session, and identity-changing requests accept only the configured web origin. Amazon SES delivers password-reset messages; local development logs these links by default.

Direct connections use zero trusted proxy hops. Deployments behind CloudFront or a load balancer must configure the verified proxy-hop count so Express derives HTTPS and client IP information from the intended forwarding chain.

Gameplay should remain accessible without mandatory account creation.

Guest retention is separate from public game history. Empty guests may be removed after a short retention period and abandoned active guest runs after extended inactivity. Completed runs and published ghosts remain available to keep leaderboards stable, along with the minimal guest record required by their ownership references. Cleanup scheduling is future operational work.

The guest cleanup command defaults to a read-only report:

```bash
pnpm --filter @app/api cleanup:guests
```

Passing `--execute` deletes empty guests inactive for seven days and active or abandoned runs owned by guests inactive for twelve months:

```bash
pnpm --filter @app/api cleanup:guests -- --execute
```

The command processes bounded batches, rechecks eligibility in MongoDB transactions, preserves dead and retired runs and their actions, and preserves ghosts and their source runs. It requires only `MONGO_URI`. Production execution remains manual until the retention behavior has been validated against live dry-run reports.

## 9. Deployment Direction

Current docs should treat deployment as direction unless deployment automation is present in the codebase.

Preferred deployment direction:

- AWS infrastructure
- CloudFront CDN
- S3 frontend hosting
- Elastic Beanstalk API hosting
- CodeBuild and CodePipeline CI/CD

Deployment should prioritize operational familiarity, reliability, predictable releases, and low maintenance overhead.

Build artifacts should be repeatable and environment-specific configuration should stay explicit.

## 10. Offline Direction

Offline capability is a desirable architectural property, not current product behavior.

Infrastructure and engine design should preserve the ability to:

- run gameplay locally
- save runs locally
- replay runs offline
- synchronize progression later where practical

The simulation engine should not require persistent server connectivity, even when the current web flow uses backend persistence.

## 11. CI/CD and Operations

CI/CD should prioritize simplicity, repeatability, reliability, and fast feedback loops.

The pipeline should:

- validate builds consistently
- support isolated frontend and backend deployment
- minimize manual deployment steps
- preserve deterministic build outputs

Operational systems should be added incrementally based on real needs.

## 12. Guiding Principle

Infrastructure should make the game easier to run, deploy, observe, and maintain. If an infrastructure choice adds operational burden without a clear need, prefer the simpler option.
