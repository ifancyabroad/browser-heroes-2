import { describe, expect, it } from "vitest";
import { createTestRunState } from "../../../test/createTestRunState";
import { resolveHealEffect } from "../skills/effects/resolveHealEffect";
import { resolveHealOverTimeEffects } from "../effects/resolveHealOverTimeEffects";
import { formatActionOutcome } from "./formatActionLog";
import { useHealingPotion } from "../../consumables/useHealingPotion";

describe("healing log outcomes", () => {
	it.each([0, 3])(
		"reports actual restored HP with %i HP missing for every healing source",
		(missingHp) => {
			const state = createTestRunState();
			const combat = state.combat!;
			combat.player.maxHp = 100;
			combat.player.currentHp = 100 - missingHp;
			state.hero.currentHp = combat.player.currentHp;
			const expected = { type: "healing", targetId: combat.player.id, amount: missingHp };

			const skill = resolveHealEffect({
				combat,
				actorSide: "player",
				rngState: state.rngState,
				effect: { type: "heal", target: "self", dice: "1d4+100" },
			});
			expect(formatActionOutcome(skill.value.outcomes[0]).outcome).toEqual(expected);

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
			const recurring = resolveHealOverTimeEffects({
				combat,
				combatantSide: "player",
				effectIds: new Set(["healing-tick"]),
				rngState: state.rngState,
			});
			expect(recurring.value.log.at(-1)?.outcome).toEqual(expected);

			const potion = useHealingPotion(state);
			expect(potion.ok).toBe(true);
			expect(
				potion.state.combat!.log.find((entry) => entry.eventType === "healing_potion_used")
					?.outcome,
			).toEqual(expected);
		},
	);
});
