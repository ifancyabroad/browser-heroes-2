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
		hero.attributes.charisma = 24;
		hero.featIds = ["commanding_presence"];

		expect(hasReachedMaximumAttribute(hero, "charisma")).toBe(true);
	});

	it("uses effective maximum HP", () => {
		const hero = createTestRunState().hero;
		hero.maxHp = 99;

		expect(hasReachedMaxHpThreshold(hero, 100)).toBe(false);

		hero.maxHp = 100;

		expect(hasReachedMaxHpThreshold(hero, 100)).toBe(true);
	});

	it("uses the capped Dexterity bonus when deriving effective Armour Class", () => {
		const hero = createTestRunState().hero;
		hero.equipment.body = null;
		hero.attributes.dexterity = 32;

		expect(hasReachedArmourClassThreshold(hero, 15)).toBe(true);
		expect(hasReachedArmourClassThreshold(hero, 16)).toBe(false);
	});
});
