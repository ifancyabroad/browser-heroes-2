import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
	base: "/admin/",
	plugins: [react(), tailwindcss()],
	server: {
		port: 5175,
		proxy: { "/api": "http://localhost:4000" },
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./src/test/setup.ts"],
		include: ["src/**/*.{test,spec}.{ts,tsx}"],
	},
});
