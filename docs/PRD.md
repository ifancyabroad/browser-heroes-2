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
- long-term replayability through content variety and asynchronous meta systems

## 2. Current Playable Loop

The current implementation supports the complete run loop:

1. Start a guest session.
2. Create a hero by choosing a class and name.
3. Start battle 1 combat.
4. Resolve combat through attacks, skills, consumables, and readable active effects.
5. Earn XP and gold after victory.
6. Select a boss reward when offered.
7. Complete pending level-up choices when offered.
8. Continue directly to the next combat or return to town.
9. Buy equipment or healing potions, rest, reroll the shop, swap equipped weapons, or inspect the hero in town.
10. Defeat the final boss and either retire victorious or continue into endless progression.
11. End the run through victorious retirement or player death.

After victories, town acts as an optional run checkpoint, shop, recovery point, and launch point for the next combat.

## 3. Run Structure

The run is a 100-battle ladder across zones, with a boss encounter every 10 battles. Players develop their build through rewards, equipment, skills, and feats as the encounters become more dangerous.

After defeating the final boss at battle 100, the player may retire victorious or repeat the authored zone ladder while enemy levels and endless pressure continue increasing.

## 4. Core Systems

Detailed player-facing rules belong in `RULES.md`. Combat-specific behavior belongs in `COMBAT.md`.

### 4.1 Hero and Build System

A hero combines a distinct class identity with run-specific progression and equipment.

Classes should establish identity and starting direction, while skills, feats, equipment, and level-up offers allow each run to branch.

Build decisions should be expressive without requiring players to manage large build trees during fast runs.

### 4.2 Combat System

Combat is deterministic, turn-based, and resolved between the player hero and a single enemy.

The intended combat feel is fast tactical RPG combat: basic attacks stay simple, while skills, active effects, items, conditions, and enemy behaviors add readable choices over time.

### 4.3 Progression System

Players earn XP and gold from victories, choose rewards after bosses, and develop through curated skill and feat offers. Limited level-up rerolls provide control without replacing seeded progression.

Progression should reward continuing a run while making risk visible. Returning to town should be a meaningful pacing and safety decision rather than a purely cosmetic step.

### 4.4 Content System

The game uses shared declarative content for classes, enemies, items, skills, feats, and related build options.

Content should support variety and synergy without moving gameplay authority into UI or backend-only code.

### 4.5 Town System

Town is a strategic checkpoint between fights.

Town provides shopping, recovery, equipment management, and the choice to begin the next encounter. It may deepen preparation choices without moving gameplay authority into the UI.

### 4.6 Meta Systems

Daily Challenges provide the fair public competitive mode: one attempt per identity on a shared UTC-date seed, class, opportunity schedule, and ghost pool, with historical leaderboards. The Hall of Fame separately recognizes all-time hero accomplishments across normal and Daily Challenge runs, and the most successful player ghosts, without implying equal run conditions.

Ghost encounters, achievements, and personal hero and ghost history add asynchronous variety and goals around both run modes. Achievement progress belongs to the user across heroes and is available to guests as well as registered accounts. Broader world activity remains future direction.

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
