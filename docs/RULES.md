# Browser Heroes 2 — Game Rules Specification

---

# 1. Run Structure

A run consists of sequential combat encounters connected by town visits and progression systems.

Each run is self-contained and ends on player death or manual completion.

---

# 2. Primary Game States

The game operates through two primary states:

## 2.1 Town State

Non-combat preparation state. See §9 for town systems and rules.

---

## 2.2 Combat State

Turn-based encounter between the player and a single enemy.

Combat encounters resolve until:

- the enemy is defeated
- or the player dies

Detailed combat behavior is defined in the Combat Resolution Specification.

---

# 3. State Transitions

Allowed transitions:

- Town → Combat
- Combat → Town
- Combat → Combat

After each combat the player may either return to town or continue directly to the next encounter. Continuing without visiting town increases the active gold multiplier. Returning to town resets the multiplier. Town is not mandatory between battles.

---

# 4. Hero Rules

A hero consists of:

- class identity
- stats
- level
- skills
- items
- current combat state

Heroes persist for the duration of a run only.

---

# 5. Progression Rules

## 5.1 XP & Leveling

- XP is awarded after combat victories
- Level-ups occur immediately upon reaching threshold
- Level-ups may grant stat growth and skill selection opportunities

---

## 5.2 Zone Progression

- Every 10th encounter is a boss encounter
- Defeating a boss unlocks the next zone
- Zones define enemy pools and difficulty progression

---

## 5.3 Ghost Encounters

Any standard combat slot (excluding boss encounters) has a chance to be replaced by a ghost encounter. A ghost encounter pits the player against a deceased player's hero, which retains the stats, skills, and items that hero had at the time of death. Ghost encounters are resolved using the same combat rules as standard encounters. Defeating a ghost may drop items.

---

# 6. Skill Rules

Skills are player abilities usable during combat.

Skills may:

- deal damage
- apply buffs or debuffs
- modify combat state
- provide utility effects

Skills are fully replenished on each town visit. Skills with per-encounter or per-run charges are defined individually in their skill specifications.

Detailed combat skill behavior is defined in the Combat Resolution Specification.

---

# 7. Item Rules

Items modify hero capabilities during a run.

Items may:

- modify stats
- modify skill behavior
- apply combat effects
- provide consumable functionality

Items may be acquired through:

- purchase from the town shop
- loot drops from boss encounters
- loot drops from defeated ghost encounters

Items persist throughout a run but do not carry between runs.

---

# 8. Consumable Rules

Consumables provide temporary combat or recovery effects.

Consumables:

- are limited in quantity
- may be purchased in town
- are consumed on use

---

# 9. Town Rules

Town functions as the primary preparation and recovery layer. It is presented as a Phaser-rendered 2D top-down tile map. The player navigates the map to interact with facilities and exits via a gate to begin the next combat encounter.

Town systems include:

- item shop
- reroll system
- recovery/rest systems
- consumable management

Town contains no combat encounters.

---

# 10. Meta Progression Rules

Outside individual runs, the game supports:

- leaderboards
- run history
- hero inspection

These systems do not modify the deterministic rules of a run.

---

# 11. Run Completion Rules

## Victory

- Defeat the final boss at battle 100

## Endless Progression

After victory, the player enters endless progression. The zones restart from the beginning, but all enemies and bosses are scaled to a higher difficulty tier — increased level, resistances, and damage output. Each full cycle increases difficulty further. The highest battle reached is tracked for leaderboard purposes.

## Failure

- Player death immediately ends the run

---

# 12. Scope Boundaries

This document intentionally does not define:

- combat formulas
- turn resolution details
- enemy AI logic
- stat scaling formulas
- item generation algorithms
- technical architecture
- persistence implementation

These are defined in subsystem-specific specifications.
