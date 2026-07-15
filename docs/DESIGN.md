# Browser Heroes 2 - Design Principles

## 1. Purpose

This document defines UI design direction for Browser Heroes 2.

It covers visual direction, styling conventions, reusable components, layout expectations, and presentation-layer constraints. Product goals, game rules, combat behavior, architecture, and infrastructure belong in their own documents.

## 2. Visual Direction

Browser Heroes 2 should feel like a retro, minimalist fantasy RPG.

The UI should emphasize:

- text-forward readability
- compact RPG information hierarchy
- sparse decoration
- high contrast
- dense but scannable screens
- simple shapes and direct interactions
- readable consequences for success, failure, and risk

The interface should support a text-forward game aesthetic without becoming noisy or hard to scan.

## 3. Retro RPG Grammar

Browser Heroes 2 should feel like an old roguelike, dungeon ledger, adventurer's journal, or DOS-era fantasy RPG. Its visual language should be focused and consistent rather than combining separate terminal, arcade, and decorative fantasy treatments.

Use this grammar for new and revised UI:

- palettes should start from black, charcoal, neutral grey body text, tarnished brass labels, old gold commands, moss green, blood red, and ember orange
- shared primitives should carry the old RPG panel style whenever practical, especially cards, modals, tooltips, buttons, links, tabs, action trays, and resource bars
- panels should feel like inventory ledgers or dungeon record windows, with simple square borders, compact padding, and bordered inset labels such as `Shop` or `Combat Log`
- use fewer but more deliberate borders: meaningful structural frames and controls should normally use solid 2px edges that agree with the pixel type; repeated rows should prefer spacing over complete boxes unless each frame communicates a real slot, as in shop inventory
- reserve tarnished-brass borders for primary structure and controls; use the secondary warm-charcoal border for contained records and repeated inventory slots so every edge does not compete at the same visual level
- player commands should use compact 2px square frames, dark backgrounds, restrained color, clear focus states, and clear disabled states
- tabs should remain flatter than commands, using plain labels and a gold bottom border to mark the active section
- resource meters should use borderless, flat graphical tracks with solid fills, dark empty space, and adjacent labels and values; avoid gradients, rounded ends, gloss, and ornamental segmentation
- changing stats, prices, costs, and resource values should use tabular numerals so digits remain aligned and do not shift as values change
- logs should read like battle records, with compact round markers and muted metadata rather than command prompts
- image-heavy areas such as the battlefield should remain visually rich but be framed like battle windows or dioramas, not monitors
- use secondary and info accents sparingly where they create real hierarchy or state distinction; default text, labels, and primary actions should remain clearly separated
- spacing should stay dense and scannable; preserve the 16px font size and use tighter rhythm instead of oversized headings
- motion should be restrained, readable, and safe for reduced-motion users
- hover should clarify that an element is interactive through border, text, or underline changes; avoid routine fills, brightness effects, movement, and decorative animation
- action slots should carry their own frames without an additional tray frame or group dividers, and action groups must wrap without increasing the page width on mobile

Avoid terminal-emulator and sci-fi signals such as neon cyan defaults, CRT scanlines, boot/system copy, diagnostics language, machine-style log prefixes, command prompts, glowing borders, or viewport HUD language.
Also avoid decorative effects that make the UI feel like a general fantasy website rather than an in-game RPG interface.

## 4. Current UI Shape

The current web app includes:

- a landing screen
- character creation with class selection and hero naming
- a town screen with hero inspection, shop inventory, equipment purchase/replacement flow, rest, reroll, and combat entry
- a combat screen with combatants, stats, log/portrait view, and action controls
- reward choice modal flow
- level-up modal flow
- dead and complete placeholders
- shared error and loading states

Town and combat should continue to feel like parts of the same game surface, not unrelated pages.

## 5. Styling System

Tailwind CSS is the styling system for the web app.

Use Tailwind utility classes for layout, spacing, color, typography, and state styling. Prefer existing theme variables from `apps/web/src/index.css` through Tailwind classes such as `bg-bg-base`, `bg-bg-elevated`, `text-text`, `text-text-bright`, `text-primary`, `border-border`, `text-success`, and `text-error`.

