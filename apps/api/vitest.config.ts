import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		environment: "node",
		setupFiles: ["./src/test/setup.ts"],
		include: ["src/**/*.{test,spec}.ts"],
		hookTimeout: 20_000,
		coverage: {
			provider: "v8",
			reportsDirectory: "coverage",
			reporter: ["text", "html", "json-summary"],
			include: ["src/**/*.ts"],
			exclude: ["src/**/*.test.ts", "src/test/**", "src/types/**", "src/server.ts"],
		},
	},
});
