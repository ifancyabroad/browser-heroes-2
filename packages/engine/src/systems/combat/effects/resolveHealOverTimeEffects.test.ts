import { describe, expect, it } from "vitest";
import { createTestRunState } from "../../../test/createTestRunState";
import { resolveHealOverTimeEffects } from "./resolveHealOverTimeEffects";

describe("resolveHealOverTimeEffects", () => {
	it.each([0, 3])("reports actual restored HP with %i HP missing", (missingHp) => {
		const state = createTestRunState();
		const combat = state.combat!;
		combat.player.maxHp = 100;
		combat.player.currentHp = 100 - missingHp;
		combat.player.activeEffects.push({
			id: "healing-tick",
			type: "healOverTime",
			dice: "1d4+100",
			sourceCombatantId: combat.player.id,
			sourceSide: "player",
			source: {
				type: "skill",
				skillId: "armour_break",
				sourceName: "Test healing",
				sourceEffectKey: "heal",
			},
			duration: { unit: "turns", remaining: 2 },
		});

		const result = resolveHealOverTimeEffects({
			combat,
			combatantSide: "player",
			effectIds: new Set(["healing-tick"]),
			rngState: state.rngState,
		});

		expect(result.value.log.at(-1)?.outcome).toEqual({
			type: "healing",
			targetId: combat.player.id,
			amount: missingHp,
		});
	});
});
