# Browser Heroes 2 - Balance Guide

## 1. Purpose

This document guides the authoring and review of feats, skills, items, affixes, enemies, and other gameplay content. It provides shared reference points, not strict formulas.

Browser Heroes 2 is intentionally variable. A fortunate, focused build may defeat enemies before they act, avoid damage for several battles, or become exceptionally powerful through synergy. Enemy scaling, encounter matchups, and the difficulty of assembling that build provide its wider context.

Balance should protect meaningful choices without making content uniform. Theme and identity are at least as important as numerical precision and should take priority when the numbers are reasonably comparable. An unusual effect is welcome when it is coherent, readable, and appropriately limited.

## 2. How to Compare Content

Use finalized content of the same kind and rarity as the primary reference. Compare affixes with affixes, skills with skills of a similar role, and legendary items as complete packages.

Consider more than the printed value:

- action, equipment-slot, and selection opportunity cost
- attack, saving throw, or trigger reliability
- duration and realistic number of activations
- limited uses and whether the effect is immediate or delayed
- damage-type and encounter coverage
- applicability to likely builds
- interaction with the strongest plausible combinations

Expected damage, healing, or prevention is useful for identifying outliers, but should not replace judgment. Rare triggers should still feel rewarding, and specialized effects should be allowed to outperform general ones in their intended build.

## 3. Affix Stat Baselines

Finalized generated-item affixes establish the clearest numerical baseline:

| Mechanic                           |       Uncommon |       Rare |     Epic |
| ---------------------------------- | -------------: | ---------: | -------: |
| Attribute                          |             +1 |         +2 |       +4 |
| Attack roll, save DC, or all saves |             +1 |         +2 |       +4 |
| Typed flat damage                  |             +1 |         +2 |       +4 |
| Universal flat damage              |              - |         +1 |       +2 |
| Maximum HP                         |             +5 |        +10 |      +20 |
| Armour class                       | +1, restricted |         +1 |       +2 |
| Flat incoming damage reduction     |              1 |          2 |        4 |
| Critical range                     |             +1 |         +2 |       +4 |
| Critical dice multiplier           |             +1 |         +2 |       +4 |
| Healing multiplier                 |              - |      x1.25 |     x1.5 |
| Single damage affinity             |              - | Resistance | Immunity |

These values represent comparable content quality, not exact mathematical equivalence. Their realized strength depends on the build:

- All attributes share a value even though a primary attribute, constitution, dexterity, or charisma may provide different secondary benefits.
- Accuracy and save DC become more valuable as the attack or saved effect becomes stronger.
- Typed damage is intentionally more generous than universal damage and accepts resistance or immunity risk.
- Armour class prevents entire attacks and riders, so it advances more slowly and has narrower uncommon availability.
- Maximum HP is stronger early and combines well with healing and mitigation.
- Resistance and immunity are matchup effects, not quantities that should be converted directly into ordinary stats.

Temporary values can exceed permanent affix values because they cost an action or use, expire, may require a save, and may not affect the full battle.

## 4. Damage Dice Identity

Die choice communicates the nature of an effect rather than its final power:

| Die | Thematic identity                      |
| --- | -------------------------------------- |
| d4  | Poison, disease, bleeding, and decay   |
| d6  | Diffuse explosions and lingering fire  |
| d8  | Forceful and control-oriented effects  |
| d10 | Beams, bolts, and concentrated attacks |
| d12 | Catastrophic damage                    |

The number of dice, modifiers, reliability, uses, and riders determine total strength. Use another die when the effect's identity calls for it; this mapping is a thematic default, not a restriction.

Weapon dice should similarly reflect weapon identity, handedness, and delivery. Critical hits make rolled dice more valuable, so large dice pools require additional review in critical-focused builds.

## 5. Riders and Temporary Effects

Finalized weapon affixes establish useful rider patterns:

- **Uncommon:** a simple unconditional d4 on-hit rider.
- **Rare:** an unconditional d6 on-hit rider, moderate damage over time, a two-turn debuff with a fixed DC 15 save, or modest on-critical recovery and protection.
- **Epic:** an unconditional d8 on-hit rider, a combined damage-and-debuff package with a fixed DC 17 save, or a strong on-critical damage, utility, silence, or stun effect.

