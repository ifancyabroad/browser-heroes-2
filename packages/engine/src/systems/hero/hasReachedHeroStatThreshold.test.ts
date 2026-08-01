import { describe, expect, it } from "vitest";

import { createTestRunState } from "../../test/createTestRunState";
import {
	hasReachedArmourClassThreshold,
	hasReachedMaximumAttribute,
	hasReachedMaxHpThreshold,
} from "./hasReachedHeroStatThreshold";

describe("hero stat threshold queries", () => {
	it("uses effective attributes", () => {
		const hero = createTestRunState().hero;
		hero.attributes.strength = 30;

		expect(hasReachedMaximumAttribute(hero, "strength")).toBe(true);
	});

	it("uses effective maximum HP", () => {
		const hero = createTestRunState().hero;
		hero.maxHp = 99;

		expect(hasReachedMaxHpThreshold(hero, 100)).toBe(false);

		hero.maxHp = 100;

		expect(hasReachedMaxHpThreshold(hero, 100)).toBe(true);
	});

	it("uses effective Armour Class", () => {
		const hero = createTestRunState().hero;
		hero.equipment.body = null;
		hero.attributes.dexterity = 30;
		hero.featIds = ["runic_ward", "unyielding_guard", "duelist_training"];

		expect(hasReachedArmourClassThreshold(hero, 25)).toBe(true);
	});
});
