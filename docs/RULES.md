# Browser Heroes 2 - Game Rules

## 1. Run Structure

A run is a self-contained sequence of combat encounters connected by town visits and progression choices.

A run begins on day 1. Each successful rest advances the run by one day. Day progression and rest-price escalation are cumulative for the full run and do not reset when the hero returns to town.

The run flow supports town, combat, victory rewards, boss reward choices, level-up choices, continuing to the next combat, returning to town, death, and victorious retirement.

The main run is a 100-battle ladder. Every 10th battle is a boss encounter. Defeating the final boss at battle 100 unlocks the choice to retire victorious or continue into endless progression.

## 2. Primary Game States

The game currently operates through explicit run phases:

- Town: the between-combat checkpoint for shopping, resting, rerolling shop inventory, inspecting the hero, and entering combat.
- Combat: a turn-based encounter between the hero and one enemy.
- Dead: the run has ended after player defeat.
- Retired: the hero ended the run after defeating the final boss.

State transitions are explicit and engine-owned:

- Town -> Combat
- Combat -> Combat
- Combat -> Town
- Combat -> Dead
- Combat -> Retired

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

Zones define broad enemy pools, run pacing, and difficulty identity. Endless progression repeats the zone ladder in successive cycles with stronger enemy damage.

Eligible standard encounters after the first boss may be replaced by ghosts created from other heroes who died beyond that point. Boss encounters are never replaced by ghosts.

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

Equipment may be a fixed authored item or a generated item assembled from an eligible base, rarity, and affixes. Both forms can affect derived combat values and persist as distinct item instances within the run.

Items can be acquired from town shops and boss reward choices. Their selection and generation consume the run's seeded randomness. When an item can occupy multiple valid slots, the selected equipment slot is explicit and replacement can be previewed before confirmation.

Items may:

- provide weapons or armour
- modify stats
- affect damage or mitigation
- interact with skills or feats

Items persist during a run but do not carry between runs unless a future meta system explicitly allows it.

Healing potions can be bought in town up to the carrying limit and used during combat. Swappable one-handed weapons can also exchange their equipped hands while in town.

## 9. Town Rules

Town is a strategic checkpoint between encounters.

Town allows the player to inspect the hero, enter combat, buy equipment and healing potions, swap eligible hand weapons, rest to full HP, and reroll the shop.

Town state includes:

- shop slots with item instances, prices, and purchased state
- shop level derived from the current zone
- rest cost and rest count
- reroll cost and reroll count
- healing potion cost

Town pricing is engine-owned. Current costs are affected by the hero's charisma modifier through a town discount multiplier. Rest costs increase with each rest across the full run. Reroll costs increase with repeated use during the current town visit.

Returning to town after a victory creates fresh town state for the current run position and resets the active streak and town-local reroll count. It does not reset the current day or rest-price escalation. Continuing directly to the next combat preserves momentum and increases the streak.

Town should not contain combat encounters. It may prepare, recover, or redirect the run, but combat outcomes remain engine-owned.

## 10. Death, Victory, and Endless Progression

Player death immediately ends the run.

Defeating the final boss at battle 100 is the victory condition. After resolving pending rewards and level-ups, the player may retire the hero to end the run, return to town, or continue directly into endless progression.

Continuing beyond battle 100 starts a new endless cycle. The zone ladder repeats, enemies gain additional damage each cycle, and the run continues under the same deterministic rules until death.

## 11. Ghosts

A hero who dies after progressing beyond the first boss leaves a ghost snapshot at full health without a pending level-up. Each eligible run creates at most one ghost.

Ghosts use the same combat rules, equipment, skills, feats, and class tactics as other combatants. Their encounters and outcomes contribute to ghost records outside the active run without changing its gameplay rules.

## 12. Scope Boundaries

This document does not define:

- exact combat formulas
- exact stat scaling
- exact enemy AI logic
- content schemas
- generated registries
- item generation algorithms
- infrastructure or persistence details
