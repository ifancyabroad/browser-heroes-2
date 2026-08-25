import { describe, expect, it } from "vitest";

import { createTestRunState } from "../../test/createTestRunState";
import { getEnemyDefinition } from "../encounters/getEnemyDefinition";
import { createEnemyCombatant } from "./combatants/createEnemyCombatant";
import { createCombat } from "./createCombat";

describe("createCombat", () => {
	it("uses cumulative enemy levels while repeating the authored zone", () => {
		const state = createTestRunState();
		const combat = createCombat({
			runId: state.id,
			seed: state.seed,
			hero: state.hero,
			battleNumber: 101,
			zoneNumber: 11,
			endlessCycle: 1,
		});

		expect(combat).not.toBeNull();
		expect(combat?.enemy.level).toBe(11);

		const definition = getEnemyDefinition(combat!.enemy.sourceId);
		expect(definition?.encounter.zone).toBe("forest");

		const levelOneEnemy = createEnemyCombatant(definition!, "comparison-combat", 1);
		expect(combat!.enemy.maxHp).toBeGreaterThan(levelOneEnemy.maxHp);
	});
});
