import { describe, expect, it } from "vitest";

import { createTestRunState } from "../../../test/createTestRunState";
import { createGhostCombatant } from "./createGhostCombatant";

describe("createGhostCombatant", () => {
	it("preserves the snapshot level and applies endless scaling", () => {
		const state = createTestRunState();
		const ghost = createGhostCombatant(
			{
				ghostId: "ghost-id",
				ghostUsername: "Ghost Owner",
				ghostSource: "player",
				hero: state.hero,
			},
			"combat-id",
			2,
		);

		expect(ghost.level).toBe(state.hero.level);
		expect(ghost.combatStats.damageModifiers).toContainEqual({
			operation: "multiply",
			value: 2,
		});
		expect(ghost.combatStats.damageTakenModifiers).toContainEqual({
			operation: "multiply",
			value: 0.25,
		});
	});
});
