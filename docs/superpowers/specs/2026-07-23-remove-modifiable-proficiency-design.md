# Remove Modifiable Proficiency Design

## Purpose

Remove proficiency bonus from the modifier and combat-stat systems while retaining it as a
level-derived character value.

Proficiency represents general level-based competence. Allowing equipment, feats, or temporary effects to modify it also changes proficient attack rolls, proficient saving throws, and save DCs that include proficiency. This is broader and less readable than the existing specialised modifiers for those outcomes.

## Scope

This change will:

- remove `proficiencyBonus` from `modifiableStatSchema`;
- remove proficiency bonus from combatant combat stats;
- calculate proficiency directly from character or combatant level where needed;
- delete the `Skilled` rare prefix and `Masterful` epic prefix;
- update exhaustive labels, log formatting, schemas, generated content, and tests affected by the narrower modifiable-stat type;
- verify that no skill, feat, item, affix, or temporary effect modifies proficiency bonus.

This change will not:

- alter the proficiency progression formula;
- remove proficiency from attack rolls, saving throws, or save DCs;
- remove temporary attribute modifiers;
- add maximum-HP modifiers;
- add advantage or disadvantage;
- replace the deleted affixes with equivalent general-purpose bonuses.

## Content Decision

`Skilled` and `Masterful` will be deleted rather than repurposed.

The affix roster already contains specialised alternatives:

| Purpose | Rare | Epic |
| --- | --- | --- |
| Attack accuracy | `Precise` (+2 attack rolls) | `Flawless` (+4 attack rolls) |
| Save DC | `Potent` (+2 save DC) | `Overwhelming` (+4 save DC) |
| Saving throws | `of Defiance` (+2 saves) | `of Invincibility` (+4 saves) |

Replacing proficiency with all three bonuses would preserve the same over-broad effect. Converting the deleted affixes to only one of these stats would duplicate an existing affix.

Generated item instances carry their generated definitions in run state, so existing instances do not require an affix-ID migration. New item generation will no longer select the deleted prefixes.

## Technical Design

`proficiencyBonus` is removed from both the modifiable-stat and combat-stat schemas. Combatants
already store level, so retaining a cached proficiency value would duplicate its authoritative input.

The narrower type must propagate through:

- passive modifier validation;
- temporary effect validation;
- active combat effect validation;
- modifier resolution;
- UI modifier labels;
- combat log modifier labels;
- tests and fixtures that exhaustively enumerate modifiable stats.

Attack rolls, saving throws, and save DCs calculate proficiency directly from combatant level.
Proficiency is not included in derived hero stats or frontend stat presentation because no
non-combat consumer currently requires it.

The two affix source files will be removed, followed by the repository's normal content-generation workflow so generated IDs, registries, and manifests remain authoritative.

## Validation

Verification should demonstrate that:

- content generation succeeds without the deleted affixes;
- no content source contains a proficiency modifier;
- content, engine, and web type checks pass;
- modifier schema tests reject `proficiencyBonus`;
- combat stat schema tests reject `proficiencyBonus`;
- attack rolls still add proficiency when an attacker is proficient;
- saving throws still add proficiency when the defender is proficient;
- save DCs still add proficiency when configured to do so;
- generated affix registries no longer contain `skilled` or `masterful`.

## Follow-up Sequence

After this isolated cleanup:

1. add passive and temporary maximum-HP bonuses with health-gap preservation and a 1 HP floor for modifier-driven reductions;
2. add advantage and disadvantage for attack rolls and saving throws;
3. split passive and temporary modifiable-stat schemas and migrate all temporary attribute effects using the completed mechanics.
