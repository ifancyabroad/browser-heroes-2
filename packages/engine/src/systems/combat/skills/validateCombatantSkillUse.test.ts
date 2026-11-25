import { describe, expect, it, vi } from "vitest";
import { createTestCombat, createTestStatus } from "../../../test/createTestCombat";
import { validateCombatantSkillUse } from "./validateCombatantSkillUse";

vi.mock("@app/content", async (importOriginal) => {
	const content = await importOriginal<typeof import("@app/content")>();
	return {
		...content,
		SKILLS_BY_ID: {
			...content.SKILLS_BY_ID,
			armour: {
				...content.SKILLS_BY_ID.armour,
				effects: [
					{ type: "heal", target: "self", dice: "1d4" },
					{
						type: "damage",
						target: "enemy",
						dice: "1d4",
						damageType: "fire",
						damageClass: "magical",
					},
				],
			},
		},
	};
});

describe("validateCombatantSkillUse", () => {
	it.each(["player", "enemy"] as const)(
		"blocks a whole mixed-target skill for %s when its opponent is invisible",
		(side) => {
			const combat = createTestCombat();
			const actor = combat[side];
			const opponent = combat[side === "player" ? "enemy" : "player"];
			actor.skills = [{ skillId: "armour", chargesRemaining: 2 }];
			expect(validateCombatantSkillUse(actor, "armour", opponent).ok).toBe(true);
			opponent.activeEffects.push(createTestStatus(opponent, "invisible", 3));
			expect(validateCombatantSkillUse(actor, "armour", opponent)).toEqual({
				ok: false,
				error: "TARGET_NOT_AVAILABLE",
			});
			expect(actor.skills[0].chargesRemaining).toBe(2);
		},
	);
});