These are reference shapes rather than mandatory recipes. Apply the following considerations:

- On-hit riders inherit the attack's reliability and become stronger with accuracy and repeated attacks.
- On-critical riders are weak without investment but scale rapidly with critical range, advantage, and critical dice bonuses.
- Damage over time should use realistic triggers before the target dies; reapplication from the same source refreshes rather than freely stacking.
- Battle-duration effects may survive into later encounters when the hero continues, so their value can extend beyond one battle.
- Advantage and disadvantage have their greatest effect near uncertain D20 thresholds and do not stack with themselves.
- Shields provide immediate protection but may expire unused. Healing may be delayed or lost to overhealing.
- Stun denies an entire enemy action in one-versus-one combat and should remain uncommon, saved, short, limited, or difficult to assemble.
- Silence is narrower because the target retains its basic attack, but can be decisive against skill-focused enemies.

## 6. Damage, Defense, and Affinities

Flat damage is predictable, while multipliers scale with the rest of a focused build. Broad multipliers therefore deserve more scrutiny than equally impressive flat values. The same applies to incoming damage reduction, which combines strongly with armour class, HP, healing, shields, and affinities.

Damage types should be authored thematically rather than forced into equal representation. Physical damage will naturally be common, while skills and items should give non-physical types meaningful build support.

Resistance halves matching damage and immunity prevents it. Immunity is currently a hard counter with no guaranteed removal or bypass. This permits generous rewards for damage-type specialization, but immunity should remain thematic and deliberate because it can invalidate a build's primary strategy. A mandatory enemy or boss immunity is more consequential than an occasional normal encounter immunity.

Vulnerability doubles matching damage and benefits every compatible follow-up. It is a high-synergy effect and should normally be temporary, conditional, saved, or attached to suitably rare content.

## 7. Skills and Legendary Weapons

### Skills

Compare skills by role as well as rarity. A damaging skill should be judged against a basic attack, a healing skill against the enemy actions it can recover, and a setup skill against the action it sacrifices.

Current player skills broadly progress from simple attacks and utility at common rarity, through stronger attacks and focused packages at uncommon and rare, to large combined effects at epic and exceptional one- or two-use effects at legendary. Consider together:

- damage or attack multiplier
- save-for-half, save-to-negate, attack roll, or guaranteed resolution
- number of uses
- immediate riders and later-turn value
- control, defense, healing, and build-enabling effects

Rarity controls availability as well as strength. It does not require every higher-rarity skill to deal more damage when its value lies in control, persistence, reliability, or synergy.

### Legendary weapons

Treat a legendary weapon as a coherent identity rather than a sum of epic affixes. Finalized weapons commonly combine an enhanced base weapon with one or more of the following:

- +4 to a defining attribute or combat stat
- +5 typed damage
- a substantial on-hit damage rider
- healing, protection, resistance, or accuracy
- a distinctive critical, control, damage-over-time, or vulnerability interaction

Handedness, base weapon damage, class access, and the strength of the signature mechanic all contribute to the package. A legendary may exceed ordinary affix expectations when that excess creates a focused and memorable identity rather than a collection of unrelated best-in-slot bonuses.

## 8. Synergy and Review

Powerful combinations are an intended reward when they require luck and focused choices. Review the completed build rather than weakening every component in isolation.

Pay particular attention to:

- critical range, critical dice, advantage, and on-critical riders together
- repeated typed damage bonuses, multipliers, and vulnerability
- armour class combined with mitigation, affinities, healing, and shields
- stun chains or other reliable action denial
- battle-duration effects carried through a continuing streak
- repeated effects across multiple equipment slots

Before adding or changing content:

1. Identify the closest finalized references of the same kind, role, and rarity.
2. Compare opportunity cost, reliability, uses, duration, and applicability.
3. Check the intended thematic identity and whether every mechanic reinforces it.
4. Test representative use and the strongest plausible synergy.
5. Accept deliberate strengths and weaknesses; adjust only when an option is broadly dominant, irrelevant, or undermines meaningful choices.

Use deterministic simulations and play experience to refine these baselines. They are evidence for judgment, not a replacement for it.
