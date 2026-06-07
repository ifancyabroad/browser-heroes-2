# Browser Heroes 2 — Contributor & AI Agent Rules

## Project Docs

Consult the relevant docs before changing related systems:

- [Architecture](docs/ARCHITECTURE.md)
- [Combat](docs/COMBAT.md)
- [Infrastructure](docs/INFRASTRUCTURE.md)
- [Product Requirements](docs/PRD.md)
- [Game Rules](docs/RULES.md)

---

## Core Principles

- Prefer simple solutions over unnecessary abstraction
- Follow DRY (Don't Repeat Yourself)
- Follow Single Responsibility Principle
- Prioritize modularity and maintainability
- Build scalable systems without premature optimization
- Prefer explicitness over hidden behavior
- Prefer composition over inheritance
- Ask for clarification rather than guessing

---

## Architecture Rules

- Shared simulation logic is the gameplay source of truth
- Gameplay logic belongs in shared engine packages
- UI must never calculate gameplay outcomes
- Frontend and backend must not duplicate gameplay logic
- Shared engine code must remain framework-agnostic
- State transitions should remain explicit and serializable

---

## AI Development Rules

AI-generated code should:

- remain narrowly scoped
- avoid speculative abstraction
- avoid unnecessary indirection
- avoid overengineering
- avoid introducing services/managers without justification
- keep modules focused and reasonably small
- prefer plain functions where practical

If a simpler solution works, prefer it.

---

## Repository Rules

- Keep package boundaries explicit
- Avoid circular dependencies
- Avoid hidden mutable state
- Avoid large multi-purpose modules
- Prefer explicit inputs and outputs
- Preserve deterministic behavior

---

## Guiding Principle

The project should remain understandable and maintainable by a single developer.

If a solution increases complexity without clear long-term value, the simpler solution should generally be preferred.
