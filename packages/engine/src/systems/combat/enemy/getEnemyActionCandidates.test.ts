import { describe, expect, it } from "vitest";

import { createTestCombat } from "../../../test/createTestCombat";
import { getEnemyActionCandidates } from "./getEnemyActionCandidates";

describe("enemy action candidates", () => {
	it("integrates an available skill with the basic attack", () => {
		const { enemy, player } = createTestCombat();
		enemy.skills = [{ skillId: "shocking_grasp", chargesRemaining: 1 }];

		expect(getEnemyActionCandidates(enemy, player)).toEqual([
			{ action: { type: "basicAttack" }, category: "basicAttack" },
			{ action: { type: "skill", skillId: "shocking_grasp" }, category: "standard" },
		]);
	});

	it("excludes skills with no charges or explicit exclusions", () => {
		const { enemy, player } = createTestCombat();
		enemy.skills = [
			{ skillId: "shocking_grasp", chargesRemaining: 0 },
			{ skillId: "stand_ground", chargesRemaining: 1 },
		];
		expect(getEnemyActionCandidates(enemy, player, ["stand_ground"])).toEqual([]);
	});
});
