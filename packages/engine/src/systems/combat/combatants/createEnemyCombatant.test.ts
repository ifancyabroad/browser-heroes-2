import { ENEMIES_BY_ID } from "@app/content";
import { describe, expect, it } from "vitest";

import { createEnemyCombatant } from "./createEnemyCombatant";

describe("createEnemyCombatant", () => {
	it("uses authored enemy Initiative without level or endless scaling", () => {
		const definition = Object.values(ENEMIES_BY_ID)[0];
		const enemy = { ...definition, combat: { ...definition.combat, initiative: 15 } };

		expect(createEnemyCombatant(enemy, "test", 20, 3).combatStats.initiative).toBe(15);
	});
});
