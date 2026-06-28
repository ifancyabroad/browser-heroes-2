# Browser Heroes 2 - Product Requirements

## 1. Vision

Browser Heroes 2 is a browser roguelike RPG built around fast, repeatable runs of deterministic turn-based combat.

Players create a hero, push through a sequence of encounters, develop a flexible build through class identity, skills, feats, and equipment, and decide when to press forward or return to town.

The game should feel like a retro fantasy RPG: readable, compact, quick to understand, and punishing enough that choices matter.

The product emphasizes:

- fast tactical combat
- short decision cycles
- flexible class-based builds
- curated level-up choices
- strategic town checkpoints
- deterministic outcomes from seeded randomness
- readable failure and victory states
- long-term replayability through content variety and later meta systems

## 2. Current Playable Loop

The current implementation supports the core skeleton of a run:

1. Start a guest session.
2. Create a hero by choosing a class and name.
3. Enter town.
4. Start combat from town.
5. Resolve combat through basic attacks.
6. Earn rewards after victory.
7. Complete pending level-up choices when offered.
8. Continue directly to the next combat or return to town.
9. End the run on player death.

Town currently acts as a run checkpoint and launch point. More town decisions are planned.

Combat currently focuses on basic attack rounds. Active skill use, consumables, richer enemy behavior, and deeper effect timing are planned or scaffolded, but are not the primary playable surface yet.

## 3. Intended Full Loop

The intended full run remains a 100-battle ladder across zones, with a boss encounter every 10 battles.

The long-term loop is:

1. Create a hero.
2. Prepare in town.
3. Enter combat.
4. Defeat sequential enemies.
5. Face a boss every 10th battle.
6. Unlock or advance through zone pressure after boss milestones.
7. Develop a build through rewards, equipment, skills, and feats.
8. Defeat the final boss at battle 100.
9. Continue into optional endless progression or end the run.

Endless progression is part of the product vision, but should not be treated as current playable behavior until implemented.

## 4. Core Systems

Detailed player-facing rules belong in `RULES.md`. Combat-specific behavior belongs in `COMBAT.md`.

### 4.1 Hero and Build System

Heroes have class identity, attributes, proficiencies, active skills, passive feats, equipment, level, XP, health, gold, and run-specific state.

Classes should establish identity and starting direction, while skills, feats, equipment, and level-up offers allow each run to branch.

Build decisions should be expressive without requiring players to manage large build trees during fast runs.

### 4.2 Combat System

Combat is deterministic, turn-based, and resolved between the player hero and a single enemy.

The intended combat feel is fast tactical RPG combat: basic attacks stay simple, while skills, items, conditions, and enemy behaviors add readable choices over time.

### 4.3 Progression System

Players earn XP and gold from combat victories. Level-ups may offer a small curated set of skill or feat options.

Progression should reward continuing a run while making risk visible. Returning to town should be a meaningful pacing and safety decision rather than a purely cosmetic step.

### 4.4 Content System

The game uses shared declarative content for classes, enemies, items, skills, feats, and related build options.

Content should support variety and synergy without moving gameplay authority into UI or backend-only code.

### 4.5 Town System

Town is intended to be a strategic checkpoint between fights.

Planned town responsibilities include shops, recovery, rerolls, consumable management, equipment decisions, and run continuation choices. The current implementation exposes a minimal town surface while this layer grows.

### 4.6 Meta Systems

Ghosts, leaderboards, run history, hero inspection, and world activity are important later systems. They should support replayability and asynchronous social presence, but they are secondary to the core run and combat loop today.

Meta systems must not override deterministic run rules unless their effects are represented explicitly in run state.

## 5. Design Goals

- Runs should be quick to start and easy to repeat.
- Combat should remain readable even when builds become more complex.
- Choices should be meaningful without becoming slow or opaque.
- Randomness should create variation while remaining deterministic and replayable.
- Death should feel fair, explainable, and consequential.
- The UI should remain compact, responsive, and information-dense.
- The project should remain maintainable by one developer.

## 6. Scope Boundaries

This document does not define:

- exact combat formulas
- exact stat scaling
- exact content schemas
- item generation algorithms
- route or database shapes
- deployment implementation
- detailed UI component APIs
