# Browser Heroes 2 - Design Principles

## 1. Purpose

This document defines UI design direction for Browser Heroes 2.

It covers visual direction, styling conventions, reusable components, layout expectations, and presentation-layer constraints. Product goals, game rules, combat behavior, architecture, and infrastructure belong in their own documents.

## 2. Visual Direction

Browser Heroes 2 should feel like a retro, minimalist fantasy RPG.

The UI should emphasize:

- terminal-inspired readability
- compact RPG information hierarchy
- sparse decoration
- high contrast
- dense but scannable screens
- simple shapes and direct interactions
- readable consequences for success, failure, and risk

The interface should support a text-forward game aesthetic without becoming noisy or hard to scan.

## 3. Current UI Shape

The current web app includes:

- a landing screen
- character creation with class selection and hero naming
- a town screen with hero inspection and combat entry
- a combat screen with combatants, stats, log/portrait view, and action controls
- level-up modal flow
- dead and complete placeholders
- shared error and loading states

Town and combat should continue to feel like parts of the same game surface, not unrelated pages.

## 4. Styling System

Tailwind CSS is the styling system for the web app.

Use Tailwind utility classes for layout, spacing, color, typography, and state styling. Prefer existing theme variables from `apps/web/src/index.css` through Tailwind classes such as `bg-bg-base`, `bg-bg-elevated`, `text-text`, `text-text-bright`, `text-primary`, `border-border`, `text-success`, and `text-error`.

Avoid hard-coded colors, one-off arbitrary values, and local CSS unless a reusable pattern cannot be expressed clearly with the current theme and utilities.

When new visual tokens are needed, add them deliberately to the theme so future UI can reuse the same language.

## 5. Typography

Font size should remain 16px throughout the UI to preserve the terminal-style text-based RPG feel.

Prefer inherited text size or Tailwind's `text-base`. Avoid introducing smaller or larger text sizes for headings, labels, helper text, buttons, cards, or dialogs unless there is a specific accessibility or product reason.

Use hierarchy through color, spacing, borders, grouping, and placement rather than font-size changes.

## 6. Components

Create and use reusable components instead of rebuilding the same UI patterns from scratch.

Before adding new UI, check the existing component layer and feature-specific component folders. Prefer extending simple primitives such as buttons, cards, modals, sidebars, tabs, tooltips, resource bars, and stat displays when they fit the need.

Reusable components should stay focused:

- accept explicit props
- avoid hidden gameplay behavior
- avoid duplicating simulation logic
- compose smaller pieces where practical
- keep styling consistent with the theme

If a pattern appears in multiple places, extract a small reusable component rather than copying markup and class strings.

## 7. Layout and Interaction

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

Town should feel like a strategic checkpoint as planned systems are added. Combat should keep fast action readable even as active skills, consumables, and conditions are introduced.

## 8. Presentation Boundaries

UI may present simulation state and collect player intent, but it must not calculate gameplay outcomes.

The presentation layer should:

- render engine state and selector output
- submit actions to the appropriate runtime path
- show pending, success, and error states
- use shared content for labels, icons, portraits, and item/skill details

The presentation layer must not:

- decide whether gameplay actions succeed
- calculate damage, rewards, level-ups, or enemy selection
- mutate authoritative run state directly
- duplicate engine formulas

## 9. Consistency

Consistency is a core design requirement.

New screens should follow existing layout, spacing, color, border, and interaction patterns wherever possible. A feature should feel like part of the same game even when it introduces new content or workflows.

Use the established visual vocabulary:

- black base backgrounds
- dark elevated surfaces
- bright text for primary values
- muted text for secondary details
- labeled stats and resources
- simple borders instead of heavy decoration
- accent colors only where they communicate state, rarity, action, or emphasis

Avoid decorative styles that pull the game away from its retro fantasy terminal identity.

## 10. Non-Goals

This document is not intended to define:

- exact page wireframes
- every component API
- content schemas
- combat or progression rules
- generated design-token references
- marketing-site art direction

The guiding principle is simple: use the smallest consistent UI pattern that keeps the game readable, reusable, and recognizably Browser Heroes 2.
