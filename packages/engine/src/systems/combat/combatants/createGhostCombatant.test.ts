import { describe, expect, it } from "vitest";

import { createTestRunState } from "../../../test/createTestRunState";
import { createGhostCombatant } from "./createGhostCombatant";
import { createPlayerCombatant } from "./createPlayerCombatant";

describe("createGhostCombatant", () => {
	it("preserves the snapshot level and combat stats", () => {
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

		const playerLikeCombatant = createPlayerCombatant(state.hero, "combat-id");

		const ghost = createGhostCombatant(
			{
				ghostId: "ghost-id",
				ghostUsername: "Ghost Owner",
				ghostSource: "player",
				hero: state.hero,
			},
			"combat-id",
		);

		expect(ghost.combatStats.initiative).toBe(13);
		expect(ghost.level).toBe(state.hero.level);

		expect(ghost.combatStats).toEqual(playerLikeCombatant.combatStats);
	});
});
