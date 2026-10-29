---
name: create-game-skill
description: Implement Browser Heroes 2 active combat skills from a name, pool, rarity, and effect idea, following existing descriptions, rarity-based tuning, and unused icons from the local asset library.
---

# Create Game Skills

The user provides the skill's **name**, **pool**, **rarity**, and an **idea of what it does**. Create the in-game skill from these inputs. Ask questions when requirements are unclear or further details are needed to work effectively; infer routine implementation details from existing skills.

## Description and power

- Read comparable definitions in `packages/content/src/skills/` before authoring.
- Match existing descriptions in both tone and level of detail. Use their terminology and capitalization, and describe the implemented behavior accurately.
- Base power on the supplied rarity, using skills of similar rarity and mechanics as references. Consider the combined effects, reliability, duration, scaling, and available uses. If uncertain about suitable power or tuning, explain the uncertainty and ask the user.

## Icon

- Search recursively in `C:\Users\edgar\OneDrive\Documents\Game Assets\6000FantasyIcons\SkillsIcons` and visually inspect suitable candidates.
- Use an image that is not already used anywhere in the game. Check existing repository images and content references; compare hashes to catch renamed copies and visually check likely resized or re-encoded duplicates.
- If confidence is low or multiple good matches exist, report the candidates with previews or identifiable source paths and ask the user to choose or provide direction. Report an inaccessible library or lack of suitable unused images rather than substituting an already-used icon or generated artwork.
- Copy the selected image to `apps/web/public/assets/images/skills/<pool>/`, preserving the source. Rename the copy to match existing skill icon conventions, typically `<snake_case_skill_id>.png`, preserving its actual image format. Set the skill's relative icon path accordingly.

## Implementation and validation

- Follow repository instructions, current skill/effect schemas, and neighboring `buildSkill` definitions. Use a camelCase source filename and a stable snake_case ID.
- Confirm that the engine supports the intended effects; schema validity alone does not guarantee runtime support. Ask about material changes needed to realize the idea rather than silently approximating it.
- Regenerate content with `pnpm --filter @app/content run generate:content`; do not hand-edit generated files.
- Run content typecheck/lint, formatting checks, and any targeted behavioral checks warranted by the change. Verify that the copied icon exists and is unused elsewhere.
- Report what was created, the skills used as power references, the icon selected, and validation results. Clearly identify unresolved questions or blocked work.
