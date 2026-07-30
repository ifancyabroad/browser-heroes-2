import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("useHowToPlayModalStore", () => {
	beforeEach(() => {
		localStorage.clear();
		vi.resetModules();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("opens initially when the guide has not been seen", async () => {
		const { useHowToPlayModalStore } = await import("./howToPlayModalStore");

		expect(useHowToPlayModalStore.getState().isOpen).toBe(true);
	});

	it("starts closed when the seen marker exists", async () => {
		localStorage.setItem("browser-heroes-2:how-to-play:v1", "seen");

		const { useHowToPlayModalStore } = await import("./howToPlayModalStore");

		expect(useHowToPlayModalStore.getState().isOpen).toBe(false);
	});

	it("records dismissal and supports reopening", async () => {
		const { HOW_TO_PLAY_SEEN_STORAGE_KEY, useHowToPlayModalStore } =
			await import("./howToPlayModalStore");

		useHowToPlayModalStore.getState().close();
		expect(useHowToPlayModalStore.getState().isOpen).toBe(false);
		expect(localStorage.getItem(HOW_TO_PLAY_SEEN_STORAGE_KEY)).toBe("seen");

		useHowToPlayModalStore.getState().open();
		expect(useHowToPlayModalStore.getState().isOpen).toBe(true);
	});

	it("remains usable when storage access fails", async () => {
		vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
			throw new Error("Storage unavailable");
		});
		vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
			throw new Error("Storage unavailable");
		});

		const { useHowToPlayModalStore } = await import("./howToPlayModalStore");

		expect(useHowToPlayModalStore.getState().isOpen).toBe(true);
		expect(() => useHowToPlayModalStore.getState().close()).not.toThrow();
		expect(useHowToPlayModalStore.getState().isOpen).toBe(false);
	});
});
