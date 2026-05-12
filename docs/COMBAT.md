# Browser Heroes 2 — Combat Resolution Specification

---

# 1. Combat Goals

Combat should be:

- deterministic
- readable
- low-friction
- strategically expressive
- easy to resolve mentally from logs and state

Combat is designed around:

- short decision cycles
- build synergy discovery
- incremental power growth
- explainable outcomes

---

# 2. Combat Structure

Combat consists of:

- one player hero
- one enemy
- alternating turns

The player always acts first on turn 1. Turns then alternate: player → enemy → player → enemy.

Combat contains:

- no positioning system
- no movement system
- no simultaneous action resolution

---

# 3. Combat State

## 3.1 Player Combat State

- current HP
- stats
- active effects
- skills
- equipped items
- temporary modifiers

---

## 3.2 Enemy Combat State

- current HP
- stats
- active effects
- skills
- equipped items
- temporary modifiers
- enemy archetype
- AI profile

---

## 3.3 Encounter State

- turn number
- combat log
- RNG state
- zone modifiers
- encounter modifiers

---

# 4. Turn Resolution

Each turn resolves in the following order:

1. Action selection
2. Action resolution
3. Effect resolution
4. Death check
5. Turn transition

---

## 4.1 Valid Actions

Combat actions include:

- basic attack
- skill usage
- consumable usage

Only one action may be selected per turn.

---

## 4.2 Resolution Order

Actions resolve in the following sequence:

1. Determine target
2. Calculate base effect
3. Apply offensive modifiers
4. Apply defensive mitigation
5. Apply conditional effects
6. Apply final result
7. Write combat log entry

---

# 5. Damage Resolution

Damage follows this conceptual flow:

```text
Base Value
→ Offensive Modifiers
→ Defensive Mitigation
→ Conditional Effects
→ Final Damage
```

---

## 5.1 Offensive Modifiers

Damage may scale from:

- stats
- weapon values
- skill multipliers
- item modifiers
- temporary effects

---

## 5.2 Defensive Mitigation

Damage reduction may derive from:

- resistances
- defensive effects
- temporary modifiers
- enemy traits

---

## 5.3 Minimum Damage Rule

Damaging actions must result in either:

- at least 1 damage
- or an explicit blocked outcome

Invisible nullification is not allowed.

---

# 6. Randomness Rules

Randomness is permitted only in explicitly defined systems.

Examples include:

- damage ranges
- critical hits
- enemy generation
- loot generation
- skill offerings

All randomness must:

- derive from seeded RNG
- remain reproducible from run state
- preserve deterministic replayability

---

# 7. Status Effects

Status effects are condition-based temporary modifiers (e.g. poison, burn). They are distinct from buffs and debuffs (§9), which modify stats or behavior directly.

Examples include:

- poison
- burn
- stun
- freeze

---

## 7.1 Status Effect Definition

Every status effect must define:

- source
- duration
- trigger timing
- stacking behavior
- expiration condition

---

## 7.2 Effect Timing

Effects may trigger:

- at turn start
- at turn end
- on attack
- on damage taken
- on skill usage
- on death

---

# 8. Skill Resolution

Skills are specialized combat actions.

Every skill defines:

- target type
- effect type
- scaling source
- timing behavior
- special rules

---

## 8.1 Skill Categories

Skills may include:

- direct damage
- damage-over-time
- healing
- defensive effects
- buffs and debuffs
- reactive effects
- passive effects

---

## 8.2 Skill Clarity

Skill outcomes must always remain understandable through:

- combat logs
- visible modifiers
- explicit resolution rules

---

# 9. Buff & Debuff Rules

Buffs and debuffs are temporary combat modifiers.

Modifiers may affect:

- stats
- damage
- mitigation
- resistances
- skill behavior

---

## 9.1 Stacking Rules

Modifiers must explicitly define:

- stacking behavior
- additive or multiplicative behavior
- refresh or replacement behavior

Implicit stacking behavior is not allowed.

---

# 10. Death Resolution

When HP reaches 0:

- the entity dies immediately
- pending actions are canceled unless explicitly persistent

---

## 10.1 Combat End Rules

On enemy death:

- combat ends immediately
- rewards are generated
- progression updates resolve

On player death:

- the run ends immediately

---

# 11. Combat Logging

Every combat action must generate a log entry containing:

- source
- action
- target
- modifiers
- outcome
- final result

Combat logs are considered part of the authoritative combat state.

---

# 12. Enemy AI Rules

Enemy AI operates through:

- deterministic decision profiles
- conditional behavior rules

Enemy behavior should remain:

- understandable
- learnable
- strategically exploitable

Enemy behavior should avoid:

- arbitrary outcomes
- opaque logic
- hidden rule exceptions

---

# 13. Deferred Design Areas

This document intentionally does not define:

- exact formulas
- stat lists
- critical hit formulas
- evasion systems
- speed-based or conditional initiative systems
- resource systems
- detailed enemy AI implementations

These systems will be defined in future subsystem specifications.
