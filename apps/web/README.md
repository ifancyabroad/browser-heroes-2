# Browser Heroes Web

The web app is the React and Vite client for Browser Heroes.

## Frontend Direction

- React owns town, combat, and meta-game presentation.
- Shared engine packages remain the source of gameplay state and outcomes.
- Zustand is available for client-side UI and orchestration state.
- The web app does not use Phaser or another standalone game rendering engine.
- UI code should request state transitions instead of calculating gameplay results.

## Scripts

```bash
pnpm --filter @app/web dev
pnpm --filter @app/web build
pnpm --filter @app/web typecheck
pnpm --filter @app/web test
```
