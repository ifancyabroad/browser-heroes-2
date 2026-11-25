import { describe, expect, it } from "vitest";

import { createTestCombat, createTestStatus } from "../../../test/createTestCombat";
import { getEnemyActionOptions } from "./getEnemyActionOptions";

describe("getEnemyActionOptions", () => {
	it("integrates an available skill with the basic attack", () => {
		const { enemy, player } = createTestCombat();
		enemy.skills = [{ skillId: "shocking_grasp", chargesRemaining: 1 }];

		expect(getEnemyActionOptions(enemy, player)).toEqual({
			type: "choices",
			candidates: [
				{ action: { type: "basicAttack" }, category: "basicAttack" },
				{ action: { type: "skill", skillId: "shocking_grasp" }, category: "standard" },
			],
		});
	});

	it("excludes skills with no charges or explicit exclusions", () => {
		const { enemy, player } = createTestCombat();
		enemy.skills = [
			{ skillId: "shocking_grasp", chargesRemaining: 0 },
			{ skillId: "stand_ground", chargesRemaining: 1 },
		];
		expect(getEnemyActionOptions(enemy, player, ["stand_ground"])).toEqual({
			type: "fallback",
			action: { type: "basicAttack" },
		});
	});

	it("returns only a skip when the opponent is invisible and no useful self-targeted skill remains", () => {
		const { enemy, player } = createTestCombat();
		player.activeEffects.push(createTestStatus(player, "invisible", 3));
		enemy.skills = [{ skillId: "shocking_grasp", chargesRemaining: 1 }];
		expect(getEnemyActionOptions(enemy, player)).toEqual({
			type: "fallback",
			action: { type: "skip" },
		});
	});

	it("does not offer a skip alongside a useful self-targeted skill", () => {
		const { enemy, player } = createTestCombat();
		player.activeEffects.push(createTestStatus(player, "invisible", 3));
		enemy.skills = [{ skillId: "armour", chargesRemaining: 1 }];
		expect(getEnemyActionOptions(enemy, player)).toEqual({
			type: "choices",
			candidates: [{ action: { type: "skill", skillId: "armour" }, category: "setup" }],
		});
	});
});
