# Browser Heroes 2 - Game Rules

## 1. Run Structure

A run is a self-contained sequence of combat encounters connected by town visits and progression choices.

A run begins on day 1. Each successful rest advances the run by one day. Day progression and rest-price escalation are cumulative for the full run and do not reset when the hero returns to town.

The current run flow supports town, combat, victory rewards, boss reward choices, level-up choices, continuing to the next combat, returning to town, and death.

The intended full run is a 100-battle ladder. Every 10th battle is a boss encounter. Defeating the final boss at battle 100 is the intended victory condition. Optional endless progression is planned after victory.

## 2. Primary Game States

The game currently operates through explicit run phases:

- Town: the between-combat checkpoint for shopping, resting, rerolling shop inventory, inspecting the hero, and entering combat.
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

Boss victories can create a pending reward choice. Current boss reward choices contain two eligible equipment options and one gold option. The player must select one pending boss reward before normal run actions continue.

Level-ups are triggered by XP thresholds. When a level-up is pending, the player must complete it before normal run actions continue.

Level-up choices are intended to stay curated: the player should choose from a small set of relevant skill or feat options rather than manage a large open tree during the run.

## 6. Skills

Skills are active abilities owned by heroes, enemies, or other combatants.

Current state: heroes can start with skills, gain new skills through level-up choices, and use available skills during active combat. Skill actions are engine-validated and are unavailable when the hero is silenced. A stunned hero cannot act and may only skip the turn.

Implemented skill effects may:

- deal damage
- heal
- apply temporary effects
- impose conditions
- use charges or other explicit limits

Supported active effects include temporary stat, damage, damage-taken, and damage-affinity modifiers; statuses; shields; damage over time; and healing over time. `removeStatus` exists in content schemas and display formatting, but its engine resolution is not implemented yet.

Enemy skill ownership exists in content/state, but enemy combat behavior currently uses deterministic basic attacks rather than enemy skill selection.

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

Current state: equipment can be part of hero state and can affect derived combat values. Starting equipment, shop equipment, and boss reward equipment are available through shared content and engine-owned selection/equip logic.

Items can be acquired from town shops and boss reward choices. When an item can occupy multiple valid slots, the selected equipment slot is explicit. Equipment replacement is handled by the engine and projected to the UI for preview.

Items may:

- provide weapons or armour
- modify stats
- affect damage or mitigation
- interact with skills or feats
- provide consumable effects

Items persist during a run but do not carry between runs unless a future meta system explicitly allows it.

Healing potions are represented in hero state. The engine supports using healing potions during combat and buying them in town up to the configured maximum; the town purchase UI may lag behind the engine surface while that flow is completed.

## 9. Town Rules

Town is a strategic checkpoint between encounters.

Current state: town allows the player to inspect the hero, enter combat, buy generated shop equipment, rest to full HP, and reroll the shop.

Town state includes:

- generated shop slots with item IDs, prices, and purchased state
- shop level derived from the current zone
- rest cost and rest count
- reroll cost and reroll count
- healing potion cost for engine-supported consumable purchases

Town pricing is engine-owned. Current costs are affected by the hero's charisma modifier through a town discount multiplier. Rest costs increase with each rest across the full run. Reroll costs increase with repeated use during the current town visit.

Returning to town after a victory creates fresh town state for the current run position and resets the active streak and town-local reroll count. It does not reset the current day or rest-price escalation. Continuing directly to the next combat preserves momentum and increases the streak.

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
