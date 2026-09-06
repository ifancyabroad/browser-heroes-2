# Browser Heroes 2 - Combat Design

## 1. Combat Goals

Combat should be deterministic, readable, low-friction, and strategically expressive.

The intended feel is fast tactical RPG combat. Basic attacks should remain easy to understand, while skills, items, conditions, and enemy behavior add decision depth over time.

Combat should support:

- short decision cycles
- clear combatant state
- readable logs
- deterministic replay
- build synergy discovery
- meaningful variation from seeded randomness

## 2. Current Combat Model

Combat consists of one hero against one enemy, with:

- no positioning system
- no movement system
- no simultaneous action selection
- player-initiated action rounds
- deterministic enemy response during the same resolved round

The player acts through basic attacks, skills, healing potions, or skipped turns. Surviving enemies respond with a basic attack or an available skill selected according to their tactic. Status removal remains represented in content but is not resolved by the engine.

## 3. Combatants

Combatants are derived from hero, enemy, item, skill, and feat content.

Combatants expose:

- current and maximum HP
- six core attributes
- derived combat stats
- saving throw proficiencies
- basic attack data
- active skills
- passive feat IDs
- equipment-derived modifiers
- healing potion count
- active temporary effects
- combat log state

The exact stored shape belongs to code, not this document.

## 4. Attributes, Proficiencies, and Dice

Combat uses six attributes:

- strength
- dexterity
- constitution
- intelligence
- wisdom
- charisma

Attributes and proficiencies influence attacks, saves, damage, mitigation, health, class identity, and enemy identity.

Combat dice and action selection consume seeded RNG from run state. Identical state plus identical
action should produce identical outcomes. Encounter and progression selection instead use stable
context-derived randomness so different combat decisions do not shift later opportunities.

Dice may be used for:

- D20 checks
- attack resolution
- saving throws
- hit dice
- damage rolls
- effect rolls
- random combatant action selection

This document intentionally avoids exact formulas and tuning values.

## 5. Player Combat Round

Combat resolution is round-based from the player's perspective:

1. The player submits a basic attack, skill, healing potion, or skip-turn action.
2. The engine validates that combat is active.
3. The enemy's intended action is selected from the state at the start of the round.
4. The player action resolves.
5. The player's active effects advance.
6. Combat status is checked.
7. If the enemy dies, victory rewards are applied and its intended action is discarded.
8. If the enemy survives, its intended action resolves unless a condition such as stun prevents it.
9. The enemy's active effects advance.
10. Combat status is checked again.
11. The run either advances the combat turn, ends in defeat, or waits at victory.

This keeps the UI simple while preserving engine-owned combat resolution.

## 6. Valid Actions

Engine-supported actions include:

- basic attack while combat is active
- skill use while combat is active, the hero knows the skill, the skill has uses remaining if limited, and the hero is not silenced
- healing potion use while combat is active, the hero can act, and at least one potion remains
- skip turn while combat is active
- continue to next combat after victory
- return to town after victory
- select a pending boss reward when required
- complete pending level-up choices when required

If the hero is stunned, skip turn is the only available combat action. If the hero is silenced, basic attack and skip turn remain available, but skill actions are not.

Only the engine decides whether an action is valid for the current run state.

## 7. Damage and Mitigation

Damage follows this conceptual flow:

```text
Base roll or value
-> offensive modifiers
-> incoming damage modifiers
-> defender affinity
-> final outcome
```

Damage may derive from weapons, skills, attributes, proficiencies, feats, items, and temporary effects.

Every damage component has a damage type and class, and may also have an attack range. Damage type
describes the harm dealt, such as slashing, fire, or necrotic. Damage class describes its source as
physical, magical, or other. Attack range describes delivery as melee or ranged; effects without a
meaningful delivery range leave it unspecified.

Basic attacks use their weapon or enemy-authored damage class and range. Skills that resolve a
weapon attack inherit that basic-attack profile unless they explicitly override it. Independent
damage components, including attack riders, retain their own authored class and range rather than
implicitly inheriting the triggering attack's range.

Outgoing and incoming damage modifiers may filter by type, class, range, or a combination. When a
modifier supplies more than one filter, the damage must match all of them. An unspecified filter
matches any value, while a melee or ranged modifier does not affect damage whose range is
unspecified.

Incoming damage modifiers and affinities may increase, reduce, or prevent damage. They may derive from attributes, feats, items, saving throws, and temporary effects. Armour class instead affects whether attacks hit.

Damage affinities include normal, resistant, immune, and vulnerable outcomes. Resistance and vulnerability for the same damage type cancel each other out, while immunity still prevents damage. Combat logs should make important outcomes understandable.

## 8. Skills and Consumables

Skills are active combat abilities. Consumables provide limited-use recovery, combat, or utility effects.

Skills can belong to any combatant, be gained through progression, and consume limited charges. Healing potions restore a percentage of maximum HP adjusted by healing modifiers, consume one potion, log the outcome, and complete the normal player round.

