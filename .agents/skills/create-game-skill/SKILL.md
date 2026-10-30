---
name: create-game-skill
description: Implement Browser Heroes 2 active combat skills from a name, pool, rarity, and effect idea, following existing descriptions and rarity-based tuning, with a visual shortlist of unused library icons for the user to choose from.
---

# Create Game Skills

The user provides the skill's **name**, **pool**, **rarity**, and an **idea of what it does**. Create the in-game skill from these inputs. Ask questions when requirements are unclear or further details are needed to work effectively; infer routine implementation details from existing skills.

## Description and power

- Read comparable definitions in `packages/content/src/skills/` before authoring.
- Match existing descriptions in both tone and level of detail. Use their terminology and capitalization, and describe the implemented behavior accurately.
- Base power on the supplied rarity, using skills of similar rarity and mechanics as references. Consider the combined effects, reliability, duration, scaling, and available uses. If uncertain about suitable power or tuning, explain the uncertainty and ask the user.

## Icon

- Start with the [full library visual index](references/icon-library/index.md). Review the contact sheets across all collections, including background variants, before shortlisting; do not restrict discovery to filename keywords. The static index covers all 3,353 PNGs in `C:\Users\edgar\OneDrive\Documents\Game Assets\6000FantasyIcons\SkillsIcons`.
- Use `references/icon-library/manifest.json` to resolve thumbnail IDs to original relative paths and SHA-256 hashes, then inspect shortlisted originals at full size. The manifest's `libraryRoot` gives the source location; substitute the actual root if the library moves. The library is assumed fixed, so no regeneration is needed during ordinary skill creation. If the index must be rebuilt, use `scripts/build-icon-index.ps1` (Windows PowerShell with System.Drawing; optional `-LibraryRoot`).
- Shortlist up to 10 appropriate images that are not already used anywhere in the game. Check existing repository images and content references; compare hashes to catch renamed copies and visually check likely resized or re-encoded duplicates. Show fewer than 10 when fewer suitable candidates are found; do not pad the shortlist with weak matches.
- Present the shortlist in the user-facing response with the actual images rendered inline, each with a numbered label, source path, and brief explanation of its fit. Use Markdown image embeds with absolute image paths (for paths containing spaces, use `![label](</absolute/path/to/image.png>)`) or another supported visible image presentation. Filenames, links, and tool-only image inspection are not sufficient previews.
- Ask the user to choose from the shortlist and wait for their selection before copying or assigning an icon, even when only one suitable candidate is found. Do not choose an icon automatically. If the user has already explicitly selected an image, inspect it and check that it is unused, then use their selection without asking again.
- Report an inaccessible library or lack of suitable unused images rather than substituting an already-used icon or generated artwork.
- After the user chooses, copy the selected image to `apps/web/public/assets/images/skills/<pool>/`, preserving the source. Rename the copy to match existing skill icon conventions, typically `<snake_case_skill_id>.png`, preserving its actual image format. Set the skill's relative icon path accordingly.

## Implementation and validation

- Follow repository instructions, current skill/effect schemas, and neighboring `buildSkill` definitions. Use a camelCase source filename and a stable snake_case ID.
- Confirm that the engine supports the intended effects; schema validity alone does not guarantee runtime support. Ask about material changes needed to realize the idea rather than silently approximating it.
- Regenerate content with `pnpm --filter @app/content run generate:content`; do not hand-edit generated files.
- Do not create tests for the new game skill. Validate with content generation, content typecheck/lint, formatting checks, and relevant existing tests when warranted. Verify that the copied icon exists and is unused elsewhere.
- Report what was created, the skills used as power references, the icon selected, and validation results. Clearly identify unresolved questions or blocked work.