Avoid hard-coded colors, one-off arbitrary values, and local CSS unless a reusable pattern cannot be expressed clearly with the current theme and utilities.

When new visual tokens are needed, add them deliberately to the theme so future UI can reuse the same language.

## 6. Typography

Font size should remain 16px throughout the UI to preserve the compact, text-based RPG feel.

Use Pixelify Sans throughout the interface, including the text logo. Do not mix it with a separate display, terminal, or body face. `--font-ui` in `apps/web/src/index.css` is the single font token used by global text and Tailwind font utilities.

Prefer inherited text size or Tailwind's `text-base`. Avoid introducing smaller or larger text sizes for headings, labels, helper text, buttons, cards, or dialogs unless there is a specific accessibility or product reason.

The home screen game title may use a larger fixed-size retro nameplate treatment because it is a title mark rather than an application heading pattern. It should spell the whole game name clearly in one consistent style, fit mobile without horizontal scrolling, avoid redundant surrounding labels or extra frame borders, and favor fantasy RPG framing over sci-fi ASCII block art.

Use hierarchy through color, spacing, borders, grouping, and placement rather than font-size changes.

## 7. Components

Create and use reusable components instead of rebuilding the same UI patterns from scratch.

Before adding new UI, check the existing component layer and feature-specific component folders. Prefer extending simple primitives such as buttons, cards, modals, sidebars, tabs, tooltips, resource bars, and stat displays when they fit the need.

Use the focused shared components for `PanelTitle`, `SectionHeading`, and `Badge`. Reuse `ControlStyles.ts` for command frames, variants, focus treatment, and selectable panel states instead of copying those class strings.

Reusable components should stay focused:

- accept explicit props
- avoid hidden gameplay behavior
- avoid duplicating simulation logic
- compose smaller pieces where practical
- keep styling consistent with the theme

If a pattern appears in multiple places, extract a small reusable component rather than copying markup and class strings.

## 8. Layout and Interaction

Screens should remain responsive, readable, and efficient.

Common player decisions should be easy to scan:

- hero state
- resources
- enemy state
- combat log
- available actions
- rewards
- progression choices
- equipment and skills

Interactive elements should be obvious, keyboard-accessible where practical, and consistent in hover, focus, disabled, pending, and error states.

Town should feel like a strategic checkpoint with clear shop, recovery, reroll, equipment, and combat-entry decisions. Combat should keep fast action readable as active skills, consumables, and conditions are introduced.

## 9. Presentation Boundaries

UI may present simulation state and collect player intent, but it must not calculate gameplay outcomes.

The presentation layer should:

- render engine state and selector output
- submit actions to the appropriate runtime path
- show pending, success, and error states
- use shared content for labels, icons, portraits, and item/skill details
- use engine selectors for reward choices, town views, available actions, and replacement previews

The presentation layer must not:

- decide whether gameplay actions succeed
- calculate damage, rewards, level-ups, or enemy selection
- mutate authoritative run state directly
- duplicate engine formulas

## 10. Consistency

Consistency is a core design requirement.

New screens should follow existing layout, spacing, color, border, and interaction patterns wherever possible. A feature should feel like part of the same game even when it introduces new content or workflows.

Use the established visual vocabulary:

- black base backgrounds
- dark elevated surfaces
- bright text for primary values
- muted text for secondary details
- labeled stats and resources
- simple panel borders instead of heavy decoration
- framed commands, underlined tabs, and square outlined badges
- accent colors only where they communicate state, rarity, action, or emphasis

Avoid decorative styles that pull the game away from its focused retro fantasy RPG identity.

## 11. Non-Goals

This document is not intended to define:

- exact page wireframes
- every component API
- content schemas
- combat or progression rules
- generated design-token references
- marketing-site art direction

The guiding principle is simple: use the smallest consistent UI pattern that keeps the game readable, reusable, and recognizably Browser Heroes 2.
