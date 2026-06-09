# Browser Heroes 2 - Product Requirements

## 1. Vision

Browser Heroes 2 is a free-to-play browser roguelike RPG built around fast, repeatable runs of turn-based combat progression.

Players create a hero, develop a build through items, active skills, and passive feats, and advance through increasingly difficult zones.

The game emphasizes:

- short replayable runs
- emergent build combinations
- deterministic turn-based combat
- high run-to-run variability
- low onboarding friction
- long-term replayability

## 2. Core Gameplay Loop

1. Create a hero.
2. Enter town.
3. Prepare through shops, recovery, and consumables.
4. Enter combat.
5. Defeat sequential enemies.
6. Face a boss every 10th battle.
7. Unlock the next zone after each boss.
8. Defeat the final boss at battle 100.
9. Continue into endless progression or end the run.

## 3. Core Systems

Detailed player-facing rules are defined in `RULES.md`.

### 3.1 Hero and Build System

Heroes have class identity, attributes, proficiencies, active skills, passive feats, equipment, level, XP, and run-specific resources.

### 3.2 Combat System

Combat is deterministic, turn-based, and resolved between the player hero and a single enemy. See `COMBAT.md`.

### 3.3 Progression System

Players earn rewards from victories, level up, develop their build, and advance through increasingly difficult zones.

### 3.4 Content System

The game uses shared declarative content for classes, enemies, items, skills, feats, and related build options. Content should support broad build variety without moving gameplay authority into UI or backend-only code.

### 3.5 Town System

Town is the between-combat preparation layer for shopping, recovery, consumables, rerolls, and run decisions.

### 3.6 Meta Systems

Leaderboards, run history, hero inspection, ghost encounters, and world activity provide social and replayability layers outside individual runs.

## 4. Design Goals

- Runs should be fast and replayable.
- Build variety should emerge through items, skills, feats, and class identity.
- Combat should remain readable and low-friction.
- Randomness should create meaningful variation while remaining deterministic.
- The game should support both casual and optimization-focused playstyles.
- The UI should remain minimal, responsive, and information-dense.

## 5. Win and Failure Conditions

Victory is achieved by defeating the final boss at battle 100. Player death ends the run immediately. Endless progression is available after victory.

See `RULES.md` for run completion rules.

## 6. Scope Boundaries

This document does not define:

- combat formulas
- stat scaling
- exact content schemas
- item generation algorithms
- technical architecture
- infrastructure
- database design
- UI implementation details
