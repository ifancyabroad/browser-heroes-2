# Browser Heroes 2 - Combat Design

## 1. Combat Goals

Combat should be deterministic, readable, low-friction, and strategically expressive.

The system is DnD-adjacent rather than a strict tabletop rules clone. It uses familiar RPG ideas such as attributes, proficiencies, dice rolls, hit dice, damage dice, D20 checks, and saving throws while keeping browser play fast.

Combat should support:

- short decision cycles
- build synergy discovery
- clear logs and outcomes
- deterministic replay
- meaningful variation from seeded randomness

## 2. Combat Structure

Combat consists of one hero against one enemy.

Combat has:

- alternating turns
- no positioning system
- no movement system
- no simultaneous action resolution

The player acts first unless a future rule explicitly says otherwise.

## 3. Combatants

Combatants are derived from hero, enemy, item, skill, and feat content.

Combat-relevant identity includes:

- current and maximum HP
- six core attributes
- proficiencies
- active skills
- passive feats
- equipment
- active temporary effects
- combat log state

The exact stored shape belongs to code, not this document.

Encounter context includes turn state, combat log state, encounter type, RNG/run state, and any relevant zone or encounter modifiers.

## 4. Attributes, Proficiencies, and Dice

Combat uses six attributes:

- strength
- dexterity
- constitution
- intelligence
- wisdom
- charisma

Attributes and proficiencies influence attacks, saves, damage, mitigation, skill effects, and class or enemy identity.

Dice are deterministic because rolls consume seeded RNG from run state. Dice may be used for:

- D20 checks
- attack resolution
- saving throws
- hit dice
- damage rolls
- effect rolls

This document intentionally does not define exact formulas.

Randomness is permitted only in explicitly defined systems such as damage ranges, critical outcomes, enemy generation, loot generation, and skill offerings.

## 5. Turn Resolution

Each turn resolves conceptually as:

1. Select a valid action.
2. Resolve the action.
3. Apply relevant dice checks and modifiers.
4. Apply damage, healing, effects, or other outcomes.
5. Check death and combat end conditions.
6. Advance the turn and write log entries.

Only explicit rules may interrupt or alter this order.

## 6. Valid Actions

Combat actions may include:

- basic attacks
- active skill usage
- consumable usage

Only one player action is selected per player turn unless a rule explicitly grants another action.

## 7. Damage and Mitigation

Damage follows this conceptual flow:

```text
Base roll or value
-> offensive modifiers
-> defensive mitigation
-> conditional effects
-> final outcome
```

Damage may derive from weapons, skills, attributes, proficiencies, damage dice, feats, items, and temporary effects.

Mitigation may derive from armour, attributes, resistances, feats, items, saving throws, and temporary effects.

Damaging actions must result in at least 1 damage or an explicit blocked, avoided, or immune outcome. Invisible nullification is not allowed.

## 8. Skills

Skills are active combat abilities.

Skills may:

- deal damage
- heal
- apply temporary effects
- impose conditions
- modify the current combat state
- create utility effects

Skills should have clear targets, readable outcomes, and log entries that explain what happened.

## 9. Feats

Feats are passive build features.

Feats may:

- modify stats or derived combat values
- modify damage or resistances
- add passive attack riders
- improve survivability or utility
- reinforce class, item, or build identity

Feats are not selected as combat actions. Their effects should be visible through state, combat logs, or clear derived outcomes.

## 10. Temporary Effects

Temporary effects are combat-limited conditions, buffs, debuffs, or state modifiers.

They should define their timing, duration, stacking behavior, and expiration condition in code or content. Implicit stacking behavior is not allowed.

Effects may trigger at clear timing points such as turn start, turn end, on attack, on damage taken, on skill use, or on death.

Conditions such as poison, burn, stun, or freeze should remain understandable through visible state and combat logs.

## 11. Death and Combat End

When a combatant reaches 0 HP, that combatant dies immediately unless an explicit rule prevents it.

On enemy death:

- combat ends
- rewards and progression may resolve
- the player may continue forward or return to town where applicable

On player death:

- the run ends immediately

## 12. Combat Logging

Combat logs are part of the authoritative combat state.

Logs should make outcomes understandable by recording the actor, action, target, important modifiers or rolls, outcome, and final result where relevant.

## 13. Enemy Behavior

Enemy behavior should be deterministic, learnable, and strategically exploitable.

Enemy decisions may use simple tactics or conditional rules, but should avoid opaque exceptions and arbitrary outcomes.

## 14. Scope Boundaries

This document does not define:

- exact combat formulas
- exact stat scaling
- exact critical hit behavior
- exact enemy AI implementation
- code schemas or registry contents
