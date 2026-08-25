# Browser Heroes 2 - Testing

## 1. Purpose

Tests should protect behavior that matters while remaining cheaper to maintain than the defects
they prevent. The suite should favor durable contracts over exhaustive assertions about current
content, copy, styling, or implementation structure.

## 2. What to Test

Engine tests should prioritize deterministic outcomes, validation, state transitions, boundary
conditions, serialization, replay parity, selectors, and gameplay invariants. Use explicit inputs
and assert observable outputs.

API tests should prioritize authentication and authorization, request validation, error handling,
transactions, persistence orchestration, and the boundary between server-owned and client-owned
data.

UI tests should prioritize user interaction, accessibility, routing, conditional states, submitted
intent, and stable error behavior. The UI should not duplicate engine rule tests.

Content validation should catch invalid shapes and broken references. A small number of
representative integration tests may prove that authored effect shapes can be resolved by the
engine.

## 3. What Not to Test by Default

Avoid tests whose primary purpose is to freeze:

- exact balance or tuning values
- the number, order, names, or thematic assignment of authored content
- prose, flavour text, or marketing copy
- Tailwind class lists or incidental DOM nesting
- private implementation details or direct restatements of constants
- behavior already covered at a more authoritative package boundary

Test one of these details only when it is an intentional, durable contract. Accessibility names,
security headers, public response shapes, and documented gameplay boundaries are examples of
details that may warrant exact assertions.

## 4. Test Design

- Prefer small synthetic fixtures over production content registries.
- Assert invariants and boundary cases rather than enumerating the current catalogue.
- Test outcomes rather than the sequence of internal helper calls.
- Mock external boundaries, not the unit's own behavior.
- Keep one authoritative test for a rule instead of repeating it through engine, API, and UI layers.
- Use table-driven tests when several inputs demonstrate one rule.
- Give each test a failure message that identifies the broken behavior.

When production content is required for an integration test, use the smallest representative set
and avoid exact values unrelated to the behavior under test.

## 5. Reviewing Tests

Before adding or retaining a test, ask:

1. What defect would this catch?
2. Would that defect matter to a player, caller, security boundary, or future contributor?
3. Would an intentional content, copy, or visual change break it?
4. Is the same behavior already protected at a more authoritative layer?
5. Can the assertion be expressed as a stable invariant instead of an exact implementation detail?

Delete or rewrite a test when its maintenance cost consistently exceeds its protection. Coverage is
a diagnostic tool, not a target: uncovered branches can reveal risk, but line coverage alone does
not justify low-value tests.

## 6. Running the Suite

Run all workspace tests with `pnpm test`. Package-level `test`, `test:watch`, and `test:coverage`
scripts are available where configured. During development, run the narrowest relevant package or
test file first, then run the affected package suite before handing off a change.
