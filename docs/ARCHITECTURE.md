# Browser Heroes 2 - Architecture

## 1. Purpose

This document defines system ownership and boundaries for Browser Heroes 2.

It covers architecture only. Product intent, player-facing rules, combat behavior, UI design, and operational infrastructure belong in their own documents.

Browser Heroes 2 uses a deterministic, framework-agnostic gameplay core with explicit serializable state and deliberately simple package boundaries.

## 2. Workspace Ownership

The project is a pnpm workspace with apps and packages that have distinct responsibilities.

- `packages/engine` owns deterministic run state, action validation/application, combat transitions, progression, reward choices, town transitions, town shop actions, consumables, serialization, and selectors.
- `packages/content` owns declarative game definitions, including authored system ghosts, item bases and affixes, content schemas/builders, generated IDs, generated registries, manifests, and content reference validation.
- `packages/shared` owns contracts shared by the web app and API, such as request/response shapes and socket payload contracts that are not gameplay rules.
- `apps/web` owns presentation, user interaction, client orchestration, query/socket integration, and rendering projected engine state.
- `apps/api` owns sessions, persistence, backend orchestration, action submission, validation, run/action storage, external encounter selection, and allowlisted aggregate metrics.
- `apps/admin` owns the internal, read-only metrics dashboard served under `/admin`; it consumes anonymous aggregate contracts and does not access persistence directly.
- `apps/content-studio` owns local, read-only review of generated content registries; TypeScript content definitions remain authoritative.

Cross-package dependencies should remain deliberate and acyclic. Gameplay authority belongs in the engine and content packages, not in app-specific code.

## 3. Simulation Layer

The simulation layer is the gameplay source of truth.

It owns:

- creating initial run state
- validating engine actions
- applying state transitions
- resolving combat rounds
- resolving player skill actions and active combat effects
- applying rewards, reward choices, and level-ups
- resolving town actions such as shop purchases, rest, rerolls, and consumable purchases
- managing town, combat, death, and retirement phases
- serializing and deserializing run state
- projecting state through selectors for callers

The simulation layer must remain framework-agnostic. It must not depend on React, Express, Mongoose, Socket.IO, browser APIs, rendering, persistence, networking, or runtime timing.

## 4. Content Layer

The content layer owns authored game definitions and generated lookup surfaces.

It includes classes, enemies, fixed items, item bases, item affixes, skills, feats, and supporting content types. Authored content is validated through builders and schemas, then collected into generated IDs, registries, and manifests.

System ghost builds are authored content. The engine materializes them into deterministic combat-ready snapshots, while the API decides when they substitute for an empty frozen player-ghost pool.

The engine owns runtime item instances. An instance either references a fixed item or carries a generated definition assembled from content-owned bases and affixes through seeded engine rules. This keeps authored data reusable while preserving the exact equipment acquired during a run.

Generated registries support lookup, type safety, and stable content imports. Documentation should describe this workflow, not duplicate generated contents.

Reference validation should catch broken content links where practical. Content should remain readable, versionable, and reusable across engine, web, and API systems.

## 5. Application and Presentation Layers

The application layer coordinates runtime systems around the simulation.

The API currently:

- creates and loads runs
- stores full engine-owned run snapshots
- records submitted actions in sequence
- applies actions through the shared engine
- resolves external encounter candidates, including player and system ghosts, into explicit engine inputs
- derives lightweight summaries for querying and display
- evaluates account achievements from engine state transitions and structured events
- creates UTC daily challenges and serves their persisted leaderboards, all-time Hall of Fame rankings, and personal hero and ghost history
- exposes REST and socket-based action submission paths

The web app currently:

- creates guest sessions when needed
- creates heroes and runs
- displays town, combat, dead, and retired states
- submits player intent to the backend
- renders engine selectors and shared content
- shows reward choices, level-up choices, town shop state, equipment replacement previews, and hero state
- displays achievements, daily challenges, their historical leaderboards, all-time Hall of Fame rankings, and personal hero and ghost history from shared contracts and persisted data

The presentation layer may display simulation state and collect player intent. It must not calculate gameplay outcomes or directly mutate authoritative run state.

## 6. Determinism and State

Game state is explicit serializable data.

The following rules must hold:

- identical state plus identical input produces identical outcome
- engine randomness derives from the run seed
- combat outcomes consume the run's sequential RNG state, while scheduled opportunities such as
  enemies, level-up offers, rewards, and shops use independent context-derived RNG streams
- context-derived streams use stable run positions such as battle, level, reroll, and slot so
  decision-dependent combat rolls cannot shift later opportunities
- externally selected data is passed into the engine as explicit input and recorded with the action
- ghost encounter selection uses the run seed, battle context, and a stable cutoff derived from run metadata so later ghosts cannot change an existing run
- runtime timing does not affect gameplay results
- no hidden global state influences simulation outcomes
- state transitions remain traceable

The entire run should always be representable as a snapshot. Save/load parity, replay investigation, server-side validation, and combat reconstruction should all build from that same explicit state model.

Run position is explicit in serialized state: battle number, cumulative zone number, and endless cycle advance together through engine-owned transitions. The repeating authored zone identity is derived from the cumulative zone number.

## 7. Selectors and Projections

Selectors are the boundary between authoritative state and UI-friendly views.

Selectors may derive hero stats, combat views, progression state, reward choice views, town views, equipment replacement previews, and available actions. UI code should prefer selectors and shared content lookups over recalculating gameplay logic.

Projection code in the API may derive summaries for persistence and responses, but those summaries are not authoritative gameplay data.

## 8. Testing

Testing should prioritize deterministic simulation correctness, action validation, serialization safety, replayability, and stable package boundaries.

Preferred tests are targeted, lightweight, and close to the behavior they protect.

UI tests should focus on rendering, interaction, and error boundaries. They should not duplicate engine rule tests.

## 9. Non-Goals

The architecture is not intended to optimize for:

- MMO-scale multiplayer
- microservice-heavy infrastructure
- enterprise abstraction layers
- highly distributed systems
- framework-driven gameplay systems
- schema documentation inside prose docs

The guiding principle is simple: if a system becomes difficult to reason about or explain, prefer the simpler design.
