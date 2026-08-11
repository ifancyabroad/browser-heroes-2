import { build } from "esbuild";

await build({
	entryPoints: ["src/server.ts"],
	bundle: true,
	platform: "node",
	format: "cjs",
	outfile: "dist/server.cjs",
	external: ["argon2"],
});
