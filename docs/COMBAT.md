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
- player-initiated basic attack rounds
- deterministic enemy response during the same resolved round

The player currently acts through basic attack actions. Active skill use, consumables, richer enemy tactics, and deeper temporary effects are planned/scaffolded and should not be treated as current playable behavior.

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

## 5. Basic Attack Round

Current player combat resolution is round-based from the player's perspective:

1. The player submits a basic attack action.
2. The engine validates that combat is active.
3. The player attack resolves.
4. Combat status is checked.
5. If the enemy dies, victory rewards are applied.
6. If the enemy survives, the enemy basic attack resolves.
7. Combat status is checked again.
8. The run either advances the combat turn, ends in defeat, or waits at victory.

This keeps the UI simple while preserving engine-owned combat resolution.

## 6. Valid Actions

Current playable actions around combat include:

- basic attack while combat is active
- continue to next combat after victory
- return to town after victory
- complete pending level-up choices when required

Planned or scaffolded action surfaces include:

- active skill use
- consumable use
- richer town actions that affect combat readiness

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

Skills are intended to be active combat abilities. Consumables are intended to provide limited-use recovery, combat, or utility effects.

Current state: skills can exist on combatants and can be gained or ranked through progression, but direct player skill actions and consumable actions are not yet part of the playable combat loop.

When implemented, skills and consumables should have:

- clear targets
- readable outcomes
- explicit usage limits where applicable
- deterministic resolution
- log entries that explain what happened

## 9. Feats and Passive Modifiers

Feats are passive build features and are not selected as combat actions.

Passive modifiers may affect attributes, combat stats, damage, mitigation, affinities, or other derived outcomes.

Passive effects should remain visible through derived state, combat logs, or clear outcomes. Hidden exceptions should be avoided.

## 10. Temporary Effects and Conditions

Temporary effects are planned combat-limited buffs, debuffs, or conditions.

Effects should define timing, duration, stacking behavior, and expiration in code or content. Implicit stacking behavior is not allowed.

Future timing points may include turn start, turn end, on attack, on damage taken, on skill use, and on death.

Conditions such as poison, burn, stun, or freeze should remain understandable through visible state and combat logs.

## 11. Death and Combat End

When a combatant reaches 0 HP, combat status is checked immediately.

On enemy death:

- combat enters a victory state
- rewards are applied
- pending level-up may be created
- the player may continue forward or return to town after required choices

On player death:

- combat ends in defeat
- the run moves to the dead phase

The complete phase is reserved for the intended full victory condition.

## 12. Combat Logging

Combat logs are part of authoritative combat state.

Logs should make outcomes understandable by recording important events such as combat start, attacks, misses, damage, victory, defeat, rewards, and future skill or effect outcomes.

Logs should explain what happened without exposing fragile internal implementation detail.

## 13. Enemy Behavior

Current enemy behavior is simple and deterministic: after a surviving player attack, the enemy responds through its basic attack.

Future enemy behavior may use skills, conditions, and simple tactical rules. Enemy decisions should be learnable, deterministic, and strategically exploitable.

Avoid opaque exceptions and arbitrary outcomes.

## 14. Scope Boundaries

This document does not define:

- exact combat formulas
- exact stat scaling
- exact critical hit behavior
- exact enemy AI implementation
- content schemas
- generated registry contents
