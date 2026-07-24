import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "node",
		include: ["src/**/*.{test,spec}.ts"],
		coverage: {
			provider: "v8",
			reportsDirectory: "coverage",
			reporter: ["text", "html", "json-summary"],
			include: ["src/**/*.ts"],
			exclude: ["src/**/*.test.ts", "src/test/**", "src/**/*.schema.ts", "src/**/index.ts"],
		},
	},
});
