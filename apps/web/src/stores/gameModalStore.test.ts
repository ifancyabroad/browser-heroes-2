import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("useGameModalStore", () => {
	beforeEach(() => {
		localStorage.clear();
		vi.resetModules();
	});
	afterEach(() => vi.restoreAllMocks());

	it("opens How to Play initially when the guide has not been seen", async () => {
		const { useGameModalStore } = await import("./gameModalStore");
		expect(useGameModalStore.getState().modal).toBe("howToPlay");
	});

	it("starts closed when the existing seen marker is present", async () => {
		localStorage.setItem("browser-heroes-2:how-to-play:v1", "seen");
		const { useGameModalStore } = await import("./gameModalStore");
		expect(useGameModalStore.getState().modal).toBeNull();
	});

	it("keeps one selected modal and clears it when closed", async () => {
		const { useGameModalStore } = await import("./gameModalStore");
		useGameModalStore.getState().open("stats");
		useGameModalStore.getState().open("equipment");
		expect(useGameModalStore.getState().modal).toBe("equipment");
		useGameModalStore.getState().close();
		expect(useGameModalStore.getState().modal).toBeNull();
	});

	it("records guide dismissal and permits reopening it", async () => {
		const { useGameModalStore, HOW_TO_PLAY_SEEN_STORAGE_KEY } =
			await import("./gameModalStore");
		useGameModalStore.getState().close();
		expect(localStorage.getItem(HOW_TO_PLAY_SEEN_STORAGE_KEY)).toBe("seen");
		useGameModalStore.getState().open("howToPlay");
		expect(useGameModalStore.getState().modal).toBe("howToPlay");
	});

	it("does not mark the guide seen when another modal is dismissed", async () => {
		const { useGameModalStore, HOW_TO_PLAY_SEEN_STORAGE_KEY } =
			await import("./gameModalStore");
		useGameModalStore.getState().open("skills");
		useGameModalStore.getState().close();
		expect(localStorage.getItem(HOW_TO_PLAY_SEEN_STORAGE_KEY)).toBeNull();
	});

	it("remains usable when browser storage is unavailable", async () => {
		vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
			throw new Error("Storage unavailable");
		});
		vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
			throw new Error("Storage unavailable");
		});
		const { useGameModalStore } = await import("./gameModalStore");
		expect(useGameModalStore.getState().modal).toBe("howToPlay");
		expect(() => useGameModalStore.getState().close()).not.toThrow();
		expect(useGameModalStore.getState().modal).toBeNull();
	});
});
