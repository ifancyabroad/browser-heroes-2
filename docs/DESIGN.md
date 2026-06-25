# Browser Heroes 2 - Design Principles

## 1. Purpose

This document defines the UI design rules for Browser Heroes 2.

It covers visual direction, styling conventions, component reuse, and interface consistency. Product goals, game rules, combat behavior, architecture, and infrastructure belong in their own documents.

## 2. Visual Direction

Browser Heroes 2 should feel like a retro, minimalist, fantasy RPG.

The UI should emphasize:

- terminal-inspired readability
- clear fantasy RPG information hierarchy
- sparse decoration
- high contrast
- compact, information-dense screens
- simple shapes and direct interactions

The interface should support the text-based game aesthetic without becoming noisy or hard to scan.

## 3. Styling System

Tailwind is the CSS framework for the web app.

Use Tailwind utility classes for layout, spacing, color, typography, and state styling. Prefer existing theme variables from `apps/web/src/index.css` through Tailwind classes such as `bg-bg-base`, `bg-bg-elevated`, `text-text`, `text-text-bright`, `text-primary`, `border-border`, `text-success`, and `text-error`.

Avoid hard-coded colors, one-off arbitrary values, and local CSS unless a reusable pattern cannot be expressed clearly with the current theme and utilities.

When new visual tokens are needed, add them deliberately to the theme so future UI can reuse the same language.

## 4. Typography

Font size should remain 16px throughout the UI to preserve the terminal-style text-based RPG feel.

Prefer inherited text size or Tailwind's `text-base`. Avoid introducing smaller or larger text sizes for headings, labels, helper text, buttons, cards, or dialogs unless there is a specific accessibility or product reason.

Use hierarchy through color, spacing, borders, grouping, and placement rather than font-size changes.

## 5. Components

Create and use reusable components instead of rebuilding the same UI patterns from scratch.

Before adding new UI, check the existing component layer in `apps/web/src/components` and feature-specific component folders. Prefer extending simple primitives such as buttons, cards, modals, sidebars, resource bars, and stat lists when they fit the need.

Reusable components should stay focused:

- accept explicit props
- avoid hidden gameplay behavior
- avoid duplicating simulation logic
- compose smaller pieces where practical
- keep styling consistent with the theme

If a pattern appears in multiple places, extract a small reusable component rather than copying markup and class strings.

## 6. Consistency

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

## 7. Layout and Interaction

Screens should remain responsive, readable, and efficient.

Prefer layouts that make common player decisions easy to scan: hero state, resources, enemy state, rewards, inventory, actions, and progression should be organized predictably.

Interactive elements should be obvious, keyboard-accessible where practical, and consistent in hover, focus, disabled, and loading states.

UI may present simulation state and collect player intent, but it must not calculate gameplay outcomes.

## 8. Non-Goals

This document is not intended to define:

- exact page wireframes
- every component API
- content schemas
- combat or progression rules
- generated design-token references
- marketing-site art direction

The guiding principle is simple: use the smallest consistent UI pattern that keeps the game readable, reusable, and recognizably Browser Heroes 2.
