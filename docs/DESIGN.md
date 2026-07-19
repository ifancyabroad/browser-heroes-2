# Browser Heroes 2 - Design Principles

## 1. Purpose

This document defines the durable visual, component, layout, and interaction principles for the web app. Product behavior and gameplay rules belong in the product and gameplay documents.

## 2. Visual Identity

Browser Heroes 2 should feel like a compact retro fantasy RPG: an old roguelike, dungeon ledger, or adventurer's journal rather than a terminal emulator or general fantasy website.

The interface should favor:

- text-forward readability and dense, scannable information
- black and charcoal surfaces with warm brass and gold structure
- restrained green, red, and orange accents for meaningful state
- square, simple shapes with sparse decoration
- clear consequences, resources, and available actions

Avoid neon defaults, scanlines, glowing borders, command prompts, diagnostic language, ornamental gradients, and other sci-fi or faux-terminal effects.

## 3. Styling and Typography

Tailwind CSS is the styling system. Reuse the semantic theme tokens in `apps/web/src/index.css` rather than hard-coded colors or repeated arbitrary values. Add a shared token only when a new visual role is expected to recur.

Pixelify Sans is the single UI font. Body text, labels, controls, and headings should normally remain at 16px; establish hierarchy through color, spacing, borders, and placement instead of varied font sizes. Fixed-size title marks are the exception when they remain legible and responsive.

Use tabular numerals for changing values such as health, prices, costs, and statistics. Keep motion restrained and honor reduced-motion preferences.

## 4. Components

Reuse focused shared components for recurring controls, panels, modals, tables, tooltips, resource displays, and navigation. Extend an existing primitive when it already expresses the required interaction.

Components should:

- accept explicit presentation data and callbacks
- compose small focused pieces
- provide consistent hover, focus, disabled, pending, and error states
- remain keyboard accessible where practical
- avoid hidden gameplay behavior

Extract a shared pattern when it genuinely recurs; do not introduce abstraction for a single use.

## 5. Layout and Interaction

Screens should remain compact, responsive, and usable on mobile without horizontal scrolling. Reflow dense information and wrap action groups instead of shrinking text or widening the page.

Use strong borders for primary panels and controls, quieter separation for repeated rows, flat resource tracks, and clear active states for navigation. Hover and focus should clarify interactivity without routine movement or decorative animation.

Keep the information needed for the current decision easy to find: combatants and actions during combat, recovery and purchases in town, and clear choices in modal flows.

## 6. Presentation Boundary

The UI renders engine state, selector output, and shared content, then submits player intent through the runtime application flow.

It must not calculate damage, rewards, progression, enemy selection, action validity, or other gameplay outcomes. It must not mutate authoritative run state or duplicate engine formulas.

## 7. Non-Goals

This document does not define exact page layouts, component APIs, gameplay rules, content schemas, or marketing art direction.

The guiding principle is to use the smallest consistent pattern that keeps the game readable and recognizably Browser Heroes 2.
