# Browser Heroes 2 Content Studio

The content studio is a local, read-only browser for the generated `@app/content` registries.
It does not ship with the production game. TypeScript definitions remain the source of truth.

From the repository root, run:

```bash
pnpm studio
```

Open `http://localhost:5174`. Artwork is served from `apps/web/public/assets/images`.

Use the studio to filter catalogs, inspect definitions and artwork, and follow references between
content entries. Content must be authored directly in the TypeScript definitions.
