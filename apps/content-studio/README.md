# Browser Heroes 2 Content Studio

The content studio is a local browser and editor for the generated `@app/content` registries.
It does not ship with the production game. TypeScript definitions remain the source of truth.

From the repository root, run:

```bash
pnpm studio
```

Open `http://localhost:5174`. Artwork is served from `apps/web/public/assets/images`.

Existing definitions can be edited from their detail pages. Saves are explicit and write only
the mapped TypeScript definition after schema, reference, revision, and artwork validation. IDs,
files, creation, deletion, and renaming are intentionally unsupported. Review or revert saved
changes with Git before committing.
