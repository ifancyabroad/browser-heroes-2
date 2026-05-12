# Browser Heroes 2 — Infrastructure Principles

---

# 1. Purpose

This document defines the operational and deployment principles that govern Browser Heroes 2.

Its goals are to:

- preserve operational simplicity
- support deterministic gameplay systems
- guide infrastructure decisions
- support scalable deployment boundaries
- reduce unnecessary operational complexity

This document defines infrastructure direction, not detailed implementation.

---

# 2. Infrastructure Philosophy

Browser Heroes 2 should remain operationally manageable as a small-team or solo-developed project.

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

---

# 3. Runtime Model

Gameplay logic must remain portable and environment-independent. See ARCHITECTURE.md §3.1 for simulation layer constraints.

The backend may validate and persist gameplay outcomes but must not introduce gameplay divergence from the shared simulation engine.

Gameplay logic should not be duplicated separately across frontend and backend systems.

---

# 4. Monorepo Structure

The project uses a pnpm workspace monorepo.

The monorepo exists to:

- preserve shared gameplay logic
- reduce duplication
- simplify tooling
- support deterministic parity
- support shared content definitions

The project should favor:

- explicit package boundaries
- reusable shared modules
- low cross-package coupling

---

# 5. Shared Packages

## 5.1 Shared Engine Package

The shared engine package contains:

- combat systems
- progression systems
- hero systems
- enemy systems
- deterministic simulation logic
- replay-safe state transitions

The shared engine package should:

- remain framework-agnostic
- avoid UI dependencies
- avoid backend runtime assumptions
- support deterministic replay

---

## 5.2 Shared Content Package

Gameplay content should remain data-driven.

The content package contains:

- item definitions
- skill definitions
- enemy definitions
- loot tables
- progression data
- encounter pools

Content should remain:

- declarative
- versionable
- human-readable
- portable across environments

---

# 6. Frontend Infrastructure

Frontend stack direction:

- React
- Vite
- Tailwind CSS
- Zustand
- TanStack Query
- Phaser

Phaser renders the town as a 2D top-down tile-based map. The player navigates the map to interact with town facilities (shop, tavern, etc.) and exits via a gate to enter turn-based combat. React handles all non-town UI including combat, menus, and HUD.

Frontend responsibilities include:

- rendering
- user interaction
- local state orchestration
- visual feedback
- client-side simulation execution

The frontend should prioritize:

- responsiveness
- fast loading
- mobile compatibility
- low runtime overhead

The frontend must not become the authoritative gameplay source.

---

# 7. Backend Infrastructure

Backend stack direction:

- Node.js
- Express
- Mongoose
- Zod
- Socket.IO

Backend responsibilities include:

- persistence
- leaderboards
- ghost systems
- world event broadcasting
- account systems
- replay storage
- validation of simulation outcomes

The backend should remain:

- lightweight
- operationally simple
- stateless where practical
- horizontally scalable if required

The backend should avoid:

- duplicated gameplay logic
- frontend-specific assumptions
- tightly coupled persistence systems

---

# 8. Database Principles

MongoDB is the primary persistence layer.

The database should prioritize:

- flexible run storage
- replay persistence
- ghost reconstruction
- progression history
- event logging

Persistence formats should support:

- deterministic replay
- debugging
- ghost recreation
- historical analysis

---

# 9. Hosting & Deployment

Deployment direction:

- AWS infrastructure
- CloudFront CDN
- S3 frontend hosting
- Elastic Beanstalk API hosting
- CodeBuild + CodePipeline CI/CD

Infrastructure should prioritize:

- operational familiarity
- reliability
- predictable deployments
- low maintenance overhead

The deployment pipeline should support:

- repeatable builds
- isolated deployment flows
- deterministic build artifacts

---

# 10. Offline Support

Offline capability is considered a desirable architectural property.

The infrastructure should preserve the ability to:

- run gameplay locally
- save runs locally
- replay runs offline
- synchronize progression later where practical

The simulation engine should not require persistent server connectivity.

---

# 11. Networking Principles

Browser Heroes 2 is not a real-time multiplayer game.

Networking exists primarily for:

- ghost synchronization
- leaderboard updates
- world event broadcasting
- account persistence

Socket.IO should primarily support:

- lightweight event delivery
- asynchronous social presence
- world activity broadcasting

The networking model should avoid:

- real-time combat synchronization
- lockstep multiplayer systems
- latency-sensitive gameplay mechanics

---

# 12. Authentication Principles

Authentication model:

- anonymous guest-first accounts
- optional account creation

The system should support:

- frictionless onboarding
- temporary guest progression
- optional account linking
- progression persistence upgrades

Gameplay should remain accessible without mandatory account creation.

---

# 13. CI/CD Principles

CI/CD should prioritize:

- simplicity
- repeatability
- reliability
- fast feedback loops

The pipeline should:

- validate builds consistently
- support isolated frontend/backend deployment
- minimize manual deployment steps
- preserve deterministic build outputs

The CI/CD system should avoid:

- excessive environment fragmentation
- brittle deployment orchestration
- unnecessary deployment complexity

---

# 14. Scalability Philosophy

The project should support moderate scale while remaining operationally manageable.

Scalability priorities include:

- efficient frontend delivery
- scalable API hosting where required
- efficient replay and leaderboard persistence
- low-latency asset delivery

Scalability should evolve incrementally based on real usage patterns.

Premature optimization should be avoided.

---

# 15. Guiding Principle

See ARCHITECTURE.md §13.
