import { beforeEach, describe, expect, it } from "vitest";
import { useAchievementToastStore } from "./achievementToastStore";

describe("achievementToastStore", () => {
	beforeEach(() => {
		useAchievementToastStore.setState({ toasts: [] });
	});

	it("adds multiple unlocks in response order with unique notification ids", () => {
		useAchievementToastStore.getState().showAchievementUnlocks([
			{ achievementId: "defeat_boss", unlockedAt: "2026-01-01T00:00:00.000Z" },
			{ achievementId: "complete_game", unlockedAt: "2026-01-01T00:00:01.000Z" },
		]);

		const toasts = useAchievementToastStore.getState().toasts;
		expect(toasts.map(({ unlock }) => unlock.achievementId)).toEqual([
			"defeat_boss",
			"complete_game",
		]);
		expect(new Set(toasts.map(({ id }) => id))).toHaveLength(2);
	});

	it("dismisses only the selected notification", () => {
		useAchievementToastStore.getState().showAchievementUnlocks([
			{ achievementId: "defeat_boss", unlockedAt: "2026-01-01T00:00:00.000Z" },
			{ achievementId: "complete_game", unlockedAt: "2026-01-01T00:00:01.000Z" },
		]);
		const [firstToast] = useAchievementToastStore.getState().toasts;

		useAchievementToastStore.getState().dismissAchievementUnlock(firstToast.id);

		expect(
			useAchievementToastStore.getState().toasts.map(({ unlock }) => unlock.achievementId),
		).toEqual(["complete_game"]);
	});
});
