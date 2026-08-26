import { describe, expect, it } from "vitest";
import { calculateCombatReward } from "./calculateCombatReward";

describe("calculateCombatReward", () => {
	it("scales and floors gold and XP independently", () => {
		expect(
			calculateCombatReward({
				enemyLevel: 3,
				enemyThreat: 1.25,
				goldMultiplier: 1.1,
			}),
		).toEqual({
			gold: 6,
			xp: 56,
		});
	});
});
