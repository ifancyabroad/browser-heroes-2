# Browser Heroes 2 - Game Rules

## 1. Run Structure

A run is a self-contained sequence of combat encounters connected by town visits and progression choices.

The current run flow supports town, combat, victory rewards, level-up choices, continuing to the next combat, returning to town, and death.

The intended full run is a 100-battle ladder. Every 10th battle is a boss encounter. Defeating the final boss at battle 100 is the intended victory condition. Optional endless progression is planned after victory.

## 2. Primary Game States

The game currently operates through explicit run phases:

- Town: the between-combat checkpoint and current entry point into combat.
- Combat: a turn-based encounter between the hero and one enemy.
- Dead: the run has ended after player defeat.
- Complete: reserved for run victory.

State transitions are explicit and engine-owned:

- Town -> Combat
- Combat -> Combat
- Combat -> Town
- Combat -> Dead
- Combat -> Complete, when victory conditions are implemented

After a victorious combat, the player may continue directly to the next combat or return to town. Continuing preserves and increases run momentum through the active streak. Returning to town resets that streak.

## 3. Hero and Build Rules

A hero represents the player's run identity.

Hero and build state includes:

- class identity
- level and XP
- current and maximum HP
- attributes and proficiencies
- active skills
- passive feats
- equipment
- gold and run progress

Classes set the hero's starting direction. Skills, feats, and equipment should let each run branch into flexible builds.

Heroes currently persist for the duration of a run. Long-term account or meta progression must be introduced explicitly and must not be hidden inside run rules.

## 4. Encounters and Zones

Combat encounters select enemies from the current zone and encounter type.

Every 10th battle is a boss encounter. Non-boss battles are standard encounters.

Zones define broad enemy pools, run pacing, and difficulty identity. The intended full game progresses through a fixed zone ladder toward battle 100. Endless progression should reuse or extend this structure at higher pressure once implemented.

## 5. Progression and Rewards

Victorious combat awards XP and gold.

Gold rewards are affected by the current streak. Continuing directly to the next combat increases the streak; returning to town resets it.

Level-ups are triggered by XP thresholds. When a level-up is pending, the player must complete it before normal run actions continue.

Level-up choices are intended to stay curated: the player should choose from a small set of relevant skill or feat options rather than manage a large open tree during the run.

## 6. Skills

Skills are active abilities owned by heroes, enemies, or other combatants.

Current state: heroes can start with skills and gain or rank skills through level-up choices. Direct player skill use in combat is planned/scaffolded and should not be documented as current playable behavior.

Skills may eventually:

- deal damage
- heal
- apply temporary effects
- impose conditions
- create utility effects
- use charges, ranks, or other limits

Detailed skill resolution belongs in `COMBAT.md`.

## 7. Feats

Feats are passive build features.

Current state: feats can be part of class identity and can be gained through level-up choices where eligible.

Feats may:

- modify attributes or combat values
- modify damage or affinities
- improve survivability or utility
- reinforce class, skill, item, or build identity

Feats are not selected as combat actions. Their impact should appear through derived state, readable outcomes, or combat logs.

## 8. Item and Equipment Rules

Items modify hero capabilities during a run.

Current state: equipment can be part of hero state and can affect derived combat values. Starting equipment and item definitions are available through shared content.

Planned item and town systems include acquiring items, buying from shops, rerolling shops, using consumables, and making richer equipment decisions during town visits.

Items may:

- provide weapons or armour
- modify stats
- affect damage or mitigation
- interact with skills or feats
- provide consumable effects

Items persist during a run but do not carry between runs unless a future meta system explicitly allows it.

## 9. Town Rules

Town is intended to be a strategic checkpoint between encounters.

Current state: town allows the player to inspect the hero and enter combat.

Planned town behavior includes:

- item shops
- rest or recovery
- shop rerolls
- consumable management
- equipment decisions
- continue-or-reset risk pacing

Town should not contain combat encounters. It may prepare, recover, or redirect the run, but combat outcomes remain engine-owned.

## 10. Death, Victory, and Endless Progression

Player death immediately ends the run.

The intended victory condition is defeating the final boss at battle 100. The complete run phase exists for this direction, but the surrounding victory and endless systems should be treated as planned until implemented.

Endless progression should continue after victory at higher pressure while preserving deterministic run rules.

## 11. Meta Systems

Ghost encounters, leaderboards, run history, hero inspection, and world activity are planned later systems.

These systems should support replayability and asynchronous social presence. They must not alter deterministic run behavior unless their effects are represented explicitly in run state.

Ghost encounters should use the same combat rules as standard encounters when implemented. Boss encounters should not be replaced by ghosts unless a future rule explicitly changes that.

## 12. Scope Boundaries

This document does not define:

- exact combat formulas
- exact stat scaling
- exact enemy AI logic
- content schemas
- generated registries
- item generation algorithms
- infrastructure or persistence details
