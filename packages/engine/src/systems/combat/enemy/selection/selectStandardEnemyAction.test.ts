import { describe, expect, it } from "vitest";
import { createTestCombat, createTestStatus } from "../../../../test/createTestCombat";
import { selectStandardEnemyAction } from "./selectStandardEnemyAction";

describe("selectStandardEnemyAction", () => {
	it.each([false, true])(
		"preserves RNG for a fallback action when opponent invisibility is %s",
		(invisible) => {
			const { enemy, player } = createTestCombat();
			if (invisible) {
				player.activeEffects.push(createTestStatus(player, "invisible", 3));
			}
			const result = selectStandardEnemyAction({
				enemy,
				player,
				tactic: "default",
				rngState: { value: 7 },
			});
			expect(result).toEqual({
				value: { type: invisible ? "skip" : "basicAttack" },
				rngState: { value: 7 },
			});
		},
	);

	it("continues consuming selection RNG when a skill is the only useful candidate", () => {
		const { enemy, player } = createTestCombat();
		player.activeEffects.push(createTestStatus(player, "invisible", 3));
		enemy.skills = [{ skillId: "armour", chargesRemaining: 1 }];
		const rngState = { value: 7 };
		const result = selectStandardEnemyAction({ enemy, player, tactic: "default", rngState });
		expect(result.value).toEqual({ type: "skill", skillId: "armour" });
		expect(result.rngState).not.toEqual(rngState);
	});
});
