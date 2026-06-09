# Documentation Map

This directory contains the concise source-of-truth docs for Browser Heroes 2. Each document has a dedicated purpose; avoid copying the same guidance across multiple docs.

These docs should explain intent, boundaries, and stable rules. They should not become schema references, generated content inventories, or line-by-line descriptions of code.

## Core Docs

- [Product Requirements](PRD.md) - product vision, core loop, design goals, and scope boundaries.
- [Architecture](ARCHITECTURE.md) - system ownership, package boundaries, deterministic simulation constraints, and state principles.
- [Game Rules](RULES.md) - player-facing run, progression, town, skill, feat, item, and completion rules.
- [Combat](COMBAT.md) - combat model, turn resolution principles, dice direction, and combat-specific behavior.
- [Infrastructure](INFRASTRUCTURE.md) - runtime, persistence, networking, deployment, auth, offline, and operational principles.

## Working Guidance

- [Agent Rules](../AGENTS.md) - contributor and AI agent rules for keeping changes simple, scoped, and maintainable.
