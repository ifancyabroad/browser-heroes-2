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

Combat currently consists of one hero against one enemy.

Current combat has:

- no positioning system
- no movement system
- no simultaneous action selection
- player-initiated action rounds
- deterministic enemy response during the same resolved round

The player acts through basic attacks, skills, healing potions, or skipped turns. Surviving enemies respond with a basic attack or an available skill selected according to their tactic. Status removal remains represented in content but is not resolved by the engine.

## 3. Combatants

Combatants are derived from hero, enemy, item, skill, and feat content.

Combat-relevant identity includes:

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

Dice and random selection consume seeded RNG from run state. Identical state plus identical action should produce identical outcomes.

Dice may be used for:

- D20 checks
- attack resolution
- saving throws
- hit dice
- damage rolls
- effect rolls
- random encounter or level-up option selection

This document intentionally avoids exact formulas and tuning values.

## 5. Player Combat Round

Current player combat resolution is round-based from the player's perspective:

1. The player submits a basic attack, skill, healing potion, or skip-turn action.
2. The engine validates that combat is active.
3. The player action resolves.
4. The player's active effects advance.
5. Combat status is checked.
6. If the enemy dies, victory rewards are applied.
7. If the enemy survives, its tactic selects and resolves a valid attack or skill.
8. The enemy's active effects advance.
9. Combat status is checked again.
10. The run either advances the combat turn, ends in defeat, or waits at victory.

This keeps the UI simple while preserving engine-owned combat resolution.

## 6. Valid Actions

Current engine-supported actions around combat include:

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
-> defender affinity
-> damage reduction
-> final outcome
```

Damage may derive from weapons, skills, attributes, proficiencies, feats, items, and temporary effects.

Mitigation may derive from armour, attributes, damage affinities, damage reduction, feats, items, saving throws, and temporary effects.

Damage affinities include normal, resistant, immune, and vulnerable outcomes. Combat logs should make important outcomes understandable.

## 8. Skills and Consumables

Skills are active combat abilities. Consumables provide limited-use recovery, combat, or utility effects.

Current state: player skill actions and healing potion use are part of engine combat resolution. Skills can exist on combatants, can be gained through progression, can consume limited charges, and resolve through shared engine logic. Healing potions restore a percentage of maximum HP adjusted by effective healing modifiers, consume one potion, write combat logs/events, and then complete the normal player action round.

Skills and consumables should have:

- clear targets
- readable outcomes
- explicit usage limits where applicable
- deterministic resolution
- log entries that explain what happened

Supported skill effect types include direct damage, weapon attack damage, healing, status application, temporary stat modifiers, temporary outgoing damage modifiers, temporary incoming damage modifiers, temporary damage affinity modifiers, damage over time, healing over time, and shields.

`removeStatus` exists in the content schema and UI formatting, but skill resolution does not support it yet. Skills containing unsupported effects are rejected by engine validation rather than partially resolved.

## 9. Feats and Passive Modifiers

Feats are passive build features and are not selected as combat actions.

Passive modifiers may affect attributes, combat stats, damage, mitigation, affinities, or other derived outcomes.

Passive effects should remain visible through derived state, combat logs, or clear outcomes. Hidden exceptions should be avoided.

## 10. Active Effects and Conditions

Active effects are combat-limited buffs, debuffs, conditions, shields, or recurring effects tracked on combatants.

Effects define duration and expiration through explicit combat state. Reapplying an effect from the same source updates the active effect instance rather than relying on hidden stacking behavior.

Current timing advances effects after the affected combatant's action or skipped turn. Damage-over-time and healing-over-time effects trigger during that advancement before durations are decremented and expired effects are logged.

Current statuses are `stunned` and `silenced`. Stun prevents the affected combatant from acting. Silence prevents skill use, so a silenced enemy falls back to its basic attack. Statuses and other active effects should remain understandable through visible state and combat logs.

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

Enemies select between basic attacks and usable skills. Their tactic can favor offensive skills, favor defensive skills while wounded, prioritize skills, or choose from all valid actions.

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
