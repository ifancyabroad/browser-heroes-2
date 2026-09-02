import { describe, expect, it } from "vitest";

import { createTestRunState } from "../../../test/createTestRunState";
import { createGhostCombatant } from "./createGhostCombatant";
import { createPlayerCombatant } from "./createPlayerCombatant";

describe("createGhostCombatant", () => {
	it("preserves the snapshot level and combat stats", () => {
		const state = createTestRunState();
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

		expect(ghost.level).toBe(state.hero.level);
		expect(ghost.combatStats).toEqual(playerLikeCombatant.combatStats);
	});
});
