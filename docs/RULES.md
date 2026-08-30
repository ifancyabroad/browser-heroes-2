# Browser Heroes 2 - Game Rules

## 1. Run Structure

A run is a self-contained sequence of combat encounters connected by optional town visits and progression choices. A newly created run begins directly in battle 1 combat; town first becomes available as a checkpoint after a victory.

A run begins on day 1. Each successful rest advances the run by one day. Day progression and rest-price escalation are cumulative for the full run and do not reset when the hero returns to town.

The run flow supports combat, victory rewards, boss reward choices, level-up choices, continuing to the next combat, returning to town, death, and victorious retirement.

The main run is a 100-battle ladder. Every 10th battle is a boss encounter. Defeating the final boss at battle 100 unlocks the choice to retire victorious or continue into endless progression.

## 2. Primary Game States

The run has four phases:

- Town: an optional between-combat checkpoint after victory for shopping, resting, rerolling shop inventory, inspecting the hero, and entering combat.
- Combat: a turn-based encounter between the hero and one enemy.
- Dead: the run has ended after player defeat.
- Retired: the hero ended the run after defeating the final boss.

State transitions are explicit and engine-owned:

- Town -> Combat
- Combat -> Combat
- Combat -> Town
- Combat -> Dead
- Combat -> Retired

After a victorious combat, the player may continue directly to the next combat or return to town. Continuing preserves and increases run momentum through the active streak and carries surviving battle-duration effects on the hero into the next encounter. Returning to town resets that streak and clears all active effects.

## 3. Hero and Build Rules

A hero represents the player's run identity.

Hero state includes:

- class identity
- level and XP
- current and maximum HP
- attributes and proficiencies
- active skills
- passive feats
- equipment
- gold and run progress

Classes set the hero's starting direction. Skills, feats, and equipment should let each run branch into flexible builds.

Effective attributes include equipment and feat modifiers and are capped at 30. Base attributes remain part of the hero's stored build state.

Equipment and build choices persist for the run but do not carry between heroes.

## 4. Encounters and Zones

Combat encounters select enemies from the current zone and encounter type. The run seed and battle
number determine the authored enemy schedule, so combat decisions do not change later selections.
Battle 1 selects only from the eligible enemies tied for the lowest authored threat.

Every 10th battle is a boss encounter. Non-boss battles are standard encounters.

Zones are cumulative ten-battle segments. Each zone increases the level of authored enemies, while
the sequence of authored zone identities and enemy pools repeats every ten zones. Endless cycles
add further combat pressure on top of that continuing level progression.

Eligible standard encounters after the first boss may be replaced by ghosts created from other heroes who died beyond that point. Boss encounters are never replaced by ghosts.

## 5. Progression and Rewards

Victorious combat awards XP and gold.

Gold rewards are affected by the current streak. Continuing directly to the next combat increases the streak; returning to town resets it.

Boss victories can create a pending reward choice. Current boss reward choices contain two eligible equipment options and one gold option. The player must select one pending boss reward before normal run actions continue.

Level-ups are triggered by XP thresholds. When a level-up is pending, the player must complete it before normal run actions continue.

Level-up choices are a small set of relevant skills or feats. Skill options use rarity weights; feat options are selected uniformly. Each level and reroll has a seed-derived candidate ranking. Owned options are skipped, so prior build choices can change the visible offer without changing that ranking.

Each run begins with five level-up rerolls shared across skill and feat offers. Rerolls cost no gold and never replenish. A reroll prioritizes choices not present in the current offer; when fewer than three new choices remain, previous choices fill the remaining slots. Rerolling is unavailable when no alternative eligible choice exists.

## 6. Skills

Skills are active abilities owned by heroes, enemies, or other combatants.

Heroes can start with skills, gain them through level-ups, and use them in combat. The engine validates skill actions; silence prevents skill use, while stun permits only skipping the turn.

Implemented skill effects may:

- deal damage
- heal
- apply temporary effects
- impose conditions
- use charges or other explicit limits

Detailed skill resolution belongs in `COMBAT.md`.

## 7. Feats

Feats are passive build features.

Feats can be part of class identity or gained through eligible level-up choices.

Feats may:

- modify attributes or combat values
- modify damage or affinities
- improve survivability or utility
- reinforce class, skill, item, or build identity

Feats are not selected as combat actions. Their impact should appear through derived state, readable outcomes, or combat logs.

## 8. Item and Equipment Rules

Items modify hero capabilities during a run.

Equipment may be an authored legendary item or a generated common, uncommon, rare, or epic item. Generated items combine an eligible base with rarity-matched affixes, while common generated items use the base without affixes. Both forms can affect derived combat values and persist as distinct item instances within the run.

Authored legendary items may be restricted to specific classes. Restricted items are excluded from other classes' shops and reward choices and cannot be equipped by an ineligible class.

Items can be acquired from town shops and boss reward choices. Their selection and generation use
seeded randomness derived from the battle and option or shop slot. When an item can occupy multiple
valid slots, the selected equipment slot is explicit and replacement can be previewed before
confirmation.

Items persist during a run but do not carry between runs unless a future meta system explicitly allows it.

