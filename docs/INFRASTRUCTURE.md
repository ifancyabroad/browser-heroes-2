# Browser Heroes 2 - Infrastructure Principles

## 1. Purpose

This document defines the operational, deployment, persistence, and runtime principles for Browser Heroes 2.

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

## 3. Runtime Model

The frontend, backend, engine, and content packages are developed in a pnpm workspace.

Gameplay logic must remain portable and environment-independent. The backend may validate and persist gameplay outcomes, but must not introduce gameplay divergence from the shared simulation.

## 4. Frontend Infrastructure

Frontend stack direction:

- React
- Vite
- Tailwind CSS
- Zustand
- TanStack Query

The frontend is responsible for rendering, user interaction, local orchestration, visual feedback, and client-side simulation execution where appropriate.

The web client does not use Phaser or another standalone game rendering engine. Town, combat, and meta-game screens should be implemented as React interfaces backed by shared engine state and selectors.

The frontend should prioritize responsiveness, fast loading, mobile compatibility, and low runtime overhead.

## 5. Backend Infrastructure

Backend stack direction:

- Node.js
- Express
- Mongoose
- Zod
- Socket.IO

Backend responsibilities may include:

- persistence
- leaderboards
- ghost systems
- world event broadcasting
- account systems
- replay storage
- validation of simulation outcomes

The backend should remain lightweight, operationally simple, and stateless where practical.

## 6. Database Principles

MongoDB is the primary persistence direction.

Persistence should support:

- flexible run storage
- replay persistence
- ghost reconstruction
- progression history
- event logging
- debugging and historical analysis

Stored data should preserve enough information to support deterministic replay and investigation.

## 7. Hosting and Deployment

Deployment direction:

- AWS infrastructure
- CloudFront CDN
- S3 frontend hosting
- Elastic Beanstalk API hosting
- CodeBuild and CodePipeline CI/CD

Deployment should prioritize operational familiarity, reliability, predictable releases, and low maintenance overhead.

Build artifacts should be repeatable and environment-specific configuration should stay explicit.

## 8. Offline Support

Offline capability is a desirable architectural property.

Infrastructure should preserve the ability to:

- run gameplay locally
- save runs locally
- replay runs offline
- synchronize progression later where practical

The simulation engine should not require persistent server connectivity.

## 9. Networking Principles

Browser Heroes 2 is not a real-time multiplayer game.

Networking exists primarily for:

- ghost synchronization
- leaderboard updates
- world event broadcasting
- account persistence
- asynchronous social presence

Socket.IO should primarily support lightweight event delivery and social/world activity broadcasting.

The networking model should avoid:

- real-time combat synchronization
- lockstep multiplayer systems
- latency-sensitive gameplay mechanics

## 10. Authentication Principles

Authentication model:

- anonymous guest-first accounts
- optional account creation

The system should support frictionless onboarding, temporary guest progression, optional account linking, and progression persistence upgrades.

Gameplay should remain accessible without mandatory account creation.

## 11. CI/CD Principles

CI/CD should prioritize simplicity, repeatability, reliability, and fast feedback loops.

The pipeline should:

- validate builds consistently
- support isolated frontend and backend deployment
- minimize manual deployment steps
- preserve deterministic build outputs

The CI/CD system should avoid excessive environment fragmentation and brittle deployment orchestration.

## 12. Scalability Philosophy

The project should support moderate scale while remaining operationally manageable.

Scalability priorities include efficient frontend delivery, scalable API hosting where required, efficient replay and leaderboard persistence, and low-latency asset delivery.

Scalability should evolve incrementally based on real usage patterns.

## 13. Guiding Principle

Infrastructure should make the game easier to run, deploy, observe, and maintain. If an infrastructure choice adds operational burden without a clear need, prefer the simpler option.
