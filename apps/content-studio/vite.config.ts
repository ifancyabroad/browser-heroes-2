import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";
import { contentEditorPlugin } from "./server/contentEditorPlugin";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
	plugins: [contentEditorPlugin(), react(), tailwindcss()],
	publicDir: resolve(root, "../web/public"),
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./src/test/setup.ts"],
		include: ["src/**/*.{test,spec}.{ts,tsx}", "server/**/*.{test,spec}.ts"],
	},
});
