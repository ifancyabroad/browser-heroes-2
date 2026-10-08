import { describe, expect, it } from "vitest";
import { createTestRunState } from "../../../../test/createTestRunState";
import { formatActionOutcome } from "../../logs/formatActionLog";
import { resolveHealEffect } from "./resolveHealEffect";

describe("resolveHealEffect", () => {
	it.each([0, 3])("reports actual restored HP with %i HP missing", (missingHp) => {
		const state = createTestRunState();
		const combat = state.combat!;
		combat.player.maxHp = 100;
		combat.player.currentHp = 100 - missingHp;

		const result = resolveHealEffect({
			combat,
			actorSide: "player",
			rngState: state.rngState,
			effect: { type: "heal", target: "self", dice: "1d4+100" },
		});

		expect(formatActionOutcome(result.value.outcomes[0]).outcome).toEqual({
			type: "healing",
			targetId: combat.player.id,
			amount: missingHp,
		});
	});
});