Skills and consumables should have:

- clear targets
- readable outcomes
- explicit usage limits where applicable
- deterministic resolution
- log entries that explain what happened

Supported skill effect types include direct damage, weapon attack damage, healing, status application, temporary stat modifiers, temporary healing multipliers, temporary roll modifiers, temporary outgoing damage modifiers, temporary incoming damage modifiers, temporary damage affinity modifiers, damage over time, healing over time, and shields.

`removeStatus` exists in the content schema and UI formatting, but skill resolution does not support it yet. Skills containing unsupported effects are rejected by engine validation rather than partially resolved.

## 9. Feats and Passive Modifiers

Feats are passive build features and are not selected as combat actions.

Passive modifiers may affect attributes, combat stats, damage, mitigation, affinities, or other derived outcomes.

Passive effects should remain visible through derived state, combat logs, or clear outcomes. Hidden exceptions should be avoided.

## 10. Active Effects and Conditions

Active effects are buffs, debuffs, conditions, shields, or recurring effects tracked on combatants. An effect has either a turn duration or a battle duration.

Effects define duration and expiration through explicit combat state. Reapplying an effect from the same source updates the active effect instance rather than relying on hidden stacking behavior.

Turn-duration effects advance after the affected combatant's action or skipped turn. Damage-over-time and healing-over-time effects trigger during that advancement before turn durations are decremented and expired effects are logged.

Battle-duration effects remain active for the whole battle in which they are applied. That battle counts toward their duration. After victory, continuing directly advances their duration and carries surviving effects on the hero into the next combat; returning to town clears all active effects. Effects on a defeated enemy do not carry forward. Effect-specific limits such as shield strength and roll-modifier charges can still end a battle-duration effect early.

Current statuses are `stunned` and `silenced`. Stun prevents the affected combatant from acting. Silence prevents skill use, so a silenced enemy falls back to its basic attack. Statuses and other active effects should remain understandable through visible state and combat logs.

Temporary roll modifiers can grant advantage or disadvantage on the affected combatant's own attack rolls or saving throws. Saving-throw modifiers may be limited to one attribute. Advantage rolls two D20s and uses the higher result, disadvantage uses the lower result, and having both resolves as a normal single roll regardless of how many sources provide either mode.

Roll modifiers may have a limited number of charges as well as a duration. A matching attack roll or saving throw consumes one charge, and the modifier expires when its final charge is consumed or its duration ends. Charged modifiers can also force an attack to hit, miss, or critically hit, or force a saving throw to succeed or fail. Conflicting forced success and failure outcomes cancel, while a forced critical hit includes a successful hit. Automatic outcomes must be charge-limited.

## 11. Death and Combat End

When a combatant reaches 0 HP, combat status is checked immediately.

On enemy death:

- combat enters a victory state
- rewards are applied
- a pending boss reward choice may be created
- pending level-up may be created
- the player may continue forward or return to town after required choices
- final-boss victory also allows victorious retirement

On player death:

- combat ends in defeat
- the run moves to the dead phase

## 12. Combat Logging

Combat logs are part of authoritative combat state.

Logs should make outcomes understandable by recording important events such as combat start, attacks, misses, damage, skill use, healing potion use, effect application, effect triggers, effect expiration, victory, defeat, and rewards.

Logs should explain what happened without exposing fragile internal implementation detail.

## 13. Enemy Behavior

Enemies select between useful attacks and skills using the combat state at the start of the round. They do not reconsider that choice after seeing the player's action, although death, stun, or silence can still prevent or constrain its resolution. Mechanical validation first excludes skills that cannot resolve, then effect-aware checks avoid actions such as using recovery above half health, reapplying an existing effect without another useful outcome, or dealing only immune damage. Above half health, a recovery skill remains available only when it also has a useful enemy-targeting effect. A wholly ineffective basic attack is excluded when a useful skill is available, but remains the fallback when no useful action exists.

Tactics weight the remaining actions while preserving seeded deterministic selection. Aggressive enemies favor offensive effects, defensive enemies increasingly favor recovery and protection while wounded, casters strongly favor skills, and random enemies choose uniformly from useful actions. Some bosses use scripted opening or conditional actions before falling back to a standard tactic; intentional self-harm is otherwise not treated as useful general behavior.

Stunned enemies skip their action, while silenced enemies use their basic attack. Skill charges and active effects constrain which skills are valid.

Ghosts enter combat as enemy-side snapshots of fallen heroes. They use the same combatant derivation, equipment, skills, effects, and class tactic as other combatants, so the normal round and logging rules apply.

Enemy decisions should remain learnable, deterministic, and strategically exploitable.

Avoid opaque exceptions and arbitrary outcomes.

## 14. Scope Boundaries

This document does not define:

- exact combat formulas
- exact stat scaling
- exact critical hit behavior
- exact enemy AI implementation
- content schemas
- generated registry contents