Healing potions can be bought in town up to the carrying limit and used during combat. Swappable one-handed weapons can also exchange their equipped hands while in town.

## 9. Town Rules

Town is a strategic checkpoint between encounters.

Town allows the player to inspect the hero, enter combat, buy equipment and healing potions, swap eligible hand weapons, rest to full HP, and reroll the shop.

Town state includes:

- shop slots with item instances, prices, and purchased state
- shop level following the current cumulative zone
- rest cost and rest count
- reroll cost and reroll count
- healing potion cost

Each unpurchased equipment slot in the shop can be locked for free. A locked slot preserves
its exact item and price through shop rerolls and future town visits until it is unlocked or
purchased. Buying a locked item clears its lock. Reroll cost is unaffected by locks; rerolling
with every slot locked still charges the normal cost and increases the visit-local reroll count,
but does not change inventory.

Town pricing is engine-owned. Current costs are affected by the hero's charisma modifier through a town discount multiplier. Rest costs increase with each rest across the full run. Healing potion costs scale with the cumulative zone number. The stored shop level follows that zone number, drives reroll costs and item quality, and rerolls also increase with repeated use during the current town visit. Shop and boss-reward item quality increases through the first zone cycle, then remains at its highest tier while pricing and enemy levels continue scaling.

Returning to town after a victory creates fresh town state for the current run position and resets the active streak and town-local reroll count. It does not reset the current day or rest-price escalation. Continuing directly to the next combat preserves momentum and increases the streak.

Each battle and reroll has a seed-derived baseline shop inventory and price schedule. Locks,
purchases, and class eligibility intentionally affect the inventory visible to an individual hero.

Town should not contain combat encounters. It may prepare, recover, or redirect the run, but combat outcomes remain engine-owned.

## 10. Death, Victory, and Endless Progression

Player death immediately ends the run.

Defeating the final boss at battle 100 is the victory condition. After resolving pending rewards and level-ups, the player may retire the hero to end the run, return to town, or continue directly into endless progression.

Continuing beyond battle 100 starts a new endless cycle. Authored zone identities and enemy pools repeat, while cumulative zone numbers and enemy levels continue increasing. Enemies also gain additional endless-cycle combat scaling, and the run continues under the same deterministic rules until death. Ghosts preserve their original builds and receive the same endless-cycle combat scaling.

## 11. Ghosts

A hero who dies after progressing beyond the first boss leaves a ghost snapshot at full health without a pending level-up. Each eligible run creates at most one ghost.

Ghosts use the same combat rules, equipment, skills, feats, and class tactics as other combatants. Player ghosts are grouped by the zone in which they died but retain their original hero level and build. Defeating a player ghost banishes it from ghost pools frozen after that victory. Older runs retain the player ghost in their frozen pool, preserving deterministic encounters, but a run never encounters a ghost it has already defeated. Ghost appearance and identity are derived from the run seed and battle context using only ghosts published and not yet banished at the run's ghost-pool cutoff. Normal runs take this cutoff when created; participants in the same Daily Challenge share it.

When a frozen pool has no eligible player ghost for the zone, an authored system ghost appears instead. System ghosts cannot be globally banished, but a run does not encounter the same system ghost again after defeating it. If that leaves no eligible ghost, the scheduled battle remains a normal encounter.

Player ghost encounters and outcomes contribute to their ghost records outside the active run. Active and banished player ghosts remain visible in history and the Hall of Fame. System ghosts have no owner or persistent record, but defeating one still counts as defeating a ghost for the acting player.

## 12. Daily Challenges

Each UTC date has one Daily Challenge with a shared seed and predetermined class selected through an even rotation. The player chooses the hero name, while the server owns the class and seed.

The challenge is created when the first player starts it. Before publishing it, the server
deterministically tries candidate seeds until every available action sequence survives the first
two combat turns. This opening safety check does not guarantee that the full challenge is beatable.

Participants share the same underlying enemy, reward, level-up, and shop schedules. Prior build and
shop decisions may still create valid differences where owned options are skipped or slots are
preserved.

Each user identity may start the challenge once. Starting consumes the attempt even if the run is later abandoned. The challenge must be started on its date, but an active attempt may be resumed and completed later and remains attached to its original leaderboard. Starting any new run abandons the current active run.

Dead and retired attempts contribute to the completed-attempt count and are ranked by kills, then fewer run days, then earlier completion. Active and abandoned attempts are not counted or ranked. Daily runs participate in achievements, lifetime progress, personal history, and normal ghost creation. Normal runs do not participate in Daily Challenge leaderboards.

## 13. Achievements

Achievements are permanent account-level goals shared across a user's heroes. Guests earn achievements against their guest user record, and those unlocks remain attached when the guest registers.

Achievement definitions are shared game content. Unlocks are awarded from authoritative gameplay outcomes and retain the date and time first earned. Locked achievements remain visible so players can pursue their requirements.

## 14. Scope Boundaries

This document does not define:

- exact combat formulas
- exact stat scaling
- exact enemy AI logic
- content schemas
- generated registries
- item generation algorithms
- infrastructure or persistence details
