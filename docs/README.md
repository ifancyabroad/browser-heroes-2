# Documentation Map

This directory contains the concise source-of-truth docs for Browser Heroes 2.

The docs are written for contributors and AI agents working on the project. They should explain current behavior, stable intent, and ownership boundaries without becoming code mirrors.

These docs should:

- describe product intent, gameplay rules, architecture, UI direction, and runtime responsibilities
- distinguish current implementation from planned direction where that prevents confusion
- prefer conceptual flows over schemas, formulas, generated registries, or content inventories
- avoid duplicating guidance across files

## Core Docs

- [Product Requirements](PRD.md) - product vision, current playable loop, intended game shape, and scope priorities.
- [Game Rules](RULES.md) - player-facing run, progression, town, item, skill, feat, victory, and failure rules.
- [Combat](COMBAT.md) - combat actions, deterministic round resolution, damage, effects, tactics, combat end, and logging.
- [Balance](BALANCE.md) - comparative content baselines and thematic guidance for stats, dice, riders, skills, and items.
- [Architecture](ARCHITECTURE.md) - package ownership, state-transition authority, content generation boundaries, and app responsibilities.
- [Design](DESIGN.md) - UI direction, Tailwind usage, reusable components, layout rules, and presentation-layer constraints.
- [Infrastructure](INFRASTRUCTURE.md) - runtime stack, persistence, sessions, networking, deployment, and operations.
- [Deployment](DEPLOYMENT.md) - production artifact contracts and AWS deployment requirements.
- [Testing](TESTING.md) - durable test scope, test design guidance, and criteria for avoiding brittle or low-value coverage.

## Working Guidance

- [Agent Rules](../AGENTS.md) - contributor and AI agent rules for keeping changes simple, scoped, and maintainable.

## Documentation Style

Keep documentation stable by naming durable concepts rather than volatile implementation detail. It is fine to name packages, major flows, and authoritative boundaries. Avoid embedding exact schemas, model fields, generated file contents, tuning constants, or full content lists.

When a system is only partially implemented, use a short section-level note. Do not label every bullet as implemented or planned.
