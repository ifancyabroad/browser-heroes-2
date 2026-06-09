# Browser Heroes 2 - Architecture Principles

## 1. Purpose

This document defines the system boundaries and ownership rules that keep Browser Heroes 2 maintainable.

It covers architecture only. Product goals, player-facing rules, combat behavior, and operational infrastructure belong in their own documents.

## 2. Architectural Philosophy

Browser Heroes 2 is built around a deterministic shared gameplay core that can run client-side, server-side, and offline.

The architecture prioritizes:

- simplicity
- determinism
- explicit state transitions
- reusable shared gameplay logic
- clear package boundaries
- small systems that remain understandable by one developer

The architecture avoids:

- duplicated gameplay rules
- hidden mutable state
- UI-owned gameplay outcomes
- backend-only gameplay divergence
- speculative abstraction

## 3. System Layers

### 3.1 Simulation Layer

The simulation layer is the gameplay source of truth.

It owns:

- action validation and application
- deterministic combat transitions
- progression and town transitions
- run state serialization boundaries
- selectors that project simulation state for callers

The simulation layer must remain framework-agnostic and must not depend on UI, rendering, persistence, networking, or runtime timing.

### 3.2 Content Layer

The content layer owns declarative game definitions and generated registries.

It contains the stable game content surface used by the engine and apps, including classes, enemies, items, skills, and feats.

Content should remain:

- data-driven where practical
- human-readable
- versionable
- reusable across frontend and backend systems

Generated registries may support lookup and type safety, but docs should not duplicate their contents.

### 3.3 Application Layer

The application layer coordinates systems around the simulation.

It may handle:

- session flow
- save/load orchestration
- networking coordination
- runtime orchestration
- input coordination

The application layer must not contain gameplay rules.

### 3.4 Presentation Layer

The presentation layer renders and gathers player intent.

It owns:

- rendering
- user interaction
- animations
- visual feedback
- responsive layout

The presentation layer must display simulation state or request state transitions. It must not calculate gameplay outcomes or directly mutate simulation state.

## 4. Package Boundaries

Workspace packages should have explicit responsibilities:

- `packages/engine` owns deterministic gameplay state transitions and projections.
- `packages/content` owns declarative content definitions and generated registries.
- `packages/shared` owns app/API shared contracts that are not gameplay rules.
- `apps/web` presents the game and sends player intent to shared systems.
- `apps/api` persists, validates, and exposes backend services without duplicating gameplay logic.

Cross-package dependencies should remain deliberate, minimal, and acyclic.

## 5. Determinism and State

Game state is explicit serializable data.

The following rules must hold:

- identical state plus identical input produces identical outcome
- randomness derives from seeded generators
- runtime timing does not affect gameplay results
- no hidden global state influences simulation outcomes
- state transitions remain traceable and replayable

The complete run should always be representable as a snapshot. Save/load parity, replay verification, server-side validation, and combat reconstruction should all build from that same explicit state model.

## 6. Modularity Principles

Gameplay systems should communicate through explicit inputs, outputs, state transitions, and events.

New abstractions should only be introduced when they reduce meaningful duplication, improve readability, or clarify ownership. Prefer plain functions and direct data flow where practical.

## 7. Testing Philosophy

Testing should prioritize deterministic simulation correctness, replay safety, and stable gameplay transitions.

Preferred tests are targeted, lightweight, and close to the behavior they protect.

## 8. Non-Goals

The architecture is not intended to optimize for:

- MMO-scale multiplayer
- microservice-heavy infrastructure
- enterprise abstraction layers
- highly distributed systems
- framework-driven gameplay systems

The guiding principle is simple: if a system becomes difficult to reason about or explain, prefer the simpler design.
