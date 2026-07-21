# New Heroes Start in Combat

## Goal

Start every newly created hero directly in battle 1 instead of presenting an initial town visit where the hero has no gold to spend.

## Initial Run State

A newly created run has:

- phase `combat`
- battle number `1`
- an active standard encounter
- no town state
- zero gold
- the normal run-start and combat-start log entries

The initial run does not generate a town or shop. This avoids consuming seeded randomness for an inaccessible shop.

## Engine Flow

`createInitialRunState` creates the hero and a minimal pre-combat run state, then uses the existing engine-owned combat entry logic to select the first enemy and construct combat state. The returned and persisted snapshot is the resulting combat state.

Initial encounter selection remains deterministic and owned by `packages/engine`. The API and web app do not synthesize or automatically submit an additional action.

## Later Town Visits

Existing post-victory choices remain unchanged. When the player returns to town after a victory, the engine creates the first town and shop using the run's current seeded randomness.

## Failure Handling

The initial encounter uses the same eligible-enemy rules as normal combat entry. Because battle 1 must have eligible authored content, failure to create the encounter is treated as an invalid game configuration rather than falling back to town.

## Documentation

Update `docs/RULES.md` and `docs/PRD.md` so the documented playable loop begins with combat and describes town as a checkpoint available after victories.

## Verification

Per the user's direction, this change will not add automated tests. Verification will use the repository typecheck and direct inspection of a newly created deterministic run state.
