# Browser Heroes 2 — Product Requirements Document

---

## 1. Vision

Browser Heroes 2 is a free-to-play browser roguelike RPG built around fast, repeatable runs of turn-based combat progression.

Players create a hero, progress through sequential battles, develop builds through randomized items and skills, and advance across increasingly difficult zones.

The game emphasizes:

- short replayable runs
- emergent build combinations
- deterministic turn-based combat
- high run-to-run variability
- low onboarding friction
- long-term replayability

---

## 2. Core Gameplay Loop

1. Create hero
2. Enter town
3. Prepare build through shops, recovery, and consumables
4. Enter combat encounters
5. Defeat sequential enemies
6. Every 10th battle is a boss encounter
7. Defeating a boss unlocks the next zone
8. Reach battle 100 and defeat the final boss
9. Continue into endless progression or end the run

---

## 3. Core Systems

Detailed rules for each system are defined in RULES.md.

---

### 3.1 Hero System

Heroes have a class identity, stats, level, and skills that develop across a run.

---

### 3.2 Combat System

Deterministic turn-based encounters between the player hero and a single enemy. See COMBAT.md for the full combat specification.

---

### 3.3 Progression System

Players earn XP from victories, level up to gain stats and new skills, and advance through increasingly difficult zones.

---

### 3.4 Item System

Items acquired through shops, boss drops, and ghost drops modify hero capabilities and define build identity for the run.

---

### 3.5 Town System

A Phaser-rendered 2D tile map where the player prepares between encounters. See RULES.md §9.

---

### 3.6 Meta Systems

Leaderboards, run history, hero inspection, and asynchronous ghost encounters provide social and replayability layers outside individual runs.

---

### 3.7 World Event System

Global activity feed showing notable player events and run activity.

---

## 4. Design Goals

- Runs should be fast and replayable
- Build variety should emerge through item and skill combinations
- Combat should remain readable and low-friction
- Randomness should create meaningful variation
- The game should support both casual and optimization-focused playstyles
- The UI should remain minimal, responsive, and information-dense

---

## 5. Win & Failure Conditions

Victory is achieved by defeating the final boss at battle 100, after which endless progression is available. Player death ends the run immediately. See RULES.md §11 for the complete run completion rules.

---

## 6. Scope Boundaries

This document intentionally does not define:

- combat formulas
- stat scaling
- item generation algorithms
- technical architecture
- infrastructure
- database design
- UI implementation details
