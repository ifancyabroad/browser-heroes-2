# Browser Heroes 2 - Game Rules

## 1. Run Structure

A run is a self-contained sequence of combat encounters connected by town visits and progression choices.

A run ends when the player dies or manually completes the run after victory conditions are met.

## 2. Primary Game States

The game operates through two primary playable states:

- Town: preparation, recovery, shopping, and run decisions.
- Combat: turn-based encounter between the hero and one enemy.

State transitions are explicit:

- Town -> Combat
- Combat -> Town
- Combat -> Combat

After a victorious combat, the player may return to town or continue directly to the next encounter. Continuing increases the active gold multiplier. Returning to town resets it.

Town visits are optional between battles once combat has been won.

## 3. Hero and Build Rules

A hero represents the player's run identity.

Hero and build state may include:

- class identity
- level and XP
- gold
- current and maximum HP
- attributes
- proficiencies
- active skills
- passive feats
- equipped and carried items
- current run state

Heroes persist for the duration of a run only.

## 4. Progression Rules

XP and rewards are awarded after combat victories.

Level-ups may grant stat growth, skill choices, feat choices, or other build development depending on progression rules.

Every 10th encounter is a boss encounter. Defeating a boss unlocks the next zone.

Zones define broad enemy pools, difficulty progression, and run pacing.

## 5. Skills

Skills are active abilities used during combat.

Skills may deal damage, heal, apply temporary effects, impose conditions, or provide combat utility.

Skills can have ranks, limits, charges, or other usage rules where defined by their content and combat behavior.

Skills are replenished on town visits unless a skill explicitly defines a different per-encounter or per-run rule.

Detailed combat resolution for skills belongs in the Combat document.

## 6. Feats

Feats are passive build features.

Feats may provide permanent bonuses, modify combat values, add passive attack riders, or reinforce class and item synergies.

Feats are not selected as combat actions. Their impact should be reflected through clear state, readable outcomes, or combat logs.

## 7. Item Rules

Items modify hero capabilities during a run.

Items may:

- modify stats
- provide weapons or armour
- affect damage or mitigation
- interact with skills or feats
- provide consumable effects

Items may be acquired through town systems, boss rewards, ghost rewards, or other run rewards.

Items persist during a run but do not carry between runs unless a future meta system explicitly allows it.

## 8. Consumable Rules

Consumables provide limited-use recovery, combat, or utility effects.

Consumables are consumed on use and may be acquired through town or reward systems.

## 9. Town Rules

Town is the preparation and recovery layer between encounters.

In the client, town is presented as a top-down map used to interact with facilities and begin the next combat encounter.

Town may support:

- item shops
- rerolls
- rest or recovery
- consumable management
- run continuation decisions

Town contains no combat encounters.

## 10. Ghost Encounters

Standard combat slots may be replaced by ghost encounters where allowed.

A ghost encounter pits the player against a fallen player's hero snapshot using the same combat rules as standard encounters.

Boss encounters are not replaced by ghosts.

## 11. Meta Systems

Outside individual runs, the game may support:

- leaderboards
- run history
- hero inspection
- ghost records
- world activity events

Meta systems must not change deterministic run rules unless explicitly represented in run state.

## 12. Victory, Failure, and Endless Progression

Victory is achieved by defeating the final boss at battle 100.

After victory, the player may enter endless progression. Endless progression repeats the zone structure at higher difficulty tiers, increasing enemy and boss pressure through values such as level, resistance, and damage output.

Highest battle reached is tracked for leaderboard purposes.

Player death immediately ends the run.

## 13. Scope Boundaries

This document does not define:

- combat formulas
- turn resolution details
- exact enemy AI logic
- stat scaling formulas
- item generation algorithms
- infrastructure or persistence implementation
