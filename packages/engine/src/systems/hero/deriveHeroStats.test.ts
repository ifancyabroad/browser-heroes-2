import { CLASSES_BY_ID, type ClassId } from "@app/content";
import { describe, expect, it } from "vitest";

import { createInitialRunState } from "../../state/createInitialRunState";
import { createTestRunState } from "../../test/createTestRunState";
import { deriveHeroStats } from "./deriveHeroStats";

describe("deriveHeroStats", () => {
	it.each(Object.keys(CLASSES_BY_ID) as ClassId[])(
		"starts %s at 10 independently of Dexterity and level",
		(classId) => {
			const { state } = createInitialRunState({
				runId: "initiative",
				seed: "initiative",
				heroName: "Test",
				classId,
			});
			state.hero.level = 20;
			state.hero.attributes.dexterity = 30;

			expect(deriveHeroStats(state.hero).combatStats.initiative.value).toBe(10);
		},
	);

	it("collects equipment Initiative into hero stats", () => {
		const state = createTestRunState();
		state.hero.equipment.feet = {
			type: "generated",
			instanceId: "test-boots",
			item: {
				type: "armour",
				id: "test-boots",
				name: "Test Boots",
				icon: "test.png",
				price: 1,
				rarity: "uncommon",
				slot: "boots",
				tags: [],
				modifiers: [{ type: "modifyStat", stat: "initiative", value: 3 }],
			},
		};

		const derived = deriveHeroStats(state.hero).combatStats.initiative;

		expect(derived).toMatchObject({ baseValue: 10, value: 13 });
		expect(derived.contributions).toHaveLength(1);
	});
});
