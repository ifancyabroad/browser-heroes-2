# Browser Heroes 2 — Architecture Principles

---

# 1. Purpose

This document defines the architectural constraints and system boundaries that govern Browser Heroes 2.

Its goals are to:

- preserve maintainability
- prevent architectural drift
- support deterministic simulation
- guide AI-assisted development
- reduce unnecessary complexity

This document defines architectural principles, not implementation details.

---

# 2. Core Architectural Philosophy

Browser Heroes 2 is built around a deterministic simulation core capable of running:

- client-side
- server-side
- offline

The simulation layer is the primary source of gameplay truth.

Presentation, persistence, networking, and tooling are secondary systems built around the simulation.

The architecture prioritizes:

- simplicity
- determinism
- modularity
- readability
- portability

The architecture avoids:

- premature abstraction
- tightly coupled systems
- hidden state mutation
- unnecessary framework complexity
- AI-generated architectural sprawl

---

# 3. System Layers

---

## 3.1 Simulation Layer

The simulation layer contains:

- combat resolution
- progression systems
- hero systems
- enemy systems
- item systems
- deterministic state transitions

The simulation layer:

- must not depend on UI
- must not depend on networking
- must not depend on persistence systems
- must not depend on rendering systems
- must avoid side-effect-driven logic

The simulation layer must remain executable:

- client-side
- server-side
- offline

---

## 3.2 Application Layer

The application layer coordinates systems around the simulation.

Responsibilities include:

- session flow
- save/load orchestration
- networking coordination
- runtime orchestration
- event broadcasting
- input coordination

The application layer must not contain gameplay rules.

---

## 3.3 Presentation Layer

The presentation layer is responsible for:

- rendering
- user interaction
- animations
- visual feedback
- responsive layout

The presentation layer:

- must never calculate gameplay outcomes
- must never directly mutate simulation state
- must only display or request state transitions

UI is a projection of simulation state.

---

# 4. Deterministic Simulation Rules

The simulation must support:

- deterministic replay
- offline execution
- server-side validation
- combat reconstruction
- reproducible runs
- save/load parity

The following rules must always hold true:

- identical state + identical input = identical outcome
- all randomness derives from seeded generators
- gameplay outcomes must not depend on runtime timing
- no hidden runtime state may influence simulation outcomes

---

# 5. State Management Principles

Game state is treated as explicit serializable data.

The architecture avoids:

- hidden mutable global state
- implicit cross-system mutation
- gameplay singletons
- UI-owned gameplay state

State transitions should remain:

- explicit
- traceable
- serializable
- replayable

The complete game state should always be representable as a snapshot.

---

# 6. Content Architecture

Gameplay content should remain data-driven where practical.

Examples include:

- hero definitions
- enemy definitions
- item definitions
- skill definitions
- loot tables
- encounter pools

Content should:

- remain declarative
- remain human-readable
- remain versionable
- be reusable across frontend and backend systems

Gameplay behavior should not be tightly coupled to UI implementation.

---

# 7. Related Documents

- Persistence implementation details: see INFRASTRUCTURE.md §8
- Networking implementation details: see INFRASTRUCTURE.md §11
- AI development principles: see AGENTS.md

---

# 8. Complexity Management

Avoiding overengineering is a primary architectural goal.

New abstractions should only be introduced when they:

- reduce meaningful duplication
- improve maintainability
- improve extensibility
- improve readability

The architecture should prefer:

- directness over indirection
- understandable systems over theoretical purity
- stable patterns over experimental patterns

Premature scalability concerns should not override simplicity.

---

# 9. Testing Philosophy

Testing should focus primarily on:

- deterministic simulation correctness
- replay integrity
- gameplay stability

The preferred testing strategy is:

- targeted simulation tests
- lightweight validation
- replay verification where valuable

Testing systems should remain lightweight and maintainable.

---

# 10. UI Principles

The UI should remain:

- minimal
- responsive
- information-dense
- mobile-compatible
- fast to navigate

Visual complexity should never obscure gameplay clarity.

The architecture should support:

- desktop play
- mobile play
- progressive enhancement
- low-overhead rendering

---

# 11. Modularity Principles

Gameplay systems should remain modular and replaceable.

Examples include:

- isolated enemy AI behaviors
- independently definable skills
- composable item modifiers
- data-driven content systems

Systems should communicate through:

- explicit inputs
- explicit outputs
- state transitions
- event flows

Implicit cross-system dependencies should be avoided.

---

# 12. Non-Goals

The architecture is not intended to optimize for:

- MMO-scale multiplayer
- microservice-heavy infrastructure
- enterprise abstraction layers
- highly distributed systems
- framework-driven complexity

The project instead prioritizes:

- maintainability
- clarity
- extensibility
- deterministic correctness
- sustainable solo or small-team development

---

# 13. Guiding Principle

The architecture should remain understandable by a single developer.

If a system becomes difficult to reason about, replay mentally, or explain simply, the simpler solution should generally be preferred.
