import { beforeEach, describe, expect, it, vi } from "vitest";
import { canAccessGame, HOLDING_PAGE_STORAGE_KEY } from "./holdingPageAccess";

describe("canAccessGame", () => {
	beforeEach(() => {
		vi.unstubAllEnvs();
		window.localStorage.clear();
		window.history.replaceState(null, "", "/");
	});

	it("allows the application when the holding page is disabled", () => {
		vi.stubEnv("VITE_HOLDING_PAGE_ENABLED", "false");

		expect(canAccessGame()).toBe(true);
	});

	it("blocks access without a configured bypass", () => {
		enableHoldingPage("");

		expect(canAccessGame()).toBe(false);
	});

	it("blocks missing, blank, and incorrect URL bypasses", () => {
		enableHoldingPage();

		for (const path of ["/", "/?holding_bypass=", "/?holding_bypass=incorrect"]) {
			window.history.replaceState(null, "", path);
			expect(canAccessGame()).toBe(false);
		}
	});

	it("persists a valid URL bypass and removes only its parameter", () => {
		enableHoldingPage();
		window.history.replaceState(null, "", "/game?mode=test&holding_bypass=preview-key#combat");

		expect(canAccessGame()).toBe(true);
		expect(window.localStorage.getItem(HOLDING_PAGE_STORAGE_KEY)).toBe("preview-key");
		expect(`${window.location.pathname}${window.location.search}${window.location.hash}`).toBe(
			"/game?mode=test#combat",
		);
	});

	it("allows a stored bypass only when it matches the current key", () => {
		enableHoldingPage();
		window.localStorage.setItem(HOLDING_PAGE_STORAGE_KEY, "preview-key");
		expect(canAccessGame()).toBe(true);

		window.localStorage.setItem(HOLDING_PAGE_STORAGE_KEY, "old-key");
		expect(canAccessGame()).toBe(false);
	});
});

function enableHoldingPage(bypassKey = "preview-key") {
	vi.stubEnv("VITE_HOLDING_PAGE_ENABLED", "true");
	vi.stubEnv("VITE_HOLDING_PAGE_BYPASS_KEY", bypassKey);
}
