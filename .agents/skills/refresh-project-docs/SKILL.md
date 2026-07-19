---
name: refresh-project-docs
description: Audit and update repository documentation against current code while preserving document ownership and concision. Use when asked to refresh, reconcile, audit, review, or bring project documentation up to date after code changes.
---

# Refresh Project Documentation

Bring the documentation in line with the current codebase without turning prose into a mirror of volatile implementation details.

## Ground the audit

1. Read the applicable `AGENTS.md`, the documentation map, and the documents in scope.
2. Inspect the working tree and preserve unrelated user changes.
3. Map relevant packages, entry points, schemas, selectors, services, routes, and UI surfaces.
4. Review recent history since the affected documents were last updated, but confirm every conclusion against current code rather than commit messages alone.
5. Resolve discoverable facts from the repository before asking questions.

## Classify discrepancies

Identify:

- claims about current behavior that are no longer true
- implemented behavior still described as planned or absent
- future direction accidentally presented as implemented
- details duplicated across documents
- content placed in a document that does not own that concern

Treat code as the source of truth for implemented behavior. Preserve explicit product direction unless current code or the user supersedes it.

## Respect document ownership

Route each concept to one primary document:

- `PRD.md`: product vision, priorities, high-level product status, and the playable loop
- `RULES.md`: player-facing run, progression, encounter, item, town, victory, failure, and meta-game rules
- `COMBAT.md`: combat actions, round resolution, damage, effects, tactics, combat end, and logging
- `ARCHITECTURE.md`: package ownership, authority boundaries, state and data flow, determinism, and projections
- `DESIGN.md`: durable visual identity, styling, components, layout, interaction, accessibility, and presentation boundaries
- `INFRASTRUCTURE.md`: runtime stack, persistence, networking, sessions, deployment, and operations
- root `README.md`: setup, workspace orientation, common commands, and documentation entry points
- `docs/README.md`: documentation map and documentation-writing policy
- `AGENTS.md`: durable contributor and agent rules

Summarize or link across documents only when the reader needs context. Do not repeat mechanics, feature inventories, endpoint lists, schemas, or implementation detail in multiple places.

## Edit concisely

- Prefer correcting, replacing, consolidating, or removing existing text before adding sections.
- Describe durable concepts and observable behavior rather than symbol inventories or tuning constants.
- Distinguish current behavior from future direction at the section level when needed.
- Keep each document within its stated scope.
- Preserve the repository's established tone and Markdown structure.
- Avoid changing source code, generated files, or public interfaces unless the user explicitly expands the task.

## Verify the refresh

1. Recheck every remaining `current`, `planned`, `future`, `placeholder`, and `not implemented` statement against its authoritative subsystem.
2. Search for stale terminology, removed states, and contradictory claims across all documentation.
3. Review the diff for duplicated concepts, scope drift, unnecessary growth, and unrelated changes.
4. Validate local Markdown links and run the repository's non-mutating Markdown formatting check.
5. Run `git diff --check` and confirm only intended documentation files changed.
6. Report the documents updated, important corrections, consolidation achieved, and verification performed.

Favor a smaller accurate documentation set over a larger exhaustive one.
